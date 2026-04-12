

# MacroView — High-Converting Landing Page

## Overview
Build a premium, single-page landing page for MacroView, a global remote studio editing company. The page follows a conversion-focused arc: Attention → Problem → Solution → Proof → Urgency → Action.

## Design System
- **Colors**: `#151515` (bg), `#050491` (accent/CTAs), `#64748b` (muted), `#fafafc` (text)
- **Typography**: Syne (700/800) for headings, DM Sans (300/400) for body — loaded via Google Fonts
- **Grain overlay**: SVG noise filter at 4% opacity across the page

## Sections (11 total)
1. **Hero** — Full-viewport cinematic intro. Giant "MACRO" + "VIEW" wordmark with split slide-in animation. Tagline fade-in. Two CTAs: "Book a Call" (primary) + "See What We Do" (ghost).
2. **Marquee Ticker** — Blue strip with infinite-scrolling keywords.
3. **The Problem** — Three pain points with blue left borders. Names the visitor's frustration.
4. **The Solution** — GSAP-powered horizontal scroll reel with 4 service cards (Video Editing, Social Content, Content Management, AI Workflows).
5. **Proof Block** — Full-width blue section with 3 animated stats (48HR, 3X, 100%).
6. **Origin/Trust** — Brief story paragraph + milestone pills (2022–2024).
7. **Who This Is For** — Qualification section with 4 audience lines + disqualifier.
8. **Testimonials** — 3 staggered client quote cards.
9. **Work Tiles** — Dual-direction auto-scrolling placeholder tiles.
10. **The Close** — Full-viewport closing argument with staggered headline, scarcity line, and large CTA.
11. **Footer** — Minimal row with wordmark, social icons, copyright.

## Key Interactive Elements
- **Floating CTA pill** — Fixed bottom-right, slides up after 2s, always visible
- **GSAP ScrollTrigger** animations on all section text (fade-up)
- **Horizontal scrub reel** for services (vertical stack on mobile)
- **Count-up numbers** on proof stats
- **CSS infinite scroll** marquees (ticker + work tiles)

## Technical Approach
- Built as a React page (`Index.tsx`) with all styles in Tailwind + inline CSS
- GSAP + ScrollTrigger loaded via CDN in `index.html`
- Fully responsive with `clamp()` font sizing
- Mobile: horizontal reel becomes stacked cards below 768px
- All animated elements start `opacity: 0` to prevent layout shift

## Files to Create/Modify
- `index.html` — Add GSAP CDN scripts
- `src/pages/Index.tsx` — Full landing page implementation
- `src/index.css` — Add Google Fonts imports, grain overlay, marquee animations, custom styles

