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

const FMT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-05-13/2026-05-22" → "13 May 2026 – 22 May 2026"; null → "Date not announced". */
export function formatIso(iso: string | null): string {
  if (!iso) return "Date not announced";
  const parts = iso.split("/").map((p) => new Date(`${p}T00:00:00Z`));
  if (parts.some((d) => Number.isNaN(d.getTime()))) return iso;
  return parts.map((d) => FMT.format(d)).join(" – ");
}
