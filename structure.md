# structure.md — MacroView Digital Page Architecture
> **Stack:** Vite 5 + React 18 + TypeScript 5.8 + Tailwind CSS 3.4 + GSAP/ScrollTrigger
> **Route:** Single-page, `/` → `src/pages/Index.tsx`

---

## 01 · PAGE SHELL

```
App.tsx
└── Router
    └── Index.tsx ← entire landing page
        ├── <Loader />               — Full-screen intro wordmark
        ├── <Navbar />               — Fixed top navigation
        ├── <ScrollDots />           — Fixed right-side section dots
        ├── <CustomCursor />         — Dot + ring cursor (desktop)
        ├── <GrainOverlay />         — Fixed film grain texture
        └── <div id="snap-root">     — Scroll-snap container
            ├── <HeroSection />
            ├── <CtaBand variant="intro" />
            ├── <ProblemSection />
            ├── <CtaBand variant="pivot" />
            ├── <SolutionSection />
            ├── <CtaBand variant="portfolio" />
            ├── <PortfolioSection />
            ├── <ResultsSection />
            ├── <CtaBand variant="why" />
            ├── <WhySection />
            ├── <WhoSection />
            ├── <CtaBand variant="faq" />
            ├── <FaqSection />
            └── <BookSection />
```

---

## 02 · DATA MODELS

```typescript
// ─── SECTION REGISTRY ─────────────────────────────────
export const SECTIONS = [
  { id: 'hero',      label: 'Home',      dotIndex: 0 },
  { id: 'problem',   label: 'Problem',   dotIndex: 1 },
  { id: 'solution',  label: 'System',    dotIndex: 2 },
  { id: 'portfolio', label: 'Portfolio', dotIndex: 3 },
  { id: 'results',   label: 'Results',   dotIndex: 4 },
  { id: 'why',       label: 'Why MVD',   dotIndex: 5 },
  { id: 'who',       label: 'Who',       dotIndex: 6 },
  { id: 'faq',       label: 'FAQ',       dotIndex: 7 },
  { id: 'book',      label: 'Book',      dotIndex: 8 },
] as const;

// ─── PORTFOLIO ITEM ───────────────────────────────────
interface PortfolioItem {
  id: string;
  title: string;
  category: 'Short-Form' | 'Long-Form' | 'Reels' | 'Ads' | 'Thumbnails' | 'Brand';
  span?: 'tall' | 'wide' | 'standard';   // grid-row/col span
  imagePath?: string;                     // /portfolio/{id}.jpg
  gradientFallback: string;               // CSS gradient string
  client?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'YouTube Series Edit',
    category: 'Long-Form',
    span: 'tall',
    gradientFallback: 'linear-gradient(135deg, #0d1828, #081220)',
  },
  {
    id: 'p2',
    title: 'Brand Reel',
    category: 'Reels',
    gradientFallback: 'linear-gradient(135deg, #0e0d1a, #12101e)',
  },
  {
    id: 'p3',
    title: 'Coaching Ad',
    category: 'Ads',
    gradientFallback: 'linear-gradient(135deg, #0a1510, #0d1a14)',
  },
  {
    id: 'p4',
    title: 'Lifestyle Doc',
    category: 'Short-Form',
    gradientFallback: 'linear-gradient(135deg, #1a0d0d, #120808)',
  },
  {
    id: 'p5',
    title: 'Podcast Clips',
    category: 'Short-Form',
    gradientFallback: 'linear-gradient(135deg, #0f0a18, #150e22)',
  },
  {
    id: 'p6',
    title: 'Product Launch',
    category: 'Ads',
    gradientFallback: 'linear-gradient(135deg, #0a0e1a, #0c1222)',
  },
];

// ─── CASE STUDY / RESULT ──────────────────────────────
interface CaseStudy {
  id: string;
  metric: string;          // e.g. "847K"
  metricSuffix?: string;   // e.g. "+" or "%"
  description: string;
  client: string;
  imagePath?: string;      // /case-studies/{id}.jpg
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs1',
    metric: '847K',
    metricSuffix: '+',
    description: 'Organic views in 30 days from a 12-piece short-form series we scripted, edited, and published.',
    client: 'Fitness Creator · 2024',
  },
  {
    id: 'cs2',
    metric: '4.2x',
    description: 'ROAS on paid video ads for a coaching client — produced, edited, and iterated in-house.',
    client: 'Business Coach · 2024',
  },
  {
    id: 'cs3',
    metric: '0→60K',
    description: 'Subscribers in under 90 days. Full content strategy, weekly long-form, and daily shorts.',
    client: 'Personal Brand · 2025',
  },
];

// ─── FAQ ──────────────────────────────────────────────
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    id: 'f1',
    question: 'What types of creators do you work with?',
    answer: 'We primarily work with coaches, consultants, and personal brand creators who are already generating revenue and want to scale their content output without building an in-house team. We are not a fit for beginners or hobbyists.',
  },
  {
    id: 'f2',
    question: 'How long does it take to onboard?',
    answer: 'Standard onboarding is 5–7 business days. We collect brand assets, conduct a strategy call, establish your content calendar, and have your first deliverables in edit within the first week.',
  },
  {
    id: 'f3',
    question: 'What is included in each package?',
    answer: 'Every engagement includes: raw footage intake, editing, color grading, motion graphics, captions/subtitles, thumbnail design, and one revision round. Additional services are scoped separately.',
  },
  {
    id: 'f4',
    question: 'Do you handle scripting and strategy too?',
    answer: 'Yes. Our full-service tier includes content strategy, scripting, hook engineering, and distribution scheduling — not just editing. Most clients find the strategy layer is where we create the most leverage.',
  },
  {
    id: 'f5',
    question: 'How do turnaround times work?',
    answer: 'Short-form content (Reels, Shorts, TikTok): 48–72 hours. Long-form YouTube edits: 5–7 business days. Rush delivery is available on request.',
  },
  {
    id: 'f6',
    question: 'Do you sign NDAs or exclusivity agreements?',
    answer: 'Yes. We offer NDA protection on all accounts by default. Category exclusivity (only one client per niche) is available on our premium tier.',
  },
  {
    id: 'f7',
    question: 'What does the pricing look like?',
    answer: 'We work on monthly retainers starting at a discovery call. Pricing scales with output volume, content complexity, and whether strategy and scripting are included. Book a call and we will scope a custom engagement.',
  },
  {
    id: 'f8',
    question: 'What happens if I am not satisfied with a deliverable?',
    answer: 'Every deliverable includes one structured revision round. If after revision the output does not meet brief, we remake it. We track every brief against a written spec to prevent ambiguity.',
  },
];

// ─── TESTIMONIAL ──────────────────────────────────────
interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'MacroView took our raw footage and turned it into a content machine. We went from posting once a month to twice a week without adding headcount.',
    author: 'Alex R.',
    role: 'Business Coach',
  },
  {
    id: 't2',
    quote: 'The difference between our before-and-after content is embarrassing. These guys understand visual storytelling at a level I have not seen from other agencies.',
    author: 'Jordan M.',
    role: 'Fitness Creator',
  },
];

// ─── CTA BAND PROPS ───────────────────────────────────
interface CtaBandProps {
  variant: 'intro' | 'pivot' | 'portfolio' | 'why' | 'faq';
  headline: string;
  cta: string;
  href: string;
  secondary?: { label: string; href: string };
}
```

---

## 03 · COMPONENT SPECS

### `<Loader />`
```
State: visible on mount → hidden after 2200ms
Animation sequence:
  0ms:    Wordmark fades in (opacity 0→1, letter-spacing 0.6em→0.15em, blur 20px→0)
  400ms:  Loading bar sweeps left→right (1400ms duration)
  2000ms: Loader fades out (opacity 0, visibility hidden, 800ms)
  2200ms: Body scroll unlocked, snap-root sections animate in
DOM: position:fixed z-index:9000
```

### `<Navbar />`
```
Default: transparent background, no border
Scrolled (snap-root scrollTop > 10px): 
  → rgba(6,6,8,0.92) bg, blur(20px), border-bottom: --border, reduced padding
Logo: "MACRO" --white + "VIEW" --blue (Bebas Neue)
Links: Space Mono, UPPERCASE, hover underline slide-in from left
CTA: "Book a Call" → Gmail compose URL
Mobile: hide nav-links, keep logo + CTA
```

### `<ScrollDots />`
```
Renders one dot per SECTIONS entry
Observes snap-root scroll position
Active section: elongated pill (6×24px, --blue)
Inactive: round (6×6px, --muted)
Click → scrolls snap-root to target section (smooth)
Hidden on mobile (<768px)
```

### `<CustomCursor />`
```
Two elements: dot (8px) + ring (36px)
mousemove → dot follows exactly
ring follows with 80ms linear interpolation
Hover on <a>, <button>: ring expands 36→56px, border-color → --blue
mix-blend-mode: difference on dot
Hidden on touch devices
```

### `<HeroSection />`
```
Layout: 2-column grid (5fr 7fr)
Left: eyebrow → headline → subtext → CTA pair
Right: decorative panel (aspect 4/5)
  → grid background
  → animated blue orb (bottom-right)
  → 3 counter chips (absolute, bottom-left)
  → vertical label (top-right)
Counters: "100+" Projects | "3M+" Views | "48h" Turnaround
```

### `<ProblemSection />`
```
Layout: 2-column grid (1fr 1fr), bg: --deep
Left: headline (strike-through styled problem words) + body
Right: pain point list (4 items, border cards)
Pain items animate in with stagger-delay on scroll enter
```

### `<SolutionSection />`
```
Header: centered tag + display headline
Body: 3-column service card grid (1px gap, --border bg)
Services:
  01. Short-Form Content  — Reels, Shorts, TikTok
  02. Long-Form Editing   — YouTube, Podcasts, Docs
  03. Ad Creative         — Direct-response video ads
  04. Brand Strategy      — Content calendar + scripting
  05. Thumbnails + GFX    — Visual identity for content
  06. Distribution        — Scheduling + cross-posting
Cards: icon (emoji) + number + title + description
3×2 grid on desktop, 1-col on mobile
```

### `<PortfolioSection />`
```
Header: headline (left) + "View All Work" link (right)
Grid: 3-col × 2-row, 2px gap, --border gap color
  Item 1 (tall): spans 2 rows (col 1)
  Items 2–6: standard cells
Hover: image scale + overlay fade with title/category
Image sources: /public/portfolio/{id}.jpg
Gradient fallback: specified per item in data
```

### `<ResultsSection />`
```
Header: centered
Grid: 3-col metric cards
Each card: large metric number + description + client attribution
Top highlight bar animation on hover
```

### `<WhySection />`
```
Layout: 2-column (5fr 7fr), bg: --deep
Left: headline + body text
Right: vertical list of pillars (5 items)
Pillars: [num] [title] [→]
Each row is a bordered card, hover shifts border to --blue
Pillar content:
  01. Frame-Perfect Editing
  02. Built for Creator Scale
  03. Strategy-First Approach
  04. Retention-Optimised Output
  05. Turnaround Guarantee
```

### `<WhoSection />`
```
Header: centered
Grid: 4-col who-type cards (1px gap)
Types: Coaches | Educators | Lifestyle | Podcasters
Below: 2-col testimonial cards
```

### `<FaqSection />`
```
Header: centered, bg: --deep
Accordion list: max-width 800px, centered
Each item: question button + animated answer panel
Open/close via useState per item (or single open at a time)
```

### `<BookSection />`
```
Full-height, centered
Background: radial blue glow
Eyebrow → large headline → subtext → CTA pair
CTA Primary: "Book a Discovery Call" → Gmail compose
CTA Outline: "View Portfolio" → #portfolio scroll
Footer below the section (not snap-aligned)
```

### `<CtaBand />`
```
Variants:
  intro     → "Ready to scale your content?"
  pivot     → "See the system in action."
  portfolio → "Your next viral piece starts here."
  why       → "There is no second take in content."
  faq       → "Still have questions?"

All variants: centered layout, radial glow, headline + single CTA
min-height: 280px, scroll-snap aligned
```

---

## 04 · SCROLL-SNAP SYSTEM

```css
/* snap-root config */
#snap-root {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
}

/* All direct children snap */
section, .cta-band {
  scroll-snap-align: start;
  min-height: 100vh; /* sections */
}

.cta-band {
  min-height: 280px; /* bands are shorter */
}
```

**Section enter animation:**
```css
.snap-content {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
              transform 0.8s cubic-bezier(0.16,1,0.3,1);
}
.snap-content.visible {
  opacity: 1;
  transform: translateY(0);
}
```

IntersectionObserver watches each `.snap-content` at threshold 0.15.

---

## 05 · ANIMATION INVENTORY

| Name | Target | Trigger | Duration |
|---|---|---|---|
| `wordGlow` | Loader wordmark | Mount | 1800ms |
| `loadBar` | Loader progress | 400ms delay | 1400ms |
| `loaderExit` | Loader wrapper | 2000ms | 800ms |
| `snapEnter` | Section content | IntersectionObserver | 800ms |
| `orbFloat` | Hero orb | Auto (loop) | 6s |
| `blink` | Live badge dot | Auto (loop) | 1400ms |
| `grainShift` | Grain overlay | Auto (loop) | 120ms |
| `navTransition` | Navbar | Scroll | 400ms |
| `cardHover` | Surface cards | Hover | 300ms |
| `portfolioHover` | Portfolio items | Hover | 600ms |
| `dotActive` | Scroll nav dots | Scroll | 300ms |
| `cursorExpand` | Cursor ring | Hover | 250ms |
| `faqExpand` | FAQ answer | Click | 400ms |

---

## 06 · FILE STRUCTURE

```
src/
├── pages/
│   └── Index.tsx               ← full page assembly
├── components/
│   ├── ui/                     ← shadcn primitives
│   ├── Loader.tsx
│   ├── Navbar.tsx
│   ├── ScrollDots.tsx
│   ├── CustomCursor.tsx
│   ├── GrainOverlay.tsx
│   ├── CtaBand.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SolutionSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── ResultsSection.tsx
│   │   ├── WhySection.tsx
│   │   ├── WhoSection.tsx
│   │   ├── FaqSection.tsx
│   │   └── BookSection.tsx
│   └── shared/
│       ├── Tag.tsx             ← eyebrow tag component
│       ├── SectionLabel.tsx
│       └── LiveBadge.tsx
├── data/
│   ├── portfolioItems.ts
│   ├── caseStudies.ts
│   ├── faqs.ts
│   ├── testimonials.ts
│   └── sections.ts             ← SECTIONS registry + CtaBand configs
├── hooks/
│   ├── useScrollDots.ts        ← active section tracking
│   ├── useSnapObserver.ts      ← IntersectionObserver for enter animations
│   └── useCursor.ts            ← cursor position tracking
├── lib/
│   └── utils.ts                ← cn() etc
├── index.css                   ← Tailwind layers + keyframes + snap system
└── App.css                     ← root app styles

public/
├── portfolio/                  ← {p1..p6}.jpg (drop media here)
├── case-studies/               ← {cs1..cs3}.jpg
├── macroview-logo.svg
├── hero-video.mp4              ← optional hero loop
└── icons/
    └── favicon.ico
```

---

## 07 · CONSTANTS & ENV

```typescript
// src/data/config.ts
export const BOOKING_EMAIL = 'MacroViewDigital@gmail.com';
export const GMAIL_COMPOSE_URL = 
  `https://mail.google.com/mail/?view=cm&to=${BOOKING_EMAIL}&su=Book%20a%20Call%20%E2%80%94%20MacroView%20Digital`;

export const SITE_META = {
  title: 'MacroView Digital — Content Production Studio',
  description: 'We build scroll-stopping video content for creators and personal brands that want to scale.',
  url: 'https://macroviewdigital.com',
};
```
