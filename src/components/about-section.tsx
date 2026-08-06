import type { Dictionary } from "@/i18n/types";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

interface AboutSectionProps {
  dict: Dictionary;
}

export function AboutSection({ dict }: AboutSectionProps) {
  return (
    <Section id="about" number="01" heading={dict.about.heading}>
      <div className="max-w-3xl space-y-5">
        {dict.about.paragraphs.map((paragraph, index) => (
          <Reveal key={paragraph.slice(0, 24)} delayMs={index * 80}>
            <p className="leading-relaxed text-muted">{paragraph}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
