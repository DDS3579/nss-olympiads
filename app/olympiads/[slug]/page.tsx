import { notFound } from "next/navigation";
import { getAllSubjects, getSubject, getSubjectIndex } from "@/lib/data";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { SubjectSwitcher } from "@/components/nav/SubjectSwitcher";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SubjectExperience } from "@/components/olympiad/SubjectExperience";
import { siteConfig } from "@/lib/site-config";

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
  const index = getSubjectIndex();
  const breadcrumbItems = [
    { label: "Olympiads", href: "/olympiads" },
    { label: data.meta.name },
  ];
  const jsonLdItems = [
    { name: "Home", url: siteConfig.url },
    { name: "Olympiads", url: `${siteConfig.url}/olympiads` },
    { name: data.meta.name, url: `${siteConfig.url}/olympiads/${data.meta.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={jsonLdItems} />
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-6 pb-4 pt-24 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumbs items={breadcrumbItems} />
        <SubjectSwitcher subjects={index} currentSlug={data.meta.slug} />
      </div>
      <SubjectExperience data={data} />
    </>
  );
}
