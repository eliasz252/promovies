import fs from "fs";
import path from "path";
import { SyncedMovie } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const MOVIES_FILE = path.join(DATA_DIR, "synced-movies.json");

function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Loads all synced movies from data/synced-movies.json
 */
export function getAllSyncedMovies(): SyncedMovie[] {
  try {
    ensureDirectoryExists(DATA_DIR);
    if (!fs.existsSync(MOVIES_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(MOVIES_FILE, "utf-8");
    if (!raw.trim()) return [];
    return JSON.parse(raw) as SyncedMovie[];
  } catch (err) {
    console.error("[Store] Failed to read synced-movies.json:", err);
    return [];
  }
}

/**
 * Find a movie by its TMDB ID
 */
export function getMovieByTmdbId(tmdbId: number): SyncedMovie | undefined {
  const movies = getAllSyncedMovies();
  return movies.find((m) => m.tmdb_id === tmdbId);
}

/**
 * Robustly saves all movies to data/synced-movies.json with retries on Windows EPERM
 */
export function saveAllSyncedMovies(movies: SyncedMovie[]): void {
  ensureDirectoryExists(DATA_DIR);
  const content = JSON.stringify(movies, null, 2);

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      fs.writeFileSync(MOVIES_FILE, content, "utf-8");
      return;
    } catch (err: any) {
      if ((err.code === "EPERM" || err.code === "EBUSY") && attempt < 3) {
        // Wait 100ms before retry to let Windows file lock release
        const waitMs = 100 * attempt;
        const now = Date.now();
        while (Date.now() - now < waitMs) {
          // busy wait
        }
        continue;
      }
      throw err;
    }
  }
}

/**
 * Smart batch upsert: performs in-memory deduplication and changes tracking,
 * then commits once to disk to avoid Windows file-lock contention.
 */
export function upsertMoviesBatch(
  moviesData: Omit<SyncedMovie, "created_at" | "updated_at">[]
): {
  added: SyncedMovie[];
  updated: SyncedMovie[];
  unchangedCount: number;
} {
  const currentMovies = getAllSyncedMovies();
  const movieMap = new Map<number, SyncedMovie>();
  currentMovies.forEach((m) => movieMap.set(m.tmdb_id, m));

  const added: SyncedMovie[] = [];
  const updated: SyncedMovie[] = [];
  let unchangedCount = 0;
  const now = new Date().toISOString();

  const fieldsToCheck: (keyof Omit<SyncedMovie, "created_at" | "updated_at">)[] = [
    "title",
    "overview",
    "vote_average",
    "vote_count",
    "runtime",
    "release_date",
    "poster_path",
    "backdrop_path",
    "trailer_url",
    "status",
  ];

  for (const item of moviesData) {
    const existing = movieMap.get(item.tmdb_id);

    if (!existing) {
      const newMovie: SyncedMovie = {
        ...item,
        created_at: now,
        updated_at: now,
      };
      movieMap.set(item.tmdb_id, newMovie);
      added.push(newMovie);
    } else {
      let hasChanged = false;
      for (const field of fieldsToCheck) {
        if (existing[field] !== item[field]) {
          hasChanged = true;
          break;
        }
      }

      if (!hasChanged && JSON.stringify(existing.genres) !== JSON.stringify(item.genres)) {
        hasChanged = true;
      }

      if (hasChanged) {
        const updatedMovie: SyncedMovie = {
          ...existing,
          ...item,
          updated_at: now,
        };
        movieMap.set(item.tmdb_id, updatedMovie);
        updated.push(updatedMovie);
      } else {
        unchangedCount++;
      }
    }
  }

  // If changes occurred, commit once
  if (added.length > 0 || updated.length > 0) {
    const finalList = Array.from(movieMap.values());
    // Sort so newly added/released are prominent
    finalList.sort((a, b) => (b.release_date || "").localeCompare(a.release_date || ""));
    saveAllSyncedMovies(finalList);
  }

  return { added, updated, unchangedCount };
}

/**
 * Smart upsert for single movie
 */
export function upsertMovie(movieData: Omit<SyncedMovie, "created_at" | "updated_at">): {
  status: "added" | "updated" | "unchanged";
  movie: SyncedMovie;
} {
  const result = upsertMoviesBatch([movieData]);
  if (result.added.length > 0) {
    return { status: "added", movie: result.added[0] };
  }
  if (result.updated.length > 0) {
    return { status: "updated", movie: result.updated[0] };
  }
  return { status: "unchanged", movie: getMovieByTmdbId(movieData.tmdb_id)! };
}
