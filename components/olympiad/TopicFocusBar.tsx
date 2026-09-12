"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import { scrollToId } from "./primitives";
import { useOlympiadProgress } from "./context";
import type { Olympiad } from "@/lib/data/olympiads";

export function TopicFocusBar({ olympiad }: { olympiad: Olympiad }) {
  const { focusedTopic, clearFocus, matchesFocus } = useOlympiadProgress();

  if (!focusedTopic) return null;

  const c = olympiad.colorVar;
  const resourceCount = olympiad.studyMaterial.filter((r) => matchesFocus(r.topicIds)).length;
  const paperCount = olympiad.modelPapers.filter((p) => matchesFocus(p.topicIds)).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="sticky top-[110px] z-30 border-b border-border bg-background/95 backdrop-blur-md lg:top-[64px]"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-2.5 lg:px-8">
        <span
          className="h-2 w-2 flex-shrink-0 rounded-full"
          style={{ background: `hsl(var(${c}))`, boxShadow: `0 0 10px hsl(var(${c}) / 0.6)` }}
        />
        <span className="truncate font-heading text-sm font-bold text-foreground">
          {focusedTopic.name}
        </span>
        <span className="hidden text-xs text-muted-foreground sm:inline">
          {resourceCount} {resourceCount === 1 ? "resource" : "resources"} · {paperCount}{" "}
          {paperCount === 1 ? "paper" : "papers"}
        </span>

        <div className="ml-auto flex flex-shrink-0 items-center gap-1.5">
          <button
            onClick={() => scrollToId("library")}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Materials
          </button>
          <button
            onClick={() => scrollToId("papers")}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Papers
          </button>
          <button
            onClick={clearFocus}
            aria-label="Clear topic focus"
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}