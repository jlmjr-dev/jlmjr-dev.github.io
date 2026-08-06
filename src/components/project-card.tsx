import type { Locale } from "@/i18n/config";
import type { Project } from "@/content/projects";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/icons";
import { TechChip } from "@/components/tech-chip";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  viewCodeLabel: string;
}

export function ProjectCard({ project, locale, viewCodeLabel }: ProjectCardProps) {
  return (
    <article className="pixel-card flex h-full flex-col p-6">
      <h3 className="text-lg font-bold">
        <span className="mr-1.5 text-accent-alt">▶</span>
        {project.name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.description[locale]}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <TechChip key={tech} label={tech} />
        ))}
      </ul>
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline"
      >
        <GitHubIcon className="size-4" />
        {viewCodeLabel}
        <ArrowUpRightIcon className="size-3.5" />
      </a>
    </article>
  );
}
