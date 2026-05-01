import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import {
  BOOKING_EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  LINKEDIN_URL,
  LOCATION,
  UTC_OFFSET,
} from "@/data/config";

describe("<Footer>", () => {
  it("links the booking email via mailto:", () => {
    render(<Footer />);
    const email = screen.getByRole("link", { name: BOOKING_EMAIL });
    expect(email).toHaveAttribute("href", `mailto:${BOOKING_EMAIL}`);
  });

  it("links the phone via tel: and shows the formatted display", () => {
    render(<Footer />);
    const phone = screen.getByRole("link", { name: PHONE_DISPLAY });
    expect(phone).toHaveAttribute("href", `tel:${PHONE_TEL}`);
  });

  it("links LinkedIn and opens in a new tab", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /linkedin/i });
    expect(link).toHaveAttribute("href", LINKEDIN_URL);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("shows studio location and UTC offset", () => {
    const { container } = render(<Footer />);
    expect(screen.getByText(LOCATION)).toBeInTheDocument();
    expect(container.textContent).toContain(UTC_OFFSET);
  });

  it("renders the live Manila clock as HH:MM next to the UTC offset", () => {
    const { container } = render(<Footer />);
    const escapedOffset = UTC_OFFSET.replace(/[+]/g, "\\+");
    expect(container.textContent).toMatch(
      new RegExp(`${escapedOffset} · \\d{2}:\\d{2}`),
    );
  });

  it("displays the current year in the copyright line", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${year} MacroView Digital`)),
    ).toBeInTheDocument();
  });
});
