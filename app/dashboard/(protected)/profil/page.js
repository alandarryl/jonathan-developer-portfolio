import Topbar from "@/components/dashboard/Topbar";
import ProfileForm from "@/components/dashboard/ProfileForm";
import { getProfile } from "@/lib/data";

export default async function ProfilDashboardPage() {
  const profile = await getProfile();

  return (
    <div>
      <Topbar
        title="Profil"
        description="Ces informations alimentent la page d'accueil, la page à propos et le pied de page du site."
      />
      <div className="p-8">
        <ProfileForm initialProfile={profile} />
      </div>
    </div>
  );
}
