"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getScrollOffset } from "@/lib/scroll";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/** For the future: modals/overlays can call getLenis()?.stop() / .start() */
export function getLenis() {
  return lenisInstance;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const mounted = useRef(false);
  const popNav = useRef(false);

  useEffect(() => {
    // Never hijack scrolling for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;
    lenisInstance = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Same-page anchor links on ANY page (#why, #categories, #team, ...)
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!(target instanceof HTMLElement)) return;

      event.preventDefault();
      lenis.scrollTo(target, {
        offset: -getScrollOffset(), // clears header + sub-nav (T3.5)
        duration: 1.5,
      });
      window.history.pushState(null, "", hash);
    };
    window.addEventListener("click", onClick);

    // Don't fight the browser's back/forward scroll restoration
    const onPopState = () => {
      popNav.current = true;
    };
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
    };
  }, []);

  // The layout never unmounts, so reset to top on every route change
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (popNav.current) {
      popNav.current = false;
      return;
    }

    const hash = window.location.hash;
    if (hash) {
      // Let the page render, then smooth-scroll to the anchor
      const timer = setTimeout(() => {
        const target = document.querySelector(hash);
        if (target instanceof HTMLElement) {
          lenisRef.current?.scrollTo(target, { offset: -getScrollOffset(), duration: 1.5 });
        }
      }, 150);
      return () => clearTimeout(timer);
    }

    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
