/**
 * ProMovies Automated Sync Notifications Engine
 * Supports Discord Webhook, Telegram Bot, and Email Webhooks.
 */

export interface MovieNotificationItem {
  id: number;
  title: string;
  release_date?: string;
  genres?: string[];
  overview?: string;
  poster_path?: string;
  vote_average?: number;
}

export interface NotificationPayload {
  addedMovies: MovieNotificationItem[];
  totalAdded: number;
  totalUpdated?: number;
  totalDiscovered?: number;
  durationMs: number;
  logFile?: string;
  status?: "success" | "partial" | "failed";
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

/**
 * Sends a rich embed notification to a Discord Webhook
 */
export async function sendDiscordNotification(payload: NotificationPayload): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return false;
  }

  // Only notify if new movies were added, or if explicitly configured to report zero-adds
  if (payload.totalAdded === 0 && process.env.NOTIFY_ON_ZERO_ADDS !== "true") {
    return false;
  }

  try {
    const topMovies = payload.addedMovies.slice(0, 5);
    const movieFields = topMovies.map((m) => {
      const year = m.release_date ? ` (${m.release_date.split("-")[0]})` : "";
      const rating = m.vote_average ? ` • ⭐ ${m.vote_average.toFixed(1)}` : "";
      const genres = m.genres && m.genres.length > 0 ? ` • 🏷️ ${m.genres.slice(0, 3).join(", ")}` : "";
      const overview = m.overview
        ? m.overview.length > 120
          ? `${m.overview.slice(0, 120)}...`
          : m.overview
        : "No synopsis available.";

      return {
        name: `🍿 ${m.title}${year}${rating}${genres}`,
        value: overview,
        inline: false,
      };
    });

    const firstPoster = payload.addedMovies.find((m) => m.poster_path)?.poster_path;
    const thumbnailUrl = firstPoster
      ? firstPoster.startsWith("http")
        ? firstPoster
        : `${TMDB_IMAGE_BASE}${firstPoster}`
      : undefined;

    const embed = {
      title: `🎬 ProMovies: ${payload.totalAdded} New Movie${payload.totalAdded === 1 ? "" : "s"} Released & Added!`,
      description: `The automated TMDB discovery sync detected newly released & upcoming titles and updated the database and homepage catalog.`,
      color: 0x7c3aed, // Violet/Purple (ProMovies theme)
      fields: [
        ...movieFields,
        {
          name: "📊 Sync Execution Stats",
          value: `⏱️ **Duration:** ${(payload.durationMs / 1000).toFixed(1)}s\n✨ **New Entries:** ${payload.totalAdded}\n🔄 **Updated:** ${payload.totalUpdated || 0}\n📡 **Discovered:** ${payload.totalDiscovered || payload.totalAdded}`,
          inline: false,
        },
      ],
      thumbnail: thumbnailUrl ? { url: thumbnailUrl } : undefined,
      footer: {
        text: `ProMovies Automated System • ${payload.logFile || "Auto-Sync"}`,
      },
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "ProMovies Catalog Bot",
        avatar_url: "https://image.tmdb.org/t/p/w200/wwemDMDPapqCyZmDh5J1897bEka.jpg",
        embeds: [embed],
      }),
    });

    if (!res.ok) {
      console.warn(`[Discord Webhook] Failed with status HTTP ${res.status}: ${res.statusText}`);
      return false;
    }

    console.log(`[Notification] Discord webhook alert sent successfully (${payload.totalAdded} new movies).`);
    return true;
  } catch (err: any) {
    console.warn("[Notification] Discord webhook dispatch failed:", err.message);
    return false;
  }
}

/**
 * Sends notification via generic Email Webhook / SMTP service
 */
export async function sendEmailNotification(payload: NotificationPayload): Promise<boolean> {
  const emailWebhookUrl = process.env.EMAIL_WEBHOOK_URL;
  const recipientEmail = process.env.NOTIFICATION_EMAIL;

  if (!emailWebhookUrl || !recipientEmail) {
    return false;
  }

  if (payload.totalAdded === 0 && process.env.NOTIFY_ON_ZERO_ADDS !== "true") {
    return false;
  }

  try {
    const movieListHtml = payload.addedMovies
      .slice(0, 10)
      .map(
        (m) =>
          `<li><strong>${m.title}</strong> (${m.release_date || "N/A"}) - ${m.genres?.join(", ") || "General"}<br/><em>${m.overview || ""}</em></li>`
      )
      .join("");

    const body = {
      to: recipientEmail,
      subject: `[ProMovies] ${payload.totalAdded} New Movies Added to Catalog`,
      html: `
        <h2>🎬 ProMovies Automated Catalog Sync Report</h2>
        <p>The scheduled sync just completed with status: <strong>${payload.status || "success"}</strong>.</p>
        <ul>
          <li><strong>New Movies Added:</strong> ${payload.totalAdded}</li>
          <li><strong>Duration:</strong> ${(payload.durationMs / 1000).toFixed(1)}s</li>
        </ul>
        <h3>Newly Added Titles:</h3>
        <ul>${movieListHtml}</ul>
      `,
    };

    const res = await fetch(emailWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return res.ok;
  } catch (err: any) {
    console.warn("[Notification] Email webhook dispatch failed:", err.message);
    return false;
  }
}

/**
 * Sends Telegram notification
 */
export async function sendTelegramNotification(payload: NotificationPayload): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  if (payload.totalAdded === 0 && process.env.NOTIFY_ON_ZERO_ADDS !== "true") {
    return false;
  }

  try {
    const titles = payload.addedMovies.slice(0, 5).map((m) => `• ${m.title} (${m.release_date || "N/A"})`).join("\n");
    const text =
      `🎬 *ProMovies Daily Update Summary*\n` +
      `📅 *Date:* ${new Date().toISOString().split("T")[0]}\n` +
      `⏱️ *Duration:* ${(payload.durationMs / 1000).toFixed(1)}s\n\n` +
      `✨ *Added:* ${payload.totalAdded} new movies\n` +
      `🔄 *Updated:* ${payload.totalUpdated || 0} movies\n\n` +
      (titles ? `*Top New Releases:*\n${titles}\n\n` : "") +
      `📁 Log: \`${payload.logFile || "sync.log"}\``;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });
    return true;
  } catch (err: any) {
    console.warn("[Notification] Telegram dispatch failed:", err.message);
    return false;
  }
}

/**
 * Dispatches alerts across all configured notification channels concurrently
 */
export async function sendAllSyncNotifications(payload: NotificationPayload): Promise<void> {
  await Promise.allSettled([
    sendDiscordNotification(payload),
    sendEmailNotification(payload),
    sendTelegramNotification(payload),
  ]);
}
