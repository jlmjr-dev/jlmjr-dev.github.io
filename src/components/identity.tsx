import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { cvFiles, links } from "@/content/links";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { SkinToggle } from "@/components/skin-toggle";

interface IdentityProps {
  locale: Locale;
  dict: Dictionary;
}

export function Identity({ locale, dict }: IdentityProps) {
  // A <header> rather than <aside>: this column carries the page h1.
  return (
    <header className="aside">
      <div className="aside-top">
        <h1 className="brand">
          {/* Trailing space keeps the h1's text content readable as one name. */}
          <span className="block">José Luiz </span>
          <span className="block">Monteiro Junior</span>
        </h1>
        <p className="aside-role mt-2 text-sm">{dict.identity.role}</p>
        <p className="meta mt-1">{dict.identity.focus}</p>
      </div>

      <p className="aside-tagline">{dict.identity.tagline}</p>

      <div className="aside-actions">
        <p className="aside-where meta">
          {dict.identity.location}
          <br />
          {dict.identity.availability}
        </p>
        <a href={cvFiles[locale]} download className="btn btn-primary">
          <DownloadIcon className="size-4" />
          {dict.identity.downloadCv}
        </a>
        <div className="aside-icons">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="icon-btn"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="icon-btn"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <a
            href={`mailto:${links.email}`}
            aria-label={`${dict.a11y.email}: ${links.email}`}
            className="icon-btn"
          >
            <MailIcon className="size-4" />
          </a>
          <LanguageToggle locale={locale} label={dict.a11y.switchLocale} />
          <ThemeToggle
            labelToLight={dict.a11y.switchToLight}
            labelToDark={dict.a11y.switchToDark}
          />
        </div>
      </div>

      <SkinToggle label={dict.a11y.skinGroup} names={dict.skins} />
    </header>
  );
}
