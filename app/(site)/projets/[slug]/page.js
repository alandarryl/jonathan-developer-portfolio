import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { getProjectBySlug, getProjects } from "@/lib/data";

export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.titre} — Jonathan Okana`,
    description: project.resume,
  };
}

export default async function ProjectDetailPage({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-content px-6 py-20">
      <Link
        href="/projets"
        className="inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-mint-300"
      >
        <ArrowLeft size={15} />
        Tous les projets
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-semibold text-ink-50 sm:text-4xl">
              {project.titre}
            </h1>
            <Badge tone="mint">{project.statut}</Badge>
          </div>

          <p className="mt-4 max-w-2xl text-lg text-ink-300">
            {project.resume}
          </p>

          <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-xl border border-ink-600 bg-ink-800">
            {project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.titre}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-xs text-ink-500">
                {project.titre}
              </div>
            )}
          </div>

          {project.description && (
            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold text-ink-50">
                À propos du projet
              </h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-ink-300">
                {project.description}
              </p>
            </div>
          )}

          {project.points?.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold text-ink-50">
                Points clés
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {project.points.map((point, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-300">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-mint-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.galerie?.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold text-ink-50">
                Galerie
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {project.galerie.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-video overflow-hidden rounded-lg border border-ink-600 bg-ink-800"
                  >
                    <Image
                      src={src}
                      alt={`${project.titre} — image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-6">
          <Card className="p-6">
            <p className="font-mono text-xs text-ink-400">Technologies</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies?.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </Card>

          <Card className="flex flex-col gap-3 p-6">
            {project.lienDemo && (
              <a
                href={project.lienDemo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-mint-300 px-4 py-2.5 text-sm font-medium text-ink-900 hover:bg-mint-400"
              >
                Voir la démo
                <ExternalLink size={15} />
              </a>
            )}
            {project.lienGithub && (
              <a
                href={project.lienGithub}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-ink-500 px-4 py-2.5 text-sm font-medium text-ink-100 hover:border-mint-300 hover:text-mint-300"
              >
                Voir le code
                <Github size={15} />
              </a>
            )}
            {!project.lienDemo && !project.lienGithub && (
              <p className="text-center text-xs text-ink-500">
                Liens non renseignés.
              </p>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}
