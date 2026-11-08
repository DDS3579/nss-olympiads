import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NSS Olympiad Hub",
    short_name: "NSS Olympiads",
    description:
      "Free, level-wise Olympiad preparation for Nepal — verified materials, past papers and roadmaps.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a7aae",
    lang: "en",
    categories: ["education"],
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "All Olympiads", url: "/olympiads" },
      { name: "Search", url: "/search" },
      { name: "Exam comparison", url: "/exams" },
    ],
  };
}
