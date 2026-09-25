import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/site/Hero";
import ProjectCard from "@/components/site/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { getProfile, getProjects, getExperiences } from "@/lib/data";

export default async function HomePage() {
  const [profile, projects, experiences] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperiences(),
  ]);

  const featured = projects.filter((p) => p.enVedette).slice(0, 3);
  const displayProjects = featured.length > 0 ? featured : projects.slice(0, 3);
  const currentExperience = experiences[0];

  return (
    <>
      <Hero profile={profile} />

      <section className="mx-auto max-w-content px-6 py-20">
        <div className="grid gap-10 sm:grid-cols-3">
          <Card className="p-6">
            <p className="font-mono text-xs text-ink-400">Aujourd'hui</p>
            <p className="mt-2 font-display text-lg text-ink-50">
              {currentExperience
                ? `${currentExperience.poste} — ${currentExperience.entreprise}`
                : "En recherche d'alternance"}
            </p>
          </Card>
          <Card className="p-6">
            <p className="font-mono text-xs text-ink-400">Formation</p>
            <p className="mt-2 font-display text-lg text-ink-50">
              {profile?.formations?.[0]?.diplome || "Bachelor Développement Web"}
            </p>
          </Card>
          <Card className="p-6">
            <p className="font-mono text-xs text-ink-400">Basé à</p>
            <p className="mt-2 font-display text-lg text-ink-50">
              {profile?.localisation || "Île-de-France"}
            </p>
          </Card>
        </div>
      </section>

      {displayProjects.length > 0 && (
        <section className="mx-auto max-w-content px-6 py-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              index="01"
              title="Projets récents"
              description="Une sélection d'applications conçues de bout en bout, du modèle de données à l'interface."
            />
            <Link
              href="/projets"
              className="inline-flex items-center gap-1.5 text-sm text-mint-300 hover:text-mint-400"
            >
              Tous les projets
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-content px-6 py-20">
        <Card className="flex flex-col items-start gap-4 p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-50">
              Une alternance à pourvoir ?
            </h2>
            <p className="mt-2 max-w-lg text-ink-300">
              Rythme 3 jours entreprise / 2 jours école. Disponible pour échanger sur un poste de développeur fullstack ou IA.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-md bg-mint-300 px-5 py-3 text-sm font-medium text-ink-900 hover:bg-mint-400"
          >
            Me contacter
            <ArrowUpRight size={16} />
          </Link>
        </Card>
      </section>
    </>
  );
}
