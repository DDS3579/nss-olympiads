"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { scrollToId } from "./primitives";
import { useOlympiadProgress } from "./context";
import type { Olympiad } from "@/lib/data/olympiads";

const TYPE_LABEL: Record<string, string> = {
  topic: "Topic",
  resource: "Study material",
  paper: "Model paper",
};

export function NextStep({ olympiad }: { olympiad: Olympiad }) {
  const { nextAction, percent, toggleTopic, hasStarted } = useOlympiadProgress();
  const [dismissed, setDismissed] = useState(false);
  const c = olympiad.colorVar;

  // Only show after the student has begun — first-timers see the Resume panel CTA
  if (dismissed || !hasStarted) return null;

  const handleContinue = () => {
    if (!nextAction) return;
    if (nextAction.type === "topic") {
      toggleTopic(nextAction.id, nextAction.label);
      scrollToId(`topic-${nextAction.id}`);
    } else if (nextAction.type === "resource") {
      scrollToId("library");
    } else {
      scrollToId("papers");
    }
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 pb-[env(safe-area-inset-bottom)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-xs">
      <FadeIn y={20}>
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Next
            </div>
            {nextAction ? (
              <>
                <div className="truncate font-heading font-semibold text-foreground">
                  {nextAction.label}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {TYPE_LABEL[nextAction.type]}
                </div>
              </>
            ) : (
              <div className="font-heading font-semibold text-foreground">All explored</div>
            )}
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${percent}%`, background: `hsl(var(${c}))` }}
              />
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss next step"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            {nextAction && (
              <button
                onClick={handleContinue}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110"
                style={{ backgroundColor: `hsl(var(${c}))` }}
              >
                Continue <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}