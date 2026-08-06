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
    <Section id="experience" number="02" heading={dict.experience.heading}>
      <ol className="relative space-y-12 border-l border-edge pl-8">
        {experience.map((entry, index) => (
          <li key={entry.company} className="relative">
            <Reveal delayMs={index * 80}>
              <ExperienceItem entry={entry} locale={locale} />
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
