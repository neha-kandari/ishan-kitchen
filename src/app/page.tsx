import Hero from "@/components/sections/Hero";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import KitchenComparison from "@/components/sections/KitchenComparison";
import BrandStatement from "@/components/sections/BrandStatement";
import Marquee from "@/components/sections/Marquee";
import MaterialReel from "@/components/sections/MaterialReel";
import StoneBenefits from "@/components/sections/StoneBenefits";
import NumbersSection from "@/components/sections/NumbersSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FaqSection from "@/components/sections/FaqSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsShowcase />
      <KitchenComparison />
      <BrandStatement />
      <Marquee />
      <MaterialReel />
      <StoneBenefits />
      <NumbersSection />
      <ProcessSection />
      <ReviewsSection />
      <FaqSection />
      <FinalCTA />
    </>
  );
}
