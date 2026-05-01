import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  target: number;
  decimals?: number;
  prefix?: string;
  unit?: string;
  duration?: number;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const CountUp = ({
  target,
  decimals = 0,
  prefix = "",
  unit = "",
  duration = 2200,
  className,
}: CountUpProps) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let startTs: number | null = null;
    let running = false;

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const t = Math.min((ts - startTs) / duration, 1);
      setVal(target * easeOutCubic(t));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running) return;
      if (reduce) {
        setVal(target);
        return;
      }
      running = true;
      startTs = null;
      setVal(0);
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const root = document.querySelector("#snap-root");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
          } else {
            stop();
            setVal(0);
          }
        });
      },
      { threshold: 0.1, root: root ?? null, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {unit}
    </span>
  );
};
