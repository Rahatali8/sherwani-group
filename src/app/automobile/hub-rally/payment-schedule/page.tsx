import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectPaymentSchedule from "@/components/sections/ProjectPaymentSchedule";
import { hubRally as project } from "@/data/content";

export const metadata: Metadata = {
  title: `${project.name} — Payment Schedule`,
  description: `Payment plan and options for ${project.name}.`,
};

export default function HubRallyPaymentPage() {
  return (
    <>
      <Navbar />
      <ProjectPaymentSchedule
        project={project as any}
        projectHref="/automobile/hub-rally"
      />
      <Footer />
    </>
  );
}
