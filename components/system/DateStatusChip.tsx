"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { dateStatus, statusLabel } from "@/lib/date";
import type { DateStatus } from "@/lib/types";

export function DateStatusChip({
  iso,
  fallback = "unknown",
}: {
  iso: string | null;
  fallback?: DateStatus;
}) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);
  const s = dateStatus(iso, fallback, now);

  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-muted-foreground">
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          s === "upcoming" ? "bg-emerald-500" : s === "past" ? "bg-muted-foreground/50" : "bg-border"
        )}
      />
      {statusLabel(s)}
    </span>
  );
}
