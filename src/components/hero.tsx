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
    <div id="top" className="relative overflow-hidden">
      <div className="scanlines pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto flex min-h-[92svh] max-w-5xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6">
        <p
          className="hero-pop font-display text-sm text-accent-alt"
          style={popDelay(0)}
        >
          {dict.hero.greeting}
        </p>
        <h1
          className="hero-pop mt-4 font-display text-3xl font-bold leading-snug sm:text-6xl"
          style={popDelay(100)}
        >
          José Luiz
          <br />
          <span className="text-accent">Monteiro Junior</span>
          <span className="cursor-blink ml-2 text-accent">▮</span>
        </h1>
        <p
          className="hero-pop mt-6 text-xl font-semibold sm:text-2xl"
          style={popDelay(200)}
        >
          {dict.hero.role}
        </p>
        <p className="hero-pop mt-4 max-w-xl leading-relaxed text-muted" style={popDelay(300)}>
          {dict.hero.tagline}
        </p>
        <div className="hero-pop mt-10 flex flex-wrap items-center gap-4" style={popDelay(400)}>
          <a
            href={cvFiles[locale]}
            download
            className="pixel-btn inline-flex items-center gap-2 bg-accent px-5 py-2.5 text-sm font-bold text-background"
          >
            <DownloadIcon className="size-4" />
            {dict.hero.downloadCv}
          </a>
          <a
            href="#contact"
            className="pixel-btn inline-flex items-center bg-surface px-5 py-2.5 text-sm font-bold"
          >
            {dict.hero.contactMe}
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="pixel-btn flex size-11 items-center justify-center bg-surface text-foreground"
          >
            <GitHubIcon className="size-5" />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="pixel-btn flex size-11 items-center justify-center bg-surface text-foreground"
          >
            <LinkedInIcon className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
