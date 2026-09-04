"use client";

import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./primitives";
import { useOlympiadProgress } from "./context";
import type { Olympiad, Topic } from "@/lib/data/olympiads";

export function OlympiadTopics({ olympiad }: { olympiad: Olympiad }) {
  return (
    <section id="topics" className="section-anchor py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          label="Topics"
          title="The territory you'll master"
          description="Mark a topic to add it to your preparation path."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {olympiad.topics.map((t, i) => (
            <FadeIn
              key={t.id}
              delay={i * 0.06}
              scale={0.97}
              className={cn(t.featured && "sm:col-span-2 lg:col-span-2 lg:row-span-2")}
            >
              <TopicCard topic={t} colorVar={olympiad.colorVar} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TopicCard({ topic, colorVar }: { topic: Topic; colorVar: string }) {
  const { isStarted, toggle } = useOlympiadProgress();
  const started = isStarted(topic.id);

  return (
    <article
      id={`topic-${topic.id}`}
      className={cn(
        "section-anchor group relative flex h-full flex-col justify-between rounded-2xl border bg-card p-6 transition-colors hover:border-primary/40",
        started ? "border-primary/50" : "border-border",
        topic.featured && "p-7 lg:p-8"
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-foreground lg:text-xl">
            {topic.name}
          </h3>
          <span className="whitespace-nowrap text-[11px] font-semibold text-muted-foreground">
            {topic.problems} problems
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{topic.blurb}</p>

        {topic.featured && topic.subtopics.length > 0 && (
          <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
            {topic.subtopics.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-foreground/80">
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ background: `hsl(var(${colorVar}))` }}
                />
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={() => toggle(topic.id)}
          className={cn(
            "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
            started
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-foreground hover:bg-secondary"
          )}
        >
          {started ? "In progress" : "Start topic"}
        </button>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>
    </article>
  );
}