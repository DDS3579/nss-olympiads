import type { ReactNode } from "react";

type Diagram = { pos: string; svg: ReactNode };

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1 } as const;

export const HERO_DIAGRAMS: Record<string, Diagram> = {
  mathematics: {
    pos: "left-[19%] top-[14%] w-28 xl:w-32",
    svg: (
      <svg viewBox="0 0 120 120" {...base}>
        <path d="M88 26 H42 L70 60 L42 94 H88" />
        <path d="M46 110 h44" opacity="0.55" />
        <path d="M100 30 c -5 1 -6 6 -6 11 v 34 c 0 5 1 10 6 11" opacity="0.8" />
      </svg>
    ),
  },
  physics: {
    pos: "left-[72%] top-[8%] w-32 xl:w-36",
    svg: (
      <svg viewBox="0 0 140 110" {...base}>
        <path d="M12 90 Q 70 12 128 90" strokeDasharray="3 5" />
        <circle cx="12" cy="90" r="3" fill="currentColor" stroke="none" />
        <line x1="12" y1="90" x2="46" y2="52" />
        <path d="M46 52 l-10 2 M46 52 l-2 10" />
        <path d="M34 90 a 22 22 0 0 1 7 -15" opacity="0.6" />
        <line x1="8" y1="102" x2="134" y2="102" opacity="0.45" />
      </svg>
    ),
  },
  chemistry: {
    pos: "left-[82%] top-[62%] w-28 xl:w-32",
    svg: (
      <svg viewBox="0 0 130 120" {...base}>
        <polygon points="65,28 94,45 94,79 65,96 36,79 36,45" />
        <circle cx="65" cy="62" r="19" opacity="0.55" />
        <line x1="94" y1="45" x2="118" y2="31" />
        <circle cx="121" cy="29" r="4" />
        <line x1="36" y1="79" x2="14" y2="92" />
        <circle cx="11" cy="94" r="3" opacity="0.7" />
      </svg>
    ),
  },
  astronomy: {
    pos: "left-[57%] top-[10%] w-32 xl:w-36",
    svg: (
      <svg viewBox="0 0 140 110" {...base}>
        <circle cx="70" cy="55" r="5" fill="currentColor" stroke="none" />
        <ellipse cx="70" cy="55" rx="60" ry="19" transform="rotate(-16 70 55)" />
        <ellipse cx="70" cy="55" rx="42" ry="13" transform="rotate(22 70 55)" opacity="0.55" />
        <circle cx="124" cy="34" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="32" cy="70" r="1.8" fill="currentColor" stroke="none" opacity="0.8" />
      </svg>
    ),
  },
  ai: {
    pos: "left-[38%] top-[72%] w-32 xl:w-36",
    svg: (
      <svg viewBox="0 0 140 110" {...base}>
        <circle cx="20" cy="25" r="4" />
        <circle cx="20" cy="55" r="4" />
        <circle cx="20" cy="85" r="4" />
        <circle cx="70" cy="35" r="4" />
        <circle cx="70" cy="70" r="4" />
        <circle cx="120" cy="55" r="5" fill="currentColor" fillOpacity="0.25" />
        <line x1="24" y1="25" x2="66" y2="35" opacity="0.5" />
        <line x1="24" y1="25" x2="66" y2="70" opacity="0.5" />
        <line x1="24" y1="55" x2="66" y2="35" opacity="0.5" />
        <line x1="24" y1="55" x2="66" y2="70" opacity="0.5" />
        <line x1="24" y1="85" x2="66" y2="35" opacity="0.5" />
        <line x1="24" y1="85" x2="66" y2="70" opacity="0.5" />
        <line x1="74" y1="35" x2="115" y2="55" opacity="0.5" />
        <line x1="74" y1="70" x2="115" y2="55" opacity="0.5" />
      </svg>
    ),
  },
  informatics: {
    pos: "left-[6%] top-[64%] w-28 xl:w-32",
    svg: (
      <svg viewBox="0 0 130 110" {...base}>
        <circle cx="24" cy="30" r="5" />
        <circle cx="70" cy="18" r="5" />
        <circle cx="110" cy="46" r="5" />
        <circle cx="56" cy="70" r="5" />
        <circle cx="22" cy="92" r="5" opacity="0.7" />
        <line x1="28" y1="28" x2="65" y2="20" />
        <line x1="75" y1="21" x2="106" y2="42" />
        <line x1="108" y1="51" x2="60" y2="68" />
        <line x1="52" y1="73" x2="26" y2="89" opacity="0.7" />
        <line x1="26" y1="35" x2="53" y2="66" opacity="0.6" />
      </svg>
    ),
  },
  biology: {
    pos: "left-[66%] top-[72%] w-24 xl:w-28",
    svg: (
      <svg viewBox="0 0 100 130" {...base}>
        <path d="M30 10 C 80 30, 20 50, 70 70 S 30 110, 70 124" />
        <path d="M70 10 C 20 30, 80 50, 30 70 S 70 110, 30 124" opacity="0.7" />
        <line x1="40" y1="24" x2="62" y2="24" opacity="0.5" />
        <line x1="42" y1="46" x2="58" y2="46" opacity="0.5" />
        <line x1="42" y1="94" x2="58" y2="94" opacity="0.5" />
        <line x1="40" y1="116" x2="62" y2="116" opacity="0.5" />
      </svg>
    ),
  },
};
