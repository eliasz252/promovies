#!/usr/bin/env node

/**
 * ProMovies Production Daily Content Sync CLI Runner
 * Can be run via crontab, systemd timer, Docker, or GitHub Actions.
 *
 * Usage:
 *   npx tsx scripts/daily-sync.ts
 *   npx tsx scripts/daily-sync.ts --dry-run
 *   npx tsx scripts/daily-sync.ts --download-images
 *   npx tsx scripts/daily-sync.ts --concurrency=4
 */

import fs from "fs";
import path from "path";

// Automatically load .env.local and .env if running in a standalone Node script
for (const envFile of [".env.local", ".env"]) {
  const envPath = path.resolve(process.cwd(), envFile);
  if (fs.existsSync(envPath) && typeof (process as any).loadEnvFile === "function") {
    try {
      (process as any).loadEnvFile(envPath);
    } catch {
      // Ignore if already loaded or not readable
    }
  }
}

import { runCatalogSync } from "../lib/sync/catalogSyncEngine";
import { assertTMDBEnvConfig } from "../lib/sync/tmdbClient";

async function main() {
  console.log("\n===========================================================");
  console.log("🎬 PROMOVIES PRODUCTION DAILY CATALOG SYNC");
  console.log("===========================================================");
  console.log(`🕒 Started at: ${new Date().toLocaleString()}`);

  // 1. Loud startup check for TMDB API Credentials
  try {
    const { apiKey, accessToken } = assertTMDBEnvConfig();
    const masked = apiKey
      ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`
      : `Bearer (${accessToken?.slice(0, 8)}...)`;
    console.log(`🔑 TMDB Credentials Verified: ${masked}`);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const downloadImages = args.includes("--download-images");

  let concurrency = 3;
  const concurrencyArg = args.find((a) => a.startsWith("--concurrency="));
  if (concurrencyArg) {
    const val = parseInt(concurrencyArg.split("=")[1], 10);
    if (!isNaN(val) && val > 0) concurrency = val;
  }

  if (dryRun) {
    console.log("🔍 MODE: Dry Run (No disk changes will be committed)");
  }
  if (downloadImages) {
    console.log("🖼️  MODE: Download images locally enabled");
  }
  console.log(`⚡ Concurrency Limit: ${concurrency} parallel requests`);
  console.log("📡 Connecting to TMDB API endpoints...\n");

  try {
    const stats = await runCatalogSync({
      dryRun,
      downloadImages,
      concurrency,
    });

    console.log("-----------------------------------------------------------");
    console.log("📊 SYNC EXECUTION SUMMARY");
    console.log("-----------------------------------------------------------");
    console.log(`Status:              ${stats.status.toUpperCase()}`);
    console.log(`Duration:            ${(stats.duration_ms / 1000).toFixed(2)}s`);
    console.log(`Total Added:         ${stats.total_added}`);
    console.log(`Total Updated:       ${stats.total_updated}`);
    console.log(`Total Removed:       ${stats.total_removed}`);
    console.log(`Log File:            logs/${stats.log_file}`);
    console.log("\n📋 Category Breakdown:");

    for (const [catName, catSummary] of Object.entries(stats.categories)) {
      const modeLabel =
        catSummary.mode === "rebuild"
          ? "[Rebuilt Daily]"
          : "[Soft-Delete Upsert]";
      console.log(
        `   • ${catName.padEnd(14)} ${modeLabel.padEnd(23)} Active: ${String(
          catSummary.total_active
        ).padEnd(4)} (Added: ${catSummary.added}, Updated: ${
          catSummary.updated
        }, Removed: ${catSummary.removed})`
      );
    }

    if (stats.error_messages.length > 0) {
      console.log("\n⚠️ Error Warnings Encountered:");
      stats.error_messages.forEach((msg) => console.log(`   • ${msg}`));
    }

    console.log("\n===========================================================");
    console.log("✅ Daily Content Sync Completed Successfully!");
    console.log("===========================================================\n");

    process.exit(stats.status === "failed" ? 1 : 0);
  } catch (err: any) {
    console.error("\n💥 FATAL SYNC ERROR:", err.message);
    process.exit(1);
  }
}

main();
