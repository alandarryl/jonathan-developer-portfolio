import Badge from "@/components/ui/Badge";

export default function Timeline({ experiences }) {
  return (
    <ol className="relative flex flex-col gap-10 border-l border-ink-600 pl-8">
      {experiences.map((exp) => (
        <li key={exp._id} className="relative">
          <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full border-2 border-mint-300 bg-ink-900" />

          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-lg font-semibold text-ink-50">
              {exp.poste}
            </h3>
            <span className="font-mono text-xs text-ink-400">{exp.periode}</span>
          </div>

          <p className="mt-1 text-sm text-mint-300">
            {exp.entreprise}
            {exp.lieu ? ` — ${exp.lieu}` : ""}
          </p>

          {exp.points?.length > 0 && (
            <ul className="mt-4 flex flex-col gap-2">
              {exp.points.map((point, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-300">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-ink-500" />
                  {point}
                </li>
              ))}
            </ul>
          )}

          {exp.technologies?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
