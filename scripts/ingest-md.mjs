#!/usr/bin/env node
/**
 * ingest-md.mjs — turns a "<SUBJECT>-Olympiad-Nepal-Resources.md" research file
 * (the Physics file is the reference format) into a DRAFT JSON that a human reviews.
 *
 * Usage:  node scripts/ingest-md.mjs content-src/physics.md physics
 * Output: content-src/physics.draft.json   (+ prints a summary + warnings)
 *
 * It NEVER writes into /data. A human copies reviewed items into data/subjects/<slug>/*.json.
 */
import fs from "node:fs";
import path from "node:path";

const [, , inFile, slug] = process.argv;
if (!inFile || !slug) {
  console.error("usage: node scripts/ingest-md.mjs <file.md> <slug>");
  process.exit(1);
}

const md = fs.readFileSync(inFile, "utf8").split(/\r?\n/);
const LEVELS = { 1: "district", 2: "province", 3: "national", 4: "international" };
const URL_RE = /https?:\/\/[^\s<>)\]|`"']+/g;

const clean = (s = "") =>
  s
    .replace(/\*\*|__/g, "")
    .replace(/`/g, "")
    .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, "$1")
    .replace(/<(https?:[^>]+)>/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

const statusOf = (cell = "") => {
  if (cell.includes("❌")) return "dead";
  if (cell.includes("⚠️")) return "caveat";
  if (cell.includes("✅")) return "ok";
  return "unknown";
};

// strip ⭐ and *italic notes* from a title; return {title, stars, note}
const tidyTitle = (raw = "") => {
  const stars = (raw.match(/⭐/g) || []).length;
  const notes = [...raw.matchAll(/\*([^*]+)\*/g)].map((m) => m[1].trim());
  const title = raw.replace(/⭐+/g, "").replace(/\*[^*]+\*/g, "").replace(/\s{2,}/g, " ").trim();
  return { title, stars, note: notes.join(" ") };
};

// best-effort normalised type (human must confirm)
const guessType = (kind, typeRaw = "", title = "") => {
  const t = `${typeRaw} ${title}`.toLowerCase();
  if (kind === "paper") return /result/.test(t) ? "official" : "pastpaper";
  if (/mock/.test(t)) return "mock";
  if (/official|portal|syllabus|statutes/.test(t)) return "official";
  if (/video|course|ocw|lecture/.test(t)) return "course";
  if (/book|textbook/.test(t)) return "book";
  if (/handout|article|guide|formula|booklet/.test(t)) return "handout";
  if (/problem (list|set|bank)|problems/.test(t)) return "problemset";
  if (/concept map|tool|platform|portal/.test(t)) return "tool";
  if (/past papers|archive|index/.test(t)) return "tool";
  return "handout";
};

const compiledDate = (() => {
  const m = md.join("\n").match(/Compiled:\s*\*{0,2}(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (!m) return new Date().toISOString().slice(0, 10);
  const mon = new Date(`${m[2]} 1, 2000`).getMonth() + 1;
  return `${m[3]}-${String(mon).padStart(2, "0")}-${String(m[1]).padStart(2, "0")}`;
})();

const slugify = (s) =>
  s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

const splitRow = (line) =>
  line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

const isSeparator = (line) => /^\|\s*:?-{3,}/.test(line.trim());

// ---------- 1) walk the file, collect tables with context ----------
let level = null; // district|province|national|international
let section = ""; // last ### heading text
let bold = "";    // last **bold line** (sub-section like "A. IPhO …")
const tables = []; // {level, section, bold, header[], rows[][]}

for (let i = 0; i < md.length; i++) {
  const line = md[i];
  const h1 = line.match(/^#\s+.*PART\s+(\d+)\s+—\s+LEVEL\s+(\d)/i);
  if (h1) level = LEVELS[Number(h1[2])];
  else if (/^#\s+.*PART\s+\d+/i.test(line)) level = null; // PART 0/5/6/7/8/9 → no level
  const h3 = line.match(/^###\s+(.*)/);
  if (h3) { section = clean(h3[1]); bold = ""; }
  const b = line.match(/^\*\*([A-E]\.\s.*?)\*\*\s*$/);
  if (b) bold = clean(b[1]);
  if (line.trim().startsWith("|") && md[i + 1] && isSeparator(md[i + 1])) {
    const header = splitRow(line).map(clean);
    const rows = [];
    let j = i + 2;
    while (j < md.length && md[j].trim().startsWith("|")) { rows.push(splitRow(md[j])); j++; }
    tables.push({ level, section, bold, header, rows, line: i + 1 });
    i = j - 1;
  }
}

const col = (header, ...needles) =>
  header.findIndex((h) => needles.some((n) => h.toLowerCase().includes(n)));

// ---------- 2) convert tables ----------
const items = [];      // resources + papers (single-URL rows)
const paperSets = [];  // multi-file rows (EuPhO style)
const gaps = [];
const contacts = [];
const rejected = [];
const warnings = [];

for (const t of tables) {
  const hdr = t.header.map((h) => h.toLowerCase());
  const sec = t.section.toLowerCase();
  const isPapers = /past papers/.test(sec) && /^\d\.\d/.test(t.section);
  const isStudy = /study materials/.test(sec) && /^\d\.\d/.test(t.section);

  // --- EuPhO-style "Year | Host | Theory Q | Theory Sol | Exp Q | Exp Sol"
  if (hdr.includes("host") && hdr.some((h) => h.includes("theory q"))) {
    for (const r of t.rows) {
      const files = [];
      const labels = ["Theory problems", "Theory solutions", "Experimental problems", "Experimental solutions"];
      const kinds = ["questions", "solutions", "questions", "solutions"];
      [2, 3, 4, 5].forEach((ci, k) => {
        const url = (r[ci] || "").match(URL_RE)?.[0];
        if (url) files.push({ label: labels[k], url, kind: kinds[k] });
      });
      paperSets.push({
        id: `EUPHO-${clean(r[0])}`.replace(/[^A-Za-z0-9-]+/g, "-"),
        title: `EuPhO — ${clean(r[0])} (${clean(r[1])})`,
        level: t.level || "international",
        files,
        hasSolutions: files.some((f) => f.kind === "solutions"),
        status: "ok",
      });
    }
    continue;
  }

  // --- Study/Past-paper tables with an id column (D1, S1, P1, N1, I1, A1, T1, C1…)
  if (isPapers || isStudy) {
    const iTitle = col(t.header, "paper", "resource", "item");
    const iUrl = col(t.header, "url", "direct link");
    const iStatus = col(t.header, "status");
    const iType = col(t.header, "type");
    const iWhy = col(t.header, "why", "what it is", "verified content", "date / content", "level analogue", "level fit");
    for (const r of t.rows) {
      const id = clean(r[0]);
      if (!/^[A-Z]{1,2}\d+$/.test(id)) {
        if (/—|-/.test(id) && r.some((c) => /NOT PUBLICLY AVAILABLE/i.test(c)))
          warnings.push(`known-missing row in "${t.section}": ${clean(r[1])}`);
        continue;
      }
      const urlCell = r[iUrl] || "";
      const urls = [...new Set(urlCell.match(URL_RE) || [])];
      // also grab markdown links "[Paper](url) · [Solutions](url)"
      const md2 = [...urlCell.matchAll(/\[([^\]]+)\]\((https?:[^)]+)\)/g)].map((m) => ({ label: m[1], url: m[2] }));
      const kind = /^[SC]/.test(id) ? "resource" : "paper";
      const rec = {
        id,
        kind,
        sourceSection: t.section + (t.bold ? ` / ${t.bold}` : ""),
        level: t.level,
        title: clean(r[iTitle]),
        typeRaw: iType >= 0 ? clean(r[iType]) : "",
        why: iWhy >= 0 ? clean(r[iWhy]) : "",
        urls: md2.length ? md2.map((m) => m.url) : urls,
        urlLabels: md2.length ? md2.map((m) => m.label) : undefined,
        status: statusOf(r[iStatus] || ""),
        statusNote: clean(r[iStatus] || "").replace(/^(✅|⚠️|❌)\s*/, ""),
        nepalSpecific: /nepal-specific|🇳🇵/i.test(r.join(" ")) && !/not nepal/i.test(r.join(" ")),
        translated: /🌏|translated/i.test(r.join(" ")),
      };
      if (rec.urls.length === 0) warnings.push(`no URL: ${id} "${rec.title}" (${t.section})`);
      if (rec.status === "unknown") warnings.push(`no status: ${id} "${rec.title}"`);
      items.push(rec);
    }
    continue;
  }

  // --- Gap register (PART 6.2)
  if (hdr[0] === "id" && hdr.some((h) => h.includes("ai-generation spec"))) {
    for (const r of t.rows) {
      gaps.push({
        id: clean(r[0]),
        level: clean(r[1]),
        missing: clean(r[2]),
        evidence: clean(r[3]),
        aiSpec: clean(r[4]),
        priority: clean(r[5]),
      });
    }
    continue;
  }

  // --- Contacts (PART 9)
  if (hdr[0] === "body") {
    for (const r of t.rows)
      contacts.push({ body: clean(r[0]), role: clean(r[1]), channels: clean(r[2]), urls: r[2].match(URL_RE) || [] });
    continue;
  }

  // --- Rejected list (PART 8.3)
  if (/rejected/i.test(t.section)) {
    for (const r of t.rows)
      rejected.push({ what: clean(r[0]), why: clean(r[1]), urls: [...(r[0].match(/[a-z0-9.-]+\.[a-z]{2,}(\/[^\s`]*)?/gi) || [])] });
  }
}

// ---------- 3) de-duplicate by URL, merging levels ----------
const byKey = new Map();
for (const it of items) {
  const key = it.urls[0] ? it.urls[0].replace(/\/$/, "") : `${it.kind}:${it.id}`;
  if (!byKey.has(key)) byKey.set(key, { ...it, levels: it.level ? [it.level] : [], ids: [it.id] });
  else {
    const e = byKey.get(key);
    if (it.level && !e.levels.includes(it.level)) e.levels.push(it.level);
    e.ids.push(it.id);
  }
}
const deduped = [...byKey.values()].map(({ level: _l, ...rest }) => rest);

const toResource = (d) => {
  const { title, stars, note } = tidyTitle(d.title);
  return {
    id: `${slug}-${slugify(title)}`,
    title,
    type: guessType("resource", d.typeRaw, title),
    levels: d.levels,
    topics: [], // ← AI/human tagging needed (gap F-1)
    author: "",
    nepalSpecific: d.nepalSpecific,
    kind: "external", // external | hosted | page
    url: d.urls[0] || "",
    extraLinks: d.urls.slice(1).map((u, i) => ({ label: d.urlLabels?.[i + 1] || `Link ${i + 2}`, url: u })),
    format: "",
    licence: "",
    access: d.status === "ok" ? "ok" : d.status === "caveat" ? "caveat" : d.status === "dead" ? "dead" : "unknown",
    accessNote: d.status === "ok" ? "" : d.statusNote,
    verified: compiledDate,
    why: (d.why || note).replace(/\*+/g, "").trim(),
    highlight: stars > 0,
    origin: "external",
    sourceIds: d.ids,
    needsReview: true,
  };
};

const toPaper = (d) => {
  const { title, stars, note } = tidyTitle(d.title);
  const year = (title.match(/\b(19[6-9]\d|20[0-3]\d)\b/) || [])[1];
  return {
    id: `${slug}-${slugify(title)}`,
    title,
    type: guessType("paper", d.typeRaw, title),
    levels: d.levels,
    year: year ? Number(year) : null,
    topics: [],
    files: d.urls.map((u, i) => ({ label: d.urlLabels?.[i] || (i === 0 ? "Open" : `File ${i + 1}`), url: u, kind: "questions" })),
    format: { duration: "", marks: null, questions: "", calculator: "", negativeMarking: null },
    hasSolutions: /solution|answer|marking/i.test(title) ? true : null, // ← must be confirmed (M-05)
    nepalSpecific: d.nepalSpecific,
    access: d.status === "ok" ? "ok" : d.status === "caveat" ? "caveat" : d.status === "dead" ? "dead" : "unknown",
    accessNote: d.status === "ok" ? "" : d.statusNote,
    verified: compiledDate,
    why: (d.why || note).replace(/\*+/g, "").trim(),
    highlight: stars > 0,
    origin: "external",
    sourceIds: d.ids,
    needsReview: true,
  };
};

const out = {
  slug,
  generatedFrom: path.basename(inFile),
  generatedAt: new Date().toISOString(),
  fileCompiledOn: compiledDate,
  counts: {
    tablesFound: tables.length,
    rawRows: items.length,
    afterDedupe: deduped.length,
    resources: deduped.filter((d) => d.kind === "resource").length,
    papers: deduped.filter((d) => d.kind === "paper").length,
    paperSets: paperSets.length,
    nepalSpecificFlagged: deduped.filter((d) => d.nepalSpecific).length,
    byStatus: deduped.reduce((a, d) => ((a[d.status] = (a[d.status] || 0) + 1), a), {}),
    missingWhy: deduped.filter((d) => !d.why).length,
    gaps: gaps.length,
    contacts: contacts.length,
    rejected: rejected.length,
  },
  resources: deduped.filter((d) => d.kind === "resource").map(toResource),
  papers: deduped.filter((d) => d.kind === "paper").map(toPaper),
  paperSets: paperSets.map((p) => ({
    id: `${slug}-${slugify(p.title)}`,
    title: p.title,
    type: "pastpaper",
    levels: [p.level],
    year: Number((p.title.match(/\b(20\d\d)\b/) || [])[1]) || null,
    topics: [],
    files: p.files,
    hasSolutions: p.hasSolutions,
    nepalSpecific: false,
    access: "ok",
    accessNote: "",
    verified: compiledDate,
    why: "",
    origin: "external",
    needsReview: true,
  })),
  gaps,
  contacts,
  rejected,
  warnings,
};

// ensure unique ids (suffix -2, -3 …)
{
  const seen = new Map();
  for (const rec of [...out.resources, ...out.papers, ...out.paperSets]) {
    const n = (seen.get(rec.id) || 0) + 1;
    seen.set(rec.id, n);
    if (n > 1) rec.id = `${rec.id}-${n}`;
  }
}

const dest = path.join(path.dirname(inFile), `${slug}.draft.json`);
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out.counts, null, 2));
console.log(`\n${warnings.length} warning(s):`);
warnings.forEach((w) => console.log("  - " + w));
console.log(`\n→ wrote ${dest}`);
