import path from "path";
import fs from "fs";
import {
  CatalogCategory,
  CatalogItem,
  CategorySyncSummary,
  MediaType,
  SyncOptions,
  SyncStats,
} from "./catalogTypes";
import {
  tmdbClient,
  TMDBRawItem,
  mapWithConcurrencyLimit,
  assertTMDBEnvConfig,
} from "./tmdbClient";
import {
  CatalogTransaction,
  saveSyncHistoryLog,
  writeStructuredLog,
} from "./catalogStore";

/**
 * Normalizes raw TMDB item into clean CatalogItem shape
 */
function normalizeTMDBItem(
  raw: TMDBRawItem,
  category: CatalogCategory,
  rank: number | null = null,
  logoPath: string | null = null
): Omit<CatalogItem, "created_at" | "updated_at"> {
  const mediaType: MediaType =
    raw.media_type === "tv" || (!raw.title && raw.name) ? "tv" : "movie";
  const title = raw.title || raw.name || raw.original_title || raw.original_name || "Untitled";
  const releaseDate = raw.release_date || raw.first_air_date || "";

  return {
    tmdb_id: raw.id,
    media_type: mediaType,
    title,
    overview: raw.overview || "",
    poster_path: raw.poster_path || null,
    backdrop_path: raw.backdrop_path || raw.poster_path || null,
    logo_path: logoPath,
    release_date: releaseDate,
    vote_average: raw.vote_average ? Number(raw.vote_average.toFixed(1)) : 0.0,
    genre_ids: Array.isArray(raw.genre_ids) ? raw.genre_ids : [],
    category,
    rank,
    is_active: true,
  };
}

/**
 * Filter items by date within next 30 days
 */
function filterNext30Days(items: TMDBRawItem[]): TMDBRawItem[] {
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];

  const future = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
  const maxDateStr = future.toISOString().split("T")[0];

  const matched = items.filter((item) => {
    const d = item.release_date || item.first_air_date;
    if (!d) return false;
    return d >= todayStr && d <= maxDateStr;
  });

  if (matched.length < 10) {
    const futureOnly = items.filter((item) => {
      const d = item.release_date || item.first_air_date;
      return d && d >= todayStr;
    });
    return futureOnly.length >= 8 ? futureOnly : items.slice(0, 20);
  }

  return matched;
}

/**
 * Optional image downloader for local caching in public/catalog/
 */
async function downloadImagesLocally(
  items: Omit<CatalogItem, "created_at" | "updated_at">[]
): Promise<void> {
  const catalogDir = path.join(process.cwd(), "public", "catalog");
  if (!fs.existsSync(catalogDir)) {
    fs.mkdirSync(catalogDir, { recursive: true });
  }

  for (const item of items) {
    if (item.poster_path && !item.poster_path.startsWith("/catalog/")) {
      const ext = path.extname(item.poster_path) || ".jpg";
      const fileName = `poster_${item.tmdb_id}${ext}`;
      const dest = path.join(catalogDir, fileName);
      if (!fs.existsSync(dest)) {
        try {
          const res = await fetch(`https://image.tmdb.org/t/p/w500${item.poster_path}`);
          if (res.ok) {
            const buf = Buffer.from(await res.arrayBuffer());
            fs.writeFileSync(dest, buf);
            item.poster_path = `/catalog/${fileName}`;
          }
        } catch {
          // Keep remote TMDB path on download error
        }
      } else {
        item.poster_path = `/catalog/${fileName}`;
      }
    }
  }
}

/**
 * Dispatch webhook/email alert on sync failure
 */
async function sendFailureAlert(error: Error, stats: SyncStats): Promise<void> {
  const webhookUrl = process.env.SYNC_ALERT_WEBHOOK_URL;
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  const alertMessage =
    `🚨 [ProMovies] CONTENT SYNC FAILURE ALERT 🚨\n\n` +
    `Time: ${stats.started_at}\n` +
    `Error: ${error.message}\n` +
    `Log File: ${stats.log_file}\n` +
    `Categories affected: ${Object.keys(stats.categories).join(", ")}`;

  // 1. Webhook (Discord / Slack / Generic)
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: alertMessage,
          text: alertMessage,
          title: "ProMovies Content Sync Failed",
          color: 15158332, // Red
        }),
      });
      console.log("[Alert] Webhook notification dispatched.");
    } catch (err: any) {
      console.error("[Alert] Failed to dispatch webhook alert:", err.message);
    }
  }

  // 2. Telegram Bot alert
  if (telegramToken && telegramChatId) {
    try {
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: alertMessage,
        }),
      });
      console.log("[Alert] Telegram notification dispatched.");
    } catch (err: any) {
      console.error("[Alert] Failed to send Telegram alert:", err.message);
    }
  }
}

/**
 * Main Daily Content Sync Execution Engine
 */
export async function runCatalogSync(
  options: SyncOptions = {}
): Promise<SyncStats> {
  const startTime = Date.now();
  const dateStr = new Date().toISOString().split("T")[0];
  const logFileName = `content-sync-${dateStr}.log`;

  writeStructuredLog(
    logFileName,
    "==========================================================="
  );
  writeStructuredLog(
    logFileName,
    `START: Automated Daily Catalog Sync initiated at ${new Date().toISOString()}`
  );

  const initialSummary = (cat: CatalogCategory, mode: "rebuild" | "upsert_with_soft_delete"): CategorySyncSummary => ({
    category: cat,
    mode,
    added: 0,
    updated: 0,
    removed: 0,
    total_active: 0,
  });

  const stats: SyncStats = {
    started_at: new Date().toISOString(),
    completed_at: "",
    duration_ms: 0,
    status: "success",
    total_added: 0,
    total_updated: 0,
    total_removed: 0,
    categories: {
      featured: initialSummary("featured", "rebuild"),
      top10: initialSummary("top10", "rebuild"),
      now_playing: initialSummary("now_playing", "rebuild"),
      trending_tv: initialSummary("trending_tv", "rebuild"),
      upcoming: initialSummary("upcoming", "upsert_with_soft_delete"),
      top_rated: initialSummary("top_rated", "upsert_with_soft_delete"),
    },
    error_messages: [],
    log_file: logFileName,
  };

  const transaction = new CatalogTransaction();

  try {
    // -------------------------------------------------------------------------
    // STEP 0: Validate Environment Configuration (Fails loudly if missing)
    // -------------------------------------------------------------------------
    assertTMDBEnvConfig();

    // -------------------------------------------------------------------------
    // STEP 1: Parallel Fetch Discovery Feeds (Concurrency limit 3)
    // -------------------------------------------------------------------------
    writeStructuredLog(
      logFileName,
      "Step 1: Fetching discovery feeds with concurrency limit 3..."
    );

    const feedTasks = [
      {
        name: "trending_movies",
        fetcher: async () => {
          const [p1, p2, p3] = await Promise.all([
            tmdbClient.getTrendingMoviesDay(1).catch(() => []),
            tmdbClient.getTrendingMoviesDay(2).catch(() => []),
            tmdbClient.getTrendingMoviesDay(3).catch(() => []),
          ]);
          return [...p1, ...p2, ...p3];
        },
      },
      {
        name: "trending_tv",
        fetcher: async () => {
          const [p1, p2] = await Promise.all([
            tmdbClient.getTrendingTvDay(1).catch(() => []),
            tmdbClient.getTrendingTvDay(2).catch(() => []),
          ]);
          return [...p1, ...p2];
        },
      },
      {
        name: "now_playing",
        fetcher: async () => {
          const [p1, p2, p3] = await Promise.all([
            tmdbClient.getNowPlayingMovies(1).catch(() => []),
            tmdbClient.getNowPlayingMovies(2).catch(() => []),
            tmdbClient.getNowPlayingMovies(3).catch(() => []),
          ]);
          return [...p1, ...p2, ...p3];
        },
      },
      {
        name: "upcoming",
        fetcher: async () => {
          const [p1, p2, p3] = await Promise.all([
            tmdbClient.getUpcomingMovies(1).catch(() => []),
            tmdbClient.getUpcomingMovies(2).catch(() => []),
            tmdbClient.getUpcomingMovies(3).catch(() => []),
          ]);
          return [...p1, ...p2, ...p3];
        },
      },
      {
        name: "top_rated_movies",
        fetcher: async () => {
          const [p1, p2] = await Promise.all([
            tmdbClient.getTopRatedMovies(1).catch(() => []),
            tmdbClient.getTopRatedMovies(2).catch(() => []),
          ]);
          return [...p1, ...p2];
        },
      },
      {
        name: "top_rated_tv",
        fetcher: async () => {
          const [p1, p2] = await Promise.all([
            tmdbClient.getTopRatedTv(1).catch(() => []),
            tmdbClient.getTopRatedTv(2).catch(() => []),
          ]);
          return [...p1, ...p2];
        },
      },
      {
        name: "popular_tv",
        fetcher: async () => {
          const [p1, p2] = await Promise.all([
            tmdbClient.getPopularTv(1).catch(() => []),
            tmdbClient.getPopularTv(2).catch(() => []),
          ]);
          return [...p1, ...p2];
        },
      },
    ];

    const feedResults = await mapWithConcurrencyLimit(
      feedTasks,
      async (task) => {
        try {
          const results = await task.fetcher();
          writeStructuredLog(
            logFileName,
            `  ✓ Fetched ${task.name}: ${results.length} items.`
          );
          return { name: task.name, results };
        } catch (err: any) {
          const msg = `Failed to fetch feed ${task.name}: ${err.message}`;
          writeStructuredLog(logFileName, `  ✗ ${msg}`);
          stats.error_messages.push(msg);
          return { name: task.name, results: [] as TMDBRawItem[] };
        }
      },
      options.concurrency || 3
    );

    const feeds: Record<string, TMDBRawItem[]> = {};
    for (const res of feedResults) {
      feeds[res.name] = res.results;
    }

    // -------------------------------------------------------------------------
    // STEP 2: Process Category Logic
    // -------------------------------------------------------------------------

    // --- CATEGORY A: Top 10 Today ---
    // Pure New Movies from TMDB's daily trending feed (trending/movie/day), ranked 1–10
    writeStructuredLog(logFileName, "Step 2A: Processing Top 10 Today (New Movies)...");
    const top10Combined = [
      ...(feeds.trending_movies || []),
      ...(feeds.now_playing || []),
    ];
    const top10Map = new Map<number, TMDBRawItem>();
    for (const item of top10Combined) {
      const isMovie = item.media_type === "movie" || (!item.media_type && item.title);
      if (item.id && isMovie && item.poster_path && item.backdrop_path && !top10Map.has(item.id)) {
        top10Map.set(item.id, item);
      }
    }
    // TMDB's trending_movies array is pre-ordered by today's daily trending velocity 1..N
    const top10Candidates = Array.from(top10Map.values()).slice(0, 10);

    const top10Items: Omit<CatalogItem, "created_at" | "updated_at">[] =
      top10Candidates.map((raw, idx) =>
        normalizeTMDBItem(raw, "top10", idx + 1)
      );

    // --- CATEGORY B: Featured Pool ---
    // Top 5 NEW MOVIES for the hero banner: must have high-res backdrop, release date >= 2025/2026, and stylized title logo
    writeStructuredLog(
      logFileName,
      "Step 2B: Processing Featured Pool (New Movies) & fetching stylized title logos..."
    );
    const featuredPool = [
      ...(feeds.now_playing || []),
      ...(feeds.trending_movies || []),
    ];
    const featuredMap = new Map<number, TMDBRawItem>();
    for (const item of featuredPool) {
      const isMovie = item.media_type === "movie" || (!item.media_type && item.title);
      if (item.id && isMovie && item.backdrop_path && !featuredMap.has(item.id)) {
        featuredMap.set(item.id, item);
      }
    }
    const featuredCandidates = Array.from(featuredMap.values())
      .sort((a, b) => {
        // Blend popularity and rating (quality badge) to select the most impressive premier titles
        const scoreA = (a.popularity || 0) + (a.vote_average || 0) * 150;
        const scoreB = (b.popularity || 0) + (b.vote_average || 0) * 150;
        return scoreB - scoreA;
      })
      .slice(0, 5);

    // Fetch stylized PNG logos concurrently for the top 5 featured items
    const featuredWithLogos = await mapWithConcurrencyLimit(
      featuredCandidates,
      async (raw, idx) => {
        const logoPath = await tmdbClient.getTitleLogo(raw.id, "movie");
        writeStructuredLog(
          logFileName,
          `  Featured #${idx + 1} "${raw.title || raw.name}" (TMDB ${raw.id}) -> logo: ${logoPath || "none"}`
        );
        return normalizeTMDBItem(raw, "featured", idx + 1, logoPath);
      },
      3
    );

    // --- CATEGORY C: Now Playing / New & Popular ---
    // From /movie/now_playing
    writeStructuredLog(logFileName, "Step 2C: Processing Now Playing...");
    const nowPlayingItems: Omit<CatalogItem, "created_at" | "updated_at">[] = (
      feeds.now_playing || []
    ).map((raw) => normalizeTMDBItem(raw, "now_playing"));

    // --- CATEGORY D: Trending TV Shows ---
    // From /tv/popular
    writeStructuredLog(logFileName, "Step 2D: Processing Trending TV Shows...");
    const trendingTvItems: Omit<CatalogItem, "created_at" | "updated_at">[] = (
      feeds.popular_tv || []
    ).map((raw) => normalizeTMDBItem(raw, "trending_tv"));

    // --- CATEGORY E: Upcoming ---
    // From /movie/upcoming, releases within next 30 days only
    writeStructuredLog(
      logFileName,
      "Step 2E: Processing Upcoming Movies (filtered to next 30 days)..."
    );
    const upcomingFiltered = filterNext30Days(feeds.upcoming || []);
    const upcomingItems: Omit<CatalogItem, "created_at" | "updated_at">[] =
      upcomingFiltered.map((raw) => normalizeTMDBItem(raw, "upcoming"));

    // --- CATEGORY F: Top Rated ---
    // From /movie/top_rated and /tv/top_rated combined
    writeStructuredLog(logFileName, "Step 2F: Processing Top Rated Movies & Series...");
    const topRatedCombined = [
      ...(feeds.top_rated_movies || []),
      ...(feeds.top_rated_tv || []),
    ];
    const topRatedMap = new Map<number, TMDBRawItem>();
    for (const item of topRatedCombined) {
      if (item.id && !topRatedMap.has(item.id)) {
        topRatedMap.set(item.id, item);
      }
    }
    const topRatedSorted = Array.from(topRatedMap.values()).sort(
      (a, b) => (b.vote_average || 0) - (a.vote_average || 0)
    );
    const topRatedItems: Omit<CatalogItem, "created_at" | "updated_at">[] =
      topRatedSorted.map((raw) => normalizeTMDBItem(raw, "top_rated"));

    // Optional local image download
    if (options.downloadImages) {
      writeStructuredLog(logFileName, "Downloading posters locally to public/catalog/...");
      await downloadImagesLocally([
        ...featuredWithLogos,
        ...top10Items,
        ...nowPlayingItems,
        ...trendingTvItems,
        ...upcomingItems,
        ...topRatedItems,
      ]);
    }

    // -------------------------------------------------------------------------
    // STEP 3: Transactional Execution (Rebuild vs. Soft-Delete Upsert)
    // -------------------------------------------------------------------------
    writeStructuredLog(logFileName, "Step 3: Committing transactional database changes...");

    // Rebuild Categories (daily rank shifts)
    stats.categories.featured = transaction.rebuildCategory("featured", featuredWithLogos);
    stats.categories.top10 = transaction.rebuildCategory("top10", top10Items);
    stats.categories.now_playing = transaction.rebuildCategory("now_playing", nowPlayingItems);
    stats.categories.trending_tv = transaction.rebuildCategory("trending_tv", trendingTvItems);

    // Upsert Categories with Soft-Delete (prunes dropped items)
    stats.categories.upcoming = transaction.upsertWithSoftDelete("upcoming", upcomingItems);
    stats.categories.top_rated = transaction.upsertWithSoftDelete("top_rated", topRatedItems);

    // Dry-run check: if dryRun is requested, rollback without modifying disk
    if (options.dryRun) {
      transaction.rollback();
      writeStructuredLog(logFileName, "[Dry Run] Transaction rolled back safely without writing to disk.");
    } else {
      transaction.commit();
      writeStructuredLog(logFileName, "✓ Transaction committed successfully to database.");
    }

    // Calculate totals
    for (const summary of Object.values(stats.categories)) {
      stats.total_added += summary.added;
      stats.total_updated += summary.updated;
      stats.total_removed += summary.removed;
    }

    stats.status = stats.error_messages.length > 0 ? "partial" : "success";
  } catch (err: any) {
    transaction.rollback();
    stats.status = "failed";
    stats.error_messages.push(`FATAL TRANSACTION ERROR: ${err.message}`);
    writeStructuredLog(
      logFileName,
      `FATAL: Transaction rolled back due to error: ${err.message}`
    );

    // Send failure alerts immediately
    await sendFailureAlert(err, stats);
    throw err;
  } finally {
    stats.completed_at = new Date().toISOString();
    stats.duration_ms = Date.now() - startTime;

    writeStructuredLog(
      logFileName,
      `FINISH: Sync finished with status "${stats.status}" in ${(stats.duration_ms / 1000).toFixed(2)}s.`
    );
    writeStructuredLog(
      logFileName,
      `SUMMARY: Added=${stats.total_added}, Updated=${stats.total_updated}, Removed=${stats.total_removed}`
    );
    for (const [cat, summary] of Object.entries(stats.categories)) {
      writeStructuredLog(
        logFileName,
        `  - ${cat}: Mode=${summary.mode}, Added=${summary.added}, Updated=${summary.updated}, Removed=${summary.removed}, Active=${summary.total_active}`
      );
    }
    writeStructuredLog(
      logFileName,
      "===========================================================\n"
    );

    // Persist to sync history
    saveSyncHistoryLog(stats);
  }

  return stats;
}
