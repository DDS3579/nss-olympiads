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
      // TODO: add real icons at /public/icon-192.png and /public/icon-512.png
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}