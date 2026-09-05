import { Hero } from "@/components/Hero";
import { MissionSection } from "@/components/MissionSection";
import { HowItWorks } from "@/components/HowItWorks";
import { AboutSection } from "@/components/AboutSection";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <MissionSection />
        <HowItWorks />
        <AboutSection />
      </main>
    </>
  );
}
