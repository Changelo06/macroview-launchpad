import { caseStudies } from "@/data/caseStudies";
import { Tag } from "@/components/shared/Tag";
import { CountUp } from "@/components/CountUp";

export const ResultsSection = () => (
  <section id="results" style={{ background: "var(--black)" }}>
    <div className="container-edge section-pad">
      <header className="snap-content" style={{ textAlign: "center", marginBottom: "64px" }}>
        <Tag>Results</Tag>
        <h2 className="display-m" style={{ color: "var(--white-c)", marginTop: "28px" }}>
          NUMBERS<br />
          THAT<br />
          <span style={{ color: "var(--blue)" }}>MATTER.</span>
        </h2>
      </header>

      <div className="results-grid">
        {caseStudies.map((cs) => (
          <article key={cs.id} className="metric-card stagger-child">
            <div
              className="font-display"
              style={{
                fontSize: "clamp(48px, 5vw, 64px)",
                color: "var(--white-c)",
                lineHeight: 0.92,
                marginBottom: "20px",
                letterSpacing: "0.02em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <CountUp
                target={cs.target}
                decimals={cs.decimals}
                prefix={cs.prefix}
                unit={cs.unit}
              />
              {cs.trailingMark && (
                <span style={{ color: "var(--blue)" }}>{cs.trailingMark}</span>
              )}
            </div>
            <p className="body-m" style={{ marginBottom: "24px" }}>
              {cs.description}
            </p>
            <span
              className="font-mono"
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--dim)",
              }}
            >
              {cs.client}
            </span>
          </article>
        ))}
      </div>
    </div>
  </section>
);
