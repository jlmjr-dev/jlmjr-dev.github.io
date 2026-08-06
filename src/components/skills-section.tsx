import type { Dictionary } from "@/i18n/types";
import { skillGroups } from "@/content/skills";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { TechChip } from "@/components/tech-chip";

interface SkillsSectionProps {
  dict: Dictionary;
}

export function SkillsSection({ dict }: SkillsSectionProps) {
  return (
    <Section id="skills" heading={dict.skills.heading}>
      <div className="grid gap-6 sm:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.key} delayMs={index * 100} className="h-full">
            <div className="pixel-card h-full p-6">
              <h3 className="font-display text-xs font-bold uppercase text-accent">
                {dict.skills.groups[group.key]}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TechChip key={item} label={item} />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
