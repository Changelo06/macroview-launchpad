# master_prompt.md — MacroView Digital · AI Build Prompt
> **Purpose:** Drop this prompt into any AI coding tool (Cursor, Claude, v0, Lovable, Bolt) to generate the complete MacroView Digital landing page. This prompt encodes all design decisions, data models, animation specs, and component requirements. No ambiguity. No interpolation required.

---

## PROMPT START

---

You are a senior full-stack frontend engineer with a speciality in cinematic, high-performance landing pages. You will build the complete **MacroView Digital** one-page marketing website from scratch.

Do not ask clarifying questions. Do not propose alternatives. Execute the full spec below exactly as written.

---

### PROJECT CONTEXT

**Client:** MacroView Digital — a content production and video editing studio for creators and personal brands.
**Stack:** Vite 5 + React 18 + TypeScript 5.8 + Tailwind CSS 3.4 + GSAP/ScrollTrigger
**Route:** Single-page app. One route: `/` → `src/pages/Index.tsx`
**Contact:** MacroViewDigital@gmail.com
**Booking CTA:** Gmail compose URL: `https://mail.google.com/mail/?view=cm&to=MacroViewDigital@gmail.com&su=Book%20a%20Call%20%E2%80%94%20MacroView%20Digital`

---

### AESTHETIC DIRECTION

**Theme:** Cinematic Editorial Dark  
**Feel:** High-end broadcast control room meets editorial magazine. Dark, atmospheric, precise, powerful. Not generic SaaS. Not purple gradients. Not Inter font. This is a premium studio.

**The signature feeling:** When a visitor lands, they feel like they've walked into an expensive post-production facility — everything is black and deep navy, instruments and grids are faintly visible, a blue glow pulses in the corner, and every motion is deliberate.

---

### DESIGN TOKENS (implement as CSS custom properties on `:root`)

```css
:root {
  --black:        #060608;
  --deep:         #0b0c10;
  --surface:      #111318;
  --surface-2:    #161820;
  --border:       #1e2028;
  --border-glow:  #2a2d3a;
  --muted:        #3a3d4a;
  --dim:          #6b6f7e;
  --text:         #c8cad4;
  --white:        #eeeef2;
  --blue:         #4f8cff;
  --blue-dim:     #2d5acc;
  --blue-glow:    rgba(79,140,255,0.18);
  --blue-fog:     rgba(79,140,255,0.06);
  --cyan:         #00d4ff;
  --cyan-glow:    rgba(0,212,255,0.15);
  --ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1);
  --ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

### TYPOGRAPHY (Google Fonts — load in index.html)

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

**Rules:**
- `Bebas Neue` — ALL section headlines, stat numbers, logo. Never body text.
- `DM Sans 300/400` — ALL body copy, descriptions, paragraph text.
- `Space Mono 400` — ALL labels, tags, nav links, metadata, button text, counters.
- Letter-spacing on Bebas Neue: max `0.08em`.
- Display size scale: `clamp(64px, 8vw, 112px)` for primary headlines.
- Body font-size: 14–16px. Line-height: 1.65–1.75.

---

### PAGE STRUCTURE

Build the following structure in `src/pages/Index.tsx`:

```
<Loader />
<Navbar />
<ScrollDots />
<CustomCursor />         ← desktop only
<GrainOverlay />         ← fixed, full-screen, z-index: 9990

<div id="snap-root">     ← height: 100vh, overflow-y: scroll, scroll-snap-type: y mandatory
  <HeroSection />
  <CtaBand variant="intro" />
  <ProblemSection />
  <CtaBand variant="pivot" />
  <SolutionSection />
  <CtaBand variant="portfolio" />
  <PortfolioSection />
  <ResultsSection />
  <CtaBand variant="why" />
  <WhySection />
  <WhoSection />
  <CtaBand variant="faq" />
  <FaqSection />
  <BookSection />
  <Footer />
</div>
```

Every `<section>` has `scroll-snap-align: start; min-height: 100vh;`  
Every `.cta-band` has `scroll-snap-align: start; min-height: 280px;`

---

### DATA MODELS

Create `src/data/` with the following files:

**`portfolioItems.ts`**
```typescript
export const portfolioItems = [
  { id:'p1', title:'YouTube Series Edit',  category:'Long-Form',   span:'tall',     gradientFallback:'linear-gradient(135deg,#0d1828,#081220)' },
  { id:'p2', title:'Brand Reel',           category:'Reels',       span:'standard', gradientFallback:'linear-gradient(135deg,#0e0d1a,#12101e)' },
  { id:'p3', title:'Coaching Ad',          category:'Ads',         span:'standard', gradientFallback:'linear-gradient(135deg,#0a1510,#0d1a14)' },
  { id:'p4', title:'Lifestyle Documentary',category:'Short-Form',  span:'standard', gradientFallback:'linear-gradient(135deg,#1a0d0d,#120808)' },
  { id:'p5', title:'Podcast Clips Series', category:'Short-Form',  span:'standard', gradientFallback:'linear-gradient(135deg,#0f0a18,#150e22)' },
  { id:'p6', title:'Product Launch Video', category:'Ads',         span:'standard', gradientFallback:'linear-gradient(135deg,#0a0e1a,#0c1222)' },
];
```

**`caseStudies.ts`**
```typescript
export const caseStudies = [
  { id:'cs1', metric:'847K', suffix:'+', description:'Organic views in 30 days from a 12-piece short-form series.', client:'Fitness Creator · 2024' },
  { id:'cs2', metric:'4.2x',             description:'ROAS on paid video ads for a coaching client — produced and iterated in-house.', client:'Business Coach · 2024' },
  { id:'cs3', metric:'0→60K',            description:'Subscribers in 90 days. Full content strategy, long-form + daily shorts.', client:'Personal Brand · 2025' },
];
```

**`faqs.ts`** (8 items):
```typescript
export const faqs = [
  { id:'f1', q:'What types of creators do you work with?',     a:'We work with coaches, consultants, and personal brand creators already generating revenue who want to scale content output without building an in-house team.' },
  { id:'f2', q:'How long does onboarding take?',               a:'5–7 business days. We collect brand assets, run a strategy call, set the content calendar, and have first deliverables in edit within the first week.' },
  { id:'f3', q:'What is included in each package?',            a:'Raw footage intake, editing, colour grading, motion graphics, captions, thumbnail design, and one revision round. Additional services scoped separately.' },
  { id:'f4', q:'Do you handle scripting and strategy?',        a:'Yes. Our full-service tier includes content strategy, scripting, hook engineering, and distribution scheduling — not just editing.' },
  { id:'f5', q:'How do turnaround times work?',                a:'Short-form (Reels, Shorts, TikTok): 48–72 hours. Long-form YouTube: 5–7 business days. Rush delivery available.' },
  { id:'f6', q:'Do you sign NDAs or exclusivity agreements?',  a:'Yes. NDA protection on all accounts by default. Category exclusivity (one client per niche) available on our premium tier.' },
  { id:'f7', q:'What does pricing look like?',                 a:'Monthly retainers starting from a discovery call. Pricing scales with output volume, complexity, and whether strategy is included.' },
  { id:'f8', q:'What if I am not satisfied with a deliverable?', a:'Every deliverable includes one structured revision round. If the output does not meet brief after revision, we remake it.' },
];
```

**`testimonials.ts`**
```typescript
export const testimonials = [
  { id:'t1', quote:'MacroView took our raw footage and turned it into a content machine. We went from posting once a month to twice a week without adding headcount.', author:'Alex R.', role:'Business Coach' },
  { id:'t2', quote:'The difference in our before-and-after content is embarrassing. These guys understand visual storytelling at a level I have not seen from other agencies.', author:'Jordan M.', role:'Fitness Creator' },
];
```

---

### COMPONENT SPECS

#### `<Loader />`
- Full-screen fixed overlay, z-index: 9000, bg: --black
- Center: wordmark "MACROVIEW" in Bebas Neue, clamp(64px, 12vw, 160px)
- Text animation: opacity 0→1, letter-spacing 0.6em→0.15em, filter blur(20px→0), duration 1800ms, ease-in-out-expo
- Below: 200px × 1px progress bar. `::after` sweeps left to right with blue→cyan gradient. Delay 400ms, duration 1400ms.
- After 2000ms: loader fades out (opacity 0, visibility hidden, 800ms transition)

#### `<Navbar />`
- Position fixed, z-index: 800
- Default: transparent, padding 20px 48px
- Scrolled (snap-root scrollTop > 10): rgba(6,6,8,0.92), backdrop-filter blur(20px), border-bottom --border, padding 14px 48px
- Logo: "MACRO" in --white + "VIEW" in --blue, Bebas Neue 22px, ls 0.12em, href "#hero"
- Links (desktop): Problem / System / Portfolio / Results / FAQ → Space Mono 11px, --dim, UPPERCASE. Hover: --white + underline slide-in from left
- CTA: "Book a Call" → Gmail compose URL. Space Mono 11px. Bg --white, color --black. Hover: bg --blue, color --white.
- Mobile: hide nav links, keep logo + CTA

#### `<GrainOverlay />`
- Position fixed, inset: -50%, width/height 200%, pointer-events: none, z-index: 9990
- Background: SVG feTurbulence noise (fractalNoise, baseFrequency 0.75, numOctaves 4)
- Opacity: 0.028
- Animation: `grainShift` 0.12s steps(1) infinite (translate position between 4 points)

#### `<ScrollDots />`
- Fixed right: 32px, top 50% translateY(-50%), z-index: 700
- One dot per SECTIONS entry (9 dots)
- Inactive: 6×6px circle, bg --muted
- Active: 6×24px pill, bg --blue, border-radius 3px
- Transitions: height 0.3s ease-out-expo, background 0.3s ease
- Click → smooth scroll to section in snap-root
- Hidden on mobile

#### `<CustomCursor />`
- Dot: 8px circle, bg --white, mix-blend-mode difference, follows mouse exactly
- Ring: 36px circle, border 1px solid rgba(255,255,255,0.35), follows with 0.08s lag
- Hover a/button: ring → 56px, border-color --blue, transition 0.25s ease-out-quart
- Disabled on touch/mobile devices

#### `<HeroSection />`
- bg: --black, min-height: 100vh, display: flex, align-items: center
- 2-col grid: 5fr 7fr, gap 80px
- Left col:
  - Eyebrow: 40px line (--blue) + "Content Production Studio" in Space Mono
  - H1: "YOUR / CONTENT / MACHINE." — Bebas Neue clamp(64px,8vw,112px), lh 0.92
  - "MACHINE." in --blue
  - Body: "We build, edit, and produce scroll-stopping video content for creators and personal brands that want to grow — consistently."
  - CTA: Primary "Book a Discovery Call" + Outline "See Our Work" (→ #portfolio)
- Right col: decorative panel (aspect 4/5, border 1px --border)
  - Interior: --deep bg + blue grid overlay (40px grid, 0.04 opacity)
  - Bottom-right: animated blue/cyan radial orb (orbFloat 6s ease-in-out infinite)
  - Bottom-left: 3 counter chips (absolute, 70% transparent dark bg)
    - "100+" Projects | "3M+" Views | "48h" Turnaround
  - Top-right: vertical label "MVD.2025" in Space Mono, writing-mode vertical-rl
  - Top-left: live badge "● STUDIO OPEN" in --cyan

#### `<ProblemSection />`
- bg: --deep
- 2-col grid: 1fr 1fr, gap 100px
- Left: Tag "The Problem" + headline "CONTENT / IS / HARD." (--muted word "IS") + body text about the pain of inconsistent content
- Right: 4 pain point cards (border cards, staggered enter)
  - "No time to film AND edit"
  - "Posting inconsistently kills algorithms"
  - "Bad editing loses viewers in 3 seconds"
  - "Hiring in-house is expensive and slow"

#### `<SolutionSection />`
- bg: --black
- Centered header: Tag "The System" + headline "THE MVD / PRODUCTION / ENGINE."
- 3×2 service grid (1px gap, --border background = gap color):
  - 01 Short-Form Content — Reels, Shorts, TikTok
  - 02 Long-Form Editing — YouTube, podcasts, documentaries
  - 03 Ad Creative — Direct-response video ads that convert
  - 04 Brand Strategy — Content calendar, scripting, hooks
  - 05 Thumbnails + GFX — Visual identity for every upload
  - 06 Distribution — Scheduling, cross-posting, publishing
- Each card: Space Mono counter + Bebas Neue title + DM Sans description + emoji icon
- Card hover: bg lightens + blue gradient overlay fades in

#### `<PortfolioSection />`
- bg: --deep
- Header row: headline "OUR WORK." (left) + "View All Work →" ghost link (right)
- 3×2 portfolio grid, 2px gap:
  - Item 1: spans 2 rows (tall), gradient p1
  - Items 2–6: standard, gradients p2–p6
- Each item: gradient background + grid texture overlay + crosshair mark (center, 0.15 opacity)
- Hover: scale bg 1→1.05 (600ms ease-out-expo) + overlay fades in with category + title

#### `<ResultsSection />`
- bg: --black
- Centered header: Tag "Results" + headline "NUMBERS / THAT / MATTER."
- 3-col metric card grid
- Each card from caseStudies data: large metric (Bebas Neue 56px) + description + Space Mono client attribution
- Hover: border → --blue, translateY(-4px), top highlight bar appears

#### `<WhySection />`
- bg: --deep
- 2-col grid: 5fr 7fr
- Left: Tag "Why MVD" + headline "NOT JUST / AN AGENCY." + 2 body paragraphs
- Right: 5 pillar rows (vertical list, 2px gap):
  - 01 Frame-Perfect Editing
  - 02 Built for Creator Scale
  - 03 Strategy-First Approach
  - 04 Retention-Optimised Output
  - 05 Turnaround Guarantee
- Each row: [mono num] [Bebas title] [→ arrow], hover: border --blue, arrow shifts right

#### `<WhoSection />`
- bg: --black
- Centered header: Tag "Who We Work With" + headline "BUILT FOR / CREATORS / LIKE YOU."
- 4-col who-type grid (1px gap):
  - 🎙️ Coaches
  - 📚 Educators
  - 🎬 Lifestyle Creators
  - 🎧 Podcasters
- Below: 2-col testimonial cards from testimonials data
- Each testimonial: large quote mark (Bebas, 80px, decorative) + quote text + author/role attribution

#### `<FaqSection />`
- bg: --deep
- Centered header: Tag "FAQ" + headline "COMMON / QUESTIONS."
- Accordion: max-width 800px centered, from faqs data (8 items)
- CSS-only accordion via max-height technique
- Icon: "+" rotates 45deg to "×" on open, border/color → --blue

#### `<BookSection />`
- bg: --black, min-height 100vh, centered
- Large radial blue glow (800px radius, 0.07 opacity)
- Eyebrow: Space Mono "Ready when you are"
- Headline: Bebas Neue clamp(64px, 9vw, 120px) "LET'S BUILD / YOUR CONTENT / MACHINE."
- Subtext: "One call. No obligation. We will show you exactly how we would approach your content."
- CTA: Primary "Book a Discovery Call" + Outline "See Portfolio" (→ #portfolio)

#### `<CtaBand />` (all variants)
- min-height: 280px, display flex, align-items center, justify-content center, text-align center
- bg: linear-gradient(135deg, #0d1020 0%, --black 100%)
- border-top + border-bottom: 1px solid --border
- Center radial glow: rgba(79,140,255,0.08), 600px
- Headline Bebas Neue clamp(36px, 5vw, 64px)
- Single CTA button below headline

Variant content:
```
intro:     "YOUR AUDIENCE IS WATCHING." / "Start Scaling" → #solution
pivot:     "WHAT WOULD 10X MORE CONTENT DO FOR YOUR BRAND?" / "See The System" → #solution
portfolio: "YOUR NEXT VIRAL PIECE STARTS HERE." / "Book a Call" → Gmail compose
why:       "THERE IS NO SECOND TAKE IN CONTENT." / "See Why MVD" → #why
faq:       "STILL HAVE QUESTIONS?" / "Book a Call" → Gmail compose
```

---

### ANIMATION IMPLEMENTATION

#### Section reveals (IntersectionObserver)
Every section's main content wrapper gets class `snap-content`. On scroll into view (threshold 0.15, root: #snap-root):
- Toggle class `visible`
- CSS: `opacity 0 → 1, translateY(32px → 0), duration 0.8s ease-out-expo`
- Disconnect observer after first trigger

#### Stagger children
Grid items inside sections (service cards, result cards, portfolio items) get class `stagger-child`. When parent becomes visible, apply staggered transition-delay: `nth-child × 80ms`

#### Loader sequence
```
0ms:    wordmark animates (1800ms)
400ms:  progress bar sweeps (1400ms)
2000ms: loader fades out (800ms)
2200ms: body scroll enabled
```

#### Navbar scroll state
Listen to `scroll` event on `#snap-root`. Toggle `.scrolled` class on navbar when scrollTop > 10.

#### Scroll dot active state
Track which section is most visible in #snap-root. On scroll, find section whose top is closest to 0. Set matching dot to active.

---

### MOBILE RESPONSIVE RULES

- `< 768px`: single column layouts, hide `.nav-links`, hide hero visual panel, hide `#scroll-dots`, hide `#cursor` and `#cursor-ring`
- Reduce container padding to 24px
- Reduce section padding to 64px top/bottom
- Portfolio grid: 2-col (remove tall span)
- Who grid: 2-col
- Book section headline: clamp(48px, 12vw, 80px)

---

### ACCESSIBILITY

- All `<button>` elements have explicit `type` attribute
- FAQ accordion uses `<button>` inside `<dt>`
- `aria-expanded` on FAQ toggle buttons
- All interactive elements: visible focus ring (outline: 2px solid --blue, offset: 4px)
- `@media (prefers-reduced-motion: reduce)` — kill all keyframe animations, cap transitions at 0.2s
- Alt text attributes on all images (empty alt for decorative)

---

### DO NOT

- Do not use `Inter`, `Roboto`, or `Arial` anywhere
- Do not use purple color schemes or purple-on-white gradients
- Do not use `react-icons` or `lucide-react` for decorative icons — use emoji for category icons
- Do not use `height: auto` in CSS transitions — use `max-height` for accordion
- Do not animate `width`, `height`, `top`, `left`, or `margin` — only `transform` and `opacity`
- Do not use `localStorage` or `sessionStorage`
- Do not create separate CSS files — use Tailwind utilities + `src/index.css` for custom classes

---

### DELIVER

1. `src/pages/Index.tsx` — full page assembly
2. `src/components/` — all components listed above
3. `src/data/` — all data files
4. `src/hooks/useScrollDots.ts`, `useSnapObserver.ts`, `useCursor.ts`
5. `src/index.css` — snap system + keyframes + custom classes
6. Updated `index.html` — Google Fonts link

The result must be a pixel-perfect, production-ready implementation of the MacroView Digital landing page. No placeholder components. No TODO comments. No simplified versions.

---

## PROMPT END
