import { useEffect, useState } from "react";
import {
  BOOKING_EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  LINKEDIN_URL,
  LOCATION,
  TIMEZONE,
  UTC_OFFSET,
} from "@/data/config";
import { NAV_LINKS } from "@/data/sections";
import { scrollToSection } from "@/hooks/useScrollDots";

const formatPHT = (d: Date) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);

const useLiveClock = () => {
  const [time, setTime] = useState(() => formatPHT(new Date()));
  useEffect(() => {
    const tick = () => setTime(formatPHT(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
};

const colLabelStyle: React.CSSProperties = {
  fontSize: "10px",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "var(--dim)",
  display: "block",
  marginBottom: "16px",
};

export const Footer = () => {
  const year = new Date().getFullYear();
  const time = useLiveClock();

  return (
    <footer className="footer">
      <div className="footer-row">
        <div style={{ maxWidth: "320px" }}>
          <a
            href="#hero"
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
          >
            MACRO<span className="accent">VIEW</span>
          </a>
          <p className="body-s" style={{ marginTop: "16px", color: "var(--dim)" }}>
            A content production studio for creators and personal brands.
          </p>
        </div>

        <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
          <div>
            <span className="font-mono" style={colLabelStyle}>Sections</span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px" }}>
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(l.id);
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono" style={colLabelStyle}>Contact</span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px" }}>
              <li>
                <a href={`mailto:${BOOKING_EMAIL}`} className="nav-link">
                  {BOOKING_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_TEL}`} className="nav-link">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono" style={colLabelStyle}>Studio</span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px" }}>
              <li
                className="font-mono"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text)",
                }}
              >
                {LOCATION}
              </li>
              <li
                className="font-mono"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--dim)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--cyan)",
                    animation: "blink 1.4s ease-in-out infinite",
                  }}
                />
                {UTC_OFFSET} · {time}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} MacroView Digital · MVD.STUDIO</span>
        <span>Built in the dark.</span>
      </div>
    </footer>
  );
};
