"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { MediaItem } from "@/types/tmdb";
import { getTMDBImageUrl } from "@/lib/tmdb/client";
import { formatScore, formatYear } from "@/lib/utils";
import AddToListButton from "@/components/media/AddToListButton";
import { Play, Info, Star, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { setupHeroParallax } from "@/lib/animations/gsapUtils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { recordMovieStarted } from "@/lib/utils/continueWatching";
import gsap from "gsap";

// Auto-rotation interval duration in milliseconds (configurable)
const SLIDE_INTERVAL = 4000;

export interface FeaturedMovie {
  id: number;
  title: string;
  description: string;
  rating: string;
  year: string;
  quality: string;
  ageRating: string;
  backdrop: string;
  thumbnail: string;
  logo_path?: string | null;
  mediaType?: "movie" | "tv";
  rawMedia?: MediaItem;
}

// Default curated featured movies aligned with live TMDB sync headliners
const DEFAULT_FEATURED_SLIDES: FeaturedMovie[] = [
  {
    id: 108978,
    title: "Reacher",
    description:
      "Jack Reacher, a veteran military police investigator, has just recently entered civilian life. Reacher is a drifter, carrying no phone and the barest of essentials as he travels the country and explores the nation he once served.",
    rating: "8.1",
    year: "2022",
    quality: "4K UHD",
    ageRating: "TV-MA",
    backdrop: "https://image.tmdb.org/t/p/original/pF0qkRsrHkdYadPWY9AMeFZfcwk.jpg",
    thumbnail: "https://image.tmdb.org/t/p/w300/pF0qkRsrHkdYadPWY9AMeFZfcwk.jpg",
    logo_path: "/2YkCVT6opPxKh2ogEqxVrCiFgsr.png",
    mediaType: "tv",
  },
  {
    id: 969681,
    title: "Spider-Man: Brand New Day",
    description:
      "Fighting crime full-time as Spider-Man in a world that doesn't remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker he may not have the power to control.",
    rating: "7.9",
    year: "2026",
    quality: "4K UHD",
    ageRating: "PG-13",
    backdrop: "https://image.tmdb.org/t/p/original/qeQJx07rK2xm8SD2sJxFKhE7gs0.jpg",
    thumbnail: "https://image.tmdb.org/t/p/w300/qeQJx07rK2xm8SD2sJxFKhE7gs0.jpg",
    logo_path: "/vbZcDHC5IFylYuRnp3eyOs5rTV1.png",
    mediaType: "movie",
  },
  {
    id: 113962,
    title: "Lioness",
    description:
      "Cruz Manuelos, a rough-around-the-edges but passionate young Marine, is recruited to join the CIA's Lioness Engagement Team to help bring down a terrorist organization from within.",
    rating: "8.2",
    year: "2023",
    quality: "4K UHD",
    ageRating: "TV-MA",
    backdrop: "https://image.tmdb.org/t/p/original/mU7l9UaEItxHbg2YBNs0sHjoFVY.jpg",
    thumbnail: "https://image.tmdb.org/t/p/w300/mU7l9UaEItxHbg2YBNs0sHjoFVY.jpg",
    logo_path: "/xCXmYvX8UwggLh0h3I1A1fbHBxI.png",
    mediaType: "tv",
  },
  {
    id: 1423191,
    title: "Resident Evil",
    description:
      "Medical courier Bryan unwittingly finds himself fighting for survival as one fateful, horrifying night collapses around him in chaos.",
    rating: "7.3",
    year: "2026",
    quality: "4K UHD",
    ageRating: "PG-13",
    backdrop: "https://image.tmdb.org/t/p/original/3icyRAqgakNcQn6aDVz9libFmBA.jpg",
    thumbnail: "https://image.tmdb.org/t/p/w300/3icyRAqgakNcQn6aDVz9libFmBA.jpg",
    logo_path: "/9ulobOWQViT7UQt2iYzb5tEVgm9.png",
    mediaType: "movie",
  },
  {
    id: 1101383,
    title: "The End of Oak Street",
    description:
      "After a mysterious cosmic event rips Oak Street from suburbia and transports their neighborhood to someplace unknown, the Platt family soon discovers that their very survival depends on them sticking together.",
    rating: "7.0",
    year: "2026",
    quality: "4K UHD",
    ageRating: "PG-13",
    backdrop: "https://image.tmdb.org/t/p/original/b9q9VmbXDvJmTziRqkwdEmFdwhr.jpg",
    thumbnail: "https://image.tmdb.org/t/p/w300/b9q9VmbXDvJmTziRqkwdEmFdwhr.jpg",
    logo_path: "/ctnUQ8UdBLfJE6EkpzzmHLSbTMG.png",
    mediaType: "movie",
  },
];

interface HeroBannerProps {
  featuredItems?: MediaItem[];
  onOpenModal?: (media: MediaItem) => void;
}

export default function HeroBanner({
  featuredItems,
  onOpenModal,
}: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Map incoming featuredItems into standard FeaturedMovie object shape, or fallback to default slides
  const slides: FeaturedMovie[] = useMemo(() => {
    if (featuredItems && featuredItems.length > 0) {
      return featuredItems.slice(0, 5).map((item) => ({
        id: item.id,
        title: item.title || item.name || "Featured Title",
        description: item.overview || "",
        rating: formatScore(item.vote_average),
        year: formatYear(item.release_date || item.first_air_date),
        quality: item.quality_badge || "4K UHD",
        ageRating: item.age_rating || "PG-13",
        backdrop: getTMDBImageUrl(item.backdrop_path || item.poster_path, "original"),
        thumbnail: getTMDBImageUrl(item.backdrop_path || item.poster_path, "w300"),
        logo_path: item.logo_path || null,
        mediaType: (item.media_type || "movie") as "movie" | "tv",
        rawMedia: item,
      }));
    }
    return DEFAULT_FEATURED_SLIDES;
  }, [featuredItems]);

  const currentSlide = slides[currentIndex] || slides[0];

  // Raw MediaItem for AddToList and modal integration
  const activeRawMedia: MediaItem = useMemo(() => {
    if (currentSlide.rawMedia) return currentSlide.rawMedia;
    return {
      id: currentSlide.id,
      title: currentSlide.title,
      overview: currentSlide.description,
      backdrop_path: currentSlide.backdrop,
      poster_path: currentSlide.thumbnail,
      logo_path: currentSlide.logo_path,
      media_type: currentSlide.mediaType || "movie",
      vote_average: parseFloat(currentSlide.rating) || 7.0,
      vote_count: 1000,
      popularity: 1000,
      genre_ids: [28, 12],
      release_date: `${currentSlide.year}-01-01`,
      quality_badge: (currentSlide.quality as "4K UHD" | "HDR" | "HD") || "4K UHD",
      age_rating: currentSlide.ageRating,
    };
  }, [currentSlide]);

  // Requirement 1, 4, 5, 7, 8: Auto-rotation every SLIDE_INTERVAL ms with pause-on-hover & timer reset on manual click
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const id = setInterval(() => {
      // Pause auto-rotation when user has a modal open or page is hidden
      if (typeof document !== "undefined" && (document.hidden || document.body.style.overflow === "hidden")) {
        return;
      }
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(id);
  }, [currentIndex, isPaused, slides.length]);

  // Requirement 9: Preload the next slide's background image to prevent flicker
  useEffect(() => {
    if (slides.length <= 1 || typeof window === "undefined") return;
    const nextIndex = (currentIndex + 1) % slides.length;
    const nextBackdrop = slides[nextIndex]?.backdrop;
    if (nextBackdrop) {
      const img = new window.Image();
      img.src = nextBackdrop;
    }
  }, [currentIndex, slides]);

  // Initial Hero Parallax setup on mount
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      setupHeroParallax(backdropRef.current, containerRef.current);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Manual thumbnail click handler (switches immediately and resets the timer via currentIndex dependency)
  const handleSelectSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  if (!currentSlide) return null;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[80vh] min-h-[580px] max-h-[850px] overflow-hidden flex items-end select-none"
    >
      {/* Cinematic Hero Backdrop with smooth crossfade (600-800ms) */}
      <div
        ref={backdropRef}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.backdrop}
                alt={slide.title}
                fill
                priority={idx === 0 || idx === 1}
                unoptimized
                sizes="100vw"
                className="object-cover object-top"
              />
            </div>
          );
        })}

        {/* Ambient Dark Cinema Gradients */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/50 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0b0b0f] via-[#0b0b0f]/70 to-transparent w-full lg:w-3/4" />
        <div className="absolute inset-0 z-10 bg-radial-gradient from-transparent via-transparent to-[#0b0b0f]/80 pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 w-full flex flex-col justify-end">
        {/* Animated text section: fades and slides smoothly on slide change */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide.id}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="max-w-2xl flex flex-col gap-3"
          >
            {/* Metadata pill */}
            <div className="flex items-center gap-2.5 text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white font-black tracking-wider uppercase text-[10px] shadow-lg shadow-red-600/40">
                TRENDING THIS WEEK
              </span>
              <span className="flex items-center gap-1 text-amber-300 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {currentSlide.rating}
              </span>
              {currentSlide.year && <span className="text-slate-300 font-medium">{currentSlide.year}</span>}
              {currentSlide.quality && (
                <span className="px-1.5 py-0.5 rounded bg-black/60 text-slate-300 font-semibold text-[10px] border border-white/10">
                  {currentSlide.quality}
                </span>
              )}
              {currentSlide.ageRating && (
                <span className="px-1.5 py-0.5 rounded bg-black/60 text-slate-300 font-semibold text-[10px] border border-white/10">
                  {currentSlide.ageRating}
                </span>
              )}
            </div>

            {/* Cinematic Title or Stylized Movie Logo */}
            {currentSlide.logo_path ? (
              <div className="relative h-16 sm:h-20 md:h-24 w-56 sm:w-72 md:w-80 my-1">
                <Image
                  src={getTMDBImageUrl(currentSlide.logo_path, "original")}
                  alt={currentSlide.title}
                  fill
                  className="object-contain object-left drop-shadow-2xl"
                  priority
                  unoptimized
                />
              </div>
            ) : (
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] drop-shadow-xl text-gradient uppercase">
                {currentSlide.title}
              </h1>
            )}

            {/* Overview Synopsis */}
            <p className="text-sm sm:text-base text-slate-300 line-clamp-3 leading-relaxed drop-shadow max-w-xl font-normal">
              {currentSlide.description}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href={`/title/${currentSlide.mediaType || "movie"}/${currentSlide.id}`}
                onClick={(e) => {
                  recordMovieStarted({
                    id: currentSlide.id,
                    type: currentSlide.mediaType || "movie",
                    title: currentSlide.title,
                    backdrop_path: currentSlide.backdrop,
                    poster_path: currentSlide.thumbnail,
                  });
                  if (onOpenModal) {
                    e.preventDefault();
                    onOpenModal(activeRawMedia);
                  }
                }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-red-600/40 border-0 rounded-xl font-bold px-7"
                >
                  <Play className="w-5 h-5 fill-white mr-1.5" />
                  Watch Now
                </Button>
              </Link>

              <AddToListButton media={activeRawMedia} variant="full" className="h-12 rounded-xl" />

              <Link
                href={`/title/${currentSlide.mediaType || "movie"}/${currentSlide.id}`}
                onClick={(e) => {
                  if (onOpenModal) {
                    e.preventDefault();
                    onOpenModal(activeRawMedia);
                  }
                }}
              >
                <Button variant="secondary" size="lg" className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/15">
                  <Info className="w-5 h-5 mr-1 text-slate-300" />
                  Details
                </Button>
              </Link>

              {/* Sound toggle decoration */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="ml-auto p-3 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 transition-all shadow-md"
                aria-label={isMuted ? "Unmute preview" : "Mute preview"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-violet-400" />}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnail Selector for Rotating Hero Items */}
        {slides.length > 1 && (
          <div className="hidden sm:flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">FEATURED:</span>
            {slides.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={`relative aspect-video w-24 rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-violet-500 ring-2 ring-violet-500/40 scale-105 opacity-100 shadow-lg shadow-violet-500/20"
                      : "border-white/15 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Featured: ${item.title}`}
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title || "Poster"}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
