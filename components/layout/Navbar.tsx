"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import BrandLogo from "@/components/ui/BrandLogo";
import MegaMenu from "./MegaMenu";
import { useProfileStore } from "@/store/useProfileStore";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  X,
  Clock,
  Film,
} from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "TV Shows", href: "/shows" },
  { name: "Anime", href: "/anime" },
  { name: "New & Popular", href: "/new-and-popular" },
  { name: "My List", href: "/my-list" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { activeProfile, profiles, setActiveProfile } = useProfileStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Dynamic navbar scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close all open dropdowns whenever navigation occurs
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsProfileMenuOpen(false);
    setIsNotifOpen(false);
  }, [pathname]);

  // Keyboard shortcut '/' to trigger search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isSearchOpen && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      } else if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMegaMenuOpen(false);
        setIsProfileMenuOpen(false);
        setIsNotifOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-nav py-3.5 shadow-xl shadow-black/40"
            : "bg-gradient-to-b from-[#0b0b0f]/90 via-[#0b0b0f]/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Navigation */}
          <div className="flex items-center gap-8">
            <BrandLogo size="md" />

            <nav className="hidden lg:flex items-center gap-1.5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "text-white" : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavUnderline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Categories MegaMenu trigger */}
              <button
                data-megamenu-trigger="true"
                aria-expanded={isMegaMenuOpen}
                aria-label="Toggle categories menu"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isMegaMenuOpen ? "text-violet-400 bg-violet-600/10" : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                Categories
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMegaMenuOpen ? "rotate-180 text-violet-400" : ""
                  }`}
                />
              </button>
            </nav>
          </div>

          {/* Right: Search, Notifications, Profile */}
          <div className="flex items-center gap-3">
            {/* Expandable Search Bar */}
            <div className="relative">
              <AnimatePresence initial={false}>
                {isSearchOpen ? (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 260, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    onSubmit={handleSearchSubmit}
                    className="flex items-center overflow-hidden rounded-full bg-[#14141e] border border-violet-500/40 px-3 py-1.5 shadow-lg"
                  >
                    <Search className="w-4 h-4 text-violet-400 shrink-0 mr-2" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Titles, people, genres..."
                      className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="text-slate-400 hover:text-white p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <button
                    onClick={() => {
                      setIsSearchOpen(true);
                      setTimeout(() => searchInputRef.current?.focus(), 100);
                    }}
                    className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Search"
                    title="Search (Press /)"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-[#0b0b0f]" />
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-3 w-80 p-4 rounded-2xl bg-[#14141e] border border-white/10 shadow-2xl z-50 text-xs"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 font-semibold text-white">
                        <span>Notifications</span>
                        <span className="text-[10px] text-violet-400">2 New</span>
                      </div>
                      <div className="mt-3 flex flex-col gap-3">
                        <div className="flex items-start gap-3 p-2 rounded-xl bg-violet-600/10 border border-violet-500/20">
                          <Film className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-white">Arcane Season 2 Episodes</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">Now streaming in 4K UHD with Dolby Atmos.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-2 rounded-xl bg-white/5">
                          <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-white">Resume Watching</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">Dune: Part Two (42% completed)</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Avatar & Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                suppressHydrationWarning
                className="flex items-center gap-2 p-1 pl-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                aria-label="Profile menu"
              >
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-violet-500/50">
                  <Image
                    src={activeProfile.avatar}
                    alt={activeProfile.name}
                    fill
                    className="object-cover"
                    sizes="28px"
                  />
                </div>
                <span suppressHydrationWarning className="hidden sm:inline text-xs font-semibold text-slate-200">
                  {activeProfile.name}
                </span>
                {activeProfile.isKids && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    KIDS
                  </span>
                )}
                <ChevronDown className="w-3 h-3 text-slate-400 mr-1" />
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-3 w-60 p-3 rounded-2xl bg-[#14141e] border border-violet-500/20 shadow-2xl shadow-black/90 z-50 text-xs"
                    >
                      <div className="pb-2.5 mb-2.5 border-b border-white/10">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Switch Profile</p>
                        <div className="mt-2 flex flex-col gap-1">
                          {profiles.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => {
                                setActiveProfile(p.id);
                                setIsProfileMenuOpen(false);
                              }}
                              className={`flex items-center gap-2.5 w-full p-2 rounded-xl transition-colors ${
                                p.id === activeProfile.id
                                  ? "bg-violet-600/20 border border-violet-500/30 text-white font-medium"
                                  : "text-slate-300 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                                <Image src={p.avatar} alt={p.name} fill className="object-cover" sizes="24px" />
                              </div>
                              <span className="truncate">{p.name}</span>
                              {p.isKids && (
                                <span className="ml-auto text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300">
                                  Kids
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 text-slate-300">
                        <Link
                          href="/profiles"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
                        >
                          <User className="w-4 h-4 text-violet-400" />
                          <span>Manage Profiles</span>
                        </Link>
                        <Link
                          href="/my-list"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
                        >
                          <SlidersHorizontal className="w-4 h-4 text-violet-400" />
                          <span>My Watchlist</span>
                        </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MegaMenu Dropdown */}
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </header>
    </>
  );
}
