import { useEffect } from "react";

export function useCursor() {
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      (matchMedia("(hover: none)").matches || matchMedia("(max-width: 768px)").matches);
    if (isTouch) return;

    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    document.body.classList.add("has-custom-cursor");

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const enter = () => ring.classList.add("expanded");
    const leave = () => ring.classList.remove("expanded");

    const interactive = "a, button, [data-cursor='expand'], input, textarea, select";
    const bind = () => {
      document.querySelectorAll(interactive).forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    bind();
    const mo = new MutationObserver(bind);
    mo.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.body.classList.remove("has-custom-cursor");
      mo.disconnect();
      document.querySelectorAll(interactive).forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);
}
