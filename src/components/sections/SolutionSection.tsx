import { Tag } from "@/components/shared/Tag";
import {
  IconShortForm,
  IconLongForm,
  IconAdCreative,
  IconBrand,
  IconThumbnail,
  IconDistribution,
} from "@/components/icons/ServiceIcons";

const SERVICES = [
  { num: "01", Icon: IconShortForm,    title: "Short-Form Content", desc: "Reels, Shorts, TikTok — built for the scroll." },
  { num: "02", Icon: IconLongForm,     title: "Long-Form Editing",  desc: "YouTube, podcasts, documentaries with retention edits." },
  { num: "03", Icon: IconAdCreative,   title: "Ad Creative",        desc: "Direct-response video ads engineered to convert." },
  { num: "04", Icon: IconBrand,        title: "Brand Strategy",     desc: "Content calendar, scripting, hook engineering." },
  { num: "05", Icon: IconThumbnail,    title: "Thumbnails + GFX",   desc: "Visual identity for every upload, every channel." },
  { num: "06", Icon: IconDistribution, title: "Distribution",       desc: "Scheduling, cross-posting, publishing — handled." },
];

export const SolutionSection = () => (
  <section id="solution" style={{ background: "var(--black)" }}>
    <img
      src="/logo-main.svg"
      alt=""
      aria-hidden
      className="solution-bg-mark"
    />
    <div className="container-edge section-pad" style={{ position: "relative", zIndex: 1 }}>
      <header className="snap-content" style={{ textAlign: "center", marginBottom: "64px" }}>
        <Tag>The System</Tag>
        <h2 className="display-m" style={{ color: "var(--white-c)", marginTop: "28px" }}>
          THE MVD<br />
          PRODUCTION<br />
          <span style={{ color: "var(--blue)" }}>ENGINE.</span>
        </h2>
      </header>

      <div className="service-grid">
        {SERVICES.map((s) => (
          <article key={s.num} className="service-card stagger-child">
            <span className="num">{s.num}</span>
            <span className="icon"><s.Icon /></span>
            <h3 className="title">{s.title}</h3>
            <p className="desc">{s.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
