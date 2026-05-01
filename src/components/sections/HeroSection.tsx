import { GMAIL_COMPOSE_URL } from "@/data/config";
import { scrollToSection } from "@/hooks/useScrollDots";

export const HeroSection = () => (
  <section id="hero" style={{ background: "var(--black)" }}>
    <div className="container-edge section-pad" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div className="snap-content two-col-hero">
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                width: "40px",
                height: "1px",
                background: "var(--blue)",
                display: "inline-block",
              }}
            />
            <span className="label-mono" style={{ color: "var(--dim)" }}>
              Content Production Studio
            </span>
          </div>

          <h1 className="display-l" style={{ color: "var(--white-c)", marginBottom: "32px" }}>
            YOUR<br />
            CONTENT<br />
            <span style={{ color: "var(--blue)" }}>MACHINE.</span>
          </h1>

          <p className="body-l" style={{ maxWidth: "52ch", marginBottom: "40px" }}>
            We build, edit, and produce scroll-stopping video content for creators and personal
            brands that want to grow — consistently.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Book a Discovery Call
            </a>
            <a
              href="#portfolio"
              className="btn btn-outline"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("portfolio");
              }}
            >
              See Our Work
            </a>
          </div>
        </div>

        <HeroPanel />
      </div>
    </div>
  </section>
);

const HeroPanel = () => (
  <div className="hero-panel">
    <img
      src="/video-asset/gif-1.gif"
      alt=""
      aria-hidden
      className="hero-media"
    />
    <div className="hero-grid" />
    <div className="hero-orb" />
    <div className="hero-vert-label">MVD.2025</div>

    <div className="hero-counter-row">
      <div className="hero-counter">
        <span className="num">100+</span>
        <span className="label">Projects</span>
      </div>
      <div className="hero-counter">
        <span className="num">3M+</span>
        <span className="label">Views</span>
      </div>
      <div className="hero-counter">
        <span className="num">48h</span>
        <span className="label">Turnaround</span>
      </div>
    </div>
  </div>
);
