export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatYear(dateStr?: string): string {
  if (!dateStr) return "";
  return dateStr.split("-")[0];
}

export function formatRuntime(mins?: number): string {
  if (!mins) return "";
  const hours = Math.floor(mins / 60);
  const remaining = mins % 60;
  if (hours === 0) return `${remaining}m`;
  return `${hours}h ${remaining}m`;
}

export function formatScore(score?: number): string {
  if (!score) return "N/A";
  return score.toFixed(1);
}
