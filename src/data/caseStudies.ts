export interface CaseStudy {
  id: string;
  target: number;
  decimals?: number;
  prefix?: string;
  unit?: string;
  trailingMark?: string;
  description: string;
  client: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cs1",
    target: 847,
    decimals: 0,
    unit: "K",
    trailingMark: "+",
    description:
      "Organic views in 30 days from a 12-piece short-form series we scripted, edited, and published.",
    client: "Fitness Creator · 2024",
  },
  {
    id: "cs2",
    target: 4.2,
    decimals: 1,
    unit: "x",
    description:
      "ROAS on paid video ads for a coaching client — produced and iterated in-house.",
    client: "Business Coach · 2024",
  },
  {
    id: "cs3",
    target: 60,
    decimals: 0,
    prefix: "0→",
    unit: "K",
    description:
      "Subscribers in under 90 days. Full content strategy, weekly long-form, and daily shorts.",
    client: "Personal Brand · 2025",
  },
];
