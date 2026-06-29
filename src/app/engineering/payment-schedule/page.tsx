import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectPaymentSchedule from "@/components/sections/ProjectPaymentSchedule";
import { sherwaniEngineering as project } from "@/data/content";

export const metadata: Metadata = {
  title: `${project.name} — Payment Schedule`,
  description: `Payment plan and options for ${project.name}.`,
};

export default function EngineeringPaymentPage() {
  return (
    <>
      <Navbar />
      <ProjectPaymentSchedule
        project={project as any}
        projectHref="/engineering"
      />
      <Footer />
    </>
  );
}
