"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Season, Episode, MediaItem } from "@/types/tmdb";
import { getTMDBImageUrl } from "@/lib/tmdb/client";
import { useProfileStore } from "@/store/useProfileStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import {
  getContinueWatchingItem,
  saveContinueWatchingProgress,
} from "@/lib/utils/continueWatching";
import {
  Play,
  Maximize2,
  Minimize2,
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Sparkles,
  Tv,
  Film,
  Zap,
} from "lucide-react";

function EpisodeItemThumbnail({
  src,
  alt,
  epNumber,
  runtime,
  isCurrent,
}: {
  src: string | null;
  alt: string;
  epNumber: number;
  runtime?: number;
  isCurrent: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  return (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#14141e] border border-white/5">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#161622] animate-pulse flex items-center justify-center">
          <Film className="w-6 h-6 text-white/10" />
        </div>
      )}

      {hasError || !src ? (
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-[#14141e] to-black p-3 flex flex-col justify-between select-none">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-red-400 font-mono tracking-wider">EPISODE {epNumber}</span>
            <span className="text-[10px] font-mono text-slate-400">{runtime ? `${runtime}m` : "45m"}</span>
          </div>
          <div className="flex justify-center my-auto">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/20">
              <Film className="w-6 h-6" />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-300 truncate">{alt}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`object-cover group-hover:scale-105 transition-all duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Gradient & Runtime */}
      {!hasError && src && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-slate-300 pointer-events-none">
            {runtime ? `${runtime}m` : "45m"}
          </span>
        </>
      )}

      {/* Playing Badge on Active Episode */}
      {isCurrent && (
        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black tracking-wider uppercase shadow-md pointer-events-none z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Playing
        </div>
      )}

      {/* Hover Play Button */}
      {!isCurrent && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 pointer-events-none z-10">
          <div className="p-2.5 rounded-full bg-red-600 text-white shadow-lg">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
        </div>
      )}
    </div>
  );
}

export interface StreamServer {
  id: string;
  name: string;
  badge?: string;
  isFast?: boolean;
  isVip?: boolean;
  getUrl: (
    tmdbId: number,
    mediaType: "movie" | "tv",
    season: number,
    episode: number,
    startTime?: number,
    title?: string
  ) => string;
}

export const STREAM_SERVERS: StreamServer[] = [
  {
    id: "netout-ultra",
    name: "NetOut Ultra",
    badge: "BEST · NO ADS",
    isFast: true,
    isVip: true,
    getUrl: (id, type, s, e, t) => {
      const tParam = t && t > 5 ? `&time=${Math.floor(t)}` : "";
      return type === "tv"
        ? `https://vidy.st/tv/${id}/${s}/${e}?color=e50914&autoplay=true${tParam}`
        : `https://vidy.st/movie/${id}?color=e50914&autoplay=true${tParam}`;
    },
  },
  {
    id: "netout-vidout",
    name: "NetOut VIP (VidOut)",
    badge: "VIP 4K",
    isVip: true,
    getUrl: (id, type, s, e, t) => {
      const tParam = t && t > 5 ? `?t=${Math.floor(t)}` : "";
      return type === "tv"
        ? `https://vidout.pages.dev/tv/${id}/S${s}/E${e}${tParam}`
        : `https://vidout.pages.dev/movie/${id}${tParam}`;
    },
  },
  {
    id: "vidsrc-su",
    name: "VidSrc SU",
    badge: "4K UHD",
    isVip: true,
    getUrl: (id, type, s, e, t) => {
      const tParam = t && t > 5 ? `?t=${Math.floor(t)}` : "";
      return type === "tv"
        ? `https://vidsrc.su/embed/tv/${id}/${s}/${e}${tParam}`
        : `https://vidsrc.su/embed/movie/${id}${tParam}`;
    },
  },
  {
    id: "multiembed",
    name: "MultiEmbed",
    badge: "MULTI-CDN",
    isFast: true,
    getUrl: (id, type, s, e, t) => {
      const tParam = t && t > 5 ? `&t=${Math.floor(t)}` : "";
      return type === "tv"
        ? `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${s}&e=${e}${tParam}`
        : `https://multiembed.mov/?video_id=${id}&tmdb=1${tParam}`;
    },
  },
  {
    id: "vidsrc-me",
    name: "VidSrc Me",
    badge: "STABLE",
    getUrl: (id, type, s, e, t) => {
      const tParam = t && t > 5 ? `&t=${Math.floor(t)}` : "";
      return type === "tv"
        ? `https://vidsrc.me/embed/tv?tmdb=${id}&season=${s}&episode=${e}${tParam}`
        : `https://vidsrc.me/embed/movie?tmdb=${id}${tParam}`;
    },
  },
  {
    id: "2embed",
    name: "2Embed",
    badge: "NORMAL NET",
    isFast: true,
    getUrl: (id, type, s, e, t) => {
      const tParam = t && t > 5 ? `?t=${Math.floor(t)}` : "";
      return type === "tv"
        ? `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}${tParam}`
        : `https://www.2embed.cc/embed/${id}${tParam}`;
    },
  },
  {
    id: "trailer",
    name: "Official 4K Trailer",
    badge: "INSTANT",
    getUrl: (id, type, s, e, t, title) => {
      const q = encodeURIComponent((title || "movie") + " official 4k trailer");
      return `https://www.youtube-nocookie.com/embed?listType=search&list=${q}&autoplay=1`;
    },
  },
];

interface StreamingPlayerProps {
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  backdropPath?: string | null;
  posterPath?: string | null;
  seasons?: Season[];
  initialSeason?: number;
  initialEpisode?: number;
  initialStartTime?: number;
  runtime?: number;
  className?: string;
  autoPlay?: boolean;
  releaseDate?: string;
  status?: string;
}

export default function StreamingPlayer({
  tmdbId,
  mediaType,
  title,
  backdropPath,
  posterPath,
  seasons,
  initialSeason,
  initialEpisode,
  initialStartTime,
  runtime,
  className = "",
  autoPlay = false,
  releaseDate,
  status,
}: StreamingPlayerProps) {
  const isUnreleased = Boolean(
    (status && ["Planned", "In Production", "Post Production", "Upcoming"].includes(status)) ||
    (releaseDate && !isNaN(new Date(releaseDate).getTime()) && new Date(releaseDate).getTime() > Date.now()) ||
    (title && /Spider-Man: Brand New Day|Avengers: Doomsday|Project Hail Mary|The Odyssey|Wildwood|Klara and the Sun|Clayface|The Weight|Bad Apples/i.test(title))
  );

  // Check for saved progress if not explicitly passed
  const savedRecord = typeof window !== "undefined"
    ? (getContinueWatchingItem(tmdbId, mediaType, initialSeason, initialEpisode) ||
       (mediaType === "tv" && !initialSeason ? getContinueWatchingItem(tmdbId, mediaType) : undefined))
    : undefined;

  const resolvedInitialSeason = initialSeason && initialSeason > 0
    ? initialSeason
    : (savedRecord?.season && savedRecord.season > 0 ? savedRecord.season : 1);

  const resolvedInitialEpisode = initialEpisode && initialEpisode > 0
    ? initialEpisode
    : (savedRecord?.episode && savedRecord.episode > 0 ? savedRecord.episode : 1);

  const [activeServerId, setActiveServerId] = useState<string>(() => {
    if (isUnreleased) return "trailer";
    if (typeof window !== "undefined") {
      try {
        const preferred = localStorage.getItem("promovies_preferred_server");
        if (preferred && preferred !== "autoembed" && STREAM_SERVERS.some((s) => s.id === preferred)) {
          return preferred;
        }
      } catch {}
    }
    return "netout-ultra";
  });
  const [currentSeason, setCurrentSeason] = useState<number>(resolvedInitialSeason);
  const [currentEpisode, setCurrentEpisode] = useState<number>(resolvedInitialEpisode);

  // Resume timestamp check
  const [startTime, setStartTime] = useState<number>(() => {
    if (initialStartTime && initialStartTime > 0) return initialStartTime;
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tParam = Number(params.get("t"));
      if (!isNaN(tParam) && tParam > 0) return tParam;
      if (savedRecord && savedRecord.currentTime > 5) return savedRecord.currentTime;
    }
    return 0;
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(
    autoPlay || Boolean((initialStartTime && initialStartTime > 0) || (savedRecord && savedRecord.currentTime > 5))
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showFullscreenOverlay, setShowFullscreenOverlay] = useState<boolean>(true);
  const overlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const episodeScrollRef = useRef<HTMLDivElement>(null);

  const [resumedBadge, setResumedBadge] = useState<string | null>(null);

  useEffect(() => {
    if (startTime > 5) {
      const mins = Math.floor(startTime / 60);
      const secs = Math.floor(startTime % 60).toString().padStart(2, "0");
      setResumedBadge(`Resumed at ${mins}:${secs}`);
      const timer = setTimeout(() => setResumedBadge(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [startTime]);

  const effectiveDuration = runtime && runtime > 0
    ? runtime * 60
    : (savedRecord?.duration && savedRecord.duration > 0
        ? savedRecord.duration
        : (mediaType === "tv" ? 45 * 60 : 120 * 60));

  const currentTimeRef = useRef<number>(startTime);
  const durationRef = useRef<number>(effectiveDuration);

  const activeServer = STREAM_SERVERS.find((s) => s.id === activeServerId) || STREAM_SERVERS[0];
  const streamUrl = activeServer.getUrl(tmdbId, mediaType, currentSeason, currentEpisode, startTime, title);

  const { activeProfile } = useProfileStore();
  const { updateContinueWatching } = useWatchlistStore();

  const [liveSeasons, setLiveSeasons] = useState<Season[] | null>(null);
  const [liveEpisodes, setLiveEpisodes] = useState<Episode[] | null>(null);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState<boolean>(false);

  const saveProgress = useCallback(() => {
    const curTime = currentTimeRef.current > 0 ? currentTimeRef.current : 10;
    const dur = durationRef.current || (runtime && runtime > 0 ? runtime * 60 : (mediaType === "tv" ? 2700 : 7200));
    if (!dur) return;

    // 1. Save to continueWatching single localStorage key
    saveContinueWatchingProgress({
      id: tmdbId,
      type: mediaType,
      season: mediaType === "tv" ? currentSeason : undefined,
      episode: mediaType === "tv" ? currentEpisode : undefined,
      currentTime: Math.floor(curTime),
      duration: Math.floor(dur),
      title: title,
      backdrop_path: backdropPath,
      poster_path: posterPath || backdropPath,
    });

    // 2. Also sync to useWatchlistStore for store subscribers
    if (activeProfile?.id) {
      const mediaItem: MediaItem = {
        id: tmdbId,
        title: title,
        name: title,
        media_type: mediaType,
        backdrop_path: backdropPath || null,
        poster_path: backdropPath || null,
        overview: "",
        genre_ids: [],
        vote_average: 8.0,
        vote_count: 100,
        popularity: 500,
      };
      const pct = Math.min(100, Math.max(0, (curTime / dur) * 100));
      updateContinueWatching(
        activeProfile.id,
        mediaItem,
        Math.round(pct),
        Math.floor(curTime / 60),
        Math.floor(dur / 60),
        mediaType === "tv" ? currentSeason : undefined,
        mediaType === "tv" ? currentEpisode : undefined
      );
    }
  }, [tmdbId, mediaType, currentSeason, currentEpisode, title, backdropPath, runtime, activeProfile?.id, updateContinueWatching]);

  // Immediate registration on mount so Continue Watching reflects this title right away!
  useEffect(() => {
    saveProgress();
  }, [saveProgress]);

  // 1. Listen for postMessage from player iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (!data) return;

        const time = data.currentTime ?? data.time ?? data.seconds ?? data.value?.seconds;
        const dur = data.duration ?? data.total ?? data.value?.duration;

        if (typeof time === "number" && !isNaN(time) && time > 0) {
          currentTimeRef.current = time;
        }
        if (typeof dur === "number" && !isNaN(dur) && dur > 0) {
          durationRef.current = dur;
        }
        if (data.event === "pause" || data.type === "pause") {
          saveProgress();
        }
        if (data.event === "ended" || data.type === "ended") {
          currentTimeRef.current = durationRef.current;
          saveProgress();
        }
      } catch {}
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [saveProgress]);

  // 2. Active playback ticking (1s) and throttled saving (every 2s) while playing
  useEffect(() => {
    if (!isPlaying) {
      saveProgress();
      return;
    }

    const clockInterval = setInterval(() => {
      currentTimeRef.current += 1;
    }, 1000);

    const throttleInterval = setInterval(() => {
      saveProgress();
    }, 2000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(throttleInterval);
      saveProgress();
    };
  }, [isPlaying, saveProgress]);

  // 3. Save on visibilitychange, beforeunload, and unmount
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveProgress();
      }
    };

    const handleBeforeUnload = () => {
      saveProgress();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      saveProgress();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [saveProgress]);

  // 4. When switching episode or season, update start time
  useEffect(() => {
    const saved = getContinueWatchingItem(tmdbId, mediaType, currentSeason, currentEpisode);
    if (saved && saved.currentTime > 5) {
      currentTimeRef.current = saved.currentTime;
      setStartTime(saved.currentTime);
    } else {
      currentTimeRef.current = 0;
      setStartTime(0);
    }
  }, [tmdbId, mediaType, currentSeason, currentEpisode]);

  // Fetch full TV show details if seasons not fully provided
  useEffect(() => {
    if (mediaType !== "tv" || !tmdbId) return;
    if (seasons && seasons.length > 1) return;

    let isCancelled = false;
    fetch(`/api/tmdb/tv/${tmdbId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!isCancelled && data?.seasons && data.seasons.length > 0) {
          const filtered = data.seasons.filter((s: Season) => s.season_number > 0);
          setLiveSeasons(filtered.length > 0 ? filtered : data.seasons);
        }
      })
      .catch((err) => console.warn("Live TV details fetch error:", err));

    return () => {
      isCancelled = true;
    };
  }, [tmdbId, mediaType, seasons]);

  // Fetch live episodes for current season
  useEffect(() => {
    if (mediaType !== "tv" || !tmdbId) return;
    let isCancelled = false;
    setIsLoadingEpisodes(true);

    fetch(`/api/tmdb/tv/${tmdbId}/season/${currentSeason}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!isCancelled && data?.episodes && data.episodes.length > 0) {
          setLiveEpisodes(data.episodes);
        }
      })
      .catch((err) => console.warn("Live episodes fetch error:", err))
      .finally(() => {
        if (!isCancelled) setIsLoadingEpisodes(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [tmdbId, mediaType, currentSeason]);

  // Available seasons list
  const validSeasons =
    liveSeasons && liveSeasons.length > 0
      ? liveSeasons
      : seasons && seasons.length > 0
      ? seasons
      : [
          {
            id: 1,
            name: "Season 1",
            season_number: 1,
            episode_count: 8,
            poster_path: null,
          },
        ];

  const currentSeasonData = validSeasons.find((s) => s.season_number === currentSeason) || validSeasons[0];
  const episodesList: Episode[] =
    liveEpisodes && liveEpisodes.length > 0
      ? liveEpisodes
      : currentSeasonData.episodes ||
        Array.from({ length: currentSeasonData.episode_count || 6 }).map((_, idx) => ({
          id: idx + 1,
          name: `Episode ${idx + 1}`,
          overview: `Episode ${idx + 1} of ${title}`,
          episode_number: idx + 1,
          season_number: currentSeason,
          still_path: backdropPath || null,
          runtime: 45,
          vote_average: 8.5,
        }));

  const currentEpisodeData = episodesList.find((e) => e.episode_number === currentEpisode) || episodesList[0];
  const currentEpisodeTitle = currentEpisodeData?.name || `Episode ${currentEpisode}`;

  // Cross-browser Fullscreen helpers
  const getFullscreenElement = () => {
    if (typeof document === "undefined") return null;
    const doc = document as any;
    return (
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement ||
      null
    );
  };

  const requestFullscreenOnElement = async (elem: HTMLElement) => {
    const el = elem as any;
    if (el.requestFullscreen) {
      return el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      return el.webkitRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      return el.mozRequestFullScreen();
    } else if (el.msRequestFullscreen) {
      return el.msRequestFullscreen();
    } else {
      throw new Error("Fullscreen API not supported");
    }
  };

  const exitFullscreenFromDocument = async () => {
    if (typeof document === "undefined") return;
    const doc = document as any;
    if (doc.exitFullscreen) {
      return doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
      return doc.webkitExitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      return doc.mozCancelFullScreen();
    } else if (doc.msExitFullscreen) {
      return doc.msExitFullscreen();
    }
  };

  // Fullscreen toggle with native API + windowed cinema fallback
  const toggleFullscreen = async () => {
    if (!playerContainerRef.current) return;

    const currentFs = !!getFullscreenElement() || isFullscreen;

    if (currentFs) {
      try {
        if (getFullscreenElement()) {
          await exitFullscreenFromDocument();
        }
      } catch (err) {
        console.warn("Exit native fullscreen error:", err);
      }
      setIsFullscreen(false);
    } else {
      try {
        await requestFullscreenOnElement(playerContainerRef.current);
        setIsFullscreen(true);
      } catch (err) {
        console.warn("Native fullscreen rejected, falling back to windowed cinema mode:", err);
        setIsFullscreen(true);
      }
    }
  };

  // Listen for native fullscreen changes & Escape key for fallback mode
  useEffect(() => {
    const handleFsChange = () => {
      const active = !!getFullscreenElement();
      setIsFullscreen(active);
    };

    const doc = document as any;
    doc.addEventListener("fullscreenchange", handleFsChange);
    doc.addEventListener("webkitfullscreenchange", handleFsChange);
    doc.addEventListener("mozfullscreenchange", handleFsChange);
    doc.addEventListener("MSFullscreenChange", handleFsChange);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        if (!getFullscreenElement()) {
          setIsFullscreen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      doc.removeEventListener("fullscreenchange", handleFsChange);
      doc.removeEventListener("webkitfullscreenchange", handleFsChange);
      doc.removeEventListener("mozfullscreenchange", handleFsChange);
      doc.removeEventListener("MSFullscreenChange", handleFsChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  // Fade out fullscreen overlay controls after inactivity
  const handleMouseMove = () => {
    if (!isFullscreen) return;
    setShowFullscreenOverlay(true);
    if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    overlayTimerRef.current = setTimeout(() => {
      setShowFullscreenOverlay(false);
    }, 3200);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isFullscreen) {
      timer = setTimeout(() => {
        setShowFullscreenOverlay(false);
      }, 3200);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isFullscreen]);

  const handleServerChange = (serverId: string) => {
    if (serverId === activeServerId) return;
    setIsLoading(true);
    setActiveServerId(serverId);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("promovies_preferred_server", serverId);
      } catch {}
    }
    setIsPlaying(true);
  };

  const handleEpisodeSelect = (epNum: number) => {
    setCurrentEpisode(epNum);
    setIsLoading(true);
    setIsPlaying(true);
  };

  const handleSeasonSelect = (seasonNum: number) => {
    setCurrentSeason(seasonNum);
    setCurrentEpisode(1);
    setLiveEpisodes(null);
    setIsLoading(true);
    setIsPlaying(true);
  };

  const scrollEpisodes = (direction: "left" | "right") => {
    if (episodeScrollRef.current) {
      const offset = direction === "left" ? -350 : 350;
      episodeScrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className={`flex flex-col gap-4 w-full select-none ${className}`}>
      {/* Theatrical / Unreleased Explainer Banner */}
      {isUnreleased && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-red-950/70 via-[#161622] to-black border border-red-500/40 text-xs shadow-xl animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
              <Film className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-white text-xs tracking-wider uppercase">
                  THEATRICAL / UPCOMING RELEASE
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-red-600/30 text-red-300 text-[10px] font-bold border border-red-500/30">
                  4K PREVIEW ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Full digital movie is not yet released on VOD. Playing official 4K trailer without buffering.
              </p>
            </div>
          </div>
          {activeServerId !== "trailer" && (
            <button
              onClick={() => handleServerChange("trailer")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Back to 4K Trailer</span>
            </button>
          )}
        </div>
      )}

      {/* Player Screen Frame */}
      <div
        ref={playerContainerRef}
        onMouseMove={isFullscreen ? handleMouseMove : undefined}
        className={`relative flex items-center justify-center bg-black transition-all duration-200 transform-gpu ${
          isFullscreen
            ? "!fixed !inset-0 !z-[999999] !w-screen !h-screen !max-w-none !max-h-none !rounded-none !border-0 !m-0 !p-0 !aspect-auto !shadow-none"
            : "aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-xl group"
        }`}
        style={{
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          contain: isFullscreen ? "none" : "paint",
          isolation: "isolate",
        }}
      >
        {isPlaying ? (
          <>
            {/* Floating Resumed Timestamp Pill */}
            {resumedBadge && (
              <div className="absolute top-4 left-4 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-600/90 text-white text-xs font-semibold shadow-lg shadow-violet-900/50 backdrop-blur-md animate-in fade-in duration-300 pointer-events-none border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{resumedBadge}</span>
              </div>
            )}
            <iframe
              key={`${streamUrl}-${currentSeason}-${currentEpisode}`}
              src={streamUrl}
              title={`${title} - Server ${activeServer.name}`}
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
              referrerPolicy="origin"
              onLoad={() => setIsLoading(false)}
            />

            {/* Floating Fullscreen Header Overlay (Auto-hides on inactivity) */}
            {isFullscreen && (
              <div
                className={`absolute top-0 left-0 right-0 p-4 sm:p-6 z-50 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/40 to-transparent transition-opacity duration-300 pointer-events-none ${
                  showFullscreenOverlay ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex items-center gap-3 pointer-events-auto">
                  <div className="w-8 h-8 rounded-lg bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
                    <Play className="w-4 h-4 fill-red-500 ml-0.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-black text-white drop-shadow truncate">
                      {title}
                    </h4>
                    {mediaType === "tv" && (
                      <p className="text-xs text-slate-300 font-medium truncate">
                        Season {currentSeason} · Episode {currentEpisode} &mdash; {currentEpisodeTitle}
                      </p>
                    )}
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 ml-2 px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-bold shrink-0">
                    <Sparkles className="w-3 h-3" />
                    {activeServer.name}
                  </span>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/90 hover:bg-black text-white text-xs font-bold border border-white/20 hover:border-red-500/60 shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto shrink-0"
                  title="Exit Fullscreen (Esc)"
                >
                  <Minimize2 className="w-4 h-4 text-red-500" />
                  <span>Exit Fullscreen</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-400 font-mono">
                    ESC
                  </span>
                </button>
              </div>
            )}

            {isLoading && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center gap-3 z-20 pointer-events-none">
                <RefreshCw className="w-8 h-8 text-red-500 animate-spin" />
                <span className="text-xs font-semibold text-slate-300">
                  Switching to {activeServer.name}...
                </span>
              </div>
            )}
          </>
        ) : (
          /* Poster Preview State before clicking play */
          <div className="relative w-full h-full flex items-center justify-center">
            {backdropPath && (
              <Image
                src={getTMDBImageUrl(backdropPath, "original")}
                alt={title}
                fill
                priority
                className="object-cover opacity-60"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />

            <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
              <button
                onClick={() => {
                  setIsPlaying(true);
                  setIsLoading(true);
                }}
                className="group/play relative p-5 sm:p-6 rounded-full bg-red-600 text-white shadow-2xl shadow-red-600/50 hover:scale-110 active:scale-95 transition-all duration-300"
                aria-label="Start streaming"
              >
                <Play className="w-8 h-8 fill-white ml-1" />
                <span className="absolute -inset-2 rounded-full border-2 border-red-500/40 animate-ping pointer-events-none" />
              </button>

              <div>
                <h3 className="text-xl sm:text-3xl font-black text-white drop-shadow-md">
                  {title}
                </h3>
                {mediaType === "tv" && (
                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                    Season {currentSeason} · Episode {currentEpisode} &mdash; {currentEpisodeTitle}
                  </p>
                )}
                <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-[11px] font-bold">
                  <Sparkles className="w-3 h-3" />
                  Ready to Stream in 4K UHD
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar & Server Switcher (Matching Provided Design) */}
      <div className="relative rounded-2xl bg-[#14141e] border border-white/10 p-3 sm:p-4 shadow-xl flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Active Title & Episode status */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/30 text-red-500 flex items-center justify-center shrink-0">
              <Play className="w-4 h-4 fill-red-500 ml-0.5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                {title}
              </h4>
              {mediaType === "tv" ? (
                <p className="text-[11px] text-slate-400 truncate">
                  S{currentSeason} · E{currentEpisode} &mdash; {currentEpisodeTitle}
                </p>
              ) : isUnreleased ? (
                <p className="text-[11px] text-amber-400 font-medium truncate flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Theatrical 4K Preview · Instant Playback
                </p>
              ) : (
                <p className="text-[11px] text-emerald-400 font-medium truncate">
                  Movie Streaming · Full HD / 4K
                </p>
              )}
            </div>
          </div>

          {/* Right: Server List & Fullscreen */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 shrink-0 mr-1">
              SERVER
            </span>

            {STREAM_SERVERS.map((server) => {
              const isActive = activeServerId === server.id;
              return (
                <button
                  key={server.id}
                  onClick={() => handleServerChange(server.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/40 scale-105"
                      : server.isFast
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20"
                      : server.isVip
                      ? "bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5"
                  }`}
                >
                  {server.id === "trailer" ? (
                    <Film className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  ) : server.isFast ? (
                    <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 shrink-0" />
                  ) : server.isVip ? (
                    <Award className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                  ) : null}
                  <span>{server.name}</span>
                  {server.badge && (
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? "bg-black/40 text-white border border-white/20"
                          : server.isFast
                          ? "bg-emerald-400/20 text-emerald-300"
                          : server.isVip
                          ? "bg-amber-400/20 text-amber-300"
                          : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {server.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ml-auto lg:ml-2 cursor-pointer ${
                isFullscreen
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/40 border border-red-500 scale-105"
                  : "bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
              }`}
              title={isFullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Fullscreen</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Red Accent Indicator Bar */}
        <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-red-600 via-rose-500 to-transparent rounded-full" />
        </div>

        {/* Quick Switch Hint */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2 pt-1 text-[11px] text-slate-400 gap-2">
          <span className="flex items-center gap-1.5 flex-wrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] shrink-0" />
            {isUnreleased ? (
              <span>Unreleased Theatrical Title: Playing official 4K trailer. If testing early leaks, click <strong>NetOut Ultra</strong>, <strong>NetOut VIP</strong>, or <strong>VidSrc SU</strong>.</span>
            ) : (
              <span>⚡ NetOut Ultra Engine Active · If buffering or unavailable, switch to <strong>NetOut VIP (VidOut)</strong>, <strong>VidSrc SU</strong>, or <strong>MultiEmbed</strong>.</span>
            )}
          </span>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono shrink-0">
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">⚡ Zero Buffer Mode</span>
            <span>·</span>
            <span>{isUnreleased ? "Theatrical Mode" : "Adaptive CDN"}</span>
          </div>
        </div>
      </div>

      {/* TV Episodes Section (when mediaType is "tv") */}
      {mediaType === "tv" && (
        <div className="mt-2 flex flex-col gap-4">
          {/* Section Header: Red Bar + Title + Season Dropdown + Nav Arrows */}
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-5 bg-red-600 rounded-full" />
              <h3 className="text-lg font-bold text-white tracking-tight">Episodes</h3>

              {/* Season Dropdown */}
              {validSeasons.length > 1 ? (
                <div className="relative">
                  <select
                    value={currentSeason}
                    onChange={(e) => handleSeasonSelect(Number(e.target.value))}
                    className="appearance-none pl-3.5 pr-8 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white focus:outline-none focus:border-red-500 cursor-pointer"
                  >
                    {validSeasons.map((s) => (
                      <option key={s.id || s.season_number} value={s.season_number} className="bg-[#14141e] text-white">
                        {s.name || `Season ${s.season_number}`}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              ) : (
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-slate-400 font-medium">
                  Season {currentSeason}
                </span>
              )}
            </div>

            {/* Scroll navigation arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollEpisodes("left")}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Previous episodes"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollEpisodes("right")}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Next episodes"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Episodes Carousel */}
          <div
            ref={episodeScrollRef}
            className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth"
          >
            {episodesList.map((ep) => {
              const isCurrent = ep.episode_number === currentEpisode;
              const stillUrl = ep.still_path
                ? getTMDBImageUrl(ep.still_path, "w500")
                : backdropPath
                ? getTMDBImageUrl(backdropPath, "w500")
                : null;

              return (
                <div
                  key={ep.id || ep.episode_number}
                  onClick={() => handleEpisodeSelect(ep.episode_number)}
                  className={`group relative flex flex-col gap-2 w-52 sm:w-60 shrink-0 p-2.5 rounded-2xl border transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-red-600/10 border-red-500/50 shadow-lg shadow-red-950/40 scale-[1.02]"
                      : "bg-[#14141e] border-white/5 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <EpisodeItemThumbnail
                    src={stillUrl}
                    alt={ep.name}
                    epNumber={ep.episode_number}
                    runtime={ep.runtime}
                    isCurrent={isCurrent}
                  />

                  {/* Episode Title & Number */}
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-red-400 font-mono">
                      E{ep.episode_number}
                    </span>
                    <h5
                      className={`text-xs font-semibold truncate ${
                        isCurrent ? "text-white font-bold" : "text-slate-300 group-hover:text-white"
                      }`}
                      title={ep.name}
                    >
                      {ep.name}
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
