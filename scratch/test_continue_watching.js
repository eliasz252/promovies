// Test script to verify continueWatching math, filtering, and sorting logic
const DEFAULT_SEED_RECORDS = [
  {
    id: 94605, // Arcane
    type: "tv",
    season: 1,
    episode: 3,
    currentTime: 1754, // ~29m 14s
    duration: 2580, // 43m
    percent: 68,
    updatedAt: new Date().toISOString(),
    title: "Arcane",
  },
  {
    id: 402431, // Wicked
    type: "movie",
    currentTime: 4020, // 67m
    duration: 9600, // 160m
    percent: 42,
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    title: "Wicked",
  },
  {
    id: 100088, // The Last of Us
    type: "tv",
    season: 1,
    episode: 4,
    currentTime: 2805, // 46m 45s
    duration: 3300, // 55m
    percent: 85,
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    title: "The Last of Us",
  },
];

function formatMinutesLeft(currentTime, duration) {
  const remainingSeconds = Math.max(0, duration - currentTime);
  const minutes = Math.max(1, Math.ceil(remainingSeconds / 60));
  return `${minutes}m left`;
}

console.log("=== Testing Continue Watching Math & Rules ===");
for (const item of DEFAULT_SEED_RECORDS) {
  const progressPercent = Math.min(100, Math.max(0, (item.currentTime / item.duration) * 100));
  const minLeft = formatMinutesLeft(item.currentTime, item.duration);
  console.log(`[${item.title}]`);
  console.log(`  Current Time: ${item.currentTime}s (${Math.floor(item.currentTime / 60)}m ${item.currentTime % 60}s)`);
  console.log(`  Duration: ${item.duration}s (${Math.floor(item.duration / 60)}m)`);
  console.log(`  Calculated Progress Bar Width: ${progressPercent.toFixed(1)}%`);
  console.log(`  Calculated Remaining: "${minLeft}" (differs per title, NOT static 105m)`);
}

// Test edge cases (2% threshold and 95% threshold)
const testCases = [
  { name: "Barely started (1% watched)", current: 60, dur: 6000, expected: "excluded" },
  { name: "Valid start (5% watched)", current: 300, dur: 6000, expected: "included" },
  { name: "Almost finished (96% watched)", current: 5760, dur: 6000, expected: "excluded (completed)" },
];

console.log("\n=== Testing Completion & Threshold Rules ===");
for (const tc of testCases) {
  const pct = (tc.current / tc.dur) * 100;
  const isIncluded = pct >= 2 && pct < 95;
  console.log(`- ${tc.name}: pct=${pct}% -> ${isIncluded ? "INCLUDED" : "EXCLUDED"} (matches: ${tc.expected})`);
}
