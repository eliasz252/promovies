"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Search,
  Film,
  Tv,
  Bookmark,
  Menu,
  X,
  Sparkles,
  Globe,
  Sliders,
} from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";
import { POPULAR_GENRES, WORLD_LANGUAGES } from "@/lib/tmdb/categories";

export default function MobileNav() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const tabs = [
    { name: "Home", href: "/", icon: Home },
    { name: "Search", href: "/search", icon: Search },
    { name: "Movies", href: "/movies", icon: Film },
    { name: "TV", href: "/shows", icon: Tv },
    { name: "My List", href: "/my-list", icon: Bookmark },
  ];

  return (
    <>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/85 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-[#14141e] border-l border-white/10 z-50 p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <BrandLogo size="sm" />
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                    aria-label="Close drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Discover</p>
                  <Link
                    href="/anime"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-200 hover:bg-white/5"
                  >
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <span>Anime Discovery</span>
                  </Link>
                  <Link
                    href="/new-and-popular"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-200 hover:bg-white/5"
                  >
                    <Film className="w-4 h-4 text-violet-400" />
                    <span>New & Popular Releases</span>
                  </Link>
                  <Link
                    href="/profiles"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-200 hover:bg-white/5"
                  >
                    <Sliders className="w-4 h-4 text-violet-400" />
                    <span>Manage Profiles</span>
                  </Link>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Popular Genres</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {POPULAR_GENRES.slice(0, 8).map((genre) => (
                      <Link
                        key={genre.slug}
                        href={`/category/${genre.slug}`}
                        onClick={() => setIsDrawerOpen(false)}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 text-xs text-slate-300 hover:text-white hover:bg-violet-600/20 transition-colors"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">World Cinema</p>
                  <div className="flex flex-col gap-1">
                    {WORLD_LANGUAGES.slice(0, 4).map((lang) => (
                      <Link
                        key={lang.slug}
                        href={`/category/${lang.slug}`}
                        onClick={() => setIsDrawerOpen(false)}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-violet-600/20 hover:text-white text-xs text-slate-300 transition-colors"
                      >
                        <span>{lang.name}</span>
                        <span className="text-[10px] uppercase font-mono text-slate-500">{lang.code}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 text-xs text-slate-500">
                ProMovies Web App © 2025
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-3 left-4 right-4 z-40">
        <div className="flex items-center justify-around py-2.5 px-3 rounded-2xl bg-[#14141e] border border-white/10 shadow-2xl shadow-black/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${
                  isActive ? "text-violet-400 font-semibold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px]">{tab.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobileTabIndicator"
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-violet-400"
                  />
                )}
              </Link>
            );
          })}

          {/* More Drawer Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`relative flex flex-col items-center gap-1 p-1 rounded-xl transition-colors cursor-pointer ${
              isDrawerOpen ? "text-violet-400 font-semibold" : "text-slate-400 hover:text-slate-200"
            }`}
            aria-label="More categories and world cinema"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px]">More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
