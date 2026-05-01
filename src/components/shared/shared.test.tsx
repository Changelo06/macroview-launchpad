import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tag } from "./Tag";
import { SectionLabel } from "./SectionLabel";
import { LiveBadge } from "./LiveBadge";

describe("<Tag>", () => {
  it("renders children with the .tag class", () => {
    render(<Tag>The System</Tag>);
    const el = screen.getByText("The System");
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass("tag");
  });

  it("merges extra className alongside the base", () => {
    render(<Tag className="extra-class">x</Tag>);
    const el = screen.getByText("x");
    expect(el).toHaveClass("tag");
    expect(el).toHaveClass("extra-class");
  });
});

describe("<SectionLabel>", () => {
  it("renders with the .section-label class", () => {
    render(<SectionLabel>Eyebrow</SectionLabel>);
    const el = screen.getByText("Eyebrow");
    expect(el).toHaveClass("section-label");
  });
});

describe("<LiveBadge>", () => {
  it("renders the default 'Studio Open' label", () => {
    render(<LiveBadge />);
    expect(screen.getByText("Studio Open")).toBeInTheDocument();
  });

  it("renders a custom label when passed", () => {
    render(<LiveBadge label="Live Now" />);
    expect(screen.getByText("Live Now")).toBeInTheDocument();
  });

  it("includes a pulsing dot element", () => {
    const { container } = render(<LiveBadge />);
    const dot = container.querySelector(".live-badge .dot");
    expect(dot).not.toBeNull();
  });
});
