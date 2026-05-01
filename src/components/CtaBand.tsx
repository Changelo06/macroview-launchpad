import { CTA_BANDS, type CtaBandVariant } from "@/data/sections";
import { scrollToSection } from "@/hooks/useScrollDots";

interface CtaBandProps {
  variant: CtaBandVariant;
}

export const CtaBand = ({ variant }: CtaBandProps) => {
  const cfg = CTA_BANDS[variant];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cfg.isExternal) return;
    e.preventDefault();
    const id = cfg.href.replace("#", "");
    scrollToSection(id);
  };

  return (
    <div className="cta-band" data-variant={variant}>
      <div className="cta-band-inner snap-content">
        <h3 className="cta-band-headline">{cfg.headline}</h3>
        <a
          href={cfg.href}
          className="btn btn-primary"
          target={cfg.isExternal ? "_blank" : undefined}
          rel={cfg.isExternal ? "noopener noreferrer" : undefined}
          onClick={handleClick}
        >
          {cfg.cta}
        </a>
      </div>
    </div>
  );
};
