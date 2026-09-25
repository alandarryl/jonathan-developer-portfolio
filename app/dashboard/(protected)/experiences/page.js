import Topbar from "@/components/dashboard/Topbar";
import ExperiencesManager from "@/components/dashboard/ExperiencesManager";
import { getExperiences } from "@/lib/data";

export default async function ExperiencesDashboardPage() {
  const experiences = await getExperiences();

  return (
    <div>
      <Topbar
        title="Expériences"
        description="Gère le parcours professionnel affiché sur la page à propos."
      />
      <div className="p-8">
        <ExperiencesManager initialExperiences={experiences} />
      </div>
    </div>
  );
}
