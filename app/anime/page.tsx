"use client";

import { useState, useMemo } from "react";
import MediaCard from "@/components/media/MediaCard";
import MediaPreviewModal from "@/components/media/MediaPreviewModal";
import { MediaItem } from "@/types/tmdb";
import { MOCK_MEDIA_ITEMS, getKidsContent } from "@/lib/tmdb/mockData";
import { useProfileStore } from "@/store/useProfileStore";
import { useCatalog } from "@/hooks/useCatalog";
import { Sparkles, Flame, Star, Trophy } from "lucide-react";

export default function AnimePage() {
  const { activeProfile } = useProfileStore();
  const catalogData = useCatalog();
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const animeList = useMemo(() => {
    const pool = [
      ...(catalogData?.allMedia || []),
      ...(catalogData?.allMovies || []),
      ...(catalogData?.allShows || []),
      ...MOCK_MEDIA_ITEMS,
    ];
    const seen = new Set<number>();
    const list: MediaItem[] = [];
    for (const m of pool) {
      const isAnime =
        m.genre_ids?.includes(16) ||
        m.genres?.some((g: any) => {
          const name = (typeof g === "string" ? g : g.name || "").toLowerCase();
          return name.includes("animation") || name.includes("anime");
        });
      if (isAnime && !seen.has(m.id)) {
        seen.add(m.id);
        list.push(m);
      }
    }
    const filtered = activeProfile.isKids ? getKidsContent(list) : list;
    return filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }, [catalogData, activeProfile.isKids]);

  return (
    <>
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen select-none ${
          isModalOpen ? "pointer-events-none select-none" : ""
        }`}
        aria-hidden={isModalOpen}
      >
        {/* Anime Hero Header */}
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-violet-950/60 via-[#14141e] to-[#0b0b0f] border border-violet-500/20 mb-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/30 text-violet-300 text-xs font-bold border border-violet-500/40 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>JAPANESE ANIMATION & GLOBAL ANIME</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Anime Universe
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Immerse yourself in top-rated shonen sagas, studio Ghibli masterpieces, and cutting-edge animation.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <span>Trending & Acclaimed Anime</span>
          </h2>
          <span className="text-xs text-slate-400">{animeList.length} Titles</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {animeList.map((item) => (
            <div
              key={item.id}
              style={{
                contentVisibility: "auto",
                containIntrinsicSize: "240px 360px",
              }}
            >
              <MediaCard
                media={item}
                onOpenModal={(m) => {
                  setSelectedMedia(m);
                  setIsModalOpen(true);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <MediaPreviewModal
        media={selectedMedia}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
