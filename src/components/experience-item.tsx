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
        className="absolute -left-[38px] top-1.5 size-3 bg-accent ring-4 ring-background"
        aria-hidden
      />
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display text-lg font-semibold">{entry.role}</h3>
        <span className="font-mono text-xs text-muted">{entry.period[locale]}</span>
      </header>
      <p className="mt-1 text-sm">
        <span className="font-medium text-accent">{entry.company}</span>
        <span className="text-muted"> · {entry.location[locale]}</span>
      </p>
      <ExperienceSummary text={entry.summary?.[locale]} />
      <ExperienceHighlights items={entry.highlights?.[locale]} />
      <ul className="mt-4 flex flex-wrap gap-2">
        {entry.tech.map((tech) => (
          <TechChip key={tech} label={tech} />
        ))}
      </ul>
    </article>
  );
}

function ExperienceSummary({ text }: { text?: string }) {
  if (!text) {
    return null;
  }
  return <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{text}</p>;
}

function ExperienceHighlights({ items }: { items?: string[] }) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <ul className="mt-3 max-w-3xl space-y-2">
      {items.map((item) => (
        <li key={item.slice(0, 32)} className="flex gap-2.5 text-sm leading-relaxed text-muted">
          <span className="mt-px select-none text-accent" aria-hidden>
            •
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
