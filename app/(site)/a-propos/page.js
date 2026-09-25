import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillsGrid from "@/components/site/SkillsGrid";
import Timeline from "@/components/site/Timeline";
import Card from "@/components/ui/Card";
import { getProfile, getSkills, getExperiences } from "@/lib/data";

export const metadata = {
  title: "À propos — Jonathan Okana",
};

export default async function AboutPage() {
  const [profile, skills, experiences] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperiences(),
  ]);

  return (
    <div className="mx-auto max-w-content px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-6">
          <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-xl border border-ink-600 bg-ink-800">
            {profile?.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.nomComplet}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-xs text-ink-500">
                Photo
              </div>
            )}
          </div>

          <div>
            <h1 className="font-display text-xl font-semibold text-ink-50">
              {profile?.nomComplet}
            </h1>
            <p className="mt-1 text-sm text-mint-300">{profile?.titre}</p>
          </div>

          {profile?.formations?.length > 0 && (
            <div>
              <p className="font-mono text-xs text-ink-400">Formation</p>
              <ul className="mt-3 flex flex-col gap-3">
                {profile.formations.map((f, i) => (
                  <li key={i}>
                    <p className="text-sm text-ink-100">{f.diplome}</p>
                    <p className="text-xs text-ink-400">
                      {f.etablissement} · {f.periode}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {profile?.langues?.length > 0 && (
            <div>
              <p className="font-mono text-xs text-ink-400">Langues</p>
              <p className="mt-2 text-sm text-ink-200">
                {profile.langues.join(" · ")}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-20">
          <div>
            <SectionHeading index="01" title="Présentation" />
            <p className="mt-6 max-w-2xl whitespace-pre-line leading-relaxed text-ink-300">
              {profile?.bio}
            </p>
          </div>

          <div>
            <SectionHeading
              index="02"
              title="Compétences"
              description="Stack principale, classée par domaine."
            />
            <div className="mt-8">
              <SkillsGrid skills={skills} />
            </div>
          </div>

          <div>
            <SectionHeading
              index="03"
              title="Parcours professionnel"
              description="Expériences en freelance et en stage, de la plus récente à la plus ancienne."
            />
            <div className="mt-10">
              <Timeline experiences={experiences} />
            </div>
          </div>

          {profile?.interets?.length > 0 && (
            <Card className="p-6">
              <p className="font-mono text-xs text-ink-400">Centres d'intérêt</p>
              <p className="mt-2 text-sm text-ink-200">
                {profile.interets.join(" · ")}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
