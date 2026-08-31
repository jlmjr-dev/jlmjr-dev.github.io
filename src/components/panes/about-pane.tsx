import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { education } from "@/content/education";
import { ExternalLink } from "@/components/external-link";

interface AboutPaneProps {
  locale: Locale;
  dict: Dictionary;
}

export function AboutPane({ locale, dict }: AboutPaneProps) {
  return (
    <div className="about-layout">
      <div className="prose flex flex-col gap-4">
        {dict.about.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <div className="facts">
        <Fact label={dict.about.languagesHeading}>
          <ul>
            {dict.about.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </Fact>
        <Fact label={dict.about.educationHeading}>
          <ul className="flex flex-col gap-2">
            {education.map((entry) => (
              <li key={entry.school}>
                <span className="block text-[color:var(--fg)]">{entry.degree[locale]}</span>
                <span className="meta">
                  {entry.schoolUrl ? (
                    <ExternalLink
                      href={entry.schoolUrl[locale]}
                      newTabLabel={dict.a11y.opensInNewTab}
                    >
                      {entry.school}
                    </ExternalLink>
                  ) : (
                    entry.school
                  )}
                  , {entry.period[locale]}
                </span>
              </li>
            ))}
          </ul>
        </Fact>
      </div>
    </div>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="label">{label}</h3>
      <div className="mt-2 leading-relaxed text-[color:var(--muted)]">{children}</div>
    </section>
  );
}
