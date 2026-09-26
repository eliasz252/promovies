-- ============================================================================
-- PROMOVIES PRODUCTION-GRADE CONTENT SYNC DATABASE SCHEMA
-- Compatible with: PostgreSQL (Neon, Supabase, AWS RDS, Railway, Docker) & MySQL (8.0+)
-- ============================================================================

-- ============================================================================
-- 1. POSTGRESQL SCHEMA (Recommended for Next.js / Serverless)
-- ============================================================================

-- Table: catalog_items
-- Unified schema storing synced titles across all automated categories
CREATE TABLE IF NOT EXISTS catalog_items (
    id SERIAL PRIMARY KEY,
    tmdb_id INTEGER NOT NULL,
    media_type VARCHAR(10) NOT NULL CHECK (media_type IN ('movie', 'tv')),
    title VARCHAR(255) NOT NULL,
    overview TEXT,
    poster_path VARCHAR(255),
    backdrop_path VARCHAR(255),
    logo_path VARCHAR(255),               -- Stylized PNG title logo (fetched for Featured items)
    release_date VARCHAR(50),             -- Standard ISO date YYYY-MM-DD
    vote_average NUMERIC(3, 1) DEFAULT 0.0,
    genre_ids JSONB DEFAULT '[]'::jsonb,  -- Array of TMDB genre IDs
    category VARCHAR(50) NOT NULL CHECK (
        category IN ('featured', 'top10', 'upcoming', 'now_playing', 'top_rated', 'trending_tv')
    ),
    rank INTEGER,                         -- 1-5 for featured, 1-10 for top10, etc.
    is_active BOOLEAN DEFAULT TRUE,       -- Soft-delete flag for dropped items (upcoming, top_rated)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Composite unique constraint: an item has a unique entry per category
    CONSTRAINT uq_catalog_item UNIQUE (tmdb_id, category)
);

-- Production Indexes for fast querying by UI carousel/hero sections
CREATE INDEX IF NOT EXISTS idx_catalog_category_active 
    ON catalog_items (category, is_active);

CREATE INDEX IF NOT EXISTS idx_catalog_category_rank 
    ON catalog_items (category, rank) 
    WHERE rank IS NOT NULL AND is_active = TRUE;

CREATE INDEX IF NOT EXISTS idx_catalog_tmdb_id 
    ON catalog_items (tmdb_id);

CREATE INDEX IF NOT EXISTS idx_catalog_updated_at 
    ON catalog_items (updated_at DESC);

-- Automatic updated_at trigger for PostgreSQL
CREATE OR REPLACE FUNCTION update_catalog_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_catalog_updated_at ON catalog_items;
CREATE TRIGGER trigger_catalog_updated_at
    BEFORE UPDATE ON catalog_items
    FOR EACH ROW
    EXECUTE FUNCTION update_catalog_updated_at();

-- Table: sync_logs
-- Stores structured audit history for every automated and manual sync run
CREATE TABLE IF NOT EXISTS sync_logs (
    id SERIAL PRIMARY KEY,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    duration_ms INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('success', 'failed', 'partial')),
    total_added INTEGER DEFAULT 0,
    total_updated INTEGER DEFAULT 0,
    total_removed INTEGER DEFAULT 0,
    category_summary JSONB DEFAULT '{}'::jsonb,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sync_logs_started_at 
    ON sync_logs (started_at DESC);


-- ============================================================================
-- 2. MYSQL SCHEMA (MySQL 8.0+, PlanetScale, Amazon Aurora)
-- ============================================================================

CREATE TABLE IF NOT EXISTS catalog_items_mysql (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tmdb_id INT NOT NULL,
    media_type ENUM('movie', 'tv') NOT NULL,
    title VARCHAR(255) NOT NULL,
    overview TEXT,
    poster_path VARCHAR(255),
    backdrop_path VARCHAR(255),
    logo_path VARCHAR(255),
    release_date VARCHAR(50),
    vote_average DECIMAL(3, 1) DEFAULT 0.0,
    genre_ids JSON,
    category ENUM('featured', 'top10', 'upcoming', 'now_playing', 'top_rated', 'trending_tv') NOT NULL,
    `rank` INT NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_tmdb_category (tmdb_id, category),
    INDEX idx_category_active (category, is_active),
    INDEX idx_category_rank (category, `rank`),
    INDEX idx_tmdb_id (tmdb_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sync_logs_mysql (
    id INT AUTO_INCREMENT PRIMARY KEY,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    duration_ms INT NOT NULL,
    status ENUM('success', 'failed', 'partial') NOT NULL,
    total_added INT DEFAULT 0,
    total_updated INT DEFAULT 0,
    total_removed INT DEFAULT 0,
    category_summary JSON,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_started_at (started_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================================
-- 3. MONGODB COLLECTION VALIDATOR & COMPOUND INDEX (if using MongoDB)
-- ============================================================================
/*
db.createCollection("catalog_items", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["tmdb_id", "media_type", "title", "category", "updated_at"],
      properties: {
        tmdb_id: { bsonType: "int" },
        media_type: { enum: ["movie", "tv"] },
        title: { bsonType: "string" },
        overview: { bsonType: "string" },
        poster_path: { bsonType: ["string", "null"] },
        backdrop_path: { bsonType: ["string", "null"] },
        logo_path: { bsonType: ["string", "null"] },
        release_date: { bsonType: "string" },
        vote_average: { bsonType: "double" },
        genre_ids: { bsonType: "array" },
        category: { enum: ["featured", "top10", "upcoming", "now_playing", "top_rated", "trending_tv"] },
        rank: { bsonType: ["int", "null"] },
        is_active: { bsonType: "bool" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});
db.catalog_items.createIndex({ tmdb_id: 1, category: 1 }, { unique: true });
db.catalog_items.createIndex({ category: 1, is_active: 1, rank: 1 });
*/
