#!/usr/bin/env node
/**
 * check-links.mjs — HEAD/GET-checks every external URL in data/subjects/**.
 * NEVER edits data. Writes link-report.json and prints non-2xx rows.
 * Records with access:"caveat" are skipped (known bot-walls / geo-blocks / logins —
 * feynmanlectures.caltech.edu, media.edusanjal.com, bdpho.org, Scribd, ACS, RSC, HBCSE…).
 */
import fs from "node:fs";
import path from "node:path";

const DATA = path.join(process.cwd(), "data", "subjects");
const UA = "NSSOlympiadHub-linkcheck/1.0 (+nssclub2078@gmail.com)";
const TIMEOUT = 10_000;
const CONCURRENCY = 6;
const HOST_SPACING_MS = 150; // politeness per host

const slugs = fs.existsSync(DATA)
  ? fs.readdirSync(DATA).filter((d) => fs.statSync(path.join(DATA, d)).isDirectory())
  : [];

const jobs = [];
for (const slug of slugs) {
  for (const list of ["resources", "originals", "papers"]) {
    const file = path.join(DATA, slug, `${list}.json`);
    if (!fs.existsSync(file)) continue;
    for (const it of JSON.parse(fs.readFileSync(file, "utf8"))) {
      if (it.access === "caveat") continue; // known false negatives
      const urls =
        list === "papers"
          ? (it.files ?? []).map((f) => f.url)
          : [it.url, ...(it.extraLinks ?? []).map((l) => l.url)];
      for (const url of urls) {
        if (!url || url.startsWith("/")) continue; // skip hosted files
        jobs.push({ id: it.id, url });
      }
    }
  }
}

const lastHit = new Map(); // host → last request time
async function check({ id, url }) {
  const host = new URL(url).host;
  const wait = (lastHit.get(host) ?? 0) + HOST_SPACING_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastHit.set(host, Date.now());
  const t0 = Date.now();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    let res = await fetch(url, {
      method: "HEAD", redirect: "follow", signal: ctrl.signal,
      headers: { "User-Agent": UA },
    });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, {
        method: "GET", redirect: "follow", signal: ctrl.signal,
        headers: { "User-Agent": UA, Range: "bytes=0-0" },
      });
    }
    return { id, url, status: res.status, ms: Date.now() - t0, finalUrl: res.url || url };
  } catch (e) {
    return {
      id, url, status: 0, ms: Date.now() - t0, finalUrl: url,
      error: e.name === "AbortError" ? "timeout" : String(e.message || e).slice(0, 80),
    };
  } finally {
    clearTimeout(timer);
  }
}

console.log(`checking ${jobs.length} external URL(s)…`);
const results = [];
let i = 0;
async function worker() {
  while (i < jobs.length) results.push(await check(jobs[i++]));
}
await Promise.all(Array.from({ length: Math.min(CONCURRENCY, Math.max(1, jobs.length)) }, worker));

fs.writeFileSync("link-report.json", JSON.stringify(results, null, 2));
const bad = results.filter((r) => r.status < 200 || r.status >= 300);
if (bad.length) {
  console.log(`\n${bad.length} non-2xx result(s):`);
  for (const r of bad)
    console.log(`  ${String(r.status || "ERR").padEnd(4)} ${r.ms}ms  ${r.id}  ${r.url.slice(0, 80)}${r.error ? `  (${r.error})` : ""}`);
} else if (jobs.length) {
  console.log("all links returned 2xx ✅");
}
console.log(`report → link-report.json`);
