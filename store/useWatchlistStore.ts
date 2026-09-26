import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MediaItem, ContinueWatchingItem } from "@/types/tmdb";
import { MOCK_MEDIA_ITEMS } from "@/lib/tmdb/mockData";

interface WatchlistState {
  watchlistByProfile: Record<string, MediaItem[]>;
  continueWatchingByProfile: Record<string, ContinueWatchingItem[]>;
  ratingsByProfile: Record<string, Record<number, number>>; // profileId -> (mediaId -> 1..5)
  hasClearedHistoryByProfile: Record<string, boolean>; // profileId -> boolean
  isHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;

  // Watchlist Actions
  addToWatchlist: (profileId: string, media: MediaItem) => void;
  removeFromWatchlist: (profileId: string, mediaId: number) => void;
  isInWatchlist: (profileId: string, mediaId: number) => boolean;
  reorderWatchlist: (profileId: string, items: MediaItem[]) => void;

  // Continue Watching Actions
  updateContinueWatching: (
    profileId: string,
    media: MediaItem,
    progressPercent: number,
    currentMins: number,
    durationMins: number,
    seasonNumber?: number,
    episodeNumber?: number
  ) => void;
  removeFromContinueWatching: (profileId: string, mediaId: number) => void;

  // Rating Actions
  rateMedia: (profileId: string, mediaId: number, rating: number) => void;
  getUserRating: (profileId: string, mediaId: number) => number;
}

// Fallback high-fidelity media items for pre-seeded continue watching items
const FALLBACK_MEDIA_MAP: Record<number, MediaItem> = {
  94605: {
    id: 94605,
    title: "Arcane",
    name: "Arcane",
    overview:
      "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and incompatible convictions.",
    poster_path: "/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    backdrop_path: "/5cvnxEHT3e39DvT6ARw4GNCFrB0.jpg",
    media_type: "tv",
    genre_ids: [16, 10765, 10759, 18],
    genres: [{ id: 16, name: "Animation" }, { id: 10765, name: "Sci-Fi & Fantasy" }],
    vote_average: 8.7,
    vote_count: 4200,
    popularity: 1850.0,
  },
  402431: {
    id: 402431,
    title: "Wicked",
    name: "Wicked",
    overview:
      "Elphaba, an ostracized but fiery girl born with green skin, and Glinda, a privileged and aristocratic young girl with an ambition for popularity, meet as students at Shiz University in the land of Oz and forge an unlikely but profound friendship.",
    poster_path: "/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg",
    backdrop_path: "/w22GVYotTIVC1dUd58mRhwPqiS.jpg",
    media_type: "movie",
    genre_ids: [14, 18, 10402],
    genres: [{ id: 14, name: "Fantasy" }, { id: 18, name: "Drama" }],
    vote_average: 7.6,
    vote_count: 2450,
    popularity: 2100.0,
    release_date: "2024-11-20",
  },
  100088: {
    id: 100088,
    title: "The Last of Us",
    name: "The Last of Us",
    overview:
      "Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone.",
    poster_path: "/uKvVjHNqB5VmOrdxqAt2V7JMrRI.jpg",
    backdrop_path: "/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
    media_type: "tv",
    genre_ids: [18, 10765, 10759],
    genres: [{ id: 18, name: "Drama" }, { id: 10765, name: "Sci-Fi & Fantasy" }],
    vote_average: 8.6,
    vote_count: 5120,
    popularity: 1420.0,
    release_date: "2023-01-15",
  },
};

// Helper to find pre-seeded item safely by ID
const getItemById = (id: number): MediaItem =>
  MOCK_MEDIA_ITEMS.find((m) => m.id === id) || FALLBACK_MEDIA_MAP[id] || MOCK_MEDIA_ITEMS[0];

// Pre-seeded continue watching items for the default profile
const INITIAL_CONTINUE_WATCHING: Record<string, ContinueWatchingItem[]> = {
  p1: [
    {
      id: 108978, // Reacher
      media: getItemById(108978),
      progressPercent: 52,
      durationMins: 54,
      currentMins: 28,
      seasonNumber: 2,
      episodeNumber: 4,
      lastWatchedAt: new Date().toISOString(),
    },
    {
      id: 969681, // Spider-Man: Brand New Day
      media: getItemById(969681),
      progressPercent: 55,
      durationMins: 135,
      currentMins: 74,
      lastWatchedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 113962, // Lioness
      media: getItemById(113962),
      progressPercent: 40,
      durationMins: 55,
      currentMins: 22,
      seasonNumber: 2,
      episodeNumber: 1,
      lastWatchedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 94605, // Arcane
      media: getItemById(94605),
      progressPercent: 68,
      durationMins: 43,
      currentMins: 29,
      seasonNumber: 1,
      episodeNumber: 3,
      lastWatchedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    },
    {
      id: 402431, // Wicked
      media: getItemById(402431),
      progressPercent: 42,
      durationMins: 160,
      currentMins: 67,
      lastWatchedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 100088, // The Last of Us
      media: getItemById(100088),
      progressPercent: 85,
      durationMins: 55,
      currentMins: 47,
      seasonNumber: 1,
      episodeNumber: 4,
      lastWatchedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
  ],
  "p-kids": [
    {
      id: 1022789, // Inside Out 2
      media: getItemById(1022789),
      progressPercent: 50,
      durationMins: 96,
      currentMins: 48,
      lastWatchedAt: new Date().toISOString(),
    },
  ],
};

const INITIAL_WATCHLIST: Record<string, MediaItem[]> = {
  p1: [getItemById(872585), getItemById(569094), getItemById(1429)], // Oppenheimer, Spider-Verse, Attack on Titan
  "p-kids": [getItemById(129), getItemById(1241982)], // Spirited Away, Moana 2
};

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlistByProfile: INITIAL_WATCHLIST,
      continueWatchingByProfile: INITIAL_CONTINUE_WATCHING,
      ratingsByProfile: { p1: { 693134: 5, 872585: 5 } },
      hasClearedHistoryByProfile: {},
      isHydrated: false,
      setHasHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),

      addToWatchlist: (profileId: string, media: MediaItem) => {
        set((state) => {
          const profileList = state.watchlistByProfile[profileId] || [];
          if (profileList.some((m) => m.id === media.id)) return state;
          return {
            watchlistByProfile: {
              ...state.watchlistByProfile,
              [profileId]: [media, ...profileList],
            },
          };
        });
      },

      removeFromWatchlist: (profileId: string, mediaId: number) => {
        set((state) => {
          const profileList = state.watchlistByProfile[profileId] || [];
          return {
            watchlistByProfile: {
              ...state.watchlistByProfile,
              [profileId]: profileList.filter((m) => m.id !== mediaId),
            },
          };
        });
      },

      isInWatchlist: (profileId: string, mediaId: number) => {
        const list = get().watchlistByProfile[profileId] || [];
        return list.some((m) => m.id === mediaId);
      },

      reorderWatchlist: (profileId: string, items: MediaItem[]) => {
        set((state) => ({
          watchlistByProfile: {
            ...state.watchlistByProfile,
            [profileId]: items,
          },
        }));
      },

      updateContinueWatching: (
        profileId: string,
        media: MediaItem,
        progressPercent: number,
        currentMins: number,
        durationMins: number,
        seasonNumber?: number,
        episodeNumber?: number
      ) => {
        set((state) => {
          const list = state.continueWatchingByProfile[profileId] || [];
          const filtered = list.filter((item) => item.id !== media.id);
          const updatedItem: ContinueWatchingItem = {
            id: media.id,
            media,
            progressPercent,
            currentMins,
            durationMins,
            seasonNumber,
            episodeNumber,
            lastWatchedAt: new Date().toISOString(),
          };
          return {
            continueWatchingByProfile: {
              ...state.continueWatchingByProfile,
              [profileId]: [updatedItem, ...filtered],
            },
            hasClearedHistoryByProfile: {
              ...(state.hasClearedHistoryByProfile || {}),
              [profileId]: false,
            },
          };
        });
      },

      removeFromContinueWatching: (profileId: string, mediaId: number) => {
        set((state) => {
          const list = state.continueWatchingByProfile[profileId] || [];
          const updated = list.filter((item) => item.id !== mediaId);
          return {
            continueWatchingByProfile: {
              ...state.continueWatchingByProfile,
              [profileId]: updated,
            },
            hasClearedHistoryByProfile: {
              ...(state.hasClearedHistoryByProfile || {}),
              [profileId]: updated.length === 0,
            },
          };
        });
      },

      rateMedia: (profileId: string, mediaId: number, rating: number) => {
        set((state) => {
          const profileRatings = state.ratingsByProfile[profileId] || {};
          return {
            ratingsByProfile: {
              ...state.ratingsByProfile,
              [profileId]: {
                ...profileRatings,
                [mediaId]: rating,
              },
            },
          };
        });
      },

      getUserRating: (profileId: string, mediaId: number) => {
        const profileRatings = get().ratingsByProfile[profileId] || {};
        return profileRatings[mediaId] || 0;
      },
    }),
    {
      name: "promovies-watchlist-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      merge: (persistedState: unknown, currentState) => {
        const persisted = (persistedState as Partial<WatchlistState>) || {};
        const persistedCW = persisted.continueWatchingByProfile || {};
        const persistedCleared = persisted.hasClearedHistoryByProfile || {};

        const mergedContinueWatching: Record<string, ContinueWatchingItem[]> = {
          ...INITIAL_CONTINUE_WATCHING,
          ...persistedCW,
        };

        // Ensure seeded profiles are maintained on refresh unless explicitly cleared
        Object.keys(INITIAL_CONTINUE_WATCHING).forEach((profileId) => {
          const list = mergedContinueWatching[profileId];
          const hasExplicitlyCleared = persistedCleared[profileId] === true;
          if ((!list || list.length === 0) && !hasExplicitlyCleared) {
            mergedContinueWatching[profileId] = INITIAL_CONTINUE_WATCHING[profileId];
          }
        });

        return {
          ...currentState,
          ...persisted,
          continueWatchingByProfile: mergedContinueWatching,
          watchlistByProfile: {
            ...INITIAL_WATCHLIST,
            ...(persisted.watchlistByProfile || {}),
          },
          hasClearedHistoryByProfile: persistedCleared,
          isHydrated: true,
        };
      },
    }
  )
);
