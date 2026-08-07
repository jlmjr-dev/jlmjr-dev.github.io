import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { highScores } from "@/content/hiscores";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

const RANKS = ["1ST", "2ND", "3RD", "4TH", "5TH", "6TH"];

interface HiscoresSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function HiscoresSection({ locale, dict }: HiscoresSectionProps) {
  return (
    <Section id="hiscores" heading={dict.cabinet.hiscores}>
      <Reveal>
        <div className="pixel-card max-w-2xl p-6">
          <table className="w-full font-display text-xs sm:text-sm">
            <tbody>
              {highScores.map((entry, index) => (
                <tr key={entry.score} className="border-b-2 border-edge last:border-b-0">
                  <td className="py-2.5 pr-4 text-accent-alt">{RANKS[index]}</td>
                  <td className="py-2.5 pr-4 text-right font-bold text-accent">{entry.score}</td>
                  <td className="py-2.5 uppercase text-muted">{entry.label[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
