"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MediaItem } from "@/types/tmdb";
import { getTMDBImageUrl } from "@/lib/tmdb/client";
import { formatScore } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { animateTop10Numeral } from "@/lib/animations/animeUtils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { recordMovieStarted } from "@/lib/utils/continueWatching";

interface Top10CarouselProps {
  items: MediaItem[];
  onOpenModal?: (media: MediaItem) => void;
}

// SVG Path definitions for numbers 1 to 10
const NUMBER_PATHS: Record<number, string> = {
  1: "M25 70L25 15L15 25",
  2: "M10 25C10 15 20 10 30 10C40 10 48 18 48 28C48 45 10 65 10 70H50",
  3: "M12 15H45L28 35C38 35 48 42 48 55C48 65 38 72 25 72C15 72 10 65 10 58",
  4: "M38 70V12L10 50H48",
  5: "M45 15H15V35C20 32 30 32 40 37C48 42 48 58 45 64C40 72 25 72 12 65",
  6: "M42 15C35 15 18 25 12 45C16 38 25 35 35 35C45 35 48 45 48 55C48 65 40 72 28 72C15 72 10 60 10 45C10 25 22 12 42 12",
  7: "M10 15H48L25 72",
  8: "M28 40C38 40 45 32 45 25C45 18 38 12 28 12C18 12 12 18 12 25C12 32 18 40 28 40ZM28 40C16 40 10 48 10 58C10 68 18 72 28 72C38 72 48 68 48 58C48 48 40 40 28 40Z",
  9: "M15 70C22 70 40 60 45 40C40 45 32 48 22 48C12 48 10 38 10 28C10 18 18 12 30 12C42 12 48 25 48 40C48 60 35 72 15 72",
  10: "M18 70V15L10 25M35 42C35 25 42 12 52 12C62 12 70 25 70 42C70 60 62 72 52 72C42 72 35 60 35 42Z",
};

export default function Top10Carousel({ items, onOpenModal }: Top10CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const top10 = items.slice(0, 10);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
  }, [items]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-2 sm:py-4 group/top10 select-none w-full">
      {/* Section Header with Title, Leaderboard Badge, and Navigation Controls */}
      <div className="w-full mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Today&apos;s Top 10</span>
            <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[11px] font-black tracking-widest border border-violet-500/40">
              LEADERBOARD
            </span>
          </h2>
        </div>

        {/* Quick Header Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              canScrollLeft
                ? "bg-white/10 hover:bg-violet-600 text-white border-white/20 hover:border-violet-400 active:scale-95 shadow-md"
                : "bg-white/5 text-slate-600 border-white/5 opacity-40 cursor-not-allowed"
            }`}
            title="Previous (Scroll Left)"
            aria-label="Previous titles"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              canScrollRight
                ? "bg-white/10 hover:bg-violet-600 text-white border-white/20 hover:border-violet-400 active:scale-95 shadow-md"
                : "bg-white/5 text-slate-600 border-white/5 opacity-40 cursor-not-allowed"
            }`}
            title="Next (Scroll Right)"
            aria-label="Next titles"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel Track with Floating Always-Accessible Arrow Buttons */}
      <div className="relative w-full">
        {/* Floating Left Backward Button */}
        <button
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          className={`absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#14141e]/95 text-white border border-white/20 shadow-2xl hover:bg-violet-600 hover:border-violet-400 hover:scale-110 active:scale-95 transition-all cursor-pointer ${
            canScrollLeft
              ? "opacity-90 sm:opacity-80 sm:group-hover/top10:opacity-100 hover:opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll left backward"
          title="Scroll Backward"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Floating Right Forward Button */}
        <button
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          className={`absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#14141e]/95 text-white border border-white/20 shadow-2xl hover:bg-violet-600 hover:border-violet-400 hover:scale-110 active:scale-95 transition-all cursor-pointer ${
            canScrollRight
              ? "opacity-90 sm:opacity-80 sm:group-hover/top10:opacity-100 hover:opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll right forward"
          title="Scroll Forward"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Horizontal Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex items-end gap-6 overflow-x-auto no-scrollbar scroll-smooth py-4 -mx-2 px-2"
        >
          {top10.map((item, index) => {
            const rank = index + 1;
            return (
              <div
                key={item.id}
                className="shrink-0"
                style={{
                  contentVisibility: "auto",
                  containIntrinsicSize: "200px 300px",
                }}
              >
                <Top10Card
                  rank={rank}
                  media={item}
                  prefersReducedMotion={prefersReducedMotion}
                  onOpenModal={onOpenModal}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Top10Card({
  rank,
  media,
  prefersReducedMotion,
  onOpenModal,
}: {
  rank: number;
  media: MediaItem;
  prefersReducedMotion: boolean;
  onOpenModal?: (media: MediaItem) => void;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const title = media.title || media.name || "Untitled";
  const imageUrl = getTMDBImageUrl(media.poster_path, "w500");
  const score = formatScore(media.vote_average);

  useEffect(() => {
    if (pathRef.current) {
      animateTop10Numeral(pathRef.current, rank, prefersReducedMotion);
    }
  }, [rank, prefersReducedMotion]);

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

  return (
    <Link
      href={`/title/${media.media_type}/${media.id}`}
      onClick={handleClick}
      className="group relative flex items-end shrink-0 cursor-pointer focus:outline-none"
    >
      {/* Huge SVG Outlined Rank Number with Stroke Drawing */}
      <div className="relative -mr-8 sm:-mr-10 z-10 select-none pointer-events-none mb-1">
        <svg
          viewBox="0 0 80 85"
          className="w-24 sm:w-32 h-28 sm:h-36 drop-shadow-[0_4px_16px_rgba(139,92,246,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d={NUMBER_PATHS[rank] || NUMBER_PATHS[1]}
            stroke="#a78bfa"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="300"
            strokeDashoffset="300"
            className="transition-colors duration-300 group-hover:stroke-violet-300"
          />
          {/* Shadow line */}
          <path
            d={NUMBER_PATHS[rank] || NUMBER_PATHS[1]}
            stroke="#0b0b0f"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="-z-10"
          />
        </svg>
      </div>

      {/* Poster Card */}
      <div className="relative w-36 sm:w-44 md:w-48 aspect-[2/3] rounded-3xl overflow-hidden bg-[#14141e] border border-white/10 group-hover:border-violet-500/60 group-hover:shadow-2xl group-hover:shadow-violet-950/70 transition-all duration-300 transform group-hover:scale-105 z-20">
        <Image
          src={imageUrl}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 768px) 150px, 200px"
          className="object-cover"
        />

        {/* Floating White Circular Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45">
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xl shadow-white/20">
            <span className="text-xs font-black">▶</span>
          </div>
        </div>

        {/* Hover info overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end pointer-events-none">
          <p className="text-xs font-bold text-white line-clamp-2">{title}</p>
          <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold mt-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{score}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
