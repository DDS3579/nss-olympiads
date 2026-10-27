#!/usr/bin/env node
/**
 * seed-phase1-content.mjs — one-time seeder for T1.8.
 * featured.json: old featured problems, verified:false → hidden until M-10 (T4.12 rule).
 * roadmap.json:  old DEFAULT_ROADMAP, placeholder:true → "Draft roadmap" tag until T4.13.
 */
import fs from "node:fs";
import path from "node:path";

const ROADMAP = [
  { id: "foundations", level: "district", title: "Foundations", what: "Build core concepts from your school syllabus before touching Olympiad-level problems. Focus on accuracy over speed.", actions: [], outcome: "Confident with fundamentals", placeholder: true },
  { id: "intermediate", level: "province", title: "Intermediate", what: "Work through Olympiad problems by topic. Start recognising the patterns that sit behind the problems.", actions: [], outcome: "Topic-level fluency", placeholder: true },
  { id: "advanced", level: "national", title: "Advanced", what: "Tackle multi-concept and proof-based problems. Develop rigorous, competition-grade arguments.", actions: [], outcome: "Solves hard problems", placeholder: true },
  { id: "simulation", level: "national", title: "Simulation", what: "Attempt full-length past papers under real timing. Build stamina and exam temperament.", actions: [], outcome: "Exam-ready speed", placeholder: true },
  { id: "olympiad", level: "international", title: "Olympiad", what: "Final refinement. Light practice, weak-area review, and peak taper before the national round.", actions: [], outcome: "Compete at nationals", placeholder: true }
];

const FEATURED = {
  mathematics: {
    id: "mathematics-a-functional-equation", title: "A Functional Equation", topicId: "algebra-inequalities", level: "international", difficulty: 4,
    statement: "Find all functions f : ℝ → ℝ such that f(x + f(y)) = f(x) + y for every real x and y.",
    hint: "Prove f is bijective, then show it must be additive and equal to the identity.",
    sourceLabel: "Attributed to IMO Shortlist — unverified. Ill-posed as stated (U-24); owner must verify or replace (M-10)."
  },
  physics: {
    id: "physics-escape-velocity", title: "Escape Velocity", topicId: "mechanics", level: "international", difficulty: 3,
    statement: "A body is projected vertically from Earth's surface. Find the minimum speed needed to escape Earth's gravitational field, neglecting air resistance.",
    hint: "Conserve mechanical energy between the surface and infinity.",
    sourceLabel: "IPhO Preparation — citation to verify (Appendix H suggests IPhO 2019 P1 or IPhO 1991 P1)."
  },
  chemistry: {
    id: "chemistry-weak-acid-equilibrium", title: "Weak Acid Equilibrium", topicId: "physical-chemistry", level: "international", difficulty: 3,
    statement: "A 0.1 M solution of a weak acid HA has pH 3. Estimate the acid dissociation constant Ka.",
    hint: "Use Ka ≈ [H+]² / (c − [H+]) with [H+] = 10⁻³.",
    sourceLabel: "IChO Preparatory — citation to verify (Appendix H suggests IChO 2024 Prep P12)."
  },
  astronomy: {
    id: "astronomy-binary-star-masses", title: "Binary Star Masses", topicId: "", level: "international", difficulty: 4,
    statement: "Two stars orbit their common centre of mass with period P and separation a. Express the total mass of the system.",
    hint: "Apply Kepler's third law: M = 4π²a³ / (G P²).",
    sourceLabel: "IOAA Data Round — real source IOAA A.2.5 Stellar Systems (Appendix H). topicId pending astronomy.md."
  },
  ai: {
    id: "ai-gradient-descent-update", title: "Gradient Descent Update", topicId: "", level: "district", difficulty: 2,
    statement: "State the parameter update rule for gradient descent on a loss L(θ) with learning rate η.",
    hint: "θ ← θ − η∇L(θ).",
    sourceLabel: "IOAI Qualifier — citation to verify (Appendix H: AION Round 1). topicId pending ai.md."
  },
  informatics: {
    id: "informatics-merge-sort-recurrence", title: "Merge Sort Recurrence", topicId: "sorting-searching", level: "national", difficulty: 2,
    statement: "Give the time complexity of merge sort and justify it from its recurrence.",
    hint: "T(n) = 2T(n/2) + O(n), which solves to O(n log n).",
    sourceLabel: "National Round — citation to verify."
  },
  biology: {
    id: "biology-dihybrid-cross", title: "Dihybrid Cross", topicId: "genetics-evolution", level: "international", difficulty: 2,
    statement: "In a dihybrid cross AaBb × AaBb, what fraction of offspring display both dominant phenotypes?",
    hint: "Independent assortment gives 9/16.",
    sourceLabel: "IBO Theory — citation to verify (Appendix H suggests IBO 2024 Theory A, CC BY-NC-SA)."
  }
};

for (const slug of Object.keys(FEATURED)) {
  const dir = path.join("data", "subjects", slug);
  const f = FEATURED[slug];
  fs.writeFileSync(path.join(dir, "featured.json"), JSON.stringify([{
    id: f.id, title: f.title, topicId: f.topicId, level: f.level, difficulty: f.difficulty,
    statement: f.statement, hint: f.hint, solutionUrl: null,
    source: { label: f.sourceLabel, url: "" }, verified: false
  }], null, 2));
  fs.writeFileSync(path.join(dir, "roadmap.json"), JSON.stringify(ROADMAP, null, 2));
}
console.log("seeded featured.json + roadmap.json for:", Object.keys(FEATURED).join(", "));
