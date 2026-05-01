import { useEffect } from "react";

export function useSnapObserver(rootSelector = "#snap-root", enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const root = document.querySelector(rootSelector);
    if (!root) return;

    const targets = document.querySelectorAll<HTMLElement>(
      ".snap-content, .stagger-child"
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, root: root as Element }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [rootSelector, enabled]);
}
