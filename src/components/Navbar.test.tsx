import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { NAV_LINKS } from "@/data/sections";
import { GMAIL_COMPOSE_URL } from "@/data/config";

describe("<Navbar>", () => {
  it("renders the MacroView wordmark with brand-mark icon", () => {
    const { container } = render(<Navbar scrolled={false} />);
    expect(screen.getByText(/MACRO/)).toBeInTheDocument();
    expect(screen.getByText("VIEW")).toBeInTheDocument();
    const mark = container.querySelector(".nav-logo-mark");
    expect(mark).not.toBeNull();
    expect(mark?.tagName).toBe("IMG");
    expect(mark).toHaveAttribute("src", expect.stringContaining("Logo.svg"));
  });

  it("renders all configured nav links", () => {
    render(<Navbar scrolled={false} />);
    NAV_LINKS.forEach((l) => {
      const link = screen.getByRole("link", { name: l.label });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `#${l.id}`);
    });
  });

  it("Book a Call CTA points at the gmail compose URL and opens in a new tab", () => {
    render(<Navbar scrolled={false} />);
    const cta = screen.getByRole("link", { name: /book a call/i });
    expect(cta).toHaveAttribute("href", GMAIL_COMPOSE_URL);
    expect(cta).toHaveAttribute("target", "_blank");
  });

  it("toggles the .scrolled class based on the prop", () => {
    const { container, rerender } = render(<Navbar scrolled={false} />);
    const nav = container.querySelector(".navbar");
    expect(nav).not.toHaveClass("scrolled");
    rerender(<Navbar scrolled={true} />);
    expect(nav).toHaveClass("scrolled");
  });
});
