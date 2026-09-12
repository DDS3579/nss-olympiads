"use client";

import { ArrowDownToLine } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "./primitives";
import type { Olympiad } from "@/lib/data/olympiads";

export function SyllabusSection({ olympiad }: { olympiad: Olympiad }) {
  const c = olympiad.colorVar;
  const syllabus = olympiad.syllabus ?? [];

  return (
    <section id="syllabus" className="section-anchor py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          label="Syllabus"
          title="What you'll be tested on"
          description={`The official topic areas for the ${olympiad.name} Olympiad.`}
          colorVar={c}
          className="mb-6 lg:mb-8"
        />

        {/* Download Syllabus */}
        <FadeIn y={12} delay={0.08}>
          <div className="mb-10 lg:mb-12">
            <a
              href={olympiad.syllabusFileUrl ?? "#"}
              download
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-heading text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:translate-y-0.5"
              style={{
                backgroundColor: `hsl(var(${c}))`,
                boxShadow: `0 10px 30px -10px hsl(var(${c}) / 0.55)`,
              }}
            >
              <ArrowDownToLine className="h-4 w-4" />
              Download Syllabus
            </a>
          </div>
        </FadeIn>

        {syllabus.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center lg:p-16">
            <p className="font-heading text-lg font-semibold text-foreground">
              Syllabus coming soon
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              The detailed syllabus for {olympiad.name} is being prepared.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
            {syllabus.map((unit, i) => (
              <FadeIn key={unit.unit} delay={i * 0.06} scale={0.97}>
                <div className="group relative h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
                      {unit.unit}
                    </h3>
                    <span
                      className="flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: `hsl(var(${c}) / 0.12)`,
                        color: `hsl(var(${c}))`,
                      }}
                    >
                      {unit.weight}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {unit.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-center gap-2.5 text-sm text-foreground/80"
                      >
                        <span
                          className="h-1 w-1 flex-shrink-0 rounded-full"
                          style={{ background: `hsl(var(${c}))` }}
                        />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}