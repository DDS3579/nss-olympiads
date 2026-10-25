import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NSS Olympiad Hub",
    short_name: "NSS Olympiads",
    description:
      "Free Olympiad preparation for NSS students — materials, papers, and roadmaps.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1220",
    theme_color: "#28b8f2",
    icons: [
      // Interim only — real 192/512/maskable icons are generated in T7.5
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}