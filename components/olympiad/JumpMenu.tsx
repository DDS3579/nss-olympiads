"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { scrollToId } from "@/lib/scroll";
import { onStrong, strong } from "@/lib/color";

const ITEMS: [string, string][] = [
  ["start", "Start here"],
  ["library", "Study materials"],
  ["papers", "Past papers"],
  ["syllabus", "Syllabus"],
  ["constellation", "Topic map"],
  ["topics", "Topics"],
  ["problem", "Featured problem"],
  ["roadmap", "Roadmap"],
  ["contacts", "Contacts & help"],
];

export function JumpMenu({ colorVar }: { colorVar: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > 480);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  if (!show) return null;

  return (
    <div data-no-print className="fixed bottom-5 right-4 z-40 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            aria-label="Jump to a section"
            className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold shadow-lg transition-transform active:scale-95"
            style={{ background: strong(colorVar), color: onStrong }}
          >
            <ListTree aria-hidden className="h-4 w-4" />
            Sections
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="text-left font-heading">Jump to</SheetTitle>
          </SheetHeader>
          <ul className="mt-4 grid grid-cols-2 gap-2 pb-4">
            {ITEMS.map(([id, label]) => (
              <li key={id}>
                <SheetClose asChild>
                  <button
                    onClick={() => setTimeout(() => scrollToId(id), 250)}
                    className="flex min-h-12 w-full items-center rounded-xl border border-border bg-background px-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {label}
                  </button>
                </SheetClose>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}
