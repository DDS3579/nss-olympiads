"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/FadeIn";
import { DifficultyMeter, SectionHeading } from "./primitives";
import type { Olympiad } from "@/lib/data/olympiads";

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

export function FeaturedProblem({ olympiad }: { olympiad: Olympiad }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const p = olympiad.featuredProblem;
  const c = olympiad.colorVar;

  return (
    <section id="problem" className="section-anchor py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          index="04"
          label="Featured Problem"
          title="This week's challenge"
          description={`A representative problem from ${olympiad.name}.`}
          colorVar={c}
        />

        <FadeIn>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid lg:grid-cols-[1fr_260px]">
              <div className="p-7 lg:p-10">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span style={{ color: `hsl(var(${c}))` }}>
                    {p.topic}
                  </span>
                  <span>·</span>
                  <span>{p.source}</span>
                </div>

                <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-4 leading-relaxed text-foreground/85">{p.statement}</p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <DifficultyMeter level={p.difficulty} colorVar={c} />
                  <button
                    onClick={() => setOpen((o) => !o)}
                    className="text-sm font-semibold hover:underline"
                    style={{ color: `hsl(var(${c}))` }}
                  >
                    {open ? "Hide hint" : "Reveal hint"}
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.3 }}
                      className="overflow-hidden"
                    >
                      <p
                        className="mt-4 border-l-2 pl-4 text-sm text-muted-foreground"
                        style={{ borderColor: `hsl(var(${c}))` }}
                      >
                        {p.hint}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden flex-col justify-between border-l border-border bg-secondary/30 p-8 lg:flex">
                <div className="space-y-3">
                  <Meta label="Difficulty" value={`${p.difficulty} / 5`} />
                  <Meta label="Topic" value={p.topic} />
                  <Meta label="Source" value={p.source} />
                </div>
                <Link
                  href="#library"
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Study this area
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}