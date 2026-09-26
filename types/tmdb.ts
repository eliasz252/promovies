export type MediaType = "movie" | "tv";

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface VideoItem {
  id: string;
  key: string; // YouTube Video Key
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface ProviderItem {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
}

export interface WatchProviders {
  link?: string;
  flatrate?: ProviderItem[];
  rent?: ProviderItem[];
  buy?: ProviderItem[];
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  still_path: string | null;
  runtime: number;
  vote_average: number;
  air_date?: string;
}

export interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  poster_path: string | null;
  overview?: string;
  air_date?: string;
  episodes?: Episode[];
}

export interface MediaItem {
  id: number;
  title: string; // Movie title or TV name
  name?: string; // TMDB uses name for TV
  original_title?: string;
  original_name?: string;
  original_language?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  logo_path?: string | null;
  media_type: MediaType;
  genre_ids: number[];
  genres?: Genre[];
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult?: boolean;
  tagline?: string;
  status?: string;
  runtime?: number; // Minutes
  number_of_seasons?: number;
  number_of_episodes?: number;
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  videos?: {
    results: VideoItem[];
  };
  "watch/providers"?: {
    results?: {
      US?: WatchProviders;
      GB?: WatchProviders;
      [country: string]: WatchProviders | undefined;
    };
  };
  seasons?: Season[];
  similar?: {
    results: MediaItem[];
  };
  recommendations?: {
    results: MediaItem[];
  };
  age_rating?: string; // e.g. PG-13, TV-MA, PG, R
  quality_badge?: "4K UHD" | "HDR" | "HD";
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  isKids: boolean;
  language: string;
}

export interface ContinueWatchingItem {
  id: number;
  media: MediaItem;
  progressPercent: number; // 0 - 100
  durationMins: number;
  currentMins: number;
  lastWatchedAt: string;
  seasonNumber?: number;
  episodeNumber?: number;
}

export interface UserRating {
  mediaId: number;
  rating: number; // 1 - 5
  updatedAt: string;
}

export interface ReportPayload {
  mediaId: number;
  mediaTitle: string;
  issueType: "video_playback" | "audio_sync" | "incorrect_metadata" | "subtitles" | "other";
  description: string;
  userEmail?: string;
}
