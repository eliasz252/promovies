"use client";

import { use, useState, useMemo } from "react";
import MediaCard from "@/components/media/MediaCard";
import MediaPreviewModal from "@/components/media/MediaPreviewModal";
import { MediaItem } from "@/types/tmdb";
import { MOCK_MEDIA_ITEMS, GENRES_LIST, getKidsContent } from "@/lib/tmdb/mockData";
import { useProfileStore } from "@/store/useProfileStore";
import { Film, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GenrePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const genreId = parseInt(id, 10);
  const genre = GENRES_LIST.find((g) => g.id === genreId) || { id: genreId, name: "Genre" };
  const { activeProfile } = useProfileStore();

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = useMemo(() => {
    let list = MOCK_MEDIA_ITEMS.filter((m) => m.genre_ids.includes(genreId));
    if (activeProfile.isKids) {
      list = getKidsContent(list);
    }
    if (list.length === 0) {
      list = activeProfile.isKids ? getKidsContent(MOCK_MEDIA_ITEMS) : MOCK_MEDIA_ITEMS.slice(0, 6);
    }
    return list;
  }, [genreId, activeProfile.isKids]);

  return (
    <>
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen select-none ${
          isModalOpen ? "pointer-events-none select-none" : ""
        }`}
        aria-hidden={isModalOpen}
      >
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Discovery</span>
          </Link>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
                <Film className="w-8 h-8 text-violet-400" />
                <span>{genre.name} Catalog</span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Top-rated and trending titles in {genre.name}.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {items.length} Titles
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {items.map((media) => (
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
      </div>

      <MediaPreviewModal
        media={selectedMedia}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
