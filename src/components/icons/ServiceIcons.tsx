type IconProps = React.SVGProps<SVGSVGElement>;

const baseAttrs = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  width: "100%",
  height: "100%",
  "aria-hidden": true,
};

const cn = (a: string, b?: string) => (b ? `${a} ${b}` : a);

export const IconShortForm = ({ className, ...rest }: IconProps) => (
  <svg {...baseAttrs} {...rest} className={cn("i-shortform", className)}>
    <rect x="7" y="2.5" width="10" height="19" rx="2" />
    <line x1="10.5" y1="5" x2="13.5" y2="5" />
    <path
      className="play"
      d="M10.8 10.5 L14.2 12 L10.8 13.5 Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const IconLongForm = ({ className, ...rest }: IconProps) => (
  <svg {...baseAttrs} {...rest} className={cn("i-longform", className)}>
    <rect x="2.5" y="4.5" width="19" height="12" rx="1.5" />
    <path
      className="play"
      d="M10 8.5 L14.5 10.5 L10 12.5 Z"
      fill="currentColor"
      stroke="none"
    />
    <g className="ticks">
      <line x1="2.5"  y1="20" x2="6"   y2="20" />
      <line x1="8"    y1="20" x2="12"  y2="20" />
      <line x1="14"   y1="20" x2="17"  y2="20" />
      <line x1="19"   y1="20" x2="21.5" y2="20" />
    </g>
  </svg>
);

export const IconAdCreative = ({ className, ...rest }: IconProps) => (
  <svg {...baseAttrs} {...rest} className={cn("i-adcreative", className)}>
    <line x1="3" y1="20.5" x2="21" y2="20.5" />
    <line x1="3" y1="20.5" x2="3"  y2="3.5" />
    <rect className="bar bar-1" x="6"  y="14" width="3" height="6.5" />
    <rect className="bar bar-2" x="11" y="10" width="3" height="10.5" />
    <rect className="bar bar-3" x="16" y="6"  width="3" height="14.5" />
    <g className="trend">
      <path d="M14 6 L20 3 L20 9" />
      <line x1="20" y1="3" x2="14" y2="9" />
    </g>
  </svg>
);

export const IconBrand = ({ className, ...rest }: IconProps) => (
  <svg {...baseAttrs} {...rest} className={cn("i-brand", className)}>
    <circle cx="12" cy="12" r="9" />
    <g className="star">
      <line x1="12" y1="6"   x2="12" y2="18" />
      <line x1="6"  y1="12"  x2="18" y2="12" />
      <line x1="7.8"  y1="7.8"  x2="16.2" y2="16.2" />
      <line x1="16.2" y1="7.8"  x2="7.8"  y2="16.2" />
    </g>
  </svg>
);

export const IconThumbnail = ({ className, ...rest }: IconProps) => (
  <svg {...baseAttrs} {...rest} className={cn("i-thumbnail", className)}>
    <path d="M3 7 V3 H7" />
    <path d="M21 7 V3 H17" />
    <path d="M3 17 V21 H7" />
    <path d="M21 17 V21 H17" />
    <path
      className="sparkle"
      d="M12 8.5 L13.2 11.2 L16 12 L13.2 12.8 L12 15.5 L10.8 12.8 L8 12 L10.8 11.2 Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const IconDistribution = ({ className, ...rest }: IconProps) => (
  <svg {...baseAttrs} {...rest} className={cn("i-distribution", className)}>
    <circle className="hub" cx="12" cy="12" r="2.2" />
    <rect className="node node-1" x="2"  y="3"  width="4" height="4" />
    <rect className="node node-2" x="18" y="3"  width="4" height="4" />
    <rect className="node node-3" x="2"  y="17" width="4" height="4" />
    <rect className="node node-4" x="18" y="17" width="4" height="4" />
    <line x1="6"  y1="5"  x2="10.4" y2="10.4" />
    <line x1="18" y1="5"  x2="13.6" y2="10.4" />
    <line x1="6"  y1="19" x2="10.4" y2="13.6" />
    <line x1="18" y1="19" x2="13.6" y2="13.6" />
  </svg>
);
