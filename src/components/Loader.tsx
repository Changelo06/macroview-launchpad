import { useEffect, useState } from "react";

interface LoaderProps {
  onDone?: () => void;
}

export const Loader = ({ onDone }: LoaderProps) => {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setGone(true), 2000);
    const doneTimer = setTimeout(() => onDone?.(), 2200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`loader${gone ? " gone" : ""}`} aria-hidden={gone}>
      <div className="loader-wordmark">MACROVIEW</div>
      <div className="loader-bar" />
    </div>
  );
};
