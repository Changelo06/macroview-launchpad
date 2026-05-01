import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaBand } from "./CtaBand";
import { CTA_BANDS, type CtaBandVariant } from "@/data/sections";
import { GMAIL_COMPOSE_URL } from "@/data/config";

const variants: CtaBandVariant[] = ["intro", "pivot", "portfolio", "why", "faq"];

describe("<CtaBand>", () => {
  variants.forEach((variant) => {
    it(`renders the ${variant} variant headline + CTA copy`, () => {
      render(<CtaBand variant={variant} />);
      const cfg = CTA_BANDS[variant];
      expect(screen.getByText(cfg.headline)).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: cfg.cta }),
      ).toBeInTheDocument();
    });
  });

  it("external variants open in a new tab and point to GMAIL_COMPOSE_URL", () => {
    render(<CtaBand variant="portfolio" />);
    const link = screen.getByRole("link", { name: CTA_BANDS.portfolio.cta });
    expect(link).toHaveAttribute("href", GMAIL_COMPOSE_URL);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("internal variants use anchor hrefs and don't set target=_blank", () => {
    render(<CtaBand variant="intro" />);
    const link = screen.getByRole("link", { name: CTA_BANDS.intro.cta });
    expect(link.getAttribute("href")).toMatch(/^#/);
    expect(link).not.toHaveAttribute("target");
  });

  it("attaches the data-variant attribute for styling hooks", () => {
    const { container } = render(<CtaBand variant="why" />);
    const band = container.querySelector(".cta-band");
    expect(band).toHaveAttribute("data-variant", "why");
  });
});
