import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { experience, type ExperienceEntry } from "@/content/experience";
import { ExternalLink } from "@/components/external-link";
import { ArrowUpRightIcon } from "@/components/icons";

interface WorkPaneProps {
  locale: Locale;
  dict: Dictionary;
}

export function WorkPane({ locale, dict }: WorkPaneProps) {
  return (
    <div>
      <p className="meta mb-4">{dict.work.intro}</p>
      {experience.map((entry) => (
        <article key={entry.company} className="entry">
          <div className="entry-head">
            <h3 className="entry-role">{entry.role}</h3>
            <span className="meta">{entry.period[locale]}</span>
          </div>
          <p className="entry-org">
            <Company entry={entry} locale={locale} newTabLabel={dict.a11y.opensInNewTab} />
            {" · "}
            {entry.location[locale]}
            <Via entry={entry} locale={locale} newTabLabel={dict.a11y.opensInNewTab} />
          </p>
          <p className="mt-3 max-w-[72ch] leading-relaxed text-[color:var(--muted)]">
            {entry.summary[locale]}
          </p>
          <Highlights items={entry.highlights?.[locale]} />
          <Products entry={entry} locale={locale} newTabLabel={dict.a11y.opensInNewTab} />
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {entry.tech.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        </article>
      ))}
      <p className="meta mt-5">{dict.work.fullCv}</p>
    </div>
  );
}

interface EntryPartProps {
  entry: ExperienceEntry;
  locale: Locale;
  newTabLabel: string;
}

/* The company name is the link, so the name is not repeated as a bare URL. */
function Company({ entry, locale, newTabLabel }: EntryPartProps) {
  const url = entry.companyUrl?.[locale];
  if (!url) {
    return <span className="entry-company">{entry.company}</span>;
  }
  return (
    <ExternalLink href={url} newTabLabel={newTabLabel} className="link font-semibold">
      {entry.company}
    </ExternalLink>
  );
}

function Via({ entry, locale, newTabLabel }: EntryPartProps) {
  if (!entry.via) {
    return null;
  }
  const url = entry.via.url?.[locale];
  const name = entry.via.name[locale];
  return (
    <>
      {" · via "}
      {url ? (
        <ExternalLink href={url} newTabLabel={newTabLabel}>
          {name}
        </ExternalLink>
      ) : (
        name
      )}
    </>
  );
}

function Products({ entry, locale, newTabLabel }: EntryPartProps) {
  if (!entry.products || entry.products.length === 0) {
    return null;
  }
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
      {entry.products.map((product) => (
        <li key={product.name}>
          <ExternalLink
            href={product.url[locale]}
            newTabLabel={newTabLabel}
            className="link inline-flex items-center gap-1 text-sm font-semibold"
          >
            {product.name}
            <ArrowUpRightIcon className="size-3" />
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}

function Highlights({ items }: { items?: string[] }) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <ul className="entry-list mt-3">
      {items.map((item) => (
        <li key={item.slice(0, 32)}>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
