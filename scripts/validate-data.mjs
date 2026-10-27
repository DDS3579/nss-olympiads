#!/usr/bin/env node
/**
 * validate-data.mjs — the "no fabricated anything" gate.
 * Run:  npm run validate:data            (errors fail the build)
 *       npm run validate:data -- --draft (needsReview items → warnings, not errors)
 *
 * Reads data/subjects/<slug>/{resources,papers,originals}.json and data/shared/denylist.json
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA = path.join(ROOT, "data", "subjects");
const PUBLIC = path.join(ROOT, "public");
const DRAFT = process.argv.includes("--draft");

const LEVELS = ["district", "province", "national", "international"];
const TYPES = ["book", "handout", "course", "video", "tool", "dataset", "official", "problemset", "mock", "pastpaper"];
const ACCESS = ["ok", "caveat", "dead", "unknown"];
const KINDS = ["external", "hosted", "page"];
const ORIGINS = ["external", "nss-original", "nss-ai-assisted"];
const ISO = /^\d{4}-\d{2}-\d{2}$/;

const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

const readJson = (f, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch (e) {
    if (fallback !== undefined) return fallback;
    err(`cannot read/parse ${path.relative(ROOT, f)}: ${e.message}`);
    return null;
  }
};

const denylist = readJson(path.join(ROOT, "data", "shared", "denylist.json"), { hosts: [], substrings: [] });
const isDenied = (url) =>
  denylist.hosts.some((h) => url.includes(h)) || denylist.substrings.some((s) => url.includes(s));

const slugs = fs.existsSync(DATA) ? fs.readdirSync(DATA).filter((d) => fs.statSync(path.join(DATA, d)).isDirectory()) : [];
if (slugs.length === 0) err("no subjects found in data/subjects/");

for (const slug of slugs) {
  const dir = path.join(DATA, slug);
  const meta = readJson(path.join(dir, "meta.json"));
  const topics = readJson(path.join(dir, "topics.json"), []);
  const topicIds = new Set(topics.map((t) => t.id));

  const lists = {
    resources: readJson(path.join(dir, "resources.json"), []),
    papers: readJson(path.join(dir, "papers.json"), []),
    originals: readJson(path.join(dir, "originals.json"), []),
  };

  const ids = new Set();
  const urls = new Map();

  for (const [listName, list] of Object.entries(lists)) {
    list.forEach((it, i) => {
      const where = `${slug}/${listName}[${i}] "${(it.title || it.id || "?").slice(0, 50)}"`;

      // --- identity
      if (!it.id || !/^[a-z0-9-]+$/.test(it.id)) err(`${where}: id missing or not kebab-case`);
      else if (ids.has(it.id)) err(`${where}: duplicate id ${it.id}`);
      else ids.add(it.id);
      if (!it.title) err(`${where}: title missing`);

      // --- classification
      if (!TYPES.includes(it.type)) err(`${where}: type "${it.type}" not in ${TYPES.join("|")}`);
      if (!Array.isArray(it.levels) || it.levels.length === 0) err(`${where}: levels[] empty`);
      else it.levels.forEach((l) => !LEVELS.includes(l) && err(`${where}: bad level "${l}"`));
      (it.topics || []).forEach((t) => !topicIds.has(t) && err(`${where}: unknown topic id "${t}"`));
      if ((it.topics || []).length === 0) warn(`${where}: no topics tagged`);
      if (typeof it.nepalSpecific !== "boolean") err(`${where}: nepalSpecific must be true/false`);

      // --- trust
      if (!ISO.test(it.verified || "")) err(`${where}: verified must be YYYY-MM-DD`);
      if (!ORIGINS.includes(it.origin)) err(`${where}: origin must be ${ORIGINS.join("|")}`);
      if (it.origin !== "external" && !it.reviewedBy) err(`${where}: NSS-authored items need reviewedBy`);
      if (it.origin === "nss-ai-assisted" && !it.reviewedAt) err(`${where}: ai-assisted items need reviewedAt (human review date)`);
      if (!ACCESS.includes(it.access)) err(`${where}: access must be ${ACCESS.join("|")}`);
      if (it.access === "dead") err(`${where}: access=dead — remove it (or move to denylist)`);
      if (it.access === "caveat" && !it.accessNote) err(`${where}: access=caveat needs accessNote`);
      if (!it.why) warn(`${where}: why is empty`);
      else if (it.why.length > 220) warn(`${where}: why is ${it.why.length} chars (aim ≤ 160, max 220)`);

      // --- links
      const links = [];
      if (listName === "papers" || it.files) (it.files || []).forEach((f) => links.push(f.url));
      else {
        if (!it.url) err(`${where}: url missing`);
        links.push(it.url, ...(it.extraLinks || []).map((l) => l.url));
      }
      if (listName === "papers" && (!it.files || it.files.length === 0)) err(`${where}: files[] empty`);
      if (listName === "papers" && typeof it.hasSolutions !== "boolean") err(`${where}: hasSolutions must be true/false`);

      links.filter(Boolean).forEach((u) => {
        if (u.startsWith("/")) {
          // hosted file in /public
          const p = path.join(PUBLIC, decodeURI(u.split("#")[0]));
          if (!fs.existsSync(p)) err(`${where}: hosted file missing on disk → ${u}`);
          if (it.origin === "external" && !it.hostable) err(`${where}: external item hosted locally without hostable:true + licence`);
        } else {
          if (!/^https:\/\//.test(u)) {
            if (/^http:\/\//.test(u)) warn(`${where}: http:// link (prefer https) → ${u}`);
            else err(`${where}: bad url "${u}"`);
          }
          if (/\s/.test(u)) err(`${where}: url contains whitespace`);
          if (isDenied(u)) err(`${where}: URL is on the DENYLIST → ${u}`);
          const prev = urls.get(u);
          if (prev) warn(`${where}: duplicate URL also used by ${prev}`);
          else urls.set(u, where);
        }
      });

      if (it.kind === "hosted" && !it.licence) err(`${where}: hosted items need licence`);
      if (/proprietary/i.test(it.licence || "") && it.kind === "hosted") err(`${where}: proprietary content must be link-only`);

      // --- drafts
      if (it.needsReview) (DRAFT ? warn : err)(`${where}: needsReview is still true`);
    });
  }

  // ── Project rule 1 (R-G1): warn when a subject is past the curation ceiling ──
  if (lists.resources.length + lists.originals.length > 40)
    warn(`${slug}: ${lists.resources.length + lists.originals.length} resources — curate toward ~25–30 (R-G1)`);

  // ── Project rule 2: exists:true level with 0 records → honest empty state ahead ──
  {
    const levelCounts = { district: 0, province: 0, national: 0, international: 0 };
    for (const list of Object.values(lists))
      for (const it of list)
        for (const l of it.levels ?? []) if (levelCounts[l] !== undefined) levelCounts[l]++;
    for (const k of LEVELS)
      if (meta?.levels?.[k]?.exists && levelCounts[k] === 0)
        warn(`${slug}: level "${k}" exists but has 0 records yet (will render the honest empty state)`);
  }

  // ── Project rule 3: official syllabus must cover every topic ──
  {
    const syllabus = readJson(path.join(dir, "syllabus.json"), []);
    if (meta?.syllabusMeta?.officialVerified) {
      const covered = new Set(syllabus.flatMap((s) => [s.id, s.topicId].filter(Boolean)));
      for (const t of topics)
        if (!covered.has(t.id)) err(`${slug}: topic "${t.id}" appears in no syllabus.json section (officialVerified is true)`);
    }
  }

  // ── Project rule 4: published featured problems must carry a source URL ──
  {
    const featured = readJson(path.join(dir, "featured.json"), []);
    featured.forEach((f, i) => {
      if (f.verified && !(f.source && f.source.url))
        err(`${slug}/featured[${i}] "${f.title}": published (verified:true) without source.url`);
    });
  }

  // --- subject-level checks
  if (meta) {
    ["name", "slug", "colorVar", "levels"].forEach((k) => meta[k] === undefined && err(`${slug}/meta.json: "${k}" missing`));
    if (meta.slug !== slug) err(`${slug}/meta.json: slug mismatch (${meta.slug})`);
    for (const k of LEVELS) {
      const L = meta.levels?.[k];
      if (!L) err(`${slug}/meta.json: levels.${k} missing`);
      else {
        if (typeof L.exists !== "boolean") err(`${slug}/meta.json: levels.${k}.exists must be boolean`);
        if (!L.label) err(`${slug}/meta.json: levels.${k}.label missing`);
        if (L.exists === false && !L.honestNote) err(`${slug}/meta.json: levels.${k} is non-existent → honestNote required`);
      }
    }
  }

  const stats = {
    resources: lists.resources.length + lists.originals.length,
    papers: lists.papers.length,
    topics: topics.length,
  };
  console.log(`✔ ${slug.padEnd(12)} resources ${stats.resources} · papers ${stats.papers} · topics ${stats.topics}`);
}

warns.slice(0, 60).forEach((w) => console.warn("  warn  " + w));
if (warns.length > 60) console.warn(`  … and ${warns.length - 60} more warnings`);
errors.forEach((e) => console.error("  ERROR " + e));
console.log(`\n${errors.length} error(s), ${warns.length} warning(s)${DRAFT ? " (draft mode)" : ""}`);
process.exit(errors.length ? 1 : 0);
