"use client";

import { useState } from "react";
import Image from "next/image";
import { Episode } from "@/types/tmdb";
import { Play, Film, Clock, Star } from "lucide-react";

interface EpisodeCardProps {
  episode: Episode;
  fallbackBackdrop?: string | null;
  onPlay?: (episode: Episode) => void;
  isActive?: boolean;
}

export default function EpisodeCard({
  episode,
  fallbackBackdrop,
  onPlay,
  isActive = false,
}: EpisodeCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // TMDB still image URL with fallback to show backdrop
  const stillUrl =
    !imgError && episode.still_path
      ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
      : fallbackBackdrop
      ? fallbackBackdrop.startsWith("http")
        ? fallbackBackdrop
        : `https://image.tmdb.org/t/p/w500${fallbackBackdrop}`
      : null;

  const titleText = `${episode.episode_number}. ${
    episode.name || `Episode ${episode.episode_number}`
  }`;
  const runtimeDisplay = episode.runtime
    ? `${episode.runtime}m`
    : "24m";

  return (
    <div
      onClick={() => onPlay?.(episode)}
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "84px",
      }}
      className={`group flex items-center gap-3 sm:gap-5 p-3 sm:p-4 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md ${
        isActive
          ? "bg-violet-600/15 border border-violet-500/50 shadow-violet-950/40"
          : "bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 hover:border-white/20"
      }`}
    >
      {/* 1. Episode Number on the Left */}
      <span
        className={`text-base sm:text-xl font-bold w-6 sm:w-8 text-center shrink-0 font-mono transition-colors ${
          isActive
            ? "text-violet-400 font-extrabold"
            : "text-slate-400 group-hover:text-white"
        }`}
      >
        {episode.episode_number}
      </span>

      {/* 2. Episode Thumbnail in 16:9 with Play Overlay */}
      <div className="relative aspect-video w-28 sm:w-44 rounded-xl overflow-hidden bg-[#14141e] border border-white/10 shrink-0">
        {!imgLoaded && !imgError && stillUrl && (
          <div className="absolute inset-0 bg-[#161622] animate-pulse flex items-center justify-center">
            <Film className="w-5 h-5 text-white/10" />
          </div>
        )}

        {stillUrl && !imgError ? (
          <Image
            src={stillUrl}
            alt={episode.name || `Episode ${episode.episode_number}`}
            fill
            unoptimized
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`object-cover group-hover:scale-105 transition-all duration-300 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          /* Fallback when still image is missing or failed to load */
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-[#14141e] to-black p-2.5 flex flex-col justify-between select-none">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-violet-400 font-mono tracking-wider">
                EP {episode.episode_number}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {runtimeDisplay}
              </span>
            </div>
            <div className="flex justify-center my-auto">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/20">
                <Film className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[10px] font-medium text-slate-300 truncate">
              {episode.name}
            </span>
          </div>
        )}

        {/* Ambient Dark Gradient on bottom */}
        {stillUrl && !imgError && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        )}

        {/* Hover Play Button */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          <div className="w-9 h-9 rounded-full bg-white/40 text-white flex items-center justify-center shadow-lg group-hover:bg-red-600 transition-colors">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* 3. Title + Description in the Middle */}
      <div className="flex-1 flex flex-col justify-center min-w-0 pr-2">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-violet-300 transition-colors truncate">
            {titleText}
          </h4>

          {/* Episode Rating Pill if available */}
          {episode.vote_average && episode.vote_average > 0 ? (
            <span className="hidden md:flex items-center gap-1 text-[11px] text-amber-400 font-semibold shrink-0">
              <Star className="w-3 h-3 fill-amber-400" />
              {Math.round(episode.vote_average * 10) / 10}
            </span>
          ) : null}
        </div>

        <p className="text-[11px] sm:text-xs text-slate-400/90 line-clamp-2 leading-relaxed pt-1 font-normal">
          {episode.overview ||
            "No overview available for this episode. Stream in cinema-grade 4K UHD."}
        </p>
      </div>

      {/* 4. Runtime on the Right */}
      <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono text-slate-400 shrink-0 pl-2">
        <Clock className="w-3 h-3 text-slate-500 hidden sm:inline" />
        <span>{runtimeDisplay}</span>
      </div>
    </div>
  );
}
