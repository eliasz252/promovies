"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { MediaItem } from "@/types/tmdb";
import MediaCard from "@/components/media/MediaCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { setupRowReveal } from "@/lib/animations/gsapUtils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import gsap from "gsap";

interface MediaCarouselProps {
  title: string;
  items: MediaItem[];
  viewAllHref?: string;
  aspectRatio?: "poster" | "backdrop";
  onOpenModal?: (media: MediaItem) => void;
}

export default function MediaCarousel({
  title,
  items,
  viewAllHref,
  aspectRatio = "poster",
  onOpenModal,
}: MediaCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

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

  // GSAP ScrollTrigger Entrance Reveal
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      setupRowReveal(containerRef.current, prefersReducedMotion);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <section ref={containerRef} className="relative py-2 sm:py-3 group/carousel w-full">
      {/* Section Header */}
      <div className="w-full mb-3 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <span>{title}</span>
          <span className="h-2 w-2 rounded-full bg-violet-500 shadow-sm shadow-violet-500/50 animate-pulse" />
        </h2>

        <div className="flex items-center gap-3">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-xs sm:text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1 group-hover/carousel:translate-x-0.5 duration-200"
            >
              Explore All →
            </Link>
          )}

          {/* Header Quick Controls */}
          <div className="hidden sm:flex items-center gap-1.5 ml-1">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                canScrollLeft
                  ? "bg-white/10 hover:bg-violet-600 text-white border-white/15 active:scale-95 shadow-sm"
                  : "bg-white/5 text-slate-600 border-white/5 opacity-40 cursor-not-allowed"
              }`}
              title="Previous"
              aria-label="Previous items"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                canScrollRight
                  ? "bg-white/10 hover:bg-violet-600 text-white border-white/15 active:scale-95 shadow-sm"
                  : "bg-white/5 text-slate-600 border-white/5 opacity-40 cursor-not-allowed"
              }`}
              title="Next"
              aria-label="Next items"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Track with Arrow Controls */}
      <div className="relative w-full">
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          className={`absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center bg-[#14141e]/95 text-white border border-white/20 shadow-2xl hover:bg-violet-600 hover:border-violet-400 hover:scale-110 active:scale-95 transition-all cursor-pointer ${
            canScrollLeft
              ? "opacity-90 sm:opacity-80 sm:group-hover/carousel:opacity-100 hover:opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll left backward"
          title="Scroll Backward"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          className={`absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center bg-[#14141e]/95 text-white border border-white/20 shadow-2xl hover:bg-violet-600 hover:border-violet-400 hover:scale-110 active:scale-95 transition-all cursor-pointer ${
            canScrollRight
              ? "opacity-90 sm:opacity-80 sm:group-hover/carousel:opacity-100 hover:opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll right forward"
          title="Scroll Forward"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Horizontal Scrolling Cards Container */}
        <div
          ref={scrollRef}
          className="flex items-start gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 -mx-2 px-2"
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                contentVisibility: "auto",
                containIntrinsicSize: aspectRatio === "poster" ? "200px 300px" : "320px 180px",
              }}
              className={`shrink-0 ${
                aspectRatio === "poster"
                  ? "w-36 sm:w-44 md:w-52"
                  : "w-64 sm:w-80 md:w-96"
              }`}
            >
              <MediaCard
                media={item}
                aspectRatio={aspectRatio}
                onOpenModal={onOpenModal}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
