"use client";

import { useState, useEffect, useTransition, Suspense, useRef, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MediaCard from "@/components/media/MediaCard";
import MediaPreviewModal from "@/components/media/MediaPreviewModal";
import { MediaItem } from "@/types/tmdb";
import { MOCK_MEDIA_ITEMS, getKidsContent } from "@/lib/tmdb/mockData";
import { useProfileStore } from "@/store/useProfileStore";
import { Search, X, Film, Tv, Users, Sparkles, Flame, Clock, History } from "lucide-react";

const SUGGESTED_QUERIES = [
  "Spider-Man",
  "The Dark Knight",
  "Breaking Bad",
  "The Godfather",
  "Interstellar",
  "Avengers",
  "The Matrix",
  "Pulp Fiction",
  "Game of Thrones",
  "Titanic",
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";
  const { activeProfile } = useProfileStore();

  const [query, setQuery] = useState(queryParam);
  const [activeTab, setActiveTab] = useState<"all" | "movie" | "tv" | "people">("all");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiResults, setApiResults] = useState<MediaItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    startTransition(() => {
      if (val.trim()) {
        router.replace(`/search?q=${encodeURIComponent(val.trim())}`, { scroll: false });
      } else {
        router.replace("/search", { scroll: false });
      }
    });
  };

  // Live TMDB API Search with 250ms debounce
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setApiResults(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const endpoint =
          activeTab === "movie"
            ? "search/movie"
            : activeTab === "tv"
            ? "search/tv"
            : "search/multi";

        const res = await fetch(`/api/tmdb/${endpoint}?query=${encodeURIComponent(trimmed)}&isKids=${activeProfile.isKids}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.results) && data.results.length > 0) {
            setApiResults(data.results);
          } else {
            setApiResults([]);
          }
        } else {
          setApiResults(null);
        }
      } catch (err) {
        console.warn("[Search] Live API lookup failed, falling back to local catalog:", err);
        setApiResults(null);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query, activeTab, activeProfile.isKids]);

  // Local fallback filter
  const catalog = useMemo(() => {
    return activeProfile.isKids ? getKidsContent(MOCK_MEDIA_ITEMS) : MOCK_MEDIA_ITEMS;
  }, [activeProfile.isKids]);

  const q = query.toLowerCase().trim();
  const localFiltered = useMemo(() => {
    if (!q) return [];
    return catalog.filter((item) => {
      const matchesTitle = item.title?.toLowerCase().includes(q) || item.name?.toLowerCase().includes(q);
      const matchesOverview = item.overview?.toLowerCase().includes(q);
      const matchesCast = item.credits?.cast.some((c) => c.name.toLowerCase().includes(q));
      const matchesGenre = item.genres?.some((g) => g.name.toLowerCase().includes(q));

      if (activeTab === "movie") return item.media_type === "movie" && (matchesTitle || matchesOverview || matchesCast || matchesGenre);
      if (activeTab === "tv") return item.media_type === "tv" && (matchesTitle || matchesOverview || matchesCast || matchesGenre);
      if (activeTab === "people") return matchesCast;
      return matchesTitle || matchesOverview || matchesCast || matchesGenre;
    });
  }, [catalog, q, activeTab]);

  // Determine final displayed items
  const finalResults: MediaItem[] = useMemo(() => {
    if (apiResults && apiResults.length > 0) {
      return apiResults.filter((item) => {
        if (activeTab === "movie") return item.media_type === "movie";
        if (activeTab === "tv") return item.media_type === "tv";
        return true;
      });
    }
    return localFiltered;
  }, [apiResults, activeTab, localFiltered]);

  return (
    <>
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen select-none ${
          isModalOpen ? "pointer-events-none select-none" : ""
        }`}
        aria-hidden={isModalOpen}
      >
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto mb-6">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-violet-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search all classic, franchise & latest movies or TV shows..."
            autoFocus
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-[#14141e] border border-violet-500/30 text-white placeholder:text-slate-500 text-base focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 shadow-2xl transition-all"
          />
          {query && (
            <button
              onClick={() => handleQueryChange("")}
              className="absolute right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Sub-Tabs */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "all" ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30" : "bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => setActiveTab("movie")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "movie" ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30" : "bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Movies</span>
          </button>
          <button
            onClick={() => setActiveTab("tv")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "tv" ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30" : "bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>TV Series</span>
          </button>
          <button
            onClick={() => setActiveTab("people")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "people" ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30" : "bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Actors & Directors</span>
          </button>
        </div>

        {/* Quick Franchise & Classic Hits Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 mt-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Popular:
          </span>
          {SUGGESTED_QUERIES.map((item) => (
            <button
              key={item}
              onClick={() => handleQueryChange(item)}
              className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer border ${
                query.toLowerCase() === item.toLowerCase()
                  ? "bg-violet-600/30 text-violet-300 border-violet-500/40"
                  : "bg-white/5 text-slate-300 border-white/5 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      {query && (
        <div className="mb-6 flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-3">
          <span>
            {isLoading ? (
              <span className="text-violet-400 animate-pulse font-medium">Searching live global cinema database...</span>
            ) : (
              <>
                Found <strong className="text-white font-bold">{finalResults.length}</strong> matching titles for &ldquo;
                <span className="text-violet-300">{query}</span>&rdquo;
              </>
            )}
          </span>
          <span className="text-[11px] text-slate-500">Includes classic hits & 2026 latest</span>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="relative aspect-[2/3] w-full rounded-2xl bg-[#141422] border border-white/5 animate-pulse flex items-center justify-center">
                <Film className="w-8 h-8 text-white/10" />
              </div>
              <div className="h-4 w-3/4 rounded bg-white/5 animate-pulse" />
              <div className="h-3 w-1/2 rounded bg-white/5 animate-pulse" />
            </div>
          ))}
        </div>
      ) : finalResults.length > 0 ? (
        /* Results Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {finalResults.map((item) => (
            <div
              key={`${item.media_type}-${item.id}`}
              style={{
                contentVisibility: "auto",
                containIntrinsicSize: "240px 360px",
              }}
            >
              <MediaCard
                media={item}
                onOpenModal={(m) => {
                  setSelectedMedia(m);
                  setIsModalOpen(true);
                }}
              />
            </div>
          ))}
        </div>
      ) : query ? (
        /* Empty Results */
        <div className="py-24 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
          <Sparkles className="w-12 h-12 text-slate-600 mb-3" />
          <h3 className="text-xl font-bold text-white mb-1">No Results Found</h3>
          <p className="text-xs text-slate-400">
            We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try searching for &ldquo;Spider-Man&rdquo;, &ldquo;The Dark Knight&rdquo;, &ldquo;Godfather&rdquo;, or &ldquo;Breaking Bad&rdquo;.
          </p>
        </div>
      ) : (
        /* Suggestions when query is empty */
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              <span>Recommended Classics & Latest Headliners</span>
            </h3>
            <span className="text-xs text-slate-400">70+ curated titles</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {catalog.slice(0, 15).map((item) => (
              <div
                key={`${item.media_type}-${item.id}`}
                style={{
                  contentVisibility: "auto",
                  containIntrinsicSize: "240px 360px",
                }}
              >
                <MediaCard
                  media={item}
                  onOpenModal={(m) => {
                    setSelectedMedia(m);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      </div>

      <MediaPreviewModal
        media={selectedMedia}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
