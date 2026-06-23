import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import { hubValley as project } from "@/data/content";

export const metadata: Metadata = {
  title: `${project.name} — Sherwani Builders`,
  description: project.about.body.slice(0, 155),
};

export default function HubValleyPage() {
  return (
    <>
      <Navbar />
      <ProjectShowcase project={project} />
      <Footer />
    </>
  );
}
