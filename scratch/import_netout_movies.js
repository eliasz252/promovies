const fs = require('fs');

async function importNetoutMovies() {
  console.log('Fetching Hollywood movies from NetOut repository...');
  const res = await fetch("https://raw.githubusercontent.com/Watchout2025/RPM-Title-Fixer/refs/heads/main/movies/hollywood.json");
  const rawMovies = await res.json();
  console.log(`Found ${rawMovies.length} raw movies.`);

  const GENRE_NAME_TO_ID = {
    "Action": 28, "Adventure": 12, "Animation": 16, "Comedy": 35,
    "Crime": 80, "Documentary": 99, "Drama": 18, "Family": 10751,
    "Fantasy": 14, "History": 36, "Horror": 27, "Music": 10402,
    "Mystery": 9648, "Romance": 10749, "Sci-Fi": 878, "Science Fiction": 878,
    "Thriller": 53, "War": 10752, "Western": 37
  };

  const enrichedMovies = [];

  // Batch fetch in chunks of 5
  for (let i = 0; i < rawMovies.length; i += 5) {
    const chunk = rawMovies.slice(i, i + 5);
    await Promise.all(chunk.map(async (raw) => {
      try {
        let details = null;
        try {
          const tmdbRes = await fetch(`https://db.wecollege.net/3/movie/${raw.id}`);
          if (tmdbRes.ok) details = await tmdbRes.json();
        } catch {}

        const cleanTitle = raw.title.replace(/\s*\(\d{4}\)$/, '').trim();
        const releaseDate = details?.release_date || (raw.title.match(/\((\d{4})\)/) ? `${raw.title.match(/\((\d{4})\)/)[1]}-01-01` : '2025-01-01');
        const genres = details?.genres && details.genres.length > 0
          ? details.genres.map(g => ({ id: g.id, name: g.name }))
          : [{ id: 28, name: "Action" }, { id: 53, name: "Thriller" }];
        const genreIds = genres.map(g => g.id);

        const movieItem = {
          id: raw.id,
          title: cleanTitle,
          overview: details?.overview || `Watch the brand-new 2025/2026 hit release "${cleanTitle}" in cinema-grade 4K UHD.`,
          poster_path: details?.poster_path || raw.poster,
          backdrop_path: details?.backdrop_path || raw.backdrop || raw.poster,
          media_type: "movie",
          genre_ids: genreIds,
          genres: genres,
          release_date: releaseDate,
          vote_average: details?.vote_average ? Math.round(details.vote_average * 10) / 10 : 7.5,
          vote_count: details?.vote_count || 1200,
          popularity: details?.popularity || 1500.0,
          tagline: details?.tagline || `Experience ${cleanTitle}.`,
          runtime: details?.runtime || 115,
          age_rating: details?.adult ? "R" : "PG-13",
          quality_badge: "4K UHD",
          videos: {
            results: [
              {
                id: `v_${raw.id}`,
                key: "73_1biulkYk",
                name: "Official Trailer",
                site: "YouTube",
                type: "Trailer",
                official: true
              }
            ]
          }
        };
        enrichedMovies.push(movieItem);
      } catch (err) {
        console.error(`Error processing ${raw.id}:`, err.message);
      }
    }));
    console.log(`Processed ${enrichedMovies.length}/${rawMovies.length}`);
  }

  // Sort by release date newest first
  enrichedMovies.sort((a, b) => b.release_date.localeCompare(a.release_date));

  fs.writeFileSync('./scratch/netout_imported_movies.json', JSON.stringify(enrichedMovies, null, 2));
  console.log(`Successfully saved ${enrichedMovies.length} new movies to ./scratch/netout_imported_movies.json`);
}

importNetoutMovies();
