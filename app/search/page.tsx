import { SearchPageClient } from "@/components/nav/SearchPageClient";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Search",
  description: "Search every Olympiad's study materials, past papers and topics.",
  path: "/search",
  noindex: true,
});

export default function SearchPage() {
  return <SearchPageClient />;
}
