export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface SyncedMovie {
  id: number; // TMDB ID
  tmdb_id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string | null;
  release_date: string;
  genres: string[];
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  runtime: number; // in minutes
  original_language: string;
  cast: CastMember[];
  trailer_url: string | null;
  trailer_key: string | null;
  slug: string;
  status: string; // e.g. "Released", "Post Production"
  created_at: string;
  updated_at: string;
}

export interface SyncStats {
  started_at: string;
  completed_at: string;
  duration_ms: number;
  total_discovered: number;
  added: number;
  updated: number;
  unchanged: number;
  skipped: number;
  errors: number;
  log_file: string;
  added_titles: string[];
  updated_titles: string[];
  error_messages: string[];
}
