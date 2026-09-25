import Topbar from "@/components/dashboard/Topbar";
import SkillsManager from "@/components/dashboard/SkillsManager";
import { getSkills } from "@/lib/data";

export default async function CompetencesDashboardPage() {
  const skills = await getSkills();

  return (
    <div>
      <Topbar
        title="Compétences"
        description="Gère la liste des technologies affichées sur la page à propos."
      />
      <div className="p-8">
        <SkillsManager initialSkills={skills} />
      </div>
    </div>
  );
}
