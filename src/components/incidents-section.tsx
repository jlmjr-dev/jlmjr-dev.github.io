import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { incidents, type Incident } from "@/content/incidents";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

interface IncidentsSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function IncidentsSection({ locale, dict }: IncidentsSectionProps) {
  return (
    <Section id="incidents" heading={dict.dashboard.incidents} intro={dict.dashboard.incidentsIntro}>
      <div className="flex max-w-3xl flex-col gap-4">
        {incidents.map((incident, index) => (
          <Reveal key={incident.id} delayMs={index * 80}>
            <IncidentCard incident={incident} locale={locale} resolvedLabel={dict.dashboard.resolved} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

interface IncidentCardProps {
  incident: Incident;
  locale: Locale;
  resolvedLabel: string;
}

function IncidentCard({ incident, locale, resolvedLabel }: IncidentCardProps) {
  return (
    <article className="rounded-lg border border-edge bg-surface p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-mono text-muted">{incident.id}</span>
        <SeverityChip severity={incident.severity} label={incident.severityLabel[locale]} />
        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
          {resolvedLabel}
        </span>
      </div>
      <h3 className="mt-2.5 font-semibold leading-snug">{incident.title[locale]}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{incident.fix[locale]}</p>
    </article>
  );
}

function SeverityChip({ severity, label }: { severity: "high" | "medium"; label: string }) {
  const classes =
    severity === "high"
      ? "border-red-500/50 text-red-600 dark:text-red-400"
      : "border-amber-500/50 text-amber-600 dark:text-amber-400";
  return <span className={`rounded-md border px-1.5 py-0.5 uppercase ${classes}`}>{label}</span>;
}
