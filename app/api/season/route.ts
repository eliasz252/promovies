import { NextRequest, NextResponse } from "next/server";
import { Season, Episode } from "@/types/tmdb";

const TMDB_API_KEY =
  process.env.TMDB_API_KEY ||
  process.env.NEXT_PUBLIC_TMDB_API_KEY ||
  "4e44d9029b1270a757cddc766a1bcb63";
const TMDB_BASE_URL = process.env.TMDB_API_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_BACKUP_BASE = "https://db.wecollege.net/3";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tvId = searchParams.get("tvId") || searchParams.get("showId") || searchParams.get("id") || searchParams.get("seriesId");
  const seasonParam = searchParams.get("seasonNumber") || searchParams.get("season") || searchParams.get("season_number");
  const includeSpecials = searchParams.get("includeSpecials") === "true";

  if (!tvId) {
    return NextResponse.json(
      { error: "Missing required parameter 'tvId' (or 'id')." },
      { status: 400 }
    );
  }

  try {
    // Case 1: Fetch episodes for a specific season: /tv/{tv_id}/season/{season_number}
    if (seasonParam !== null && seasonParam !== undefined && seasonParam !== "") {
      const seasonNumber = parseInt(seasonParam, 10);
      if (isNaN(seasonNumber)) {
        return NextResponse.json(
          { error: "Invalid 'seasonNumber' parameter." },
          { status: 400 }
        );
      }

      // Try official TMDB
      let data: any = null;
      try {
        const url = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${TMDB_API_KEY}`;
        const res = await fetch(url, {
          headers: { Accept: "application/json" },
          next: { revalidate: 3600 },
        });
        if (res.ok) {
          data = await res.json();
        }
      } catch (err) {
        console.warn("[Season API] Official TMDB fetch failed, trying backup:", err);
      }

      // Backup proxy if official failed
      if (!data) {
        try {
          const backupUrl = `${TMDB_BACKUP_BASE}/tv/${tvId}/season/${seasonNumber}`;
          const res = await fetch(backupUrl, {
            headers: { Accept: "application/json" },
            next: { revalidate: 3600 },
          });
          if (res.ok) {
            data = await res.json();
          }
        } catch (err) {
          console.warn("[Season API] Backup TMDB fetch failed:", err);
        }
      }

      if (data && Array.isArray(data.episodes)) {
        return NextResponse.json({
          id: data.id,
          name: data.name || `Season ${seasonNumber}`,
          season_number: data.season_number ?? seasonNumber,
          overview: data.overview || "",
          air_date: data.air_date,
          poster_path: data.poster_path || null,
          episodes: data.episodes as Episode[],
        });
      }

      return NextResponse.json(
        { error: `Season ${seasonNumber} not found for TV ID ${tvId}.` },
        { status: 404 }
      );
    }

    // Case 2: Fetch all seasons for the show: /tv/{tv_id}
    let showData: any = null;
    try {
      const url = `${TMDB_BASE_URL}/tv/${tvId}?api_key=${TMDB_API_KEY}`;
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        showData = await res.json();
      }
    } catch (err) {
      console.warn("[Season API] Official TMDB show fetch failed, trying backup:", err);
    }

    if (!showData) {
      try {
        const backupUrl = `${TMDB_BACKUP_BASE}/tv/${tvId}`;
        const res = await fetch(backupUrl, {
          headers: { Accept: "application/json" },
          next: { revalidate: 3600 },
        });
        if (res.ok) {
          showData = await res.json();
        }
      } catch (err) {
        console.warn("[Season API] Backup TMDB show fetch failed:", err);
      }
    }

    if (showData && Array.isArray(showData.seasons)) {
      // Filter out Season 0 (Specials) unless includeSpecials is true
      const seasons = (showData.seasons as Season[]).filter(
        (s) => includeSpecials || s.season_number > 0
      );

      return NextResponse.json({
        id: showData.id,
        name: showData.name,
        number_of_seasons: showData.number_of_seasons,
        number_of_episodes: showData.number_of_episodes,
        backdrop_path: showData.backdrop_path,
        poster_path: showData.poster_path,
        seasons,
      });
    }

    return NextResponse.json(
      { error: `Show details not found for TV ID ${tvId}.` },
      { status: 404 }
    );
  } catch (err: any) {
    console.error("[Season API Error]:", err);
    return NextResponse.json(
      { error: "Internal server error fetching season data." },
      { status: 500 }
    );
  }
}
