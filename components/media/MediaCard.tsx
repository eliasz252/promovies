"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MediaItem } from "@/types/tmdb";
import { getTMDBImageUrl } from "@/lib/tmdb/client";
import { formatYear, formatScore } from "@/lib/utils";
import { Star, Play, Bookmark, Film } from "lucide-react";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { useProfileStore } from "@/store/useProfileStore";
import { recordMovieStarted } from "@/lib/utils/continueWatching";

interface MediaCardProps {
  media: MediaItem;
  priority?: boolean;
  aspectRatio?: "poster" | "backdrop";
  className?: string;
  onOpenModal?: (media: MediaItem) => void;
}

export default function MediaCard({
  media,
  priority = false,
  aspectRatio = "poster",
  className = "",
  onOpenModal,
}: MediaCardProps) {
  const { activeProfile } = useProfileStore();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();
  const [hasError, setHasError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isSaved = isMounted ? isInWatchlist(activeProfile.id, media.id) : false;
  const title = media.title || media.name || "Untitled";
  const year = formatYear(media.release_date || media.first_air_date);
  const score = formatScore(media.vote_average);
  const imagePath = aspectRatio === "poster" ? media.poster_path : (media.backdrop_path || media.poster_path);
  const imageUrl = getTMDBImageUrl(imagePath, "w500");

  const handleClick = (e: React.MouseEvent) => {
    recordMovieStarted({
      id: media.id,
      type: media.media_type,
      title: title,
      backdrop_path: media.backdrop_path,
      poster_path: media.poster_path,
      duration: media.runtime ? media.runtime * 60 : undefined,
    });
    if (onOpenModal) {
      e.preventDefault();
      onOpenModal(media);
    }
  };

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      removeFromWatchlist(activeProfile.id, media.id);
    } else {
      addToWatchlist(activeProfile.id, media);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex flex-col cursor-pointer select-none ${className}`}
    >
      {/* Poster / Backdrop Image Frame */}
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-[#14141e] border border-white/10 group-hover:border-violet-500/50 group-hover:shadow-2xl group-hover:shadow-violet-950/40 transition-all duration-300 ${
          aspectRatio === "poster" ? "aspect-[2/3]" : "aspect-video"
        }`}
      >
        {hasError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c2b] via-[#14141e] to-black p-4 flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Film className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white line-clamp-2">{title}</p>
              <span className="text-[10px] text-slate-400 mt-1 block">ProMovies 4K</span>
            </div>
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            priority={priority}
            onError={() => setHasError(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Top-Left: Green Rating Badge */}
        {score && (
          <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/85 text-emerald-400 font-bold text-xs border border-emerald-500/30 shadow-md">
              <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
              {score}
            </span>
          </div>
        )}

        {/* Top-Right: Watchlist / Bookmark Action */}
        <div className="absolute top-2.5 right-2.5 z-20 pointer-events-auto">
          <button
            onClick={handleWatchlistToggle}
            suppressHydrationWarning
            className={`p-2 rounded-full border transition-all ${
              isSaved
                ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/40"
                : "bg-black/75 hover:bg-black text-white border-white/20 hover:scale-105 shadow-md"
            }`}
            title={isSaved ? "In My List" : "Add to My List"}
            aria-label={isSaved ? "In My List" : "Add to My List"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Floating Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 pointer-events-none">
          <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-xl shadow-white/20 transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Info Frame directly below the Card Poster */}
      <div className="mt-2.5 flex flex-col gap-0.5 px-0.5">
        <h4 className="text-sm font-bold text-white truncate group-hover:text-violet-400 transition-colors">
          {title}
        </h4>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-medium">
            {year && <span>{year}</span>}
            {year && <span>•</span>}
            <span className="capitalize">{media.media_type === "tv" ? "TV Series" : "Movie"}</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300 font-semibold text-[10px] border border-white/10">
            {media.quality_badge || "4K UHD"}
          </span>
        </div>
      </div>
    </div>
  );
}
