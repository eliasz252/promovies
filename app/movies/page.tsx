"use client";

import { useState, useMemo } from "react";
import MediaCard from "@/components/media/MediaCard";
import MediaPreviewModal from "@/components/media/MediaPreviewModal";
import { MediaItem } from "@/types/tmdb";
import { MOCK_MEDIA_ITEMS, GENRES_LIST, getKidsContent } from "@/lib/tmdb/mockData";
import { useProfileStore } from "@/store/useProfileStore";
import { useCatalog } from "@/hooks/useCatalog";
import { Film, Filter, Sparkles } from "lucide-react";

export default function MoviesPage() {
  const { activeProfile } = useProfileStore();
  const catalogData = useCatalog();
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [eraFilter, setEraFilter] = useState<"all" | "classics" | "latest">("all");
  const [sortBy, setSortBy] = useState<"popularity" | "rating" | "newest" | "oldest">("popularity");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoize filtered and sorted movies list including live synced movies
  const movies = useMemo(() => {
    const syncedMovies = catalogData?.allMovies || [];
    const seenIds = new Set<number>();
    const combined: MediaItem[] = [];

    // Prioritize live synced movies
    syncedMovies.forEach((m) => {
      if (!seenIds.has(m.id)) {
        seenIds.add(m.id);
        combined.push(m);
      }
    });

    MOCK_MEDIA_ITEMS.filter((m) => m.media_type === "movie").forEach((m) => {
      if (!seenIds.has(m.id)) {
        seenIds.add(m.id);
        combined.push(m);
      }
    });

    let list = combined;
    if (activeProfile?.isKids) {
      list = getKidsContent(list);
    }

    // Filter by era (Classics vs Latest)
    if (eraFilter === "classics") {
      list = list.filter((m) => (m.release_date || "") < "2024-01-01");
    } else if (eraFilter === "latest") {
      list = list.filter((m) => (m.release_date || "") >= "2024-01-01");
    }

    // Filter by genre
    if (selectedGenre) {
      list = list.filter((m) => m.genre_ids.includes(selectedGenre));
    }

    // Sort
    return [...list].sort((a, b) => {
      if (sortBy === "rating") return b.vote_average - a.vote_average;
      if (sortBy === "newest") {
        return (b.release_date || "").localeCompare(a.release_date || "");
      }
      if (sortBy === "oldest") {
        return (a.release_date || "").localeCompare(b.release_date || "");
      }
      return b.popularity - a.popularity;
    });
  }, [activeProfile.isKids, eraFilter, selectedGenre, sortBy]);

  return (
    <>
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen select-none ${
          isModalOpen ? "pointer-events-none select-none" : ""
        }`}
        aria-hidden={isModalOpen}
      >
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Film className="w-8 h-8 text-violet-400" />
              <span>Movies Discovery</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Explore 4K UHD all-time classics, blockbuster franchises, and latest releases.
            </p>
          </div>

          {/* Sort selector & Era toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#14141e] border border-white/10 text-xs">
              <button
                onClick={() => setEraFilter("all")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  eraFilter === "all" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                All Eras
              </button>
              <button
                onClick={() => setEraFilter("classics")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  eraFilter === "classics" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Classics
              </button>
              <button
                onClick={() => setEraFilter("latest")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  eraFilter === "latest" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                2024–2026
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-[#14141e] border border-white/10 text-xs font-semibold text-white focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated (Masterpieces)</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Classics (Oldest First)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Genre Filter Pills */}
        <div className="py-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedGenre(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedGenre === null
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/40"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            All Genres
          </button>
          {GENRES_LIST.slice(0, 12).map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedGenre === genre.id
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/40"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {movies.map((movie) => (
              <div
                key={movie.id}
                style={{
                  contentVisibility: "auto",
                  containIntrinsicSize: "240px 360px",
                }}
              >
                <MediaCard
                  media={movie}
                  onOpenModal={(m) => {
                    setSelectedMedia(m);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center gap-3">
            <Sparkles className="w-10 h-10 text-slate-600" />
            <h3 className="text-lg font-bold text-white">No Movies Found</h3>
            <p className="text-sm text-slate-400">Try choosing a different genre filter.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <MediaPreviewModal
        media={selectedMedia}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
