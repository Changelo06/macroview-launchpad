export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    id: "f1",
    question: "What types of creators do you work with?",
    answer:
      "We work with coaches, consultants, and personal brand creators already generating revenue who want to scale content output without building an in-house team. We are not a fit for beginners or hobbyists.",
  },
  {
    id: "f2",
    question: "How long does onboarding take?",
    answer:
      "Standard onboarding is 5–7 business days. We collect brand assets, run a strategy call, set the content calendar, and have first deliverables in edit within the first week.",
  },
  {
    id: "f3",
    question: "What is included in each package?",
    answer:
      "Raw footage intake, editing, colour grading, motion graphics, captions, thumbnail design, and one revision round. Additional services are scoped separately.",
  },
  {
    id: "f4",
    question: "Do you handle scripting and strategy?",
    answer:
      "Yes. Our full-service tier includes content strategy, scripting, hook engineering, and distribution scheduling — not just editing. Most clients find the strategy layer is where we create the most leverage.",
  },
  {
    id: "f5",
    question: "How do turnaround times work?",
    answer:
      "Short-form (Reels, Shorts, TikTok): 48–72 hours. Long-form YouTube: 5–7 business days. Rush delivery available on request.",
  },
  {
    id: "f6",
    question: "Do you sign NDAs or exclusivity agreements?",
    answer:
      "Yes. NDA protection on all accounts by default. Category exclusivity (one client per niche) available on our premium tier.",
  },
  {
    id: "f7",
    question: "What does pricing look like?",
    answer:
      "Monthly retainers starting from a discovery call. Pricing scales with output volume, complexity, and whether strategy is included. Book a call and we will scope a custom engagement.",
  },
  {
    id: "f8",
    question: "What if I am not satisfied with a deliverable?",
    answer:
      "Every deliverable includes one structured revision round. If after revision the output does not meet brief, we remake it. Every brief is tracked against a written spec to prevent ambiguity.",
  },
];
