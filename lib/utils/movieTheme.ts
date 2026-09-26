export interface MovieTheme {
  primary: string;
  bgGradient: string;
  accentColor: string;
  buttonBg: string;
  glowColor: string;
  fogColor: string;
}

export function getMovieTheme(title: string = "", genreIds: number[] = []): MovieTheme {
  const t = title.toLowerCase();

  // Special title-based themes for iconic titles
  if (t.includes("dune")) {
    return {
      primary: "#2b4c48", // Dusty sage green/teal from Dune reference
      bgGradient: "from-[#1a2d2a] via-[#111f1d] to-[#0a1413]",
      accentColor: "#4ade80",
      buttonBg: "bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-blue-500/30",
      glowColor: "rgba(43, 76, 72, 0.5)",
      fogColor: "from-[#1a2d2a]/90 via-[#111f1d]/70 to-[#0a1413]",
    };
  }

  if (t.includes("dark knight") || t.includes("batman") || t.includes("penguin")) {
    return {
      primary: "#1b2533",
      bgGradient: "from-[#131c27] via-[#0d141e] to-[#070b10]",
      accentColor: "#60a5fa",
      buttonBg: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30",
      glowColor: "rgba(30, 58, 95, 0.5)",
      fogColor: "from-[#131c27]/90 via-[#0d141e]/70 to-[#070b10]",
    };
  }

  if (t.includes("spider-man") || t.includes("spiderman") || t.includes("demon slayer") || t.includes("squid game")) {
    return {
      primary: "#3f141b",
      bgGradient: "from-[#2b0f14] via-[#1a080c] to-[#0d0406]",
      accentColor: "#f87171",
      buttonBg: "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30",
      glowColor: "rgba(220, 38, 38, 0.4)",
      fogColor: "from-[#2b0f14]/90 via-[#1a080c]/70 to-[#0d0406]",
    };
  }

  if (t.includes("interstellar") || t.includes("matrix") || t.includes("inception") || t.includes("star wars")) {
    return {
      primary: "#162235",
      bgGradient: "from-[#0f1b2b] via-[#09111b] to-[#04080e]",
      accentColor: "#38bdf8",
      buttonBg: "bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30",
      glowColor: "rgba(56, 189, 248, 0.35)",
      fogColor: "from-[#0f1b2b]/90 via-[#09111b]/70 to-[#04080e]",
    };
  }

  // Genre-based thematic color mapping
  if (genreIds.includes(878) || genreIds.includes(10765)) {
    // Sci-Fi / Cosmic
    return {
      primary: "#233939",
      bgGradient: "from-[#162728] via-[#0e1a1b] to-[#070e0f]",
      accentColor: "#2dd4bf",
      buttonBg: "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/30",
      glowColor: "rgba(45, 212, 191, 0.35)",
      fogColor: "from-[#162728]/90 via-[#0e1a1b]/70 to-[#070e0f]",
    };
  }

  if (genreIds.includes(28) || genreIds.includes(10759)) {
    // Action / Adventure
    return {
      primary: "#331a22",
      bgGradient: "from-[#251218] via-[#170a0f] to-[#0d0508]",
      accentColor: "#fb7185",
      buttonBg: "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30",
      glowColor: "rgba(244, 63, 94, 0.35)",
      fogColor: "from-[#251218]/90 via-[#170a0f]/70 to-[#0d0508]",
    };
  }

  if (genreIds.includes(16)) {
    // Animation
    return {
      primary: "#271c38",
      bgGradient: "from-[#1d142b] via-[#120c1c] to-[#0a0610]",
      accentColor: "#c084fc",
      buttonBg: "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30",
      glowColor: "rgba(168, 85, 247, 0.35)",
      fogColor: "from-[#1d142b]/90 via-[#120c1c]/70 to-[#0a0610]",
    };
  }

  if (genreIds.includes(80) || genreIds.includes(53)) {
    // Crime / Thriller / Mystery
    return {
      primary: "#1a232f",
      bgGradient: "from-[#131b25] via-[#0c1219] to-[#06090d]",
      accentColor: "#94a3b8",
      buttonBg: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30",
      glowColor: "rgba(148, 163, 184, 0.3)",
      fogColor: "from-[#131b25]/90 via-[#0c1219]/70 to-[#06090d]",
    };
  }

  // Default Cinematic Dark Velvet Atmosphere
  return {
    primary: "#1f2430",
    bgGradient: "from-[#171b24] via-[#0e1118] to-[#08090e]",
    accentColor: "#e2e8f0",
    buttonBg: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30",
    glowColor: "rgba(59, 130, 246, 0.3)",
    fogColor: "from-[#171b24]/90 via-[#0e1118]/70 to-[#08090e]",
  };
}
