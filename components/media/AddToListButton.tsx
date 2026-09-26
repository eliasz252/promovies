"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Check } from "lucide-react";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { useProfileStore } from "@/store/useProfileStore";
import { MediaItem } from "@/types/tmdb";
import { cn } from "@/lib/utils";
import { animateButtonBounce } from "@/lib/animations/animeUtils";

interface AddToListButtonProps {
  media: MediaItem;
  className?: string;
  variant?: "icon" | "full";
  onToggle?: (added: boolean) => void;
}

export default function AddToListButton({
  media,
  className,
  variant = "icon",
  onToggle,
}: AddToListButtonProps) {
  const { activeProfile } = useProfileStore();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isSaved = isMounted ? isInWatchlist(activeProfile.id, media.id) : false;
  const iconRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (iconRef.current) {
      animateButtonBounce(iconRef.current, isSaved);
    }

    if (isSaved) {
      removeFromWatchlist(activeProfile.id, media.id);
      onToggle?.(false);
    } else {
      addToWatchlist(activeProfile.id, media);
      onToggle?.(true);
    }
  };

  if (variant === "full") {
    return (
      <button
        onClick={handleToggle}
        suppressHydrationWarning
        className={cn(
          "flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 select-none cursor-pointer",
          isSaved
            ? "bg-violet-600/30 text-violet-300 border border-violet-500/50 hover:bg-violet-600/40"
            : "bg-white/10 text-white border border-white/15 hover:bg-white/15 hover:border-white/25 shadow-sm",
          className
        )}
      >
        <div ref={iconRef}>
          {isSaved ? <Check className="w-4 h-4 text-violet-400" /> : <Plus className="w-4 h-4" />}
        </div>
        <span>{isSaved ? "In Watchlist" : "Add to My List"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      suppressHydrationWarning
      className={cn(
        "p-2.5 rounded-full border transition-all duration-200 select-none cursor-pointer shadow-md",
        isSaved
          ? "bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-600/40"
          : "bg-black/75 text-white border-white/20 hover:bg-black hover:border-violet-400",
        className
      )}
      title={isSaved ? "Remove from My List" : "Add to My List"}
      aria-label={isSaved ? "Remove from My List" : "Add to My List"}
    >
      <div ref={iconRef}>
        {isSaved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </div>
    </button>
  );
}
