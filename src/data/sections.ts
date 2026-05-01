import { GMAIL_COMPOSE_URL } from "./config";

export const SECTIONS = [
  { id: "hero",      label: "Home" },
  { id: "problem",   label: "Problem" },
  { id: "solution",  label: "System" },
  { id: "portfolio", label: "Portfolio" },
  { id: "results",   label: "Results" },
  { id: "why",       label: "Why MVD" },
  { id: "who",       label: "Who" },
  { id: "faq",       label: "FAQ" },
  { id: "book",      label: "Book" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: "problem",   label: "Problem" },
  { id: "solution",  label: "System" },
  { id: "portfolio", label: "Portfolio" },
  { id: "results",   label: "Results" },
  { id: "faq",       label: "FAQ" },
];

export type CtaBandVariant = "intro" | "pivot" | "portfolio" | "why" | "faq";

export const CTA_BANDS: Record<
  CtaBandVariant,
  { headline: string; cta: string; href: string; isExternal?: boolean }
> = {
  intro: {
    headline: "YOUR AUDIENCE IS WATCHING.",
    cta: "Start Scaling",
    href: "#solution",
  },
  pivot: {
    headline: "WHAT WOULD 10X MORE CONTENT DO FOR YOUR BRAND?",
    cta: "See The System",
    href: "#solution",
  },
  portfolio: {
    headline: "YOUR NEXT VIRAL PIECE STARTS HERE.",
    cta: "Book a Call",
    href: GMAIL_COMPOSE_URL,
    isExternal: true,
  },
  why: {
    headline: "THERE IS NO SECOND TAKE IN CONTENT.",
    cta: "See Why MVD",
    href: "#why",
  },
  faq: {
    headline: "STILL HAVE QUESTIONS?",
    cta: "Book a Call",
    href: GMAIL_COMPOSE_URL,
    isExternal: true,
  },
};
