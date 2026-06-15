// Home page — sections are added one build phase at a time.
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="bg-bg">
        <Hero />
        <About />
        <Timeline />
        {/* Phase 5+ sections mount here: Diversification, Projects,
            Awards, Clientele, Contact, Footer. */}
        <div className="flex h-screen items-center justify-center bg-bg">
          <p className="font-display text-4xl tracking-wider text-muted/30">
            DIVERSIFICATION — PHASE 5
          </p>
        </div>
      </main>
    </>
  );
}
