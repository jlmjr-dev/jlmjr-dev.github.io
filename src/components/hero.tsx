import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { cvFiles, links } from "@/content/links";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";
import { MetricTiles } from "@/components/dashboard/metric-tiles";
import { UptimeStrip } from "@/components/dashboard/uptime-strip";

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
          className="hero-pop mb-4 flex w-fit items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
          style={popDelay(0)}
        >
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {dict.dashboard.status}
        </p>
        <p className="hero-pop text-sm font-semibold text-accent" style={popDelay(0)}>
          {dict.hero.greeting}
        </p>
        <h1
          className="hero-pop mt-3 text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
          style={popDelay(100)}
        >
          José Luiz
          <br />
          <span className="text-accent">Monteiro Junior</span>
        </h1>
        <p
          className="hero-pop mt-5 text-xl font-medium sm:text-2xl"
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
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:text-background"
          >
            <DownloadIcon className="size-4" />
            {dict.hero.downloadCv}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg border border-edge px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent"
          >
            {dict.hero.contactMe}
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex size-11 items-center justify-center rounded-lg border border-edge text-muted transition-colors hover:border-accent hover:text-foreground"
          >
            <GitHubIcon className="size-5" />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex size-11 items-center justify-center rounded-lg border border-edge text-muted transition-colors hover:border-accent hover:text-foreground"
          >
            <LinkedInIcon className="size-5" />
          </a>
        </div>
        <div className="hero-pop mt-12 flex flex-col gap-6" style={popDelay(500)}>
          <MetricTiles locale={locale} />
          <UptimeStrip
            caption={dict.dashboard.uptimeCaption}
            deployedLabel={dict.dashboard.deployed}
            availableLabel={dict.dashboard.available}
          />
        </div>
      </div>
    </div>
  );
}
