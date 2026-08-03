import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const navItems = [
    { href: "#about", label: dict.nav.about },
    { href: "#experience", label: dict.nav.experience },
    { href: "#projects", label: dict.nav.projects },
    { href: "#skills", label: dict.nav.skills },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-edge/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-sm font-bold">
          <span className="text-gradient">jlmjr</span>-dev
        </a>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle locale={locale} label={dict.a11y.switchLocale} />
          <ThemeToggle
            labelToLight={dict.a11y.switchToLight}
            labelToDark={dict.a11y.switchToDark}
          />
        </div>
      </div>
    </header>
  );
}
