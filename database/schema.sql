-- ============================================================================
-- PROMOVIES DATABASE SCHEMA & MIGRATION
-- Compatible with: PostgreSQL & MySQL
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. POSTGRESQL SCHEMA (Supabase, Neon, AWS RDS, Railway, Local Postgres)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    tmdb_id INTEGER UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255),
    overview TEXT,
    poster_path VARCHAR(255) NOT NULL,
    backdrop_path VARCHAR(255),
    release_date DATE,
    genres JSONB DEFAULT '[]'::jsonb,
    genre_ids JSONB DEFAULT '[]'::jsonb,
    vote_average NUMERIC(3, 1) DEFAULT 0.0,
    vote_count INTEGER DEFAULT 0,
    runtime INTEGER DEFAULT 0,
    original_language VARCHAR(10) DEFAULT 'en',
    cast_members JSONB DEFAULT '[]'::jsonb,
    trailer_url VARCHAR(255),
    trailer_key VARCHAR(100),
    slug VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'Released',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Recommended Indexes for Fast Searching & Sorting
CREATE INDEX IF NOT EXISTS idx_movies_tmdb_id ON movies(tmdb_id);
CREATE INDEX IF NOT EXISTS idx_movies_slug ON movies(slug);
CREATE INDEX IF NOT EXISTS idx_movies_release_date ON movies(release_date DESC);
CREATE INDEX IF NOT EXISTS idx_movies_vote_average ON movies(vote_average DESC);

-- PostgreSQL Automatic "updated_at" Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_movies_updated_at ON movies;
CREATE TRIGGER update_movies_updated_at
    BEFORE UPDATE ON movies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- PostgreSQL Upsert Query (Insert or Update Changed Fields without duplicates)
-- INSERT INTO movies (
--     tmdb_id, title, original_title, overview, poster_path, backdrop_path,
--     release_date, genres, genre_ids, vote_average, vote_count, runtime,
--     original_language, cast_members, trailer_url, trailer_key, slug, status
-- ) VALUES (
--     $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
-- )
-- ON CONFLICT (tmdb_id) DO UPDATE SET
--     title = EXCLUDED.title,
--     overview = EXCLUDED.overview,
--     poster_path = EXCLUDED.poster_path,
--     backdrop_path = EXCLUDED.backdrop_path,
--     vote_average = EXCLUDED.vote_average,
--     vote_count = EXCLUDED.vote_count,
--     runtime = EXCLUDED.runtime,
--     trailer_url = EXCLUDED.trailer_url,
--     updated_at = CURRENT_TIMESTAMP;


-- ----------------------------------------------------------------------------
-- 2. MYSQL SCHEMA (MySQL 8.0+, PlanetScale, Amazon Aurora, MariaDB)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS movies_mysql (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tmdb_id INT NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255),
    overview TEXT,
    poster_path VARCHAR(255) NOT NULL,
    backdrop_path VARCHAR(255),
    release_date DATE,
    genres JSON,
    genre_ids JSON,
    vote_average DECIMAL(3, 1) DEFAULT 0.0,
    vote_count INT DEFAULT 0,
    runtime INT DEFAULT 0,
    original_language VARCHAR(10) DEFAULT 'en',
    cast_members JSON,
    trailer_url VARCHAR(255),
    trailer_key VARCHAR(100),
    slug VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) DEFAULT 'Released',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tmdb_id (tmdb_id),
    INDEX idx_slug (slug),
    INDEX idx_release_date (release_date),
    INDEX idx_vote_average (vote_average)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- MySQL Upsert Query (Insert or Update Changed Fields without duplicates)
-- INSERT INTO movies_mysql (
--     tmdb_id, title, original_title, overview, poster_path, backdrop_path,
--     release_date, genres, genre_ids, vote_average, vote_count, runtime,
--     original_language, cast_members, trailer_url, trailer_key, slug, status
-- ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
-- ON DUPLICATE KEY UPDATE
--     title = VALUES(title),
--     overview = VALUES(overview),
--     poster_path = VALUES(poster_path),
--     backdrop_path = VALUES(backdrop_path),
--     vote_average = VALUES(vote_average),
--     vote_count = VALUES(vote_count),
--     runtime = VALUES(runtime),
--     trailer_url = VALUES(trailer_url),
--     updated_at = CURRENT_TIMESTAMP;
