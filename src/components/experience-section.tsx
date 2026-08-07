import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { experience, type ExperienceEntry } from "@/content/experience";
import { bachelorDegree, gameDesignDegree } from "@/content/education";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { GitLog, type GitItem } from "@/components/git/git-log";

interface ExperienceSectionProps {
  locale: Locale;
  dict: Dictionary;
}

function branchSlug(company: string): string {
  return company
    .toLowerCase()
    .split("(")[0]
    .trim()
    .replace(/[^a-z0-9]+/g, "-");
}

function toBranch(entry: ExperienceEntry, locale: Locale): GitItem {
  const commits = entry.highlights?.[locale] ?? [entry.summary?.[locale] ?? ""];
  return {
    kind: "branch",
    branch: branchSlug(entry.company),
    company: entry.company,
    role: entry.role,
    period: entry.period[locale],
    location: entry.location[locale],
    commits: commits.filter((commit) => commit !== ""),
    tech: entry.tech,
  };
}

export function ExperienceSection({ locale, dict }: ExperienceSectionProps) {
  const [collectiveHealth, localiza, totvs, dimebras, mv] = experience;
  const items: GitItem[] = [
    toBranch(collectiveHealth, locale),
    toBranch(localiza, locale),
    toBranch(dimebras, locale),
    {
      kind: "commit",
      label: gameDesignDegree.label[locale],
      period: gameDesignDegree.period,
    },
    toBranch(totvs, locale),
    toBranch(mv, locale),
    {
      kind: "commit",
      label: bachelorDegree.label[locale],
      period: bachelorDegree.period,
    },
  ];

  return (
    <Section id="experience" heading={dict.experience.heading}>
      <Reveal>
        <GitLog items={items} />
      </Reveal>
    </Section>
  );
}
