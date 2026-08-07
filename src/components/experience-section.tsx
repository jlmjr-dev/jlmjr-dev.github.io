import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { experience } from "@/content/experience";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ExperienceItem } from "@/components/experience-item";

interface ExperienceSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function ExperienceSection({ locale, dict }: ExperienceSectionProps) {
  return (
    <Section id="experience" heading={dict.experience.heading}>
      <div className="flex flex-col gap-5">
        {experience.map((entry, index) => (
          <Reveal key={entry.company} delayMs={index * 80}>
            <div className="rounded-lg border border-edge bg-surface p-6">
              <ExperienceItem entry={entry} locale={locale} deployedLabel={dict.dashboard.deployed} />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
