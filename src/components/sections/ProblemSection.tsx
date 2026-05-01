import { Tag } from "@/components/shared/Tag";

const PAINS = [
  "No time to film AND edit.",
  "Posting inconsistently kills algorithms.",
  "Bad editing loses viewers in 3 seconds.",
  "Hiring in-house is expensive and slow.",
];

export const ProblemSection = () => (
  <section id="problem" style={{ background: "var(--deep)" }}>
    <div
      className="container-edge section-pad"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <div className="snap-content two-col-problem">
        <div>
          <Tag>The Problem</Tag>
          <h2
            className="display-m"
            style={{ color: "var(--white-c)", margin: "32px 0 28px" }}
          >
            CONTENT{" "}
            <span style={{ color: "var(--muted-c)" }}>IS</span>{" "}
            HARD.
          </h2>
          <p className="body-l" style={{ maxWidth: "52ch" }}>
            Most creators stall not because of talent — but because the production pipeline breaks
            down. Filming takes hours. Editing takes longer. Posting consistently becomes a second
            job you never signed up for.
          </p>
        </div>

        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {PAINS.map((p, i) => (
            <li
              key={p}
              className="stagger-child surface-card"
              style={{
                padding: "24px 28px",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: "11px",
                  color: "var(--blue)",
                  letterSpacing: "0.2em",
                }}
              >
                0{i + 1}
              </span>
              <span
                className="font-display"
                style={{
                  fontSize: "22px",
                  letterSpacing: "0.04em",
                  color: "var(--white-c)",
                }}
              >
                {p}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
