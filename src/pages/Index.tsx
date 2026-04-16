import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    Lenis: any;
  }
}

const services = [
  { num: "01", title: "Video Editing", desc: "Cuts that hold attention. Color that sets the mood. Pacing that turns viewers into followers." },
  { num: "02", title: "Social Media Content", desc: "Reels, Shorts, carousels, thumbnails — formatted for every platform, optimized for every algorithm." },
  { num: "03", title: "Full Content Management", desc: "Daily uploads, scheduling, strategy, and scaling. We run the pipeline so you stay in front of the camera." },
  { num: "04", title: "AI-Powered Workflows", desc: "Automated lead capture, smart content systems, and AI integrations — your content machine runs 24/7." },
];

const testimonials = [
  { quote: "MacroView rebuilt how I approach content. My average views tripled in 60 days. I stopped thinking about editing entirely — they just handle it.", name: "Alex R.", title: "Lifestyle Creator · 340K followers" },
  { quote: "They ran our entire content pipeline through a product launch. Ahead of every deadline. Zero revisions needed. I didn't think studios like this existed.", name: "Carmen D.", title: "Brand Marketing Lead" },
  { quote: "The AI workflow alone was worth the retainer. We went from posting twice a week to daily — without adding a single person to our team.", name: "Jordan T.", title: "E-commerce Founder" },
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const reelInnerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const animsInitialized = useRef(false);

  // Always start at top on mount/refresh — disable browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // Loading intro — triggers exit animation instead of instantly hiding
  useEffect(() => {
    const timer = setTimeout(() => startLoaderExit(), 2000);
    return () => clearTimeout(timer);
  }, []);

  const startLoaderExit = () => {
    const gsap = window.gsap;
    const loader = loaderRef.current;
    const wheel = wheelRef.current;
    const logo = logoRef.current;
    if (!gsap || !loader || !wheel) { setLoading(false); return; }

    // Kick hero animations immediately so logo fades in as spinner flies toward it
    if (!animsInitialized.current && window.ScrollTrigger) {
      animsInitialized.current = true;
      initAnimations();
    }

    // 1. Fade the white background out
    gsap.to(loader, { backgroundColor: "rgba(255,255,255,0)", duration: 0.55, ease: "power1.inOut" });

    // 2. Pan spinner to the aperture wheel position on the logo
    if (logo) {
      const logoRect = logo.getBoundingClientRect();
      const wheelRect = wheel.getBoundingClientRect();
      // The camera aperture sits ~72% from left, ~30% from top of the logo image
      const targetX = logoRect.left + logoRect.width * 0.72;
      const targetY = logoRect.top + logoRect.height * 0.30;
      const startX = wheelRect.left + wheelRect.width / 2;
      const startY = wheelRect.top + wheelRect.height / 2;
      const targetSize = Math.max(logoRect.width * 0.22, 28);
      gsap.to(wheel, {
        x: targetX - startX,
        y: targetY - startY,
        width: targetSize,
        height: targetSize,
        ease: "power2.inOut",
        duration: 0.72,
        delay: 0.08,
      });
    }

    // 3. Fade the spinner out as it arrives
    gsap.to(wheel, { opacity: 0, duration: 0.28, delay: 0.66 });

    // 4. Remove loader overlay after animation finishes
    gsap.delayedCall(1.05, () => setLoading(false));
  };;


  // Custom cursor with lagging ring
  useEffect(() => {
    if (loading) return;
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    const grow = () => {
      dot.style.width = '13px'; dot.style.height = '13px';
      ring.style.width = '52px'; ring.style.height = '52px';
      ring.style.borderColor = 'hsl(242 95% 62% / 0.55)';
    };
    const shrink = () => {
      dot.style.width = '8px'; dot.style.height = '8px';
      ring.style.width = '30px'; ring.style.height = '30px';
      ring.style.borderColor = '';
    };
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, [loading]);

  // Lenis smooth scroll + GSAP ScrollTrigger sync
  useEffect(() => {
    if (loading) return;
    if (!window.Lenis) return;
    const lenis = new window.Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) window.ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop: () => lenis.scroll,
      getBoundingClientRect: () => ({ top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }),
    });
    return () => lenis.destroy();
  }, [loading]);

  // Navbar hide on scroll down, show on scroll up
  useEffect(() => {
    if (loading) return;
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setNavHidden(y > last && y > 80);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading]);

  // Image lazy-load fade-in via IntersectionObserver
  useEffect(() => {
    if (loading) return;
    const imgs = document.querySelectorAll<HTMLImageElement>('img[data-lazy]');
    if (!imgs.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target as HTMLImageElement;
          img.src = img.dataset.lazy!;
          img.classList.add('img-loaded');
          io.unobserve(img);
        }
      });
    }, { rootMargin: '120px' });
    imgs.forEach(img => io.observe(img));
    return () => io.disconnect();
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    if (animsInitialized.current) return; // already started during exit animation
    const waitForGsap = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(waitForGsap);
        animsInitialized.current = true;
        initAnimations();
      }
    }, 100);
    return () => clearInterval(waitForGsap);
  }, [loading]);

  const initAnimations = () => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    gsap.fromTo(".hero-macro", { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" });
    gsap.fromTo(".hero-sub", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.9, ease: "power2.out" });
    gsap.fromTo(".hero-video-panel", { opacity: 0 }, { opacity: 1, duration: 1.6, delay: 0.1, ease: "power2.out" });

    // All fade-up sections — scrub proportional to scroll
    gsap.utils.toArray(".gsap-fade-up").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40, rotateX: 16, transformPerspective: 900 },
        {
          opacity: 1, y: 0, rotateX: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 92%", end: "top 55%", scrub: 1 },
        }
      );
    });

    // Stagger groups — timeline scrub
    document.querySelectorAll("[data-stagger]").forEach((group) => {
      const children = group.querySelectorAll("[data-stagger-child]");
      const tl = window.gsap.timeline({
        scrollTrigger: { trigger: group, start: "top 90%", end: "top 40%", scrub: 1 },
      });
      tl.fromTo(children,
        { opacity: 0, y: 28, rotateX: 20, transformPerspective: 900 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.12, ease: "none" }
      );
    });

    // Horizontal scroll reel (desktop only)
    if (window.innerWidth >= 768 && reelRef.current && reelInnerRef.current) {
      const totalScroll = reelInnerRef.current.scrollWidth - window.innerWidth;
      gsap.to(reelInnerRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: reelRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }

    // Close section stagger — scrub timeline
    const closeTl = gsap.timeline({
      scrollTrigger: { trigger: ".close-section", start: "top 80%", end: "top 20%", scrub: 1 },
    });
    closeTl.fromTo(".close-line",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, ease: "none" }
    );

    // Count-up stats — plays on enter, resets on leave so it replays every visit
    document.querySelectorAll("[data-countup]").forEach((el: any) => {
      const target = parseFloat(el.getAttribute("data-countup"));
      const suffix = target === 100 ? "%" : target === 3 ? "X" : "HR";
      el.textContent = "0" + suffix;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reset",
          onLeaveBack: () => { obj.val = 0; el.textContent = "0" + suffix; },
        },
        onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
      });
    });

    // Parallax smoke/glow orbs
    gsap.utils.toArray(".parallax-orb").forEach((orb: any) => {
      gsap.to(orb, {
        y: -80,
        ease: "none",
        scrollTrigger: { trigger: orb.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // ── Scroll progress bar ──
    const progressBar = document.getElementById('scroll-progress');
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self: any) => {
        if (progressBar) progressBar.style.width = `${self.progress * 100}%`;
      },
    });

    // ── Iso panel scroll entrances — scrub
    gsap.utils.toArray(".iso-panel").forEach((panel: any, i: number) => {
      const dirs = [
        { rx: 32, ry: -16 },
        { rx: 26, ry: 12 },
        { rx: 36, ry: -8 },
        { rx: 22, ry: 18 },
      ];
      const d = dirs[i % dirs.length];
      gsap.fromTo(panel,
        { rotateX: d.rx, rotateY: d.ry, opacity: 0, z: -40, transformPerspective: 1400 },
        {
          rotateX: 0, rotateY: 0, opacity: 1, z: 0, ease: "none",
          scrollTrigger: { trigger: panel, start: "top 92%", end: "top 52%", scrub: 1 },
        }
      );
    });

    // ── Testimonial cards — scrub timeline drop
    const testiContainer = document.querySelector('.testi-iso-container');
    const testiTl = gsap.timeline({
      scrollTrigger: { trigger: testiContainer, start: "top 85%", end: "top 30%", scrub: 1 },
    });
    document.querySelectorAll('.testi-iso').forEach((card: any, i: number) => {
      const drops = [
        { y: -70, rotation: -7, rotateY: -14 },
        { y: -90, rotation: 0, rotateY: 0 },
        { y: -70, rotation: 7, rotateY: 14 },
      ];
      const d = drops[i % 3];
      testiTl.fromTo(card,
        { y: d.y, rotation: d.rotation, rotateY: d.rotateY, opacity: 0, scale: 0.88, transformPerspective: 1000 },
        { y: 0, rotation: 0, rotateY: 0, opacity: 1, scale: 1, ease: "none" },
        i * 0.12
      );
    });

    // ── Hero wordmark — continuous mouse parallax tilt ──
    const heroTarget = document.querySelector('.hero-iso-target') as HTMLElement;
    if (heroTarget) {
      window.addEventListener('mousemove', (e: MouseEvent) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        gsap.to(heroTarget, {
          rotateY: ((e.clientX - cx) / cx) * 8,
          rotateX: ((cy - e.clientY) / cy) * 5,
          transformPerspective: 1200,
          duration: 0.9,
          ease: "power1.out",
        });
      });
    }

    // ── Problem section — each element animates independently on scroll ──
    gsap.utils.toArray(".prob-pan").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, x: -70 },
        {
          opacity: 1, x: 0, ease: "none",
          scrollTrigger: { trigger: el, start: "top 92%", end: "top 62%", scrub: 1 },
        }
      );
    });

    // ── Who This Is For — top-to-bottom cascade, scrub timeline ──
    const whoTl = gsap.timeline({
      scrollTrigger: { trigger: ".who-list", start: "top 88%", end: "top 25%", scrub: 1 },
    });
    gsap.utils.toArray(".who-item").forEach((el: any, i: number) => {
      whoTl.fromTo(el, { opacity: 0, y: -24 }, { opacity: 1, y: 0, ease: "none" }, i * 0.15);
    });
    whoTl.fromTo(".who-closing", { opacity: 0, y: -20 }, { opacity: 1, y: 0, ease: "none" }, ">");

    // ── Magnetic pull on nav links ──
    document.querySelectorAll<HTMLElement>('.nav-link').forEach(el => {
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) * 0.22;
        const dy = (e.clientY - rect.top - rect.height / 2) * 0.22;
        gsap.to(el, { x: dx, y: dy, duration: 0.35, ease: "power2.out" });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      });
    });
  };

  return (
    <div className="overflow-x-hidden">
      {/* Loader overlay — stays in DOM until exit animation completes */}
      {loading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ backgroundColor: "#ffffff" }}
        >
          <img
            ref={wheelRef}
            src="/spining-wheel.png"
            alt=""
            className="loader-wheel"
            style={{ width: 96, height: 96, objectFit: "contain", position: "relative", filter: "invert(1)" }}
          />
        </div>
      )}
      {/* Scroll progress bar */}
      <div id="scroll-progress" />
      {/* Custom cursor */}
      <div id="cursor-dot" />
      <div id="cursor-ring" />

      {/* ── Top Nav Bar ── */}
      <nav className={`nav-bar fixed top-0 left-0 right-0 z-[9990] flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 transition-transform duration-400 ${navHidden ? "-translate-y-full" : "translate-y-0"}`}>
        <span className="nav-logo-img font-bold text-foreground select-none" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(0.75rem, 1.1vw, 0.9rem)", letterSpacing: "-0.06em", lineHeight: 1 }}>Macro View Digital</span>
        <button
          aria-label="Toggle menu"
          className="nav-menu-btn relative z-[9992] flex flex-col gap-[5px] p-2 group"
          onClick={() => setNavOpen(o => !o)}
        >
          <span className={`nav-bar-line block h-[1.5px] bg-foreground transition-all duration-300 origin-center ${navOpen ? "w-6 rotate-45 translate-y-[6.5px]" : "w-6"}`} />
          <span className={`nav-bar-line block h-[1.5px] bg-foreground transition-all duration-300 ${navOpen ? "w-0 opacity-0" : "w-4 group-hover:w-6"}`} />
          <span className={`nav-bar-line block h-[1.5px] bg-foreground transition-all duration-300 origin-center ${navOpen ? "w-6 -rotate-45 -translate-y-[6.5px]" : "w-6"}`} />
        </button>
      </nav>

      {/* ── Slide-out Nav Drawer ── */}
      <div
        className={`nav-drawer fixed top-0 right-0 bottom-0 z-[9991] flex flex-col justify-end pb-20 px-12 transition-all duration-500 ${navOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        style={{ width: "min(420px, 90vw)", background: "#ffffff", borderLeft: "1px solid rgba(0,0,0,0.10)", color: "#111111" }}
      >
        {/* Backdrop close */}
        <div
          className={`fixed inset-0 z-[-1] transition-opacity duration-500 ${navOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{ background: "hsl(0 0% 0% / 0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => setNavOpen(false)}
        />
        <nav className="flex flex-col gap-2">
          {[
            { label: "Home", href: "#" },
            { label: "The Problem", href: "#solution" },
            { label: "The Solution", href: "#solution" },
            { label: "Why MacroView", href: "#solution" },
            { label: "Clients & Partners", href: "#book" },
            { label: "Results", href: "#book" },
            { label: "Work & Projects", href: "#book" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={() => setNavOpen(false)}
              className="nav-link font-syne font-bold transition-colors duration-200 py-3 border-b block uppercase"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#111111", borderBottomColor: "rgba(0,0,0,0.08)", transitionDelay: navOpen ? `${i * 55}ms` : "0ms", transform: navOpen ? "translateX(0)" : "translateX(24px)", opacity: navOpen ? 1 : 0, transition: `color 0.2s, transform 0.4s ${i * 55}ms, opacity 0.4s ${i * 55}ms` }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          onClick={() => setNavOpen(false)}
          className="mt-10 font-syne font-bold text-sm tracking-wide underline underline-offset-4 transition-opacity hover:opacity-60"
          style={{ color: "#111111" }}
        >
          Book a Call
        </a>
        <p className="text-xs tracking-[0.2em] uppercase mt-6 font-light" style={{ color: "#111111" }}>hello@macroview.studio</p>
      </div>

      {/* §01 — Hero */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Atmospheric glow */}
        <div className="glow-hero" />
        <div className="smoke-drift parallax-orb" style={{ top: "10%", left: "5%", width: 500, height: 500, background: "radial-gradient(circle, hsl(242 95% 40% / 0.12), transparent 70%)" }} />

        {/* ── Full-screen background video ── */}
        <div className="hero-video-panel absolute inset-0 opacity-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/bg-video-landing.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Left-to-transparent readability gradient */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(0 0% 4% / 0.92) 0%, hsl(0 0% 4% / 0.62) 52%, transparent 82%)" }}
        />

        {/* ── Text overlay ── */}
        <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 sm:px-10 lg:px-16 py-28 sm:py-20 lg:py-0 lg:max-w-[52%]">
          <div
            className="hero-iso-target relative z-0 flex flex-col"
            style={{ transformStyle: "preserve-3d", marginTop: "-20%" }}
          >
            {/* Soft glow backdrop behind logo + tagline */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: "-40px -60px",
                background: "radial-gradient(ellipse at 38% 50%, rgba(255,255,255,0.10) 0%, transparent 72%)",
                filter: "blur(28px)",
                zIndex: -1,
              }}
            />


          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
          <button
            onClick={() => {
              const el = document.getElementById('problem');
              if (el) el.scrollIntoView({ behavior: 'instant' });
            }}
            className="animate-bounce-slow text-muted-foreground flex flex-col items-center gap-1 cursor-pointer hover:text-foreground transition-colors"
            aria-label="Scroll to next section"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase font-light">Scroll Down</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
          </button>
        </div>
      </section>

      {/* §03 — The Problem */}
      <section id="problem" className="relative max-w-6xl mx-auto px-6 py-28 md:py-36 scroll-snap-section">
        <div className="smoke-drift parallax-orb" style={{ top: "-20%", right: "-15%", width: 500, height: 500, background: "radial-gradient(circle, hsl(242 95% 35% / 0.1), transparent 70%)" }} />

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center">

          {/* Left — copy */}
          <div>
            <p className="prob-pan text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6 font-light">/ THE PROBLEM</p>
            <h2 className="prob-pan font-syne font-bold text-foreground mb-12" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              Great content doesn't post itself.
            </h2>
            <div className="space-y-6">
              {[
                "You're spending more time editing than creating.",
                "Your posting is inconsistent. The algorithm punishes you for it.",
                "You have the ideas. You don't have the system.",
              ].map((line, i) => (
                <p key={i} className="prob-pan border-l-2 border-primary pl-5 text-muted-foreground font-light italic" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)", lineHeight: 1.8 }}>
                  {line}
                </p>
              ))}
            </div>
            <p className="prob-pan text-foreground mt-10 font-semibold" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)" }}>
              That's exactly what MacroView was built to fix.
            </p>
          </div>

          {/* Right — stack image */}
          <div className="prob-pan hidden md:flex items-center justify-center">
            <img
              src="/group-icons.png"
              alt=""
              className="w-full max-w-sm object-contain"
              draggable={false}
            />
          </div>

        </div>
      </section>

      <hr className="iso-divider" />

      {/* §04 — The Solution */}
      <section id="solution" className="relative">
        {/* Header — outside the pin so it's always visible as user approaches */}
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-10">
          <p className="gsap-fade-up text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6 font-light">/ THE SOLUTION</p>
          <h2 className="gsap-fade-up font-syne font-bold text-foreground mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            One studio. Full pipeline. Zero bottlenecks.
          </h2>
          <p className="gsap-fade-up text-muted-foreground font-light" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)" }}>
            Everything above. One team. One retainer.
          </p>
        </div>
        {/* Desktop horizontal reel — pinned, fills exactly one viewport */}
        <div ref={reelRef} className="hidden md:block relative" style={{ height: "100vh" }}>
          <div ref={reelInnerRef} className="flex gap-8 pl-8 pr-[20vw] h-full items-center">
            {services.map((s, i) => (
              <div
                key={s.num}
                className={`group flex-shrink-0 relative rounded-xl overflow-hidden ${i % 2 === 0 ? "card-3d" : "card-3d card-3d-alt"}`}
                style={{ width: "80vw", height: "82vh", background: "hsl(var(--card))" }}
              >
                {/* Number — top-left watermark */}
                <span
                  className="absolute top-5 left-7 font-syne font-bold z-10 select-none"
                  style={{ fontSize: '2.2rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1 }}
                >
                  {s.num}
                </span>

                {/* Media placeholder — fills card leaving ~110px footer */}
                <div
                  className="absolute left-0 right-0 top-0 flex flex-col items-center justify-center gap-3"
                  style={{ bottom: 110, background: 'hsl(0 0% 7%)' }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'hsl(242 95% 29% / 0.14)', border: '1px solid hsl(242 95% 60% / 0.22)' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="hsl(242 95% 70%)" strokeWidth="1.5">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                  <p className="text-xs tracking-[0.26em] uppercase font-light" style={{ color: 'hsl(var(--muted-foreground) / 0.45)' }}>Video / GIF Placeholder</p>
                  <p className="text-xs font-light" style={{ color: 'hsl(var(--muted-foreground) / 0.22)' }}>{s.title} · Preview</p>
                </div>

                {/* Footer title strip */}
                <div
                  className="absolute bottom-0 left-0 right-0 flex flex-col justify-center px-7"
                  style={{ height: 110, background: 'hsl(var(--card))' }}
                >
                  <h3 className="font-syne font-bold text-foreground" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', marginBottom: 4 }}>
                    {s.title}
                  </h3>
                  <p className="font-light text-muted-foreground" style={{ fontSize: '0.78rem', lineHeight: 1.6, maxWidth: '72ch' }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile stacked cards */}
        <div className="md:hidden px-6 space-y-6 pb-12" data-stagger>
          {services.map((s, i) => (
            <div key={s.num} data-stagger-child className={`group opacity-0 relative rounded-xl overflow-hidden p-6 card-3d ${i % 2 !== 0 ? "card-3d-alt" : ""}`} style={{ background: "hsl(var(--card))", minHeight: 280 }}>
              <span className="font-syne font-bold text-primary/20 text-5xl absolute top-4 left-6">{s.num}</span>
              <div
                className="mt-12 mb-4 rounded-lg flex flex-col items-center justify-center gap-2"
                style={{ height: 130, border: "1.5px dashed hsl(var(--muted-foreground) / 0.14)", background: "hsl(0 0% 6%)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(242 95% 70%)" strokeWidth="1.5">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
                <p className="text-[10px] tracking-[0.22em] uppercase font-light" style={{ color: "hsl(var(--muted-foreground) / 0.4)" }}>Video / GIF Placeholder</p>
              </div>
              <h3 className="font-syne font-bold text-foreground text-xl mb-2">{s.title}</h3>
              <p className="text-muted-foreground font-light text-sm" style={{ lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* §05 — Proof Block */}
      <section className="grain-dark relative bg-primary py-24 md:py-32 overflow-hidden">
        {/* Atmospheric smoke on proof */}
        <div className="smoke-drift-alt" style={{ top: "-30%", left: "20%", width: 600, height: 600, background: "radial-gradient(circle, hsl(242 95% 60% / 0.12), transparent 70%)" }} />
        <div className="smoke-drift" style={{ bottom: "-20%", right: "10%", width: 400, height: 400, background: "radial-gradient(circle, hsl(240 100% 80% / 0.08), transparent 70%)" }} />

        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
          {[
            { val: "48", label: "Average delivery turnaround", attr: "48" },
            { val: "3", label: "Average client content growth", attr: "3" },
            { val: "100", label: "Revision commitment, every time", attr: "100" },
          ].map((stat, i) => (
            <div key={i} className="flex-1 text-center px-6 py-8">
              <p data-countup={stat.attr} className="font-syne font-extrabold text-primary-foreground" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
                {stat.attr === "48" ? "0HR" : stat.attr === "3" ? "0X" : "0%"}
              </p>
              <p className="text-primary-foreground/70 font-light text-sm mt-2 max-w-[200px] mx-auto">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-primary-foreground font-semibold text-sm mt-12 opacity-90 relative z-10 tracking-wide">
          These aren't promises. They're our average.
        </p>
      </section>

      {/* §06 — Why MacroView */}
      <section className="relative py-20 md:py-28">
          <div className="smoke-drift parallax-orb" style={{ top: "20%", left: "-20%", width: 500, height: 500, background: "radial-gradient(circle, hsl(242 95% 35% / 0.08), transparent 70%)" }} />
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-xs tracking-[0.3em] uppercase mb-6 font-light text-muted-foreground">/ WHY MACROVIEW</p>
            <h2
              className="font-syne font-bold mb-8 text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              We built what we wish existed.
            </h2>
            <div className="border-l-2 border-primary pl-6">
              <p
                className="font-light max-w-2xl text-muted-foreground"
                style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)", lineHeight: 1.9 }}
              >
                MacroView started with a single reel. We refined it, shipped it, and watched what happened when content was done right. Then we built the system around it — script to screen, daily uploads, AI workflows, social scaling. A full creative studio run by a small team that cares about one thing: your growth.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-10" data-stagger>
              {["2022 — First Reel", "2023 — Full Pipeline", "2024 — AI Integrated"].map((m, i) => (
                <button
                  key={i}
                  data-stagger-child
                  onClick={() => setVideoModal(m)}
                  className="opacity-0 btn-glass text-xs tracking-[0.15em] rounded-full px-4 py-2 font-light flex items-center gap-2 group"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="opacity-60 group-hover:opacity-100 transition-opacity">
                    <path d="M2 1.5l6 3.5-6 3.5z" />
                  </svg>
                  {m}
                </button>
              ))}
            </div>
          </div>
      </section>



        {/* §07 — Who This Is For */}
        <section className="max-w-4xl mx-auto px-6 pt-24 md:pt-32 pb-16 md:pb-24">
          <p className="gsap-fade-up text-xs tracking-[0.3em] uppercase mb-6 font-light text-muted-foreground">/ WHO WE WORK WITH</p>
          <h2 className="gsap-fade-up font-syne font-bold mb-12 text-foreground" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)" }}>
            MacroView is for creators who are done playing small.
          </h2>
          <div className="space-y-5 who-list">
            {[
              "Content creators & influencers scaling their personal brand",
              "Businesses building a consistent content presence online",
              "Founders who want content running without touching it daily",
              "Organizations ready to invest in long-term content growth",
            ].map((line, i) => (
              <p key={i} className="who-item opacity-0 border-l-2 border-primary pl-5 font-light text-foreground" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)", lineHeight: 1.8 }}>
                {line}
              </p>
            ))}
          </div>
          <p className="who-closing opacity-0 font-light text-sm mt-10 text-muted-foreground">
            If you're looking for the cheapest option, we're probably not the right fit. If you want results, let's talk.
          </p>
        </section>

        {/* §08 — Client Results */}
        <section className="relative max-w-5xl mx-auto px-6 pb-20 md:pb-28">
          <div className="smoke-drift-alt parallax-orb" style={{ top: "10%", right: "-10%", width: 400, height: 400, background: "radial-gradient(circle, hsl(242 95% 45% / 0.06), transparent 70%)" }} />

          <p className="gsap-fade-up text-xs tracking-[0.3em] uppercase mb-6 font-light text-muted-foreground">/ CLIENT RESULTS</p>
          <h2 className="gsap-fade-up font-syne font-bold mb-12 text-foreground" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Don't take our word for it.
          </h2>
          <div className="testi-iso-container grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => {
              return (
                <div
                  key={i}
                  className={`testi-iso rounded-2xl p-6 md:p-8 relative ${i % 2 !== 0 ? "card-3d-alt" : "card-3d"}`}
                  style={{ background: "hsl(var(--card))" }}
                >
                  <p className="font-light mb-6" style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(255,255,255,0.88)" }}>
                    "{t.quote}"
                  </p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-xs tracking-[0.15em] font-semibold" style={{ color: "white" }}>{t.name}</p>
                    <p className="text-xs tracking-[0.1em] opacity-70" style={{ color: "rgba(255,255,255,0.8)" }}>{t.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>



      {/* §09 — Work Tiles */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <p className="gsap-fade-up text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6 font-light">/ WORK</p>
          <h2 className="gsap-fade-up font-syne font-bold text-foreground" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            A few frames from the reel.
          </h2>
        </div>
        {[false, true].map((reverse, rowIdx) => (
          <div key={rowIdx} className="mb-4 overflow-hidden">
            <div className={reverse ? "animate-marquee-right" : "animate-marquee-left"} style={{ display: "flex", width: "max-content" }}>
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="tile-3d flex-shrink-0 rounded-lg flex items-center justify-center mx-2 border border-transparent hover:border-primary transition-colors group"
                  style={{ width: 280, height: 180, background: "hsl(0 0% 12%)" }}
                >
                  <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase group-hover:text-foreground transition-colors">PROJECT PLACEHOLDER</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* §10 — The Close */}
      <section id="book" className="close-section relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden" style={{ background: "rgb(21,21,21)" }}>
        {/* Atmospheric glow */}
        <div className="glow-orb parallax-orb" style={{ top: "20%", left: "30%", width: 600, height: 600, background: "radial-gradient(circle, hsl(242 95% 35% / 0.12), transparent 70%)", filter: "blur(100px)" }} />
        <div className="smoke-drift-alt" style={{ bottom: "10%", right: "20%", width: 400, height: 400, background: "radial-gradient(circle, hsl(242 95% 50% / 0.06), transparent 70%)" }} />

        <div className="mb-8 relative z-10">
          <p className="close-line opacity-0 font-syne font-extrabold text-foreground leading-tight" style={{ fontSize: "clamp(1.6rem, 5.6vw, 4rem)" }}>Your content should be</p>
          <p className="close-line opacity-0 font-syne font-extrabold text-foreground leading-tight" style={{ fontSize: "clamp(1.6rem, 5.6vw, 4rem)" }}>working harder</p>
          <p className="close-line opacity-0 font-syne font-extrabold text-foreground leading-tight" style={{ fontSize: "clamp(1.6rem, 5.6vw, 4rem)" }}>than you are.</p>
        </div>
        <p className="gsap-fade-up text-muted-foreground font-light max-w-xl mb-4 relative z-10" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.1rem)", lineHeight: 1.8 }}>
          MacroView handles the full pipeline — editing, strategy, uploads, AI systems — so you can focus on what only you can do.
        </p>
        <p className="gsap-fade-up text-foreground font-light max-w-md mb-10 relative z-10" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)" }}>
          Spots are limited. We work with a select number of clients each month.
        </p>
        <a href="#book" className="gsap-fade-up bg-primary text-primary-foreground font-syne font-bold rounded-full px-8 sm:px-12 py-4 text-base sm:text-lg tracking-wide hover:brightness-125 hover:scale-[1.02] transition-all shadow-lg relative z-10">
          Book Your Free Strategy Call →
        </a>
        <p className="gsap-fade-up text-muted-foreground font-light text-sm mt-6 relative z-10">
          No commitment. 30 minutes. Walk away with a content plan.
        </p>
        <div className="gsap-fade-up flex flex-col items-center gap-3 mt-10 text-muted-foreground text-sm font-light relative z-10">
          <span>hello@macroview.studio</span>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-foreground transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-foreground transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
            </a>
          </div>
        </div>
      </section>



      {/* Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={() => setVideoModal(null)}
        >
          <div
            className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden"
            style={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(var(--border) / 0.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setVideoModal(null)}
              aria-label="Close"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video flex flex-col items-center justify-center" style={{ background: "hsl(0 0% 7%)" }}>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-primary/40"
                style={{ background: "hsl(242 95% 29% / 0.12)" }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="hsl(242 95% 70%)" stroke="none">
                  <path d="M8 5.14v14.72L19 12z" />
                </svg>
              </div>
              <p className="font-syne font-bold text-foreground text-lg mb-1">{videoModal}</p>
              <p className="text-muted-foreground text-sm font-light tracking-wide">Video coming soon</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
