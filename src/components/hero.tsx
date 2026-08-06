import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { cvFiles, links } from "@/content/links";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";

type PopStyle = CSSProperties & { "--pop-delay": string };

function popDelay(ms: number): PopStyle {
  return { "--pop-delay": `${ms}ms` };
}

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  return (
    <div id="top">
      <div className="mx-auto flex min-h-[88svh] max-w-5xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6">
        <p
          className="hero-pop font-display text-lg italic text-muted"
          style={popDelay(0)}
        >
          {dict.hero.greeting}
        </p>
        <h1
          className="hero-pop mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-8xl"
          style={popDelay(100)}
        >
          José Luiz
          <br />
          <span className="text-accent">Monteiro Junior</span>
        </h1>
        <p
          className="hero-pop mt-6 border-l-2 border-accent pl-4 text-lg font-medium sm:text-xl"
          style={popDelay(200)}
        >
          {dict.hero.role}
        </p>
        <p className="hero-pop mt-4 max-w-xl leading-relaxed text-muted" style={popDelay(300)}>
          {dict.hero.tagline}
        </p>
        <div className="hero-pop mt-10 flex flex-wrap items-center gap-3" style={popDelay(400)}>
          <a
            href={cvFiles[locale]}
            download
            className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent"
          >
            <DownloadIcon className="size-4" />
            {dict.hero.downloadCv}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center border border-foreground/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            {dict.hero.contactMe}
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex size-11 items-center justify-center border border-edge text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <GitHubIcon className="size-5" />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex size-11 items-center justify-center border border-edge text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <LinkedInIcon className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
