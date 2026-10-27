/**
 * Single source of truth for "how far from the top does content land" (T3.5).
 * Reads real element heights — works whether the header is hidden or shown
 * and whether the page has a subject sub-nav or not.
 */
export function getScrollOffset() {
  const h = document.getElementById("site-header")?.offsetHeight ?? 0;
  const s = document.getElementById("olympiad-subnav")?.offsetHeight ?? 0;
  return h + s + 12;
}

export function scrollToId(id: string, opts?: { focus?: boolean }) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lenis = (window as any).__lenis;
  if (lenis && !reduce) {
    lenis.scrollTo(el, { offset: -getScrollOffset(), duration: 1.1 });
  } else {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - getScrollOffset(),
      behavior: reduce ? "auto" : "smooth",
    });
  }
  if (opts?.focus) {
    el.setAttribute("tabindex", "-1");
    (el as HTMLElement).focus({ preventScroll: true });
  }
}