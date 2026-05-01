import { useEffect, useState } from "react";
import { SECTIONS, type SectionId } from "@/data/sections";

export function useScrollDots(rootSelector = "#snap-root") {
  const [activeId, setActiveId] = useState<SectionId>(SECTIONS[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(rootSelector);
    if (!root) return;

    const compute = () => {
      setScrolled(root.scrollTop > 10);
      let bestId: SectionId = SECTIONS[0].id;
      let bestDelta = Infinity;
      SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const delta = Math.abs(rect.top);
        if (delta < bestDelta) {
          bestDelta = delta;
          bestId = s.id;
        }
      });
      setActiveId(bestId);
    };

    compute();
    root.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      root.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [rootSelector]);

  return { activeId, scrolled };
}

export function scrollToSection(id: string, rootSelector = "#snap-root") {
  const root = document.querySelector<HTMLElement>(rootSelector);
  const target = document.getElementById(id);
  if (!root || !target) return;
  const top = target.offsetTop;
  root.scrollTo({ top, behavior: "smooth" });
}
