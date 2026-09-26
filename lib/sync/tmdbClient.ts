import { MediaType } from "./catalogTypes";

const TMDB_BASE_URL =
  process.env.TMDB_API_BASE_URL || "https://api.themoviedb.org/3";

/**
 * Validates TMDB API Key / Access Token presence in environment.
 * Fails loudly with a clear actionable message if missing.
 */
export function assertTMDBEnvConfig(): { apiKey?: string; accessToken?: string } {
  // Attempt to load .env.local if running in standalone Node/CLI without Next.js runtime
  if (!process.env.TMDB_API_KEY && !process.env.TMDB_ACCESS_TOKEN && typeof (process as any).loadEnvFile === "function") {
    try {
      const fs = require("fs");
      const path = require("path");
      for (const f of [".env.local", ".env"]) {
        const full = path.resolve(/*turbopackIgnore: true*/ process.cwd(), f);
        if (fs.existsSync(full)) {
          (process as any).loadEnvFile(full);
        }
      }
    } catch {
      // Ignore
    }
  }

  const apiKey =
    process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const accessToken =
    process.env.TMDB_ACCESS_TOKEN || process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

  if (!apiKey && !accessToken) {
    const errorMsg =
      "\n======================================================================\n" +
      "❌ CRITICAL CONFIGURATION ERROR: TMDB API Credentials Missing!\n" +
      "======================================================================\n" +
      "Neither TMDB_API_KEY nor TMDB_ACCESS_TOKEN was detected in environment variables.\n" +
      "In order to sync catalog content from TMDB, you must define:\n" +
      "  TMDB_API_KEY=<your_32_char_api_key>\n" +
      "or\n" +
      "  TMDB_ACCESS_TOKEN=<your_bearer_token>\n" +
      "in your .env.local file or hosting provider's Environment Secrets.\n" +
      "======================================================================\n";
    console.error(errorMsg);
    throw new Error("Missing TMDB_API_KEY or TMDB_ACCESS_TOKEN environment variable.");
  }

  return { apiKey, accessToken };
}

export interface TMDBRawItem {
  id: number;
  media_type?: "movie" | "tv";
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  genre_ids?: number[];
}

export interface TMDBImageLogo {
  aspect_ratio: number;
  height: number;
  width: number;
  file_path: string;
  iso_639_1?: string | null;
  vote_average: number;
  vote_count: number;
}

/**
 * Concurrency Limiter Pool (Max concurrent in-flight requests)
 */
export async function mapWithConcurrencyLimit<T, R>(
  items: T[],
  asyncFn: (item: T, index: number) => Promise<R>,
  concurrency = 3
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < items.length) {
      const index = currentIndex++;
      results[index] = await asyncFn(items[index], index);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => worker()
  );
  await Promise.all(workers);
  return results;
}

/**
 * Fetch with automatic exponential backoff retry for 429 (Rate Limits) and network timeouts
 */
export async function tmdbFetchWithRetry<T = any>(
  path: string,
  params: Record<string, string | number> = {},
  retries = 3,
  backoffMs = 1000
): Promise<T> {
  const { apiKey, accessToken } = assertTMDBEnvConfig();

  const url = new URL(`${TMDB_BASE_URL}${path}`);
  if (apiKey) {
    url.searchParams.set("api_key", apiKey);
  }
  url.searchParams.set("language", "en-US");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    const fetchStart = Date.now();
    try {
      const res = await fetch(url.toString(), {
        headers,
        cache: "no-store",
      });

      const latencyMs = Date.now() - fetchStart;

      if (res.status === 429) {
        const retryAfter = res.headers.get("Retry-After");
        const delay = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : backoffMs * Math.pow(2, attempt - 1);
        console.warn(
          `⚠️ [TMDB HTTP 429] Rate limited on ${path} (${latencyMs}ms). Backing off for ${delay}ms (Attempt ${attempt}/${retries})...`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      if (!res.ok) {
        console.error(
          `❌ [TMDB HTTP ${res.status}] Error fetching ${path} (${latencyMs}ms): ${res.statusText}`
        );
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();
      const itemCount = Array.isArray(json?.results) ? json.results.length : 1;
      console.log(
        `📡 [TMDB HTTP 200] ${path} -> ${itemCount} item(s) received (${latencyMs}ms)`
      );
      return json as T;
    } catch (err: any) {
      if (attempt === retries) {
        console.error(
          `💥 [TMDB Exhausted] ${path} permanently failed after ${retries} attempts: ${err.message}`
        );
        throw new Error(
          `TMDB fetch failed for ${path} after ${retries} attempts: ${err.message}`
        );
      }
      const delay = backoffMs * Math.pow(2, attempt - 1);
      console.warn(
        `🔄 [TMDB Retry] Attempt ${attempt}/${retries} failed for ${path}: ${err.message}. Retrying in ${delay}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error(`TMDB fetch failed unexpectedly for ${path}`);
}

/**
 * TMDB Endpoints Client
 */
export const tmdbClient = {
  /**
   * 1. /trending/movie/day
   */
  async getTrendingMoviesDay(): Promise<TMDBRawItem[]> {
    const data = await tmdbFetchWithRetry<{ results: TMDBRawItem[] }>(
      "/trending/movie/day"
    );
    return (data.results || []).map((m) => ({ ...m, media_type: "movie" }));
  },

  /**
   * 2. /trending/tv/day
   */
  async getTrendingTvDay(): Promise<TMDBRawItem[]> {
    const data = await tmdbFetchWithRetry<{ results: TMDBRawItem[] }>(
      "/trending/tv/day"
    );
    return (data.results || []).map((t) => ({ ...t, media_type: "tv" }));
  },

  /**
   * 3. /movie/now_playing
   */
  async getNowPlayingMovies(page = 1): Promise<TMDBRawItem[]> {
    const data = await tmdbFetchWithRetry<{ results: TMDBRawItem[] }>(
      "/movie/now_playing",
      { page }
    );
    return (data.results || []).map((m) => ({ ...m, media_type: "movie" }));
  },

  /**
   * 4. /movie/upcoming
   */
  async getUpcomingMovies(page = 1): Promise<TMDBRawItem[]> {
    const data = await tmdbFetchWithRetry<{ results: TMDBRawItem[] }>(
      "/movie/upcoming",
      { page }
    );
    return (data.results || []).map((m) => ({ ...m, media_type: "movie" }));
  },

  /**
   * 5. /movie/top_rated
   */
  async getTopRatedMovies(page = 1): Promise<TMDBRawItem[]> {
    const data = await tmdbFetchWithRetry<{ results: TMDBRawItem[] }>(
      "/movie/top_rated",
      { page }
    );
    return (data.results || []).map((m) => ({ ...m, media_type: "movie" }));
  },

  /**
   * 6. /tv/top_rated
   */
  async getTopRatedTv(page = 1): Promise<TMDBRawItem[]> {
    const data = await tmdbFetchWithRetry<{ results: TMDBRawItem[] }>(
      "/tv/top_rated",
      { page }
    );
    return (data.results || []).map((t) => ({ ...t, media_type: "tv" }));
  },

  /**
   * 7. /tv/popular
   */
  async getPopularTv(page = 1): Promise<TMDBRawItem[]> {
    const data = await tmdbFetchWithRetry<{ results: TMDBRawItem[] }>(
      "/tv/popular",
      { page }
    );
    return (data.results || []).map((t) => ({ ...t, media_type: "tv" }));
  },

  /**
   * 8. /movie/{id}/images or /tv/{id}/images
   * Fetches high-resolution stylized PNG logos for Featured items
   */
  async getTitleLogo(
    id: number,
    mediaType: MediaType
  ): Promise<string | null> {
    try {
      const endpoint = `/${mediaType}/${id}/images`;
      const data = await tmdbFetchWithRetry<{ logos?: TMDBImageLogo[] }>(
        endpoint,
        {
          include_image_language: "en,null",
        }
      );

      const logos = data.logos || [];
      if (logos.length === 0) return null;

      // Prefer English logos (iso_639_1 === 'en'), sorted by highest vote_average
      const englishLogos = logos
        .filter((l) => l.iso_639_1 === "en")
        .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));

      if (englishLogos.length > 0 && englishLogos[0].file_path) {
        return englishLogos[0].file_path;
      }

      // Fallback: Highest rated logo regardless of language
      const sortedByRating = [...logos].sort(
        (a, b) => (b.vote_average || 0) - (a.vote_average || 0)
      );
      return sortedByRating[0]?.file_path || null;
    } catch (err: any) {
      console.warn(
        `[TMDB Images] Failed to fetch logo for ${mediaType} ${id}: ${err.message}`
      );
      return null;
    }
  },
};
