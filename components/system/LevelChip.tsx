import type { Level } from "@/lib/types";

const FALLBACK: Record<Level, string> = {
  district: "District",
  province: "Province",
  national: "National",
  international: "International",
};

/** Strong-tint chip — ≥ 4.5:1 in both themes (T3.1 policy). */
export function LevelChip({
  level,
  label,
  colorVar,
}: {
  level: Level;
  label?: string;
  colorVar?: string;
}) {
  return (
    <span
      className="inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={
        colorVar
          ? {
              background: `hsl(var(${colorVar}-strong) / 0.12)`,
              color: `hsl(var(${colorVar}-strong))`,
            }
          : { background: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))" }
      }
    >
      {label ?? FALLBACK[level]}
    </span>
  );
}
