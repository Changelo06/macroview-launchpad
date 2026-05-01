import { Tag } from "@/components/shared/Tag";

const PILLARS = [
  { num: "I",   title: "Frame-Perfect Editing" },
  { num: "II",  title: "Built for Creator Scale" },
  { num: "III", title: "Strategy-First Approach" },
  { num: "IV",  title: "Retention-Optimised Output" },
  { num: "V",   title: "Turnaround Guarantee" },
];

export const WhySection = () => (
  <section id="why" style={{ background: "var(--deep)" }}>
    <div
      className="container-edge section-pad"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <div
        className="snap-content why-grid"
        style={{ width: "100%", display: "grid", gap: "80px", alignItems: "center" }}
      >
        <div>
          <Tag>Why MVD</Tag>
          <h2
            className="display-m"
            style={{ color: "var(--white-c)", margin: "32px 0 28px" }}
          >
            NOT JUST<br />
            <span style={{ color: "var(--blue)" }}>AN AGENCY.</span>
          </h2>
          <p className="body-l" style={{ marginBottom: "20px", maxWidth: "52ch" }}>
            We are a production house wired around how creators actually work — fast turnarounds,
            written briefs, and an obsession with retention.
          </p>
          <p className="body-l" style={{ maxWidth: "52ch" }}>
            Five pillars. No fluff. Every client engagement is benchmarked against them.
          </p>
        </div>

        <div style={{ display: "grid", gap: "2px" }}>
          {PILLARS.map((p) => (
            <button key={p.num} type="button" className="pillar-row stagger-child">
              <span
                className="font-mono"
                style={{ fontSize: "11px", color: "var(--blue)", letterSpacing: "0.2em" }}
              >
                {p.num}
              </span>
              <span
                className="font-display"
                style={{ fontSize: "26px", color: "var(--white-c)", letterSpacing: "0.04em" }}
              >
                {p.title}
              </span>
              <span
                className="pillar-arrow font-mono"
                style={{ fontSize: "16px", textAlign: "right" }}
                aria-hidden
              >
                →
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </section>
);
