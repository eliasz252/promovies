"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { useProfileStore } from "@/store/useProfileStore";
import MediaCard from "@/components/media/MediaCard";
import MediaPreviewModal from "@/components/media/MediaPreviewModal";
import { MediaItem } from "@/types/tmdb";
import { Bookmark, Film, Tv, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "motion/react";

export default function MyListPage() {
  const { activeProfile } = useProfileStore();
  const { watchlistByProfile, removeFromWatchlist } = useWatchlistStore();
  const [filter, setFilter] = useState<"all" | "movie" | "tv">("all");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profileWatchlist = watchlistByProfile[activeProfile.id] || [];
  const filteredItems = useMemo(() => {
    return profileWatchlist.filter((item) => {
      if (filter === "all") return true;
      return item.media_type === filter;
    });
  }, [profileWatchlist, filter]);

  return (
    <>
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen select-none ${
          isModalOpen ? "pointer-events-none select-none" : ""
        }`}
        aria-hidden={isModalOpen}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Bookmark className="w-8 h-8 text-violet-400" />
              <span>My Watchlist</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Personal watchlist curated for <span className="text-violet-300 font-semibold">{activeProfile.name}</span>.
            </p>
          </div>

          {/* Filter Tabs */}
          {profileWatchlist.length > 0 && (
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  filter === "all" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                All ({profileWatchlist.length})
              </button>
              <button
                onClick={() => setFilter("movie")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  filter === "movie" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => setFilter("tv")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  filter === "tv" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                TV Shows
              </button>
            </div>
          )}
        </div>

        {/* Watchlist Grid */}
        {filteredItems.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            <AnimatePresence>
              {filteredItems.map((media) => (
                <motion.div
                  key={media.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group/item"
                >
                  <MediaCard
                    media={media}
                    onOpenModal={(m) => {
                      setSelectedMedia(m);
                      setIsModalOpen(true);
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty Watchlist State */
          <div className="py-24 flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
              <Bookmark className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your Watchlist is Empty</h2>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Click the <strong className="text-slate-200">+</strong> button on any movie or TV series to add it to {activeProfile.name}&apos;s personal list.
            </p>
            <Link href="/movies">
              <Button variant="primary" size="lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Explore Trending Titles
              </Button>
            </Link>
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
