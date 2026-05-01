import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CountUp } from "./CountUp";

describe("<CountUp>", () => {
  it("renders the initial 0 value formatted with the given suffix", () => {
    render(<CountUp target={847} unit="K" />);
    expect(screen.getByText(/^0K$/)).toBeInTheDocument();
  });

  it("respects decimals on initial render", () => {
    render(<CountUp target={4.2} decimals={1} unit="x" />);
    expect(screen.getByText(/^0\.0x$/)).toBeInTheDocument();
  });

  it("prefixes static text in front of the count", () => {
    render(<CountUp target={60} prefix="0→" unit="K" />);
    expect(screen.getByText("0→0K")).toBeInTheDocument();
  });

  it("registers an IntersectionObserver scoped to #snap-root if present", () => {
    // Provide a #snap-root element so the observer attaches to the right scroller.
    const root = document.createElement("div");
    root.id = "snap-root";
    document.body.appendChild(root);

    type IO = { instances: { options?: IntersectionObserverInit }[] };
    const ioBefore =
      (globalThis as unknown as { __mockIO: IO }).__mockIO.instances.length;

    render(<CountUp target={847} unit="K" />);

    const ioAfter =
      (globalThis as unknown as { __mockIO: IO }).__mockIO.instances.length;
    expect(ioAfter).toBeGreaterThan(ioBefore);

    document.body.removeChild(root);
  });
});
