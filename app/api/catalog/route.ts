import { NextRequest, NextResponse } from "next/server";
import { getCatalogByCategory, getAllCatalogItems, getLastSyncTime } from "@/lib/sync/catalogStore";
import { CatalogCategory } from "@/lib/sync/catalogTypes";
import { runCatalogSync } from "@/lib/sync/catalogSyncEngine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let isSyncRunning = false;

const VALID_CATEGORIES: CatalogCategory[] = [
  "featured",
  "top10",
  "upcoming",
  "now_playing",
  "top_rated",
  "trending_tv",
  "trending_movies",
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryParam = searchParams.get("category") as CatalogCategory | null;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;
    const activeOnly = searchParams.get("includeInactive") !== "true";
    const forceRefresh = searchParams.get("refresh") === "true";

    // Check data freshness: if stale (>4 hours) or empty, trigger sync
    const lastSync = getLastSyncTime();
    const now = Date.now();
    const isStale = !lastSync || now - lastSync > 4 * 60 * 60 * 1000;

    let all = getAllCatalogItems().filter((item) => (activeOnly ? item.is_active : true));

    if ((all.length === 0 || forceRefresh) && !isSyncRunning) {
      isSyncRunning = true;
      try {
        await runCatalogSync({ dryRun: false });
        all = getAllCatalogItems().filter((item) => (activeOnly ? item.is_active : true));
      } catch (err) {
        console.warn("[Catalog API] Sync failed during request:", err);
      } finally {
        isSyncRunning = false;
      }
    } else if (isStale && !isSyncRunning) {
      // Stale-while-revalidate: return current data immediately, trigger sync in background
      isSyncRunning = true;
      runCatalogSync({ dryRun: false })
        .catch((err) => console.warn("[Catalog API] Background sync failed:", err))
        .finally(() => {
          isSyncRunning = false;
        });
    }

    if (categoryParam) {
      if (!VALID_CATEGORIES.includes(categoryParam)) {
        return NextResponse.json(
          {
            error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}`,
          },
          { status: 400 }
        );
      }

      const items = getCatalogByCategory(categoryParam, activeOnly, limit);
      return NextResponse.json({
        category: categoryParam,
        count: items.length,
        results: items,
      });
    }

    // If no category specified, return grouped map of all active categories
    const grouped: Record<CatalogCategory, typeof all> = {
      featured: [],
      top10: [],
      now_playing: [],
      trending_tv: [],
      upcoming: [],
      top_rated: [],
      trending_movies: [],
    };

    for (const item of all) {
      if (grouped[item.category]) {
        grouped[item.category].push(item);
      }
    }

    // Sort each category by rank or vote_average
    for (const cat of VALID_CATEGORIES) {
      grouped[cat].sort((a, b) => {
        if (a.rank !== null && b.rank !== null) return a.rank - b.rank;
        if (a.rank !== null) return -1;
        if (b.rank !== null) return 1;
        return (b.vote_average || 0) - (a.vote_average || 0);
      });
      if (limit) {
        grouped[cat] = grouped[cat].slice(0, limit);
      }
    }

    return NextResponse.json({
      total_active: all.length,
      catalog: grouped,
    });
  } catch (err: any) {
    console.error("[Catalog API] Error:", err);
    return NextResponse.json(
      { error: "Internal server error", message: err.message },
      { status: 500 }
    );
  }
}
