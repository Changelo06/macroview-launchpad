import { useCursor } from "@/hooks/useCursor";

export const CustomCursor = () => {
  useCursor();
  return (
    <>
      <div id="cursor-dot" className="cursor-dot" aria-hidden />
      <div id="cursor-ring" className="cursor-ring" aria-hidden />
    </>
  );
};
