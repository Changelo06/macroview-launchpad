import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
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
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const reelRef = useRef<HTMLDivElement>(null);
  const reelInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowFloatingCta(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const waitForGsap = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(waitForGsap);
        initAnimations();
      }
    }, 100);
    return () => clearInterval(waitForGsap);
  }, []);

  const initAnimations = () => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Hero wordmark
    gsap.fromTo(".hero-macro", { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
    gsap.fromTo(".hero-view", { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
    gsap.fromTo(".hero-tagline", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });
    gsap.fromTo(".hero-sub", { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.2 });
    gsap.fromTo(".hero-buttons", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.4 });

    // All fade-up sections
    gsap.utils.toArray(".gsap-fade-up").forEach((el: any) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    });

    // Stagger groups
    document.querySelectorAll("[data-stagger]").forEach((group) => {
      const children = group.querySelectorAll("[data-stagger-child]");
      gsap.fromTo(children,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 80%" },
        }
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

    // Count-up stats
    document.querySelectorAll("[data-countup]").forEach((el: any) => {
      const target = el.getAttribute("data-countup");
      const obj = { val: 0 };
      gsap.to(obj, {
        val: parseFloat(target),
        duration: 2,
        ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: () => {
          if (target === "100") el.textContent = Math.round(obj.val) + "%";
          else if (target === "3") el.textContent = Math.round(obj.val) + "X";
          else el.textContent = Math.round(obj.val) + "HR";
        },
      });
    });

    // Close section stagger
    const closeLines = document.querySelectorAll(".close-line");
    gsap.fromTo(closeLines,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.3, ease: "power2.out",
        scrollTrigger: { trigger: ".close-section", start: "top 60%" },
      }
    );
  };

  return (
    <div className="overflow-x-hidden">
      {/* Floating CTA */}
      <a
        href="#book"
        className={`fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground font-syne font-bold px-6 py-3 rounded-full text-sm tracking-wide shadow-lg transition-all duration-500 hover:brightness-125 hover:scale-105 ${showFloatingCta ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
      >
        Book a Call →
      </a>

      {/* §01 — Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-6">
          <h1 className="font-syne font-extrabold uppercase leading-[0.9]" style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}>
            <span className="hero-macro inline-block opacity-0">MACRO</span>
            <span className="hero-view inline-block opacity-0">VIEW</span>
          </h1>
        </div>
        <p className="hero-tagline opacity-0 font-syne font-bold text-foreground mb-3" style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}>
          Scale your content. Own your market.
        </p>
        <p className="hero-sub opacity-0 text-muted-foreground font-light max-w-lg" style={{ fontSize: "clamp(0.85rem, 1.2vw, 1.1rem)" }}>
          A full-stack creative studio for content creators ready to grow.
        </p>
        <div className="hero-buttons opacity-0 flex gap-4 mt-8 flex-wrap justify-center">
          <a href="#book" className="bg-primary text-primary-foreground font-syne font-bold px-8 py-3 rounded-md text-sm tracking-wide hover:brightness-125 transition">
            Book a Call →
          </a>
          <a href="#solution" className="border border-muted-foreground/40 text-foreground font-syne font-bold px-8 py-3 rounded-md text-sm tracking-wide hover:border-foreground transition">
            See What We Do ↓
          </a>
        </div>
        <div className="absolute bottom-8 animate-bounce-slow text-muted-foreground">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* §02 — Marquee Ticker */}
      <div className="bg-primary py-3 overflow-hidden">
        <div className="animate-marquee-fast whitespace-nowrap flex">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="font-syne font-bold text-primary-foreground text-xs tracking-[0.3em] uppercase mx-4">
              SCALE YOUR CONTENT · BOOK A CALL · VIDEO EDITING · AI WORKFLOWS · FULL PRODUCTION · SOCIAL SCALING · MACROVIEW · GROW FASTER ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* §03 — The Problem */}
      <section className="max-w-4xl mx-auto px-6 py-28 md:py-36">
        <p className="gsap-fade-up text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6 font-light">/ THE PROBLEM</p>
        <h2 className="gsap-fade-up font-syne font-bold text-foreground mb-12" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
          Great content doesn't post itself.
        </h2>
        <div className="space-y-6" data-stagger>
          {[
            "You're spending more time editing than creating.",
            "Your posting is inconsistent. The algorithm punishes you for it.",
            "You have the ideas. You don't have the system.",
          ].map((line, i) => (
            <p key={i} data-stagger-child className="opacity-0 border-l-2 border-primary pl-5 text-muted-foreground font-light" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)", lineHeight: 1.8 }}>
              {line}
            </p>
          ))}
        </div>
        <p className="gsap-fade-up text-foreground mt-10 font-light" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)" }}>
          That's exactly what MacroView was built to fix.
        </p>
      </section>

      {/* §04 — The Solution */}
      <section id="solution" ref={reelRef} className="relative">
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-10">
          <p className="gsap-fade-up text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6 font-light">/ THE SOLUTION</p>
          <h2 className="gsap-fade-up font-syne font-bold text-foreground mb-8" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            One studio. Full pipeline. Zero bottlenecks.
          </h2>
        </div>
        {/* Desktop horizontal reel */}
        <div ref={reelInnerRef} className="hidden md:flex gap-8 pl-8 pr-[20vw]">
          {services.map((s) => (
            <div key={s.num} className="flex-shrink-0 relative rounded-xl overflow-hidden flex flex-col justify-end p-8" style={{ width: "80vw", height: "70vh", background: "hsl(var(--card))" }}>
              <span className="absolute top-6 left-8 font-syne font-bold text-primary/20" style={{ fontSize: "5rem" }}>{s.num}</span>
              <h3 className="font-syne font-bold text-foreground text-2xl md:text-3xl mb-3">{s.title}</h3>
              <p className="text-muted-foreground font-light max-w-md" style={{ lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        {/* Mobile stacked cards */}
        <div className="md:hidden px-6 space-y-6 pb-12" data-stagger>
          {services.map((s) => (
            <div key={s.num} data-stagger-child className="opacity-0 relative rounded-xl p-6" style={{ background: "hsl(var(--card))" }}>
              <span className="font-syne font-bold text-primary/20 text-5xl absolute top-4 left-6">{s.num}</span>
              <div className="pt-14">
                <h3 className="font-syne font-bold text-foreground text-xl mb-2">{s.title}</h3>
                <p className="text-muted-foreground font-light text-sm" style={{ lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="gsap-fade-up text-center text-foreground font-light py-12 px-6" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)" }}>
          Everything above. One team. One retainer.
        </p>
      </section>

      {/* §05 — Proof Block */}
      <section className="bg-primary py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0">
          {[
            { val: "48", label: "Average delivery turnaround", attr: "48" },
            { val: "3", label: "Average client content growth", attr: "3" },
            { val: "100", label: "Revision commitment, every time", attr: "100" },
          ].map((stat, i) => (
            <div key={i} className="flex-1 text-center relative">
              {i > 0 && <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-20 bg-primary-foreground/20" />}
              <p data-countup={stat.attr} className="font-syne font-extrabold text-primary-foreground" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
                {stat.attr === "48" ? "0HR" : stat.attr === "3" ? "0X" : "0%"}
              </p>
              <p className="text-primary-foreground/70 font-light text-sm mt-2 max-w-[200px] mx-auto">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-primary-foreground font-light text-sm mt-12 opacity-80">
          These aren't promises. They're our average.
        </p>
      </section>

      {/* §06 — Origin / Trust */}
      <section className="max-w-4xl mx-auto px-6 py-28 md:py-36">
        <p className="gsap-fade-up text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6 font-light">/ WHY MACROVIEW</p>
        <h2 className="gsap-fade-up font-syne font-bold text-foreground mb-8" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
          We built what we wish existed.
        </h2>
        <div className="gsap-fade-up border-l-2 border-primary pl-6">
          <p className="text-muted-foreground font-light max-w-2xl" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)", lineHeight: 1.9 }}>
            MacroView started with a single reel. We refined it, shipped it, and watched what happened when content was done right. Then we built the system around it — script to screen, daily uploads, AI workflows, social scaling. A full creative studio run by a small team that cares about one thing: your growth.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 mt-10" data-stagger>
          {["2022 — First Reel", "2023 — Full Pipeline", "2024 — AI Integrated"].map((m, i) => (
            <span key={i} data-stagger-child className="opacity-0 text-xs tracking-[0.15em] text-muted-foreground border border-muted-foreground/25 rounded-full px-4 py-2 font-light">
              {m}
            </span>
          ))}
        </div>
      </section>

      {/* §07 — Who This Is For */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <p className="gsap-fade-up text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6 font-light">/ WHO WE WORK WITH</p>
        <h2 className="gsap-fade-up font-syne font-bold text-foreground mb-12" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)" }}>
          MacroView is for creators who are done playing small.
        </h2>
        <div className="space-y-5" data-stagger>
          {[
            "Content creators & influencers scaling their personal brand",
            "Businesses building a consistent content presence online",
            "Founders who want content running without touching it daily",
            "Organizations ready to invest in long-term content growth",
          ].map((line, i) => (
            <p key={i} data-stagger-child className="opacity-0 border-l-2 border-primary pl-5 text-foreground font-light" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)", lineHeight: 1.8 }}>
              {line}
            </p>
          ))}
        </div>
        <p className="gsap-fade-up text-muted-foreground font-light text-sm mt-10">
          If you're looking for the cheapest option, we're probably not the right fit. If you want results, let's talk.
        </p>
      </section>

      {/* §08 — Testimonials */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <p className="gsap-fade-up text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6 font-light">/ CLIENT RESULTS</p>
        <h2 className="gsap-fade-up font-syne font-bold text-foreground mb-12" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
          Don't take our word for it.
        </h2>
        <div className="grid md:grid-cols-3 gap-6" data-stagger>
          {testimonials.map((t, i) => (
            <div key={i} data-stagger-child className="opacity-0 rounded-xl p-6 md:p-8" style={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(var(--border) / 0.25)" }}>
              <p className="text-foreground font-light mb-6" style={{ fontSize: "1.05rem", lineHeight: 1.9 }}>
                "{t.quote}"
              </p>
              <div className="border-t border-muted-foreground/20 pt-4">
                <p className="text-muted-foreground text-xs tracking-[0.15em]">{t.name}</p>
                <p className="text-muted-foreground text-xs tracking-[0.1em] opacity-70">{t.title}</p>
              </div>
            </div>
          ))}
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
                  className="flex-shrink-0 rounded-lg flex items-center justify-center mx-2 border border-transparent hover:border-primary transition-colors group"
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
      <section id="book" className="close-section min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
        <div className="mb-8">
          <p className="close-line opacity-0 font-syne font-extrabold text-foreground leading-tight" style={{ fontSize: "clamp(2rem, 7vw, 5rem)" }}>Your content should be</p>
          <p className="close-line opacity-0 font-syne font-extrabold text-foreground leading-tight" style={{ fontSize: "clamp(2rem, 7vw, 5rem)" }}>working harder</p>
          <p className="close-line opacity-0 font-syne font-extrabold text-foreground leading-tight" style={{ fontSize: "clamp(2rem, 7vw, 5rem)" }}>than you are.</p>
        </div>
        <p className="gsap-fade-up text-muted-foreground font-light max-w-xl mb-4" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.1rem)", lineHeight: 1.8 }}>
          MacroView handles the full pipeline — editing, strategy, uploads, AI systems — so you can focus on what only you can do.
        </p>
        <p className="gsap-fade-up text-foreground font-light max-w-md mb-10" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)" }}>
          Spots are limited. We work with a select number of clients each month.
        </p>
        <a href="#book" className="gsap-fade-up bg-primary text-primary-foreground font-syne font-bold rounded-full px-12 py-4 text-lg tracking-wide hover:brightness-125 hover:scale-[1.02] transition-all shadow-lg">
          Book Your Free Strategy Call →
        </a>
        <p className="gsap-fade-up text-muted-foreground font-light text-sm mt-6">
          No commitment. 30 minutes. Walk away with a content plan.
        </p>
        <div className="gsap-fade-up flex flex-col items-center gap-3 mt-10 text-muted-foreground text-sm font-light">
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

      {/* §11 — Footer */}
      <footer className="border-t border-muted-foreground/20 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-syne font-bold text-muted-foreground text-sm tracking-wide">MACROVIEW</span>
          <div className="flex gap-4 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-foreground transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-foreground transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
            </a>
          </div>
          <span className="text-muted-foreground font-light text-xs">© 2025 MacroView Studio · Global &amp; Remote</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
