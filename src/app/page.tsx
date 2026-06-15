// Home page — sections are added one build phase at a time.
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="bg-bg">
        <Hero />
        <About />
        {/* Phase 4+ sections mount here: Timeline, Diversification,
            Projects, Awards, Clientele, Contact, Footer. */}
        <div className="flex h-screen items-center justify-center bg-surface">
          <p className="font-display text-4xl tracking-wider text-muted/30">
            TIMELINE — PHASE 4
          </p>
        </div>
      </main>
    </>
  );
}
