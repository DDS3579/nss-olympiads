import { ImageResponse } from "next/og";
import { getSubject } from "@/lib/data";
import { subjectStats } from "@/lib/data/stats";

export const alt = "Olympiad preparation — NSS Olympiad Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex twins of the subject colours (CSS variables are not available inside og images).
const HEX: Record<string, string> = {
  mathematics: "#0ea5e9",
  physics: "#8b5cf6",
  chemistry: "#10b981",
  astronomy: "#6366f1",
  ai: "#f97316",
  informatics: "#f43f5e",
  biology: "#14b8a6",
};

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getSubject(slug);
  const color = HEX[slug] ?? "#28b8f2";
  const name = data?.meta.name ?? "Olympiad";
  const levels = data
    ? (["district", "province", "national", "international"] as const)
        .filter((k) => data.meta.levels[k].exists)
        .map((k) => data.meta.levels[k].label)
    : [];
  const st = data ? subjectStats(data) : null;
  const counts =
    st && st.resources + st.papers > 0
      ? `${st.resources} resources · ${st.papers} past papers`
      : "Official syllabus · exam ladder · roadmap";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b1220",
          color: "#f3f6fb",
          borderTop: `16px solid ${color}`,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color, textTransform: "uppercase" }}>
          NSS Olympiad Hub
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05 }}>{name} Olympiad</div>
          <div style={{ marginTop: 20, fontSize: 36, color: "#b9c6da" }}>
            {levels.join("  →  ")}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#b9c6da" }}>
          {counts} · Free for students in Nepal
        </div>
      </div>
    ),
    { ...size }
  );
}
