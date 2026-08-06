import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { projects } from "@/content/projects";
import { links } from "@/content/links";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { ArrowUpRightIcon } from "@/components/icons";

interface ProjectsSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function ProjectsSection({ locale, dict }: ProjectsSectionProps) {
  return (
    <Section
      id="projects"
      number="03"
      heading={dict.projects.heading}
      intro={dict.projects.intro}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.name} delayMs={index * 100} className="h-full">
            <ProjectCard
              project={project}
              locale={locale}
              viewCodeLabel={dict.projects.viewCode}
            />
          </Reveal>
        ))}
      </div>
      <Reveal delayMs={200}>
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-foreground"
        >
          {dict.projects.moreOnGitHub}
          <ArrowUpRightIcon className="size-3.5" />
        </a>
      </Reveal>
    </Section>
  );
}
