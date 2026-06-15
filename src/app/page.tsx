// Home page — sections are added one build phase at a time.
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import Diversification from "@/components/sections/Diversification";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="bg-bg">
        <Hero />
        <About />
        <Timeline />
        <Diversification />
        <Projects />
        {/* Phase 7+ sections mount here: Awards, Clientele, Contact, Footer. */}
        <div className="flex h-screen items-center justify-center bg-bg">
          <p className="font-display text-4xl tracking-wider text-muted/30">
            AWARDS — PHASE 7
          </p>
        </div>
      </main>
    </>
  );
}
