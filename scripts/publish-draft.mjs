#!/usr/bin/env node
/**
 * publish-draft.mjs — copy a first batch from content-src/<slug>.draft.json into
 * data/subjects/<slug>/{resources,papers}.json, NEVER overwriting existing records.
 * Everything copied keeps needsReview:true, so it stays hidden in production
 * until a human flips it to false.
 *
 *   node scripts/publish-draft.mjs physics
 *   node scripts/publish-draft.mjs physics --max 25
 *   node scripts/publish-draft.mjs physics --ids physics-kalda-mechanics,physics-nepho-2022
 *   node scripts/publish-draft.mjs physics --no-papers
 *   node scripts/publish-draft.mjs physics --dry
 */
import fs from "node:fs";
import path from "node:path";

const [, , slug, ...rest] = process.argv;
const has = (f) => rest.includes(f);
const val = (f) => {
  const i = rest.indexOf(f);
  return i >= 0 ? rest[i + 1] : undefined;
};
const fail = (m) => {
  console.error(`✖ ${m}`);
  process.exit(1);
};

if (!slug) fail("usage: node scripts/publish-draft.mjs <slug> [--max N] [--ids a,b] [--no-papers] [--dry]");

const draftFile = path.join("content-src", `${slug}.draft.json`);
const outDir = path.join("data", "subjects", slug);
if (!fs.existsSync(draftFile)) fail(`${draftFile} not found — run: npm run ingest content-src/${slug}.md ${slug}`);
if (!fs.existsSync(path.join(outDir, "meta.json"))) fail(`${outDir}/meta.json missing — the subject must exist first`);

const readJson = (f, fb) => {
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch {
    return fb;
  }
};

const draft = readJson(draftFile, null);
if (!draft) fail(`cannot parse ${draftFile}`);
const deny = readJson(path.join("data", "shared", "denylist.json"), { hosts: [], substrings: [] });

const denied = (u) =>
  deny.hosts.some((h) => u.includes(h)) || (deny.substrings ?? []).some((s) => u.includes(s));
const urlsOf = (r) =>
  [r.url, ...(r.extraLinks ?? []).map((l) => l.url), ...(r.files ?? []).map((f) => f.url)].filter(Boolean);

const skipped = [];
const usable = (r) => {
  const urls = urlsOf(r);
  if (r.access === "dead") return skipped.push([r.id, "access=dead"]), false;
  if (urls.length === 0) return skipped.push([r.id, "no URL"]), false;
  if (urls.some(denied)) return skipped.push([r.id, "denylisted host"]), false;
  if (!Array.isArray(r.levels) || r.levels.length === 0) return skipped.push([r.id, "no level"]), false;
  return true;
};

/** drop empty strings so the validator and UI never see "" */
const strip = (o, keys) => {
  for (const k of keys) if (o[k] === "" || o[k] == null) delete o[k];
  return o;
};

const normResource = (r) => {
  const o = { ...r };
  strip(o, ["author", "format", "licence", "accessNote"]);
  if (o.access === "ok") delete o.accessNote;
  return o;
};

const normPaper = (p) => {
  const o = { ...p };
  strip(o, ["accessNote", "licence"]);
  o.format = Object.fromEntries(
    Object.entries({ duration: null, marks: null, questions: null, calculator: null, negativeMarking: null, ...(p.format ?? {}) }).map(
      ([k, v]) => [k, v === "" || v === undefined ? null : v]
    )
  );
  // Unknown ⇒ false ("No official solutions found"); set true only after opening a solutions file.
  o.hasSolutions = o.hasSolutions === true;
  return o;
};

const wantIds = val("--ids")?.split(",").map((s) => s.trim());
const max = Number(val("--max") ?? 30);

const rank = (r) => (r.highlight ? 0 : 2) + (r.nepalSpecific ? 0 : 1);
let resources = (draft.resources ?? []).filter(usable);
if (wantIds) resources = resources.filter((r) => wantIds.includes(r.id));
else resources = [...resources].sort((a, b) => rank(a) - rank(b) || a.title.localeCompare(b.title)).slice(0, max);

let papers = has("--no-papers") ? [] : [...(draft.papers ?? []), ...(draft.paperSets ?? [])].filter(usable);
if (wantIds) papers = papers.filter((p) => wantIds.includes(p.id));

const merge = (file, incoming, norm) => {
  const existing = readJson(file, []);
  const have = new Set(existing.map((x) => x.id));
  const fresh = incoming.filter((x) => !have.has(x.id)).map(norm);
  return { existing, fresh, next: [...existing, ...fresh] };
};

const R = merge(path.join(outDir, "resources.json"), resources, normResource);
const P = merge(path.join(outDir, "papers.json"), papers, normPaper);

console.log(`\n${slug}: +${R.fresh.length} resources, +${P.fresh.length} papers (existing kept: ${R.existing.length} / ${P.existing.length})`);
if (skipped.length) {
  console.log(`skipped ${skipped.length}:`);
  skipped.slice(0, 15).forEach(([id, why]) => console.log(`  - ${id}: ${why}`));
}

if (has("--dry")) {
  console.log("\n(dry run — nothing written)");
  process.exit(0);
}
fs.writeFileSync(path.join(outDir, "resources.json"), JSON.stringify(R.next, null, 2) + "\n");
fs.writeFileSync(path.join(outDir, "papers.json"), JSON.stringify(P.next, null, 2) + "\n");

console.log(`
✔ written. Everything is still "needsReview": true  (hidden on the live site).
Next:
  1. npm run dev            → open /olympiads/${slug} and click every link
  2. In the JSON: tag topics, write a short "why", fill paper formats, then set "needsReview": false
  3. npm run validate:data -- --draft   → fix every ERROR (warnings are OK)
  4. npm run build
`);
