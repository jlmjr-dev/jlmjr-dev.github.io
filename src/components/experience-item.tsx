import type { Locale } from "@/i18n/config";
import type { ExperienceEntry } from "@/content/experience";
import { TechChip } from "@/components/tech-chip";

interface ExperienceItemProps {
  entry: ExperienceEntry;
  locale: Locale;
  deployedLabel: string;
}

function serviceSlug(company: string): string {
  return company
    .toLowerCase()
    .split("(")[0]
    .trim()
    .replace(/[^a-z0-9]+/g, "-");
}

export function ExperienceItem({ entry, locale, deployedLabel }: ExperienceItemProps) {
  return (
    <article>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
          {deployedLabel}
        </span>
        <span className="text-muted">{serviceSlug(entry.company)}</span>
        <span className="ml-auto text-muted">{entry.period[locale]}</span>
      </div>
      <header className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-lg font-semibold">{entry.role}</h3>
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
            ▹
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
