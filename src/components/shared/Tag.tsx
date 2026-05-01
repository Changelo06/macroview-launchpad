interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag = ({ children, className = "" }: TagProps) => (
  <span className={`tag ${className}`}>{children}</span>
);
