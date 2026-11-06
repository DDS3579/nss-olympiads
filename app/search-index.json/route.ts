import { getAllSubjects } from "@/lib/data";

export const dynamic = "force-static";

export function GET() {
  const items = getAllSubjects().flatMap((s) => [
    ...s.resources.map((r) => ({
      id: r.id, k: "resource", s: s.meta.slug, sn: s.meta.name, cv: s.meta.colorVar,
      t: r.title, ty: r.type, lv: r.levels, tp: r.topics, w: r.why, np: r.nepalSpecific,
    })),
    ...s.papers.map((p) => ({
      id: p.id, k: "paper", s: s.meta.slug, sn: s.meta.name, cv: s.meta.colorVar,
      t: p.title, ty: p.type, lv: p.levels, tp: p.topics, w: p.why, np: p.nepalSpecific, y: p.year,
    })),
    ...s.topics.map((t) => ({
      id: `${s.meta.slug}:${t.id}`, k: "topic", s: s.meta.slug, sn: s.meta.name, cv: s.meta.colorVar,
      t: t.name, w: t.blurb,
    })),
  ]);
  return Response.json(items, { headers: { "Cache-Control": "public, max-age=3600" } });
}
