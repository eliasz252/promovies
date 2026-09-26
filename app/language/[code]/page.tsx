"use client";

import { use, useState, useMemo } from "react";
import MediaCard from "@/components/media/MediaCard";
import MediaPreviewModal from "@/components/media/MediaPreviewModal";
import { MediaItem } from "@/types/tmdb";
import { MOCK_MEDIA_ITEMS, getKidsContent } from "@/lib/tmdb/mockData";
import { POPULAR_LANGUAGES } from "@/components/layout/MegaMenu";
import { useProfileStore } from "@/store/useProfileStore";
import { Globe, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LanguagePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);
  const lang = POPULAR_LANGUAGES.find((l) => l.code === code) || { code, name: code.toUpperCase() };
  const { activeProfile } = useProfileStore();

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = useMemo(() => {
    return activeProfile.isKids ? getKidsContent(MOCK_MEDIA_ITEMS) : MOCK_MEDIA_ITEMS;
  }, [activeProfile.isKids]);

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
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
                <Globe className="w-8 h-8 text-violet-400" />
                <span>{lang.name} Cinema</span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Curated regional collection available with original audio & English subtitles.
              </p>
            </div>
            <span className="text-xs uppercase font-mono px-2.5 py-1 rounded-md bg-white/10 text-slate-300 font-bold">
              {code}
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
