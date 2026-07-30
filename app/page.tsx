import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { MissionSection } from "@/components/MissionSection";
import { HowItWorks } from "@/components/HowItWorks";
import { ProgramsSection } from "@/components/ProgramsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <StatsBar />
        <MissionSection />
        <HowItWorks />
        <ProgramsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
