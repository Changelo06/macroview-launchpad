import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { HeroSection } from "./HeroSection";
import { ProblemSection } from "./ProblemSection";
import { SolutionSection } from "./SolutionSection";
import { PortfolioSection } from "./PortfolioSection";
import { ResultsSection } from "./ResultsSection";
import { WhySection } from "./WhySection";
import { WhoSection } from "./WhoSection";
import { FaqSection } from "./FaqSection";
import { BookSection } from "./BookSection";

import { GMAIL_COMPOSE_URL } from "@/data/config";
import { faqs } from "@/data/faqs";
import { portfolioItems } from "@/data/portfolioItems";
import { caseStudies } from "@/data/caseStudies";
import { testimonials } from "@/data/testimonials";

describe("<HeroSection>", () => {
  it("renders the headline and discovery-call CTA", () => {
    render(<HeroSection />);
    expect(screen.getByText(/MACHINE\./)).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: /book a discovery call/i });
    expect(cta).toHaveAttribute("href", GMAIL_COMPOSE_URL);
  });

  it("includes the gif media element in the hero panel", () => {
    const { container } = render(<HeroSection />);
    const media = container.querySelector(".hero-media");
    expect(media).not.toBeNull();
    expect(media?.tagName).toBe("IMG");
    expect(media).toHaveAttribute("src", expect.stringContaining("gif-1.gif"));
  });

  it("does NOT render the studio-open live badge anymore", () => {
    render(<HeroSection />);
    expect(screen.queryByText(/studio open/i)).not.toBeInTheDocument();
  });

  it("renders the three counter chips", () => {
    render(<HeroSection />);
    expect(screen.getByText("100+")).toBeInTheDocument();
    expect(screen.getByText("3M+")).toBeInTheDocument();
    expect(screen.getByText("48h")).toBeInTheDocument();
  });
});

describe("<ProblemSection>", () => {
  it("renders all four pain-point copies", () => {
    render(<ProblemSection />);
    expect(screen.getByText(/no time to film and edit/i)).toBeInTheDocument();
    expect(screen.getByText(/posting inconsistently kills algorithms/i)).toBeInTheDocument();
    expect(screen.getByText(/bad editing loses viewers in 3 seconds/i)).toBeInTheDocument();
    expect(screen.getByText(/hiring in-house is expensive and slow/i)).toBeInTheDocument();
  });
});

describe("<SolutionSection>", () => {
  const SERVICE_TITLES = [
    "Short-Form Content",
    "Long-Form Editing",
    "Ad Creative",
    "Brand Strategy",
    "Thumbnails + GFX",
    "Distribution",
  ];

  it("renders all 6 service titles", () => {
    render(<SolutionSection />);
    SERVICE_TITLES.forEach((t) => {
      expect(screen.getByText(t)).toBeInTheDocument();
    });
  });

  it("renders the decorative MacroView mark image", () => {
    const { container } = render(<SolutionSection />);
    const mark = container.querySelector(".solution-bg-mark");
    expect(mark).not.toBeNull();
    expect(mark).toHaveAttribute("src", expect.stringContaining("Logo.svg"));
  });

  it("each service card renders an SVG icon (no emoji)", () => {
    const { container } = render(<SolutionSection />);
    const cards = container.querySelectorAll(".service-card");
    expect(cards.length).toBe(6);
    cards.forEach((card) => {
      expect(card.querySelector(".icon svg")).not.toBeNull();
    });
  });
});

describe("<PortfolioSection>", () => {
  it("renders all 6 portfolio items", () => {
    render(<PortfolioSection />);
    portfolioItems.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    });
  });

  it("each item embeds a <video> tag with autoplay/muted/loop", () => {
    const { container } = render(<PortfolioSection />);
    const videos = container.querySelectorAll<HTMLVideoElement>("video.portfolio-item-bg");
    expect(videos.length).toBe(6);
    videos.forEach((v) => {
      expect(v.autoplay).toBe(true);
      expect(v.loop).toBe(true);
      expect(v.muted).toBe(true);
      expect(v.playsInline).toBe(true);
    });
  });

  it("renders the WHAT YOU WANT CTA tile with the simplified Mark Jason name", () => {
    render(<PortfolioSection />);
    expect(screen.getByText(/WHAT YOU WANT,/)).toBeInTheDocument();
    expect(screen.getByText(/WE GET IT FOR YOU\./)).toBeInTheDocument();
    expect(screen.getByText("Mark Jason")).toBeInTheDocument();
    expect(screen.getByText("Owner of MVD")).toBeInTheDocument();
    // Sanity: the long-form should NOT appear
    expect(screen.queryByText("Mark Jason Marcelino")).not.toBeInTheDocument();
  });

  it("renders the CEO portrait with descriptive alt", () => {
    const { container } = render(<PortfolioSection />);
    const ceo = container.querySelector<HTMLImageElement>(".portfolio-cta-ceo");
    expect(ceo).not.toBeNull();
    expect(ceo!.src).toContain("CEO.svg");
    expect(ceo!.alt).toMatch(/Mark Jason/);
  });
});

describe("<ResultsSection>", () => {
  it("renders all three case-study clients", () => {
    render(<ResultsSection />);
    caseStudies.forEach((cs) => {
      expect(screen.getByText(cs.client)).toBeInTheDocument();
    });
  });

  it("each metric initially renders at its 0-value formatted string", () => {
    render(<ResultsSection />);
    // 847K target → 0K initial
    expect(screen.getByText("0K")).toBeInTheDocument();
    // 4.2x target → 0.0x initial
    expect(screen.getByText("0.0x")).toBeInTheDocument();
    // 0→60K target → 0→0K initial
    expect(screen.getByText("0→0K")).toBeInTheDocument();
  });

  it("only the 847K card shows a trailing '+' mark", () => {
    const { container } = render(<ResultsSection />);
    const plusMarks = container.querySelectorAll(".metric-card span");
    const plusFound = Array.from(plusMarks).some((el) => el.textContent === "+");
    expect(plusFound).toBe(true);
  });
});

describe("<WhySection>", () => {
  it("renders the 5 pillars using Roman numerals (I–V), no Arabic '01..05'", () => {
    render(<WhySection />);
    ["I", "II", "III", "IV", "V"].forEach((roman) => {
      expect(screen.getByText(roman)).toBeInTheDocument();
    });
    expect(screen.queryByText("01")).not.toBeInTheDocument();
    expect(screen.queryByText("05")).not.toBeInTheDocument();
  });

  it("renders all 5 pillar titles", () => {
    render(<WhySection />);
    expect(screen.getByText("Frame-Perfect Editing")).toBeInTheDocument();
    expect(screen.getByText("Built for Creator Scale")).toBeInTheDocument();
    expect(screen.getByText("Strategy-First Approach")).toBeInTheDocument();
    expect(screen.getByText("Retention-Optimised Output")).toBeInTheDocument();
    expect(screen.getByText("Turnaround Guarantee")).toBeInTheDocument();
  });
});

describe("<WhoSection>", () => {
  const TYPES = ["Coaches", "Educators", "Lifestyle Creators", "Podcasters"];

  it("renders all 4 creator-type labels", () => {
    render(<WhoSection />);
    TYPES.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("uses sticker SVGs (not emojis) for the type icons", () => {
    const { container } = render(<WhoSection />);
    const stickers = container.querySelectorAll<HTMLImageElement>(".who-sticker");
    expect(stickers.length).toBe(4);
    stickers.forEach((s) => {
      expect(s.src).toMatch(/-sticker\.svg$/);
    });
  });

  it("renders all testimonial quotes and authors", () => {
    render(<WhoSection />);
    testimonials.forEach((t) => {
      expect(screen.getByText(t.quote)).toBeInTheDocument();
      expect(screen.getByText(`${t.author} · ${t.role}`)).toBeInTheDocument();
    });
  });

  it("includes the bottom blue-glow image", () => {
    const { container } = render(<WhoSection />);
    const glow = container.querySelector<HTMLImageElement>(".who-bg-glow");
    expect(glow).not.toBeNull();
    expect(glow!.src).toContain("blue-glow.png");
  });
});

describe("<FaqSection>", () => {
  it("renders all 8 FAQ questions", () => {
    render(<FaqSection />);
    faqs.forEach((f) => {
      expect(screen.getByText(f.question)).toBeInTheDocument();
    });
  });

  it("answers start collapsed (data-open=false on every item)", () => {
    const { container } = render(<FaqSection />);
    container.querySelectorAll(".faq-item").forEach((item) => {
      expect(item.getAttribute("data-open")).toBe("false");
    });
  });

  it("clicking a question opens it and sets aria-expanded=true", () => {
    render(<FaqSection />);
    const trigger = screen.getByRole("button", { name: faqs[0].question });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("only one FAQ is open at a time (single-open semantics)", () => {
    render(<FaqSection />);
    const triggers = faqs.map((f) => screen.getByRole("button", { name: f.question }));
    fireEvent.click(triggers[0]);
    expect(triggers[0]).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(triggers[1]);
    expect(triggers[0]).toHaveAttribute("aria-expanded", "false");
    expect(triggers[1]).toHaveAttribute("aria-expanded", "true");
  });

  it("clicking the same question again closes it", () => {
    render(<FaqSection />);
    const trigger = screen.getByRole("button", { name: faqs[0].question });
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

describe("<BookSection>", () => {
  it("renders the closing headline and the discovery CTA", () => {
    render(<BookSection />);
    expect(screen.getByText(/MACHINE\./)).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: /book a discovery call/i });
    expect(cta).toHaveAttribute("href", GMAIL_COMPOSE_URL);
    expect(cta).toHaveAttribute("target", "_blank");
  });

  it("includes a See Portfolio outline button pointing at #portfolio", () => {
    render(<BookSection />);
    const link = screen.getByRole("link", { name: /see portfolio/i });
    expect(link).toHaveAttribute("href", "#portfolio");
  });

  it("renders the Footer underneath the section", () => {
    const { container } = render(<BookSection />);
    expect(container.querySelector("footer.footer")).not.toBeNull();
  });
});
