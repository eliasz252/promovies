"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTMDBImageUrl } from "@/lib/tmdb/client";
import { Play, X, Clock, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { MediaItem } from "@/types/tmdb";
import { useProfileStore } from "@/store/useProfileStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { MOCK_MEDIA_ITEMS } from "@/lib/tmdb/mockData";
import {
  getContinueWatchingList,
  removeContinueWatchingItem,
  clearAllContinueWatching,
  formatMinutesLeft,
  ContinueWatchingRecord,
  CONTINUE_WATCHING_MEDIA_MAP,
} from "@/lib/utils/continueWatching";

interface ContinueWatchingRowProps {
  onOpenModal?: (media: MediaItem) => void;
}

export default function ContinueWatchingRow({ onOpenModal }: ContinueWatchingRowProps) {
  const { activeProfile } = useProfileStore();
  const { removeFromContinueWatching } = useWatchlistStore();

  // Clean initial state: starts empty, populates from user watch history
  const [items, setItems] = useState<ContinueWatchingRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Sync saved list from localStorage on mount and listen for storage/focus events
  useEffect(() => {
    const refreshList = () => {
      const list = getContinueWatchingList();
      setItems(list);
      setIsLoaded(true);
    };

    refreshList();

    window.addEventListener("focus", refreshList);
    window.addEventListener("storage", refreshList);
    window.addEventListener("continueWatchingUpdated", refreshList);

    return () => {
      window.removeEventListener("focus", refreshList);
      window.removeEventListener("storage", refreshList);
      window.removeEventListener("continueWatchingUpdated", refreshList);
    };
  }, []);

  // Filter content for Kids profile if active
  const displayedItems = useMemo(() => {
    if (!activeProfile?.isKids) return items;
    return items.filter((item) => {
      const media = CONTINUE_WATCHING_MEDIA_MAP[item.id] || MOCK_MEDIA_ITEMS.find((m) => m.id === item.id);
      if (media?.age_rating === "R" || media?.age_rating === "TV-MA") return false;
      if (media?.genre_ids?.includes(27)) return false; // Exclude horror
      return true;
    });
  }, [items, activeProfile?.isKids]);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [displayedItems]);

  // Robust smooth carousel scroll with wrap-around so Next/Prev always work
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const offset = Math.max(320, Math.floor(clientWidth * 0.75));

    if (direction === "right") {
      if (scrollLeft + clientWidth >= scrollWidth - 15) {
        // Smoothly wrap to beginning if at the end
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
      }
    } else {
      if (scrollLeft <= 15) {
        // Smoothly wrap to end if at the beginning
        scrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: -offset, behavior: "smooth" });
      }
    }

    setTimeout(checkScroll, 350);
  };

  // If user cleared everything and list is truly empty, hide cleanly
  if (displayedItems.length === 0) {
    return null;
  }

  const getMediaFromRecord = (rec: ContinueWatchingRecord): MediaItem => {
    if (CONTINUE_WATCHING_MEDIA_MAP[rec.id]) {
      return CONTINUE_WATCHING_MEDIA_MAP[rec.id];
    }
    const found = MOCK_MEDIA_ITEMS.find((m) => m.id === rec.id);
    if (found) return found;
    return {
      id: rec.id,
      title: rec.title,
      name: rec.title,
      media_type: rec.type,
      backdrop_path: rec.backdrop_path || null,
      poster_path: rec.poster_path || null,
      overview: "",
      genre_ids: [],
      vote_average: 8.0,
      vote_count: 100,
      popularity: 500,
      quality_badge: "4K UHD",
      age_rating: "PG-13",
    };
  };

  return (
    <section className="relative py-4 select-none animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Continue Watching</span>
            <span className="h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)] animate-pulse" />
          </h2>
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/20">
            {displayedItems.length} in progress
          </span>
        </div>

        {/* Quick Header Navigation & Clear Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to clear your entire watch history?")) {
                clearAllContinueWatching();
                setItems([]);
              }
            }}
            className="text-[11px] font-medium text-slate-400 hover:text-rose-400 px-2 py-1 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer mr-1"
            title="Clear all watch history"
          >
            Clear History
          </button>
          <button
            onClick={() => handleScroll("left")}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-violet-600 text-white hover:border-violet-400 transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Previous items"
            title="Previous (or wrap to end)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-violet-600 text-white hover:border-violet-400 transition-all cursor-pointer shadow-md active:scale-95"
            aria-label="Next items"
            title="Next items (or wrap to start)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative group/cw">
        {/* Floating Left Chevron */}
        <button
          onClick={() => handleScroll("left")}
          className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center bg-[#14141e]/95 text-white border border-white/20 shadow-2xl hover:bg-violet-600 hover:border-violet-400 hover:scale-110 active:scale-95 transition-all cursor-pointer ${
            canScrollLeft
              ? "opacity-95 sm:opacity-0 sm:group-hover/cw:opacity-100"
              : "opacity-60 hover:opacity-100"
          }`}
          aria-label="Scroll left backward"
          title="Scroll Backward"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Floating Right Chevron */}
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center bg-[#14141e]/95 text-white border border-white/20 shadow-2xl hover:bg-violet-600 hover:border-violet-400 hover:scale-110 active:scale-95 transition-all cursor-pointer opacity-95 sm:opacity-0 sm:group-hover/cw:opacity-100"
          aria-label="Scroll right forward"
          title="Scroll Forward"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div
          ref={scrollRef}
          className="flex items-start gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 -mx-2 px-2"
        >
          {displayedItems.map((item) => {
            const title = item.title || "Untitled";
            const backdropUrl = getTMDBImageUrl(item.backdrop_path || item.poster_path, "w780");
            const rawPercent = item.duration > 0 ? (item.currentTime / item.duration) * 100 : item.percent || 50;
            const progressPercent = Math.min(100, Math.max(5, Math.round(rawPercent)));
            const remainingText = formatMinutesLeft(item.currentTime, item.duration);
            const mediaItem = getMediaFromRecord(item);

            // Clicking the card or Play resumes video playback directly
            const handleResumeStream = (e: React.MouseEvent) => {
              if (onOpenModal) {
                e.preventDefault();
                onOpenModal({
                  ...mediaItem,
                  autoPlayStreaming: true,
                  initialSeason: item.season,
                  initialEpisode: item.episode,
                  initialStartTime: item.currentTime,
                } as any);
              }
            };

            // Clicking Info opens the movie/show detail modal without starting video
            const handleShowDetails = (e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              if (onOpenModal) {
                onOpenModal({
                  ...mediaItem,
                  autoPlayStreaming: false,
                } as any);
              }
            };

            const linkHref = `/title/${item.type}/${item.id}?t=${item.currentTime}${
              item.season ? `&s=${item.season}&e=${item.episode}` : ""
            }#stream-player`;

            return (
              <div
                key={`${item.id}-${item.season || 0}-${item.episode || 0}`}
                className="group relative shrink-0 w-64 sm:w-72 md:w-80 flex flex-col"
                style={{
                  contentVisibility: "auto",
                  containIntrinsicSize: "320px 180px",
                }}
              >
                <Link
                  href={linkHref}
                  onClick={handleResumeStream}
                  className="block relative aspect-video w-full rounded-2xl overflow-hidden bg-[#14141e] border border-white/10 group-hover:border-violet-500/60 shadow-xl group-hover:shadow-violet-900/20 transition-all duration-300"
                >
                  <Image
                    src={backdropUrl}
                    alt={title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 260px, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Cinematic Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />

                  {/* Center Play/Resume Action Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-3 sm:p-3.5 rounded-full bg-violet-600/90 text-white shadow-xl shadow-violet-600/60 transform group-hover:scale-115 group-hover:bg-violet-500 transition-all">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Floating Action Buttons (Top Right: Info & Remove) */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button
                      onClick={handleShowDetails}
                      className="p-1.5 rounded-full bg-black/80 hover:bg-violet-600 text-white transition-colors cursor-pointer"
                      title="View Details & Episodes"
                      aria-label="Details"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeContinueWatchingItem(item.id, item.type, item.season, item.episode);
                        if (activeProfile?.id) {
                          removeFromContinueWatching(activeProfile.id, item.id);
                        }
                        setItems((prev) =>
                          prev.filter(
                            (p) =>
                              !(
                                p.id === item.id &&
                                p.season === item.season &&
                                p.episode === item.episode
                              )
                          )
                        );
                      }}
                      className="p-1.5 rounded-full bg-black/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                      title="Remove from Continue Watching"
                      aria-label="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Quality Badge Top Left */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-1.5 py-0.5 rounded bg-black/70 text-slate-200 text-[10px] font-bold border border-white/10 uppercase tracking-wider backdrop-blur-sm">
                      {mediaItem.quality_badge || "4K UHD"}
                    </span>
                  </div>

                  {/* Glowing Progress Bar at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/60 backdrop-blur-sm">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-pink-500 transition-all duration-300 relative"
                      style={{ width: `${progressPercent}%` }}
                    >
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-md shadow-violet-400" />
                    </div>
                  </div>
                </Link>

                {/* Subtitle & Remaining time */}
                <div className="mt-2.5 flex items-center justify-between text-xs px-0.5">
                  <span className="font-semibold text-white truncate max-w-[65%] group-hover:text-violet-300 transition-colors">
                    {title}
                    {item.type === "tv" && item.season && item.episode ? (
                      <span className="text-[11px] text-slate-400 font-normal ml-1">
                        S{item.season}:E{item.episode}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-violet-400 inline" />
                    <span>{remainingText}</span>
                    <span className="text-violet-400 font-semibold">• {progressPercent}%</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
