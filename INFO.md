# MacroView Launchpad — Project Info

A one-page marketing site for **MacroView Digital**, a content production / video-editing agency aimed at creators and personal brands. Built with Vite + React + TypeScript and styled with Tailwind / shadcn-ui, animated via GSAP + ScrollTrigger.

## Stack

- **Build:** Vite 5, `@vitejs/plugin-react-swc`
- **Language:** TypeScript 5.8
- **UI:** React 18.3, shadcn-ui (Radix primitives), Tailwind CSS 3.4
- **Animation:** GSAP + ScrollTrigger (loaded on `window`)
- **Routing:** React Router 6
- **Data/Forms:** TanStack Query, react-hook-form, zod
- **Tests:** Vitest + Testing Library + jsdom
- **Tagging:** lovable-tagger (project was scaffolded via Lovable)

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run build:dev` | Dev-mode build |
| `npm run preview` | Preview built output |
| `npm run lint` | ESLint |
| `npm run test` | Vitest one-shot |
| `npm run test:watch` | Vitest watch mode |

## Page structure

The landing page is a single route ([src/pages/Index.tsx](src/pages/Index.tsx)) implemented as a **scroll-snap system** with 9 stacked sections + CTA bands between them:

1. `hero` — Home / opener
2. `problem` — The Problem
3. `solution` — The System
4. `portfolio` — Portfolio grid (6 sample pieces)
5. `results` — Case studies / metrics
6. `why` — Why MVD
7. `who` — Who We Work With
8. `faq` — FAQ accordion (8 questions)
9. `book` — Book a Call (mailto Gmail compose)

Booking CTA target: `MacroViewDigital@gmail.com` via a Gmail compose URL.

## Notable UX details

- **Loading intro** — full-screen MACROVIEW wordmark with glow on first paint.
- **Scroll-snap navigation** — custom snap container with side nav dots; `#snap-root` hides scrollbars and uses a `snapEnter` keyframe to fade/scale section content in on entry ([src/index.css:831+](src/index.css#L831)).
- **CTA bands** — interstitial gradient strips between sections (deep indigo → black).
- **3D tilt cards** — service / work / testimonial cards have isometric hover.
- **Atmospheric textures** — blue glow, concrete bg, grid bg, smoke effects.
- **Mobile fixes** — navbar alignment, sidebar start position, CTA sizing.

## Repo layout (high-signal paths)

- [src/pages/Index.tsx](src/pages/Index.tsx) — entire landing page
- [src/index.css](src/index.css) — Tailwind layers + bespoke keyframes (snap, glow, breathe, CTA bands)
- [src/App.css](src/App.css) — root app styles
- [public/](public/) — heavy media assets (hero video, logos, glows, icons)
- [public/case-studies/](public/case-studies/), [public/portfolio/](public/portfolio/) — empty asset folders staged for upcoming visuals
- [.lovable/plan.md](.lovable/plan.md) — original Lovable plan

## Recent history (newest → oldest)

- `ad53d10` Fix mobile navbar alignment, sidebar start position, close section CTA size
- `7775faa` Remove hero text, fix blank page crash, resize navbar logo
- `47ccf91` update
- `4174448` Add loading intro animation (loading screen + atmospheric textures + 3D tilt)
- `a3d7e1d` Add loading intro glow
- `340a064` / `8b3e79c` Built MacroView landing page
- `faa4dcb` / `ae771b0` Lovable plan
- `aec0f38` Initial template (`vite_react_shadcn_ts_2026-03-20`)

## Working-tree changes (uncommitted)

- **Modified** [src/pages/Index.tsx](src/pages/Index.tsx) — large refactor (~649 ins / 711 del). Replaces older `services` array with new content model: `SECTIONS` index, `portfolioItems`, `caseStudies`, `faqs`, `testimonials`. Adds an `Accordion` import for the FAQ section. Introduces a typed `CtaBandProps` and per-section refs. Hero copy was removed; layout reorganized around the 9-section snap flow.
- **Modified** [src/index.css](src/index.css) — adds the scroll-snap system (`#snap-root`, `snapEnter` keyframe, `.snap-content-wrap`), nav-dot styles with active state + mobile sizing, and CTA-band gradient/border treatment.
- **Untracked** [public/case-studies/](public/case-studies/), [public/portfolio/](public/portfolio/) — empty, awaiting media drops.

## Open follow-ups

- Populate [public/case-studies/](public/case-studies/) and [public/portfolio/](public/portfolio/) with real visuals (currently the portfolio grid uses CSS gradients as placeholders).
- Decide whether to commit the in-flight refactor of [src/pages/Index.tsx](src/pages/Index.tsx) and [src/index.css](src/index.css), or split into smaller commits along the snap-system / content-model boundary.
