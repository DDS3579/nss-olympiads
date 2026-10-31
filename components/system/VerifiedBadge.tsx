"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, RefreshCw } from "lucide-react";

function fmt(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/** "Verified 22 Oct 2026" — flips to amber "Re-check link" after 120 days (computed, not typed). */
export function VerifiedBadge({ verified }: { verified: string }) {
  const [stale, setStale] = useState(false); // SSR + first paint agree (false) → no mismatch

  useEffect(() => {
    const t = new Date(`${verified}T00:00:00`).getTime();
    if (!Number.isNaN(t)) setStale((Date.now() - t) / 86_400_000 > 120);
  }, [verified]);

  return stale ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400">
      <RefreshCw aria-hidden className="h-3.5 w-3.5" />
      Re-check link — last verified {fmt(verified)}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <BadgeCheck aria-hidden className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
      Verified {fmt(verified)}
    </span>
  );
}
