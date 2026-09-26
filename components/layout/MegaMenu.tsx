"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  POPULAR_GENRES,
  MORE_GENRES,
  WORLD_LANGUAGES,
} from "@/lib/tmdb/categories";
import { Film, Globe, Sparkles, Tv, ChevronRight } from "lucide-react";

// Re-export POPULAR_LANGUAGES for backwards compatibility
export const POPULAR_LANGUAGES = WORLD_LANGUAGES;

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Automatically close dropdown whenever the route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  // Robust outside-click and escape-key handling
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Do nothing if click is inside the MegaMenu dropdown panel
      if (menuRef.current && menuRef.current.contains(target)) {
        return;
      }

      // Do nothing if click is on the trigger button itself (the button toggles its own state)
      if (target.closest('[data-megamenu-trigger="true"]')) {
        return;
      }

      // Otherwise, close the dropdown
      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop covering the viewport to catch outside clicks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 z-50 mx-auto max-w-6xl px-4 pt-3"
            role="dialog"
            aria-label="Categories menu"
          >
            <div className="p-6 rounded-2xl bg-[#14141e] border border-violet-500/30 shadow-2xl shadow-black/90 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm backdrop-blur-xl">
              {/* Genres Column 1: Popular Genres */}
              <div>
                <div className="flex items-center gap-2 text-violet-400 font-bold mb-3 uppercase tracking-wider text-xs">
                  <Film className="w-4 h-4 text-violet-400" />
                  Popular Genres
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {POPULAR_GENRES.map((genre) => (
                    <Link
                      key={genre.slug}
                      href={`/category/${genre.slug}`}
                      onClick={onClose}
                      className="group flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-violet-600/20 hover:border-violet-500/30 border border-transparent transition-all duration-150"
                    >
                      <span className="truncate group-hover:translate-x-0.5 transition-transform duration-150">
                        {genre.name}
                      </span>
                      <ChevronRight className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-violet-400 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Genres Column 2: More Genres & Themes */}
              <div>
                <div className="flex items-center gap-2 text-violet-400 font-bold mb-3 uppercase tracking-wider text-xs">
                  <Tv className="w-4 h-4 text-violet-400" />
                  More Genres & Themes
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {MORE_GENRES.map((genre) => (
                    <Link
                      key={genre.slug}
                      href={`/category/${genre.slug}`}
                      onClick={onClose}
                      className="group flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-violet-600/20 hover:border-violet-500/30 border border-transparent transition-all duration-150"
                    >
                      <span className="truncate group-hover:translate-x-0.5 transition-transform duration-150">
                        {genre.name}
                      </span>
                      <ChevronRight className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-violet-400 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: World Cinema & Languages */}
              <div className="bg-[#0b0b0f]/70 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-violet-400 font-bold mb-3 uppercase tracking-wider text-xs">
                    <Globe className="w-4 h-4 text-violet-400" />
                    World Cinema & Languages
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {WORLD_LANGUAGES.map((lang) => (
                      <Link
                        key={lang.slug}
                        href={`/category/${lang.slug}`}
                        onClick={onClose}
                        className="group px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-violet-600/20 hover:border-violet-500/30 border border-transparent transition-all flex items-center justify-between"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform duration-150 truncate">
                          {lang.name}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 group-hover:bg-violet-600/30 group-hover:text-violet-300 transition-colors">
                          {lang.code}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-violet-300 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" /> 4K Ultra HD Catalogs
                  </span>
                  <Link
                    href="/new-and-popular"
                    onClick={onClose}
                    className="text-violet-400 hover:text-violet-300 hover:underline font-semibold flex items-center gap-1"
                  >
                    All Releases <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
