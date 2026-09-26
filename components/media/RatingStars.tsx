"use client";

import { useState, useRef } from "react";
import { Star } from "lucide-react";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { useProfileStore } from "@/store/useProfileStore";
import { animateRatingStars } from "@/lib/animations/animeUtils";

interface RatingStarsProps {
  mediaId: number;
  initialRating?: number;
}

export default function RatingStars({ mediaId }: RatingStarsProps) {
  const { activeProfile } = useProfileStore();
  const { getUserRating, rateMedia } = useWatchlistStore();

  const userRating = getUserRating(activeProfile.id, mediaId);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRate = (rating: number) => {
    rateMedia(activeProfile.id, mediaId, rating);

    // Animate star bounce using Anime.js
    if (containerRef.current) {
      const stars = Array.from(containerRef.current.querySelectorAll(".rating-star")) as HTMLElement[];
      animateRatingStars(stars);
    }
  };

  const currentDisplay = hoverRating !== null ? hoverRating : userRating;

  return (
    <div className="flex items-center gap-2 select-none">
      <div
        ref={containerRef}
        className="flex items-center gap-1"
        onMouseLeave={() => setHoverRating(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= currentDisplay;
          return (
            <button
              key={star}
              type="button"
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHoverRating(star)}
              className="rating-star p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
              aria-label={`Rate ${star} star`}
            >
              <Star
                className={`w-5 h-5 transition-colors ${
                  isFilled
                    ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                    : "text-slate-600 hover:text-amber-300"
                }`}
              />
            </button>
          );
        })}
      </div>
      <span className="text-xs text-slate-400 font-medium">
        {userRating > 0 ? `Your Rating: ${userRating}/5` : "Rate this"}
      </span>
    </div>
  );
}
