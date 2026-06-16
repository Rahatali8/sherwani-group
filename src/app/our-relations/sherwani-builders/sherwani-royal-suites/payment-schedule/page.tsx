import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectPaymentSchedule from "@/components/sections/ProjectPaymentSchedule";
import { royalSuites as project } from "@/data/content";

export const metadata: Metadata = {
  title: `${project.name} — Payment Schedule`,
  description: `Payment plan and unit options for ${project.name}.`,
};

export default function RoyalSuitesPaymentPage() {
  return (
    <>
      <Navbar />
      <ProjectPaymentSchedule
        project={project}
        projectHref="/our-relations/sherwani-builders/sherwani-royal-suites"
      />
      <Footer />
    </>
  );
}
