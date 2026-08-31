import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { projects } from "@/content/projects";
import { links } from "@/content/links";
import { ArrowUpRightIcon, GitHubIcon, PlayIcon } from "@/components/icons";
import { ExternalLink } from "@/components/external-link";

interface ProjectsPaneProps {
  locale: Locale;
  dict: Dictionary;
}

export function ProjectsPane({ locale, dict }: ProjectsPaneProps) {
  return (
    <div>
      <p className="meta mb-4">{dict.projects.intro}</p>
      <div className="card-grid">
        {projects.map((project) => (
          <article key={project.name} className="card">
            <div>
              <h3 className="card-name">
                <ExternalLink
                  href={project.demoUrl ?? project.repoUrl}
                  newTabLabel={dict.a11y.opensInNewTab}
                  className=""
                >
                  {project.name}
                </ExternalLink>
              </h3>
              <p className="meta mt-0.5">{project.tagline[locale]}</p>
            </div>
            <p className="flex-1 leading-relaxed text-[color:var(--muted)]">
              {project.description[locale]}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <ExternalLink
                href={project.repoUrl}
                newTabLabel={dict.a11y.opensInNewTab}
                className="link inline-flex items-center gap-1.5 text-sm font-semibold"
              >
                <GitHubIcon className="size-4" />
                {dict.projects.viewCode}
                <ArrowUpRightIcon className="size-3.5" />
              </ExternalLink>
              {project.demoUrl ? (
                <ExternalLink
                  href={project.demoUrl}
                  newTabLabel={dict.a11y.opensInNewTab}
                  className="link inline-flex items-center gap-1.5 text-sm font-semibold"
                >
                  <PlayIcon className="size-4" />
                  {dict.projects.viewDemo}
                  <ArrowUpRightIcon className="size-3.5" />
                </ExternalLink>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      <ExternalLink
        href={links.github}
        newTabLabel={dict.a11y.opensInNewTab}
        className="link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
      >
        {dict.projects.moreOnGitHub}
        <ArrowUpRightIcon className="size-3.5" />
      </ExternalLink>
    </div>
  );
}
