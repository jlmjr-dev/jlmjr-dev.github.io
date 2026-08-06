import type { Dictionary } from "@/i18n/types";
import { links } from "@/content/links";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

interface ContactSectionProps {
  dict: Dictionary;
}

export function ContactSection({ dict }: ContactSectionProps) {
  return (
    <Section id="contact" number="05" heading={dict.contact.heading}>
      <div className="max-w-2xl">
        <Reveal>
          <p className="leading-relaxed text-muted">{dict.contact.blurb}</p>
        </Reveal>
        <Reveal delayMs={100}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${links.email}`}
              className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent"
            >
              <MailIcon className="size-4" />
              {links.email}
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-foreground/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-foreground/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </a>
          </div>
        </Reveal>
        <Reveal delayMs={180}>
          <h3 className="mt-12 font-display text-sm font-semibold uppercase tracking-wider text-accent">
            {dict.contact.languagesHeading}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {dict.contact.languages.map((language) => (
              <li
                key={language}
                className="border border-edge px-2 py-1 text-xs text-muted"
              >
                {language}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
