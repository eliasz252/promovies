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
  clearAllHistory: (profileId?: string) => void;

  // Rating Actions
  rateMedia: (profileId: string, mediaId: number, rating: number) => void;
  getUserRating: (profileId: string, mediaId: number) => number;
}

// Clean initial states: no pre-seeded items
const INITIAL_CONTINUE_WATCHING: Record<string, ContinueWatchingItem[]> = {};
const INITIAL_WATCHLIST: Record<string, MediaItem[]> = {};

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlistByProfile: INITIAL_WATCHLIST,
      continueWatchingByProfile: INITIAL_CONTINUE_WATCHING,
      ratingsByProfile: {},
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

      clearAllHistory: (profileId?: string) => {
        set((state) => {
          if (profileId) {
            return {
              continueWatchingByProfile: {
                ...state.continueWatchingByProfile,
                [profileId]: [],
              },
              hasClearedHistoryByProfile: {
                ...state.hasClearedHistoryByProfile,
                [profileId]: true,
              },
            };
          }
          return {
            continueWatchingByProfile: {},
            hasClearedHistoryByProfile: {},
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
      name: "promovies-watchlist-storage-v2",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        if (typeof window !== "undefined") {
          try {
            localStorage.removeItem("promovies-watchlist-storage");
          } catch {}
        }
      },
      merge: (persistedState: unknown, currentState) => {
        const persisted = (persistedState as Partial<WatchlistState>) || {};
        return {
          ...currentState,
          ...persisted,
          continueWatchingByProfile: persisted.continueWatchingByProfile || {},
          watchlistByProfile: persisted.watchlistByProfile || {},
          hasClearedHistoryByProfile: persisted.hasClearedHistoryByProfile || {},
          isHydrated: true,
        };
      },
    }
  )
);
