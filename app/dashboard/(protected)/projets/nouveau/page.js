import Topbar from "@/components/dashboard/Topbar";
import ProjectForm from "@/components/dashboard/ProjectForm";

export default function NouveauProjetPage() {
  return (
    <div>
      <Topbar
        title="Nouveau projet"
        description="Renseigne les informations du projet à publier."
      />
      <div className="p-8">
        <ProjectForm />
      </div>
    </div>
  );
}
