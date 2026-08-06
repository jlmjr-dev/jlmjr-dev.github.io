import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { SnakeGame } from "@/components/snake/snake-game";

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
      <div className="relative mx-auto flex min-h-[92svh] max-w-5xl flex-col justify-center px-4 pb-16 pt-24 sm:px-6">
        <p
          className="hero-pop font-display text-sm text-accent-alt"
          style={popDelay(0)}
        >
          {dict.hero.greeting}
        </p>
        <h1
          className="hero-pop mt-3 font-display text-2xl font-bold leading-snug sm:text-4xl"
          style={popDelay(100)}
        >
          José Luiz <span className="text-accent">Monteiro Junior</span>
        </h1>
        <p className="hero-pop mt-3 text-lg font-semibold sm:text-xl" style={popDelay(200)}>
          {dict.hero.role}
        </p>
        <div className="hero-pop" style={popDelay(300)}>
          <SnakeGame locale={locale} dict={dict} />
        </div>
      </div>
    </div>
  );
}
