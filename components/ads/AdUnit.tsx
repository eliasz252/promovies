"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

// ─── Adsterra Social Bar (sticky, auto) ──────────────────────────────────────
// Renders a sticky social bar ad that floats at the edge of the screen.
// Place once in layout — shows on every page for maximum impressions.
export function AdSocialBar1() {
  return (
    <Script
      id="adsterra-social-bar-1"
      src="https://pl31536836.profitableratecpmnetwork.com/75/cb/2e/75cb2e758fbda561d370c986e9440b7f.js"
      strategy="afterInteractive"
    />
  );
}

export function AdSocialBar2() {
  return (
    <Script
      id="adsterra-social-bar-2"
      src="https://pl31536838.profitableratecpmnetwork.com/0e/fe/9a/0efe9ae655e78e4154118e1c8fd7226a.js"
      strategy="afterInteractive"
    />
  );
}

// ─── Adsterra Native Banner (container) ──────────────────────────────────────
// Native/display ad rendered inside a container div.
// Best between content carousels for high visibility.
export function AdNativeBanner() {
  return (
    <div className="w-full flex justify-center my-2" aria-hidden="true">
      <Script
        id="adsterra-native-1"
        data-cfasync="false"
        async
        src="https://pl31536837.profitableratecpmnetwork.com/381fbcc4c6a23c4dcba746867f8110ef/invoke.js"
        strategy="afterInteractive"
      />
      <div id="container-381fbcc4c6a23c4dcba746867f8110ef" />
    </div>
  );
}

// ─── Adsterra 320×50 Leaderboard Banner ──────────────────────────────────────
// Classic mobile leaderboard banner. High CTR between sections.
export function AdBanner320x50() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // @ts-expect-error – Adsterra global
    window.atOptions = {
      key: "969e804934b84107fd60a3aac011b764",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    };

    const s = document.createElement("script");
    s.src = "https://www.highrevenueformat.com/969e804934b84107fd60a3aac011b764/invoke.js";
    s.async = true;
    document.getElementById("ad-slot-320x50")?.appendChild(s);
  }, []);

  return (
    <div
      className="flex justify-center items-center w-full py-2"
      aria-hidden="true"
      style={{ minHeight: 58 }}
    >
      <div id="ad-slot-320x50" style={{ width: 320, height: 50 }} />
    </div>
  );
}

// ─── Adsterra 300×250 Rectangle Banner ───────────────────────────────────────
// The 300×250 "medium rectangle" is the highest-earning display format globally.
// Place mid-page between carousels for best RPM.
export function AdBanner300x250() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // @ts-expect-error – Adsterra global
    window.atOptions = {
      key: "78b4fd7453c006e6e5a18266ba31d3e0",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };

    const s = document.createElement("script");
    s.src = "https://www.highrevenueformat.com/78b4fd7453c006e6e5a18266ba31d3e0/invoke.js";
    s.async = true;
    document.getElementById("ad-slot-300x250")?.appendChild(s);
  }, []);

  return (
    <div
      className="flex justify-center items-center w-full py-4"
      aria-hidden="true"
      style={{ minHeight: 258 }}
    >
      <div id="ad-slot-300x250" style={{ width: 300, height: 250 }} />
    </div>
  );
}
