import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Profile } from "@/types/tmdb";

export const DEFAULT_PROFILES: Profile[] = [
  {
    id: "p1",
    name: "My Profile",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    isKids: false,
    language: "en",
  },
  {
    id: "p-kids",
    name: "Kids",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
    isKids: true,
    language: "en",
  },
];

interface ProfileState {
  profiles: Profile[];
  activeProfile: Profile;
  hasSelectedProfile: boolean;
  setActiveProfile: (profileId: string) => void;
  addProfile: (name: string, isKids: boolean, avatarUrl?: string) => void;
  updateProfile: (id: string, updates: Partial<Profile>) => void;
  deleteProfile: (id: string) => void;
  setHasSelectedProfile: (selected: boolean) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profiles: DEFAULT_PROFILES,
      activeProfile: DEFAULT_PROFILES[0],
      hasSelectedProfile: false,

      setActiveProfile: (profileId: string) => {
        const profile = get().profiles.find((p) => p.id === profileId);
        if (profile) {
          set({ activeProfile: profile, hasSelectedProfile: true });
        }
      },

      addProfile: (name: string, isKids: boolean, avatarUrl?: string) => {
        const newProfile: Profile = {
          id: `p-${Date.now()}`,
          name,
          avatar:
            avatarUrl ||
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
          isKids,
          language: "en",
        };
        set((state) => ({
          profiles: [...state.profiles, newProfile],
        }));
      },

      updateProfile: (id: string, updates: Partial<Profile>) => {
        set((state) => {
          const updatedProfiles = state.profiles.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          );
          const updatedActive =
            state.activeProfile.id === id
              ? { ...state.activeProfile, ...updates }
              : state.activeProfile;
          return { profiles: updatedProfiles, activeProfile: updatedActive };
        });
      },

      deleteProfile: (id: string) => {
        set((state) => {
          if (state.profiles.length <= 1) return state; // Don't delete last profile
          const remaining = state.profiles.filter((p) => p.id !== id);
          return {
            profiles: remaining,
            activeProfile: state.activeProfile.id === id ? remaining[0] : state.activeProfile,
          };
        });
      },

      setHasSelectedProfile: (selected: boolean) => {
        set({ hasSelectedProfile: selected });
      },
    }),
    {
      name: "promovies-profile-storage-v2",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (typeof window !== "undefined") {
          try {
            localStorage.removeItem("promovies-profile-storage");
          } catch {}
        }
        if (state && (state.activeProfile?.name === "VIKRAM.UIX" || !state.activeProfile?.id)) {
          state.profiles = DEFAULT_PROFILES;
          state.activeProfile = DEFAULT_PROFILES[0];
        }
      },
    }
  )
);
