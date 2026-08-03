import type { Locale } from "@/i18n/config";
import type { ExperienceEntry } from "@/content/experience";
import { TechChip } from "@/components/tech-chip";

interface ExperienceItemProps {
  entry: ExperienceEntry;
  locale: Locale;
}

export function ExperienceItem({ entry, locale }: ExperienceItemProps) {
  return (
    <article>
      <span
        className="absolute -left-[38px] top-1.5 size-3 rounded-full bg-accent ring-4 ring-background"
        aria-hidden
      />
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display text-lg font-semibold">{entry.role}</h3>
        <span className="font-mono text-xs text-muted">{entry.period}</span>
      </header>
      <p className="mt-1 text-sm">
        <span className="font-medium text-accent">{entry.company}</span>
        <span className="text-muted"> · {entry.location[locale]}</span>
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        {entry.summary[locale]}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {entry.tech.map((tech) => (
          <TechChip key={tech} label={tech} />
        ))}
      </ul>
    </article>
  );
}
