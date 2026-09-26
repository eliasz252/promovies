import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import { Film, Shield, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b0b0f] border-t border-white/5 pt-16 pb-24 lg:pb-12 mt-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-white/5">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <BrandLogo size="md" />
            <p className="max-w-sm text-slate-400 text-xs leading-relaxed">
              Cinema-grade Movie & TV discovery engine. Browse 4K HDR releases, streaming availability, trailers, and personal watchlists across all your devices.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-violet-600/20 hover:text-violet-400 transition-colors" aria-label="X / Twitter">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-violet-600/20 hover:text-violet-400 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-width-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-violet-600/20 hover:text-violet-400 transition-colors" aria-label="Github">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Discovery */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Discover</h4>
            <Link href="/movies" className="hover:text-white transition-colors">Trending Movies</Link>
            <Link href="/shows" className="hover:text-white transition-colors">Popular TV Series</Link>
            <Link href="/anime" className="hover:text-white transition-colors">Anime Discovery</Link>
            <Link href="/new-and-popular" className="hover:text-white transition-colors">New Releases</Link>
            <Link href="/my-list" className="hover:text-white transition-colors">My Watchlist</Link>
          </div>

          {/* Account & Settings */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Account & Help</h4>
            <Link href="/profiles" className="hover:text-white transition-colors">Manage Profiles</Link>
            <a href="#help" className="hover:text-white transition-colors">Help Center</a>
            <a href="#settings" className="hover:text-white transition-colors">Account Settings</a>
            <a href="#audio" className="hover:text-white transition-colors">Audio & Subtitles</a>
            <a href="#speed" className="hover:text-white transition-colors">Speed Test</a>
          </div>

          {/* Legal & Data */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Legal & Data</h4>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#cookie" className="hover:text-white transition-colors">Cookie Preferences</a>
            <div className="pt-2 flex items-center gap-1.5 text-violet-400 font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span>Certified Streaming Hub</span>
            </div>
          </div>
        </div>

        {/* TMDB Attribution Statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-violet-500 inline fill-violet-500" /> for cinema lovers.
          </p>
          <p className="text-center sm:text-right max-w-md">
            This product uses the TMDB API but is not endorsed or certified by TMDB. Movie and TV data and imagery provided by The Movie Database.
          </p>
        </div>
      </div>
    </footer>
  );
}
