import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/site/ProjectCard";
import { getProjects } from "@/lib/data";

export const metadata = {
  title: "Projets — Jonathan Okana",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-content px-6 py-20">
      <SectionHeading
        index="02"
        title="Projets"
        description="Une sélection de projets personnels et de missions freelance, avec le détail technique de chacun."
      />

      {projects.length === 0 ? (
        <p className="mt-12 text-ink-400">
          Aucun projet publié pour le moment.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
