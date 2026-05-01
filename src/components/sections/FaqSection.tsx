import { useState } from "react";
import { Tag } from "@/components/shared/Tag";
import { faqs } from "@/data/faqs";

export const FaqSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" style={{ background: "var(--deep)" }}>
      <div className="container-edge section-pad">
        <header className="snap-content" style={{ textAlign: "center", marginBottom: "48px" }}>
          <Tag>FAQ</Tag>
          <h2 className="display-m" style={{ color: "var(--white-c)", marginTop: "28px" }}>
            COMMON<br />
            <span style={{ color: "var(--blue)" }}>QUESTIONS.</span>
          </h2>
        </header>

        <dl
          className="snap-content"
          style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column" }}
        >
          {faqs.map((f) => {
            const open = openId === f.id;
            return (
              <div key={f.id} className="faq-item" data-open={open}>
                <dt>
                  <button
                    type="button"
                    className="faq-trigger"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${f.id}`}
                    onClick={() => setOpenId(open ? null : f.id)}
                  >
                    <span>{f.question}</span>
                    <span className="faq-icon" aria-hidden>+</span>
                  </button>
                </dt>
                <dd
                  id={`faq-panel-${f.id}`}
                  className="faq-panel"
                  role="region"
                  style={{ margin: 0 }}
                >
                  <p className="faq-answer">{f.answer}</p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
};
