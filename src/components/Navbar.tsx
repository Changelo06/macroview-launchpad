import { GMAIL_COMPOSE_URL } from "@/data/config";
import { NAV_LINKS } from "@/data/sections";
import { scrollToSection } from "@/hooks/useScrollDots";

interface NavbarProps {
  scrolled: boolean;
}

export const Navbar = ({ scrolled }: NavbarProps) => {
  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`} aria-label="Primary">
      <a
        href="#hero"
        className="nav-logo"
        onClick={(e) => handleClick(e, "hero")}
      >
        <img
          src="/Macroview%20-%20Logo.svg"
          alt=""
          aria-hidden
          className="nav-logo-mark"
        />
        <span>MACRO<span className="accent">VIEW</span></span>
      </a>

      <div className="nav-links">
        {NAV_LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="nav-link"
            onClick={(e) => handleClick(e, l.id)}
          >
            {l.label}
          </a>
        ))}
      </div>

      <a
        href={GMAIL_COMPOSE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
        style={{ padding: "10px 20px", fontSize: "10px" }}
      >
        Book a Call
      </a>
    </nav>
  );
};
