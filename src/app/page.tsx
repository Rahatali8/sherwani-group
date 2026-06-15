// Home page — sections are added one build phase at a time.
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="bg-bg">
        {/* Phase 2+ sections mount here: Hero, About, Timeline,
            Diversification, Projects, Awards, Clientele, Contact, Footer. */}
        <div className="placeholder-gradient flex h-screen items-center justify-center">
          <p className="font-display text-5xl tracking-wider text-muted/40">
            HERO — PHASE 2
          </p>
        </div>
        <div className="flex h-screen items-center justify-center bg-surface">
          <p className="font-display text-4xl tracking-wider text-muted/30">
            scroll to test navbar
          </p>
        </div>
      </main>
    </>
  );
}
