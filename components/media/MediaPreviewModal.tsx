"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { MediaItem, Episode } from "@/types/tmdb";
import { getTMDBImageUrl } from "@/lib/tmdb/client";
import { formatYear, formatRuntime, formatScore } from "@/lib/utils";
import { getMovieTheme } from "@/lib/utils/movieTheme";
import StreamingPlayer from "./StreamingPlayer";
import EpisodeList from "./EpisodeList";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { useProfileStore } from "@/store/useProfileStore";
import { MOCK_MEDIA_ITEMS } from "@/lib/tmdb/mockData";
import { getContinueWatchingItem, recordMovieStarted } from "@/lib/utils/continueWatching";
import {
  X,
  Play,
  Share2,
  Plus,
  Check,
  ExternalLink,
  Film,
  Tv,
  Star,
  Sparkles,
  Volume2,
  VolumeX,
  ThumbsUp,
  Subtitles,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

interface MediaPreviewModalProps {
  media: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MediaPreviewModal({
  media,
  isOpen,
  onClose,
}: MediaPreviewModalProps) {
  const { activeProfile } = useProfileStore();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();

  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(media);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [activeClipKey, setActiveClipKey] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  // Sync activeMedia when media prop changes
  useEffect(() => {
    setActiveMedia(media);
    const mediaAny = media as any;
    const saved = media ? getContinueWatchingItem(media.id, media.media_type) : undefined;
    setSelectedSeason(mediaAny?.initialSeason || saved?.season || 1);
    setSelectedEpisode(mediaAny?.initialEpisode || saved?.episode || 1);
    setIsStreaming(Boolean(mediaAny?.autoPlayStreaming));
    setIsPlayingTrailer(false);

    // If media lacks videos or credits, enrich it asynchronously
    if (media?.id && (!media.videos || !media.credits)) {
      fetch(`/api/tmdb/${media.media_type || "movie"}/${media.id}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((fullData) => {
          if (fullData && fullData.id === media.id) {
            setActiveMedia((prev) => (prev && prev.id === media.id ? { ...prev, ...fullData } : prev));
          }
        })
        .catch(() => {});
    }
  }, [media]);

  // Reset player states on close
  useEffect(() => {
    if (!isOpen) {
      setIsStreaming(false);
      setIsPlayingTrailer(false);
      setActiveClipKey(null);
    }
  }, [isOpen]);

  // Handle keyboard events (ESC to close or exit player)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // If native fullscreen is currently active, let the browser exit fullscreen without closing the player
        const doc = document as any;
        const isNativeFs = !!(
          doc.fullscreenElement ||
          doc.webkitFullscreenElement ||
          doc.mozFullScreenElement ||
          doc.msFullscreenElement
        );
        if (isNativeFs) {
          return;
        }

        if (isPlayingTrailer) {
          setIsPlayingTrailer(false);
        } else if (isStreaming) {
          setIsStreaming(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, isPlayingTrailer, isStreaming]);

  if (!activeMedia) return null;

  const currentItem = activeMedia;
  const title = currentItem.title || currentItem.name || "Untitled";
  const year = formatYear(currentItem.release_date || currentItem.first_air_date);
  const isTv = currentItem.media_type === "tv";

  // Backdrop and Poster URLs
  const backdropUrl = getTMDBImageUrl(
    currentItem.backdrop_path || currentItem.poster_path,
    "w1280"
  );
  const posterUrl = getTMDBImageUrl(
    currentItem.poster_path || currentItem.backdrop_path,
    "w500"
  );

  const trailerVideo =
    currentItem.videos?.results?.find(
      (v) => v.type === "Trailer" || v.site === "YouTube"
    ) || currentItem.videos?.results?.[0];

  const isSaved = isInWatchlist(activeProfile.id, currentItem.id);

  const handleToggleWatchlist = () => {
    if (isSaved) {
      removeFromWatchlist(activeProfile.id, currentItem.id);
    } else {
      addToWatchlist(activeProfile.id, currentItem);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(
        window.location.origin + `/title/${currentItem.media_type}/${currentItem.id}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const genresList =
    currentItem.genres?.map((g) => g.name).join(", ") ||
    "Action & Adventure, Drama, Crime";

  const numSeasons = currentItem.number_of_seasons || currentItem.seasons?.length || (isTv ? 2 : 1);
  const seasonsString = isTv ? `${numSeasons} Season${numSeasons > 1 ? "s" : ""}` : formatRuntime(currentItem.runtime || 115);

  // Cast members string
  const castList =
    currentItem.credits?.cast && currentItem.credits.cast.length > 0
      ? currentItem.credits.cast.slice(0, 5).map((c) => c.name).join(", ")
      : "Matthew Law, Y'lan Noel, Cleopatra Coleman, Tre Hale, Domenick Lombardozzi";

  // "This Show is" tags based on genre
  const thisShowIsTags = isTv
    ? "detective, obsession, master thief"
    : "gripping, cinematic, high-stakes";

  // Recommendations / More Like This
  const moreLikeThisItems: MediaItem[] =
    currentItem.recommendations?.results && currentItem.recommendations.results.length > 0
      ? currentItem.recommendations.results.slice(0, 3)
      : currentItem.similar?.results && currentItem.similar.results.length > 0
      ? currentItem.similar.results.slice(0, 3)
      : MOCK_MEDIA_ITEMS.filter((m) => m.id !== currentItem.id && m.media_type === currentItem.media_type).slice(0, 3);

  const handlePlayEpisode = (seasonNum: number, episodeNum: number) => {
    setSelectedSeason(seasonNum);
    setSelectedEpisode(episodeNum);
    recordMovieStarted({
      id: currentItem.id,
      type: currentItem.media_type,
      season: seasonNum,
      episode: episodeNum,
      title: title,
      backdrop_path: currentItem.backdrop_path,
      poster_path: currentItem.poster_path,
      duration: currentItem.runtime ? currentItem.runtime * 60 : undefined,
    });
    setIsStreaming(true);
  };

  const savedRecord = typeof window !== "undefined" && currentItem
    ? getContinueWatchingItem(currentItem.id, currentItem.media_type)
    : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
          {/* Ambient Backdrop Dimmer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 z-10 cursor-pointer transition-colors duration-200 ${
              isStreaming || isPlayingTrailer ? "bg-black/95" : "bg-black/85"
            }`}
          />

          {/* Main Cinematic Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[92vh] rounded-[24px] shadow-2xl border border-white/10 z-20 flex flex-col bg-[#141414] text-slate-100 selection:bg-red-600 selection:text-white overflow-hidden"
            style={{ isolation: "isolate" }}
          >
            {/* Top Close Button (floating top right of modal card) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-40 p-2.5 rounded-full bg-black/80 hover:bg-black text-white transition-all border border-white/20 hover:scale-110 cursor-pointer shadow-xl"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Inner compositor-accelerated scroll viewport */}
            <div className="w-full h-full overflow-y-auto overscroll-contain no-scrollbar flex flex-col">

            {/* If Streaming Player is Active */}
            {isStreaming ? (
              <div className="p-4 sm:p-6 flex flex-col gap-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <button
                    onClick={() => setIsStreaming(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/15 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Details
                  </button>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                    {isTv ? `Streaming S${selectedSeason}E${selectedEpisode}` : "Streaming in 4K UHD"}
                  </span>
                </div>

                <StreamingPlayer
                  tmdbId={currentItem.id}
                  mediaType={currentItem.media_type}
                  title={title}
                  backdropPath={currentItem.backdrop_path}
                  posterPath={currentItem.poster_path}
                  seasons={currentItem.seasons}
                  initialSeason={selectedSeason}
                  initialEpisode={selectedEpisode}
                  initialStartTime={(media as any)?.initialStartTime || savedRecord?.currentTime}
                  runtime={currentItem.runtime}
                  autoPlay={true}
                />
              </div>
            ) : isPlayingTrailer ? (
              /* If Trailer Player is Active */
              <div className="p-4 sm:p-6 flex flex-col gap-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <button
                    onClick={() => setIsPlayingTrailer(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/15 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Details
                  </button>
                  <span className="text-xs font-semibold text-slate-400">
                    Official Trailer
                  </span>
                </div>

                <div
                  className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-xl transform-gpu"
                  style={{
                    transform: "translateZ(0)",
                    WebkitTransform: "translateZ(0)",
                    contain: "paint",
                    isolation: "isolate",
                  }}
                >
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${
                      activeClipKey || trailerVideo?.key
                    }?autoplay=1&rel=0&modestbranding=1`}
                    title={`${title} Trailer`}
                    className="w-full h-full border-0 transform-gpu"
                    style={{
                      transform: "translateZ(0)",
                      WebkitTransform: "translateZ(0)",
                      willChange: "transform",
                    }}
                    loading="eager"
                    allow="accelerometer; autoplay *; clipboard-write; encrypted-media *; gyroscope; picture-in-picture *; web-share *; fullscreen *"
                    allowFullScreen={true}
                    {...({
                      webkitallowfullscreen: "true",
                      mozallowfullscreen: "true",
                    } as any)}
                  />
                </div>
              </div>
            ) : (
              /* Main Netflix / NetOut Style Modal Layout */
              <div className="flex flex-col w-full">
                {/* 1. HERO BANNER WITH BACKDROP & ACTION BUTTONS */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black select-none">
                  <Image
                    src={backdropUrl}
                    alt={title}
                    fill
                    unoptimized
                    priority
                    className="object-cover object-center brightness-90"
                  />

                  {/* Gradient overlays to melt banner seamlessly into black modal body */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

                  {/* Bottom Content overlaid on Hero */}
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col gap-4 z-20">
                    {/* Big Bold Title Wordmark */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase font-sans drop-shadow-xl leading-none">
                      {title}
                    </h1>

                    {/* Action Buttons Row */}
                    <div className="flex items-center gap-3 pt-1">
                      {/* White Play Button matching screenshot: Play S1E1 */}
                      <button
                        onClick={() => {
                          recordMovieStarted({
                            id: currentItem.id,
                            type: currentItem.media_type,
                            season: isTv ? selectedSeason : undefined,
                            episode: isTv ? selectedEpisode : undefined,
                            title: title,
                            backdrop_path: currentItem.backdrop_path,
                            poster_path: currentItem.poster_path,
                            duration: currentItem.runtime ? currentItem.runtime * 60 : undefined,
                          });
                          setIsStreaming(true);
                        }}
                        className="flex items-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-white hover:bg-slate-200 text-black font-extrabold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
                      >
                        <Play className="w-5 h-5 fill-black text-black" />
                        <span>
                          {isTv
                            ? `Watch S${selectedSeason}E${selectedEpisode}`
                            : "Watch Now"}
                        </span>
                      </button>

                      {/* Add to My List (+) */}
                      <button
                        onClick={handleToggleWatchlist}
                        className={`p-2.5 sm:p-3 rounded-full border transition-all cursor-pointer shadow-lg ${
                          isSaved
                            ? "bg-red-600 text-white border-red-500 hover:bg-red-700"
                            : "bg-black/60 hover:bg-black/80 text-white border-white/40 hover:border-white"
                        }`}
                        title={isSaved ? "In My List" : "Add to My List"}
                      >
                        {isSaved ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                      </button>

                      {/* Thumbs Up Like */}
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-2.5 sm:p-3 rounded-full border transition-all cursor-pointer shadow-lg ${
                          isLiked
                            ? "bg-white text-black border-white"
                            : "bg-black/60 hover:bg-black/80 text-white border-white/40 hover:border-white"
                        }`}
                        title="I like this"
                      >
                        <ThumbsUp className={`w-5 h-5 ${isLiked ? "fill-black" : ""}`} />
                      </button>

                      {/* Share Button */}
                      <button
                        onClick={handleShare}
                        className="p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/40 hover:border-white transition-all cursor-pointer shadow-lg"
                        title="Share link"
                      >
                        {copiedLink ? (
                          <Check className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Share2 className="w-5 h-5" />
                        )}
                      </button>

                      {/* Audio Mute/Unmute Toggle (Right aligned) */}
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/40 hover:border-white transition-all cursor-pointer shadow-lg ml-auto"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5 text-slate-300" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. METADATA & DETAILS TWO-COLUMN SECTION */}
                <div className="px-6 sm:px-10 py-6 grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Left Column: Metadata Pills & Synopsis */}
                  <div className="md:col-span-8 flex flex-col gap-4">
                    {/* Meta badges line: Year, Seasons count, HD, AD, Subtitles */}
                    <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-300">
                      <span className="font-bold text-emerald-400">{year}</span>
                      <span className="text-white font-medium">{seasonsString}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold border border-white/40 text-slate-200 tracking-wider">
                        HD
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold border border-white/40 text-slate-200 tracking-wider">
                        AD
                      </span>
                      <span className="p-0.5 rounded border border-white/40 text-slate-200 flex items-center justify-center" title="Subtitles Available">
                        <Subtitles className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Synopsis text */}
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                      {currentItem.overview ||
                        "A relentless LAPD cop becomes obsessed with taking down the master thief behind a string of daring heists — and only one can come out on top."}
                    </p>
                  </div>

                  {/* Right Column: Cast, Genres, This Show is */}
                  <div className="md:col-span-4 flex flex-col gap-2.5 text-xs sm:text-sm leading-relaxed border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                    <div>
                      <span className="text-slate-400">Cast: </span>
                      <span className="text-slate-200 font-medium">{castList}</span>
                    </div>

                    <div>
                      <span className="text-slate-400">Genres: </span>
                      <span className="text-slate-200 font-medium">{genresList}</span>
                    </div>

                    <div>
                      <span className="text-slate-400">This Show is: </span>
                      <span className="text-slate-200 font-medium">{thisShowIsTags}</span>
                    </div>
                  </div>
                </div>

                {/* 3. EPISODES SECTION WITH SEASON CHOOSER DROPDOWN (if TV) */}
                {isTv && (
                  <div className="px-6 sm:px-10 py-6 border-t border-white/10">
                    <EpisodeList
                      seasons={currentItem.seasons}
                      tmdbId={currentItem.id}
                      mediaType="tv"
                      backdropPath={currentItem.backdrop_path}
                      selectedSeasonNumber={selectedSeason}
                      onSeasonChange={(sNum) => {
                        setSelectedSeason(sNum);
                        setSelectedEpisode(1);
                      }}
                      onPlayEpisode={handlePlayEpisode}
                      syncWithUrl={false}
                    />
                  </div>
                )}

                {/* 4. MORE LIKE THIS SECTION (Matching user screenshot) */}
                {moreLikeThisItems.length > 0 && (
                  <div className="px-6 sm:px-10 py-8 border-t border-white/10 flex flex-col gap-5">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      More Like This
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {moreLikeThisItems.map((rec) => {
                        const recImg = getTMDBImageUrl(rec.backdrop_path || rec.poster_path, "w500");
                        const recYear = formatYear(rec.release_date || rec.first_air_date);

                        return (
                          <div
                            key={rec.id}
                            onClick={() => {
                              setActiveMedia(rec);
                              setSelectedSeason(1);
                              setSelectedEpisode(1);
                            }}
                            className="group flex flex-col rounded-xl overflow-hidden bg-[#1f1f1f] border border-white/5 hover:border-white/20 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:scale-[1.02]"
                          >
                            {/* Thumbnail */}
                            <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                              <Image
                                src={recImg}
                                alt={rec.title || rec.name || ""}
                                fill
                                unoptimized
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />

                              {/* Floating Play Overlay on Hover */}
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-10 h-10 rounded-full bg-white/30 text-white flex items-center justify-center shadow-lg group-hover:bg-red-600 transition-colors">
                                  <Play className="w-4 h-4 fill-white ml-0.5" />
                                </div>
                              </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold border border-white/30 text-slate-300">
                                  {rec.age_rating || "U/A"}
                                </span>
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold border border-white/30 text-slate-300">
                                  HD
                                </span>
                                <span className="text-slate-300">{recYear}</span>
                              </div>

                              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                                {rec.overview || "Stream this thrilling discovery in 4K UHD."}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

