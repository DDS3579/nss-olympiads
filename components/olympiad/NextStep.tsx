"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { scrollToId } from "./primitives";
import { useOlympiadProgress } from "./context";
import type { Olympiad } from "@/lib/data/olympiads";

export function NextStep({ olympiad }: { olympiad: Olympiad }) {
  const { nextTopic, percent, toggle } = useOlympiadProgress();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 pb-[env(safe-area-inset-bottom)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-xs">
      <FadeIn y={20}>
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Next
            </div>
            {nextTopic ? (
              <>
                <div className="truncate font-heading font-semibold text-foreground">
                  {nextTopic.name}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {nextTopic.subtopics[0]}
                </div>
              </>
            ) : (
              <div className="font-heading font-semibold text-foreground">
                All topics started
              </div>
            )}
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${percent}%`,
                  background: `hsl(var(${olympiad.colorVar}))`,
                }}
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
            {nextTopic && (
              <button
                onClick={() => {
                  toggle(nextTopic.id);
                  scrollToId(`topic-${nextTopic.id}`);
                }}
                className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
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