# 🏆 NSS Olympiad Hub

**Free Olympiad preparation platform for NSS Grade 11 & 12 students**

*7 disciplines · Study materials · Model papers · Structured roadmaps*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-DD0031?logo=framer)](https://www.framer.com/motion)

---

[Explore Olympiads](#-olympiad-categories) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [Customization](#-customization)


---

## 📖 Overview

**NSS Olympiad Hub** is a preparation platform built by NSS Clubs' STEM Club to help Grade 11 and 12 students compete in national and international Olympiads. The platform provides curated study materials, model question papers, and structured preparation roadmaps — all completely free.

> *"Every Olympiad champion was once a student who decided to start."*

---

## ✨ Features

### 🎯 Core Functionality
- **7 Olympiad Categories** — Mathematics, Physics, Chemistry, Astronomy, Artificial Intelligence, Informatics, and Biology
- **Study Materials** — PDFs, videos, documents, and links organized by subject
- **Model Question Papers** — Past year papers grouped by year for timed practice
- **Preparation Roadmaps** — 4-stage structured plans (Foundation → Problem Practice → Timed Mocks → Exam-Ready)

### 🎨 Design & Experience
- **Interactive Constellation Hero** — 7 clickable nodes representing each Olympiad, connected by orbital paths
- **Animated Backdrop** — Scientific diagrams, floating problem cards, and breathing glow effects
- **Smooth Scrolling** — Powered by Lenis with anchor navigation support
- **Dark/Light Mode** — System-aware theme toggle with smooth transitions
- **Micro-interactions** — Magnetic buttons, scroll-triggered animations, blur text reveals
- **Fully Responsive** — Mobile-first design from 320px to 4K displays

### ⚙️ Technical Highlights
- **Server Components** — Static generation for Olympiad pages via `generateStaticParams`
- **SEO Optimized** — Dynamic metadata per Olympiad category
- **Accessibility** — Keyboard navigation, ARIA labels, reduced-motion support
- **Type-Safe** — Full TypeScript coverage with Sanity-ready data models

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 + CSS Variables |
| **Animation** | Framer Motion (`motion/react`) + [Anime.js](https://animejs.com) |
| **Scrolling** | [Lenis](https://github.com/darkroomengineering/lenis) |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com) (Sheet, Switch, Tabs) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Fonts** | Space Grotesk (headings) + Inter (body) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.17.0
- **npm**, **yarn**, or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/nss-clubs/olympiad-hub.git
cd olympiad-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

No environment variables are required for the base setup. If you integrate Sanity CMS later:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout (fonts, theme, navbar, footer)
│   ├── page.tsx                # Homepage (hero, why, categories, team, CTA)
│   ├── globals.css             # Design tokens, keyframes, Tailwind config
│   ├── olympiads/
│   │   ├── page.tsx            # All Olympiads grid
│   │   └── [slug]/page.tsx     # Individual Olympiad detail (tabs)
│   └── test/page.tsx           # Component playground (dev only)
│
├── components/
│   ├── hero/
│   │   ├── OlympiadHero.tsx        # Hero section orchestrator
│   │   ├── OlympiadHeroBackdrop.tsx # 3-layer atmospheric background
│   │   ├── OlympiadNodes.tsx        # Interactive constellation nodes
│   │   └── ScrollCue.tsx            # Animated scroll indicator
│   ├── ui/                          # Radix-based primitives
│   │   ├── sheet.tsx
│   │   ├── switch.tsx
│   │   └── tabs.tsx
│   ├── CategoryCard.tsx             # Olympiad card with subject color
│   ├── FadeIn.tsx                   # Scroll-triggered reveal
│   ├── BlurText.tsx                 # Word-by-word blur animation
│   ├── CountUp.tsx                  # Animated number counter
│   ├── GeometricHeroCanvas.tsx      # Floating shape background
│   ├── MagneticButton.tsx           # Mouse-tracking button
│   ├── SectionLabel.tsx             # Pill badge component
│   ├── SmoothScroll.tsx             # Lenis wrapper + anchor handling
│   ├── navbar.tsx                   # Sticky header with scroll hide
│   ├── footer.tsx                   # Site footer with links
│   ├── theme-provider.tsx           # next-themes wrapper
│   └── theme-toggle.tsx             # Sun/Moon switch
│
├── lib/
│   ├── data/olympiads.ts       # All Olympiad data + types
│   └── utils.ts                # cn() helper (clsx + tailwind-merge)
│
└── data/
    └── materials.ts            # CMS-ready material store (Sanity bridge)
```

---

## 🎨 Design System

### Color Tokens

All colors use HSL CSS variables defined in `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 199 89% 48%;       /* Cyan */
  --accent: 25 95% 53%;         /* Orange */
  /* ... */
}

.dark {
  --background: 223 49% 8%;
  --foreground: 210 40% 96%;
  --primary: 199 89% 58%;
  /* ... */
}
```

### Subject Colors

Each Olympiad has a dedicated color variable:

| Subject | Variable | Light Mode | Dark Mode |
|---------|----------|-----------|-----------|
| Mathematics | `--subject-math` | `199 89% 48%` | `199 89% 58%` |
| Physics | `--subject-physics` | `258 90% 66%` | `258 90% 72%` |
| Chemistry | `--subject-chemistry` | `160 84% 39%` | `160 74% 46%` |
| Astronomy | `--subject-astronomy` | `239 84% 67%` | `239 84% 74%` |
| AI | `--subject-ai` | `25 95% 53%` | `25 95% 60%` |
| Informatics | `--subject-informatics` | `350 89% 60%` | `350 89% 66%` |
| Biology | `--subject-biology` | `173 80% 40%` | `173 70% 46%` |

### Typography

- **Headings:** Space Grotesk (`--font-heading`)
- **Body:** Inter (`--font-body`)

---

## 🔧 Customization

### Adding a New Olympiad

1. **Define the data** in `lib/data/olympiads.ts`:

```typescript
{
  slug: "your-subject",
  name: "Your Subject",
  tagline: "Your catchy tagline here.",
  description: "Longer description for the detail page.",
  icon: YourIcon,                    // from lucide-react
  colorVar: "--subject-your-subject",
  studyMaterial: [
    { title: "Resource Name", type: "PDF", fileUrl: "/files/your-file.pdf" },
  ],
  modelPapers: [
    { title: "National Round 2025", year: "2025", fileUrl: "/files/paper.pdf" },
  ],
  roadmap: DEFAULT_ROADMAP,          // or custom stages
}
```

2. **Add the color** to `globals.css`:

```css
:root { --subject-your-subject: 180 70% 45%; }
.dark  { --subject-your-subject: 180 70% 55%; }
```

3. **Add a hero diagram** (optional) in `OlympiadHeroBackdrop.tsx` → `DIAGRAMS` array.

### Adding Study Materials

Materials can be added in two places:

- **Inline:** Directly in `lib/data/olympiads.ts` (for permanent resources)
- **CMS Bridge:** In `data/materials.ts` (for Sanity-synced content)

```typescript
// data/materials.ts
export const studyMaterials: Record<string, Resource[]> = {
  mathematics: [
    { title: "Algebra Masterclass", type: "Video", fileUrl: "https://..." },
  ],
};
```

> ⚠️ Resources with `fileUrl: "#"` are filtered out automatically. Replace with real URLs before production.

### Modifying the Roadmap

The default 4-stage roadmap is shared across all Olympiads. To customize per subject:

```typescript
const CUSTOM_ROADMAP: RoadmapStage[] = [
  { stage: "Stage Name", description: "What to do in this stage." },
  // ... more stages
];
```

---

## 🏗 Architecture Notes

### Data Flow

```
lib/data/olympiads.ts (base data)
         ↓
data/materials.ts (CMS additions)
         ↓
    Merged via olympiads.map()
         ↓
  app/olympiads/[slug]/page.tsx (SSG)
```

### Animation Strategy

| Component | Library | Trigger |
|-----------|---------|---------|
| Hero headline | CSS keyframes | Page load |
| Constellation nodes | CSS + React state | Hover/Focus |
| Section reveals | Framer Motion | Intersection Observer |
| Blur text / Count up | Anime.js | Intersection Observer |
| Floating shapes | Anime.js | Infinite loop |
| Smooth scroll | Lenis | Always active |

All animations respect `prefers-reduced-motion: reduce`.

### Smooth Scroll & Anchors

`SmoothScroll.tsx` wraps the entire app and:
- Initializes Lenis with RAF loop
- Intercepts `a[href^="#"]` clicks for smooth anchor scrolling
- Resets scroll position on route changes (except hash navigation)
- Exposes `getLenis()` for future modal/overlay integration

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments.

### Other Platforms

The app is a standard Next.js project and works on:
- **Netlify** (with Next.js plugin)
- **AWS Amplify**
- **Docker** (via `next build` + `next start`)

---

## 📋 Roadmap

- [ ] Sanity CMS integration for materials
- [ ] User authentication (progress tracking)
- [ ] Practice mode with timer
- [ ] Leaderboard / community features
- [ ] PWA support (offline access)
- [ ] Multi-language support (Nepali)

---

## 🤝 Contributing

This project is maintained by the **NSS Clubs STEM Club**. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

© 2026 NSS Clubs. All Rights Reserved.

---

<div align="center">

**Built by Divya Darsheel Sharma**

*Empowering Nepal's next generation of Olympiad champions*

</div>
