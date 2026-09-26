const fs = require('fs');

const movies = JSON.parse(fs.readFileSync('./scratch/netout_imported_movies.json', 'utf8'));

const tsCode = `import { MediaItem } from "@/types/tmdb";

// Curated 2025 - 2026 Hollywood New Releases imported from NetOut
export const NETOUT_IMPORTED_MOVIES: MediaItem[] = ${JSON.stringify(movies, null, 2)};
`;

fs.writeFileSync('./lib/tmdb/netoutMovies.ts', tsCode, 'utf8');
console.log(`Generated ./lib/tmdb/netoutMovies.ts with ${movies.length} movies!`);
