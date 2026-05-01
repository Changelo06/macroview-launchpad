import { SECTIONS, type SectionId } from "@/data/sections";
import { scrollToSection } from "@/hooks/useScrollDots";

interface ScrollDotsProps {
  activeId: SectionId;
}

export const ScrollDots = ({ activeId }: ScrollDotsProps) => (
  <div className="scroll-dots" role="navigation" aria-label="Section navigation">
    {SECTIONS.map((s) => (
      <button
        key={s.id}
        type="button"
        className={`nav-dot${s.id === activeId ? " active" : ""}`}
        aria-label={`Go to ${s.label}`}
        aria-current={s.id === activeId ? "true" : undefined}
        onClick={() => scrollToSection(s.id)}
      />
    ))}
  </div>
);
