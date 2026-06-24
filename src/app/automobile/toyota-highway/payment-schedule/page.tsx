import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import ProjectPaymentSchedule from "@/components/sections/ProjectPaymentSchedule";
// 1. Bloom Gardens ki jagah Toyota Highway ka data import karein
import { toyotaHighway as project } from "@/data/content"; 

export const metadata: Metadata = {
  // Ab ye automatic "Toyota Highway Motor — Payment Schedule" ban jayega
  title: `${project.name} — Payment Schedule`,
  description: `Payment plan and options for ${project.name}.`,
};

export default function ToyotaHighwayPaymentPage() {
  return (
    <>
      <Navbar />
      <ProjectPaymentSchedule
  project={project as any} // TypeScript ab error nahi dega
  projectHref="/automobile/toyota-highway" 

/>
   <ProjectShowcase project={project} />
      <Footer />
    </>
  );
}