"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Olympiad } from "@/lib/data/olympiads";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "constellation", label: "Map" },
  { id: "topics", label: "Topics" },
  { id: "problem", label: "Problem" },
  { id: "library", label: "Library" },
  { id: "papers", label: "Papers" },
  { id: "roadmap", label: "Roadmap" },
];

export function OlympiadNav({ 
  olympiad, 
  allOlympiads 
}: { 
  olympiad: Olympiad; 
  allOlympiads: Olympiad[];
}) {
  const [active, setActive] = useState("overview");
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const Icon = olympiad.icon;

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
    function handleClick(e: MouseEvent) {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setSwitcherOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="sticky top-0 z-40 border-y border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-stretch">
        
        {/* LEFT: Context & Switcher (Sticky on mobile scroll) */}
        <div className="sticky left-0 z-10 flex items-center gap-3 border-r border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:px-6">
          <div 
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: `hsl(var(${olympiad.colorVar}) / 0.12)` }}
          >
            <Icon className="h-4 w-4" style={{ color: `hsl(var(${olympiad.colorVar}))` }} />
          </div>
          
          <div className="relative" ref={switcherRef}>
            <button
              onClick={() => setSwitcherOpen(!switcherOpen)}
              className="flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              <span className="hidden sm:inline">{olympiad.name}</span>
              <span className="sm:hidden">Switch</span>
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", switcherOpen && "rotate-180")} />
            </button>

            {switcherOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
              >
                <div className="p-2">
                  <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Switch Olympiad
                  </p>
                  {allOlympiads.map((o) => {
                    const OIcon = o.icon;
                    const isActive = o.slug === olympiad.slug;
                    return (
                      <Link
                        key={o.slug}
                        href={`/olympiads/${o.slug}`}
                        onClick={() => setSwitcherOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        )}
                      >
                        <OIcon className="h-4 w-4" style={{ color: `hsl(var(${o.colorVar}))` }} />
                        <span className="font-medium">{o.name}</span>
                        {isActive && <ArrowRight className="ml-auto h-3.5 w-3.5" />}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* RIGHT: Scrollable Section Links */}
        <nav className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto px-2 sm:gap-4 sm:px-6">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "relative whitespace-nowrap px-3 py-4 text-sm font-medium transition-colors",
                active === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s.label}
              {active === s.id && (
                <motion.span
                  layoutId="oly-nav-underline"
                  className="absolute -bottom-px left-3 right-3 h-0.5 rounded-full"
                  style={{ background: `hsl(var(${olympiad.colorVar}))` }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}