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

  // Curated hero featured items: prefer live synced featured (new movies only), with local fallback
  const featuredItems = useMemo(() => {
    if (catalogData?.featured && catalogData.featured.length > 0) {
      const movies = catalogData.featured.filter(
        (m) => (m.media_type === "movie" || !m.name) && m.backdrop_path
      );
      if (movies.length > 0) {
        return activeProfile.isKids ? getKidsContent(movies) : movies;
      }
    }
    const movieFallback = [...items]
      .filter((m) => (m.media_type === "movie" || !m.name) && m.backdrop_path)
      .sort((a, b) => {
        const dateA = a.release_date || "";
        const dateB = b.release_date || "";
        if (dateB !== dateA) return dateB.localeCompare(dateA);
        return (b.popularity || 0) - (a.popularity || 0);
      })
      .slice(0, 6);
    return activeProfile.isKids ? getKidsContent(movieFallback) : movieFallback;
  }, [catalogData, items, activeProfile.isKids]);

  // Top 10 Leaderboard: prefer live synced Top 10 Today (new movies only)
  const top10Items = useMemo(() => {
    if (catalogData?.top10 && catalogData.top10.length > 0) {
      const movies = catalogData.top10.filter((m) => m.media_type === "movie" || !m.name);
      if (movies.length > 0) {
        return activeProfile.isKids ? getKidsContent(movies) : movies;
      }
    }
    const movieFallback = [...items]
      .filter((m) => m.media_type === "movie" || !m.name)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 10);
    return activeProfile.isKids ? getKidsContent(movieFallback) : movieFallback;
  }, [catalogData, items, activeProfile.isKids]);

  // Now Playing & Upcoming: prefer live synced now_playing
  const newMovies = useMemo(() => {
    if (catalogData?.nowPlaying && catalogData.nowPlaying.length > 0) {
      return activeProfile.isKids ? getKidsContent(catalogData.nowPlaying) : catalogData.nowPlaying;
    }
    return [...items]
      .filter((m) => m.media_type === "movie" && (m.release_date || "") >= "2024-06-01")
      .sort((a, b) => {
        const dateA = a.release_date || "";
        const dateB = b.release_date || "";
        return dateB.localeCompare(dateA);
      });
  }, [catalogData, items, activeProfile.isKids]);

  const trendingMovies = useMemo(() => {
    if (catalogData?.topRated && catalogData.topRated.length > 0) {
      const filtered = catalogData.topRated.filter((m) => m.media_type === "movie");
      if (filtered.length > 0) {
        return activeProfile.isKids ? getKidsContent(filtered) : filtered;
      }
    }
    return items.filter((m) => m.media_type === "movie");
  }, [catalogData, items, activeProfile.isKids]);

  const trendingShows = useMemo(() => {
    if (catalogData?.trendingTv && catalogData.trendingTv.length > 0) {
      return activeProfile.isKids ? getKidsContent(catalogData.trendingTv) : catalogData.trendingTv;
    }
    return items.filter((m) => m.media_type === "tv");
  }, [catalogData, items, activeProfile.isKids]);

  const animeItems = useMemo(() => items.filter((m) => m.genre_ids?.includes(16)), [items]);
  const scifiItems = useMemo(() => items.filter((m) => m.genre_ids?.includes(878)), [items]);
  const actionItems = useMemo(() => items.filter((m) => m.genre_ids?.includes(28)), [items]);

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
