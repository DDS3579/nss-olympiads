import type { Metadata } from "next";
import { SearchPageClient } from "@/components/nav/SearchPageClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search study materials, past papers and topics across all 7 Olympiads.",
  robots: { index: false },
};

export default function SearchPage() {
  return <SearchPageClient />;
}
