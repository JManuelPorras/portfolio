import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { About } from "@/components/About";
import { Expertise } from "@/components/Expertise";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { PointerGlow, ScrollProgress } from "@/components/ui/Motion";

export default function Home() {
  return (
    <>
      <InteractiveBackground />
      <div aria-hidden className="grain" />
      <ScrollProgress />
      <PointerGlow />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Expertise />
        <TechStack />
        <Experience />
        <Projects />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
