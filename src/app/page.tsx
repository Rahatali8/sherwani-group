// Home page — sections are added one build phase at a time.
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="bg-bg">
        <Hero />
        {/* Phase 3+ sections mount here: About, Timeline, Diversification,
            Projects, Awards, Clientele, Contact, Footer. */}
        <div className="flex h-screen items-center justify-center bg-surface">
          <p className="font-display text-4xl tracking-wider text-muted/30">
            ABOUT — PHASE 3
          </p>
        </div>
      </main>
    </>
  );
}
