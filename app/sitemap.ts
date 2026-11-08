import type { MetadataRoute } from "next";
import { getAllSubjects } from "@/lib/data";
import { SITE_UPDATED, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const statics = ["", "/olympiads", "/exams", "/about", "/faq", "/privacy", "/terms"].map(
    (p) => ({
      url: `${base}${p}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : p === "/olympiads" ? 0.9 : 0.6,
    })
  );
  const subjects = getAllSubjects().map((s) => ({
    url: `${base}/olympiads/${s.meta.slug}`,
    lastModified: s.meta.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...statics, ...subjects];
}
