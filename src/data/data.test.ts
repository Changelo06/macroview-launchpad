import { describe, it, expect } from "vitest";
import {
  BOOKING_EMAIL,
  GMAIL_COMPOSE_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  LINKEDIN_URL,
  LOCATION,
  TIMEZONE,
  UTC_OFFSET,
  SITE_META,
} from "./config";
import { SECTIONS, NAV_LINKS, CTA_BANDS } from "./sections";
import { portfolioItems } from "./portfolioItems";
import { caseStudies } from "./caseStudies";
import { faqs } from "./faqs";
import { testimonials } from "./testimonials";

describe("config", () => {
  it("BOOKING_EMAIL matches expected gmail", () => {
    expect(BOOKING_EMAIL).toBe("macroviewdigital@gmail.com");
    expect(BOOKING_EMAIL).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  it("GMAIL_COMPOSE_URL contains the booking email and a subject", () => {
    expect(GMAIL_COMPOSE_URL).toContain(BOOKING_EMAIL);
    expect(GMAIL_COMPOSE_URL).toContain("view=cm");
    expect(GMAIL_COMPOSE_URL).toContain("su=");
  });

  it("phone display and tel formats are consistent", () => {
    expect(PHONE_DISPLAY).toBe("+63 949 463 4459");
    expect(PHONE_TEL).toBe("+639494634459");
    // tel link must be digits-only after the leading +
    expect(PHONE_TEL.slice(1)).toMatch(/^\d+$/);
    // display digits should equal tel digits
    expect(PHONE_DISPLAY.replace(/\D/g, "")).toBe(PHONE_TEL.replace(/\D/g, ""));
  });

  it("LinkedIn URL points to the company page", () => {
    expect(LINKEDIN_URL).toBe("https://www.linkedin.com/company/macroviewdigital/");
    expect(LINKEDIN_URL.startsWith("https://")).toBe(true);
  });

  it("studio location and timezone are set", () => {
    expect(LOCATION).toBe("Philippines");
    expect(TIMEZONE).toBe("Asia/Manila");
    expect(UTC_OFFSET).toBe("UTC+8");
  });

  it("site meta has required fields", () => {
    expect(SITE_META.title.length).toBeGreaterThan(0);
    expect(SITE_META.description.length).toBeGreaterThan(0);
    expect(SITE_META.url).toMatch(/^https:\/\//);
  });
});

describe("sections registry", () => {
  it("declares all 9 section ids in stable order", () => {
    expect(SECTIONS.map((s) => s.id)).toEqual([
      "hero",
      "problem",
      "solution",
      "portfolio",
      "results",
      "why",
      "who",
      "faq",
      "book",
    ]);
  });

  it("every section has a non-empty label", () => {
    SECTIONS.forEach((s) => {
      expect(s.label.length).toBeGreaterThan(0);
    });
  });

  it("nav links only reference real section ids", () => {
    const ids = new Set(SECTIONS.map((s) => s.id));
    NAV_LINKS.forEach((link) => {
      expect(ids.has(link.id)).toBe(true);
    });
  });
});

describe("CTA bands", () => {
  const variants = ["intro", "pivot", "portfolio", "why", "faq"] as const;

  it("defines all 5 variants", () => {
    variants.forEach((v) => {
      expect(CTA_BANDS[v]).toBeDefined();
    });
  });

  it("each variant has a headline and CTA", () => {
    variants.forEach((v) => {
      const cfg = CTA_BANDS[v];
      expect(cfg.headline.length).toBeGreaterThan(0);
      expect(cfg.cta.length).toBeGreaterThan(0);
      expect(cfg.href.length).toBeGreaterThan(0);
    });
  });

  it("internal hrefs are anchors and external hrefs are URLs", () => {
    variants.forEach((v) => {
      const cfg = CTA_BANDS[v];
      if (cfg.isExternal) {
        expect(cfg.href.startsWith("https://")).toBe(true);
      } else {
        expect(cfg.href.startsWith("#")).toBe(true);
      }
    });
  });

  it("portfolio + faq variants point to the gmail compose URL", () => {
    expect(CTA_BANDS.portfolio.href).toBe(GMAIL_COMPOSE_URL);
    expect(CTA_BANDS.faq.href).toBe(GMAIL_COMPOSE_URL);
  });
});

describe("portfolio items", () => {
  it("contains exactly 6 entries", () => {
    expect(portfolioItems).toHaveLength(6);
  });

  it("every item has id/title/category/gradientFallback", () => {
    portfolioItems.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.category.length).toBeGreaterThan(0);
      expect(p.gradientFallback).toContain("linear-gradient");
    });
  });

  it("ids are unique", () => {
    const ids = portfolioItems.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every item points to an mp4 video under /video-asset/", () => {
    portfolioItems.forEach((p) => {
      expect(p.videoPath).toBeDefined();
      expect(p.videoPath!).toMatch(/^\/video-asset\/.+\.mp4$/);
    });
  });

  it("the tall (hero) item is the YouTube series", () => {
    const tall = portfolioItems.find((p) => p.span === "tall");
    expect(tall?.id).toBe("p1");
    expect(tall?.title).toMatch(/YouTube/);
  });
});

describe("case studies", () => {
  it("contains 3 metrics", () => {
    expect(caseStudies).toHaveLength(3);
  });

  it("each metric has a numeric target and copy", () => {
    caseStudies.forEach((cs) => {
      expect(typeof cs.target).toBe("number");
      expect(cs.target).toBeGreaterThan(0);
      expect(cs.description.length).toBeGreaterThan(20);
      expect(cs.client.length).toBeGreaterThan(0);
    });
  });

  it("847K metric carries the trailing '+' mark", () => {
    const cs1 = caseStudies.find((c) => c.id === "cs1");
    expect(cs1?.target).toBe(847);
    expect(cs1?.unit).toBe("K");
    expect(cs1?.trailingMark).toBe("+");
  });

  it("4.2x metric uses 1 decimal", () => {
    const cs2 = caseStudies.find((c) => c.id === "cs2");
    expect(cs2?.target).toBe(4.2);
    expect(cs2?.decimals).toBe(1);
    expect(cs2?.unit).toBe("x");
  });

  it("0→60K metric uses the '0→' prefix", () => {
    const cs3 = caseStudies.find((c) => c.id === "cs3");
    expect(cs3?.target).toBe(60);
    expect(cs3?.prefix).toBe("0→");
    expect(cs3?.unit).toBe("K");
  });
});

describe("faqs", () => {
  it("has 8 entries", () => {
    expect(faqs).toHaveLength(8);
  });

  it("every FAQ has a non-trivial question and answer", () => {
    faqs.forEach((f) => {
      expect(f.question.length).toBeGreaterThan(8);
      expect(f.answer.length).toBeGreaterThan(40);
    });
  });

  it("ids are unique and follow f1..f8", () => {
    const ids = faqs.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(/^f\d$/));
  });
});

describe("testimonials", () => {
  it("has 2 entries", () => {
    expect(testimonials).toHaveLength(2);
  });

  it("every testimonial has quote/author/role", () => {
    testimonials.forEach((t) => {
      expect(t.quote.length).toBeGreaterThan(40);
      expect(t.author.length).toBeGreaterThan(0);
      expect(t.role.length).toBeGreaterThan(0);
    });
  });
});
