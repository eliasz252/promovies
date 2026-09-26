"use client";

import { use, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Film, Tv, Globe, Sparkles, Filter, SlidersHorizontal, RefreshCw } from "lucide-react";
import MediaCard from "@/components/media/MediaCard";
import MediaPreviewModal from "@/components/media/MediaPreviewModal";
import { MediaItem } from "@/types/tmdb";
import { getCategoryBySlug, CategoryConfig } from "@/lib/tmdb/categories";
import { MOCK_MEDIA_ITEMS, getKidsContent } from "@/lib/tmdb/mockData";
import { useProfileStore } from "@/store/useProfileStore";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const category: CategoryConfig = useMemo(() => getCategoryBySlug(slug), [slug]);
  const { activeProfile } = useProfileStore();

  const [items, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "movie" | "tv">("all");
  const [sortBy, setSortBy] = useState<"popularity" | "rating" | "newest" | "oldest">("popularity");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch live TMDB content matching the category, with local catalog fallback
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    async function loadCategoryContent() {
      try {
        let liveResults: MediaItem[] = [];

        // 1. Fetch live TMDB results via our API proxy
        if (category.type === "genre" && category.genreId) {
          const [movieRes, tvRes] = await Promise.allSettled([
            fetch(`/api/tmdb/discover/movie?with_genres=${category.genreId}&sort_by=popularity.desc`).then((r) =>
              r.ok ? r.json() : null
            ),
            fetch(`/api/tmdb/discover/tv?with_genres=${category.genreId}&sort_by=popularity.desc`).then((r) =>
              r.ok ? r.json() : null
            ),
          ]);

          if (movieRes.status === "fulfilled" && movieRes.value?.results) {
            liveResults.push(...movieRes.value.results);
          }
          if (tvRes.status === "fulfilled" && tvRes.value?.results) {
            liveResults.push(...tvRes.value.results);
          }
        } else if (category.type === "language" && category.languageCode) {
          const [movieRes, tvRes] = await Promise.allSettled([
            fetch(`/api/tmdb/discover/movie?with_original_language=${category.languageCode}&sort_by=popularity.desc`).then((r) =>
              r.ok ? r.json() : null
            ),
            fetch(`/api/tmdb/discover/tv?with_original_language=${category.languageCode}&sort_by=popularity.desc`).then((r) =>
              r.ok ? r.json() : null
            ),
          ]);

          if (movieRes.status === "fulfilled" && movieRes.value?.results) {
            liveResults.push(...movieRes.value.results);
          }
          if (tvRes.status === "fulfilled" && tvRes.value?.results) {
            liveResults.push(...tvRes.value.results);
          }
        }

        // 2. Filter local catalog items as supplementary/fallback data
        const localMatches = MOCK_MEDIA_ITEMS.filter((m) => {
          if (category.type === "genre" && category.genreId) {
            if (category.genreIds && category.genreIds.length > 0) {
              return category.genreIds.some((gId) => m.genre_ids?.includes(gId));
            }
            return m.genre_ids?.includes(category.genreId);
          }

          if (category.type === "language" && category.languageCode) {
            if (m.original_language === category.languageCode) return true;
            // Additional heuristics for regional cinema names
            const text = `${m.title} ${m.overview}`.toLowerCase();
            if (category.languageCode === "ko" && (text.includes("korea") || text.includes("seoul"))) return true;
            if (category.languageCode === "ja" && (text.includes("japan") || text.includes("tokyo") || m.genre_ids.includes(16))) return true;
            if (category.languageCode === "hi" && (text.includes("india") || text.includes("bollywood") || text.includes("mumbai"))) return true;
            if (category.languageCode === "fr" && (text.includes("france") || text.includes("paris"))) return true;
            if (category.languageCode === "es" && (text.includes("spain") || text.includes("madrid") || text.includes("mexico"))) return true;
            return false;
          }

          return false;
        });

        // 3. Deduplicate combined results by ID
        const mergedMap = new Map<number, MediaItem>();

        // Add live results first (freshest TMDB posters & ratings)
        for (const item of liveResults) {
          if (item && item.id) {
            mergedMap.set(item.id, item);
          }
        }

        // Add local items if not already present
        for (const item of localMatches) {
          if (item && item.id && !mergedMap.has(item.id)) {
            mergedMap.set(item.id, item);
          }
        }

        let combined = Array.from(mergedMap.values());

        // Fallback: If 0 results for this genre/language, provide curated selection
        if (combined.length === 0 && category.genreId) {
          const fallbackMatches = MOCK_MEDIA_ITEMS.filter((m) =>
            m.genre_ids?.some((g) => g === category.genreId)
          );
          combined = fallbackMatches;
        }

        // Apply kids profile filtering if active
        if (activeProfile.isKids) {
          combined = getKidsContent(combined);
        }

        if (!isCancelled) {
          setItems(combined);
          setIsLoading(false);
        }
      } catch (err) {
        console.warn("[CategoryPage] Error loading category content:", err);
        // Fallback to local catalog
        if (!isCancelled) {
          let fallback = MOCK_MEDIA_ITEMS.filter((m) =>
            category.genreId ? m.genre_ids?.includes(category.genreId) : false
          );
          if (activeProfile.isKids) {
            fallback = getKidsContent(fallback);
          }
          setItems(fallback);
          setIsLoading(false);
        }
      }
    }

    loadCategoryContent();

    return () => {
      isCancelled = true;
    };
  }, [category, activeProfile.isKids]);

  // Client filtering and sorting
  const filteredItems = useMemo(() => {
    let list = [...items];

    // Filter by type (Movies vs TV)
    if (filterType !== "all") {
      list = list.filter((item) => item.media_type === filterType);
    }

    // Sort
    return list.sort((a, b) => {
      if (sortBy === "rating") {
        return (b.vote_average || 0) - (a.vote_average || 0);
      }
      if (sortBy === "newest") {
        const dateA = a.release_date || a.first_air_date || "";
        const dateB = b.release_date || b.first_air_date || "";
        return dateB.localeCompare(dateA);
      }
      if (sortBy === "oldest") {
        const dateA = a.release_date || a.first_air_date || "";
        const dateB = b.release_date || b.first_air_date || "";
        return dateA.localeCompare(dateB);
      }
      // Default: popularity
      return (b.popularity || 0) - (a.popularity || 0);
    });
  }, [items, filterType, sortBy]);

  return (
    <>
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen select-none ${
          isModalOpen ? "pointer-events-none select-none" : ""
        }`}
        aria-hidden={isModalOpen}
      >
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Discovery</span>
          </Link>

          {/* Category Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/20 text-violet-300 text-xs font-bold border border-violet-500/30 mb-2.5">
                {category.type === "language" ? (
                  <Globe className="w-3.5 h-3.5 text-violet-400" />
                ) : (
                  <Film className="w-3.5 h-3.5 text-violet-400" />
                )}
                <span>{category.badge || "CATEGORY CATALOG"}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center gap-3">
                <span>{category.title}</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {category.subtitle}
              </p>
            </div>

            {/* Counts Badge */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                {isLoading ? "Fetching..." : `${filteredItems.length} Titles`}
              </span>
            </div>
          </div>

          {/* Controls: Type Filter Pills & Sorting */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#14141e] border border-white/10 text-xs w-fit">
              <button
                onClick={() => setFilterType("all")}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  filterType === "all" ? "bg-violet-600 text-white shadow-md shadow-violet-600/30" : "text-slate-400 hover:text-white"
                }`}
              >
                All Content
              </button>
              <button
                onClick={() => setFilterType("movie")}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterType === "movie" ? "bg-violet-600 text-white shadow-md shadow-violet-600/30" : "text-slate-400 hover:text-white"
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Movies</span>
              </button>
              <button
                onClick={() => setFilterType("tv")}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterType === "tv" ? "bg-violet-600 text-white shadow-md shadow-violet-600/30" : "text-slate-400 hover:text-white"
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>TV Shows</span>
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl bg-[#14141e] border border-white/10 text-xs font-semibold text-white focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Releases</option>
                <option value="oldest">All-Time Classics</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          /* Loading State: Skeleton Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 animate-pulse pt-2">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div key={idx} className="flex flex-col gap-2.5">
                <div className="w-full aspect-[2/3] rounded-2xl bg-[#14141e] border border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-600/10 via-transparent to-transparent" />
                </div>
                <div className="h-4 bg-white/10 rounded-md w-3/4" />
                <div className="h-3 bg-white/5 rounded-md w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          /* Results Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 pt-2">
            {filteredItems.map((media) => (
              <div
                key={media.id}
                style={{
                  contentVisibility: "auto",
                  containIntrinsicSize: "240px 360px",
                }}
              >
                <MediaCard
                  media={media}
                  onOpenModal={(m) => {
                    setSelectedMedia(m);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-24 my-6 text-center flex flex-col items-center justify-center gap-4 bg-[#14141e]/50 border border-violet-500/20 rounded-3xl p-8 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-violet-600/10 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-xl shadow-violet-600/10">
              <Film className="w-8 h-8" />
            </div>
            <div className="max-w-md">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                No titles found in this category yet
              </h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                We couldn&apos;t find any titles for this category right now. Check back soon or explore our other popular genres and releases.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
              <button
                onClick={() => setFilterType("all")}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-lg shadow-violet-600/30 cursor-pointer"
              >
                Reset Filters
              </button>
              <Link
                href="/movies"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
              >
                Browse All Movies
              </Link>
              <Link
                href="/new-and-popular"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
              >
                New & Popular
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Media Detail & Streaming Modal */}
      <MediaPreviewModal
        media={selectedMedia}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
