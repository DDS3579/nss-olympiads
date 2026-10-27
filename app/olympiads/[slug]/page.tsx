import { notFound } from "next/navigation";
import { getAllSubjects, getSubject, getSubjectIndex } from "@/lib/data";
import { OlympiadExperience } from "@/components/olympiad/OlympiadExperience";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSubjects().map((s) => ({ slug: s.meta.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = getSubject(slug);
  if (!data) return { title: "Olympiad Not Found" };
  return {
    title: `${data.meta.name} Olympiad`,
    description: data.meta.description,
  };
}

export default async function OlympiadDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getSubject(slug);
  if (!data) notFound();
  return <OlympiadExperience data={data} index={getSubjectIndex()} />;
}
