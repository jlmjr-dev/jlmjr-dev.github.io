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
      <div className="pixel-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] size-[28rem] rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[92svh] max-w-5xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6">
        <p className="hero-pop font-mono text-sm text-accent" style={popDelay(0)}>
          {dict.hero.greeting}
        </p>
        <h1
          className="hero-pop mt-3 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
          style={popDelay(100)}
        >
          José Luiz
          <br />
          <span className="text-gradient">Monteiro Junior</span>
          <span className="cursor-blink ml-1 text-accent">_</span>
        </h1>
        <p
          className="hero-pop mt-5 font-display text-xl font-medium sm:text-2xl"
          style={popDelay(200)}
        >
          {dict.hero.role}
        </p>
        <p className="hero-pop mt-4 max-w-xl leading-relaxed text-muted" style={popDelay(300)}>
          {dict.hero.tagline}
        </p>
        <div className="hero-pop mt-9 flex flex-wrap items-center gap-3" style={popDelay(400)}>
          <a
            href={cvFiles[locale]}
            download
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent to-accent-alt px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:scale-[1.03]"
          >
            <DownloadIcon className="size-4" />
            {dict.hero.downloadCv}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-edge px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent"
          >
            {dict.hero.contactMe}
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex size-11 items-center justify-center rounded-full border border-edge text-muted transition-colors hover:border-accent hover:text-foreground"
          >
            <GitHubIcon className="size-5" />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex size-11 items-center justify-center rounded-full border border-edge text-muted transition-colors hover:border-accent hover:text-foreground"
          >
            <LinkedInIcon className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
