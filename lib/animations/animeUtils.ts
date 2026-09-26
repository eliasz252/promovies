"use client";

import { animate } from "animejs";

/**
 * 3D Card Hover Tilt micro-interaction
 */
export function animateCardTilt(
  element: HTMLElement | null,
  rotateX: number,
  rotateY: number,
  scale = 1.04
) {
  if (!element || typeof window === "undefined") return;

  animate(element, {
    rotateX,
    rotateY,
    scale,
    duration: 250,
    ease: "outQuad",
  });
}

export function resetCardTilt(element: HTMLElement | null) {
  if (!element || typeof window === "undefined") return;

  animate(element, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 350,
    ease: "outQuad",
  });
}

/**
 * Top 10 Animated Numeral (Stroke Drawing)
 */
export function animateTop10Numeral(
  pathElement: SVGPathElement | null,
  numberValue: number,
  prefersReducedMotion = false
) {
  if (!pathElement || typeof window === "undefined") return;

  if (prefersReducedMotion) {
    pathElement.style.strokeDashoffset = "0";
    return;
  }

  const length = 300;
  pathElement.style.strokeDasharray = `${length}`;
  pathElement.style.strokeDashoffset = `${length}`;

  animate(pathElement, {
    strokeDashoffset: [length, 0],
    duration: 1000,
    delay: Math.min((numberValue - 1) * 60, 400),
    ease: "outSine",
  });
}

/**
 * Star fill rating animation
 */
export function animateRatingStars(starElements: HTMLElement[]) {
  if (!starElements.length || typeof window === "undefined") return;

  starElements.forEach((star, idx) => {
    animate(star, {
      scale: [1, 1.35, 1],
      duration: 300,
      delay: idx * 45,
      ease: "outBack",
    });
  });
}

/**
 * Add to My List Button Pop & Morph
 */
export function animateButtonBounce(
  element: HTMLElement | null,
  isChecked: boolean
) {
  if (!element || typeof window === "undefined") return;

  animate(element, {
    scale: [1, 1.4, 1],
    rotate: isChecked ? [0, -30, 0] : [0, 30, 0],
    duration: 350,
    ease: "outBack",
  });
}

/**
 * Shimmer pulse for loading skeleton
 */
export function animateSkeletonShimmer(skeletonElement: HTMLElement | null) {
  if (!skeletonElement || typeof window === "undefined") return;

  return animate(skeletonElement, {
    opacity: [0.35, 0.75, 0.35],
    duration: 1500,
    loop: true,
    ease: "inOutSine",
  });
}

/**
 * Animated ProMovies Brand Logo SVG Path
 */
export function animateLogoPath(logoPathElement: SVGPathElement | null) {
  if (!logoPathElement || typeof window === "undefined") return;

  const length = 200;
  logoPathElement.style.strokeDasharray = `${length}`;
  logoPathElement.style.strokeDashoffset = `${length}`;

  animate(logoPathElement, {
    strokeDashoffset: [length, 0],
    duration: 1000,
    ease: "outQuad",
  });
}
