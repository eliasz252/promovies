"use client";

import { useState, useEffect } from "react";
import { MediaItem } from "@/types/tmdb";
import rawSyncedCatalog from "@/data/synced-catalog.json";
import rawSyncedMovies from "@/data/synced-movies.json";

export interface SyncedCatalogState {
  featured: MediaItem[];
  top10: MediaItem[];
  nowPlaying: MediaItem[];
  trendingMovies: MediaItem[];
  trendingTv: MediaItem[];
  upcoming: MediaItem[];
  topRated: MediaItem[];
  allMedia: MediaItem[];
  allMovies: MediaItem[];
  allShows: MediaItem[];
}

function parseCatalogItem(item: any): MediaItem {
  return {
    id: Number(item.tmdb_id),
    title: item.title || "Untitled",
    name: item.media_type === "tv" ? item.title : undefined,
    overview: item.overview || "",
    poster_path: item.poster_path || null,
    backdrop_path: item.backdrop_path || item.poster_path || null,
    logo_path: item.logo_path || null,
    media_type: item.media_type || "movie",
    release_date: item.release_date || undefined,
    first_air_date: item.media_type === "tv" ? item.release_date : undefined,
    vote_average: typeof item.vote_average === "number" ? item.vote_average : 7.5,
    vote_count: 500,
    popularity: item.rank ? 2000 - item.rank * 50 : 1000,
    genre_ids: Array.isArray(item.genre_ids) ? item.genre_ids : [],
    genres: Array.isArray(item.genre_ids)
      ? item.genre_ids.map((id: number) => ({ id, name: "" }))
      : [],
    quality_badge: "4K UHD",
    age_rating: "PG-13",
  };
}

function parseSyncedMovie(m: any): MediaItem {
  const id = Number(m.tmdb_id || m.id);
  return {
    id,
    title: m.title || "Untitled",
    overview: m.overview || "",
    poster_path: m.poster_path || null,
    backdrop_path: m.backdrop_path || m.poster_path || null,
    logo_path: null,
    media_type: "movie",
    release_date: m.release_date || undefined,
    vote_average: typeof m.vote_average === "number" ? m.vote_average : 7.5,
    vote_count: m.vote_count || 500,
    popularity: m.popularity || 1000,
    genre_ids: Array.isArray(m.genre_ids) ? m.genre_ids : [],
    genres: Array.isArray(m.genres)
      ? m.genres.map((g: any) => (typeof g === "string" ? { id: 0, name: g } : g))
      : [],
    quality_badge: "4K UHD",
    age_rating: "PG-13",
  };
}

function buildInitialCatalog(): SyncedCatalogState {
  const grouped: Record<string, any[]> = {
    featured: [],
    top10: [],
    now_playing: [],
    trending_tv: [],
    upcoming: [],
    top_rated: [],
    trending_movies: [],
  };

  const rawList = Array.isArray(rawSyncedCatalog) ? rawSyncedCatalog : [];
  for (const item of rawList) {
    if (item.is_active && grouped[item.category]) {
      grouped[item.category].push(item);
    }
  }

  for (const cat of Object.keys(grouped)) {
    grouped[cat].sort((a, b) => {
      if (a.rank !== null && b.rank !== null) return a.rank - b.rank;
      if (a.rank !== null) return -1;
      if (b.rank !== null) return 1;
      return (b.vote_average || 0) - (a.vote_average || 0);
    });
  }

  const featured = grouped.featured.map(parseCatalogItem);
  const top10 = grouped.top10.map(parseCatalogItem);
  const nowPlaying = grouped.now_playing.map(parseCatalogItem);
  const trendingMovies = grouped.trending_movies.map(parseCatalogItem);
  const trendingTv = grouped.trending_tv.map(parseCatalogItem);
  const upcoming = grouped.upcoming.map(parseCatalogItem);
  const topRated = grouped.top_rated.map(parseCatalogItem);

  const seenIds = new Set<number>();
  const allMedia: MediaItem[] = [];
  [...featured, ...top10, ...nowPlaying, ...trendingMovies, ...trendingTv, ...upcoming, ...topRated].forEach((m) => {
    if (!seenIds.has(m.id)) {
      seenIds.add(m.id);
      allMedia.push(m);
    }
  });

  const rawMovies = Array.isArray(rawSyncedMovies) ? rawSyncedMovies : [];
  rawMovies.forEach((m: any) => {
    const id = Number(m.tmdb_id || m.id);
    if (id && !seenIds.has(id)) {
      seenIds.add(id);
      allMedia.push(parseSyncedMovie(m));
    }
  });

  return {
    featured,
    top10,
    nowPlaying,
    trendingMovies,
    trendingTv,
    upcoming,
    topRated,
    allMedia,
    allMovies: allMedia.filter((m) => m.media_type === "movie"),
    allShows: allMedia.filter((m) => m.media_type === "tv"),
  };
}

// Pre-seeded synchronously so there is ZERO flash of null/stale fallback on page refresh
let cachedCatalog: SyncedCatalogState = buildInitialCatalog();
let isFetching = false;
const listeners: Array<(data: SyncedCatalogState) => void> = [];

export function useCatalog(): SyncedCatalogState {
  const [catalog, setCatalog] = useState<SyncedCatalogState>(cachedCatalog);

  useEffect(() => {
    const onUpdate = (data: SyncedCatalogState) => setCatalog(data);
    listeners.push(onUpdate);

    if (!isFetching) {
      isFetching = true;
      fetch("/api/catalog")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.catalog) {
            const mapToMedia = (catItems: any[]): MediaItem[] =>
              (Array.isArray(catItems) ? catItems : []).map(parseCatalogItem);

            const featured = mapToMedia(data.catalog.featured);
            const top10 = mapToMedia(data.catalog.top10);
            const nowPlaying = mapToMedia(data.catalog.now_playing);
            const trendingMovies = mapToMedia(data.catalog.trending_movies);
            const trendingTv = mapToMedia(data.catalog.trending_tv);
            const upcoming = mapToMedia(data.catalog.upcoming);
            const topRated = mapToMedia(data.catalog.top_rated);

            const seenIds = new Set<number>();
            const allMedia: MediaItem[] = [];
            [...featured, ...top10, ...nowPlaying, ...trendingMovies, ...trendingTv, ...upcoming, ...topRated].forEach((m) => {
              if (!seenIds.has(m.id)) {
                seenIds.add(m.id);
                allMedia.push(m);
              }
            });

            const rawMovies = Array.isArray(rawSyncedMovies) ? rawSyncedMovies : [];
            rawMovies.forEach((m: any) => {
              const id = Number(m.tmdb_id || m.id);
              if (id && !seenIds.has(id)) {
                seenIds.add(id);
                allMedia.push(parseSyncedMovie(m));
              }
            });

            const allMovies = allMedia.filter((m) => m.media_type === "movie");
            const allShows = allMedia.filter((m) => m.media_type === "tv");

            cachedCatalog = {
              featured,
              top10,
              nowPlaying,
              trendingMovies,
              trendingTv,
              upcoming,
              topRated,
              allMedia,
              allMovies,
              allShows,
            };

            listeners.forEach((l) => l(cachedCatalog));
          }
        })
        .catch((err) => console.warn("[useCatalog] Could not load catalog:", err))
        .finally(() => {
          isFetching = false;
        });
    }

    return () => {
      const idx = listeners.indexOf(onUpdate);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }, []);

  return catalog;
}
