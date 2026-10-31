import type { Level, Topic } from "@/lib/types";

/**
 * Deterministic concentric-ring layout for the topic constellation (T4.10).
 * Ring = first level at which the topic is examined. No randomness → no
 * hydration mismatch. Works for 4–15 nodes.
 */
export const RING_R: Record<Level, number> = {
  district: 0.22,
  province: 0.42,
  national: 0.62,
  international: 0.82,
};

const ORDER: Level[] = ["district", "province", "national", "international"];

export function firstLevel(t: Topic): Level {
  return ORDER.find((l) => t.levels.includes(l)) ?? "province";
}

export function layoutTopics(topics: Topic[]) {
  const byRing = new Map<Level, Topic[]>();
  topics.forEach((t) => byRing.set(firstLevel(t), [...(byRing.get(firstLevel(t)) ?? []), t]));
  const out: Record<string, { x: number; y: number; ring: Level }> = {};
  byRing.forEach((list, ring) =>
    list.forEach((t, i) => {
      const a = (i / list.length) * Math.PI * 2 + ORDER.indexOf(ring) * 0.6 - Math.PI / 2;
      out[t.id] = {
        x: 50 + Math.cos(a) * RING_R[ring] * 46,
        y: 50 + Math.sin(a) * RING_R[ring] * 44,
        ring,
      };
    })
  );
  return out;
}
