import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * One helper for every route's metadata: unique title, description,
 * canonical, Open Graph and Twitter. `metadataBase` (root layout) makes
 * the relative paths absolute.
 */
export function pageMeta({
  title,
  description,
  path,
  absolute = false,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  /** true = use the title as-is (home page); false = "<title> | NSS Olympiad Hub" */
  absolute?: boolean;
  noindex?: boolean;
}): Metadata {
  const full = absolute ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: full,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: full, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
