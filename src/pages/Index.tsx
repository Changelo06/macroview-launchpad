import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollDots } from "@/components/ScrollDots";
import { CustomCursor } from "@/components/CustomCursor";
import { GrainOverlay } from "@/components/GrainOverlay";
import { CtaBand } from "@/components/CtaBand";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { WhySection } from "@/components/sections/WhySection";
import { WhoSection } from "@/components/sections/WhoSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { BookSection } from "@/components/sections/BookSection";
import { useScrollDots } from "@/hooks/useScrollDots";
import { useSnapObserver } from "@/hooks/useSnapObserver";

const Index = () => {
  const { activeId, scrolled } = useScrollDots();
  useSnapObserver("#snap-root", true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      <Navbar scrolled={scrolled} />
      <ScrollDots activeId={activeId} />

      <main id="snap-root">
        <HeroSection />
        <CtaBand variant="intro" />
        <ProblemSection />
        <CtaBand variant="pivot" />
        <SolutionSection />
        <CtaBand variant="portfolio" />
        <PortfolioSection />
        <ResultsSection />
        <CtaBand variant="why" />
        <WhySection />
        <WhoSection />
        <CtaBand variant="faq" />
        <FaqSection />
        <BookSection />
      </main>
    </>
  );
};

export default Index;
