# transition.md — MacroView Digital Motion & Animation System
> **Philosophy:** Motion should feel like a premium broadcast edit — purposeful cuts, precise timing, no decorative noise. Every animation either communicates hierarchy, confirms interaction, or builds atmosphere.

---

## 01 · EASING LIBRARY

```css
/* ─── CORE EASINGS ───────────────────────────────── */
--ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);      /* Primary: fast out, long tail */
--ease-in-expo:     cubic-bezier(0.7, 0, 0.84, 0);      /* Entry from zero (rare) */
--ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);     /* Symmetrical punchy */
--ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1);      /* UI feedback, snappy */
--ease-linear:      linear;                              /* Loops, grain, progress bars */
--ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1);  /* Micro-interactions with overshoot */

/* GSAP equivalent */
// ease-out-expo → Power4.easeOut
// ease-spring   → Back.easeOut (default overshoot)
```

**When to use what:**
| Easing | Use case |
|---|---|
| `--ease-out-expo` | All page transitions, section reveals, card enters |
| `--ease-out-quart` | Hover states, button feedback, nav transitions |
| `--ease-spring` | Cursor ring, dot navigation, small interactive pops |
| `--ease-in-out-expo` | Loader sequence, overlay fades |
| `--ease-linear` | Loops: grain, pulse, scanlines |

---

## 02 · TIMING SCALE

```
Instant:     0ms        — No transition (state-only changes)
Micro:       80–120ms   — Cursor tracking, color swaps on hover
Fast:        150–200ms  — Button color, border color, opacity
Standard:    250–350ms  — Card hover effects, FAQ icon rotation
Medium:      400–500ms  — FAQ panel expand, nav background blur
Slow:        600–800ms  — Section content reveals, portfolio hover scale
Epic:        1000–1800ms — Loader wordmark, page-load sequences
Loop:        varies     — Grain (120ms steps), orb (6s), pulse (1.4s)
```

---

## 03 · LOADER SEQUENCE

**Total duration: ~2200ms from page load**

```
Timeline:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  0ms ──────┤ WORDMARK ENTERS
            │  from: { opacity:0, letterSpacing:'0.6em', filter:'blur(20px)' }
            │  to:   { opacity:1, letterSpacing:'0.15em', filter:'blur(0)' }
            │  duration: 1800ms | ease: ease-in-out-expo
            │
  400ms ────┤ PROGRESS BAR SWEEPS
            │  from: { left: '-100%' }
            │  to:   { left: '100%' }
            │  duration: 1400ms | ease: ease-out-expo
            │
  2000ms ───┤ LOADER FADES OUT
            │  from: { opacity:1, visibility:'visible' }
            │  to:   { opacity:0, visibility:'hidden' }
            │  duration: 800ms | ease: ease-in-out-expo
            │
  2200ms ───┤ BODY UNLOCKED → SECTIONS BECOME OBSERVABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**CSS keyframes:**
```css
@keyframes wordGlow {
  0%   { opacity: 0; letter-spacing: 0.6em; filter: blur(20px); }
  100% { opacity: 1; letter-spacing: 0.15em; filter: blur(0); }
}

@keyframes loadBar {
  from { left: -100%; }
  to   { left:  100%; }
}
```

---

## 04 · NAVBAR TRANSITION

```
Trigger: snap-root scrollTop > 10px

Properties animated:
  background:    transparent → rgba(6,6,8,0.92)
  backdrop-filter: blur(0) → blur(20px)
  border-bottom: 1px solid transparent → 1px solid var(--border)
  padding-top/bottom: 20px → 14px

Duration: 400ms | ease: ease-out-quart
Implementation: scroll event listener on snap-root
```

---

## 05 · SECTION CONTENT REVEAL (SNAP ENTER)

**Trigger:** IntersectionObserver, threshold: 0.15  
**Target:** `.snap-content` inside each section

```css
/* Default (hidden) state */
.snap-content {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity  0.8s var(--ease-out-expo),
    transform 0.8s var(--ease-out-expo);
}

/* Entered state (class toggled by observer) */
.snap-content.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Staggered children** (pain list, service grid, results grid):
```css
.stagger-child {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity  0.6s var(--ease-out-expo),
    transform 0.6s var(--ease-out-expo);
}
/* delay applied via nth-child or inline style */
.stagger-child:nth-child(1) { transition-delay: 0ms;   }
.stagger-child:nth-child(2) { transition-delay: 80ms;  }
.stagger-child:nth-child(3) { transition-delay: 160ms; }
.stagger-child:nth-child(4) { transition-delay: 240ms; }
.stagger-child:nth-child(5) { transition-delay: 320ms; }
.stagger-child:nth-child(6) { transition-delay: 400ms; }
.stagger-child.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 06 · SCROLL DOT TRANSITIONS

```
Inactive dot:  6px × 6px, border-radius: 50%, bg: --muted
Active dot:    6px × 24px, border-radius: 3px, bg: --blue

Transition properties:
  height:           0.3s var(--ease-out-expo)
  background-color: 0.3s ease
  border-radius:    0.3s ease

Trigger: active section changes (tracked via scroll position in snap-root)
```

---

## 07 · CUSTOM CURSOR MOTION

```
Dot (#cursor-dot):
  Follows mousemove EXACTLY (no delay)
  Size: 8px default
  Hover over interactive: no size change (blend mode handles visual)
  
Ring (#cursor-ring):
  Follows mousemove with 80ms linear lag
  Implementation: lerp approach or CSS transition: transform 0.08s linear
  
  Default: 36px, border: 1px solid rgba(255,255,255,0.35)
  
  Hover (a, button, [data-cursor="expand"]):
    width: 56px | height: 56px
    border-color: var(--blue)
    transition: width 0.25s ease-out-quart, height 0.25s ease-out-quart, border-color 0.25s ease
  
  Click (mousedown):
    scale: 0.85
    transition: transform 0.1s ease
  
  Release (mouseup):
    scale: 1
    transition: transform 0.2s var(--ease-spring)
```

---

## 08 · CARD HOVER TRANSITIONS

### Surface Card (Services)
```
background:          --surface → #13151c          | 300ms ease
border-color:        --border → --border-glow     | 300ms ease
::before opacity:    0 → 1 (blue gradient overlay)| 400ms ease
```

### Metric Card (Results)
```
border-color:    --border → --blue                | 300ms ease
transform:       translateY(0) → translateY(-4px) | 300ms ease-out-quart
::after opacity: 0 → 1 (top highlight bar)        | 300ms ease
```

### Portfolio Item
```
.portfolio-item-bg transform: scale(1) → scale(1.05) | 600ms ease-out-expo
.portfolio-overlay opacity: 0 → 1                   | 400ms ease
```

### Pillar Row (Why Section)
```
background:   --surface → #13151c        | 300ms ease
border-color: --border → --blue          | 300ms ease
.pillar-arrow color: --muted → --blue    | 300ms ease
.pillar-arrow transform: translateX(0) → translateX(4px) | 300ms ease-out-quart
```

### Who Card
```
background: --surface → #13151c | 300ms ease
```

### Nav Links
```
color: --dim → --white | 200ms ease
::after width: 0 → 100% (underline) | 300ms ease-out-expo
```

---

## 09 · FAQ ACCORDION

```
Icon rotation:
  default: rotate(0deg)    = "+"
  open:    rotate(45deg)   = "×"
  transition: transform 0.3s ease-out-quart

Icon color:
  default: --dim
  open: --blue
  border-color (open): --blue
  transition: color 0.3s ease, border-color 0.3s ease

Answer panel:
  default: max-height: 0px, padding-bottom: 0px, overflow: hidden
  open:    max-height: 200px, padding-bottom: 24px
  transition: max-height 0.4s var(--ease-out-expo), padding 0.3s ease
  
  Note: Use max-height technique (not height: auto) for CSS-only.
  If using React, can use height with ResizeObserver for exact animation.
```

---

## 10 · ATMOSPHERIC LOOPS

### Film Grain
```css
@keyframes grainShift {
  0%   { transform: translate(0,    0);    }
  25%  { transform: translate(-2%, -3%);   }
  50%  { transform: translate( 3%,  2%);   }
  75%  { transform: translate(-1%,  4%);   }
  100% { transform: translate( 2%, -1%);   }
}
/* animation: grainShift 0.12s steps(1) infinite */
/* steps(1): no interpolation between frames = film grain feel */
```

### Blue Orb Float
```css
@keyframes orbFloat {
  0%,100% { transform: translate(0, 0) scale(1);          }
  50%     { transform: translate(-8px, -12px) scale(1.04); }
}
/* animation: orbFloat 6s ease-in-out infinite */
```

### Live Badge Pulse
```css
@keyframes blink {
  0%, 100% { opacity: 1;   }
  50%      { opacity: 0.2; }
}
/* animation: blink 1.4s ease-in-out infinite */
```

### Scroll Dot (active state breathe — optional)
```css
@keyframes dotBreathe {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.7; }
}
/* Only apply if active dot feels too static */
```

---

## 11 · GSAP INTEGRATION (OPTIONAL ENHANCEMENT LAYER)

The base implementation runs on CSS transitions/animations only. GSAP is available for richer effects if desired.

### GSAP ScrollTrigger — Section Reveals
```javascript
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Replace IntersectionObserver with GSAP for more control
gsap.utils.toArray('.snap-content').forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 32 },
    {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        scroller: '#snap-root',
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    }
  );
});
```

### GSAP Stagger — Grid Items
```javascript
gsap.fromTo('.stagger-child',
  { opacity: 0, y: 20 },
  {
    opacity: 1, y: 0,
    duration: 0.6,
    ease: 'power4.out',
    stagger: 0.08,
    scrollTrigger: {
      trigger: '.stagger-parent',
      scroller: '#snap-root',
      start: 'top 80%',
    }
  }
);
```

### GSAP Cursor Ring Lerp
```javascript
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

gsap.ticker.add(() => {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
});
```

---

## 12 · `prefers-reduced-motion` OVERRIDES

```css
@media (prefers-reduced-motion: reduce) {
  /* Kill all keyframe animations */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
  
  /* Keep transitions but make them instant */
  .snap-content {
    transition: opacity 0.15s ease !important;
    transform: none !important;
  }
  
  /* Remove transform-based hovers */
  .result-card:hover { transform: none !important; }
  .pillar:hover .pillar-arrow { transform: none !important; }
  
  /* Keep grain but static */
  #grain { animation: none !important; }
}
```

---

## 13 · PERFORMANCE RULES

1. **Only animate `transform` and `opacity`** — never `width`, `height`, `top`, `left`, `margin`, or `padding` in hover states (triggers layout/paint).
2. **`will-change: transform`** — apply sparingly: orb, cursor elements, portfolio images only.
3. **`backface-visibility: hidden`** on 3D tilt cards to prevent subpixel flicker.
4. **Grain overlay** is `pointer-events: none` — never blocks interactions.
5. **`steps(1)` on grain** — prevents CSS from interpolating between positions (key for the film grain illusion).
6. **Loader hides with `visibility: hidden`** not `display: none` — allows fade-out transition to complete.
7. **IntersectionObserver** over scroll events for section reveals — much more performant.
8. **Disconnect observer** after element is visible (no need to keep watching).

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // ← disconnect after fire
    }
  });
}, { threshold: 0.15, root: document.querySelector('#snap-root') });
```
