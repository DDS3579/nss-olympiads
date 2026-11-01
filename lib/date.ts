import type { DateStatus } from "@/lib/types";

/** Upcoming / Last held — computed from the ISO date at render time,
 *  so statuses never go stale between deploys (U-26). */
export function dateStatus(iso: string | null, fallback: DateStatus, now: number | null): DateStatus {
  if (!iso) return fallback;
  if (now == null) return fallback; // SSR-safe first paint
  const end = new Date(`${iso.split("/").pop()}T23:59:59`).getTime();
  return Number.isNaN(end) ? fallback : end >= now ? "upcoming" : "past";
}

export function statusLabel(s: DateStatus): string {
  return s === "upcoming" ? "Upcoming" : s === "past" ? "Last held" : "Date not announced";
}
