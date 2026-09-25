import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/projets/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-ink-600 bg-ink-800/40 transition-colors hover:border-mint-400/50"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-ink-600 bg-ink-700">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.titre}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs text-ink-500">
            {project.titre}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-ink-50">
            {project.titre}
          </h3>
          <ArrowUpRight
            size={18}
            className="mt-1 flex-shrink-0 text-ink-400 transition-colors group-hover:text-mint-300"
          />
        </div>

        <p className="text-sm leading-relaxed text-ink-300">{project.resume}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.technologies?.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
