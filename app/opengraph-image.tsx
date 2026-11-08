import { ImageResponse } from "next/og";

export const alt = "NSS Olympiad Hub — free Olympiad preparation for Nepal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DOTS = ["#0ea5e9", "#8b5cf6", "#10b981", "#6366f1", "#f97316", "#f43f5e", "#14b8a6"];

export default function OgImage() {
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
          background: "linear-gradient(135deg, #0b1220 0%, #0f2038 60%, #0a3a55 100%)",
          color: "#f3f6fb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {DOTS.map((c) => (
            <div key={c} style={{ width: 22, height: 22, borderRadius: 22, background: c }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, letterSpacing: 6, color: "#7fdcfb", textTransform: "uppercase" }}>
            NSS STEM Club
          </div>
          <div style={{ marginTop: 18, fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
            NSS Olympiad Hub
          </div>
          <div style={{ marginTop: 22, fontSize: 36, color: "#b9c6da", maxWidth: 900 }}>
            Free, level-wise Olympiad preparation for Nepal
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#b9c6da" }}>
          7 Olympiads · Grades 8–12 · Verified links · 100% free
        </div>
      </div>
    ),
    { ...size }
  );
}
