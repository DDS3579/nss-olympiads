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
- T4.1/T4.2: legacy sections filter level+topic from the URL now; q/type/nepal/sol parse and persist but take effect when ResourceCard/PaperCard rebuild lands (T4.5/T4.6). FilterBar UI itself is T4.5.
- T4.2: old focus* context deleted ahead of T5.1 (T4.5's "old focusTopic context is deleted" executed now); percent/currentStage/nextAction stay until the T5.1 store rewrite.
- T4.4: StartHere facts use the first round per level where several exist (astronomy national/international); the date row merges all rounds of that level (upcoming first, max 3).
- T4.4: "Facts verified … /about#verification" renders as plain text until /about ships (T6.4).
- T4.4: "Beginner path" sets type=handout in the URL; legacy sections apply level+topic only — type filtering activates with ResourceCard (T4.6).
- T4.5: sticky behaviour achieved with CSS containment (FilterBar sticky inside the Materials+Papers wrapper) instead of an IntersectionObserver — same UX, no observer lifecycle to manage.
- T4.5: Level renders as a <select> in the bar at all sizes (the full radiogroup already sits directly above as LevelTabs); Type renders as a labelled <select> (11 chip options don't fit one row).
- T4.5: "Has solutions" stays enabled with an sr-only "(applies to past papers only)" note — one shared bar serves both lists.
- T4.5: Materials & Papers sections now consume SubjectData records directly; the legacy bridge no longer carries studyMaterial/modelPapers consumers. Progress still keys on titles until the T5.1 store rewrite.
- T4.6/T4.7: T5.1 progress store pulled forward (cards key Save/Done/attempts on record ids per plan rule 7); legacy context kept running for NextStep/percent until T5.2, with dual-writes in the cards meanwhile.
- T4.7: "Start timed attempt" + score input land with PaperTimer (T4.8, next); PaperCard renders status chips only — no dead buttons.
- T4.7: J.2 papers empty-state link "See what we're building → #contacts" activates at T4.14 (Contacts section).
- FilterBar paper counts now exclude answer-key records so the count matches the visible card list.
- T4.8: Reset = restart full countdown while staying running (standard timer UX). Switch to "reset → setup screen" if preferred.
- T4.8: timer lives in its own localStorage slot (nss:v2:timer) as a single active timer; attempts are still recorded in the main progress store keyed by paper id.
- T4.8: "Sound on time-up" creates the AudioContext on the Start click (autoplay-safe); beep is a short 880 Hz sine, no asset loaded.
- T4.8: PaperCard keeps the T4.7 dual-write (actions.opened + markPaperAccessed) on opening the questions file, so NextStep's nextAction does not regress before T5.2.
- T4.9: syllabusMeta.pdfUnderReview=true for all six transcribed subjects until M-01/M-02 complete; heading flips to "Official syllabus" per subject when the owner sets officialVerified=true after reading it live.
- T4.9: NEB coverage filled only where the research files contain the analysis (biology B-9, chemistry C-4, astronomy A-5, maths M-1); everything else "Not yet mapped" (GS-5 pending). Physics experimental nepalMaterialExists=true conflicts with Appendix G — physics.md evidences Guide ch.6–7 + 3 Kafle handouts; owner to settle.
- T4.9: informatics syllabus rendered as the IOI's 8 groups + Excluded/Outside-focus sections; the 148/85/24 strip reads from syllabusMeta.levelCounts (validator cross-check not wired yet).
- T4.9: types.ts syllabusMeta gained optional pdfUnderReview + weightSource (additive; plan sanctions pdfUnderReview explicitly). lib/types.ts already carried ioiCategory, so only these two keys were added.
- T4.9: SyllabusSection.tsx and SubjectExperience.tsx swap the prop contract in one step, so the commit between them does not typecheck (same unavoidable window as T4.6/T4.7).
- T4.9: the "Print checklist" button calls window.print() and relies on the T3.7 print stylesheet hiding [data-no-print] chrome.
- T4.10: node dimming only applies when the subject has prereq edges (otherwise focusing a topic would dim the entire map, since edges are prereq-only by rule).
- T4.10: rings with ≥7 nodes (astronomy province: 14) use alternating inside/outside radial labels; labels are line-clamped at 3 lines with the full name in title/aria-label.
- T4.10: ?hl=<id> card-flash for gapSubstituteId deferred — all gapSubstituteId values are null until curation (M-04).
- T4.10: Constellation now reads SubjectData directly and recomputes edges from topic.prereqs; lib/layout.ts additionally exports RING_R and firstLevel (layoutTopics keeps its signature for legacy.ts).
- T4.11: "Start topic" renamed "Track this topic" and rewired to the v2 store's tracked[] (the legacy context's focus* helpers were deleted back in T4.2).
- T4.10/T4.11: Constellation and OlympiadTopics both swap to the data prop, healed by the SubjectExperience commit — so two intermediate commits do not typecheck individually.
- T4.12: all 7 subjects render the honest featured-problem empty state — every seeded entry is verified:false pending M-10; the maths entry must be REPLACED (ill-posed, U-24), not verified. Weekly rotation (ISO week) and the "This week's challenge" heading activate automatically once ≥1 entry is verified.
- T4.13: astronomy roadmap filled from Appendix E with all dates verified against astronomy.md; other subjects keep placeholder:true stages — PART 7 exists in all six pasted research files and can be transcribed on request.
- T4.13: "You are here" = first stage matching the chosen level; levels with several stages (astronomy national: 4) highlight the entry stage. Percent-derived stage state deleted entirely.
- T4.13: types.ts RoadmapStage gained optional dates[] (additive) for multi-milestone stages.

- T4.14: physics gaps.json carries the 15 subject gaps; ALL-1 (problem bank, out of launch scope) and ALL-2 (taxonomy rebase, done in code) excluded per plan M.2-8. Other subjects keep their "all"-level gaps (they are real subject gaps).
- T4.14: aiSpec is verbatim-intent for physics, one-sentence condensed for the other five subjects; full briefs remain in content-src/<slug>.md PART 6.
- T4.15: hero "Levels" chip renders "{n} + {slot}" for subjects with an exists:false slot (Foundation/Entry/Round 1/IOI); lastVerified shows "—" until a subject has records.
- T4.14: OlympiadNav's secondary strip had no "problem" entry before this stage; the spec's replacement block re-added it alongside "contacts", so the sub-nav now reads Map · Topics · Problem · Roadmap · Contacts.
- T4.14/T4.15: SubjectExperience is one file edited for both stages (ContactsSection mount + hero data prop), so it carries a single commit covering both.

- T5.2: legacy progress context + NextStep deleted entirely (B-12 closed); ContinueCard mounts at top of #start; homepage//olympiads reuse arrives with T6.1/T6.2. Export/Import move to /my-plan (T5.4, next).
- T5.3: search index carries cv (colorVar) beyond the plan's field list — needed for the subject colour dot in results.
- T5.3: "/" ownership split — FilterBar owns it on subject pages (data-filter-search marker), palette owns it everywhere else; Ctrl/⌘+K always opens the palette. g-then-key and ? help dialog land with T5.7.
- T5.3: hl= param is emitted by search deep links; the card flash-highlight consumer arrives with the T4.6 card polish (param is a no-op until then).
- T5.3: route uses `export const dynamic = "force-static"` — flag name must be verified against Next 16 route-handler docs (R0.1); paste the error if the build rejects it.
- T5.3: force-static verified in node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md ("Caching"); /search-index.json is emitted as a static body in the build output.
- T5.3: the index currently contains 65 topics + 10 papers and 0 resources — no subject has resources.json yet, so material/dataset hits appear only once those datasets land.

- T5.3 fix: the palette now only yields "/" to the FilterBar when that input is actually on screen (below md it lives in the hidden desktop row, so "/" was dead on phones); pasted code checked mere presence.
- T5.3 fix: /search writes ?q= only after the initial read, otherwise the mount-time replaceState stripped a shared /search?q=… link before it was applied (verified: ?q=optics now prefills and returns 2 results).
- T5.2 fix (pre-existing): store getServerSnapshot returned a fresh object on every call, which React reports as "should be cached to avoid an infinite loop"; it now returns a frozen singleton. Surfaced by ContinueCard's SSR pass, verified clear in the console afterwards.
