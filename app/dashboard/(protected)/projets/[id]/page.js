import { notFound } from "next/navigation";
import Topbar from "@/components/dashboard/Topbar";
import ProjectForm from "@/components/dashboard/ProjectForm";
import { getProjectById } from "@/lib/data";

export default async function ModifierProjetPage({ params }) {
  const project = await getProjectById(params.id);
  if (!project) notFound();

  return (
    <div>
      <Topbar title={`Modifier — ${project.titre}`} />
      <div className="p-8">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
