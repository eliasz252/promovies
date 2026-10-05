export type CatalogCategory =
  | "featured"
  | "top10"
  | "upcoming"
  | "now_playing"
  | "top_rated"
  | "trending_tv"
  | "trending_movies";

export type MediaType = "movie" | "tv";

/**
 * Unified Catalog Item Schema
 */
export interface CatalogItem {
  id?: number;
  tmdb_id: number;
  media_type: MediaType;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  logo_path: string | null; // Stylized title logo (PNG) for Featured items
  release_date: string; // ISO date string: YYYY-MM-DD
  vote_average: number; // e.g. 8.4
  genre_ids: number[];
  category: CatalogCategory;
  rank: number | null; // 1-5 for featured, 1-10 for top10, or null
  is_active: boolean; // Soft-delete flag (default true)
  created_at?: string;
  updated_at?: string;
}

export interface CategorySyncSummary {
  category: CatalogCategory;
  mode: "rebuild" | "upsert_with_soft_delete";
  added: number;
  updated: number;
  removed: number; // soft-deleted or pruned
  total_active: number;
}

export interface SyncStats {
  started_at: string;
  completed_at: string;
  duration_ms: number;
  status: "success" | "failed" | "partial";
  total_added: number;
  total_updated: number;
  total_removed: number;
  categories: Record<CatalogCategory, CategorySyncSummary>;
  error_messages: string[];
  log_file: string;
}

export interface SyncOptions {
  categories?: CatalogCategory[]; // If omitted, syncs all categories
  dryRun?: boolean; // If true, fetches and computes changes without committing
  downloadImages?: boolean; // If true, downloads images locally to public/catalog/
  concurrency?: number; // Concurrency limit (default 3)
}
