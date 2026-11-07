"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Olympiad } from "./legacy";
import { strong } from "@/lib/color";

const PRIMARY_SECTIONS = [
  { id: "start", label: "Start" },
  { id: "library", label: "Materials" },
  { id: "papers", label: "Past Papers" },
  { id: "syllabus", label: "Syllabus" },
];

const SECONDARY_SECTIONS = [
  { id: "constellation", label: "Map" },
  { id: "topics", label: "Topics" },
  { id: "problem", label: "Problem" },
  { id: "roadmap", label: "Roadmap" },
  { id: "contacts", label: "Contacts" },
];

const ALL_SECTIONS = [...PRIMARY_SECTIONS, ...SECONDARY_SECTIONS];

export function OlympiadNav({ olympiad }: { olympiad: Olympiad }) {
  const [active, setActive] = useState("library");
  const subnavRef = useRef<HTMLDivElement>(null);
  const Icon = olympiad.icon;
  const c = olympiad.colorVar;

  // Publish this bar's real height so the FilterBar/anchors can stack under it (T3.4/T4.5)
  useEffect(() => {
    const el = subnavRef.current;
    if (!el) return;
    const set = () =>
      document.documentElement.style.setProperty("--subnav-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.setProperty("--subnav-h", "0px");
    };
  }, []);

  // Scroll-spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    ALL_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const renderTab = (s: { id: string; label: string }, primary: boolean) => (
  <a
    key={s.id}
    href={`#${s.id}`}
    aria-current={active === s.id ? "true" : undefined}
    className={cn(
      "relative whitespace-nowrap rounded-full px-3 py-1.5 transition-colors",
        primary
          ? "font-heading text-sm font-bold"
          : "text-sm font-medium",
        active === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {s.label}
      {active === s.id && (
        <motion.span
          layoutId="oly-nav-underline"
          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full"
          style={{ background: strong(c) }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </a>
  );

  return ( <div
  id="olympiad-subnav"
  ref={subnavRef}
  style={{ top: "var(--nav-offset)" }}
  className="sticky z-40 border-b border-border bg-background/90 backdrop-blur-md transition-[top] duration-300 motion-reduce:transition-none"
>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center gap-4 py-3">
          {/* Identity */}
          <div className="flex min-w-0 flex-shrink-0 items-center gap-3">
            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ background: `hsl(var(${c}) / 0.15)` }}
            >
              <Icon className="h-4 w-4" style={{ color: strong(c) }} />
            </div>
            <div className="min-w-0">
              <div className="truncate font-heading text-sm font-bold text-foreground">
                {olympiad.name}
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Series {olympiad.series}
              </div>
            </div>
          </div>

          {/* Desktop tabs */}
          <nav aria-label={`Sections of ${olympiad.name}`} className="no-scrollbar hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto lg:flex">
            {PRIMARY_SECTIONS.map((s) => renderTab(s, true))}
            <span className="mx-2 h-4 w-px flex-shrink-0 bg-border" />
            {SECONDARY_SECTIONS.map((s) => renderTab(s, false))}
          </nav>

        </div>

        {/* Mobile tabs */}
        <nav aria-label={`Sections of ${olympiad.name}`} className="no-scrollbar -mx-6 flex items-center gap-1 overflow-x-auto px-6 pb-3 lg:hidden">
          {PRIMARY_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={cn(
                "inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3 font-heading text-sm font-bold transition-colors",
                active === s.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s.label}
            </a>
          ))}
          <span className="mx-1 h-4 w-px flex-shrink-0 bg-border" />
          {SECONDARY_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={cn(
                "inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors",
                active === s.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}