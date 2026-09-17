import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects | Arka Kitchen Studio",
  description:
    "Six completed Arka kitchens across India — full case studies covering brief, materials, design highlights and project data.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
