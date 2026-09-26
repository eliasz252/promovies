const TMDB_PRIMARY_BASE = "https://db.wecollege.net/3";
const TMDB_FALLBACK_BASE = "https://api.cinewave.qzz.io/api/tmdb";

async function fetchFromLiveTMDB(pathString, searchParams) {
  const normalizedPath = pathString.startsWith("/") ? pathString : `/${pathString}`;
  const queryStr = searchParams ? searchParams.toString() : "";
  const fullPath = queryStr ? `${normalizedPath}?${queryStr}` : normalizedPath;

  // Primary: db.wecollege.net
  try {
    const primaryUrl = `${TMDB_PRIMARY_BASE}${fullPath}`;
    const res = await fetch(primaryUrl, {
      headers: { "Accept": "application/json" },
    });
    if (res.ok && res.status !== 429) {
      return await res.json();
    }
  } catch (err) {
    console.warn("[Live TMDB] Primary failed:", err.message);
  }

  // Fallback: Cinewave
  try {
    const queryPart = queryStr ? `?${queryStr}` : "";
    const fallbackUrl = `${TMDB_FALLBACK_BASE}?path=${encodeURIComponent(normalizedPath)}&query=${encodeURIComponent(queryPart)}`;
    const res = await fetch(fallbackUrl, {
      headers: { "Accept": "application/json" },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("[Live TMDB] Fallback failed:", err.message);
  }

  return null;
}

async function run() {
  const sp1 = new URLSearchParams({ query: "the light room", include_adult: "false", language: "en-US", page: "1" });
  const searchRes = await fetchFromLiveTMDB("search/multi", sp1);
  console.log("the light room search results:", searchRes?.results?.length, searchRes?.results?.slice(0, 3).map(x => x.title || x.name));

  const sp2 = new URLSearchParams({ query: "spider-man", include_adult: "false", language: "en-US", page: "1" });
  const spRes = await fetchFromLiveTMDB("search/multi", sp2);
  console.log("spider-man search results:", spRes?.results?.length, spRes?.results?.slice(0, 3).map(x => x.title || x.name));

  const movieRes = await fetchFromLiveTMDB("movie/550", new URLSearchParams({ append_to_response: "credits,videos,similar" }));
  console.log("movie 550 details:", movieRes?.title, "genres:", movieRes?.genres?.map(g => g.name));
}

run().catch(console.error);
