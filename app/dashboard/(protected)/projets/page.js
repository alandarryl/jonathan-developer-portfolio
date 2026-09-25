import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";
import Topbar from "@/components/dashboard/Topbar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getProjects } from "@/lib/data";

export default async function ProjetsDashboardPage() {
  const projects = await getProjects();

  return (
    <div>
      <Topbar
        title="Projets"
        description="Gère les projets affichés sur le site."
        actions={
          <Link
            href="/dashboard/projets/nouveau"
            className="inline-flex items-center gap-2 rounded-md bg-mint-300 px-4 py-2.5 text-sm font-medium text-ink-900 hover:bg-mint-400"
          >
            <Plus size={16} />
            Nouveau projet
          </Link>
        }
      />

      <div className="flex flex-col gap-4 p-8">
        {projects.length === 0 && (
          <p className="text-sm text-ink-400">Aucun projet pour le moment.</p>
        )}

        {projects.map((project) => (
          <Card
            key={project._id}
            className="flex flex-wrap items-center justify-between gap-4 p-5"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <p className="font-display text-sm font-semibold text-ink-50">
                  {project.titre}
                </p>
                {project.enVedette && <Badge tone="mint">En vedette</Badge>}
                <Badge>{project.statut}</Badge>
              </div>
              <p className="mt-1 max-w-xl truncate text-xs text-ink-400">
                {project.resume}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={`/projets/${project.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs text-ink-400 hover:text-mint-300"
              >
                Voir <ExternalLink size={13} />
              </Link>
              <Link
                href={`/dashboard/projets/${project._id}`}
                className="rounded-md border border-ink-500 px-3.5 py-2 text-xs text-ink-100 hover:border-mint-300 hover:text-mint-300"
              >
                Modifier
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
