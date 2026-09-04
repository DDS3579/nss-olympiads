"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "constellation", label: "Constellation" },
  { id: "topics", label: "Topics" },
  { id: "problem", label: "Problem" },
  { id: "library", label: "Library" },
  { id: "papers", label: "Papers" },
  { id: "roadmap", label: "Roadmap" },
];

export function OlympiadNav() {
  const [active, setActive] = useState("overview");

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

  return (
    <div className="sticky top-0 z-40 border-y border-border bg-background/90 backdrop-blur">
      <nav className="no-scrollbar mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-6 lg:px-8">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={cn(
              "relative whitespace-nowrap py-4 text-sm font-medium transition-colors",
              active === s.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {s.label}
            {active === s.id && (
              <motion.span
                layoutId="oly-nav-underline"
                className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </a>
        ))}
      </nav>
    </div>
  );
}