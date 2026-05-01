interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionLabel = ({ children, className = "" }: SectionLabelProps) => (
  <span className={`section-label ${className}`}>{children}</span>
);
