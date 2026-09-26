import { Genre } from "@/types/tmdb";

export interface CategoryConfig {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  type: "genre" | "language" | "theme";
  genreId?: number;
  genreIds?: number[];
  languageCode?: string;
  badge?: string;
}

// Popular Genres (Column 1 in MegaMenu)
export const POPULAR_GENRES: CategoryConfig[] = [
  {
    slug: "action",
    name: "Action",
    title: "Action Movies & Shows",
    subtitle: "High-octane blockbusters, exhilarating chases, and epic confrontations.",
    type: "genre",
    genreId: 28,
    badge: "Action & Thrills",
  },
  {
    slug: "adventure",
    name: "Adventure",
    title: "Adventure Movies & Shows",
    subtitle: "Epic quests, uncharted worlds, and daring expeditions across time and space.",
    type: "genre",
    genreId: 12,
    badge: "Epic Journeys",
  },
  {
    slug: "animation",
    name: "Animation",
    title: "Animation Movies & Shows",
    subtitle: "Visually stunning features, visionary family adventures, and animated classics.",
    type: "genre",
    genreId: 16,
    badge: "Animation",
  },
  {
    slug: "comedy",
    name: "Comedy",
    title: "Comedy Movies & Shows",
    subtitle: "Laugh-out-loud favorites, witty sitcoms, and feel-good cinematic laughs.",
    type: "genre",
    genreId: 35,
    badge: "Comedy & Fun",
  },
  {
    slug: "crime",
    name: "Crime",
    title: "Crime Movies & Shows",
    subtitle: "Gripping heists, gritty detective cases, and underworld crime drama.",
    type: "genre",
    genreId: 80,
    badge: "Underworld & Noir",
  },
  {
    slug: "documentary",
    name: "Documentary",
    title: "Documentaries & Real Stories",
    subtitle: "Compelling real-world investigations, fascinating nature, and groundbreaking revelations.",
    type: "genre",
    genreId: 99,
    badge: "Real Stories",
  },
  {
    slug: "drama",
    name: "Drama",
    title: "Drama Movies & Shows",
    subtitle: "Profound character-driven narratives, tearjerkers, and critically acclaimed masterworks.",
    type: "genre",
    genreId: 18,
    badge: "Award Winners",
  },
  {
    slug: "family",
    name: "Family",
    title: "Family Movies & Shows",
    subtitle: "Heartwarming entertainment crafted for kids and audiences of all ages.",
    type: "genre",
    genreId: 10751,
    badge: "All Ages",
  },
  {
    slug: "fantasy",
    name: "Fantasy",
    title: "Fantasy Movies & Shows",
    subtitle: "Mythical realms, magical wonders, legendary creatures, and fantastical sagas.",
    type: "genre",
    genreId: 14,
    badge: "Magic & Myth",
  },
  {
    slug: "history",
    name: "History",
    title: "Historical Movies & Shows",
    subtitle: "Epic chronicles, transformative world events, and monumental biographies.",
    type: "genre",
    genreId: 36,
    badge: "Historical Epics",
  },
];

// More Genres & Themes (Column 2 in MegaMenu)
export const MORE_GENRES: CategoryConfig[] = [
  {
    slug: "horror",
    name: "Horror",
    title: "Horror Movies & Shows",
    subtitle: "Bone-chilling terror, paranormal scares, and psychological thrillers.",
    type: "genre",
    genreId: 27,
    badge: "Chills & Thrills",
  },
  {
    slug: "music",
    name: "Music",
    title: "Music & Musical Titles",
    subtitle: "Electrifying concert performances, musical masterpieces, and artist stories.",
    type: "genre",
    genreId: 10402,
    badge: "Rhythm & Sound",
  },
  {
    slug: "mystery",
    name: "Mystery",
    title: "Mystery Movies & Shows",
    subtitle: "Intricate whodunits, uncrackable conspiracies, and shocking plot twists.",
    type: "genre",
    genreId: 9648,
    badge: "Puzzles & Noir",
  },
  {
    slug: "romance",
    name: "Romance",
    title: "Romance Movies & Shows",
    subtitle: "Passionate love stories, heartwarming romantic comedies, and heartfelt drama.",
    type: "genre",
    genreId: 10749,
    badge: "Love & Passion",
  },
  {
    slug: "sci-fi",
    name: "Sci-Fi",
    title: "Sci-Fi Movies & Shows",
    subtitle: "Dystopian futures, interstellar expeditions, alien encounters, and high tech.",
    type: "genre",
    genreId: 878,
    badge: "Future & Sci-Fi",
  },
  {
    slug: "thriller",
    name: "Thriller",
    title: "Thriller Movies & Shows",
    subtitle: "Edge-of-your-seat suspense, gripping tension, and high-stakes survival.",
    type: "genre",
    genreId: 53,
    badge: "High Suspense",
  },
  {
    slug: "war",
    name: "War",
    title: "War & Military Movies",
    subtitle: "Frontline courage, battlefield brotherhood, and profound war sagas.",
    type: "genre",
    genreId: 10752,
    badge: "Frontline",
  },
  {
    slug: "western",
    name: "Western",
    title: "Western Movies & Shows",
    subtitle: "Wild frontier showdowns, legendary outlaws, and rugged western landscapes.",
    type: "genre",
    genreId: 37,
    badge: "Wild West",
  },
  {
    slug: "action-adventure",
    name: "Action & Adventure",
    title: "Action & Adventure",
    subtitle: "Non-stop thrill rides, heroic battles, and globetrotting missions.",
    type: "genre",
    genreId: 10759,
    genreIds: [28, 12, 10759],
    badge: "Blockbuster Action",
  },
  {
    slug: "sci-fi-fantasy",
    name: "Sci-Fi & Fantasy",
    title: "Sci-Fi & Fantasy",
    subtitle: "Cosmic worlds, superhuman sagas, and visionary alternate realities.",
    type: "genre",
    genreId: 10765,
    genreIds: [878, 14, 10765],
    badge: "Cosmic Realms",
  },
];

// World Cinema & Languages (Column 3 in MegaMenu)
export const WORLD_LANGUAGES: (CategoryConfig & { code: string })[] = [
  {
    slug: "korean",
    code: "ko",
    name: "Korean (K-Drama & Film)",
    title: "Korean Movies & K-Drama",
    subtitle: "Acclaimed South Korean cinema, blockbuster thrillers, and viral K-dramas with original audio.",
    type: "language",
    languageCode: "ko",
    badge: "K-Cinema & Drama",
  },
  {
    slug: "japanese",
    code: "ja",
    name: "Japanese (Anime & Cinema)",
    title: "Japanese Cinema & Anime",
    subtitle: "Celebrated Japanese anime masterworks, samurai epics, and visionary contemporary cinema.",
    type: "language",
    languageCode: "ja",
    badge: "Anime & Japanese Cinema",
  },
  {
    slug: "spanish",
    code: "es",
    name: "Spanish (Cine Latino)",
    title: "Spanish Cinema (Cine Latino)",
    subtitle: "Award-winning Hispanic films, riveting thrillers, and acclaimed Spanish language hits.",
    type: "language",
    languageCode: "es",
    badge: "Cine en Español",
  },
  {
    slug: "french",
    code: "fr",
    name: "French (Cinema Français)",
    title: "French Cinema (Cinéma Français)",
    subtitle: "Chic Cannes selections, brilliant French comedies, and acclaimed arthouse cinema.",
    type: "language",
    languageCode: "fr",
    badge: "Cinéma Français",
  },
  {
    slug: "hindi",
    code: "hi",
    name: "Hindi (Bollywood)",
    title: "Hindi & Bollywood Cinema",
    subtitle: "Electrifying Bollywood blockbusters, musical sagas, and gripping Hindi dramas.",
    type: "language",
    languageCode: "hi",
    badge: "Bollywood & Desi",
  },
  {
    slug: "german",
    code: "de",
    name: "German",
    title: "German Cinema & Series",
    subtitle: "Tense European mysteries, historical sagas, and visionary German storytelling.",
    type: "language",
    languageCode: "de",
    badge: "Deutsches Kino",
  },
  {
    slug: "italian",
    code: "it",
    name: "Italian",
    title: "Italian Cinema",
    subtitle: "Masterpieces of Italian storytelling, romance, and acclaimed Mediterranean cinema.",
    type: "language",
    languageCode: "it",
    badge: "Cinema Italiano",
  },
];

// Comprehensive lookup dictionary including aliases
const CATEGORY_MAP: Record<string, CategoryConfig> = {};

// Register all main categories
[...POPULAR_GENRES, ...MORE_GENRES, ...WORLD_LANGUAGES].forEach((cat) => {
  CATEGORY_MAP[cat.slug.toLowerCase()] = cat;
  if (cat.genreId) {
    CATEGORY_MAP[String(cat.genreId)] = cat;
  }
  if (cat.languageCode) {
    CATEGORY_MAP[cat.languageCode.toLowerCase()] = cat;
  }
});

// Common Aliases
CATEGORY_MAP["scifi"] = CATEGORY_MAP["sci-fi"];
CATEGORY_MAP["kdrama"] = CATEGORY_MAP["korean"];
CATEGORY_MAP["k-drama"] = CATEGORY_MAP["korean"];
CATEGORY_MAP["bollywood"] = CATEGORY_MAP["hindi"];
CATEGORY_MAP["anime"] = {
  slug: "anime",
  name: "Anime",
  title: "Anime & Japanese Animation",
  subtitle: "Top-rated shonen sagas, studio Ghibli classics, and vibrant anime masterworks.",
  type: "genre",
  genreId: 16,
  languageCode: "ja",
  badge: "Anime Collection",
};

/**
 * Resolves a URL slug (e.g. "action", "horror", "korean", "28", "ko")
 * into a full category configuration.
 */
export function getCategoryBySlug(rawSlug: string): CategoryConfig {
  const normalized = (rawSlug || "").toLowerCase().trim();

  if (CATEGORY_MAP[normalized]) {
    return CATEGORY_MAP[normalized];
  }

  // Check if matches genre ID
  const num = parseInt(normalized, 10);
  if (!isNaN(num) && CATEGORY_MAP[String(num)]) {
    return CATEGORY_MAP[String(num)];
  }

  // Graceful fallback for custom or unmapped slugs
  const formattedName = normalized
    .replace(/[-_]+/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    slug: normalized,
    name: formattedName || "Category",
    title: `${formattedName || "Category"} Titles`,
    subtitle: `Explore curated movies and shows in ${formattedName || "this category"}.`,
    type: "genre",
    badge: "Curated Catalog",
  };
}
