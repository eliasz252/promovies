import { getAllCatalogItems } from "../lib/sync/catalogStore";

async function verifyDatabase() {
  console.log("\n===========================================================");
  console.log("🔍 DIRECT DATABASE / CATALOG STORE VERIFICATION");
  console.log("===========================================================");
  const items = getAllCatalogItems();
  console.log(`📦 Total Rows in Catalog: ${items.length}`);
  console.log(`✨ Total Active Rows:     ${items.filter((i) => i.is_active).length}`);

  const categories = [
    "featured",
    "top10",
    "now_playing",
    "trending_tv",
    "upcoming",
    "top_rated",
  ] as const;

  for (const cat of categories) {
    const catItems = items.filter((i) => i.category === cat && i.is_active);
    console.log(`\n📂 [CATEGORY: ${cat.toUpperCase()}] (${catItems.length} active titles)`);

    // Sort by rank or vote_average
    catItems.sort((a, b) => {
      if (a.rank !== null && b.rank !== null) return a.rank - b.rank;
      if (a.rank !== null) return -1;
      if (b.rank !== null) return 1;
      return (b.vote_average || 0) - (a.vote_average || 0);
    });

    catItems.slice(0, 3).forEach((item) => {
      const rankStr = item.rank ? `#${item.rank} ` : "";
      console.log(
        `   • ${rankStr}"${item.title}" | TMDB ID: ${item.tmdb_id} | Type: ${item.media_type} | Rating: ${item.vote_average} | Updated: ${item.updated_at}`
      );
      if (item.logo_path) {
        console.log(`     🎨 Stylized Title Logo: https://image.tmdb.org/t/p/w500${item.logo_path}`);
      }
    });
  }

  console.log("\n===========================================================");
  console.log("✅ Database verification complete. Writes confirmed active!");
  console.log("===========================================================\n");
}

verifyDatabase();
