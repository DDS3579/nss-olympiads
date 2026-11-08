"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { Menu, ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { strong } from "@/lib/color";
import { SubjectIcon } from "@/lib/data/icons";
import { SearchPalette } from "@/components/nav/SearchPalette";
import { ThemeToggle } from "@/components/theme-toggle";
import type { SubjectIndexItem } from "@/lib/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/olympiads", label: "Olympiads" },
  { href: "/exams", label: "Exams" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar({ subjects }: { subjects: SubjectIndexItem[] }) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const hide = latest > previous && latest > 150;
    setHidden(hide);
    setAtTop(latest < 40);
    // Publish visibility so every sticky element below stacks correctly.
    document.documentElement.style.setProperty("--nav-offset", hide ? "0px" : "var(--nav-h)");
  });

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <motion.header
      id="site-header"
      initial={reduce ? false : { opacity: 0, y: -20 }}
      animate={hidden ? { y: "-100%", opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.35, ease: "easeInOut" }}
      className={cn(
        "sticky inset-x-0 top-0 z-50 h-[var(--nav-h)] border-b border-border bg-background/90 backdrop-blur-md transition-colors duration-300",
        pathname === "/" && atTop && "dark"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 flex-shrink-0 rounded-lg object-contain"
          />
          <span className="truncate font-heading text-base font-semibold text-foreground sm:text-lg">
            NSS Olympiad Hub
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative py-1 text-sm font-medium transition-colors duration-200",
                isActive(link.href) ? "text-foreground" : "text-foreground/70 hover:text-foreground"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="flex h-11 items-center gap-2 rounded-full border border-border bg-background px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:h-10"
          >
            <Search aria-hidden className="h-4 w-4" />
            <span className="hidden lg:inline">Search</span>
            {!pathname.startsWith("/olympiads/") && (
              <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 text-[11px] text-muted-foreground lg:inline">
                /
              </kbd>
            )}
          </button>
          <ThemeToggle />

          <Link
            href="/olympiads"
            className="hidden items-center gap-2 rounded-full border-b-4 border-primary/40 bg-primary px-6 py-2.5 font-heading text-sm font-semibold text-primary-foreground transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-2 md:inline-flex"
          >
            Start Preparing
          </Link>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
                aria-label="Open menu"
              >
                <Menu aria-hidden className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto sm:w-[360px]">
              <SheetHeader>
                <SheetTitle className="text-left font-heading">Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "flex min-h-12 items-center border-b border-border text-base font-medium transition-colors",
                        isActive(link.href) ? "text-primary" : "text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              <p className="mb-3 mt-8 font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Jump to an Olympiad
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {subjects.map((s) => (
                  <li key={s.slug}>
                    <SheetClose asChild>
                      <Link
                        href={`/olympiads/${s.slug}`}
                        className="flex min-h-12 items-center gap-2.5 rounded-xl border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                      >
                        <SubjectIcon
                          iconKey={s.iconKey}
                          className="h-4 w-4 flex-shrink-0"
                          style={{ color: strong(s.colorVar) }}
                        />
                        <span className="truncate">{s.name}</span>
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>

              <SheetClose asChild>
                <Link
                  href="/olympiads"
                  className="mt-8 flex items-center justify-center gap-2 rounded-full border-b-4 border-primary/40 bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-all duration-150 active:translate-y-1 active:border-b-2"
                >
                  Start Preparing <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </motion.header>
  );
}
