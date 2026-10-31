"use client";

import { X } from "lucide-react";
import { matchPaper, matchResource } from "@/lib/filter";
import { onStrong, strong } from "@/lib/color";
import { scrollToId } from "./primitives";
import { useFilters } from "./UrlStateProvider";
import type { SubjectData } from "@/lib/types";

/** Visible feedback when a topic filter is active (T4.10 item 5 / U-05). */
export function TopicToast({ data }: { data: SubjectData }) {
  const { f, set } = useFilters();
  if (!f.topic) return null;

  const topic = data.topics.find((t) => t.id === f.topic);
  const n = data.resources.filter((r) => r.access !== "dead" && matchResource(r, f)).length;
  const m = data.papers.filter((p) => p.access !== "dead" && matchPaper(p, f)).length;

  return (
    <div
      data-no-print
      className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
    >
      <div className="pointer-events-auto flex max-w-full items-center gap-2.5 rounded-full border border-border bg-card/95 py-2 pl-4 pr-2 shadow-lg backdrop-blur">
        <span className="min-w-0 truncate text-sm text-foreground">
          Showing <b>{n}</b> {n === 1 ? "resource" : "resources"} · <b>{m}</b>{" "}
          {m === 1 ? "paper" : "papers"} for <b>{topic?.name ?? f.topic}</b>
        </span>
        <button
          onClick={() => scrollToId("library")}
          className="inline-flex min-h-10 flex-shrink-0 items-center rounded-full px-4 text-xs font-semibold transition-all hover:brightness-110"
          style={{ background: strong(data.meta.colorVar), color: onStrong }}
        >
          View ↑
        </button>
        <button
          onClick={() => set({ topic: "" }, "push")}
          aria-label="Clear topic filter"
          className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
