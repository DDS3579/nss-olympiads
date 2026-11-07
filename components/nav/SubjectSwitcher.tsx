"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubjectIcon } from "@/lib/data/icons";
import type { SubjectIndexItem } from "@/lib/types";

export function SubjectSwitcher({
  subjects,
  currentSlug,
}: {
  subjects: SubjectIndexItem[];
  currentSlug?: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const current = subjects.find((s) => s.slug === currentSlug);

  const focusItem = useCallback((index: number) => {
    const items = menuRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]');
    if (items && items[index]) {
      items[index].focus();
    }
  }, []);

  useEffect(() => {
    if (open) {
      const idx = subjects.findIndex((s) => s.slug === currentSlug);
      focusItem(idx >= 0 ? idx : 0);
    }
  }, [open, currentSlug, subjects, focusItem]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const items = menuRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]');
    if (!items) return;

    const currentIndex = Array.from(items).findIndex((el) => el === document.activeElement);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusItem((currentIndex + 1) % items.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusItem((currentIndex - 1 + items.length) % items.length);
        break;
      case "Home":
        e.preventDefault();
        focusItem(0);
        break;
      case "End":
        e.preventDefault();
        focusItem(items.length - 1);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
    }
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={current ? `Subjects, current subject: ${current.name}` : "Subjects"}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
          open && "bg-secondary"
        )}
      >
        <span>Subjects</span>
        {current ? (
          <>
            <SubjectIcon iconKey={current.iconKey} className="h-4 w-4 shrink-0" style={{ color: `hsl(var(${current.colorVar}))` }} />
            <span className="max-w-28 truncate">{current.name}</span>
          </>
        ) : null}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <>
          {/* Invisible backdrop to close menu on outside click */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          
          <ul
            ref={menuRef}
            role="menu"
            aria-label="Subjects"
            className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl border border-border bg-background p-1.5 shadow-lg focus:outline-none"
            onKeyDown={handleMenuKeyDown}
          >
            {subjects.map((subject) => {
              const isCurrent = subject.slug === currentSlug;
              return (
                <li key={subject.slug} role="none">
                  <Link
                    href={`/olympiads/${subject.slug}`}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary outline-none focus-visible:bg-secondary",
                      isCurrent && "bg-secondary/50"
                    )}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg border"
                      style={{
                        borderColor: `hsl(var(${subject.colorVar}) / 0.25)`,
                        background: `hsl(var(${subject.colorVar}) / 0.08)`,
                      }}
                    >
                      <SubjectIcon
                        iconKey={subject.iconKey}
                        className="h-4 w-4"
                        style={{ color: `hsl(var(${subject.colorVar}))` }}
                      />
                    </span>
                    <span className="flex-1 font-medium text-foreground">{subject.name}</span>
                    {isCurrent && <Check className="h-4 w-4 text-primary" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}