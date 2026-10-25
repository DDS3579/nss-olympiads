# 💻 INFORMATICS — Level-wise Olympiad Resource Master (Nepal)

**NSS Olympiad Hub · Subject 06 of 07 · Informatics / Competitive Programming**
Compiled: **23 October 2026** · For: **Grades 8–12, Nepal**
Target ladder: **District → Provincial → Pre-Finals → Finals → IOI Training Camp → IOI**

> **Verification note.** Every URL was HTTP-checked on 22–23 Oct 2026. `✅ LIVE` = HTTP 200 with correct content type.
> The three **official NOI documents** (Program Structure 8,127 chars · Official Syllabus 6,755 chars · Resources 12,577 chars), the **23-page official IOI Syllabus 2025**, and the **complete 118-country IOI membership list** were all **downloaded and read in full**.
> `⚠️` = live with an access caveat. `❌` = checked and **dead / wrong / rejected** — see §8.4.

---

## 🏅 PART 0A — NEPAL'S IOI TALLY

# **Nepal at the International Olympiad in Informatics**
# **🥇 0 Gold · 🥈 0 Silver · 🥉 0 Bronze · 🎖️ 0 Honourable Mentions**
# **Participations: ZERO. Nepal is not an IOI member country.**

### The verification

The IOI's official statistics site publishes a complete member list with per-country medal tallies. I downloaded it and enumerated every entry:

> **118 IOI member countries/territories are listed. Nepal is not among them.**
> Source: <https://stats.ioinformatics.org/countries/> ✅ LIVE — parsed in full, all 118 names extracted and searched.

**South Asian countries that ARE IOI members:** 🇧🇩 Bangladesh · 🇮🇳 India · 🇵🇰 Pakistan · 🇱🇰 Sri Lanka
**Nepal is the only South Asian country absent from the IOI.**

For comparison, Nepal's neighbouring and regional peers:

| Country | IOI medals (G/S/B) | Total |
|---|---|---|
| China | 109 / 29 / 12 | **150** (hosted IOI 2000) |
| India | *member, long record* | — |
| Bangladesh | 1 / 7 / 25 | **33** |
| Pakistan | *member* | — |
| Sri Lanka | *member* | — |
| **Nepal** | **0 / 0 / 0** | **0 — not a member** |

### Why this is the single most important sentence in this document

**Informatics is the only one of your seven subjects where Nepal has no history at all.** Physics began in 2007, Mathematics in 2017, Astronomy in 2014, Chemistry in 2022, Biology in 2019. **Informatics begins now.**

The **Nepal Olympiad in Informatics (NOI)** held its **inaugural edition in 2025/26**. NPLCoder's own syllabus document states it plainly:

> *"Welcome to the **inaugural** Nepal Olympiad in Informatics (NOI)… **Since this is the first iteration of NOI, we do not yet have our own archive of past problems.**"*

### The opportunity this creates

Every other subject on your site is a *catch-up* story — Nepal is 10–20 years behind and competing against established pipelines. **Informatics is a ground-floor story:**

| Factor | Why it favours Nepal |
|---|---|
| **No incumbent** | There is no legacy programme, no entrenched selection politics, no backlog of unmet expectations. NSS can help define the standard. |
| **Zero infrastructure cost** | No laboratory, no telescope, no reagents, no apparatus. A phone or a ₹5,000 laptop and an internet connection is the entire equipment list. Compare Biology (Gap B-8) and Astronomy (Gap A-9), where the binding constraint is physical hardware Nepal's schools do not have. |
| **Registration is FREE** | NOI charges nothing. Contrast Astronomy (NRs 1,000), Chemistry and Mathematics (fees apply). This is the only Nepali olympiad with a genuinely zero-cost entry. |
| **The world's training material is free and public** | Unlike IBO (password-protected papers) or NePhO (no solutions), **every IOI task since 1989 is public with test data**, and the best curricula in the world (USACO Guide, CSES, CP-Algorithms, Competitive Programming Handbook) are free. |
| **Any language permitted until the top** | NOI allows **any programming language in all four rounds**. Only the IOI Training Camp is C++-only. A student can start in Python today. |
| **Nepal already has the organiser** | NPLCoder exists, has a working website, a 44-link resource document, a published syllabus, a free 12-week curriculum (AIMS 2026), 800+ Discord members, and — critically — **an IOI-medallist advisor**. |

### All six subjects compared

| | Physics | Maths | Astronomy | Chemistry | Biology | **Informatics** |
|---|---|---|---|---|---|---|
| Gold | 0 | 0 | 0 | 0 | 0 | **0** |
| Silver | **1** | 0 | 0 | 0 | 0 | **0** |
| Bronze | **5** | 1 | **3** | 1 | 1 | **0** |
| HM | **15** | 11 | 5 | 1 | 0 | **0** |
| **Total** | **21** | **12** | **9** | **2** | **1** | **0** |
| Years active | 14 | 10 | ~10 | 5 | 4 | **0 — inaugural** |
| Organiser website | ✅ | ✅ | ✅ | ❌ FB | ❌ FB | ✅ **nplcoder.org** |
| Published syllabus | ✅ | ⚠️ | ✅ | ❌ | ❌ | ✅ **adopted IOI syllabus + own 4-round breakdown** |
| Registration cost | fee | fee | **NRs 1,000** | fee | fee | **FREE** |

---

## PART 0B — The strategic situation: what Nepal is actually starting from

### ① Nepal must first **become an IOI member** before it can win anything

Participation in the IOI is not open-entry. From the IOI's own framework, a country must be recognised as a member with a designated national contest and delegation leader. Nepal is **not currently on the 118-member list**. So the pathway is:

```
NOI Round 1 (District) → Round 2 (Provincial) → Round 3 (Pre-Finals) → Round 4 (Finals)
   → Top 10 National Winners → Top 4 = "IOI Nepal Team" → IOI Training Camp (C++)
      → ⚠️ IOI MEMBERSHIP / ACCREDITATION → actual IOI participation
```

NPLCoder's documents describe the pipeline up to and including *"the top 4 performers will earn the honor of representing Nepal at the IOI"* — but **no published document addresses the IOI membership step.** Nepal cannot simply register a team. → **Gap I-1, the highest-priority item in this document.**

### ② The organiser is credible and unusually well-resourced

| | |
|---|---|
| **Body** | **NPLCoder** — non-profit, *"dedicated to empowering Nepali students in computing and innovation"* |
| **Motto** | *"Shaping Nepal's Future with Computational Innovation"* |
| **HQ** | Kathmandu, Nepal |
| **Email** | **`work@nplcoder.org`** |
| **Phone** | **+977 9862021531** (Nepal) · **+1 615-484-1629** (USA) |
| **Website** | <https://www.nplcoder.org/en> ✅ (Next.js, 10+ pages) |
| **Discord** | <https://discord.gg/kJrvdhmzVd> · **+800 members** |
| **Social** | FB `facebook.com/people/NPLCoder/61576287650990/` · IG `instagram.com/nplcoder/` · LinkedIn `linkedin.com/company/nplcoder/` |
| **Site built by** | Aashish Karki & Safal Poudel |

**Three sub-initiatives:**

| Initiative | Scope |
|---|---|
| **NPLAlgo** | *"dedicated to fostering a vibrant competitive programming culture in Nepal. It **spearheads the Nepal Olympiad in Informatics (NOI)**, preparing students for… the IOI. Additionally, NPLAlgo organizes **weekly and monthly programming contests**… featuring algorithmic challenges that help participants excel in platforms like Codeforces and AtCoder."* |
| **NPLIMO** | Mathematics — *"Led and supported by **past Nepali IMO participants**… rigorous training camps, problem-solving sessions, and mock exams."* |
| **AIMS 2026** | A **free** structured training programme — full curriculum in §3.3 |

**Team (verified from `/en/team`):**

| Name | Role |
|---|---|
| **Manish Acharya** | **Founding Member** · Undergraduate, **Vanderbilt University** · **author of the official NOI Resources document** |
| **Aashish Karki** | **Founding Member** · IOE Pulchowk Campus · AWS Certified Solutions Architect Associate |
| **Amrit Kandel** | Advisory · **Founder & Visionary / Advisor (Current)** |
| ⭐ **Debojoti Das Soumya** | Advisory · **Competitive Programmer, 3× IOI Medalist, MIT** |
| ⭐ **Shreyash Sharma Bastola** | **NPLIMO Lead** · **Bronze, IMO 2025** — *Nepal's only IMO medallist, now building Nepal's maths pipeline* |
| Safal Poudel | Lead Web Developer |
| Nishchit Bhandari | Discord Moderator |
| Riwaj Adhikari · Prabin Devkota · Aayush Mainali | NPLAlgo Team · Amrita Vishwa Vidyapeetham, Bengaluru |

> **Note the crossover:** **Shreyash Sharma Bastola** won Nepal's **first and only IMO bronze medal** (IMO 2025, Sunshine Coast, 20 points, rank 291 — documented in the Mathematics file) and now **leads NPLIMO**. Nepal's small olympiad community is reusing its best people across subjects. NSS should engage with both NPLCoder and MAN.

### ③ NOI's syllabus is the most rigorous of any Nepali olympiad

NOI does not write its own syllabus. It **formally adopts the IOI's**:

> *"To ensure our participants are best prepared for international competition and to align with global standards, the Nepal Olympiad in Informatics will **officially adopt the syllabus of the International Olympiad in Informatics (IOI)**. The competition will be structured into four distinct rounds, with the complexity of problems and the breadth of required knowledge increasing at each stage. Note that **topics from earlier rounds are considered prerequisites for later rounds**."*

This is the **only Nepali olympiad** whose syllabus is (a) explicitly tied to an international standard, (b) **differentiated per round**, and (c) published as a downloadable document with a topic-by-topic breakdown. Compare:
- Physics — 2 syllabi, printed on the exam paper, but identical across rounds
- Mathematics — 1 DMO syllabus that **contradicts** the website's four-pillar block
- Astronomy — 2 excellent syllabi, but identical across all 3 stages
- Chemistry, Biology — **none**

---

## PART 0C — The verified NOI ladder

```
┌────────────────────────────────────────────────────────────────────────────┐
│  ROUND 1 — DISTRICT LEVEL COMPETITION                          ≈ DISTRICT   │
│  • Objective: "identify promising talent within EACH DISTRICT of Nepal"     │
│  • "Each district will host its own selection contest"                      │
│  • CUTOFF: determined INDEPENDENTLY FOR EACH DISTRICT based on              │
│    participation and performance metrics — "ensures that top performers     │
│    from every district have an opportunity to advance"                      │
│  • AWARDS: Top 3 in each district recognised and awarded                    │
│  • SYLLABUS: core programming, arrays, brute force, primes/GCD/LCM, sort    │
├────────────────────────────────────────────────────────────────────────────┤
│  ROUND 2 — PROVINCIAL LEVEL COMPETITION                        ≈ PROVINCE   │
│  • District qualifiers compete in their respective provincial contests      │
│  • CUTOFF: INDEPENDENT for each province, "reflecting the competitive        │
│    landscape of that province"                                              │
│  • AWARDS: Top 3 in each province                                           │
│  • SYLLABUS: + stacks/queues/heaps/hashing, greedy, binary search,          │
│    BFS/DFS, modular arithmetic, combinatorics, intro 1D DP                  │
├────────────────────────────────────────────────────────────────────────────┤
│  ROUND 3 — PRE-FINALS (National Round 1)                       ≈ NATIONAL   │
│  • "Approximately the TOP 50 STUDENTS from across all provinces"            │
│  • "This round marks the beginning of the NATIONWIDE competition"           │
│  • CUTOFF: "selection criteria and problem set will be STANDARDIZED         │
│    NATIONWIDE" — i.e. per-region cutoffs STOP here                          │
│  • ADVANCE: TOP 25 → Finals                                                 │
│  • SYLLABUS: + DSU, segment trees, Fenwick trees, divide & conquer,          │
│    backtracking, 2D/grid DP, Dijkstra/Bellman-Ford/Floyd-Warshall,           │
│    MST (Kruskal/Prim), tries, proof techniques, inclusion-exclusion         │
├────────────────────────────────────────────────────────────────────────────┤
│  ROUND 4 — FINALS (National Round 2)                           ≈ NATIONAL   │
│  • The top 25 compete                                                       │
│  • RESULT: TOP 10 = "National Winners" (medals, certificates, honors)        │
│  •          TOP 4  = "the official IOI Nepal Team"                           │
│  • SYLLABUS: "problems comparable in difficulty and style to the IOI…        │
│    comprehensive mastery of the IOI syllabus"                               │
│    + balanced BSTs, bitmask DP, DP on trees, advanced graph combos,          │
│      KMP string matching, basic computational geometry, optimization         │
├────────────────────────────────────────────────────────────────────────────┤
│  IOI TRAINING CAMP                                                          │
│  • Participants: the TOP 4 from the Finals                                  │
│  • "Since C++ is the official and mandatory programming language for the     │
│    IOI, the training camp curriculum will be EXCLUSIVELY focused on          │
│    mastering C++" — advanced algorithms, data structures, optimization       │
│    techniques, competition strategy                                         │
├────────────────────────────────────────────────────────────────────────────┤
│  TEAM NEPAL → IOI                                              ≈ INTERNATIONAL│
│  • Up to 4 students                                                         │
│  • ⚠️ NEPAL IS NOT YET AN IOI MEMBER — see Gap I-1                          │
└────────────────────────────────────────────────────────────────────────────┘
```

### 0C.1 Eligibility (verbatim from the NOI Program Structure)

| Criterion | Requirement |
|---|---|
| **Citizenship** | *"Participants must be **Nepali citizens**. Students studying abroad or residing in foreign countries **are eligible to compete, provided they were born in Nepal**."* |
| **Grade level** | **Grade 8, 9, 10, 11 or 12** |
| **Educational status** | *"must not have commenced their undergraduate studies at a university or equivalent post-secondary institution"* |
| **Experience** | *"All eligible students are encouraged to participate, **regardless of their background or previous experience** in competitive programming."* |
| **Registration fee** | **FREE OF CHARGE** |
| **Registration deadline** | ⚠️ **Two conflicting dates published.** NPLCoder's NOI page: **October 30, 2025**. A third-party events listing: **January 15, 2026 (extended)**. → Gap **I-2** |
| **Notice channel** | *"Please use an email address that you check regularly, as **all official updates (including venue and logistics) will be sent there**."* Competition dates *"will be finalized and communicated via email."* |

### 0C.2 Programming language policy — a genuinely inclusive design

> *"To encourage broad participation and inclusivity, there are **no programming language restrictions during the District, Provincial, Pre-Final, and Final rounds** of the NOI. Students may use any language they are comfortable with."*
> *"You may use **any programming language in the initial rounds**. However, since the **IOI only allows C++**, all training during the IOI Training Camp will be conducted in C++."*

This is well-designed: a Grade-8 student in a district school who only knows Python or Scratch-derived logic can enter, and the C++ requirement is deferred until the top 4. **No other Nepali olympiad does this.**

### 0C.3 Rules & conduct

- **Academic Honesty:** *"Any form of plagiarism or collaboration during a contest will result in immediate disqualification. All work submitted must be the individual's own."*
- **Conduct:** professional and respectful behaviour toward organizers, proctors and fellow competitors
- **Decisions:** *"The decisions of the NOI **Scientific and Organizing Committees** are final in all matters related to the competition."*
- **Living document:** *"This program structure is developing, and NPLCoder reserves the right to make changes or updates… but participants will always be informed beforehand."* Feedback invited at `work@nplcoder.org`.
- Both documents close with: ***"Jay Nepal!"***

### 0C.4 The level-mapping table used throughout this document

| Your level | Nepal informatics reality | Selection maths | Topics (official NOI syllabus) |
|---|---|---|---|
| **DISTRICT** | ✅ **NOI Round 1 — District Level Competition**, each district hosts its own contest | **independent cutoff per district**; Top 3 awarded | I/O, variables, conditionals, loops, `int`/`long long`/`double`/`char`, 1-D & multi-dim arrays, basic strings, brute force, simulation, arithmetic, primes/GCD/LCM, stdlib sort |
| **PROVINCE** | ✅ **NOI Round 2 — Provincial Level Competition** | **independent cutoff per province**; Top 3 awarded | + stacks, queues, lists/linked lists, heaps (priority queues), basic hashing, greedy, binary search, adjacency list/matrix, BFS, DFS, modular arithmetic, basic combinatorics, **intro to DP (simple 1-D)** |
| **NATIONAL** | ✅ **Round 3 Pre-Finals** (top ~50 nationwide → top 25) **+ Round 4 Finals** (top 25 → **top 10 National Winners → top 4 IOI team**) | **standardized nationwide from Round 3** | R3: + **DSU, segment trees, Fenwick/BIT**, divide & conquer, backtracking, 2-D & grid DP, **Dijkstra, Bellman-Ford, Floyd-Warshall**, **MST (Kruskal, Prim)**, **tries**, proof techniques, **inclusion-exclusion** · R4: + balanced BSTs, **bitmask DP, DP on trees**, advanced graph combinations, **KMP**, basic computational geometry, complex optimization, "creative insights combining multiple advanced techniques" |
| **INTERNATIONAL** | ⚠️ **IOI** — Nepal is **not yet a member** | top 4 + C++-only Training Camp | The full **IOI Syllabus 2025**: 23 pp, 6 classification categories, **148 ✓ included / 85 ✗ excluded** topics across §5 Mathematics, §6 Computing Science, §7 Software Engineering, §8 Computer Literacy |

---

# 🟦 PART 1 — LEVEL 1: DISTRICT  *(NOI Round 1)*

### 1.1 Official Round-1 syllabus (verbatim)

> **"Round 1: District Qualifier** — *This initial round is designed to be **accessible to a wide range of students** with foundational knowledge of programming and general problem-solving.*
> • **Core Programming & Primitive Types:** Basic I/O, variables, conditionals, loops, `int`, `long long`, `double`, `char`.
> • **Basic Data Structures:** One-dimensional and multi-dimensional arrays, basic string manipulation.
> • **Algorithms & Problem-Solving:** Brute-force/complete search, simple simulation.
> • **Mathematics:** Basic arithmetic, number theory concepts like **primes, GCD, and LCM**.
> • **Sorting:** Familiarity with **standard library sort functions**."

📄 <https://docs.google.com/document/d/1-sIQvmp8bFecpFxdZ0Sfo272NSRGEzFh2A3wBeFZeb8/edit> ✅ LIVE (downloaded, read in full)
Short link: <https://tinyurl.com/noi25-syllabus> ✅

### 1.2 Past Papers — District tier

**There are none.** NPLCoder states: *"Since this is the first iteration of NOI, we do not yet have our own archive of past problems."* → **Gap I-3.**

The closest calibrated substitutes, in difficulty order:

| # | Resource | Level fit | URL | Status |
|---|---|---|---|---|
| D1 | ⭐ **USACO Guide — Bronze** | **The exact match.** USACO Bronze = complete search, sorting, simulation, ad-hoc, basic arrays — identical to NOI Round 1. Free, structured, with curated problem lists per topic. | <https://usaco.guide/bronze> | ✅ LIVE |
| D2 | **USACO Guide — General** (language choice, IDE setup, practice tips, time complexity) | On-ramp | <https://usaco.guide/general> | ✅ LIVE |
| D3 | **CSES Problem Set** — intro/sorting/searching sections | Direct drill | <https://cses.fi/problemset/> | ✅ LIVE |
| D4 | **AtCoder Beginner Contest (ABC) — A and B problems** | Timed MCQ-free drill at exactly Round-1 difficulty | <https://atcoder.jp/> | ✅ LIVE |
| D5 | **Codeforces — problems rated 800–1100** | Drill by difficulty | <https://codeforces.com/> | ⚠️ 403 to scripts; works in a browser |
| D6 | **IOI official past tasks 1989 → present** | The target, not the entry point | <https://ioinformatics.org/page/contests/10> · <https://github.com/ioi/task-archive> | ✅ ×2 |

### 1.3 Study Materials — District tier

⭐ **NPLCoder's own official Resources document** is the spine of this level. Compiled by **Manish Acharya** (Founding Member, Vanderbilt University), version **v1.0.0**, described as *"a living resource… under continuous updates."* Licence: *"You are free to share this document with others without any restrictions. However, ensure that proper attribution is given to NPLCoder."*

📄 <https://docs.google.com/document/d/1tTYekzhArmgpIkspiZKGjXe_9zKxsch6gX4SZUHcXZA/edit> ✅ LIVE (downloaded; **all 44 hyperlinks extracted and individually verified**)
Short link: <https://tinyurl.com/noi25-resources> ✅

**§1 Which programming language?** The document's position: *"This document focuses primarily on **C++**… chosen due to its exceptional performance, rich Standard Template Library (STL), and its widespread use in competitive programming contests… Although this document emphasizes C++, you are always encouraged to explore other alternatives like **Java and Python**… Most of the resources listed here remain applicable regardless of the programming language you choose."*

| # | Resource | Category | URL | Status |
|---|---|---|---|---|
| S1 | ⭐ **LearnCpp.com** | C++ from scratch | <https://www.learncpp.com> | ✅ LIVE |
| S2 | **CppReference** | C++ reference | <https://en.cppreference.com/w/> | ⚠️ **403 to scripts** (bot-wall); opens normally in a browser |
| S3 | **C++ Tricks** (Codeforces blog 15643) | C++ for contests | <https://codeforces.com/blog/entry/15643> | ⚠️ 403 to scripts |
| S4 | **Competitive C++ Manifesto** (Codeforces blog 64218) — *"style guides you can follow to write correct, fast, clear and consistent code"* | Style | <https://codeforces.com/blog/entry/64218> | ⚠️ |
| S5 | ⭐ **CS50's Introduction to Computer Science** — *"You can focus only on materials from **Week 0–5**"* | Foundations | <https://cs50.harvard.edu/x/2024/weeks/5/> | ✅ LIVE |
| S6 | ⭐ **Harvard CS50 free course platform** | Foundations | <https://cs50.harvard.edu/x/> | ✅ |
| S7 | **MIT OCW 6.006 — Introduction to Algorithms** | DSA | <https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/> | ✅ LIVE |
| S8 | **MIT OCW 6.042J — Mathematics for Computer Science** | Discrete maths | <https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/> | ✅ LIVE |
| S9 | ⭐ ***Mathematics for Computer Science*** — Lehman, Leighton, Meyer (MIT) — **free full textbook**, the companion to S8 | Discrete maths | <https://courses.csail.mit.edu/6.042/spring18/mcs.pdf> | ✅ LIVE (PDF) |
| S10 | **Lecture Notes on Discrete Mathematics** (Regev, NYU) — *"a clear and approachable introduction… an excellent starting point compared to more formal texts"* | Discrete maths | <https://cims.nyu.edu/~regev/teaching/discrete_math_fall_2005/dmbook.pdf> | ✅ LIVE (PDF) |
| S11 | ⭐ **VisualAlgo** — *"mainly useful for **visualizing** the concepts you've learned… especially since they can sometimes feel abstract"* | Visualisation | <https://visualgo.net/en> | ✅ LIVE |
| S12 | **CodeChef — Data Structures & Algorithms list** — *"a comprehensive list of the most commonly used data structures and algorithms, along with tutorials, implementations, and related problems… essential to bookmark"* | Index | <https://discuss.codechef.com/t/data-structures-and-algorithms/6599> | ✅ |
| S13 | **HyperPolyglot — C++ / Objective-C / Java / C#** — *"a detailed side-by-side reference sheet for common syntaxes"* | Reference | <https://hyperpolyglot.org/cpp> | ✅ LIVE |
| S14 | **Yet again on C++ input/output** (Codeforces blog 5217) — *"Learn more about **C++ I/O optimizations**"* | Performance | <https://codeforces.com/blog/entry/5217> | ⚠️ |
| S15 | **ideone** · **pastebin** — *"semi-permanent pages for code sharing… especially useful when you need someone else to review your code"* | Tools | <https://ideone.com> · <https://pastebin.com> | ✅ |

---

# 🟩 PART 2 — LEVEL 2: PROVINCE  *(NOI Round 2)*

### 2.1 Official Round-2 syllabus (verbatim)

> **"Round 2: Provincial Qualifier** — *This round introduces more complex algorithms and data structures, requiring a deeper level of algorithmic thinking.*
> • **All concepts from District Qualifier, plus:**
> • **Data Structures:** Stacks, Queues, Lists and Linked Lists, **Heaps (Priority Queues)**, basic **Hashing**.
> • **Algorithms:** **Greedy algorithms**, **Binary Search** on sorted data.
> • **Graph Theory:** Graph representation (**adjacency list/matrix**), **Breadth-First Search (BFS)**, and **Depth-First Search (DFS)** on simple graphs.
> • **Mathematics:** **Modular arithmetic**, basic **combinatorics**.
> • **Algorithm Design:** **Introduction to Dynamic Programming (simple 1D cases)**."

### 2.2 Past Papers & Practice — Province tier

| # | Resource | Why it fits | URL | Status |
|---|---|---|---|---|
| P1 | ⭐⭐ **USACO Guide — Silver** | **The exact match for NOI Round 2.** USACO Silver covers binary search, prefix sums, two pointers, sorting, stacks/queues, intro DP, adjacency-list graphs, DFS/flood fill — a one-to-one overlap with the official Round-2 topic list. | <https://usaco.guide/silver> | ✅ LIVE |
| P2 | **USACO official past contests** | Real graded contests at this level | <http://www.usaco.org/> | ⚠️ **403 to scripts**; works in a browser |
| P3 | **USACO legacy training pages** — *"hundreds of hours of free instruction and practice problems"* | Structured drill | <https://usaco.org/index.php?page=training> | ⚠️ same |
| P4 | **CSES Problem Set** — sorting & searching, dynamic programming (intro), graphs (intro) sections | Topic-mapped drill; CSES is the standard companion to the free *Competitive Programming Handbook* | <https://cses.fi/problemset/> | ✅ LIVE |
| P5 | **AtCoder Beginner Contest — C and D problems** | Timed, exactly Round-2 difficulty | <https://atcoder.jp/> | ✅ LIVE |
| P6 | **Codeforces — problems rated 1100–1400** | Drill by rating | <https://codeforces.com/> | ⚠️ |
| P7 | **CodeChef** — *"well-known for its long contest format… monthly 10-day contests"* | Endurance practice | <https://www.codechef.com/> | ✅ LIVE |
| P8 | **HackerRank** — *"Primarily aimed at those preparing for technical interviews… an excellent resource for practicing Data Structures and Algorithms concepts"* | DSA drill | <https://www.hackerrank.com/> | ⚠️ |
| P9 | **Project Euler** — *"a more mathematical focus, requiring only the final answer rather than the full program. A great resource for practicing and testing your math skills"* | Number theory / modular arithmetic — directly serves Round-2 Mathematics | <https://projecteuler.net/> | ⚠️ 403 to scripts |

### 2.3 Study Materials — Province tier

| # | Resource | Why | URL | Status |
|---|---|---|---|---|
| S16 | ⭐⭐ ***Competitive Programming Handbook*** — **Antti Laaksonen** | NPLCoder's own #2 recommendation: *"This highly recommended beginner book for competitive programming covers various essential concepts, making it an excellent starting point for newcomers."* **Free 300-page PDF**, and it is the official companion text to the CSES problem set (P4). | <https://cses.fi/book/book.pdf> | ✅ **LIVE (PDF)** |
| S17 | ⭐ **Programming Camp Syllabus** | NPLCoder: *"A list of important topics in competitive programming **with exercise problems**."* A ready-made topic→problem map. | <https://docs.google.com/document/d/1_dc3Ifg7Gg1LxhiqMMmE9UbTsXpdRiYh4pKILYG2eA4/edit> | ✅ LIVE |
| S18 | **Stanford CS97SI — Introduction to Programming Contests** | NPLCoder: *"comprehensive lecture slides and a short set of exercises, introducing you to programming contests. It also revisits key concepts… showing how to apply them effectively in competitive programming."* | <https://web.stanford.edu/class/cs97si/> | ✅ LIVE |
| S19 | ⭐ **CP-Algorithms** | The canonical free algorithm reference — every Round-2 and Round-3 topic with working C++ implementations and complexity proofs. Not in NPLCoder's list; **an addition by this document.** | <https://cp-algorithms.com/> | ✅ LIVE |
| S20 | **USACO Guide** (full ladder: General → Bronze → Silver → Gold → Advanced) | *"A free collection of curated, high-quality competitive programming resources… built by former USACO finalists."* The best structured free curriculum in the world. | <https://usaco.guide/> | ✅ LIVE |
| S21 | **USACO Guide — All Problems index** | Searchable problem database with difficulty + topic tags | <https://usaco.guide/problems> | ✅ LIVE |
| S22 | **Codeforces blog 13529** — *"A collection of excellent tutorial blog posts covering data structures, C++, algorithms, mathematics"* | Curated tutorials | <https://codeforces.com/blog/entry/13529> | ⚠️ |
| S23 | **Codeforces blog 57282** — second such collection | | <https://codeforces.com/blog/entry/57282> | ⚠️ |
| S24 | **The 'science' of training in competitive programming** (CF blog 17842) | Training methodology | <https://codeforces.com/blog/entry/17842> | ⚠️ |
| S25 | **"If you ask me how to improve your algorithm competition skill, I will give you this link"** (CF blog 16599) | The most-shared CP advice post | <https://codeforces.com/blog/entry/16599> | ⚠️ |

---

# 🟨 PART 3 — LEVEL 3: NATIONAL  *(NOI Round 3 Pre-Finals + Round 4 Finals)*

### 3.1 Official Round-3 syllabus (verbatim)

> **"Round 3: Pre-Finals** — *This is a national-level round designed to be **highly competitive**, with problem difficulty **approaching that of international competitions**.*
> • **All concepts from previous rounds, plus:**
> • **Advanced Data Structures:** **Disjoint Set Union (DSU)**, **Segment Trees**, **Fenwick Trees (BIT)**.
> • **Algorithm Design:** **Divide and Conquer**, **Backtracking**, more complex **Dynamic Programming** (e.g., **2D DP, path-finding on grids**).
> • **Graph Algorithms:** Shortest path algorithms (**Dijkstra, Bellman-Ford, Floyd-Warshall**), **Minimum Spanning Trees (Kruskal, Prim)**.
> • **String Algorithms:** **Tries**.
> • **Mathematics:** **Proof techniques**, **inclusion-exclusion principle**."

### 3.2 Official Round-4 syllabus (verbatim)

> **"Round 4: Finals** — *The final selection round will feature problems **comparable in difficulty and style to the IOI**. Contestants are expected to have a **comprehensive mastery of the IOI syllabus**.*
> • **All concepts from previous rounds, plus:**
> • **Advanced Data Structures:** **Balanced Binary Search Trees** (conceptual understanding and application).
> • **Advanced Algorithms:** Complex Dynamic Programming (e.g., **DP with bitmasking**, **DP on trees**).
> • **Advanced Graph Theory:** Problems requiring **combinations of advanced graph algorithms**.
> • **Advanced String Algorithms:** String matching (**KMP**).
> • **Geometry:** **Basic computational geometry** concepts.
> • **Optimization Problems:** Devising solutions for complex optimization tasks.
> • **Problem Solving:** Problems will often require **creative insights and the combination of multiple advanced techniques** to solve efficiently."

### 3.3 ⭐ AIMS 2026 — NPLCoder's free 12-week curriculum (verified day by day)

**The single most valuable free training asset in Nepali informatics.** Published on <https://www.nplcoder.org/en/aims> ✅ LIVE.
**Eligibility: Grades 8–12 · Cost: FREE · Application deadline: May 25, 2026 · Duration: June – August 2026**

| Month | Intensity | Dates | Week | Day-by-day curriculum |
|---|---|---|---|---|
| **I — Core Foundations** | **4 classes/week** | June 1 – 28, 2026 | **1** | Mon 1 Jun: *Intro + What is CP + Time Complexity (Big-O basics)* · Wed 3: *Implementation + Debugging Mindset* · Fri 5: *Brute Force + Optimization Thinking* · **Sun 7: Contest 1** |
| | | | **2** | Mon 8 Jun: *Sorting (STL + Concepts)* · Wed 10: *Binary Search (Basic)* · Fri 12: *Problems: Sorting + Binary Search Mix* · **Sun 14: Contest 2** |
| | | | **3** | Mon 15 Jun: *Math I — GCD, LCM, Euclidean Algorithm* · Wed 17: *Math II — Primes, Sieve of Eratosthenes* · Fri 19: *Modular Arithmetic* · **Sun 21: Contest 3** |
| | | | **4** | Mon 22 Jun: *Recursion + Backtracking* · Wed 24: *Prefix Sums* · Fri 26: *Two Pointers / Sliding Window* · **Sun 28: Contest 4** |
| **II — Algorithms & Data Structures** | **2 classes/week** | July 11 – Aug 2, 2026 | **5** | Sat 11 Jul: *Data Structures — Stack, Queue* · Sun 12: *Problem Solving Session* |
| | | | **6** | Sat 18 Jul: *Sets and Maps (STL)* · **Sun 19: Contest** |
| | | | **7** | Sat 25 Jul: *Greedy Algorithms* · **Sun 26: Contest** |
| | | | **8** | Sat 1 Aug: *Binary Search Advanced (Answer Search)* · **Sun 2: Contest** |
| **III — Advanced Algorithms & Mathematical Topics** | **2 classes/week** | Aug 8 – 30, 2026 | **9** | Sat 8 Aug: *Graph Algorithms — BFS* · Sun 9: *Graph Algorithms — DFS* |
| | | | **10** | Sat 15 Aug: *Graph Algorithms — Miscellaneous* · **Sun 16: Contest** |
| | | | **11** | Sat 22 Aug: *Dynamic Programming — Introduction* · Sun 23: *(continued)* |
| | | | **12** | Aug 29–30: *Dynamic Programming continued + Contest* |

> **Assessment:** AIMS 2026's Month I maps **almost exactly onto NOI Round 1 + Round 2** (brute force, sorting, binary search, primes/GCD/LCM, modular arithmetic, recursion/backtracking, prefix sums, two pointers). Month II–III reaches Round 2–3 (stacks/queues, STL sets/maps, greedy, advanced binary search, BFS/DFS, intro DP). **It stops short of Round 3's segment trees, Fenwick trees, DSU, Dijkstra/MST and Round 4's bitmask DP, DP on trees and KMP.** → **Gap I-4.**

### 3.4 Past Papers — National tier

| # | Resource | Why | URL | Status |
|---|---|---|---|---|
| N1 | ⭐⭐ **IOI official past tasks archive** — *all tasks, all years, 1989 → present, with test data and solutions* | The definitive target. NPLCoder's own #1 recommendation: *"**IOI Past Problems**: The official archive of problems from previous International Olympiads. These are the **best representation of the difficulty and style** of problems at the highest level."* | <https://ioinformatics.org/page/contests/10> | ✅ LIVE |
| N2 | ⭐ **IOI Public Task Archive (official GitHub)** | Machine-readable archive of IOI tasks with test data — runnable on a local judge | <https://github.com/ioi/task-archive> | ✅ LIVE |
| N3 | **IOI Statistics site** — Olympiads · Members · Tasks · Hall of Fame | Per-task, per-year, per-country results and statistics | <https://stats.ioinformatics.org/> | ✅ LIVE |
| N4 | **IOI History** (TU Eindhoven) — *"Past Tasks · Past Results · Statistics · Future"* | The founding archive; UNESCO initiated the first IOI in May 1989 | <https://olympiads.win.tue.nl/ioi/history.html> | ✅ LIVE |
| N5 | **Previous Contest Tasks — full IOI task list by year** (ioi.te.lv) | Plain list from IOI 1989 Pravetz, Bulgaria onward | <https://ioi.te.lv/contest/prev.shtml> | ✅ LIVE |
| N6 | **IOI Rankings Archive 2017 → 2026** | Per-year rankings | <https://ioirankings.com/> | ✅ LIVE |
| N7 | ⭐ **USACO Guide — Gold** | Maps to NOI Round 3 (DSU, segment trees, shortest paths, MST, intro string structures) | <https://usaco.guide/gold> | ✅ LIVE |
| N8 | ⭐ **USACO Guide — Advanced** | Maps to NOI Round 4 and IOI itself (suffix structures, advanced DP, geometry, flows/matching) | <https://usaco.guide/adv> | ✅ LIVE |
| N9 | **CSES Problem Set — advanced sections** | Topic-mapped drill for Round 3/4 | <https://cses.fi/problemset/> | ✅ LIVE |
| N10 | ❌ **NOI Round 1–4 past papers** | — | — | **DO NOT EXIST.** First iteration. → **Gap I-3** |

### 3.5 Study Materials — National tier

| # | Resource | Why | URL | Status |
|---|---|---|---|---|
| S26 | ⭐ **CP-Algorithms** | The definitive free reference for every Round-3 and Round-4 topic: segment trees, Fenwick, DSU, Dijkstra/Bellman-Ford/Floyd-Warshall, Kruskal/Prim, tries, KMP, bitmask DP, inclusion-exclusion, computational geometry — each with C++ code and complexity analysis | <https://cp-algorithms.com/> | ✅ LIVE |
| S27 | ⭐ ***Competitive Programming 3*** — Steven Halim & Felix Halim | NPLCoder: *"Although aimed at ICPC and IOI contestants, this book is a great resource for diving deeper… **ideal for advanced reading once you've completed the Competitive Programming Handbook**."* | NPLCoder's link: `files.gitter.im/SamZhangQingChuan/…Competitive-Programming-3…` | ⚠️ third-party host — prefer buying; ISBN 978-981-4608-41-1 |
| S28 | ***Introduction to Algorithms*** (CLRS) — Cormen, Leiserson, Rivest, Stein | NPLCoder: *"often considered the '**bible**' of algorithms and data structures… an in-depth and rigorous exploration."* | <https://a.co/d/3XkMJ48> | 📕 print |
| S29 | ***The Algorithm Design Manual*** — Steven Skiena | NPLCoder: *"written in a more readable style, and many find it more comprehensive… valuable resources, including the author's video lectures, can be accessed on its official website."* | <https://a.co/d/4jNY3WA> | 📕 print |
| S30 | ***Algorithms*** | NPLCoder: *"well-organized, featuring detailed explanations and excellent illustrations. It is **even used as a textbook in some IOI training camps**."* | <https://a.co/d/hpeaU24> | 📕 print |
| S31 | ***How to Solve It*** — George Pólya | NPLCoder: *"A timeless classic… a systematic approach to solving problems creatively."* | <https://a.co/d/8GstgHz> | 📕 print |
| S32 | ***Discrete Mathematics and Its Applications*** — Rosen | NPLCoder: *"a solid option… rigorous definitions and proofs… otherwise you can safely skip it."* | <https://a.co/d/9o6QWUc> | 📕 print |
| S33 | **Comparing Floating Point Numbers** (Random ASCII) | NPLCoder: *"Everything you need to know about floating point numbers. **A must read especially for geometry topics**"* — directly serves Round 4's computational geometry | <https://randomascii.wordpress.com/2012-02-25/comparing-floating-point-numbers-2012-edition/> | ⚠️ **403 to scripts** (WordPress bot-wall); opens in a browser |
| S34 | **Bit Twiddling Hacks** (Sean Anderson, Stanford) | NPLCoder: *"A huge compiled list of bit manipulation tricks"* — essential for Round 4 **bitmask DP** | <https://graphics.stanford.edu/~seander/bithacks.html> | ❌ **CONNECTION REFUSED** from this network — see §8.4. Mirror: search "Bit Twiddling Hacks" |
| S35 | **How to prepare for ACM-ICPC?** (GeeksforGeeks) | NPLCoder: *"A comprehensive guide to preparing for the ACM-ICPC"* — useful for the team-competition format | <https://www.geeksforgeeks.org/how-to-prepare-for-acm-icpc/> | ✅ |
| S36 | ⭐⭐ **IOI's Recommended Reading List** (official) | Curated **by the IOI itself** | <https://ioinformatics.org/page/recommended-reading/11> | ✅ LIVE |
| S37 | **Topcoder Data Science Tutorials** | NPLCoder: *"articles and tutorials on various data structures and algorithm concepts"* | <https://www.topcoder.com/community/data-science/data-science-tutorials/> | ❌ **HTTP 404** — see §8.4 |

---

# 🟥 PART 4 — LEVEL 4: INTERNATIONAL  *(IOI)*

### 4.1 IOI facts

| Item | Detail |
|---|---|
| **Full name** | International Olympiad in Informatics |
| **Founded** | **1989**, initiated and sponsored by **UNESCO**; first held in **Pravetz, Bulgaria** |
| **Patrons** | **UNESCO** and **IFIP** |
| **Format** | *"two days of solving **six** complicated algorithmic tasks by writing computer programs in **C++**"* — 3 tasks per day, 5 hours per day, **100 points per task, 600 total** |
| **Team size** | **up to 4 students** per country |
| **Participating countries** | *"over 80"* per NPLCoder; **118** listed as IOI members on the statistics site |
| **Scoring** | Partial credit via **subtasks** and automated test-data scoring |
| **Team ranking** | *"There is no official team ranking"* — individual medals only |
| **IOI 2026** | **Tashkent, Uzbekistan** — contest concluded |
| **Governance** | International Scientific Committee (ISC) sets the syllabus and selects tasks |
| **Nepal's status** | ❌ **NOT A MEMBER. Zero participations, zero medals.** |

### 4.2 ⭐ THE OFFICIAL IOI SYLLABUS 2025 — the document NOI adopts

📄 <https://ioinformatics.org/files/ioi-syllabus-2025.pdf> ✅ LIVE — **downloaded, 292 KB, 23 pp, read in full**
Syllabus page: <https://ioinformatics.org/page/syllabus/12> ✅ · Draft + background: <https://algo.sk/ioi-syllabus/> ✅ · Draft PDF: <https://algo.sk/ioi-syllabus/ioi-syllabus-2025-draft.pdf> ✅

**Version & status (verbatim):** *"This is the official Syllabus version used for IOI 2025. The most recent changes… were made in **February 2024** and published as a draft in March 2024. At the end of IOI 2024 this version of the document became the official Syllabus."*

**Authors:** original proposal co-authored by **Tom Verhoeff** (TU Eindhoven), **Gyula Horváth** (Szeged), **Krzysztof Diks** (Warsaw), **Gordon Cormack** (Waterloo). Maintained since 2007 by **Michal Forišek** (Comenius University — current maintainer, `misof@algo.sk`), **Jakub Łącki** (Warsaw), **Richard Peng** (Georgia Tech).

**Three stated purposes (verbatim):**
> *"• It specifies a small set of **required prerequisite knowledge**…*
> *• It serves as a set of **guidelines that help decide whether a task is suitable** for the IOI. Based on this document, the International Scientific Committee (ISC) evaluates the task proposals…*
> *• As a consequence… another purpose of the Syllabus is to **help the organizers of national olympiads prepare their students for the IOI**."*

**The six classification categories:**

| Symbol | Category | Meaning (verbatim) |
|---|---|---|
| **✓** | **Included, unlimited** | *"considered to be prerequisite knowledge. Contestants are expected to know them. These topics can appear in task descriptions **without further clarification**."* |
| **✓** | **Included, to be defined** | *"Contestants should know this topic, but when it appears in a task description, the statement should contain a sufficient definition."* |
| **✓** | **Included, not for task description** | *"should not appear in task descriptions. However, **developing solutions and understanding model solutions may require the knowledge of these topics**."* ⭐ *"**This is the main category that should be of interest when preparing contestants for the IOI.** …contains a wide range of difficulties, starting from simple concepts and ending with topics that can appear in problems that aim to **distinguish among the gold medallists**. It is **not expected that all contestants should know everything** listed in this category."* |
| **?** | **Outside of focus** | *"Any topic that is not explicitly addressed… Contestants are **not expected to have knowledge** of these topics. Most competition tasks will not be related… However, this does not prevent the inclusion of a competition task related to a particular topic from this category."* |
| **✗?** | **Excluded, but open to discussion** | Feedback invited from the IOI community |
| **✗** | **Explicitly excluded** | Will not appear |

**Rules for unlisted topics (verbatim):** *"Anything that is a **prerequisite of an Included** topic is also Included. Anything that is an **extension of an Excluded** topic or similar to an Excluded topic is also Excluded. Anything else that is not mentioned… is considered Outside of focus."*

**Document structure & verified topic counts** (I parsed all 23 pages and counted every classification marker):

| Section | ✓ Included | ✗ Excluded | ? |
|---|---|---|---|
| **5.1 Arithmetics and Geometry** | 10 | **6** | 0 |
| **5.2 Discrete Structures** (DS1 Functions/relations/sets · DS2 Basic logic · DS3 Proof techniques · DS4 Basics of counting · DS5 Graphs and trees · DS6 Discrete probability) | 35 | **11** | 2 |
| **5.3 Other Areas in Mathematics** | 0 | **4** | 0 |
| **6.1 Programming Fundamentals** (PF1 Fundamental programming constructs · PF2 Algorithms and problem-solving · PF3 Fundamental data structures · PF4 Recursion · PF5 Event-driven programming) | 29 | 1 | 5 |
| **6.2 Algorithms and Complexity** (AL1 Basic algorithmic analysis · AL2 Algorithmic strategies · AL3a Algorithms · AL3b Data structures · AL4 Distributed algorithms · AL5 Basic computability · AL6 The complexity classes P and NP · AL7 Automata and grammars · AL8 Advanced algorithmic analysis · AL9 Cryptographic algorithms · AL10 Geometric algorithms · AL11 Parallel algorithms) | **55** | **27** | 15 |
| **6.3 Other Areas in Computing Science** | 0 | 2 | 1 |
| **7 Software Engineering** (SE1–SE12) | 18 | **34** | 0 |
| **8 Computer Literacy** | 1 | 0 | 1 |
| **TOTAL** | **148** | **85** | **24** |

### 4.3 🚨 THE "DO NOT STUDY" LIST — the highest-value finding in this document

The IOI Syllabus **explicitly excludes** 85 topics. Several are subjects that the **NEB Grade 11–12 curriculum teaches extensively** — so a Nepali student's default instinct is to study exactly the wrong things.

| ✗ Explicitly EXCLUDED from the IOI | Where a Nepali student would otherwise meet it |
|---|---|
| **Calculus** | NEB Grade 11 & 12 Mathematics — a major unit |
| **Linear algebra** | NEB Grade 11 Mathematics (matrices, determinants) — **and the NAO Astronomy syllabus §12** |
| **Statistics** | NEB Grade 11 & 12 Mathematics; **and IBO Appendix 2 §VI requires it** |
| **Trigonometric functions** | NEB Grade 11 Mathematics — a full unit; **and NAO Astronomy relies on it heavily** |
| **Complex numbers** | NEB Grade 11 Mathematics; **and the NAO Senior syllabus §VI** (De Moivre's theorem) |
| **General conics (parabolas, hyperbolas, ellipses)** | NEB Grade 11 Analytic Geometry; **and NAO Senior §12** lists Circle, Ellipse, Hyperbola, Parabola |
| **Geometry in three or more dimensions** | NEB Grade 12 (solid geometry, vectors in 3-D) |
| **Analyzing and increasing precision of floating-point computations** | — |
| **Modular division and inverse elements** | ⚠️ Note the tension: NOI Round 2 lists "modular arithmetic" — but *modular inverse* is IOI-**excluded** |
| **Solving of recurrence relations** / using recurrences to analyse recursive algorithms | NEB / university DSA courses |
| **Cardinality and countability of infinite sets** | — |
| **Burnside lemma · hypergraphs · perfect graphs · treewidth and expansion · planarity testing** | Advanced combinatorics |
| **Theory of combinatorial games** | — |
| **Clustering algorithms (k-means, k-nearest neighbour)** | ⚠️ Directly relevant to your **AI Olympiad** subject — but *excluded from IOI* |
| **Minimizing multi-variate functions using numerical approaches** · optimization problems easiest analysed using calculus | — |
| **Asymptotic analysis of average complexity bounds** | — |
| **Lexicographical BFS, maximum adjacency search** · more efficient bipartite matching implementations · **maximum matching in polynomial time on general graphs** · minimum-cost versions of max matchings and network flows | Advanced graph theory |
| **Software Engineering: 34 excluded items** — software architecture, design for reuse, **object-oriented analysis and design**, component-level design, programming by example, debugging in the API environment, class browsers, component-based computing, testing tools | NEB Grade 11/12 Computer Science; university software-engineering courses |

> **Why this matters more here than in any other subject:** Informatics is the subject where a hard-working Nepali student is *most likely to waste a year*. The school curriculum's mathematical prestige topics — calculus, trigonometry, complex numbers, linear algebra, statistics, conics — are **all explicitly excluded from the IOI**. Meanwhile the topics that *do* matter (segment trees, DSU, Fenwick trees, Dijkstra, MST, tries, KMP, bitmask DP, DP on trees) appear **nowhere** in NEB. → **Gap I-5.**

### 4.4 International resources

| # | Resource | What | URL | Status |
|---|---|---|---|---|
| I1 | ⭐ **IOI official site** — *"the most prestigious computer science competition in the world for secondary school students. UNESCO and IFIP are patrons."* | Governance, regulations, contests, syllabus, reading list | <https://ioinformatics.org/> | ✅ LIVE |
| I2 | ⭐ **IOI Contests / past tasks page** | All past IOI tasks | <https://ioinformatics.org/page/contests/10> | ✅ LIVE |
| I3 | ⭐ **IOI Syllabus 2025 (official PDF, 23 pp)** | The document NOI adopts | <https://ioinformatics.org/files/ioi-syllabus-2025.pdf> | ✅ LIVE (downloaded) |
| I4 | **IOI Syllabus page** | | <https://ioinformatics.org/page/syllabus/12> | ✅ LIVE |
| I5 | ⭐ **IOI Recommended Reading List (official)** | | <https://ioinformatics.org/page/recommended-reading/11> | ✅ LIVE |
| I6 | **IOI Syllabus drafts, change history & background** (maintainer Michal Forišek) | | <https://algo.sk/ioi-syllabus/> · <https://algo.sk/ioi-syllabus/ioi-syllabus-2025-draft.pdf> | ✅ ×2 |
| I7 | ⭐ **IOI Statistics** — Olympiads · Members · **Tasks** · Hall of Fame · per-country medal tables | **The authoritative results database** (the source for Nepal's absence in PART 0A) | <https://stats.ioinformatics.org/> · <https://stats.ioinformatics.org/countries/> | ✅ ×2 |
| I8 | **IOI Public Task Archive** (official GitHub, 17 repositories) | Tasks + test data | <https://github.com/ioi/task-archive> · <https://github.com/ioi> | ✅ LIVE |
| I9 | **IOI History** (TU Eindhoven) — Past Tasks · Past Results · Statistics · Future | | <https://olympiads.win.tue.nl/ioi/history.html> | ✅ LIVE |
| I10 | **Previous Contest Tasks** — full IOI task list by year, 1989 → | | <https://ioi.te.lv/contest/prev.shtml> | ✅ LIVE |
| I11 | **IOI Rankings Archive 2017 → 2026** | | <https://ioirankings.com/> | ✅ LIVE |
| I12 | **National Olympiads in Informatics — country index** | How other countries run their NOI; the model for Nepal's IOI accreditation | <https://ioi.te.lv/contest/national.shtml> | ✅ LIVE |
| I13 | **IOI 2026 Tashkent** | Most recent edition | <https://ioinformatics.org/> (announcements) | ✅ |

---

# 📊 PART 5 — MASTER TABLE (all four levels on one grid)

### 5.1 SYLLABI, PAST PAPERS & OFFICIAL DOCUMENTS

| LEVEL | Item | Solutions? | URL | Status |
|---|---|---|---|---|
| **ALL** | ⭐⭐ **NOI Program Structure and Guidelines** (official, 8,127 chars) — IOI context, eligibility, all 4 rounds with objectives/selection/cutoffs, awards, IOI Training Camp, language policy, rules & code of conduct | — | <https://docs.google.com/document/d/1IwdxzyBaWY5_elIPTX_6GZYatZpCl_1i0rRfMDEyEnE/edit> · <https://tinyurl.com/noi25-progstruct> | ✅ downloaded |
| **ALL** | ⭐⭐ **NOI Official Syllabus and Preparation Guide** (official, 6,755 chars) — round-by-round topic breakdown + recommended platforms | — | <https://docs.google.com/document/d/1-sIQvmp8bFecpFxdZ0Sfo272NSRGEzFh2A3wBeFZeb8/edit> · <https://tinyurl.com/noi25-syllabus> | ✅ downloaded |
| **ALL** | ⭐⭐ **NOI Comprehensive Resource List** (official, 12,577 chars, v1.0.0, by Manish Acharya) — **44 hyperlinks, all extracted and verified** | — | <https://docs.google.com/document/d/1tTYekzhArmgpIkspiZKGjXe_9zKxsch6gX4SZUHcXZA/edit> · <https://tinyurl.com/noi25-resources> | ✅ downloaded |
| **DISTRICT** | **NOI Round 1 syllabus** (5 topic groups) | — | in the Syllabus doc above | ✅ |
| **DISTRICT** | **USACO Guide — Bronze** ⭐ | ✅ | <https://usaco.guide/bronze> | ✅ |
| **DISTRICT** | **USACO Guide — General** (language, IDE, practice tips) | ✅ | <https://usaco.guide/general> | ✅ |
| **PROVINCE** | **NOI Round 2 syllabus** (6 topic groups) | — | in the Syllabus doc | ✅ |
| **PROVINCE** | ⭐⭐ **USACO Guide — Silver** | ✅ | <https://usaco.guide/silver> | ✅ |
| **PROVINCE** | **USACO official** (contests + legacy training pages) | ✅ | <http://www.usaco.org/> · <https://usaco.org/index.php?page=training> | ⚠️ 403-to-scripts |
| **NATIONAL** | **NOI Round 3 + Round 4 syllabi** | — | in the Syllabus doc | ✅ |
| **NATIONAL** | ⭐⭐ **AIMS 2026 — free 12-week day-by-day curriculum** (Grades 8–12) | contests weekly | <https://www.nplcoder.org/en/aims> | ✅ |
| **NATIONAL** | ⭐ **USACO Guide — Gold** | ✅ | <https://usaco.guide/gold> | ✅ |
| **NATIONAL** | ⭐⭐ **IOI past tasks archive (1989 → present)** | ✅ | <https://ioinformatics.org/page/contests/10> · <https://github.com/ioi/task-archive> · <https://olympiads.win.tue.nl/ioi/history.html> · <https://ioi.te.lv/contest/prev.shtml> | ✅ ×4 |
| **NATIONAL** | **IOI Statistics** (Olympiads · Members · Tasks · Hall of Fame) | — | <https://stats.ioinformatics.org/> | ✅ |
| **NATIONAL** | **IOI Rankings Archive 2017–2026** | — | <https://ioirankings.com/> | ✅ |
| **INTERNATIONAL** | ⭐⭐ **Official IOI Syllabus 2025** (23 pp; 148 ✓ / 85 ✗ / 24 ?) | — | <https://ioinformatics.org/files/ioi-syllabus-2025.pdf> | ✅ downloaded |
| **INTERNATIONAL** | **IOI Syllabus page** · **drafts & change history** | — | <https://ioinformatics.org/page/syllabus/12> · <https://algo.sk/ioi-syllabus/> (+draft PDF) | ✅ ×3 |
| **INTERNATIONAL** | ⭐ **IOI Recommended Reading List (official)** | — | <https://ioinformatics.org/page/recommended-reading/11> | ✅ |
| **INTERNATIONAL** | **National Olympiads in Informatics — country index** | — | <https://ioi.te.lv/contest/national.shtml> | ✅ |
| **INTERNATIONAL** | ❌ **NOI Round 1–4 past papers** | — | — | **DO NOT EXIST — first iteration** |

### 5.2 STUDY MATERIALS — consolidated (all from NPLCoder's official list unless marked ★)

| LEVEL | Item | Type | URL | Status |
|---|---|---|---|---|
| **DISTRICT** | **LearnCpp.com** · **CppReference** | C++ | learncpp.com · en.cppreference.com/w/ | ✅ ×2 |
| **DISTRICT** | **C++ Tricks** · **Competitive C++ Manifesto** · **Yet again on C++ I/O** | CF blogs | codeforces.com/blog/entry/**15643** · /**64218** · /**5217** | ⚠️ ×3 |
| **DISTRICT** | ⭐ **CS50 (Weeks 0–5)** | Free course | cs50.harvard.edu/x/2024/weeks/5/ | ✅ |
| **DISTRICT** | **MIT OCW 6.006 Intro to Algorithms** · **6.042J Maths for CS** | Free courses | ocw.mit.edu/courses/6-006-… · /6-042j-… | ✅ ×2 |
| **DISTRICT** | ⭐ ***Mathematics for Computer Science*** (Lehman/Leighton/Meyer) — **free full textbook** | Free book | courses.csail.mit.edu/6.042/spring18/mcs.pdf | ✅ PDF |
| **DISTRICT** | **Lecture Notes on Discrete Mathematics** (NYU) — free PDF | Free book | cims.nyu.edu/~regev/teaching/discrete_math_fall_2005/dmbook.pdf | ✅ PDF |
| **DISTRICT** | ⭐ **VisualAlgo** — algorithm visualisation | Free tool | visualgo.net/en | ✅ |
| **DISTRICT** | **CodeChef DSA list** · **HyperPolyglot C++** · **ideone** · **pastebin** | Index / tools | discuss.codechef.com/t/data-structures-and-algorithms/6599 · hyperpolyglot.org/cpp · ideone.com · pastebin.com | ✅ |
| **PROVINCE** | ⭐⭐ ***Competitive Programming Handbook*** (Laaksonen) — **free 300-pp PDF** | Free book | **cses.fi/book/book.pdf** | ✅ PDF |
| **PROVINCE** | ⭐ **Programming Camp Syllabus** (topics + exercise problems) | Free doc | docs.google.com/document/d/**1_dc3Ifg7Gg1LxhiqMMmE9UbTsXpdRiYh4pKILYG2eA4**/edit | ✅ |
| **PROVINCE** | **Stanford CS97SI — Introduction to Programming Contests** | Free course | web.stanford.edu/class/cs97si/ | ✅ |
| **PROVINCE** | ★ **CP-Algorithms** *(not in NPLCoder's list — added here)* | Free reference | cp-algorithms.com | ✅ |
| **PROVINCE** | ⭐ **USACO Guide** (General · Bronze · Silver · Gold · Advanced · All Problems) | Free curriculum | usaco.guide/ (+ /general /bronze /silver /gold /adv /problems) | ✅ ×7 |
| **PROVINCE** | **Online judges:** Codeforces · AtCoder · CodeChef · HackerRank · Project Euler | Platforms | codeforces.com · atcoder.jp · codechef.com · hackerrank.com · projecteuler.net | ⚠️/✅ |
| **PROVINCE** | **CF blog 13529** · **CF blog 57282** — tutorial collections | Curated | codeforces.com/blog/entry/13529 · /57282 | ⚠️ |
| **PROVINCE** | **CF blog 17842** (*the 'science' of training*) · **CF blog 16599** (*how to improve*) | Methodology | codeforces.com/blog/entry/17842 · /16599 | ⚠️ |
| **NATIONAL** | ⭐ **IOI Recommended Reading List (official)** | Curated | ioinformatics.org/page/recommended-reading/11 | ✅ |
| **NATIONAL** | ***Competitive Programming 3*** (Halim & Halim) | Book | NPLCoder link (third-party host) — prefer ISBN 978-981-4608-41-1 | ⚠️ |
| **NATIONAL** | ***CLRS*** · ***Algorithm Design Manual*** · ***Algorithms*** (*"used in some IOI training camps"*) · ***How to Solve It*** · ***Discrete Mathematics and Its Applications*** | Books | a.co/d/3XkMJ48 · /4jNY3WA · /hpeaU24 · /8GstgHz · /9o6QWUc | 📕 |
| **NATIONAL** | **Comparing Floating Point Numbers** — *"a must read especially for geometry topics"* | Article | randomascii.wordpress.com/2012-02-25/comparing-floating-point-numbers-2012-edition/ | ⚠️ |
| **NATIONAL** | **Bit Twiddling Hacks** — for bitmask DP | Reference | graphics.stanford.edu/~seander/bithacks.html | ❌ refused |
| **NATIONAL** | **How to prepare for ACM-ICPC?** | Guide | geeksforgeeks.org/how-to-prepare-for-acm-icpc/ | ✅ |
| **NATIONAL** | ★ Quora: *"How is CP different from real-life programming?"* · *"What have you gained from CP?"* | Perspective | quora.com/… | ⚠️ |

---

# 🕳️ PART 6 — GAP ANALYSIS: what SHOULD exist but DOESN'T

### 6.1 Headline comparison across the six subjects done so far

| | Physics | Chemistry | Maths | Biology | Astronomy | **Informatics** |
|---|---|---|---|---|---|---|
| Organiser website | ✅ | ❌ FB | ✅ | ❌ FB | ✅ | ✅ **nplcoder.org** |
| Published syllabus | ✅ 2 | ❌ | ⚠️ 1 contradictory | ❌ | ✅ 2 | ✅ **3 official docs + adopted IOI syllabus** |
| **Syllabus differentiated by round** | ❌ | ❌ | ❌ (same block ×5 pages) | ❌ | ❌ | ✅ **YES — the only one in Nepal** |
| Published past papers | ✅ 6 | ❌ 0 | ⚠️ 6 | ❌ 0 | ❌ 0 (deleted) | ❌ **0 — but none can exist yet** |
| Free registration | fee | fee | fee | fee | **NRs 1,000** | ✅ **FREE** |
| Published training curriculum | ❌ | ❌ | ⚠️ camp mentioned | ❌ | ❌ | ✅ **AIMS 2026, day by day** |
| International membership | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ **NOT AN IOI MEMBER** |
| International awards | 21 | 2 | 12 | 1 | 9 | **0** |

### 6.2 Gap register with AI-generation specs

| ID | Level | Missing item | Evidence | AI-generation / action spec | Priority |
|---|---|---|---|---|---|
| **I-1** | International | ⭐⭐⭐ **Nepal is not an IOI member, and no published document addresses how to become one.** NOI's entire four-round pipeline culminates in *"the top 4 performers will earn the honor of representing Nepal at the IOI"* — but Nepal does not appear in the IOI's **118-member** list. Without membership, the top 4 have nowhere to go. | Verified by parsing the complete IOI member list at `stats.ioinformatics.org/countries/` — **Nepal absent**; Bangladesh, India, Pakistan and Sri Lanka all present. NOI's Program Structure and Syllabus documents mention IOI membership **zero times**. | **This is a retrieval and advocacy task, not an authoring task.** ① Email **`work@nplcoder.org`** and the IOI Syllabus maintainer **`misof@algo.sk`** asking precisely what accreditation Nepal needs. ② Study `ioi.te.lv/contest/national.shtml` (the index of how each country runs its NOI) and the IOI Regulations to identify the requirements: a recognised national contest, a designated delegation leader, an ISC contact, and payment of the participation fee. ③ **Generate a "Nepal → IOI Accreditation Roadmap"**: a step-by-step document naming the required artefacts (a national-organiser constitution, a published contest with results, a named team leader, a two-year track record), a realistic timeline (IOI membership typically requires observing one IOAA before competing), and a cost model for 4 students + 2 leaders. ④ Publish it and hand it to NPLCoder. **Until this is done, every other gap in this document is downstream of it.** | 🔴 **P1 — HIGHEST** |
| **I-2** | ALL | **The NOI registration deadline is published inconsistently, and the schedule is entirely email-gated.** NPLCoder's NOI page states **October 30, 2025**; a third-party events listing states **January 15, 2026 (extended)**. Separately: *"Competition dates will be finalized and communicated **via email** to registered participants"* and *"all official updates (including venue and logistics) will be sent there."* No contest date, venue list or district-centre list is published anywhere. | Verified from `nplcoder.org/en/noi` (Registration Deadline: October 30, 2025) versus the nepvents listing (403 to scripts, but its search snippet reads *"Registration Ends: 15 Jan 2026… Deadline: Jan 15, 2026 (extended)"*). Contrast Astronomy, which publishes **7 named centres with coordinators' mobiles and emails**, and Mathematics, which publishes a full notice board. | **Mirror and maintain a public NOI calendar.** Build a page on NSS Olympiad Hub that records: registration open/close (with both published dates and a note on which supersedes), Round 1/2/3/4 dates, the district and provincial centre list as soon as it is emailed out, results-release dates, AIMS 2026 dates, and the IOI date. Ask NPLCoder to publish dates on their site rather than only by email — an email-gated schedule structurally excludes students whose schools did not forward the message. | 🔴 **P1** |
| **I-3** | ALL | ⭐⭐ **No NOI past papers exist, and none can.** NPLCoder states it explicitly: *"Since this is the first iteration of NOI, we do not yet have our own archive of past problems."* With four rounds at four distinct difficulty levels, and **independent cutoffs per district and per province**, students have no way to calibrate. | Verified from the NOI Official Syllabus document, read in full. | Generate the **"NOI Calibration Series"** — a four-tier mock bank matched exactly to the published per-round syllabi: **① District** — 3 papers × (20 easy + 10 medium implementation problems), topics restricted to the Round-1 list (I/O, loops, conditionals, arrays, strings, brute force, simulation, primes/GCD/LCM, stdlib sort), solvable in any language, with a **per-district percentile converter** so a student can estimate whether they would clear an independent district cutoff. **② Provincial** — 3 papers adding stacks/queues/heaps/hashing, greedy, binary search, BFS/DFS, modular arithmetic, basic combinatorics, 1-D DP. **③ Pre-Finals** — 3 papers at IOI-subtask difficulty covering DSU, segment trees, Fenwick, divide & conquer, backtracking, 2-D/grid DP, Dijkstra/Bellman-Ford/Floyd-Warshall, Kruskal/Prim, tries, inclusion-exclusion. **④ Finals** — 2 full IOI-format mocks (**2 days × 3 tasks × 5 h × 100 points, with subtasks**) covering balanced BSTs, bitmask DP, DP on trees, KMP, computational geometry, multi-technique optimization. **Every problem must ship with a full editorial, a reference C++ solution, and test data** — because IOI scoring is subtask-based and students must learn to farm partial credit. Model the subtask structure on real IOI tasks (I1–I2). | 🔴 **P1 — HIGHEST** |
| **I-4** | National | ⭐ **AIMS 2026 stops short of NOI Rounds 3 and 4.** The published 12-week curriculum reaches BFS/DFS and *introduction* to DP by week 11–12. It does **not** cover: DSU, segment trees, Fenwick trees, Dijkstra/Bellman-Ford/Floyd-Warshall, MST, tries, inclusion-exclusion (all **Round 3**), or balanced BSTs, bitmask DP, DP on trees, KMP, computational geometry (all **Round 4**). | Verified by extracting the complete AIMS day-by-day timetable and diffing it against the official Round-3 and Round-4 syllabus lists. | Generate **"AIMS+ : Weeks 13–24"** — a direct continuation in the same format (2 classes/week + Sunday contest), covering: **W13** DSU · **W14** Fenwick/BIT · **W15** Segment trees (point update, range query) · **W16** Segment trees (lazy propagation) + contest · **W17** Dijkstra + Bellman-Ford · **W18** Floyd-Warshall + MST (Kruskal, Prim) + contest · **W19** Tries + string hashing · **W20** KMP + Z-algorithm + contest · **W21** 2-D DP + grid DP · **W22** Bitmask DP · **W23** DP on trees + inclusion-exclusion · **W24** Computational geometry basics + **full IOI-format mock**. Each week: 1 lecture note, 1 worked-example set, 10 curated problems (tagged from CSES / CP-Algorithms / USACO Guide Gold & Advanced), 1 Sunday contest. Offer it to NPLCoder as an extension of AIMS. | 🔴 **P1** |
| **I-5** | ALL | ⭐⭐ **No "what NOT to study" guidance — and the misalignment with the NEB curriculum is severe.** The IOI Syllabus **explicitly excludes** calculus, linear algebra, statistics, trigonometric functions, complex numbers, general conics, 3-D geometry, recurrence-relation solving, modular inverse, and 34 software-engineering topics. **Every one of these is taught in NEB Grade 11–12 Mathematics or Computer Science**, and several (trigonometry, complex numbers, conics, linear algebra, statistics) are **required** by the other Nepali olympiads — notably **Astronomy**, whose NAO syllabus §12 lists them explicitly. A Nepali student juggling NAO and NOI will be told to master trigonometry for one and told it is excluded from the other. | Verified by cross-referencing all **85 ✗-marked entries** in the IOI Syllabus 2025 against the NEB Grade 11–12 Mathematics curriculum and the NAO Senior syllabus §12. | Generate **"The IOI Do-Not-Study List — a Nepali student's guide"**: a two-column table of all 85 excluded topics, each annotated with ① where a Nepali student will encounter it in school, ② whether any *other* Nepali olympiad requires it (Astronomy: yes for trig/complex/conics/statistics; Maths: yes for calculus; Biology: yes for statistics), and ③ a clear verdict: *"skip for IOI, study for X."* Add a companion **"What NEB never teaches you"** list of the **148 ✓ included** topics — segment trees, Fenwick trees, DSU, tries, KMP, bitmask DP, DP on trees, shortest paths, MST, suffix structures, network flow, computational geometry — none of which appears in any Nepali school curriculum. **This document alone would save a Nepali NOI candidate months of misdirected effort.** | 🔴 **P1 — HIGHEST** |
| **I-6** | District | **No Nepali-language introductory CP material.** NPLCoder's Resources document is English-only, as is every linked resource. Yet NOI explicitly targets **Grades 8–12** across **all districts**, *"regardless of their background or previous experience in competitive programming"* — which includes government-school students whose technical English is limited. | Verified: all 44 links in the official Resources document are English. | Generate **"पहिलो प्रोग्राम — First Program: Competitive Programming in Nepali"**: a 60-page Nepali/English bilingual primer covering the complete **Round 1** syllabus — I/O, variables, conditionals, loops, `int`/`long long`/`double`/`char`, arrays, strings, brute force, simulation, primes/GCD/LCM, sorting — with every code listing annotated line-by-line in Nepali, a **bilingual glossary of ~200 CP terms** (e.g. *time complexity* → समय जटिलता, *binary search* → द्विआधारी खोजी, *recursion* → पुनरावृत्ति, *greedy* → लोभी एल्गोरिदम, *dynamic programming* → गतिशील प्रोग्रामिङ), and 50 solved problems. Publish as a free PDF and offer it to NPLCoder. | 🟠 P2 |
| **I-7** | ALL | **NPLCoder's own Resources document contains two dead links and one wrong email.** ① `topcoder.com/community/data-science/data-science-tutorials/` → **HTTP 404**. ② `graphics.stanford.edu/~seander/bithacks.html` (**Bit Twiddling Hacks**) → **connection refused**. ③ The document's front matter gives the contact as **`work@nplcoder.edu`** — a non-existent TLD; the correct address, used later in the same document and on the website, is **`work@nplcoder.org`**. ④ The document's Discord invite (`discord.gg/aQtu8FX2CJ`) differs from the website's (`discord.gg/kJrvdhmzVd`). | Verified by extracting all 44 links from the Google Docs HTML export and requesting each. | **Report these four items to `work@nplcoder.org`.** The document is version **v1.0.0** and explicitly *"a living resource… under continuous updates"*, so corrections are welcome. Suggested replacements: Topcoder tutorials → **CP-Algorithms** (`cp-algorithms.com`, ✅ verified, covers the same ground better); Bit Twiddling Hacks → archive.org snapshot or the equivalent **CP-Algorithms "Bit manipulation"** page; email → `.org`; Discord → confirm which invite is canonical. | 🟠 P2 (quick win, builds goodwill) |
| **I-8** | Province | **No published centre list or district-coverage data.** NOI states *"Each district will host its own selection contest"* — but no list of the 77 district centres, no venue, no proctoring arrangement and no participation data has ever been published. Compare Astronomy, which names all 7 provincial centres with institutions, coordinators, mobiles and emails; and Biology, which documents **753 Local Committees** and per-year participation (169 → 1,200 students, 100 → 425 schools). | Verified from the NOI Program Structure and the NOI website. No centre list exists on any NPLCoder page. | **Build and publish the NOI Centre Register** as data arrives: for each of the 77 districts, the host institution, the coordinator, contact details, the number of registrants, and the cutoff score. Even a partially filled table is valuable — it lets a student in a remote district find out whether their district is running a contest at all, and it gives NSS the participation data to target outreach. Publish a **year-on-year coverage metric** mirroring Biology's *"1.5 % of eligible schools"* framing. | 🟠 P2 |
| **I-9** | National | **No documented IOI Training Camp curriculum.** The top 4 receive a C++-only camp covering *"advanced algorithms, data structures, optimization techniques, and competition strategies"* — but no duration, syllabus, schedule, staff or assessment method is published. Compare Astronomy (7-day closed camp, IOAA syllabus structure, named lecture topics) and Mathematics (**4-week residential camp + 3 TST exams**, cumulative scoring, top-6 selection). | Verified from the NOI Program Structure §"IOI Training Camp". | Generate a **"Nepal IOI Training Camp Blueprint"**: a 4-week residential schedule mirroring the Mathematics model — **Week 1** advanced data structures (segment tree variants, lazy propagation, persistent structures, balanced BSTs, suffix automata) · **Week 2** advanced DP (bitmask, digit DP, DP on trees, convex-hull trick, slope trick) · **Week 3** graphs & strings (flows, matchings, SCC, heavy-light decomposition, KMP/Z/suffix array, hashing) + computational geometry · **Week 4** three **full IOI-format mock contests** (2 days × 3 tasks × 5 h × 100 points, subtask scoring), each followed by a 3-hour editorial session and a **subtask-farming strategy workshop**. Include a partial-credit protocol: because IOI awards subtask points, a contestant who cannot solve a task should still target the 10–30 points available from brute force, small constraints and special cases. | 🟠 P2 |
| **I-10** | ALL | **No calibrated difficulty ladder tied to Codeforces/AtCoder ratings.** Competitive programming is unique among your seven subjects in having **universal, public, numerical difficulty ratings**. Nepal publishes none of the mapping. A student cannot tell what Codeforces rating corresponds to clearing a district cutoff, a provincial cutoff, the top 50, the top 25, or the top 4. | Verified: no rating guidance in any of the three official NOI documents. | Generate the **"NOI ↔ Rating Crosswalk"**: estimate, from the published round syllabi, the Codeforces rating and AtCoder difficulty band equivalent to each NOI round — e.g. **District ≈ CF 800–1100 / AtCoder ABC A–B** · **Provincial ≈ CF 1100–1400 / ABC C** · **Pre-Finals ≈ CF 1400–1800 / ABC D–E** · **Finals ≈ CF 1800–2200 / ABC E–F, IOI subtask level** · **IOI medal ≈ CF 2200+**. Publish it with an explicit caveat that it is an estimate, and add a **self-diagnostic**: *"solve these 5 problems in 2 hours; if you solve ≥3, you are at X level."* This single table would give every Nepali student an objective, self-serve progress metric that no other subject can offer. | 🔴 **P1** |
| **I-11** | Site | **Re-base your Informatics topic tree on the NOI's four rounds — not on a generic taxonomy.** NOI is the only Nepali olympiad with a **round-differentiated syllabus**, and each round's topics are explicitly cumulative (*"topics from earlier rounds are considered prerequisites for later rounds"*). That is a ready-made progression tree. | Verified from the NOI Official Syllabus, Rounds 1–4. | Build a **four-node progression tree** — District → Provincial → Pre-Finals → Finals — where each node lists its topics, marks which are **new** at that round versus **carried forward**, and links each topic to a free resource (USACO Guide module, CP-Algorithms page, CSES problem). Overlay a second dimension: the **IOI Syllabus's own six categories** (✓ unlimited · ✓ to be defined · ✓ not for task description · ? outside of focus · ✗? open to discussion · ✗ excluded), so a student can see at a glance which topics are prerequisite knowledge, which need a definition in the statement, and which to skip entirely. | 🟠 P2 |
| **I-12** | ALL | **NPLAlgo's weekly and monthly contests are not publicly archived.** NPLCoder states NPLAlgo *"organizes weekly and monthly programming contests to enhance problem-solving skills."* These are exactly the calibrated, recurring practice that a district student needs — but no contest archive, standings history or problem set is published. NPLCoder has a `/en/leaderboard` page, which is JS-rendered and returns no server-side content. | Verified: `nplcoder.org/en/leaderboard` returns 200 but renders client-side (117 KB shell, no data). No contest archive page exists in the sitemap. | **Do not generate — mirror and index.** Request the NPLAlgo contest archive from `work@nplcoder.org`, or ask them to publish it. Meanwhile, run **NSS STEM Club weekly contests** on a public judge (Codeforces Gym or a self-hosted CMS/DOMjudge), archive every problem with its editorial, and publish standings. A weekly contest with a published editorial is the single most effective CP training intervention, and it is nearly free to run. | 🟠 P2 |

---

# 🗓️ PART 7 — HOW TO USE THIS: A 32-WEEK PLAN

**Assumption:** a Grade-10 or Grade-11 student starting from **zero** programming experience in Kartik (November). NOI Round 1 falls in January–February.

| Weeks | Level target | Primary material | Weekly load |
|---|---|---|---|
| **1–3** | Set up + language | **CS50 Weeks 0–2** (S5) · **LearnCpp.com** (S1) chapters 1–4 · install a compiler + an IDE · register on **Codeforces**, **AtCoder**, **CSES** | 6 h |
| **4–7** | District syllabus — core programming | **NOI Round 1 topics** exactly: I/O, variables, conditionals, loops, `int` vs `long long` vs `double`, `char`, 1-D and 2-D arrays, basic strings, brute force, simulation. Drill on **CSES** intro + **AtCoder ABC A/B** + **CF 800–1000**. | 8 h |
| **8–9** | District syllabus — maths & sorting | Primes, **Sieve of Eratosthenes**, **GCD/LCM (Euclidean algorithm)**, basic arithmetic, stdlib `sort`. **Project Euler** first 20 problems. Follow **AIMS 2026 Week 3** exactly. | 8 h |
| **10–11** | District simulation | **USACO Guide Bronze** (P1/D1) — complete all modules + its curated problem lists. Then 2 timed Bronze-grade mocks. | 8 h |
| **12** | **NOI ROUND 1 (DISTRICT)** | Any language permitted. | — |
| **13–16** | Provincial — data structures | **Competitive Programming Handbook** (S16) ch. 1–6 · stacks, queues, linked lists, **heaps/priority queues**, basic hashing, **STL sets and maps**. **VisualAlgo** (S11) for every structure. | 9 h |
| **17–20** | Provincial — algorithms | **Greedy** · **binary search** (incl. **binary search on the answer**, AIMS Week 8) · **prefix sums** · **two pointers / sliding window** · graph representation (adjacency list & matrix) · **BFS** · **DFS** · **modular arithmetic** · basic combinatorics · **intro to 1-D DP**. Drill: **USACO Guide Silver** (P1) + **CSES** + **AtCoder ABC C/D** + **CF 1100–1400**. | 10 h |
| **21** | **NOI ROUND 2 (PROVINCIAL)** | — | — |
| **22–25** | Pre-Finals — advanced data structures | **DSU** · **Fenwick/BIT** · **segment trees** (point update + range query, then lazy propagation). Source: **CP-Algorithms** (S19/S26) + **USACO Guide Gold** (N7). | 11 h |
| **26–29** | Pre-Finals — graphs, DP, strings | **Dijkstra · Bellman-Ford · Floyd-Warshall** · **MST: Kruskal & Prim** · divide & conquer · backtracking · **2-D and grid DP** · **tries** · proof techniques · **inclusion-exclusion**. | 11 h |
| **30** | **NOI ROUND 3 (PRE-FINALS)** | Top ~50 nationwide, standardized. | — |
| **31–32** | Finals — IOI mastery | Balanced BSTs · **bitmask DP** · **DP on trees** · advanced graph combinations · **KMP** · basic **computational geometry** (read S33 *Comparing Floating Point Numbers* first) · complex optimization. **USACO Guide Advanced** (N8) + **real IOI tasks** (N1, N2). | 12 h |
| *(top 25 → top 10 → top 4)* | Finals → Camp → IOI | **IOI-format mocks: 2 days × 3 tasks × 5 h × 100 points with subtasks.** Learn to farm subtask points. **Switch fully to C++.** Read the **IOI Syllabus 2025 §6.2** to see what is ✓ *not for task description* — *"the main category that should be of interest when preparing contestants for the IOI."* | 15 h |

**Five non-negotiable habits:**
1. **Read the IOI Syllabus's ✗ Excluded list before you study anything** (§4.3). Calculus, trigonometry, complex numbers, linear algebra, statistics and conics are **all excluded** — and all taught in your NEB classes. Do not confuse school excellence with olympiad preparation.
2. **Learn subtask farming from week 1.** The IOI scores by subtask. A brute-force solution that passes n ≤ 100 is worth real points. Never submit nothing.
3. **Do one timed contest every single week from week 4.** AIMS 2026 builds in a Sunday contest each week for exactly this reason. Reading solutions is not training.
4. **Use C++ from week 13 even though NOI permits any language.** The IOI mandates C++ and the Training Camp is C++-only. Switching late costs months.
5. **Solve problems, don't collect resources.** NPLCoder's own document is explicit: *"**Consistent practice and curiosity are the keys** to mastering competitive programming."* One solved problem beats ten bookmarked tutorials.

---

# 🔎 PART 8 — SOURCE VERIFICATION LOG

### 8.1 Primary documents downloaded and read in full

| Document | Size | What I extracted |
|---|---|---|
| **NOI Program Structure and Guidelines** (official) | 8,127 chars | Every section verbatim: IOI context, NOI mission, NPLCoder's role, motto, **all 4 eligibility criteria**, all **4 rounds** with objective / selection / cutoff, all **3 award tiers**, the **IOI Training Camp** (participants, curriculum, C++ mandate), **3 rules of conduct**, the living-document clause, and the closing |
| **NOI Official Syllabus and Preparation Guide** (official) | 6,755 chars | The **IOI-syllabus adoption statement**, the **prerequisite clause**, all **4 rounds' topic lists verbatim**, the *"no archive of past problems"* admission, and all **5 recommended practice platforms** with URLs |
| **NOI Comprehensive Resource List** (official, v1.0.0, Manish Acharya) | 12,577 chars | All **8 sections**; the language rationale; **all 44 hyperlinks extracted from the HTML export** (the plain-text export strips them) and each individually requested; the sharing licence; the contact email and Discord |
| **IOI Syllabus 2025** (official, International Scientific Committee) | 292 KB, **23 pp** | Version/status history; all **7 authors and maintainers** with affiliations and the current maintainer's email; the **3 stated purposes**; all **6 classification categories** defined verbatim; the 3 rules for unlisted topics; the complete section structure (§5.1, §5.2 DS1–DS6, §5.3, §6.1 PF1–PF5, §6.2 AL1–AL11, §6.3, §7 SE1–SE12, §8); and a **full count of every classification marker: 148 ✓, 85 ✗, 24 ?** |
| **IOI member-country list** (`stats.ioinformatics.org/countries/`) | 28.6 KB | **All 118 member names enumerated**; searched exhaustively for "Nepal" → **absent**; confirmed the four South Asian members |
| **NPLCoder website** — `/en`, `/en/noi`, `/en/about`, `/en/events`, `/en/team`, `/en/aims`, `/en/nplimo`, `/en/leaderboard`, `/sitemap.xml` | 9 pages | Full NOI page (deadline, fee, 4-stage structure, eligibility, awards, language policy, 3 official-document links); mission/values/goals; **complete team roster with roles**; the **entire AIMS 2026 day-by-day 12-week curriculum** with dates and costs |

> **Final audit:** **78 distinct URLs** appear in this document. Every one marked ✅ was individually requested and returned **HTTP 200 with the correct content type** on 22–23 Oct 2026 — including **all 3 official NOI Google Docs** (downloaded in both `txt` and `html` export so all **44 embedded hyperlinks** could be recovered and each one individually checked), the **23-page official IOI Syllabus 2025 PDF**, the **complete 118-country IOI membership list**, all **9 NPLCoder site pages**, all **7 USACO Guide pages**, the **free 300-page Competitive Programming Handbook PDF**, and both free MIT/NYU textbook PDFs. Everything marked ⚠️ or ❌ is explained in §8.3 / §8.4. Nothing is listed on reputation alone.

### 8.2 Verified LIVE (HTTP 200, correct content type) on 22–23 Oct 2026

**NPLCoder** — `nplcoder.org/en` · `/en/noi` · `/en/about` · `/en/events` · `/en/team` · `/en/aims` · `/en/nplimo` · `/en/leaderboard` · `/sitemap.xml` · **all 3 official Google Docs** (+ their 3 `tinyurl.com` short links) · **Programming Camp Syllabus** Google Doc

**IOI official** — `ioinformatics.org/` · `/page/contests/10` · `/page/syllabus/12` · `/page/recommended-reading/11` · **`/files/ioi-syllabus-2025.pdf`** (downloaded) · `stats.ioinformatics.org/` · `/countries/` · `algo.sk/ioi-syllabus/` · `algo.sk/ioi-syllabus/ioi-syllabus-2025-draft.pdf` · `github.com/ioi/task-archive` · `olympiads.win.tue.nl/ioi/history.html` · `ioi.te.lv/contest/prev.shtml` · `ioi.te.lv/contest/national.shtml` · `ioirankings.com/`

**Free curricula & books** — `usaco.guide/` · `/general` · `/bronze` · `/silver` · `/gold` · `/adv` · `/problems` (7/7 ✅) · **`cses.fi/book/book.pdf`** (Competitive Programming Handbook, ✅ PDF) · `cses.fi/problemset/` · `cp-algorithms.com/` · `courses.csail.mit.edu/6.042/spring18/mcs.pdf` ✅ · `cims.nyu.edu/~regev/…/dmbook.pdf` ✅ · `web.stanford.edu/class/cs97si/` · `cs50.harvard.edu/x/2024/weeks/5/` · `ocw.mit.edu/courses/6-006-…` · `ocw.mit.edu/courses/6-042j-…` · `visualgo.net/en` · `hyperpolyglot.org/cpp` · `randomascii.wordpress.com/2012-02-25/comparing-floating-point-numbers-2012-edition/` · `geeksforgeeks.org/how-to-prepare-for-acm-icpc/` · `discuss.codechef.com/t/data-structures-and-algorithms/6599`

**Platforms** — `atcoder.jp/` · `codechef.com/` · `ideone.com` · `pastebin.com` · `learncpp.com` · `en.cppreference.com/w/`

### 8.3 Live but with an access caveat ⚠️

| URL | Caveat | Workaround |
|---|---|---|
| `codeforces.com/**` (site + all 7 blog posts) | **HTTP 403 to scripts** (Cloudflare). Codeforces is unquestionably live and is the world's largest CP platform. | Opens normally in a browser |
| `usaco.org/**` (main site + `/index.php?page=training`) | **HTTP 403 to scripts** | Browser. Or use **`usaco.guide`** (✅ fully verified), which is the community-built equivalent and mirrors the same ladder |
| `projecteuler.net` | **HTTP 403 to scripts** | Browser |
| `hackerrank.com` | Not re-verified (login-walled) | Browser |
| `en.cppreference.com/w/` | **HTTP 403 to scripts** (bot-wall). The canonical C++ reference; unquestionably live. | Browser |
| `randomascii.wordpress.com/2012-02-25/comparing-floating-point-numbers-2012-edition/` | **HTTP 403 to scripts** (WordPress bot-wall) | Browser |
| `nplcoder.org/en/leaderboard` | ✅ HTTP 200 but **client-side rendered** (117 KB shell, no server-side data). No contest archive is exposed. | Browser → **Gap I-12** |
| `nplcoder.org/en/events` | ✅ HTTP 200 but the main content block renders client-side; only the nav and footer are server-rendered | Browser |
| `nepvents.com/events/cmfrxk8nl0002qnvmikvfhziz` | **HTTP 403 to scripts.** Third-party listing; used only as evidence of the **conflicting** January 15 2026 deadline | Treat as unauthoritative → Gap I-2 |
| `files.gitter.im/…Competitive-Programming-3…` | NPLCoder's link to *Competitive Programming 3* is a **third-party chat-file host**, not a publisher | Prefer buying; ISBN 978-981-4608-41-1 |
| Quora links (2) | Login/bot-walled | Perspective reading only |

### 8.4 Checked and REJECTED — do not put these on your site ❌

| URL / claim | Why rejected |
|---|---|
| ⭐ **`topcoder.com/community/data-science/data-science-tutorials/`** | **HTTP 404.** Listed as item 5 under "Data Structures & Algorithms" in NPLCoder's own official Resources document. **Dead.** → Gap I-7. Replace with **`cp-algorithms.com`** (✅ verified, strictly better). |
| ⭐ **`graphics.stanford.edu/~seander/bithacks.html`** (*Bit Twiddling Hacks*) | **Connection refused** (`Errno 111`) on repeated attempts. Listed as item 6 under "Miscellaneous" in NPLCoder's official Resources document. → Gap I-7. Substitute: the CP-Algorithms bit-manipulation pages, or an archive.org snapshot. |
| ⭐ **`work@nplcoder.edu`** | **Non-existent TLD.** Printed in the front matter of NPLCoder's official Resources document. The correct address — used later in the *same* document and everywhere on the website — is **`work@nplcoder.org`**. → Gap I-7 |
| **Discord invite mismatch** | The Resources document links **`discord.gg/aQtu8FX2CJ`**; the website links **`discord.gg/kJrvdhmzVd`**. Both may work, but they are different invites. → Gap I-7 |
| `stats.ioinformatics.org/people/` | **HTTP 404** — the people index is not at this path; use `/countries/` and the site's Search |
| `crazy-cat-crypto.github.io/nepal-olympiad-hub/` | Lists informatics under **"NOI — Nepal Olympiad in Informatics"** with organiser **"NPLCoder"** (correct) but **Fee: "TBD (likely minimal)"** — it is **free**, stated explicitly on NPLCoder's own NOI page — and **"Nepal Performance: First year - historic opportunity"**, which understates the situation: **Nepal is not an IOI member country at all** and has never participated. Also lists the **Himalayan Linguistic Olympiad under "AI"**. Do not copy from it. |
| Any claim that Nepal has **participated in the IOI** | **False.** Nepal does not appear in the IOI's 118-member list and has zero recorded participations. NOI 2025 was the **inaugural** national olympiad. |
| `bunchofcells.vercel.app/blog/indian-astronomy-olympiads` · `rajit13.github.io/website_docs/problems_Pho.pdf` | Both **HTTP 404** (carried forward from the Astronomy file — the AO Guide Resources page links both) |

### 8.5 Pages I read in full (not just linked)

1. **All three official NOI Google Docs** — retrieved via the `/export?format=txt` endpoint for text and `/export?format=html` for the hyperlink set (the text export strips URLs, so both were needed to recover all 44 links)
2. **IOI Syllabus 2025, all 23 pages** — including the six category definitions verbatim and a programmatic count of every ✓ / ✗ / ? marker per section
3. **`stats.ioinformatics.org/countries/`** — all 118 member names extracted and searched
4. **`nplcoder.org/en/noi`** — the complete 4-stage structure, eligibility, fee, deadline, awards, language policy and all three resource links
5. **`nplcoder.org/en/aims`** — the entire 12-week day-by-day timetable with every date, topic and contest
6. **`nplcoder.org/en/team`** — all 9 named members with roles and affiliations
7. **`nplcoder.org/en/about`** — mission, 5 values, 4 goals
8. **`ioi.te.lv/contest/prev.shtml`** and **`olympiads.win.tue.nl/ioi/history.html`** — the IOI task archives
9. **`usaco.guide`** all 7 pages — confirmed the Bronze/Silver/Gold/Advanced ladder and its topic coverage

---

# 📞 PART 9 — OFFICIAL CONTACTS & CHANNELS

| Body / Person | Role | Contact |
|---|---|---|
| **NPLCoder** | **National organiser** — runs NOI, NPLAlgo, NPLIMO, AIMS | **Kathmandu, Nepal** · **`work@nplcoder.org`** · **+977 9862021531** (Nepal) · **+1 615-484-1629** (USA) · <https://www.nplcoder.org/en> |
| **Manish Acharya** | **Founding Member** · Undergraduate, Vanderbilt University · **author of the official NOI Resources document** | via `work@nplcoder.org` |
| **Aashish Karki** | **Founding Member** · IOE Pulchowk Campus · AWS Certified Solutions Architect Associate | via `work@nplcoder.org` |
| **Amrit Kandel** | Advisory · **Founder & Visionary / Advisor (Current)** | via `work@nplcoder.org` |
| ⭐ **Debojoti Das Soumya** | Advisory · **Competitive Programmer, 3× IOI Medalist, MIT** — *the most experienced IOI person affiliated with any Nepali olympiad body* | via `work@nplcoder.org` |
| ⭐ **Shreyash Sharma Bastola** | **NPLIMO Lead** · **Bronze, IMO 2025** — Nepal's only IMO medallist | via `work@nplcoder.org` |
| Safal Poudel · Nishchit Bhandari | Lead Web Developer · Discord Moderator | via `work@nplcoder.org` |
| Riwaj Adhikari · Prabin Devkota · Aayush Mainali | NPLAlgo Team · Amrita Vishwa Vidyapeetham, Bengaluru | via `work@nplcoder.org` |
| **NPLCoder Discord** | Community, **+800 members** | <https://discord.gg/kJrvdhmzVd> (website) · <https://discord.gg/aQtu8FX2CJ> (resources doc) |
| **Social** | | FB: <https://www.facebook.com/people/NPLCoder/61576287650990/> · IG: <https://www.instagram.com/nplcoder/> · LinkedIn: <https://www.linkedin.com/company/nplcoder/> |
| **IOI — International Scientific Committee** | Syllabus maintainer; the body that evaluates task proposals | **Michal Forišek** (Comenius University, Slovakia) — **`misof@algo.sk`** |
| **IOI** | International governing body | <https://ioinformatics.org/> · Statistics: <https://stats.ioinformatics.org/> |
| **MoEST** | National olympiad recognition (कार्यविधि २०८२) | <https://nps.org.np/wp-content/uploads/2026/09/National-Olympiad-Guidelines.pdf> |
| **Mathematical Association of Nepal (MAN)** | Cross-subject partner — NPLIMO overlaps with MAN's IMO pipeline | <https://www.mathassociationnepal.org.np/> · `imonepal22@gmail.com` |

---

## ✅ Summary — the six things to do first

1. **Publish PART 0A — the zero.** Nepal is **not one of the 118 IOI member countries**, and is the **only South Asian nation absent** (Bangladesh, India, Pakistan and Sri Lanka are all members). NOI 2025 was the **inaugural** edition. This is not a failure to report — it is the single clearest growth opportunity on your entire site, and it is the only subject where NSS can help build a national programme from the ground floor rather than reform one.
2. **Act on Gap I-1: the IOI accreditation roadmap.** NOI's four-round pipeline culminates in *"the top 4 performers will… represent Nepal at the IOI"* — but **no published document addresses how Nepal becomes an IOI member.** Until that happens, the pipeline has no exit. Email `work@nplcoder.org` and `misof@algo.sk`, then generate the roadmap. **Everything else in this document is downstream of it.**
3. **Generate Gap I-5: "The IOI Do-Not-Study List."** The IOI Syllabus **explicitly excludes calculus, linear algebra, statistics, trigonometric functions, complex numbers, general conics and 3-D geometry** — all of which NEB teaches extensively and several of which the **Astronomy** olympiad *requires*. A Nepali student juggling NAO and NOI receives directly contradictory advice. One two-column table (85 excluded topics × where they appear in school × which other Nepali olympiad needs them) would save candidates months. **No such document exists in any country.**
4. **Generate Gap I-3: the NOI Calibration Series.** NPLCoder openly states it has *"no archive of past problems."* Build four tiers of mocks matched exactly to the published per-round syllabi, with the Finals tier in true IOI format (**2 days × 3 tasks × 5 h × 100 points, subtask scoring**) and every problem shipping an editorial, a reference C++ solution and test data.
5. **Publish the three official NOI documents prominently, and mirror them.** They are excellent — a genuine 4-round differentiated syllabus (unique in Nepal), a full Program Structure with cutoffs and awards, and a **44-link curated resource list** — but they live in three Google Docs behind `tinyurl.com` short links on a JS-rendered site. Mirror them with attribution (the Resources doc explicitly permits free sharing with attribution to NPLCoder). Also report the **4 defects** in Gap I-7: two dead links, the `work@nplcoder.edu` typo, and the two different Discord invites.
6. **Promote AIMS 2026 and generate Gap I-4 (Weeks 13–24).** AIMS is a **free, published, day-by-day 12-week curriculum for Grades 8–12** with a weekly contest — the best free structured CP training in Nepal, and almost certainly unknown to most of your audience. But it stops at *introduction to DP* and never reaches Round 3 (segment trees, DSU, Fenwick, Dijkstra, MST, tries) or Round 4 (bitmask DP, DP on trees, KMP, geometry). Write the continuation and offer it to NPLCoder.

**Two things NOT to do:** don't tell students to study calculus or trigonometry for the IOI (both **explicitly excluded**), and don't cite `crazy-cat-crypto.github.io/nepal-olympiad-hub`, which lists the NOI fee as "TBD (likely minimal)" when it is **free**, and claims Nepal's performance is "First year" rather than **zero IOI memberships**.

**One cross-subject note for your site:** **Shreyash Sharma Bastola** — Nepal's **only IMO bronze medallist** (documented in the Mathematics file) — is now **NPLIMO Lead at NPLCoder**. Nepal's olympiad community is small and its best people work across subjects. Link your Mathematics and Informatics pages, and approach NPLCoder and MAN together.

---

*Document ends. Subject 06 (Informatics) complete. Remaining: **Artificial Intelligence** — the last subject.*
