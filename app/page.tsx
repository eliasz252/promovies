"use client";

import { useState, useMemo } from "react";
import HeroBanner from "@/components/home/HeroBanner";
import Top10Carousel from "@/components/home/Top10Carousel";
import MediaCarousel from "@/components/home/MediaCarousel";
import MediaPreviewModal from "@/components/media/MediaPreviewModal";
import { MediaItem } from "@/types/tmdb";
import { useProfileStore } from "@/store/useProfileStore";
import { MOCK_MEDIA_ITEMS, getKidsContent } from "@/lib/tmdb/mockData";
import { useCatalog } from "@/hooks/useCatalog";
import { AdNativeBanner, AdBanner320x50, AdBanner300x250 } from "@/components/ads/AdUnit";

export default function HomePage() {
  const { activeProfile } = useProfileStore();
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Live synced catalog items from the reactive store
  const catalogData = useCatalog();

  // Content filtered based on active profile (e.g. Kids profile)
  const items = useMemo(() => {
    return activeProfile.isKids ? getKidsContent(MOCK_MEDIA_ITEMS) : MOCK_MEDIA_ITEMS;
  }, [activeProfile.isKids]);

  // Curated hero featured items: prefer live synced featured (new 2025-2026 movies only), with robust fallback
  const featuredItems = useMemo(() => {
    if (catalogData?.featured && catalogData.featured.length > 0) {
      const movies = catalogData.featured.filter(
        (m) => (m.media_type === "movie" || !m.name) && m.backdrop_path
      );
      if (movies.length > 0) {
        return activeProfile.isKids ? getKidsContent(movies) : movies;
      }
    }
    const pool = [
      ...(catalogData?.allMovies || []),
      ...items.filter((m) => m.media_type === "movie" || !m.name),
    ];
    const seen = new Set<number>();
    const movieFallback = pool
      .filter((m) => {
        if (!m.backdrop_path || seen.has(m.id)) return false;
        seen.add(m.id);
        return (m.release_date || "") >= "2025-01-01";
      })
      .sort((a, b) => {
        const dateA = a.release_date || "";
        const dateB = b.release_date || "";
        if (dateB !== dateA) return dateB.localeCompare(dateA);
        return (b.popularity || 0) - (a.popularity || 0);
      })
      .slice(0, 6);

    return activeProfile.isKids ? getKidsContent(movieFallback) : movieFallback;
  }, [catalogData, items, activeProfile.isKids]);

  // Top 10 Leaderboard: live synced Top 10 Today (ranked 1-10)
  const top10Items = useMemo(() => {
    const list = catalogData?.top10 && catalogData.top10.length >= 10
      ? catalogData.top10.filter((m) => m.media_type === "movie" || !m.name)
      : [];

    if (list.length >= 10) {
      return activeProfile.isKids ? getKidsContent(list.slice(0, 10)) : list.slice(0, 10);
    }

    // Blend with trending movies to ensure exactly 10 distinct high-velocity items
    const candidates = [
      ...(catalogData?.top10 || []),
      ...(catalogData?.trendingMovies || []),
      ...(catalogData?.nowPlaying || []),
      ...items.filter((m) => m.media_type === "movie"),
    ];
    const seen = new Set<number>();
    const top10: MediaItem[] = [];
    for (const m of candidates) {
      if ((m.media_type === "movie" || !m.name) && m.poster_path && !seen.has(m.id)) {
        seen.add(m.id);
        top10.push(m);
        if (top10.length === 10) break;
      }
    }
    return activeProfile.isKids ? getKidsContent(top10) : top10;
  }, [catalogData, items, activeProfile.isKids]);

  // New & Upcoming Movies (2025 - 2026): all new 2025/2026 releases from upcoming, nowPlaying, syncedMovies
  const newMovies = useMemo(() => {
    const candidates = [
      ...(catalogData?.upcoming || []),
      ...(catalogData?.nowPlaying || []),
      ...(catalogData?.allMovies || []),
      ...items.filter((m) => m.media_type === "movie"),
    ];
    const seen = new Set<number>();
    const list: MediaItem[] = [];
    for (const m of candidates) {
      if (
        (m.media_type === "movie" || !m.name) &&
        m.poster_path &&
        (m.release_date || "") >= "2025-01-01" &&
        !seen.has(m.id)
      ) {
        seen.add(m.id);
        list.push(m);
      }
    }
    list.sort((a, b) => {
      const dateA = a.release_date || "";
      const dateB = b.release_date || "";
      if (dateB !== dateA) return dateB.localeCompare(dateA);
      return (b.popularity || 0) - (a.popularity || 0);
    });
    return activeProfile.isKids ? getKidsContent(list) : list;
  }, [catalogData, items, activeProfile.isKids]);

  // Trending Movies: live daily trending feed from TMDB
  const trendingMovies = useMemo(() => {
    const candidates = [
      ...(catalogData?.trendingMovies || []),
      ...(catalogData?.nowPlaying || []),
      ...(catalogData?.allMovies || []),
      ...items.filter((m) => m.media_type === "movie"),
    ];
    const seen = new Set<number>();
    const list: MediaItem[] = [];
    for (const m of candidates) {
      if ((m.media_type === "movie" || !m.name) && m.poster_path && !seen.has(m.id)) {
        seen.add(m.id);
        list.push(m);
      }
    }
    list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    return activeProfile.isKids ? getKidsContent(list) : list;
  }, [catalogData, items, activeProfile.isKids]);

  // Binge-Worthy TV Shows: trending and popular television series
  const trendingShows = useMemo(() => {
    const candidates = [
      ...(catalogData?.trendingTv || []),
      ...(catalogData?.allShows || []),
      ...items.filter((m) => m.media_type === "tv" || !!m.name),
    ];
    const seen = new Set<number>();
    const list: MediaItem[] = [];
    for (const m of candidates) {
      if ((m.media_type === "tv" || !!m.name) && m.poster_path && !seen.has(m.id)) {
        seen.add(m.id);
        list.push(m);
      }
    }
    list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    return activeProfile.isKids ? getKidsContent(list) : list;
  }, [catalogData, items, activeProfile.isKids]);

  // Anime Discovery: genre 16 across synced media and curated anime catalog
  const animeItems = useMemo(() => {
    const candidates = [
      ...(catalogData?.allMedia || []),
      ...(catalogData?.allMovies || []),
      ...(catalogData?.allShows || []),
      ...items,
    ];
    const seen = new Set<number>();
    const list: MediaItem[] = [];
    for (const m of candidates) {
      const isAnime =
        m.genre_ids?.includes(16) ||
        m.genres?.some((g: any) => {
          const name = (typeof g === "string" ? g : g.name || "").toLowerCase();
          return name.includes("animation") || name.includes("anime");
        });
      if (isAnime && m.poster_path && !seen.has(m.id)) {
        seen.add(m.id);
        list.push(m);
      }
    }
    list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    return activeProfile.isKids ? getKidsContent(list) : list;
  }, [catalogData, items, activeProfile.isKids]);

  // Action & Adrenaline: genre 28 and 10759
  const actionItems = useMemo(() => {
    const candidates = [
      ...(catalogData?.allMedia || []),
      ...(catalogData?.allMovies || []),
      ...items,
    ];
    const seen = new Set<number>();
    const list: MediaItem[] = [];
    for (const m of candidates) {
      const isAction =
        m.genre_ids?.includes(28) ||
        m.genre_ids?.includes(10759) ||
        m.genres?.some((g: any) => {
          const name = (typeof g === "string" ? g : g.name || "").toLowerCase();
          return name.includes("action");
        });
      if (isAction && m.poster_path && !seen.has(m.id)) {
        seen.add(m.id);
        list.push(m);
      }
    }
    list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    return activeProfile.isKids ? getKidsContent(list) : list;
  }, [catalogData, items, activeProfile.isKids]);

  // Sci-Fi & Cosmic Adventures: genre 878 and 10765
  const scifiItems = useMemo(() => {
    const candidates = [
      ...(catalogData?.allMedia || []),
      ...(catalogData?.allMovies || []),
      ...items,
    ];
    const seen = new Set<number>();
    const list: MediaItem[] = [];
    for (const m of candidates) {
      const isScifi =
        m.genre_ids?.includes(878) ||
        m.genre_ids?.includes(10765) ||
        m.genres?.some((g: any) => {
          const name = (typeof g === "string" ? g : g.name || "").toLowerCase();
          return name.includes("sci-fi") || name.includes("science fiction");
        });
      if (isScifi && m.poster_path && !seen.has(m.id)) {
        seen.add(m.id);
        list.push(m);
      }
    }
    list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    return activeProfile.isKids ? getKidsContent(list) : list;
  }, [catalogData, items, activeProfile.isKids]);

  const handleOpenModal = (media: MediaItem) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`flex flex-col gap-10 pb-24 overflow-hidden bg-[#0b0b0f] ${
          isModalOpen ? "pointer-events-none select-none" : ""
        }`}
        aria-hidden={isModalOpen}
      >
        {/* Cinematic Hero Experience */}
        <HeroBanner
          featuredItems={featuredItems.length > 0 ? featuredItems : items.filter((m) => m.media_type === "movie").slice(0, 5)}
          onOpenModal={handleOpenModal}
        />

        {/* Main Content Rows */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-10 -mt-16 sm:-mt-24 relative z-20">
          {/* Today's Top 10 Leaderboard */}
          <Top10Carousel items={top10Items} onOpenModal={handleOpenModal} />

          {/* ── Ad: 320×50 Leaderboard (after Top 10 — peak engagement) ── */}
          <AdBanner320x50 />

          {/* New & Upcoming Movies Carousel */}
          <MediaCarousel
            title="New & Upcoming Movies (2025 - 2026)"
            items={newMovies}
            viewAllHref="/new-and-popular"
            onOpenModal={handleOpenModal}
          />

          {/* Trending Movies Carousel */}
          <MediaCarousel
            title="Trending Movies"
            items={trendingMovies}
            viewAllHref="/movies"
            onOpenModal={handleOpenModal}
          />

          {/* ── Ad: 300×250 Rectangle (mid-page, highest RPM format) ── */}
          <AdBanner300x250 />

          {/* Popular TV Shows Carousel */}
          <MediaCarousel
            title="Binge-Worthy TV Shows"
            items={trendingShows}
            viewAllHref="/shows"
            onOpenModal={handleOpenModal}
          />

          {/* ── Ad: Native Banner (between TV & Anime — high scroll depth) ── */}
          <AdNativeBanner />

          {/* Anime Discovery Row */}
          <MediaCarousel
            title="Anime Discovery"
            items={animeItems}
            viewAllHref="/anime"
            onOpenModal={handleOpenModal}
          />

          {/* Action & Adrenaline Blockbusters */}
          <MediaCarousel
            title="Action & Adrenaline"
            items={actionItems}
            viewAllHref="/genre/28"
            onOpenModal={handleOpenModal}
          />

          {/* Sci-Fi & Cosmic Adventures */}
          <MediaCarousel
            title="Sci-Fi & Cosmic Adventures"
            items={scifiItems}
            viewAllHref="/genre/878"
            onOpenModal={handleOpenModal}
          />
        </div>
      </div>

      {/* Signature Detail Modal */}
      <MediaPreviewModal
        media={selectedMedia}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
