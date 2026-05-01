export type PortfolioCategory =
  | "Short-Form"
  | "Long-Form"
  | "Reels"
  | "Ads"
  | "Thumbnails"
  | "Brand";

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  span?: "tall" | "wide" | "standard";
  imagePath?: string;
  videoPath?: string;
  gradientFallback: string;
  client?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    title: "YouTube Series Edit",
    category: "Long-Form",
    span: "tall",
    videoPath: "/video-asset/long-form.mp4",
    gradientFallback: "linear-gradient(135deg, #0d1828, #081220)",
  },
  {
    id: "p2",
    title: "Brand Reel",
    category: "Reels",
    videoPath: "/video-asset/brand.mp4",
    gradientFallback: "linear-gradient(135deg, #0e0d1a, #12101e)",
  },
  {
    id: "p3",
    title: "Coaching Ad",
    category: "Ads",
    videoPath: "/video-asset/scrolling.mp4",
    gradientFallback: "linear-gradient(135deg, #0a1510, #0d1a14)",
  },
  {
    id: "p4",
    title: "Lifestyle Documentary",
    category: "Short-Form",
    videoPath: "/video-asset/lifestyle.mp4",
    gradientFallback: "linear-gradient(135deg, #1a0d0d, #120808)",
  },
  {
    id: "p5",
    title: "Podcast Clips Series",
    category: "Short-Form",
    videoPath: "/video-asset/podcast.mp4",
    gradientFallback: "linear-gradient(135deg, #0f0a18, #150e22)",
  },
  {
    id: "p6",
    title: "Product Launch Video",
    category: "Ads",
    videoPath: "/video-asset/product-launch.mp4",
    gradientFallback: "linear-gradient(135deg, #0a0e1a, #0c1222)",
  },
];
