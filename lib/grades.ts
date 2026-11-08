/** "8–12" → [[8,12]]; "Junior 8–10 / Senior 11–12" → [[8,10],[11,12]]; "primary or secondary" → []. */
export function parseGradeRanges(grades: string | null): [number, number][] {
  if (!grades) return [];
  const out: [number, number][] = [];
  for (const m of grades.matchAll(/(\d{1,2})\s*[–-]\s*(\d{1,2})/g)) out.push([+m[1], +m[2]]);
  if (out.length === 0) for (const m of grades.matchAll(/\b(\d{1,2})\b/g)) out.push([+m[1], +m[1]]);
  return out;
}

/** True if the subject's grades overlap [lo, hi]. Unknown grades never hide a subject. */
export function gradesOverlap(grades: string | null, lo: number, hi: number): boolean {
  const ranges = parseGradeRanges(grades);
  if (ranges.length === 0) return true;
  return ranges.some(([a, b]) => a <= hi && b >= lo);
}
