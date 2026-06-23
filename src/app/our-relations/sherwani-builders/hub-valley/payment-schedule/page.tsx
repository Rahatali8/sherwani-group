import type { Metadata } from "next";
import ProjectPaymentSchedule from "@/components/sections/ProjectPaymentSchedule";
import { hubValley as project } from "@/data/content";

export const metadata: Metadata = {
  title: `Payment Schedule — ${project.name}`,
  description: `Payment plan for ${project.name}`,
};

export default function HubValleyPaymentPage() {
  return <ProjectPaymentSchedule project={project} projectHref="/our-relations/sherwani-builders/hub-valley" />;
}
