"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({
  to,
  duration = 1000,
  suffix = "",
}: {
  to: number;
  duration?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(to); // ← final value first: SSR/no-JS/crawlers see the truth
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let done = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || done) return;
        done = true;
        const t0 = performance.now();
        setDisplay(0);
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          setDisplay(Math.round(to * (1 - Math.pow(1 - p, 3)))); // easeOutCubic
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}