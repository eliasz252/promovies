import fs from "fs";
import path from "path";

// Automatically load .env.local and .env if running in a standalone Node script
for (const envFile of [".env.local", ".env"]) {
  const envPath = path.resolve(process.cwd(), envFile);
  if (fs.existsSync(envPath) && typeof (process as any).loadEnvFile === "function") {
    try {
      (process as any).loadEnvFile(envPath);
    } catch {
      // Ignore
    }
  }
}

import { runMovieSync } from "../lib/sync/movieSyncEngine";

async function main() {
  console.log("\n=======================================================");
  console.log("🎬 PROMOVIES AUTOMATIC MOVIE UPDATE SYSTEM");
  console.log("=======================================================");
  console.log(`🕒 Starting at: ${new Date().toLocaleString()}`);
  console.log("📡 Connecting to TMDB API & discovering new releases...\n");

  const downloadImages = process.argv.includes("--download-images");

  try {
    const stats = await runMovieSync({ downloadImages });

    console.log("\n-------------------------------------------------------");
    console.log("📊 SYNC EXECUTION RESULTS");
    console.log("-------------------------------------------------------");
    console.log(`⏱️  Duration:           ${(stats.duration_ms / 1000).toFixed(1)}s`);
    console.log(`🔍 Total Discovered:   ${stats.total_discovered}`);
    console.log(`✨ Newly Added:        ${stats.added}`);
    console.log(`🔄 Updated:            ${stats.updated}`);
    console.log(`⏭️  Skipped:            ${stats.skipped} (missing poster/title)`);
    console.log(`⚡ Unchanged:          ${stats.unchanged}`);
    console.log(`❌ Errors:             ${stats.errors}`);
    console.log(`📁 Log File:           logs/${stats.log_file}`);

    if (stats.added_titles.length > 0) {
      console.log("\n✨ Newly Added Movies:");
      stats.added_titles.slice(0, 10).forEach((t, i) => console.log(`   ${i + 1}. ${t}`));
      if (stats.added_titles.length > 10) {
        console.log(`   ...and ${stats.added_titles.length - 10} more`);
      }
    }

    if (stats.error_messages.length > 0) {
      console.log("\n⚠️ Error Warnings:");
      stats.error_messages.slice(0, 5).forEach((msg) => console.log(`   • ${msg}`));
    }

    console.log("\n=======================================================");
    console.log("✅ Daily Sync Complete!");
    console.log("=======================================================\n");

    process.exit(stats.errors > 0 ? 1 : 0);
  } catch (err) {
    console.error("\n💥 FATAL ERROR during sync execution:", err);
    process.exit(1);
  }
}

main();
