import { notFound } from "next/navigation";
import { getAllSubjects, getSubject, getSubjectIndex } from "@/lib/data";
import { subjectStats } from "@/lib/data/stats";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { SubjectSwitcher } from "@/components/nav/SubjectSwitcher";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SubjectExperience } from "@/components/olympiad/SubjectExperience";
import { siteConfig } from "@/lib/site-config";
import type { Level } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSubjects().map((s) => ({ slug: s.meta.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = getSubject(slug);
  if (!data) return { title: "Olympiad not found" };

  const st = subjectStats(data);
  const order: Level[] = ["district", "province", "national", "international"];
  const rounds = order
    .filter((k) => data.meta.levels[k].exists)
    .map((k) => data.meta.levels[k].label)
    .join(" → ");

  const description =
    st.resources + st.papers > 0
      ? `${data.meta.name} Olympiad in Nepal: ${rounds}. ${st.resources} verified resources, ${st.papers} past papers, syllabus and roadmap. Free.`
      : `The ${data.meta.name} Olympiad ladder in Nepal (${rounds}), official syllabus and roadmap. Free preparation hub by NSS Clubs.`;

  return pageMeta({
    title: `${data.meta.name} Olympiad — level-wise preparation`,
    description,
    path: `/olympiads/${slug}`,
  });
}

export default async function OlympiadDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getSubject(slug);
  if (!data) notFound();
  const index = getSubjectIndex();

  const jsonLdItems = [
    { name: "Home", url: siteConfig.url },
    { name: "Olympiads", url: `${siteConfig.url}/olympiads` },
    { name: data.meta.name, url: `${siteConfig.url}/olympiads/${data.meta.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={jsonLdItems} />
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-5 pb-4 pt-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Breadcrumbs items={[{ label: "Olympiads", href: "/olympiads" }, { label: data.meta.name }]} />
        <SubjectSwitcher subjects={index} currentSlug={data.meta.slug} />
      </div>
      <SubjectExperience data={data} />
    </>
  );
}
