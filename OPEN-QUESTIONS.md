# OPEN-QUESTIONS.md

Per PLAN.md R0.12. Agent proceeds with the stated default until the owner answers.

## Owner decisions

| # | Question | Owner answer | Default in use | Status |
|---|----------|--------------|----------------|--------|
| Q2 | Host Maths District 2026 papers publicly? | Yes | Host; licence "NSS Clubs — hosted with permission (owner to confirm)" | ✅ |
| Q3 | Which answers belong to which paper? | Not sure | One "Answers (all papers)" file, soft-gated after attempt | ⚠ default |
| Q4 | Production domain? | Default fine | `https://nss-olympiads.vercel.app` via `NEXT_PUBLIC_SITE_URL` | ✅ |
| Q9 | Definition of `nepalSpecific`? | "For Nepali Aspirants" | Too broad as stated (would badge everything). Provisionally: authored/run by a Nepali body or authors, or official Nepali curriculum. | 🔴 confirm |
| Q13 | Does Nepal field an IOI team? | Remove the claim | Nepal is not yet an IOI member; copy fixed in T0.13 | ✅ |

## Data needed

| Item | Status |
|------|--------|
| content-src/: physics, mathematics, chemistry, biology, astronomy, informatics | ✅ present |
| content-src/ai.md | ⏳ missing — AI subject gets honest empty states until supplied |
| M-01/M-02 syllabus PDF citation fixes | ⏳ owner, at end |
| M-04–M-11 content passes (curation, hasSolutions, marking rules, operations, spotlight, records, featured problems, branding) | ⏳ owner, at end |
| M-13 NPS paper retrieval | ⏳ owner |
| M-14 FAQ/Privacy/Terms approval | ⏳ owner |

## Deviations from plan
- T1.1: `CountryRecord.firstYear` widened to `number | null` + optional `note` added — Appendix C's informatics record requires both (Nepal has no IOI participation; null is the honest value).
- T1.2: denylist includes `olimpicos.net` per Appendix F, but chemistry.md verifies `olimpicos.net/icho/` as ✅ LIVE. Owner decision needed at Chemistry ingest (Phase 2).
- T1.5: `prebuild` runs gen:registry only until validate-data.mjs exists (Phase 2); strict validation wired at T10.5.
- T1.3: kept the site's existing series numbering (math 01 … biology 07); research files number subjects differently — kept site identity per R0.4.
- T1.3: astronomy & ai meta.json are PARTIAL (seeded from PLAN Appendix B/C only) until astronomy.md PART 0 is pasted and ai.md is supplied.
- T1.3: every hosted syllabus PDF starts at syllabusMeta.officialVerified=false until M-01/M-02 provenance checks (chemistry/biology/ai files state no official syllabus was ever published).
- T1.3: astronomy provincial fee (NRs 1,000 / 50% waiver) omitted — plan says verify against astronomy.md first.
- T1.3: informatics registration deadline conflict (2025-10-30 official vs 2026-01-15 extended third-party) — official used (Gap I-2).
- T1.3: MAN conflicts logged, /programs pages used: DMO grades 8–12 vs 9–12 (Gap M-3), NMO shortlist Top 20 vs Top 30 (Gap M-2).
- T1.3: STAN email/phone in chemistry meta sourced from the biology file (same body) — owner to confirm.
- T1.4: astronomy topics.json = [] and ai topics.json = 4 IOAI sections with empty subtopics — completion blocked on astronomy.md PART 0 / ai.md.
- T1.4: gap:true set per Appendix G; owner must confirm each before badges render (T4.11 rule).
- T1.4: physics Appendix-G sub-topic gaps (gravitation, SHM, rotation, elasticity, hydrostatics, DC circuits) deferred to gaps.json (Phase 2); topics.json mirrors official syllabus sections only.
- T1.4: chemistry topics = 12 IChO theory sections + practical-skills + molecular-orbital-theory node; the four traditional divisions are kept as grouping for syllabus.json.
- T1.6: plan's example used `kind` on Paper records; Appendix A type has `kindHosting` — used the real field.
- T1.6: Maths paper format facts derived from MAN's published DMO spec (50 MCQ / 100 min / −0.25 / 25 marks = 50% ⇒ 50 marks); provenance of the hosted PDFs still OWNER-TO-CONFIRM (needsReview:true).
- T1.8: old invented syllabus cards (U-23) intentionally not ported — section shows honest empty state + syllabus PDF button until syllabus.json is transcribed (GS-6, Lane B).
- T1.8: featured problems hidden site-wide (verified:false) until M-10; the maths problem is ill-posed (U-24) and must be replaced, not just verified.
- T1.8: hero "disciplines" line derives from first 5 official topic names; "Level" chip shows the international contest short-name — both replaced by computed stats in T4.15.
- T1.8: placeholder roadmap kept verbatim (incl. "Compete at nationals", U-25) until T4.13 replaces it with dated stages.
- T1.8: astronomy/ai featured topicId left "" pending their topics.json completion.
- T1.8: `components/olympiad/legacy.ts` imports only `MotifKey`/`SubjectData` from `@/lib/types` — the plan's snippet also imported `Level`/`Topic`, which collide with the adapter's own `Topic` interface (TS2440) and were unused.
- T2.2/T2.4: validate:data not yet wired into prebuild — drafts carry needsReview:true (and 42 hasSolutions:null on Physics) so strict validation would red-line every build. Wired after owner M-04/M-05 review pass (plan itself schedules strict at T10.5).
- T2.4: draft JSONs stay in content-src/ until curation — splitting into data/subjects/ publishes rows live via the legacy adapter (R-G1 curation + M-05 hasSolutions must come first).
- T2.1: Chemistry's IChO archive tables (Volumes 1–5, direct 2020–25 exam PDFs, prep series D) are skipped by K.1's row-id rule — extend ingest needles at Chemistry split time.
- Chemistry F5 (olimpicos.net/icho/) conflicts with the denylist — owner decision pending (from T1.2).
- T2.1: Physics pilot reproduced the Appendix K.1 counts on every line except missingWhy (21 vs the plan's 29) — the local physics.md resolves a why-column on 8 more rows. No effect on the 95/44/51/9 record counts.
- T3.3: 11px kept only on uppercase eyebrows (SectionHeading, SectionLabel, hero/nav/footer eyebrows); three decorative index-numeral rows keep their fade but are now aria-hidden.
- Astronomy completion: meta.json + topics.json filled from astronomy.md; fee NRs 1,000 / 50% waiver verified in-file (earlier hold resolved). Astronomy gap:true on the practical topic follows Appendix G — owner to confirm; note Ayush Tiwari's Practical Handouts (Nepal IOAA 2025 team member) may already cover parts of it (candidate gapSubstitute).
- Heads-up: astronomy (15), chemistry (14) and informatics (13) topics render through the legacy constellation, which was hand-tuned for ≤7 nodes — expect crowding until the T4.10 rebuild.
- T3.7: print block extended with a light-palette token override so dark-mode users print clean white pages (plan block alone would print navy in dark theme).
- T3.8: reduced-motion gating extended to MagneticButton, GeometricHeroCanvas and Radix sheet/tab keyframes (plan named Constellation/Roadmap/Navbar — Constellation and Roadmap were already compliant; the extensions follow R0.8's "every animated component").