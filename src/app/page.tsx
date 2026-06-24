// Home page — sections are added one build phase at a time.
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import Projects from "@/components/sections/Projects";
import Awards from "@/components/sections/Awards";
import Clientele from "@/components/sections/Clientele";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="bg-bg">
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Awards />
        <Clientele />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
