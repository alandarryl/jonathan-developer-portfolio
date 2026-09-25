import Card from "@/components/ui/Card";

const categoryOrder = [
  "Frontend",
  "Backend",
  "Data & IA",
  "Outils & Méthodologie",
  "Autre",
];

export default function SkillsGrid({ skills }) {
  const grouped = categoryOrder
    .map((cat) => ({
      categorie: cat,
      items: skills.filter((s) => s.categorie === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {grouped.map((group) => (
        <Card key={group.categorie} className="p-6">
          <h3 className="font-display text-base font-semibold text-ink-50">
            {group.categorie}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {group.items.map((skill) => (
              <li key={skill._id} className="flex items-center justify-between gap-4">
                <span className="text-sm text-ink-200">{skill.nom}</span>
                <span className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-4 rounded-full ${
                        i < skill.niveau ? "bg-mint-400" : "bg-ink-600"
                      }`}
                    />
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
