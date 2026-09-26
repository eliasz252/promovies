"use client";

import { useEffect, useRef } from "react";
import { animateSkeletonShimmer } from "@/lib/animations/animeUtils";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "poster" | "backdrop" | "text" | "circle";
}

export function Skeleton({ className, variant = "poster" }: SkeletonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = animateSkeletonShimmer(ref.current);
    return () => {
      if (anim) anim.pause();
    };
  }, []);

  const variants = {
    poster: "aspect-[2/3] w-full rounded-2xl",
    backdrop: "aspect-video w-full rounded-2xl",
    text: "h-4 w-3/4 rounded-md",
    circle: "h-12 w-12 rounded-full",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-white/5",
        variants[variant],
        className
      )}
    />
  );
}

export function MediaCardSkeleton() {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <Skeleton variant="poster" />
      <Skeleton variant="text" className="w-4/5" />
      <Skeleton variant="text" className="w-1/2 h-3" />
    </div>
  );
}
