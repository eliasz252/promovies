import fs from "fs";
import path from "path";
import { CastMember, SyncedMovie, SyncStats } from "./types";
import { upsertMovie, upsertMoviesBatch, getAllSyncedMovies } from "./store";
import { sendAllSyncNotifications, MovieNotificationItem } from "./notifications";
import { mapWithConcurrencyLimit } from "./tmdbClient";

// Configuration
const TMDB_BASE_URL = process.env.TMDB_API_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY || "4e44d9029b1270a757cddc766a1bcb63";

// Logging directory
const LOGS_DIR = path.join(process.cwd(), "logs");

function ensureDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Appends log entries to today's log file
 */
export function writeLog(logFileName: string, message: string) {
  try {
    ensureDirectory(LOGS_DIR);
    const logPath = path.join(LOGS_DIR, logFileName);
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`, "utf-8");
  } catch (err) {
    console.error("Failed to write to log file:", err);
  }
}

/**
 * Generates an SEO-friendly URL slug (e.g. "dune-part-two-2024")
 */
export function generateSlug(title: string, releaseDate?: string): string {
  const year = releaseDate ? releaseDate.split("-")[0] : "";
  const cleanedTitle = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, ""); // trim hyphens

  return year ? `${cleanedTitle}-${year}` : cleanedTitle;
}

/**
 * Fetch with automatic exponential backoff retry for 429 (Rate Limits) and network timeouts
 */
async function fetchWithRetry(url: string, retries = 3, backoffMs = 1000): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (res.status === 429) {
        // Rate limited by TMDB: check Retry-After header or backoff
        const retryAfter = res.headers.get("Retry-After");
        const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : backoffMs * attempt;
        console.warn(`[TMDB API 429] Rate limit reached. Backing off for ${delay}ms (attempt ${attempt}/${retries})...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      return await res.json();
    } catch (err: any) {
      if (attempt === retries) throw err;
      const delay = backoffMs * Math.pow(2, attempt - 1);
      console.warn(`[Network Retry] Fetch error on attempt ${attempt}/${retries}: ${err.message}. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

/**
 * Optional image downloader to store poster locally in public/posters/{tmdb_id}.jpg
 */
export async function downloadPosterLocally(posterPath: string, tmdbId: number): Promise<string | null> {
  try {
    const postersDir = path.join(process.cwd(), "public", "posters");
    ensureDirectory(postersDir);

    const ext = path.extname(posterPath) || ".jpg";
    const localFileName = `${tmdbId}${ext}`;
    const destinationPath = path.join(postersDir, localFileName);

    // If file already exists, reuse it
    if (fs.existsSync(destinationPath)) {
      return `/posters/${localFileName}`;
    }

    const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
    const res = await fetch(imageUrl);
    if (!res.ok) return null;

    const arrayBuffer = await res.arrayBuffer();
    fs.writeFileSync(destinationPath, Buffer.from(arrayBuffer));
    return `/posters/${localFileName}`;
  } catch (err) {
    console.warn(`[Image Download] Failed to download poster locally for TMDB ${tmdbId}:`, err);
    return null;
  }
}

/**
 * Sends Telegram notification summary if TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are provided
 */
async function sendTelegramNotification(stats: SyncStats) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  try {
    const text = `🎬 *ProMovies Daily Update Summary*\n` +
      `📅 *Date:* ${new Date().toISOString().split("T")[0]}\n` +
      `⏱️ *Duration:* ${(stats.duration_ms / 1000).toFixed(1)}s\n\n` +
      `✨ *Added:* ${stats.added} new movies\n` +
      `🔄 *Updated:* ${stats.updated} movies\n` +
      `⏭️ *Skipped:* ${stats.skipped} (missing poster/title)\n` +
      `❌ *Errors:* ${stats.errors}\n\n` +
      (stats.added_titles.length > 0
        ? `*Top New Releases:*\n• ${stats.added_titles.slice(0, 5).join("\n• ")}\n\n`
        : "") +
      `📁 Log: \`${stats.log_file}\``;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });
    console.log("[Notification] Telegram update sent successfully.");
  } catch (err) {
    console.warn("[Notification] Failed to send Telegram notification:", err);
  }
}

/**
 * Main Movie Sync Execution Engine
 */
export async function runMovieSync(options: { downloadImages?: boolean } = {}): Promise<SyncStats> {
  const startTime = Date.now();
  const dateStr = new Date().toISOString().split("T")[0];
  const logFileName = `sync-${dateStr}.log`;

  writeLog(logFileName, "======================================================");
  writeLog(logFileName, `START: Daily Movie Sync initiated at ${new Date().toISOString()}`);

  const stats: SyncStats = {
    started_at: new Date().toISOString(),
    completed_at: "",
    duration_ms: 0,
    total_discovered: 0,
    added: 0,
    updated: 0,
    unchanged: 0,
    skipped: 0,
    errors: 0,
    log_file: logFileName,
    added_titles: [],
    updated_titles: [],
    error_messages: [],
  };

  const newlyAddedMovies: MovieNotificationItem[] = [];

  if (!TMDB_API_KEY) {
    const errorMsg = "CRITICAL: TMDB_API_KEY is not configured in environment variables!";
    writeLog(logFileName, errorMsg);
    stats.errors++;
    stats.error_messages.push(errorMsg);
    stats.completed_at = new Date().toISOString();
    stats.duration_ms = Date.now() - startTime;
    return stats;
  }

  try {
    // 1. Fetch newly released & upcoming & trending movies from TMDB
    writeLog(logFileName, "Step 1: Fetching now_playing, upcoming, and daily trending discovery feeds...");

    const endpoints = [
      `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
      `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=2`,
      `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=3`,
      `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
      `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=2`,
      `${TMDB_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
      `${TMDB_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}&language=en-US&page=2`,
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=2`,
    ];

    const movieMap = new Map<number, any>();

    for (const url of endpoints) {
      try {
        const data = await fetchWithRetry(url);
        if (data?.results && Array.isArray(data.results)) {
          for (const item of data.results) {
            if (item.id && !movieMap.has(item.id)) {
              movieMap.set(item.id, item);
            }
          }
        }
      } catch (err: any) {
        writeLog(logFileName, `WARNING: Failed to fetch feed ${url}: ${err.message}`);
      }
    }

    const candidateIds = Array.from(movieMap.keys());
    stats.total_discovered = candidateIds.length;
    writeLog(logFileName, `Discovered ${candidateIds.length} candidate movie IDs.`);

    const candidatesToUpsert: Omit<SyncedMovie, "created_at" | "updated_at">[] = [];

    // 2. Process each movie ID with full details concurrently (credits, trailers, runtime)
    console.log(`Processing ${candidateIds.length} candidate movies with concurrency 4...`);
    let completedCount = 0;
    await mapWithConcurrencyLimit(
      candidateIds,
      async (tmdbId) => {
        try {
          const detailUrl = `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits,videos`;
          const full = await fetchWithRetry(detailUrl);

          // Safety Filter: Skip movies with missing title or poster
          if (!full.title || !full.poster_path) {
            stats.skipped++;
            writeLog(logFileName, `SKIPPED: TMDB ID ${tmdbId} - missing title or poster path.`);
            return;
          }

          // Extract Genres
          const genres = Array.isArray(full.genres) ? full.genres.map((g: any) => g.name) : [];
          const genreIds = Array.isArray(full.genres) ? full.genres.map((g: any) => g.id) : [];

          // Extract Cast (Top 6 billed)
          const cast: CastMember[] = Array.isArray(full.credits?.cast)
            ? full.credits.cast.slice(0, 6).map((c: any) => ({
                id: c.id,
                name: c.name,
                character: c.character || "Cast",
                profile_path: c.profile_path || null,
              }))
            : [];

          // Extract Trailer URL & Key
          const trailerObj =
            full.videos?.results?.find((v: any) => v.type === "Trailer" && v.site === "YouTube") ||
            full.videos?.results?.find((v: any) => v.site === "YouTube");
          const trailerKey = trailerObj?.key || null;
          const trailerUrl = trailerKey ? `https://www.youtube.com/watch?v=${trailerKey}` : null;

          // Generate SEO Slug
          const slug = generateSlug(full.title, full.release_date);

          // Poster handling (Local download if requested, else TMDB image path)
          let finalPosterPath = full.poster_path;
          if (options.downloadImages) {
            const localDownloaded = await downloadPosterLocally(full.poster_path, tmdbId);
            if (localDownloaded) {
              finalPosterPath = localDownloaded;
            }
          }

          candidatesToUpsert.push({
            id: full.id,
            tmdb_id: full.id,
            title: full.title,
            original_title: full.original_title || full.title,
            overview: full.overview || "",
            poster_path: finalPosterPath,
            backdrop_path: full.backdrop_path || null,
            release_date: full.release_date || "",
            genres,
            genre_ids: genreIds,
            vote_average: full.vote_average ? Number(full.vote_average.toFixed(1)) : 0,
            vote_count: full.vote_count || 0,
            runtime: full.runtime || 0,
            original_language: full.original_language || "en",
            cast,
            trailer_url: trailerUrl,
            trailer_key: trailerKey,
            slug,
            status: full.status || "Released",
          });
        } catch (err: any) {
          stats.errors++;
          stats.error_messages.push(`TMDB ${tmdbId}: ${err.message}`);
          writeLog(logFileName, `ERROR processing TMDB ID ${tmdbId}: ${err.message}`);
        } finally {
          completedCount++;
          if (completedCount % 20 === 0 || completedCount === candidateIds.length) {
            console.log(`   [Sync] Processed ${completedCount}/${candidateIds.length} movies...`);
          }
        }
      },
      4
    );

    // 3. Atomically upsert all discovered movies into database/store in a single transaction
    const batchResult = upsertMoviesBatch(candidatesToUpsert);
    stats.added = batchResult.added.length;
    stats.updated = batchResult.updated.length;
    stats.unchanged = batchResult.unchangedCount;

    for (const movie of batchResult.added) {
      stats.added_titles.push(movie.title);
      newlyAddedMovies.push({
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        genres: movie.genres,
        overview: movie.overview,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      });
      writeLog(logFileName, `ADDED: "${movie.title}" (TMDB ${movie.id}, Year: ${movie.release_date})`);
    }

    for (const movie of batchResult.updated) {
      stats.updated_titles.push(movie.title);
      writeLog(logFileName, `UPDATED: "${movie.title}" (TMDB ${movie.id})`);
    }
  } catch (err: any) {
    stats.errors++;
    stats.error_messages.push(`Fatal sync error: ${err.message}`);
    writeLog(logFileName, `FATAL SYNC ERROR: ${err.message}`);
  }

  stats.completed_at = new Date().toISOString();
  stats.duration_ms = Date.now() - startTime;

  writeLog(logFileName, `FINISH: Sync completed in ${(stats.duration_ms / 1000).toFixed(1)}s.`);
  writeLog(logFileName, `SUMMARY: Added=${stats.added}, Updated=${stats.updated}, Unchanged=${stats.unchanged}, Skipped=${stats.skipped}, Errors=${stats.errors}`);
  writeLog(logFileName, "======================================================\n");

  // Send automated notifications across Discord, Telegram, and Email
  await sendAllSyncNotifications({
    addedMovies: newlyAddedMovies,
    totalAdded: stats.added,
    totalUpdated: stats.updated,
    totalDiscovered: stats.total_discovered,
    durationMs: stats.duration_ms,
    logFile: stats.log_file,
    status: stats.errors > 0 ? "partial" : "success",
  });

  return stats;
}
