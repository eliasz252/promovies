#!/usr/bin/env node

/**
 * ProMovies Automated Cron Daemon Worker
 * Runs every 6 hours (configurable via SYNC_INTERVAL_HOURS)
 *
 * Usage:
 *   npx tsx scripts/cron-worker.ts
 *   npm run sync:cron
 *
 * Environment variables:
 *   SYNC_INTERVAL_HOURS: Frequency in hours (default: 6)
 *   RUN_ON_STARTUP: Whether to run immediately on startup (default: true)
 *   TMDB_API_KEY: TMDB API key
 *   DISCORD_WEBHOOK_URL: Discord webhook for new movie notifications
 */

import fs from "fs";
import path from "path";

// Automatically load .env.local and .env
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
import { runCatalogSync } from "../lib/sync/catalogSyncEngine";

const INTERVAL_HOURS = parseFloat(process.env.SYNC_INTERVAL_HOURS || "6");
const INTERVAL_MS = INTERVAL_HOURS * 60 * 60 * 1000;
const RUN_ON_STARTUP = process.env.RUN_ON_STARTUP !== "false";

let isRunning = false;
let timeoutId: NodeJS.Timeout | null = null;

async function executeScheduledSync() {
  if (isRunning) {
    console.log(`[Cron Worker] Previous sync is still running. Skipping trigger.`);
    return;
  }

  isRunning = true;
  const startedAt = new Date();
  console.log("\n=======================================================");
  console.log(`⏰ [Cron Worker] Automated 6-Hour Content Sync Triggered`);
  console.log(`🕒 Timestamp: ${startedAt.toLocaleString()}`);
  console.log("=======================================================");

  try {
    // 1. Sync catalog categories (now_playing, upcoming, top_rated)
    console.log("📡 Step 1: Syncing now_playing & upcoming catalog categories...");
    const catalogStats = await runCatalogSync({ dryRun: false });
    console.log(`✓ Catalog sync finished: ${catalogStats.total_added} added, ${catalogStats.total_updated} updated.`);

    // 2. Sync full movie metadata (trailers, cast, runtime, overview) & dispatch notifications
    console.log("📡 Step 2: Processing detailed movie records & notifications...");
    const movieStats = await runMovieSync();
    console.log(`✓ Movie sync finished: ${movieStats.added} new movies added, ${movieStats.updated} updated.`);

    if (movieStats.added > 0) {
      console.log(`🎉 Success: ${movieStats.added} new movies added and notifications dispatched!`);
    } else {
      console.log(`✨ All titles up to date. No new releases detected.`);
    }
  } catch (err: any) {
    console.error(`💥 [Cron Worker Error]: ${err.message}`);
  } finally {
    isRunning = false;
    const nextRun = new Date(Date.now() + INTERVAL_MS);
    console.log(`-------------------------------------------------------`);
    console.log(`💤 Next scheduled run: ${nextRun.toLocaleString()} (in ${INTERVAL_HOURS} hours)`);
    console.log(`=======================================================\n`);
  }
}

function scheduleNext() {
  timeoutId = setTimeout(async () => {
    await executeScheduledSync();
    scheduleNext();
  }, INTERVAL_MS);
}

// Graceful termination handling
process.on("SIGINT", () => {
  console.log("\n[Cron Worker] Gracefully shutting down worker...");
  if (timeoutId) clearTimeout(timeoutId);
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n[Cron Worker] SIGTERM received. Shutting down worker...");
  if (timeoutId) clearTimeout(timeoutId);
  process.exit(0);
});

async function start() {
  console.log("\n=======================================================");
  console.log("🤖 PROMOVIES AUTOMATED 6-HOUR CRON DAEMON INITIALIZED");
  console.log(`🕒 Frequency: Every ${INTERVAL_HOURS} hours`);
  console.log(`📢 Discord Webhook: ${process.env.DISCORD_WEBHOOK_URL ? "Configured ✅" : "Not configured (optional)"}`);
  console.log(`🔑 TMDB API Key:    ${process.env.TMDB_API_KEY ? "Configured ✅" : "Using failover proxies / mock"}`);
  console.log("=======================================================\n");

  if (RUN_ON_STARTUP) {
    await executeScheduledSync();
  }

  scheduleNext();
}

start();
