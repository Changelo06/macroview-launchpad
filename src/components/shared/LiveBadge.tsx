interface LiveBadgeProps {
  label?: string;
}

export const LiveBadge = ({ label = "Studio Open" }: LiveBadgeProps) => (
  <span className="live-badge">
    <span className="dot" />
    {label}
  </span>
);
