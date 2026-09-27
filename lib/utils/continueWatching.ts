export interface ContinueWatchingRecord {
  id: number;
  type: "movie" | "tv";
  season?: number;
  episode?: number;
  currentTime: number; // in seconds
  duration: number; // in seconds
  percent: number; // 0 - 100
  updatedAt: string; // ISO timestamp
  title: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
}

export const STORAGE_KEY = "continueWatching";
export const CLEARED_KEY = "continueWatchingCleared";
export const VERSION_KEY = "continueWatchingVersion";
export const CURRENT_CW_VERSION = "v4-clean";

// Clean state: no pre-seeded records (user starts fresh)
export const DEFAULT_SEED_RECORDS: ContinueWatchingRecord[] = [];

/**
 * Clear all continue watching history completely
 */
export function clearAllContinueWatching(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    localStorage.setItem(CLEARED_KEY, "true");
    localStorage.setItem(VERSION_KEY, CURRENT_CW_VERSION);
    window.dispatchEvent(new Event("continueWatchingUpdated"));
  } catch {}
}

/**
 * Read the continue watching list from localStorage.
 * Only returns items between ~2% and ~95% watched.
 */
export function getContinueWatchingList(): ContinueWatchingRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const version = localStorage.getItem(VERSION_KEY);

    // Auto-migrate from older version with fake seeded items to v4 clean state
    if (version !== CURRENT_CW_VERSION) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      localStorage.setItem(VERSION_KEY, CURRENT_CW_VERSION);
      localStorage.setItem(CLEARED_KEY, "true");
      return [];
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    let parsed: ContinueWatchingRecord[] = [];
    try {
      const json = JSON.parse(raw);
      if (Array.isArray(json)) parsed = json;
    } catch {
      parsed = [];
    }

    // Filter valid items: must have positive duration and valid currentTime
    const valid = parsed.filter((item: ContinueWatchingRecord) => {
      if (!item || !item.id || typeof item.currentTime !== "number" || typeof item.duration !== "number") {
        return false;
      }
      if (item.duration <= 0) return false;
      const pct = (item.currentTime / item.duration) * 100;
      // Only remove if finished (>= 95%)
      return pct < 95;
    });

    // Sort most recently watched first
    valid.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return valid;
  } catch (err) {
    console.warn("Failed to read continueWatching from localStorage:", err);
    return [];
  }
}

/**
 * Retrieve saved progress for a specific title.
 */
export function getContinueWatchingItem(
  id: number,
  type?: "movie" | "tv",
  season?: number,
  episode?: number
): ContinueWatchingRecord | undefined {
  if (typeof window === "undefined") return undefined;

  const list = getContinueWatchingList();
  return list.find((item) => {
    if (item.id !== id) return false;
    if (type && item.type !== type) return false;
    if (type === "tv" && season && item.season !== season) return false;
    if (type === "tv" && episode && item.episode !== episode) return false;
    return true;
  });
}

/**
 * Save progress for a title.
 * - De-duplicates by id (+ season/episode for TV).
 * - Moves most recent item first.
 * - Removes if finished (percent >= 95%).
 */
export function saveContinueWatchingProgress(entry: {
  id: number;
  type: "movie" | "tv";
  season?: number;
  episode?: number;
  currentTime: number;
  duration?: number;
  title: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
}): void {
  if (typeof window === "undefined") return;
  if (!entry.id) return;

  const effectiveDuration = entry.duration && entry.duration > 0
    ? entry.duration
    : (entry.type === "tv" ? 2700 : 7200);

  const curTime = Math.max(0, entry.currentTime);

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let list: ContinueWatchingRecord[] = [];
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) list = parsed;
      } catch {
        list = [];
      }
    } else {
      list = [...DEFAULT_SEED_RECORDS];
    }

    const percent = Math.min(100, Math.max(0, (curTime / effectiveDuration) * 100));

    // Remove existing entry for the same media
    const filtered = list.filter((item) => {
      if (item.id !== entry.id) return true;
      if (entry.type === "tv") {
        return !(item.season === entry.season && item.episode === entry.episode);
      }
      return false;
    });

    // If finished (>= 95%), remove from Continue Watching and save
    if (percent >= 95) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new CustomEvent("continueWatchingUpdated"));
      return;
    }

    const record: ContinueWatchingRecord = {
      id: entry.id,
      type: entry.type,
      season: entry.season,
      episode: entry.episode,
      currentTime: Math.floor(curTime),
      duration: Math.floor(effectiveDuration),
      percent: Math.round(percent),
      updatedAt: new Date().toISOString(),
      title: entry.title,
      poster_path: entry.poster_path,
      backdrop_path: entry.backdrop_path,
    };

    const updated = [record, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.removeItem(CLEARED_KEY);
    window.dispatchEvent(new CustomEvent("continueWatchingUpdated"));
  } catch (err) {
    console.warn("Failed to save continueWatching progress:", err);
  }
}

/**
 * Record that a movie or episode was started/clicked by the user.
 * Immediately pushes it to the top of Continue Watching.
 */
export function recordMovieStarted(entry: {
  id: number;
  type: "movie" | "tv";
  season?: number;
  episode?: number;
  title: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  duration?: number;
}): void {
  const existing = getContinueWatchingItem(entry.id, entry.type, entry.season, entry.episode);
  const currentTime = existing && existing.currentTime > 5 ? existing.currentTime : 10;
  const duration = entry.duration && entry.duration > 0
    ? entry.duration
    : (existing?.duration || (entry.type === "tv" ? 2700 : 7200));

  saveContinueWatchingProgress({
    id: entry.id,
    type: entry.type,
    season: entry.season,
    episode: entry.episode,
    currentTime,
    duration,
    title: entry.title,
    poster_path: entry.poster_path,
    backdrop_path: entry.backdrop_path,
  });
}

/**
 * Remove an item from continue watching storage.
 */
export function removeContinueWatchingItem(
  id: number,
  type?: "movie" | "tv",
  season?: number,
  episode?: number
): void {
  if (typeof window === "undefined") return;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let list: ContinueWatchingRecord[] = [];
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) list = parsed;
      } catch {
        list = [];
      }
    }

    const updated = list.filter((item) => {
      if (item.id !== id) return true;
      if (type && item.type !== type) return true;
      if (type === "tv") {
        if (season && item.season !== season) return true;
        if (episode && item.episode !== episode) return true;
      }
      return false;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (updated.length === 0) {
      localStorage.setItem(CLEARED_KEY, "true");
    }
    window.dispatchEvent(new CustomEvent("continueWatchingUpdated"));
  } catch (err) {
    console.warn("Failed to remove continueWatching item:", err);
  }
}

/**
 * Format remaining minutes helper.
 * "X min left" = Math.ceil((duration - currentTime) / 60)
 */
export function formatMinutesLeft(currentTime: number, duration: number): string {
  const remainingSeconds = Math.max(0, duration - currentTime);
  const minutes = Math.max(1, Math.ceil(remainingSeconds / 60));
  return `${minutes}m left`;
}

import { MediaItem } from "@/types/tmdb";

export const CONTINUE_WATCHING_MEDIA_MAP: Record<number, MediaItem> = {
  108978: {
    id: 108978,
    title: "Reacher",
    name: "Reacher",
    overview:
      "Jack Reacher, a veteran military police investigator, has just recently entered civilian life. Reacher is a drifter, carrying no phone and the barest of essentials as he travels the country and explores the nation he once served.",
    poster_path: "/f1VCQIG2iCyOookdgOzwtUpwWC0.jpg",
    backdrop_path: "/pF0qkRsrHkdYadPWY9AMeFZfcwk.jpg",
    media_type: "tv",
    genre_ids: [10759, 80],
    genres: [{ id: 10759, name: "Action & Adventure" }, { id: 80, name: "Crime" }],
    vote_average: 8.1,
    vote_count: 3200,
    popularity: 4200.0,
    quality_badge: "4K UHD",
    age_rating: "TV-MA",
  },
  969681: {
    id: 969681,
    title: "Spider-Man: Brand New Day",
    name: "Spider-Man: Brand New Day",
    overview:
      "Fighting crime full-time as Spider-Man in a world that doesn't remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker he may not have the power to control.",
    poster_path: "/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
    backdrop_path: "/qeQJx07rK2xm8SD2sJxFKhE7gs0.jpg",
    media_type: "movie",
    genre_ids: [28, 12, 878],
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Sci-Fi" }],
    release_date: "2026-07-24",
    vote_average: 7.9,
    vote_count: 4890,
    popularity: 3950.0,
    quality_badge: "4K UHD",
    age_rating: "PG-13",
  },
  94605: {
    id: 94605,
    title: "Arcane",
    name: "Arcane",
    overview:
      "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and incompatible convictions.",
    poster_path: "/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    backdrop_path: "/5cvnxEHT3e39DvT6ARw4GNCFrB0.jpg",
    media_type: "tv",
    genre_ids: [16, 10765, 10759, 18],
    genres: [{ id: 16, name: "Animation" }, { id: 10765, name: "Sci-Fi & Fantasy" }],
    vote_average: 8.7,
    vote_count: 4200,
    popularity: 1850.0,
    quality_badge: "4K UHD",
    age_rating: "TV-14",
  },
  113962: {
    id: 113962,
    title: "Lioness",
    name: "Lioness",
    overview:
      "Cruz Manuelos, a rough-around-the-edges but passionate young Marine, is recruited to join the CIA's Lioness Engagement Team to help bring down a terrorist organization from within.",
    poster_path: "/rzpHPSEgPTpRs8EHbygwsOw7jC0.jpg",
    backdrop_path: "/mU7l9UaEItxHbg2YBNs0sHjoFVY.jpg",
    media_type: "tv",
    genre_ids: [18, 10768],
    genres: [{ id: 18, name: "Drama" }, { id: 10768, name: "War & Politics" }],
    vote_average: 8.2,
    vote_count: 2450,
    popularity: 3820.0,
    quality_badge: "4K UHD",
    age_rating: "TV-MA",
  },
  402431: {
    id: 402431,
    title: "Wicked",
    name: "Wicked",
    overview:
      "Elphaba, an ostracized but fiery girl born with green skin, and Glinda, a privileged and aristocratic young girl with an ambition for popularity, meet as students at Shiz University in the land of Oz and forge an unlikely but profound friendship.",
    poster_path: "/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg",
    backdrop_path: "/w22GVYotTIVC1dUd58mRhwPqiS.jpg",
    media_type: "movie",
    genre_ids: [14, 18, 10402],
    genres: [{ id: 14, name: "Fantasy" }, { id: 18, name: "Drama" }],
    vote_average: 7.6,
    vote_count: 2450,
    popularity: 2100.0,
    release_date: "2024-11-20",
    quality_badge: "4K UHD",
    age_rating: "PG",
  },
  100088: {
    id: 100088,
    title: "The Last of Us",
    name: "The Last of Us",
    overview:
      "Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone.",
    poster_path: "/uKvVjHNqB5VmOrdxqAt2V7JMrRI.jpg",
    backdrop_path: "/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
    media_type: "tv",
    genre_ids: [18, 10765, 10759],
    genres: [{ id: 18, name: "Drama" }, { id: 10765, name: "Sci-Fi & Fantasy" }],
    vote_average: 8.6,
    vote_count: 5120,
    popularity: 1420.0,
    quality_badge: "4K UHD",
    age_rating: "TV-MA",
  },
  1423191: {
    id: 1423191,
    title: "Resident Evil",
    name: "Resident Evil",
    overview:
      "Medical courier Bryan unwittingly finds himself fighting for survival as one fateful, horrifying night collapses around him in chaos.",
    poster_path: "/qku2uWSoJ9amQV5MWo1Eek29iji.jpg",
    backdrop_path: "/3icyRAqgakNcQn6aDVz9libFmBA.jpg",
    media_type: "movie",
    genre_ids: [27, 28, 53],
    genres: [{ id: 27, name: "Horror" }, { id: 28, name: "Action" }, { id: 53, name: "Thriller" }],
    vote_average: 7.4,
    vote_count: 3420,
    popularity: 3890.5,
    quality_badge: "4K UHD",
    age_rating: "R",
  },
  1184918: {
    id: 1184918,
    title: "The Wild Robot",
    name: "The Wild Robot",
    overview:
      "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose, discovering the transformative power of love, connection, and family.",
    poster_path: "/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
    backdrop_path: "/1pmXyN3sKeYoUhu5VBZiDU4BX21.jpg",
    media_type: "movie",
    genre_ids: [16, 878, 10751, 12],
    genres: [{ id: 16, name: "Animation" }, { id: 878, name: "Sci-Fi" }, { id: 10751, name: "Family" }],
    vote_average: 8.4,
    vote_count: 3820,
    popularity: 2210.4,
    quality_badge: "4K UHD",
    age_rating: "PG",
  },
};
