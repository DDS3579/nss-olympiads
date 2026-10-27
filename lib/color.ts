/**
 * Colour helpers for subject accents (T3.1, B-21).
 * dec(c, a) → bright --subject-X — DECORATION only (dots, glows, borders, tints)
 * strong(c) → accessible -strong variant — fills-with-text + coloured text
 * onStrong  → text colour to sit ON strong() fills
 */
export const dec = (v: string, a?: number) =>
  a == null ? `hsl(var(${v}))` : `hsl(var(${v}) / ${a})`;

export const strong = (v: string) => `hsl(var(${v}-strong))`;

export const onStrong = "hsl(var(--on-strong))";
