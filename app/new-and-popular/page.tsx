"use client";

import { useState, useMemo } from "react";
import MediaCard from "@/components/media/MediaCard";
import MediaPreviewModal from "@/components/media/MediaPreviewModal";
import { MediaItem } from "@/types/tmdb";
import { MOCK_MEDIA_ITEMS, getKidsContent } from "@/lib/tmdb/mockData";
import { useProfileStore } from "@/store/useProfileStore";
import { useCatalog } from "@/hooks/useCatalog";
import { TrendingUp, Calendar, Sparkles } from "lucide-react";

export default function NewAndPopularPage() {
  const { activeProfile } = useProfileStore();
  const catalogData = useCatalog();
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = useMemo(() => {
    const synced = catalogData?.allMedia || [];
    const seenIds = new Set<number>();
    const combined: MediaItem[] = [];

    synced.forEach((m) => {
      if (!seenIds.has(m.id)) {
        seenIds.add(m.id);
        combined.push(m);
      }
    });

    MOCK_MEDIA_ITEMS.forEach((m) => {
      if (!seenIds.has(m.id)) {
        seenIds.add(m.id);
        combined.push(m);
      }
    });

    return activeProfile?.isKids ? getKidsContent(combined) : combined;
  }, [catalogData, activeProfile?.isKids]);

  const trendingNow = useMemo(() => {
    return [...items].sort((a, b) => b.popularity - a.popularity);
  }, [items]);

  const comingSoon = useMemo(() => {
    return [...items]
      .filter((m) => {
        const date = m.release_date || m.first_air_date || "";
        return date >= "2024-06-01";
      })
      .sort((a, b) => {
        const dateA = a.release_date || a.first_air_date || "";
        const dateB = b.release_date || b.first_air_date || "";
        return dateB.localeCompare(dateA);
      });
  }, [items]);

  return (
    <>
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen select-none ${
          isModalOpen ? "pointer-events-none select-none" : ""
        }`}
        aria-hidden={isModalOpen}
      >
        <div className="pb-6 border-b border-white/10 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-violet-400" />
            <span>New & Popular Releases</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Stay ahead of pop culture with the hottest trending titles and upcoming premieres.
          </p>
        </div>

        {/* Trending Now Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <span className="p-1.5 rounded-lg bg-violet-600/20 text-violet-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">Trending Worldwide This Week</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {trendingNow.slice(0, 10).map((media) => (
              <div
                key={media.id}
                style={{
                  contentVisibility: "auto",
                  containIntrinsicSize: "240px 360px",
                }}
              >
                <MediaCard
                  media={media}
                  onOpenModal={(m) => {
                    setSelectedMedia(m);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon Section */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Calendar className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">Coming Soon & Fresh Premieres</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {comingSoon.map((media) => (
              <div
                key={media.id}
                style={{
                  contentVisibility: "auto",
                  containIntrinsicSize: "240px 360px",
                }}
              >
                <MediaCard
                  media={media}
                  onOpenModal={(m) => {
                    setSelectedMedia(m);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      <MediaPreviewModal
        media={selectedMedia}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
