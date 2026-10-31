"use client";

import { useEffect, useState } from "react";
import { Timer as TimerIcon } from "lucide-react";
import { formatTime, remainingMs, useTimer } from "@/lib/progress/timer";

export function MiniTimer({ onOpen }: { onOpen: (paperId: string) => void }) {
  const timer = useTimer();
  const [, force] = useState(0);

  useEffect(() => {
    if (!timer || timer.status !== "running") return;
    const id = setInterval(() => force((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, [timer?.status, timer?.paperId]);

  if (!timer || timer.status === "finished") return null;

  const rem = timer.status === "running" ? remainingMs(timer) : timer.pausedRemainingMs ?? 0;

  return (
    <button
      data-no-print
      onClick={() => onOpen(timer.paperId)}
      aria-label={`Timer for ${timer.title}: ${formatTime(rem)} remaining. Open timer.`}
      className="fixed bottom-4 left-4 z-40 flex min-h-11 items-center gap-2 rounded-full border border-border bg-card/95 px-4 py-2 shadow-lg backdrop-blur transition-colors hover:bg-card"
    >
      <TimerIcon className="h-4 w-4 text-primary" />
      <span className="font-heading text-sm font-bold tabular-nums text-foreground">
        {formatTime(rem)}
      </span>
      <span className="hidden max-w-[150px] truncate text-xs text-muted-foreground sm:inline">
        {timer.status === "paused" ? "Paused · " : ""}
        {timer.title}
      </span>
    </button>
  );
}
