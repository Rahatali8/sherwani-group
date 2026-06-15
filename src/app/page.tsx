// Home page — sections are added one build phase at a time.
// Phase 0: dark blank canvas with smooth scroll active.

export default function Home() {
  return (
    <main id="home" className="min-h-[200vh] bg-bg">
      {/* Phase 1+ sections mount here: Navbar, Hero, About, Timeline,
          Diversification, Projects, Awards, Clientele, Contact, Footer. */}
      <div className="flex h-screen items-center justify-center">
        <p className="font-display text-4xl tracking-wider text-muted/40">
          SHERWANI GROUP
        </p>
      </div>
    </main>
  );
}
