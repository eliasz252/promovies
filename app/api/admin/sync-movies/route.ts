import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { runMovieSync } from "@/lib/sync/movieSyncEngine";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes on Vercel Pro/Enterprise or VPS

export async function POST(req: NextRequest) {
  return handleSync(req);
}

export async function GET(req: NextRequest) {
  return handleSync(req);
}

async function handleSync(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const url = new URL(req.url);
  const querySecret = url.searchParams.get("secret") || url.searchParams.get("key");
  const configuredSecret = process.env.CRON_SECRET || process.env.ADMIN_SECRET || "promovies-sync-secret-2026";

  // Authenticate request
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
  const isAuthorized = bearerToken === configuredSecret || querySecret === configuredSecret;

  if (!isAuthorized && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Unauthorized: Invalid or missing secret token." },
      { status: 401 }
    );
  }

  const downloadImages = url.searchParams.get("download_images") === "true";

  try {
    const stats = await runMovieSync({ downloadImages });

    // Optional: Revalidate Next.js cache so visitors immediately see new movies
    try {
      revalidatePath("/");
      revalidatePath("/movies");
      revalidatePath("/new-and-popular");
    } catch (e) {
      console.warn("[Cache] Revalidation warning:", e);
    }

    return NextResponse.json({
      success: true,
      message: `Daily movie sync complete. Added: ${stats.added}, Updated: ${stats.updated}, Skipped: ${stats.skipped}`,
      stats,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to execute movie sync",
      },
      { status: 500 }
    );
  }
}
