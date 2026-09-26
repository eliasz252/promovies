"use client";

import { useState, useRef, useEffect } from "react";
import { Season } from "@/types/tmdb";
import { ChevronDown, Layers } from "lucide-react";

interface SeasonSelectorProps {
  seasons: Season[];
  selectedSeasonNumber: number;
  onSeasonChange: (seasonNumber: number) => void;
  isLoading?: boolean;
}

export default function SeasonSelector({
  seasons,
  selectedSeasonNumber,
  onSeasonChange,
  isLoading = false,
}: SeasonSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentSeason =
    seasons.find((s) => s.season_number === selectedSeasonNumber) ||
    seasons[0];

  const handleSelect = (seasonNum: number) => {
    onSeasonChange(seasonNum);
    setIsOpen(false);
  };

  if (!seasons || seasons.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 w-full">
      {/* Label and Season Summary */}
      <div className="flex items-center gap-2.5 text-xs text-slate-400">
        <Layers className="w-4 h-4 text-violet-400" />
        <span className="font-semibold text-slate-200">
          {currentSeason?.name || `Season ${selectedSeasonNumber}`}
        </span>
        {currentSeason?.episode_count && (
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
            {currentSeason.episode_count} Episodes
          </span>
        )}
      </div>

      {/* Season Selector Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="flex items-center justify-between gap-3 px-4 py-2 sm:py-2.5 rounded-xl bg-[#14141e] hover:bg-[#1c1c2b] border border-white/15 hover:border-violet-500/50 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-lg active:scale-95 disabled:opacity-50"
        >
          <span>
            {currentSeason?.name || `Season ${selectedSeasonNumber}`}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-violet-400" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            role="listbox"
            className="absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl bg-[#14141e] border border-white/15 shadow-2xl z-50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150 no-scrollbar"
          >
            {seasons.map((season) => {
              const isSelected = season.season_number === selectedSeasonNumber;
              return (
                <button
                  key={season.id || season.season_number}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => handleSelect(season.season_number)}
                  className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-violet-600 text-white font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex flex-col truncate pr-2">
                    <span className="truncate">
                      {season.name || `Season ${season.season_number}`}
                    </span>
                    {season.air_date && (
                      <span
                        className={`text-[10px] font-normal ${
                          isSelected ? "text-violet-200" : "text-slate-400"
                        }`}
                      >
                        {season.air_date.slice(0, 4)}
                      </span>
                    )}
                  </div>

                  <span
                    className={`text-[11px] font-mono shrink-0 px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-white/5 text-slate-400"
                    }`}
                  >
                    {season.episode_count || "?"} EP
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
