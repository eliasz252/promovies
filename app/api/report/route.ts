import { NextRequest, NextResponse } from "next/server";
import { ReportPayload } from "@/types/tmdb";

export async function POST(request: NextRequest) {
  try {
    const body: ReportPayload = await request.json();

    if (!body.mediaTitle || !body.issueType) {
      return NextResponse.json(
        { error: "Missing required fields: mediaTitle and issueType are required." },
        { status: 400 }
      );
    }

    // In a production app, this would log to a database or alerting channel (e.g., Slack/Sentry)
    console.log("[ProMovies Issue Report Received]", {
      mediaId: body.mediaId,
      mediaTitle: body.mediaTitle,
      issueType: body.issueType,
      description: body.description,
      userEmail: body.userEmail || "anonymous",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for helping us improve ProMovies! Your report has been submitted to our streaming engineering team.",
      ticketId: `PRO-${Math.floor(100000 + Math.random() * 900000)}`,
    });
  } catch {
    return NextResponse.json({ error: "Failed to process issue report" }, { status: 500 });
  }
}
