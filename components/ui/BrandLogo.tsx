"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animateLogoPath } from "@/lib/animations/animeUtils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
}

export default function BrandLogo({ size = "md", clickable = true }: BrandLogoProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      animateLogoPath(pathRef.current);
    }
  }, []);

  const dimensions = {
    sm: { icon: 24, text: "text-lg", dot: "h-1.5 w-1.5" },
    md: { icon: 32, text: "text-2xl", dot: "h-2 w-2" },
    lg: { icon: 44, text: "text-4xl", dot: "h-2.5 w-2.5" },
  }[size];

  const content = (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      {/* Dynamic Animated Vector Logo */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full shadow-lg shadow-violet-600/30 group-hover:shadow-violet-500/50 transition-all duration-300" />
        <svg
          width={dimensions.icon}
          height={dimensions.icon}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-300 group-hover:scale-105"
        >
          {/* Shutter Hexagon Frame */}
          <path
            ref={pathRef}
            d="M20 4L34 12V28L20 36L6 28V12L20 4Z"
            stroke="url(#violetGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Shutter Diagonals */}
          <path d="M20 4L27 20" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M34 12L20 25" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M34 28L15 22" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M20 36L13 20" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M6 28L20 15" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M6 12L25 18" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          {/* Center Cinematic Shutter Dot */}
          <circle cx="20" cy="20" r="3.5" fill="#8b5cf6" />

          <defs>
            <linearGradient id="violetGradient" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c084fc" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className={`font-black tracking-tight leading-none ${dimensions.text}`}>
        <span className="text-white">PRO</span>
        <span className="text-gradient-violet ml-0.5">MOVIES</span>
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link href="/" aria-label="ProMovies Home">
        {content}
      </Link>
    );
  }

  return content;
}
