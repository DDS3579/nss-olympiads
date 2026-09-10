"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { olympiads, type Olympiad } from "@/lib/data/olympiads";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "constellation", label: "Map" },
  { id: "topics", label: "Topics" },
  { id: "problem", label: "Problem" },
  { id: "library", label: "Library" },
  { id: "papers", label: "Papers" },
  { id: "roadmap", label: "Roadmap" },
];

export function OlympiadNav({ olympiad }: { olympiad: Olympiad }) {
  const [active, setActive] = useState("overview");
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const Icon = olympiad.icon;

  // Scroll-spy for section tabs
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close switcher on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setSwitcherOpen(false);
      }
    }
    if (switcherOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [switcherOpen]);

  // Close switcher on Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setSwitcherOpen(false);
    }
    if (switcherOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [switcherOpen]);

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center gap-4 py-3">
          {/* Left — Olympiad identity ("where am I") */}
          <div className="flex min-w-0 flex-shrink-0 items-center gap-3">
            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ background: `hsl(var(${olympiad.colorVar}) / 0.15)` }}
            >
              <Icon
                className="h-4 w-4"
                style={{ color: `hsl(var(${olympiad.colorVar}))` }}
              />
            </div>
            <div className="min-w-0">
              <div className="truncate font-heading text-sm font-bold text-foreground">
                {olympiad.name}
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Series {olympiad.series}
              </div>
            </div>
          </div>

          {/* Middle — section tabs (desktop) */}
          <nav className="no-scrollbar hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto lg:flex">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  active === s.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {s.label}
                {active === s.id && (
                  <motion.span
                    layoutId="oly-nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full"
                    style={{ background: `hsl(var(${olympiad.colorVar}))` }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right — switcher */}
          <div className="relative ml-auto flex-shrink-0 lg:ml-0" ref={switcherRef}>
            <button
              onClick={() => setSwitcherOpen((o) => !o)}
              aria-expanded={switcherOpen}
              aria-haspopup="listbox"
              className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Switch
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", switcherOpen && "rotate-180")}
              />
            </button>

            <AnimatePresence>
              {switcherOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
                >
                  <div className="border-b border-border px-4 py-2.5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      All Olympiads
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-1.5">
                    {olympiads.map((o) => {
                      const OIcon = o.icon;
                      const isCurrent = o.slug === olympiad.slug;
                      return (
                        <Link
                          key={o.slug}
                          href={`/olympiads/${o.slug}`}
                          onClick={() => setSwitcherOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                            isCurrent ? "bg-secondary" : "hover:bg-secondary/60"
                          )}
                        >
                          <span
                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
                            style={{ background: `hsl(var(${o.colorVar}) / 0.15)` }}
                          >
                            <OIcon
                              className="h-3.5 w-3.5"
                              style={{ color: `hsl(var(${o.colorVar}))` }}
                            />
                          </span>
                          <span className="flex-1 truncate text-sm font-medium text-foreground">
                            {o.name}
                          </span>
                          {isCurrent && <Check className="h-4 w-4 text-muted-foreground" />}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / tablet — scrollable section tabs */}
        <nav className="no-scrollbar -mx-6 flex items-center gap-1 overflow-x-auto px-6 pb-3 lg:hidden">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                active === s.id
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
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