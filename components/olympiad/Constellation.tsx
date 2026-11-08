"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { strong } from "@/lib/color";
import { firstLevel, layoutTopics, RING_R } from "@/lib/layout";
import { SectionHeading, scrollToId } from "./primitives";
import { useFilters } from "./UrlStateProvider";
import type { Level, SubjectData, Topic } from "@/lib/types";

const LEVELS: Level[] = ["district", "province", "national", "international"];

export function Constellation({ data }: { data: SubjectData }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState<string | null>(null);
  const { f, set } = useFilters();
  const { meta, topics } = data;
  const c = meta.colorVar;

  const pos = useMemo(() => layoutTopics(topics), [topics]);

  const ringGroups = useMemo(() => {
    const m = new Map<Level, Topic[]>();
    topics.forEach((t) => m.set(firstLevel(t), [...(m.get(firstLevel(t)) ?? []), t]));
    return m;
  }, [topics]);

  // Edges only from declared prereqs — never invent dependencies (T4.10 rule 3)
  const edges = useMemo(
    () =>
      topics.flatMap((t) =>
        (t.prereqs ?? []).filter((p) => pos[p]).map((p) => ({ from: p, to: t.id }))
      ),
    [topics, pos]
  );

  const isDimmed = (t: Topic) => {
    if (!f.topic || f.topic === t.id || edges.length === 0) return false;
    return !edges.some(
      (e) => (e.from === f.topic && e.to === t.id) || (e.to === f.topic && e.from === t.id)
    );
  };

  // Crowded rings (≥7 nodes) get alternating radial labels so they don't collide
  const labelPos = (t: Topic) => {
    const p = pos[t.id];
    if (!p) return null;
    const crowded = (ringGroups.get(p.ring)?.length ?? 0) >= 7;
    if (!crowded) return { x: p.x, y: p.y + 7.5 };
    const dx = p.x - 50;
    const dy = (p.y - 50) * 1.05;
    const n = Math.sqrt(dx * dx + dy * dy) || 1;
    const idx = ringGroups.get(p.ring)?.findIndex((x) => x.id === t.id) ?? 0;
    const off = idx % 2 === 0 ? 13 : -11.5;
    return { x: p.x + (dx / n) * off, y: p.y + (dy / n) * off * 0.95 };
  };

  const toggle = (id: string) => set({ topic: f.topic === id ? "" : id }, "push");

  return (
    <section
      id="constellation"
      aria-labelledby="constellation-title"
      className="section-anchor relative overflow-hidden py-20 lg:py-28"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          label="The Constellation"
          title="How the topics connect"
          titleId="constellation-title"
          colorVar={c}
          description={`Every official ${meta.name} topic, placed on the round that examines it first.`}
        />

        {topics.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">Topic map coming soon</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              The official {meta.name} taxonomy is being transcribed. The syllabus section below
              already lists every examined topic.
            </p>
            <button
              onClick={() => scrollToId("syllabus")}
              className="mt-6 inline-flex min-h-10 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              See the syllabus
            </button>
          </div>
        ) : (
          <>
            {/* ── Desktop / tablet map ── */}
            <div
              ref={ref}
              className="relative hidden rounded-2xl border border-border bg-card/40 p-6 md:block lg:p-10"
            >
              <div className="relative aspect-[16/9] lg:aspect-[16/8]">
                {/* rings + prereq edges */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  {LEVELS.map((lv) => (
                    <ellipse
                      key={lv}
                      cx="50"
                      cy="50"
                      rx={RING_R[lv] * 46}
                      ry={RING_R[lv] * 44}
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="1"
                      strokeDasharray="1 6"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                  {edges.map((e) => {
                    const a = pos[e.from];
                    const b = pos[e.to];
                    if (!a || !b) return null;
                    const active =
                      f.topic === e.from ||
                      f.topic === e.to ||
                      hovered === e.from ||
                      hovered === e.to;
                    return (
                      <motion.line
                        key={`${e.from}-${e.to}`}
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        vectorEffect="non-scaling-stroke"
                        stroke={active ? strong(c) : "hsl(var(--border))"}
                        strokeWidth={active ? 1.5 : 1}
                        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: reduce ? 0 : 0.8, ease: "easeOut" }}
                        style={{ transition: "stroke 0.3s" }}
                      />
                    );
                  })}
                </svg>

                {/* ring labels — the subject's own level names */}
                {LEVELS.map((lv, i) => (
                  <span
                    key={lv}
                    aria-hidden
                    title={meta.levels[lv].label}
                    className="absolute left-1/2 max-w-[46%] -translate-x-1/2 truncate text-xs font-medium uppercase tracking-wide text-muted-foreground/80"
                    style={{ top: `${50 - RING_R[lv] * 44 + (i === 0 ? 2.5 : -3.2)}%` }}
                  >
                    {meta.levels[lv].label}
                  </span>
                ))}

                {/* nodes */}
                {topics.map((t, i) => {
                  const p = pos[t.id];
                  if (!p) return null;
                  const active = f.topic === t.id;
                  const dimmed = isDimmed(t);
                  return (
                    <motion.button
                      key={t.id}
                      initial={reduce ? false : { scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: dimmed ? 0.4 : 1 } : {}}
                      transition={{
                        duration: reduce ? 0 : 0.35,
                        delay: reduce ? 0 : 0.2 + i * 0.04,
                        ease: "easeOut",
                      }}
                      onMouseEnter={() => setHovered(t.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(t.id)}
                      onBlur={() => setHovered(null)}
                      onClick={() => toggle(t.id)}
                      aria-pressed={active}
                      aria-label={`${t.name}, ${t.subtopics.length} sub-topics${
                        t.levels.length > 1
                          ? `. Also examined at ${t.levels
                              .slice(1)
                              .map((lv) => meta.levels[lv].label)
                              .join(", ")}`
                          : ""
                      }. Filters the library and papers.`}
                      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 before:absolute before:-inset-3 before:content-['']"
                      style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        opacity: dimmed ? 0.4 : 1,
                        transition: "opacity 0.3s",
                      }}
                    >
                      <span className="relative block">
                        <span
                          className="absolute -inset-2 rounded-full transition-opacity"
                          style={{
                            background: `hsl(var(${c}) / 0.15)`,
                            filter: "blur(6px)",
                            opacity: active || hovered === t.id ? 1 : 0,
                          }}
                        />
                        <span
                          className={cn(
                            "relative block rounded-full transition-transform",
                            active || hovered === t.id ? "scale-125" : "scale-100",
                            t.featured ? "h-3.5 w-3.5" : "h-2.5 w-2.5"
                          )}
                          style={{
                            background: `hsl(var(${c}))`,
                            boxShadow: `0 0 12px hsl(var(${c}) / ${active ? 0.8 : 0.55})`,
                          }}
                        />
                        {active && (
                          <span
                            className="absolute -inset-[7px] rounded-full border"
                            style={{ borderColor: `hsl(var(${c}-strong) / 0.5)` }}
                          />
                        )}
                        {/* pips: additional levels beyond the ring's (R-C4 "level ring") */}
                        {t.levels.length > 1 && (
                          <span
                            aria-hidden
                            className="absolute left-1/2 top-full mt-1 flex -translate-x-1/2 gap-0.5"
                          >
                            {t.levels.slice(1).map((lv) => (
                              <span
                                key={lv}
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: `hsl(var(${c}) / 0.75)` }}
                                title={meta.levels[lv].label}
                              />
                            ))}
                          </span>
                        )}
                      </span>
                    </motion.button>
                  );
                })}

                {/* labels (separate layer so they can sit radially without blocking clicks) */}
                <div className="pointer-events-none absolute inset-0" aria-hidden>
                  {topics.map((t) => {
                    const lp = labelPos(t);
                    if (!lp) return null;
                    const active = f.topic === t.id;
                    const dimmed = isDimmed(t);
                    return (
                      <span
                        key={t.id}
                        title={t.name}
                        className={cn(
                          "absolute max-w-[104px] -translate-x-1/2 -translate-y-1/2 text-center text-xs leading-tight transition-opacity line-clamp-3",
                          active
                            ? "font-semibold text-foreground"
                            : hovered === t.id
                              ? "text-foreground"
                              : "text-muted-foreground",
                          dimmed && "opacity-40"
                        )}
                        style={{ left: `${lp.x}%`, top: `${lp.y}%` }}
                      >
                        {t.name}
                        <span className="block text-muted-foreground/90">
                          {t.subtopics.length} sub-topics
                        </span>
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <span className="uppercase tracking-[0.2em]">Skill map · {topics.length} topics</span>
                <span>
                  {f.topic
                    ? "Click the highlighted node again to clear the filter."
                    : "Click a topic to filter the library and papers. Rings show which round examines it first."}
                </span>
              </div>
            </div>

            {/* ── Mobile: vertical list grouped by level ── */}
            <div className="md:hidden">
              {LEVELS.map((lv) => {
                const items = topics.filter((t) => firstLevel(t) === lv);
                if (items.length === 0) return null;
                return (
                  <div key={lv} className="mb-6">
                    <h3 className="mb-2 font-heading text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {meta.levels[lv].label}
                    </h3>
                    <ol className="space-y-1 border-l border-border pl-4">
                      {items.map((t) => {
                        const active = f.topic === t.id;
                        return (
                          <li key={t.id} className="relative">
                            <span
                              aria-hidden
                              className="absolute -left-[21px] top-4 h-2 w-2 rounded-full"
                              style={{ background: active ? strong(c) : `hsl(var(${c}) / 0.5)` }}
                            />
                            <button
                              onClick={() => toggle(t.id)}
                              aria-pressed={active}
                              className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-1 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
                            >
                              <span
                                className={cn(
                                  "text-sm font-semibold",
                                  active ? "text-foreground" : "text-foreground/85"
                                )}
                              >
                                {t.name}
                              </span>
                              <span className="whitespace-nowrap text-xs text-muted-foreground">
                                {t.subtopics.length} sub-topics
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
