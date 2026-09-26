import { MediaItem, Genre, MediaType } from "@/types/tmdb";
import { TMDB_IMAGE_BASE, MOCK_MEDIA_ITEMS, GENRES_LIST, getKidsContent } from "./mockData";

export function getTMDBImageUrl(path: string | null | undefined, size: "w300" | "w500" | "w780" | "w1280" | "original" = "w500"): string {
  if (!path) {
    return "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop";
  }
  if (path.startsWith("http")) {
    return path;
  }
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getTMDBLogoUrl(path: string | null | undefined, size: "w300" | "w500" | "original" = "w500"): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export async function fetchFromTMDB<T>(path: string, params: Record<string, string | number | boolean> = {}): Promise<T> {
  const isServer = typeof window === "undefined";
  const baseUrl = isServer
    ? (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000") + "/api/tmdb"
    : "/api/tmdb";

  const url = new URL(`${baseUrl}/${path.replace(/^\//, "")}`);
  Object.entries(params).forEach(([key, val]) => {
    url.searchParams.set(key, String(val));
  });

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
    return await res.json();
  } catch (err) {
    // If running in SSR before the dev server is active or if network fails, resolve from mock data
    console.warn(`[TMDB Client] Falling back to local data for ${path}:`, err);
    return getFallbackData<T>(path, params);
  }
}

function getFallbackData<T>(path: string, params: Record<string, string | number | boolean>): T {
  let items = [...MOCK_MEDIA_ITEMS];
  if (params.isKids === "true" || params.isKids === true) {
    items = getKidsContent(items);
  }

  if (path.includes("genre/")) {
    return { genres: GENRES_LIST } as unknown as T;
  }

  if (path.includes("movie/") || path.includes("tv/")) {
    const parts = path.split("/");
    const id = parseInt(parts[parts.length - 1], 10);
    const item = MOCK_MEDIA_ITEMS.find((m) => m.id === id) || MOCK_MEDIA_ITEMS[0];
    return item as unknown as T;
  }

  if (path.includes("search/")) {
    const q = String(params.query || "").toLowerCase();
    const results = items.filter((m) => m.title.toLowerCase().includes(q));
    return { page: 1, results: results.length > 0 ? results : items.slice(0, 4) } as unknown as T;
  }

  if (path.includes("trending/tv") || path.includes("tv/popular")) {
    return { page: 1, results: items.filter((m) => m.media_type === "tv") } as unknown as T;
  }

  if (path.includes("trending/movie") || path.includes("movie/popular")) {
    return { page: 1, results: items.filter((m) => m.media_type === "movie") } as unknown as T;
  }

  return { page: 1, results: items } as unknown as T;
}

export async function getTrending(isKids = false): Promise<MediaItem[]> {
  const res = await fetchFromTMDB<{ results: MediaItem[] }>("trending/movie/day", { isKids });
  return res.results || [];
}

export async function getTrendingShows(isKids = false): Promise<MediaItem[]> {
  const res = await fetchFromTMDB<{ results: MediaItem[] }>("trending/tv/day", { isKids });
  return res.results || [];
}

export async function getTop10(isKids = false): Promise<MediaItem[]> {
  const res = await fetchFromTMDB<{ results: MediaItem[] }>("movie/top_rated", { isKids });
  return (res.results || []).slice(0, 10);
}

export async function getAnimeCatalog(isKids = false): Promise<MediaItem[]> {
  // Animation genre 16
  const res = await fetchFromTMDB<{ results: MediaItem[] }>("discover/tv", { with_genres: 16, isKids });
  return res.results || [];
}

export async function getMediaDetails(type: MediaType, id: string | number): Promise<MediaItem | null> {
  return await fetchFromTMDB<MediaItem>(`${type}/${id}`);
}
