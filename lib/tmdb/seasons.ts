import { Season, Episode } from "@/types/tmdb";

/**
 * Fetches all seasons for a given TV show or Anime from /api/season.
 * Automatically excludes Season 0 (Specials) unless includeSpecials is true.
 */
export async function fetchTVSeasons(
  tvId: string | number,
  includeSpecials = false
): Promise<Season[]> {
  try {
    const res = await fetch(
      `/api/season?tvId=${tvId}&includeSpecials=${includeSpecials}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch seasons: ${res.statusText}`);
    }
    const data = await res.json();
    return data.seasons || [];
  } catch (error) {
    console.error("[fetchTVSeasons Error]:", error);
    return [];
  }
}

/**
 * Fetches all real episodes for a specific season from /api/season.
 */
export async function fetchSeasonEpisodes(
  tvId: string | number,
  seasonNumber: number
): Promise<{ name?: string; episodes: Episode[] }> {
  try {
    const res = await fetch(`/api/season?tvId=${tvId}&season=${seasonNumber}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch episodes for season ${seasonNumber}`);
    }
    const data = await res.json();
    return {
      name: data.name,
      episodes: data.episodes || [],
    };
  } catch (error) {
    console.error("[fetchSeasonEpisodes Error]:", error);
    return { episodes: [] };
  }
}
