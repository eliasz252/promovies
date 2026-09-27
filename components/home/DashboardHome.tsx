"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MediaItem } from "@/types/tmdb";
import { getTMDBImageUrl } from "@/lib/tmdb/client";
import { useProfileStore } from "@/store/useProfileStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import {
  recordMovieStarted,
  getContinueWatchingList,
  formatMinutesLeft,
  ContinueWatchingRecord,
  CONTINUE_WATCHING_MEDIA_MAP,
} from "@/lib/utils/continueWatching";
import {
  Home as HomeIcon,
  Heart,
  Download,
  User,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Flame,
  MoreHorizontal,
  Bookmark,
  Check,
  Film,
  Sparkles,
  Compass,
  Tv,
} from "lucide-react";

interface DashboardHomeProps {
  onOpenModal: (media: MediaItem) => void;
  allMedia: MediaItem[];
  children?: React.ReactNode;
}

// Curated New & Upcoming Blockbusters for Hero
const HERO_ITEMS: MediaItem[] = [
  {
    id: 875828,
    title: "Peaky Blinders: The Immortal Man",
    overview:
      "After his estranged son gets embroiled in a rising Nazi plot on English soil, self-exiled gangster Tommy Shelby returns to Birmingham to face his past and fight for his family's survival.",
    poster_path: "/gRMalasZEzsZi4w2VFuYusfSfqf.jpg",
    backdrop_path: "/1fkuBPid72KGS6WmtkEXMftZtkE.jpg",
    media_type: "movie",
    genre_ids: [80, 18, 53],
    genres: [
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
      { id: 53, name: "Thriller" },
    ],
    vote_average: 7.2,
    vote_count: 1450,
    popularity: 2800.0,
    release_date: "2026-03-05",
    runtime: 128,
    videos: {
      results: [
        { id: "v_peaky26", key: "73_1biulkYk", name: "Official Teaser", site: "YouTube", type: "Trailer", official: true },
      ],
    },
  },
  {
    id: 1202033,
    title: "Enola Holmes 3",
    overview:
      "Adventure follows detective Enola Holmes to Malta, where her plans to tie the knot unravel when Sherlock's disappearance plunges her into a perilous web of high-stakes international espionage.",
    poster_path: "/7kRYHH9H9PjBFwz1FprbHB2AAjI.jpg",
    backdrop_path: "/jLuGZc84MvPYCQomQg9DI72mstt.jpg",
    media_type: "movie",
    genre_ids: [12, 80, 9648],
    genres: [
      { id: 12, name: "Adventure" },
      { id: 80, name: "Crime" },
      { id: 9648, name: "Mystery" },
    ],
    vote_average: 6.7,
    vote_count: 686,
    popularity: 2200.0,
    release_date: "2026-06-30",
    runtime: 109,
    videos: {
      results: [
        { id: "v_enola3", key: "1d0Zf9sXlHk", name: "Official Teaser", site: "YouTube", type: "Trailer", official: true },
      ],
    },
  },
  {
    id: 1284041,
    title: "The Last House",
    overview:
      "A family suddenly sealed inside their home must work together to survive against dwindling resources and the terrifying, unseen anomaly keeping them trapped inside.",
    poster_path: "/6JU7E8Vv2M11egkctWVOScxWR75.jpg",
    backdrop_path: "/1RhfevWmWCVHtEqxWBEjPOC5KG1.jpg",
    media_type: "movie",
    genre_ids: [27, 878, 53],
    genres: [
      { id: 27, name: "Horror" },
      { id: 878, name: "Sci-Fi" },
      { id: 53, name: "Thriller" },
    ],
    vote_average: 6.9,
    vote_count: 1376,
    popularity: 2400.0,
    release_date: "2026-08-06",
    runtime: 110,
    videos: {
      results: [
        { id: "v_lasthouse", key: "73_1biulkYk", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true },
      ],
    },
  },
  {
    id: 969681,
    title: "Spider-Man: Brand New Day",
    overview:
      "Stripped of his identity and separated from everyone he loved, Peter Parker navigates the shadows of New York as a street-level vigilante, confronting a shadowy criminal syndicate threatening the city.",
    poster_path: "/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
    backdrop_path: "/jenQoCLJ4FEfFGZS13op91jlxjy.jpg",
    media_type: "movie",
    genre_ids: [28, 12, 878],
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Sci-Fi" },
    ],
    vote_average: 7.9,
    vote_count: 4890,
    popularity: 3510.4,
    release_date: "2026-07-24",
    runtime: 135,
    videos: {
      results: [
        { id: "v_spider26", key: "73_1biulkYk", name: "Official Teaser", site: "YouTube", type: "Trailer", official: true },
      ],
    },
  },
];

// Left sidebar: New & Upcoming Trailers
const NEW_TRAILERS = [
  {
    id: 1284041,
    title: "The Last House",
    backdrop: "/1RhfevWmWCVHtEqxWBEjPOC5KG1.jpg",
    type: "New 2026 • Sci-Fi / Horror",
    trailerKey: "73_1biulkYk",
  },
  {
    id: 1202033,
    title: "Enola Holmes 3",
    backdrop: "/jLuGZc84MvPYCQomQg9DI72mstt.jpg",
    type: "Upcoming 2026 • Mystery",
    trailerKey: "1d0Zf9sXlHk",
  },
  {
    id: 875828,
    title: "Peaky Blinders: The Immortal Man",
    backdrop: "/1fkuBPid72KGS6WmtkEXMftZtkE.jpg",
    type: "New 2026 • Crime / Drama",
    trailerKey: "73_1biulkYk",
  },
  {
    id: 533533,
    title: "TRON: Ares",
    backdrop: "/pUNfHmVqfwRdILhCkU8TdysVOXo.jpg",
    type: "Upcoming 2025 • Cyberpunk Sci-Fi",
    trailerKey: "73_1biulkYk",
  },
];

// (CONTINUE_ITEMS removed — sidebar now uses real localStorage watch history)

interface FeaturedCard {
  id: number;
  title: string;
  category: string;
  categoryBg: string;
  poster: string;
  overview: string;
  media_type: "movie" | "tv";
  vote_average: number;
}

// 4 Full Featured Cards per category spotlighting New & Upcoming blockbusters
const CATEGORY_FEATURED_CARDS: Record<string, FeaturedCard[]> = {
  all: [
    {
      id: 1284041,
      title: "The Last House",
      category: "New 2026",
      categoryBg: "bg-red-500/20 text-red-300 border-red-500/30",
      poster: "/6JU7E8Vv2M11egkctWVOScxWR75.jpg",
      overview: "A family suddenly sealed inside their home must survive against dwindling resources and an ominous threat.",
      media_type: "movie",
      vote_average: 6.9,
    },
    {
      id: 1202033,
      title: "Enola Holmes 3",
      category: "New 2026",
      categoryBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      poster: "/7kRYHH9H9PjBFwz1FprbHB2AAjI.jpg",
      overview: "Detective Enola Holmes heads to Malta, unraveling a high-stakes case tied to Sherlock's disappearance.",
      media_type: "movie",
      vote_average: 6.7,
    },
    {
      id: 1318447,
      title: "Apex",
      category: "New 2026",
      categoryBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      poster: "/eTp7gSPkSF3Aw79mNx1NkBP1PZT.jpg",
      overview: "A grieving woman on a solo adventure in the Australian wilderness turns the tables on a ruthless hunter.",
      media_type: "movie",
      vote_average: 6.9,
    },
    {
      id: 875828,
      title: "Peaky Blinders: Immortal Man",
      category: "New 2026",
      categoryBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      poster: "/gRMalasZEzsZi4w2VFuYusfSfqf.jpg",
      overview: "Tommy Shelby returns to Birmingham to face his past and shield his son from a rising Nazi threat.",
      media_type: "movie",
      vote_average: 7.2,
    },
  ],
  movies: [
    {
      id: 1284041,
      title: "The Last House",
      category: "New 2026",
      categoryBg: "bg-red-500/20 text-red-300 border-red-500/30",
      poster: "/6JU7E8Vv2M11egkctWVOScxWR75.jpg",
      overview: "A family suddenly sealed inside their home must survive against dwindling resources and an ominous threat.",
      media_type: "movie",
      vote_average: 6.9,
    },
    {
      id: 1202033,
      title: "Enola Holmes 3",
      category: "New 2026",
      categoryBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      poster: "/7kRYHH9H9PjBFwz1FprbHB2AAjI.jpg",
      overview: "Detective Enola Holmes heads to Malta, unraveling a high-stakes case tied to Sherlock's disappearance.",
      media_type: "movie",
      vote_average: 6.7,
    },
    {
      id: 812583,
      title: "Wake Up Dead Man",
      category: "New 2025",
      categoryBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      poster: "/iV9LM8aUb83BjCCx2RUnKE5sSQg.jpg",
      overview: "Benoit Blanc unravels his most perplexing mystery yet when secrets unravel in a secretive parish.",
      media_type: "movie",
      vote_average: 7.2,
    },
    {
      id: 533533,
      title: "TRON: Ares",
      category: "New 2025",
      categoryBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      poster: "/chpWmskl3aKm1aTZqUHRCtviwPy.jpg",
      overview: "A sophisticated program named Ares is dispatched on a dangerous cross-dimensional assignment into humanity's world.",
      media_type: "movie",
      vote_average: 6.5,
    },
  ],
  tv: [
    {
      id: 500,
      title: "The Penguin",
      category: "New 2024",
      categoryBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      poster: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      overview: "Oz Cobb fights for control of Gotham's criminal underworld in the wake of the city's flood.",
      media_type: "tv",
      vote_average: 8.7,
    },
    {
      id: 1423191,
      title: "Resident Evil",
      category: "Upcoming 2026",
      categoryBg: "bg-red-500/20 text-red-300 border-red-500/30",
      poster: "/qku2uWSoJ9amQV5MWo1Eek29iji.jpg",
      overview: "Medical courier Bryan fights for survival as one fateful night collapses around him in chaos.",
      media_type: "tv",
      vote_average: 7.4,
    },
    {
      id: 1294819,
      title: "The End of Oak Street",
      category: "Upcoming 2026",
      categoryBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      poster: "/fYXqpgPmHMphSF2W30GbTeJVIa5.jpg",
      overview: "When a bizarre atmospheric anomaly descends on a neighborhood, residents must confront secrets.",
      media_type: "tv",
      vote_average: 7.0,
    },
    {
      id: 948713,
      title: "The Last Kingdom",
      category: "New 2024",
      categoryBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      poster: "/kEhCztSTP4ixu7R0AIWg8vvcvbb.jpg",
      overview: "As rival kings fight for the crown, Uhtred of Bebbanburg must choose the fate of a united England.",
      media_type: "tv",
      vote_average: 8.3,
    },
  ],
  animation: [
    {
      id: 10859,
      title: "The Wild Robot",
      category: "New 2024",
      categoryBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      poster: "/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
      overview: "Shipwrecked on an uninhabited island, an intelligent robot bonds with animals and raises a gosling.",
      media_type: "movie",
      vote_average: 8.4,
    },
    {
      id: 54695,
      title: "Moana 2",
      category: "New 2024",
      categoryBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      poster: "/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg",
      overview: "Moana journeys to the far seas of Oceania after receiving an unexpected call from her ancestors.",
      media_type: "movie",
      vote_average: 7.2,
    },
    {
      id: 2075056,
      title: "Sonic the Hedgehog 3",
      category: "New 2024",
      categoryBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      poster: "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
      overview: "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, with unprecedented powers.",
      media_type: "movie",
      vote_average: 7.8,
    },
    {
      id: 757860,
      title: "Coyote vs. Acme",
      category: "Upcoming 2026",
      categoryBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      poster: "/AbQYEHieBJsMheLFKM02rFu0xnc.jpg",
      overview: "Wile E. Coyote takes the ACME corporation to court after their defective inventions backfire.",
      media_type: "movie",
      vote_average: 7.6,
    },
  ],
  mystery: [
    {
      id: 1294819,
      title: "The End of Oak Street",
      category: "Upcoming 2026",
      categoryBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      poster: "/fYXqpgPmHMphSF2W30GbTeJVIa5.jpg",
      overview: "When a bizarre anomaly descends on a suburban neighborhood, residents must confront secrets.",
      media_type: "movie",
      vote_average: 7.0,
    },
    {
      id: 41042,
      title: "Alien: Romulus",
      category: "New 2024",
      categoryBg: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      poster: "/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
      overview: "While scavenging a derelict space station, young space colonizers encounter terrifying xenomorphs.",
      media_type: "movie",
      vote_average: 7.3,
    },
    {
      id: 1586047,
      title: "The Substance",
      category: "New 2024",
      categoryBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      poster: "/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
      overview: "A fading celebrity uses a black market cellular drug that temporarily creates a younger version of herself.",
      media_type: "movie",
      vote_average: 7.5,
    },
    {
      id: 1423191,
      title: "Resident Evil",
      category: "Upcoming 2026",
      categoryBg: "bg-red-500/20 text-red-300 border-red-500/30",
      poster: "/qku2uWSoJ9amQV5MWo1Eek29iji.jpg",
      overview: "Medical courier Bryan unwittingly finds himself fighting for survival as chaos breaks out.",
      media_type: "movie",
      vote_average: 7.4,
    },
  ],
  scifi: [
    {
      id: 969681,
      title: "Spider-Man: Brand New Day",
      category: "Upcoming 2026",
      categoryBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      poster: "/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
      overview: "Peter Parker navigates New York as a street-level vigilante against a multiversal threat.",
      media_type: "movie",
      vote_average: 7.9,
    },
    {
      id: 1373737,
      title: "Superman",
      category: "Upcoming 2025",
      categoryBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      poster: "/cgXk2tNYhJZLXdBDO5DidAVzQ82.jpg",
      overview: "Superman reconciles his alien heritage with his human upbringing, guiding a cynical world with kindness.",
      media_type: "movie",
      vote_average: 8.2,
    },
    {
      id: 1397779,
      title: "Avatar: Fire and Ash",
      category: "Upcoming 2025",
      categoryBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      poster: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
      overview: "Jake Sully and Neytiri encounter the Ash People, a fiery and aggressive Na'vi tribe on Pandora.",
      media_type: "movie",
      vote_average: 8.5,
    },
    {
      id: 17419,
      title: "Captain America: Brave New World",
      category: "Upcoming 2025",
      categoryBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      poster: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
      overview: "Sam Wilson finds himself in the middle of an international incident involving the U.S. presidency.",
      media_type: "movie",
      vote_average: 7.7,
    },
  ],
  more: [
    {
      id: 65731,
      title: "Mission: Impossible - The Final Reckoning",
      category: "Upcoming 2025",
      categoryBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      poster: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      overview: "Ethan Hunt and his IMF team face their greatest threat in the definitive high-stakes conclusion.",
      media_type: "movie",
      vote_average: 8.3,
    },
    {
      id: 1267329,
      title: "Wicked",
      category: "New 2024",
      categoryBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      poster: "/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg",
      overview: "Elphaba and Glinda meet as students in Oz and forge an unlikely friendship that transforms Oz.",
      media_type: "movie",
      vote_average: 7.6,
    },
    {
      id: 533535,
      title: "Deadpool & Wolverine",
      category: "New 2024",
      categoryBg: "bg-red-500/20 text-red-300 border-red-500/30",
      poster: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
      overview: "Wade Wilson and Logan team up in the most action-packed adventure in MCU history.",
      media_type: "movie",
      vote_average: 7.8,
    },
    {
      id: 558449,
      title: "Gladiator II",
      category: "New 2024",
      categoryBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      poster: "/b5UXjzW5cLZhprMnlAmsVAA3G4t.jpg",
      overview: "Lucius enters the Colosseum to challenge Rome's corrupt rulers and avenge his heritage.",
      media_type: "movie",
      vote_average: 8.0,
    },
  ],
};

const CATEGORIES = [
  { id: "all", label: "Home" },
  { id: "movies", label: "New Movies" },
  { id: "tv", label: "TV Series" },
  { id: "animation", label: "Animation" },
  { id: "mystery", label: "Mystery" },
  { id: "scifi", label: "Sci-Fi" },
  { id: "more", label: "More" },
];

export default function DashboardHome({ onOpenModal, allMedia, children }: DashboardHomeProps) {
  const router = useRouter();
  const { activeProfile } = useProfileStore();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();

  const [activeCategory, setActiveCategory] = useState("all");
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarContinueItems, setSidebarContinueItems] = useState<ContinueWatchingRecord[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const refresh = () => setSidebarContinueItems(getContinueWatchingList().slice(0, 4));
    refresh();
    window.addEventListener("continueWatchingUpdated", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("continueWatchingUpdated", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const currentHero = HERO_ITEMS[heroIndex] || HERO_ITEMS[0];
  const isHeroSaved = isMounted ? isInWatchlist(activeProfile.id, currentHero.id) : false;

  const handleNextHero = () => {
    setHeroIndex((prev) => (prev + 1) % HERO_ITEMS.length);
  };

  const handlePrevHero = () => {
    setHeroIndex((prev) => (prev - 1 + HERO_ITEMS.length) % HERO_ITEMS.length);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleToggleWatchlist = (media: MediaItem) => {
    if (isInWatchlist(activeProfile.id, media.id)) {
      removeFromWatchlist(activeProfile.id, media.id);
    } else {
      addToWatchlist(activeProfile.id, media);
    }
  };

  // Full row of 4 featured cards for every category - guarantees zero empty spaces!
  const displayedCards =
    CATEGORY_FEATURED_CARDS[activeCategory] || CATEGORY_FEATURED_CARDS.all;

  return (
    <div className="relative w-full py-4 sm:py-8 px-2 sm:px-4 md:px-6 lg:px-8 flex justify-center items-start">
      {/* Ambient Warm Golden Dusk Glow around the Dashboard */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-amber-600/15 via-orange-950/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-7xl flex items-start gap-4 lg:gap-6">
        {/* Left Floating Quick-Dock */}
        <aside className="hidden xl:flex flex-col items-center gap-5 py-6 px-3 rounded-full bg-[#231812]/85 backdrop-blur-2xl border border-white/10 shadow-2xl shrink-0 sticky top-6 z-30">
          <Link
            href="/"
            className="mb-1 w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 text-white font-black text-xs shadow-lg shadow-red-600/40 hover:scale-110 transition-transform flex items-center justify-center tracking-tighter"
            title="ProMovies Home"
          >
            PM
          </Link>
          <Link
            href="/"
            className="p-3 rounded-full bg-white/15 text-white shadow-lg shadow-black/40 hover:scale-110 transition-all"
            title="Home"
          >
            <HomeIcon className="w-5 h-5 fill-current" />
          </Link>
          <Link
            href="/my-list"
            className="p-3 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110"
            title="Watchlist & Favorites"
          >
            <Heart className="w-5 h-5" />
          </Link>
          <button
            onClick={() => router.push("/movies")}
            className="p-3 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110 cursor-pointer"
            title="Browse Movies"
          >
            <Film className="w-5 h-5" />
          </button>
          <button
            onClick={() => router.push("/shows")}
            className="p-3 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110 cursor-pointer"
            title="TV Series"
          >
            <Tv className="w-5 h-5" />
          </button>
          <Link
            href="/profiles"
            className="p-3 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110"
            title="Profiles"
          >
            <User className="w-5 h-5" />
          </Link>
          <Link
            href="/profiles"
            className="p-3 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </aside>

        {/* Central Floating Dashboard Card */}
        <div className="flex-1 w-full rounded-[32px] bg-[#18110e]/90 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/80 overflow-hidden flex flex-col p-4 sm:p-6 lg:p-7 gap-6">
          {/* Dashboard Header Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-1">
            {/* Search Movies Pill Input with ProMovies Brand */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link href="/" className="flex xl:hidden items-center gap-2 group shrink-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-xs shadow-md">
                  PM
                </div>
                <span className="font-extrabold text-sm tracking-wider text-white">PRO<span className="text-red-500">MOVIES</span></span>
              </Link>
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex-1 md:w-72 lg:w-80"
              >
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Movies..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/[0.07] border border-white/10 text-xs sm:text-sm font-medium text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500/60 transition-all backdrop-blur-md"
                />
              </form>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-white/20 text-white shadow-md border border-white/25"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Right: Notifications & User Profile */}
            <div className="flex items-center gap-3 ml-auto md:ml-0 shrink-0">
              {/* Notification Bell with green dot */}
              <div className="relative">
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="p-2.5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer relative"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#18110e] absolute top-2 right-2 animate-pulse" />
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-64 p-3 rounded-2xl bg-[#231812] border border-white/15 shadow-2xl z-50 text-xs text-slate-200">
                    <p className="font-bold text-white mb-1">New In 4K HDR</p>
                    <p className="text-slate-400 text-[11px]">
                      Spider-Man: Across the Spider-Verse, Dune (2021), and Demon Slayer Season 1 are ready to stream in VIP 4K!
                    </p>
                  </div>
                )}
              </div>

              {/* Profile Pill */}
              <Link
                href="/profiles"
                className="flex items-center gap-2.5 pl-1.5 pr-3.5 py-1 rounded-full bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 transition-all cursor-pointer"
              >
                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-gradient-to-tr from-amber-500 to-rose-500">
                  <Image
                    src={activeProfile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"}
                    alt={activeProfile.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-bold text-white font-mono tracking-wider">
                  {activeProfile.name || "My Profile"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Main Dashboard Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: New Trailers + Continue Watching */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Card 1: 🔥 New Trailer (Today) */}
              <div className="p-4 sm:p-5 rounded-3xl bg-white/[0.04] border border-white/10 flex flex-col gap-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      New Trailer
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 hover:text-white cursor-pointer transition-colors">
                    Today ▾
                  </span>
                </div>

                {/* Trailers List */}
                <div className="flex flex-col gap-3">
                  {NEW_TRAILERS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        const match: MediaItem = allMedia.find((m) => m.id === item.id) || ({
                          id: item.id,
                          title: item.title,
                          name: item.title,
                          poster_path: item.backdrop,
                          backdrop_path: item.backdrop,
                          overview: item.title,
                          media_type: "movie",
                          genre_ids: [28, 12],
                          vote_average: 8.0,
                          vote_count: 1000,
                          popularity: 500.0,
                        } as MediaItem);
                        onOpenModal(match);
                      }}
                      className="group flex items-center justify-between gap-3 p-2 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative aspect-video w-24 sm:w-28 rounded-xl overflow-hidden bg-black/60 shrink-0">
                          <Image
                            src={getTMDBImageUrl(item.backdrop, "w500")}
                            alt={item.title}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 truncate">
                            {item.type}
                          </span>
                        </div>
                      </div>

                      {/* Circular Frosted Play Button */}
                      <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-amber-500 text-white group-hover:text-black backdrop-blur-md flex items-center justify-center shrink-0 shadow-md transition-all">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Continue Watching (real user history from localStorage) */}
              {sidebarContinueItems.length > 0 && (
                <div className="p-4 sm:p-5 rounded-3xl bg-white/[0.04] border border-white/10 flex flex-col gap-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      Continue Watching
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      {sidebarContinueItems.length} in progress
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {sidebarContinueItems.map((item) => {
                      const mediaObj = CONTINUE_WATCHING_MEDIA_MAP[item.id] ||
                        allMedia.find((m) => m.id === item.id) || {
                          id: item.id,
                          title: item.title,
                          name: item.title,
                          poster_path: item.poster_path,
                          backdrop_path: item.backdrop_path,
                          overview: "",
                          media_type: item.type,
                          genre_ids: [],
                          vote_average: 8.0,
                          vote_count: 100,
                          popularity: 500,
                        } as MediaItem;
                      const progressPercent = item.duration > 0
                        ? Math.min(100, Math.round((item.currentTime / item.duration) * 100))
                        : item.percent || 50;
                      const remainingText = formatMinutesLeft(item.currentTime, item.duration);
                      const posterSrc = item.poster_path || item.backdrop_path || (mediaObj as MediaItem).poster_path;

                      return (
                        <div
                          key={`${item.id}-${item.season || 0}-${item.episode || 0}`}
                          onClick={() => {
                            onOpenModal({
                              ...(mediaObj as MediaItem),
                              autoPlayStreaming: true,
                              initialSeason: item.season,
                              initialEpisode: item.episode,
                              initialStartTime: item.currentTime,
                            } as any);
                          }}
                          className="group flex items-center justify-between gap-3 p-2 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/60 shrink-0">
                              <Image
                                src={getTMDBImageUrl(posterSrc, "w300")}
                                alt={item.title}
                                fill
                                unoptimized
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              {/* Mini progress bar */}
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/40">
                                <div
                                  className="h-full bg-gradient-to-r from-violet-500 to-pink-500"
                                  style={{ width: `${progressPercent}%` }}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <h4 className="text-xs font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                                {item.title}
                                {item.type === "tv" && item.season && item.episode
                                  ? <span className="text-[10px] text-slate-400 font-normal ml-1">S{item.season}:E{item.episode}</span>
                                  : null}
                              </h4>
                              <span className="text-[10px] text-slate-400 truncate font-mono">
                                {remainingText} • {progressPercent}%
                              </span>
                            </div>
                          </div>

                          {/* Play Button */}
                          <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-white text-white group-hover:text-black backdrop-blur-md flex items-center justify-center shrink-0 shadow-md transition-all">
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Hero Banner + 4 Featured Cards */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Top Hero Banner (Spider-Man: Across the Spider-Verse) */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[300px] sm:min-h-[340px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-end p-6 sm:p-8 select-none group">
                {/* Background Artwork */}
                <Image
                  src={getTMDBImageUrl(currentHero.backdrop_path, "original")}
                  alt={currentHero.title || "Hero"}
                  fill
                  unoptimized
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#18110e] via-[#18110e]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#18110e]/90 via-[#18110e]/40 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col gap-3 max-w-xl">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                      {(currentHero.release_date || "") >= "2025-01-01" ? "🔥 UPCOMING BLOCKBUSTER" : "🔥 NEW 4K RELEASE"}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-mono font-bold backdrop-blur-md">
                      {currentHero.release_date ? currentHero.release_date.slice(0, 4) : "2026"}
                    </span>
                    {currentHero.genres?.slice(0, 2).map((g) => (
                      <span
                        key={g.id}
                        className="px-2.5 py-0.5 rounded-full bg-white/15 text-slate-200 text-[11px] font-semibold backdrop-blur-md"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                    {currentHero.title}
                  </h2>

                  {/* Synopsis */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2 max-w-lg">
                    {currentHero.overview}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={() => {
                        recordMovieStarted({
                          id: currentHero.id,
                          type: currentHero.media_type,
                          title: currentHero.title || "Untitled",
                          backdrop_path: currentHero.backdrop_path,
                          poster_path: currentHero.poster_path,
                          duration: currentHero.runtime ? currentHero.runtime * 60 : undefined,
                        });
                        onOpenModal(currentHero);
                      }}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-black font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-black" />
                      <span>Watch</span>
                    </button>

                    <button
                      onClick={() => handleToggleWatchlist(currentHero)}
                      suppressHydrationWarning
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all cursor-pointer ${
                        isHeroSaved
                          ? "bg-violet-600 text-white border-violet-400"
                          : "bg-white/10 hover:bg-white/20 text-white border-white/15"
                      }`}
                    >
                      {isHeroSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      <span>{isHeroSaved ? "In Watchlist" : "Watchlist"}</span>
                    </button>

                    <button
                      onClick={() => onOpenModal(currentHero)}
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer"
                      title="More details"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom-right Carousel Arrows */}
                <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
                  <button
                    onClick={handlePrevHero}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-all cursor-pointer hover:scale-105"
                    aria-label="Previous featured item"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextHero}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-all cursor-pointer hover:scale-105"
                    aria-label="Next featured item"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Row: 4 Featured Cards (The Flash, Manifest, Elemental, Interstellar) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {displayedCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => {
                      const match: MediaItem = allMedia.find((m) => m.id === card.id) || ({
                        id: card.id,
                        title: card.title,
                        name: card.title,
                        poster_path: card.poster,
                        backdrop_path: card.poster,
                        overview: card.overview,
                        media_type: card.media_type,
                        vote_average: card.vote_average,
                        genre_ids: [878],
                        vote_count: 2000,
                        popularity: 800.0,
                      } as MediaItem);
                      onOpenModal(match);
                    }}
                    className="group relative flex flex-col rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.03] cursor-pointer"
                  >
                    {/* Poster Image Frame */}
                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-black/60">
                      <Image
                        src={getTMDBImageUrl(card.poster, "w500")}
                        alt={card.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#18110e] via-[#18110e]/40 to-transparent" />

                      {/* Floating Category Pill */}
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border backdrop-blur-md ${card.categoryBg}`}
                        >
                          {card.category}
                        </span>
                      </div>

                      {/* Floating White Circular Play Button in bottom-right corner */}
                      <div className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-white group-hover:bg-amber-400 text-black flex items-center justify-center shadow-xl shadow-black/80 group-hover:scale-110 transition-all">
                        <Play className="w-4 h-4 fill-black ml-0.5" />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-3.5 flex flex-col gap-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {card.overview}
                      </p>
                      <span className="text-[10px] font-semibold text-amber-400/80 hover:text-amber-300 pt-1">
                        See more...
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Movie Posters Inside The Box */}
          {children && (
            <div className="w-full flex flex-col gap-8 pt-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
