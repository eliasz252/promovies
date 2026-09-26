import { NextRequest, NextResponse } from "next/server";
import { runCatalogSync } from "@/lib/sync/catalogSyncEngine";
import { getAllCatalogItems } from "@/lib/sync/catalogStore";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Allow sufficient runtime for fetching TMDB feeds

/**
 * Validates request authorization using CRON_SECRET or dev bypass
 */
function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;

  // In local development or if no CRON_SECRET is configured, allow invocation
  if (!cronSecret || process.env.NODE_ENV !== "production") {
    return true;
  }

  // Check Bearer authorization header (Vercel Cron standard)
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    if (token === cronSecret) return true;
  }

  // Check query parameter (?secret=...)
  const url = new URL(request.url);
  if (url.searchParams.get("secret") === cronSecret) {
    return true;
  }

  return false;
}

/**
 * POST /api/sync
 * Production-grade endpoint to trigger the content sync
 */
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Provide valid Bearer token or ?secret parameter." },
      { status: 401 }
    );
  }

  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Empty or non-JSON body is valid
    }

    const dryRun = Boolean(body.dryRun);
    const downloadImages = Boolean(body.downloadImages);
    const concurrency = typeof body.concurrency === "number" ? body.concurrency : 3;

    console.log(
      `[POST /api/sync] Triggering content sync (dryRun=${dryRun}, concurrency=${concurrency})...`
    );

    const stats = await runCatalogSync({
      dryRun,
      downloadImages,
      concurrency,
    });

    return NextResponse.json(
      {
        message: "Catalog sync executed successfully.",
        stats,
      },
      { status: stats.status === "failed" ? 500 : 200 }
    );
  } catch (err: any) {
    console.error("[POST /api/sync] Execution failed:", err);
    return NextResponse.json(
      {
        error: "Catalog sync failed.",
        message: err.message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/sync
 * Quick status inquiry or manual browser-based trigger
 */
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Provide valid Bearer token or ?secret parameter." },
      { status: 401 }
    );
  }

  const url = new URL(request.url);
  const shouldTrigger = url.searchParams.get("trigger") === "true";

  if (shouldTrigger) {
    const dryRun = url.searchParams.get("dryRun") === "true";
    const stats = await runCatalogSync({ dryRun });
    return NextResponse.json({
      message: "Sync triggered via GET request.",
      stats,
    });
  }

  // Otherwise return status summary of existing items
  const allItems = getAllCatalogItems();
  const counts: Record<string, number> = {};
  for (const item of allItems) {
    if (item.is_active) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
  }

  return NextResponse.json({
    status: "ready",
    total_active_items: allItems.filter((i) => i.is_active).length,
    category_counts: counts,
    hint: "To trigger a live sync, send POST /api/sync or GET /api/sync?trigger=true",
  });
}
