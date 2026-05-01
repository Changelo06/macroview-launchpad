# design.md — MacroView Digital Design System
> **Aesthetic Direction:** Cinematic Editorial Dark — Premium broadcast studio meets high-fashion editorial. Every pixel earns its place.

---

## 01 · CONCEPT & PHILOSOPHY

MacroView Digital sits at the intersection of **creative production** and **personal brand growth**. The visual language must communicate:

- **Authority** — This is not a freelancer. This is a studio.
- **Precision** — Frame-perfect. Nothing accidental.
- **Momentum** — Motion, velocity, forward thrust.
- **Exclusivity** — Not for everyone. Built for serious creators.

**The One Unforgettable Thing:** When a visitor lands, they feel like they've entered a high-end broadcast control room — dark, atmospheric, exact, powerful.

---

## 02 · COLOR SYSTEM

```
/* ─── CORE PALETTE ─────────────────────────────── */
--black:        #060608;   /* True void base */
--deep:         #0b0c10;   /* Section alternate bg */
--surface:      #111318;   /* Card / panel bg */
--surface-2:    #161820;   /* Elevated card state */
--border:       #1e2028;   /* Structural dividers */
--border-glow:  #2a2d3a;   /* Hover border state */
--muted:        #3a3d4a;   /* Disabled / inactive */
--dim:          #6b6f7e;   /* Secondary text */
--text:         #c8cad4;   /* Body text */
--white:        #eeeef2;   /* Primary text / headings */

/* ─── ACCENT PALETTE ────────────────────────────── */
--blue:         #4f8cff;   /* Primary accent */
--blue-dim:     #2d5acc;   /* Darker blue variant */
--blue-glow:    rgba(79,140,255,0.18);
--blue-fog:     rgba(79,140,255,0.06);
--cyan:         #00d4ff;   /* Live / active indicators */
--cyan-glow:    rgba(0,212,255,0.15);

/* ─── SEMANTIC ───────────────────────────────────── */
--success:      #00c97b;
--warning:      #f5a623;
--danger:       #ff4757;
```

### Color Usage Rules

| Context | Token |
|---|---|
| Page backgrounds (alternating) | `--black` → `--deep` → `--black` |
| Card / panel backgrounds | `--surface` |
| All borders (default) | `--border` |
| Primary CTA background | `--white` |
| Primary CTA text | `--black` |
| Active accent / highlight | `--blue` |
| Live/status indicators | `--cyan` |
| Body copy | `--text` |
| Secondary / helper text | `--dim` |
| Headings | `--white` |

**Never** mix `--blue` and `--cyan` on the same element. They're distinct signals — blue = brand, cyan = live/active.

---

## 03 · TYPOGRAPHY

### Font Stack

```css
/* Display — For headlines, section titles, stat numbers */
font-family: 'Bebas Neue', sans-serif;
/* → Tall, compressed, cinematic. Non-negotiable for H1s. */

/* Body — For paragraphs, descriptions, UI labels */
font-family: 'DM Sans', sans-serif;
/* → Clean, warm, readable at small sizes. */

/* Mono — For tags, labels, counters, navigation, UI chrome */
font-family: 'Space Mono', monospace;
/* → Technical precision. Used sparingly to add credibility. */
```

### Type Scale

```
Display XL:   clamp(80px, 10vw, 140px)  / Bebas Neue / ls: 0.02em / lh: 0.88
Display L:    clamp(64px, 8vw, 112px)   / Bebas Neue / ls: 0.03em / lh: 0.90
Display M:    clamp(48px, 6vw, 80px)    / Bebas Neue / ls: 0.04em / lh: 0.92
Display S:    clamp(32px, 4vw, 48px)    / Bebas Neue / ls: 0.05em / lh: 0.95

Heading:      20–26px  / DM Sans 500    / ls: 0
Body L:       16px     / DM Sans 300    / lh: 1.75
Body M:       15px     / DM Sans 300    / lh: 1.70
Body S:       13–14px  / DM Sans 300    / lh: 1.65

Label:        11–12px  / Space Mono 400 / ls: 0.15em / UPPERCASE
Tag:          10px     / Space Mono 400 / ls: 0.20em / UPPERCASE
Micro:        9px      / Space Mono 400 / ls: 0.25em / UPPERCASE
```

### Typography Rules

1. **Never** use DM Sans for section titles — always Bebas Neue.
2. **Mono** is UI chrome only: tags, counters, nav links, timestamps, metadata.
3. **Letter-spacing** on Bebas Neue should never exceed `0.08em` — it becomes unreadable.
4. **Line height on display type** must be tight (0.88–0.95). Airy headlines kill momentum.
5. **Max line length** for body text: 65ch. Never let paragraphs span full width.

---

## 04 · SPACING & LAYOUT

### Grid System

```
Max Container Width:  1200px
Container Padding:    48px (desktop) / 24px (mobile)
Column Grid:          12-column, 24px gutter
Section Padding:      100px top/bottom (desktop) / 64px (mobile)
```

### Spacing Scale (8px base)

```
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   24px
--space-6:   32px
--space-7:   48px
--space-8:   64px
--space-9:   80px
--space-10:  100px
--space-11:  120px
--space-12:  160px
```

### Layout Principles

- **Asymmetric grids** preferred over equal columns. Typical split: `5fr 7fr` or `4fr 8fr`.
- **Bleed elements** occasionally — visuals that touch or slightly exceed container edge.
- **Section alternation** — backgrounds alternate `--black` / `--deep` to create rhythm without borders.
- **Negative space is expensive** — use it deliberately to frame hero content.
- CTA Bands are always full-bleed, 100% viewport width.

---

## 05 · COMPONENTS

### Navigation Bar

```
Height (default):   80px
Height (scrolled):  60px
Background (default): transparent
Background (scrolled): rgba(6,6,8,0.92) + backdrop-filter: blur(20px)
Border (scrolled):  1px solid --border
Logo font:          Bebas Neue, 22px, ls: 0.12em
Nav links:          Space Mono, 11px, ls: 0.12em, UPPERCASE
CTA button:         Space Mono, 11px — bg: --white, color: --black
Transition:         background 0.4s ease, padding 0.4s ease
```

### Buttons

**Primary (Solid)**
```
bg: --white | color: --black
font: Space Mono 11px | ls: 0.16em | UPPERCASE
padding: 14px 32px
border: 1px solid --white
hover → bg: --blue | color: --white | border: --blue
transition: 0.25s ease
```

**Outline**
```
bg: transparent | color: --white
font: Space Mono 11px | ls: 0.16em | UPPERCASE
padding: 14px 32px
border: 1px solid --border
hover → border: --white
transition: 0.25s ease
```

**Ghost (text)**
```
color: --dim
font: Space Mono 10px | ls: 0.15em | UPPERCASE
No border, no bg
hover → color: --blue
```

### Cards

**Surface Card** (service, feature)
```
bg: --surface
border: 1px solid --border
padding: 40px 32px
::before overlay: linear-gradient(135deg, rgba(79,140,255,0.06) 0%, transparent 60%)
  → opacity: 0 → 1 on hover
hover: bg: #13151c | border: --border-glow
transition: 0.3s ease
```

**Metric Card** (result, stat)
```
bg: --surface
border: 1px solid --border
padding: 36px 28px
Top highlight bar: ::after → gradient blue line, opacity 0 → 1 on hover
hover: border: --blue | transform: translateY(-4px)
transition: 0.3s ease
```

**Portfolio Item**
```
Aspect ratio: 4/3 (standard) or 2/1 (wide hero item)
overflow: hidden
overlay: linear-gradient(to top, rgba(6,6,8,0.95) 0%, transparent 50%)
  → opacity 0 → 1 on hover
image scale: 1 → 1.05 on hover (0.6s ease-out-expo)
```

### Tags / Labels

```
Tag (section eyebrow):
  font: Space Mono 10px | ls: 0.2em | UPPERCASE
  color: --blue
  border: 1px solid --blue-glow
  padding: 4px 12px
  bg: transparent

Live Badge:
  color: --cyan | border: rgba(0,212,255,0.2) | bg: rgba(0,212,255,0.04)
  + animated dot pulse (--cyan, 1.4s ease-in-out infinite)

Section Label (pre-heading):
  font: Space Mono 10px | ls: 0.25em | UPPERCASE
  color: --dim
  No border
```

### FAQ Accordion

```
Item border-bottom: 1px solid --border
Question button: full width, DM Sans 15px, --white, text-align: left
Icon: 24px square, border: 1px solid --border, centered "+"
  → open state: border: --blue | color: --blue | rotate(45deg) → "×"
Answer: max-height 0 → 200px, transition: 0.4s ease-out-expo
Answer font: 14px, --dim, lh: 1.7
```

### CTA Band

```
min-height: 280px
bg: linear-gradient(135deg, #0d1020 0%, --black 100%)
border-top/bottom: 1px solid --border
Center radial glow: rgba(79,140,255,0.08), 600px radius
Heading: Bebas Neue, clamp(36px, 5vw, 64px), --white
```

---

## 06 · ATMOSPHERIC EFFECTS

### Film Grain Overlay (persistent)
```css
position: fixed; inset: -50%; width: 200%; height: 200%;
SVG feTurbulence noise texture
opacity: 0.028
animation: grainShift 0.12s steps(1) infinite
/* Shifts position in 4 directions to simulate analog film grain */
```

### Blue Glow / Orb
```css
background: radial-gradient(circle,
  rgba(79,140,255,0.25) 0%,
  rgba(0,212,255,0.08) 40%,
  transparent 70%);
border-radius: 50%;
animation: orbFloat 6s ease-in-out infinite;
/* Subtle float: translate(-8px,-12px) scale(1.04) at 50% */
```

### Grid Background (hero panels)
```css
background:
  linear-gradient(rgba(79,140,255,0.04) 1px, transparent 1px),
  linear-gradient(90deg, rgba(79,140,255,0.04) 1px, transparent 1px);
background-size: 40px 40px;
```

### Scanline / Loading Bar
```css
/* Progress bar: 200px wide, 1px tall */
::after → gradient: transparent → --blue → --cyan
animation: loadBar 1.4s ease-out-expo 0.4s forwards
```

---

## 07 · SCROLL NAV DOTS

```
Position: fixed right: 32px, top: 50%, translateY(-50%)
dot (inactive): 6px × 6px, border-radius: 50%, bg: --muted
dot (active): 6px wide × 24px tall, border-radius: 3px, bg: --blue
transition: height 0.3s, background 0.3s
```

---

## 08 · CUSTOM CURSOR

```
Dot: 8px, border-radius: 50%, bg: --white, mix-blend-mode: difference
Ring: 36px, border: 1px solid rgba(255,255,255,0.35), border-radius: 50%
  → hover over link/button: 56px, border-color: --blue
Ring follows with 0.08s linear lag (not synced to dot)
```

---

## 09 · ICONOGRAPHY & DECORATION

- **No icon libraries.** Use emoji sparingly for category icons (service cards, who cards).
- **Cross/registration marks** (`+`) used as decorative positioning marks at 0.10–0.15 opacity.
- **Horizontal rule lines** (1px, --border) used to divide metadata from content.
- **Eyebrow lines** — 40px wide, 1px tall, --blue, used before hero headline.
- **Writing-mode labels** — vertical text (`writing-mode: vertical-rl`) for panel dates/codes.

---

## 10 · RESPONSIVE BREAKPOINTS

```
Desktop:  ≥1024px — full layout, custom cursor active
Tablet:   768–1023px — reduce column counts, maintain typography
Mobile:   <768px — single column, cursor disabled, snap dots hidden
```

**Mobile-specific overrides:**
- Hero visual panel hidden (`display: none`)
- All grids collapse to 1 column (except 2-col who/portfolio)
- Container padding: 24px
- Nav links hidden (hamburger or CTA-only)
- Section padding: 64px

---

## 11 · ACCESSIBILITY

- Color contrast minimum: 4.5:1 for body text (--text on --surface: ✓)
- All interactive elements have visible focus states (outline: 2px solid --blue)
- FAQ accordion uses native `<button>` elements
- `prefers-reduced-motion` media query: disable all keyframe animations, keep transitions ≤0.2s
- Alt text required on all portfolio/case study images when populated
