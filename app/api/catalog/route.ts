import { NextRequest, NextResponse } from "next/server";
import { getCatalogByCategory, getAllCatalogItems } from "@/lib/sync/catalogStore";
import { CatalogCategory } from "@/lib/sync/catalogTypes";

export const dynamic = "force-dynamic";

const VALID_CATEGORIES: CatalogCategory[] = [
  "featured",
  "top10",
  "upcoming",
  "now_playing",
  "top_rated",
  "trending_tv",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get("category") as CatalogCategory | null;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;
  const activeOnly = searchParams.get("includeInactive") !== "true";

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
  const all = getAllCatalogItems().filter((item) => (activeOnly ? item.is_active : true));
  const grouped: Record<CatalogCategory, typeof all> = {
    featured: [],
    top10: [],
    now_playing: [],
    trending_tv: [],
    upcoming: [],
    top_rated: [],
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
}
