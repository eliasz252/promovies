"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Season, Episode } from "@/types/tmdb";
import SeasonSelector from "./SeasonSelector";
import EpisodeCard from "./EpisodeCard";
import { fetchTVSeasons, fetchSeasonEpisodes } from "@/lib/tmdb/seasons";
import { AlertCircle, Film, RefreshCw } from "lucide-react";

interface EpisodeListProps {
  tmdbId?: number | string;
  mediaType?: "movie" | "tv";
  initialSeasons?: Season[];
  seasons?: Season[];
  backdropPath?: string | null;
  selectedSeasonNumber?: number;
  selectedEpisodeNumber?: number;
  onSeasonChange?: (seasonNum: number) => void;
  onPlayEpisode?: (seasonNum: number, episodeNum: number) => void;
  syncWithUrl?: boolean;
}

function EpisodeListSkeleton() {
  return (
    <div className="flex flex-col gap-2.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 sm:gap-5 p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse"
        >
          <div className="w-6 sm:w-8 h-6 bg-white/5 rounded-md shrink-0" />
          <div className="aspect-video w-28 sm:w-44 bg-white/5 rounded-xl shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-4 bg-white/10 rounded w-1/3" />
            <div className="h-3 bg-white/5 rounded w-5/6" />
            <div className="h-3 bg-white/5 rounded w-2/3" />
          </div>
          <div className="w-12 h-4 bg-white/5 rounded shrink-0" />
        </div>
      ))}
    </div>
  );
}

export default function EpisodeList({
  tmdbId,
  mediaType = "tv",
  initialSeasons,
  seasons: propSeasons,
  backdropPath,
  selectedSeasonNumber: propSeasonNumber,
  selectedEpisodeNumber,
  onSeasonChange,
  onPlayEpisode,
  syncWithUrl = true,
}: EpisodeListProps) {
  const effectiveInitialSeasons = initialSeasons || propSeasons;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read ?season= from URL if syncWithUrl is active
  const urlSeasonParam = searchParams?.get("season");
  const initialSeasonNum =
    propSeasonNumber ||
    (urlSeasonParam ? parseInt(urlSeasonParam, 10) : 1) ||
    1;

  const [seasons, setSeasons] = useState<Season[]>(
    effectiveInitialSeasons && effectiveInitialSeasons.length > 0 ? effectiveInitialSeasons : []
  );
  const [currentSeasonNumber, setCurrentSeasonNumber] = useState<number>(initialSeasonNum);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoadingSeasons, setIsLoadingSeasons] = useState(false);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Fetch TV show seasons if not provided or empty
  useEffect(() => {
    if (!tmdbId || mediaType !== "tv") return;
    if (effectiveInitialSeasons && effectiveInitialSeasons.length > 0) {
      setSeasons(effectiveInitialSeasons.filter((s) => s.season_number > 0));
      return;
    }

    let isMounted = true;
    setIsLoadingSeasons(true);

    fetchTVSeasons(tmdbId, false)
      .then((data) => {
        if (!isMounted) return;
        if (data && data.length > 0) {
          setSeasons(data);
          // If current season number is not in the list, default to first available
          if (!data.some((s) => s.season_number === currentSeasonNumber)) {
            setCurrentSeasonNumber(data[0].season_number);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to load seasons:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingSeasons(false);
      });

    return () => {
      isMounted = false;
    };
  }, [tmdbId, mediaType, initialSeasons]);

  // 2. Fetch episodes whenever currentSeasonNumber or tmdbId changes
  const loadEpisodes = useCallback(
    async (seasonNum: number) => {
      if (!tmdbId || mediaType !== "tv") return;
      setIsLoadingEpisodes(true);
      setErrorMessage(null);

      try {
        const { episodes: fetchedEpisodes } = await fetchSeasonEpisodes(
          tmdbId,
          seasonNum
        );
        setEpisodes(fetchedEpisodes);
      } catch (err: any) {
        setErrorMessage("Failed to load episodes. Please try again.");
      } finally {
        setIsLoadingEpisodes(false);
      }
    },
    [tmdbId, mediaType]
  );

  useEffect(() => {
    loadEpisodes(currentSeasonNumber);
  }, [currentSeasonNumber, loadEpisodes]);

  // 3. Handle Season Change
  const handleSeasonChange = (newSeasonNum: number) => {
    setCurrentSeasonNumber(newSeasonNum);
    onSeasonChange?.(newSeasonNum);

    // Optionally sync with URL search parameter ?season=...
    if (syncWithUrl && pathname) {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set("season", newSeasonNum.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  // 4. Handle Episode Play Click
  const handlePlay = (episode: Episode) => {
    if (onPlayEpisode) {
      onPlayEpisode(currentSeasonNumber, episode.episode_number);
    } else if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("s", String(currentSeasonNumber));
      url.searchParams.set("e", String(episode.episode_number));
      url.hash = "stream-player";
      window.location.href = url.toString();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Header: Title & Season Selector */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Episodes</span>
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
          </h3>

          {episodes.length > 0 && !isLoadingEpisodes && (
            <span className="text-xs font-mono text-slate-400">
              {episodes.length} Total
            </span>
          )}
        </div>

        {/* Season Selector Dropdown */}
        {seasons.length > 0 && (
          <SeasonSelector
            seasons={seasons}
            selectedSeasonNumber={currentSeasonNumber}
            onSeasonChange={handleSeasonChange}
            isLoading={isLoadingEpisodes || isLoadingSeasons}
          />
        )}
      </div>

      {/* Main Episode Cards List / Loading Skeleton / Error State */}
      {isLoadingEpisodes ? (
        <EpisodeListSkeleton />
      ) : errorMessage ? (
        <div className="py-12 px-6 rounded-2xl bg-red-950/20 border border-red-500/20 text-center flex flex-col items-center gap-3">
          <AlertCircle className="w-8 h-8 text-red-400" />
          <p className="text-sm font-semibold text-red-200">{errorMessage}</p>
          <button
            onClick={() => loadEpisodes(currentSeasonNumber)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        </div>
      ) : episodes.length === 0 ? (
        <div className="py-12 px-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center flex flex-col items-center gap-3">
          <Film className="w-8 h-8 text-slate-500" />
          <h4 className="text-sm font-bold text-white">No episodes found</h4>
          <p className="text-xs text-slate-400 max-w-sm">
            Episodes for Season {currentSeasonNumber} may not be released yet or are unavailable.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {episodes.map((episode) => (
            <EpisodeCard
              key={episode.id || episode.episode_number}
              episode={episode}
              fallbackBackdrop={backdropPath}
              onPlay={handlePlay}
              isActive={
                selectedEpisodeNumber === episode.episode_number
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
