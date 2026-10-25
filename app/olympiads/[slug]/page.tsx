import { notFound } from "next/navigation";
import { olympiads, getOlympiadBySlug } from "@/lib/data/olympiads";
import { OlympiadExperience } from "@/components/olympiad/OlympiadExperience";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return olympiads.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const olympiad = getOlympiadBySlug(slug);
  if (!olympiad) return { title: "Olympiad Not Found" };
  return {
    title: `${olympiad.name} Olympiad`,
    description: olympiad.description,
  };
}

export default async function OlympiadDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const olympiad = getOlympiadBySlug(slug);
  if (!olympiad) notFound();
  return <OlympiadExperience slug={slug} />;
}