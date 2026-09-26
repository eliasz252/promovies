"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function registerGSAP() {
  if (typeof window !== "undefined" && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
}

export function createHeroIntroTimeline(
  target: HTMLElement | null,
  backdrop: HTMLElement | null,
  title: HTMLElement | null,
  meta: HTMLElement | null,
  buttons: HTMLElement | null,
  prefersReducedMotion = false
): gsap.core.Timeline | null {
  if (!target || typeof window === "undefined") return null;
  registerGSAP();

  if (prefersReducedMotion) {
    // Skip zoom and split effects for users with reduced motion preference
    gsap.set([backdrop, title, meta, buttons], { opacity: 1, y: 0, scale: 1 });
    return null;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Initial state (no filter blur to prevent GPU layout recalculation)
  if (backdrop) gsap.set(backdrop, { scale: 1.05, opacity: 0 });
  if (title) gsap.set(title, { opacity: 0, y: 20 });
  if (meta) gsap.set(meta, { opacity: 0, y: 15 });
  if (buttons) gsap.set(buttons, { opacity: 0, y: 15 });

  // Cinematic sequence
  if (backdrop) {
    tl.to(backdrop, { opacity: 1, duration: 0.8, ease: "power2.inOut" }, 0)
      .to(backdrop, { scale: 1.0, duration: 1.5, ease: "power1.out" }, 0);
  }

  if (title) {
    tl.to(title, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
  }

  if (meta) {
    tl.to(meta, { opacity: 1, y: 0, duration: 0.5 }, 0.4);
  }

  if (buttons) {
    tl.to(buttons, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, 0.5);
  }

  return tl;
}

export function setupHeroParallax(
  backdrop: HTMLElement | null,
  heroContainer: HTMLElement | null
) {
  // Parallax scrubbing on window scroll causes frame drops; kept lightweight
  return null;
}

export function setupRowReveal(rowElement: HTMLElement | null, prefersReducedMotion = false) {
  if (!rowElement || typeof window === "undefined" || prefersReducedMotion) return null;

  rowElement.style.opacity = "0";
  rowElement.style.transform = "translate3d(0, 20px, 0)";
  rowElement.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          rowElement.style.opacity = "1";
          rowElement.style.transform = "translate3d(0, 0, 0)";
          observer.unobserve(rowElement);
        }
      });
    },
    { threshold: 0.05, rootMargin: "100px" }
  );

  observer.observe(rowElement);

  return {
    revert: () => observer.disconnect(),
    kill: () => observer.disconnect(),
  };
}
