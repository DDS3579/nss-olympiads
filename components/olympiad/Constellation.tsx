"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/FadeIn";
import { Motif, SectionHeading, scrollToId } from "./primitives";
import type { Olympiad } from "@/lib/data/olympiads";

export function Constellation({ olympiad }: { olympiad: Olympiad }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState<string | null>(null);

  const { topics, edges, colorVar, motif } = olympiad;
  const byId = Object.fromEntries(topics.map((t) => [t.id, t]));
  const isEdgeActive = (e: { from: string; to: string }) =>
    hovered !== null && (e.from === hovered || e.to === hovered);

  return (
    <section
      id="constellation"
      className="section-anchor relative overflow-hidden py-20 lg:py-28"
    >
      <Motif
        motif={motif}
        className="absolute bottom-0 left-0 h-64 w-64 opacity-[0.04]"
        style={{ color: `hsl(var(${colorVar}))` }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          label="The Constellation"
          title="How the topics connect"
          description="Each node is a topic. Follow the lines to see how ideas build on each other."
        />

        {/* Desktop / tablet — freeform interactive map */}
        <div
          ref={ref}
          className="relative hidden rounded-2xl border border-border bg-card/40 p-6 md:block lg:p-10"
        >
          <div className="relative aspect-[16/9] lg:aspect-[16/8]">
            {/* connecting lines */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {edges.map((e, i) => {
                const a = byId[e.from];
                const b = byId[e.to];
                if (!a || !b) return null;
                const active = isEdgeActive(e);
                return (
                  <motion.line
                    key={`${e.from}-${e.to}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    vectorEffect="non-scaling-stroke"
                    stroke={active ? `hsl(var(${colorVar}))` : `hsl(var(--border))`}
                    strokeWidth={active ? 1.5 : 1}
                    strokeDasharray={active ? undefined : "1 6"}
                    initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{
                      duration: reduce ? 0 : 0.9,
                      delay: reduce ? 0 : 0.15 * i,
                      ease: "easeOut",
                    }}
                    style={{ transition: "stroke 0.3s" }}
                  />
                );
              })}
            </svg>

            {/* topic nodes */}
            {topics.map((t, i) => {
              const active = hovered === t.id;
              return (
                <motion.button
                  key={t.id}
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    duration: reduce ? 0 : 0.4,
                    delay: reduce ? 0 : 0.3 + 0.08 * i,
                    ease: "easeOut",
                  }}
                  onMouseEnter={() => setHovered(t.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(t.id)}
                  onBlur={() => setHovered(null)}
                  onClick={() => scrollToId(`topic-${t.id}`)}
                  aria-label={`${t.name}, ${t.problems} problems. Jump to topic.`}
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 focus:outline-none"
                  style={{ left: `${t.x}%`, top: `${t.y}%` }}
                >
                  <span className="relative block">
                    <span
                      className="absolute -inset-2 rounded-full transition-opacity"
                      style={{
                        background: `hsl(var(${colorVar}) / 0.15)`,
                        filter: "blur(6px)",
                        opacity: active ? 1 : 0,
                      }}
                    />
                    <span
                      className={
                        "relative block rounded-full transition-transform " +
                        (active ? "scale-125 " : "scale-100 ") +
                        (t.featured ? "h-3.5 w-3.5" : "h-2.5 w-2.5")
                      }
                      style={{
                        background: `hsl(var(${colorVar}))`,
                        boxShadow: `0 0 12px hsl(var(${colorVar}) / 0.6)`,
                      }}
                    />
                  </span>
                  <span
                    className={
                      "whitespace-nowrap font-heading text-[11px] font-semibold tracking-wide transition-colors " +
                      (active || t.featured ? "text-foreground" : "text-muted-foreground")
                    }
                  >
                    {t.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
            <span className="uppercase tracking-[0.2em]">
              Skill map · {topics.length} nodes
            </span>
            <span>Hover to trace connections · click to jump to a topic</span>
          </div>
        </div>

        {/* Mobile — vertical, staged constellation */}
        <div className="md:hidden">
          <ol className="relative ml-2 space-y-6 border-l border-border pl-6">
            {topics.map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.06}>
                <li className="relative">
                  <span
                    className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full"
                    style={{ background: `hsl(var(${colorVar}))` }}
                  />
                  <button
                    onClick={() => scrollToId(`topic-${t.id}`)}
                    className="group w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-semibold text-foreground transition-colors group-hover:text-primary">
                        {t.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {t.problems} problems
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{t.blurb}</span>
                  </button>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}