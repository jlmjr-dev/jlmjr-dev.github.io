import Link from "next/link";
import { otherLocale, type Locale } from "@/i18n/config";

interface LanguageToggleProps {
  locale: Locale;
  label: string;
}

export function LanguageToggle({ locale, label }: LanguageToggleProps) {
  const target = otherLocale(locale);

  return (
    <Link
      href={`/${target}/`}
      aria-label={label}
      title={label}
      className="flex h-9 items-center rounded-lg border border-edge px-3 text-xs font-semibold uppercase text-muted transition-colors hover:border-accent hover:text-foreground"
    >
      {target}
    </Link>
  );
}
