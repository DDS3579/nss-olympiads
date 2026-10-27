import type { MetadataRoute } from "next";
import { getAllSubjects } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/olympiads`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

const olympiadRoutes: MetadataRoute.Sitemap = getAllSubjects().map((s) => ({
  url: `${siteConfig.url}/olympiads/${s.meta.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...olympiadRoutes];
}