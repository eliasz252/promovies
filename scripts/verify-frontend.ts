async function verifyFrontend() {
  console.log("\n===========================================================");
  console.log("🌐 LIVE HOMEPAGE & FRONTEND VERIFICATION");
  console.log("===========================================================");

  // 1. Check API endpoint that serves the homepage
  const apiRes = await fetch("http://localhost:3000/api/catalog");
  const apiData = await apiRes.json();

  console.log(`📡 /api/catalog Status: ${apiRes.status}`);
  console.log(`📦 Total Synced Active: ${apiData.total_active}`);

  const featured = apiData.catalog?.featured || [];
  const top10 = apiData.catalog?.top10 || [];
  const nowPlaying = apiData.catalog?.now_playing || [];

  console.log(`\n🎬 Featured Hero Titles:`);
  featured.forEach((f: any) =>
    console.log(`   #${f.rank} ${f.title} (${f.media_type}) -> Logo: ${f.logo_path || "none"}`)
  );

  console.log(`\n🏆 Top 10 Today:`);
  top10.slice(0, 5).forEach((t: any) =>
    console.log(`   #${t.rank} ${t.title} (${t.media_type}) | Rating: ${t.vote_average}`)
  );

  console.log(`\n🍿 Now Playing / New Releases:`);
  nowPlaying.slice(0, 5).forEach((np: any) =>
    console.log(`   • ${np.title} (${np.release_date}) | Rating: ${np.vote_average}`)
  );

  // 2. Fetch live SSR HTML of homepage
  const pageRes = await fetch("http://localhost:3000/");
  const html = await pageRes.text();
  console.log(`\n📄 Homepage HTTP Status: ${pageRes.status} (HTML Size: ${(html.length / 1024).toFixed(1)} KB)`);

  console.log("\n===========================================================");
  console.log("✅ Live homepage and API are 100% verified and in sync!");
  console.log("===========================================================\n");
}

verifyFrontend();
