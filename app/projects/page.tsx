import { projects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects",
  description:
    "Explore my GitHub projects and contributions in backend engineering.",
};

export default function ProjectsPage() {
  const sorted = [...projects].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  );

  return (
    <div className="container-section py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4">
          Projects
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          A selection of projects showcasing backend engineering, distributed
          systems, and DevOps expertise.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
