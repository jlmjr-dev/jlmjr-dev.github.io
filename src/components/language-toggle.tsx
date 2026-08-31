import { otherLocale, type Locale } from "@/i18n/config";

interface LanguageToggleProps {
  locale: Locale;
  label: string;
}

/* A plain anchor, deliberately not next/link. A soft navigation re-renders the
   root layout on the client, which both resets the <html> skin and theme
   attributes to their server defaults and re-evaluates the inline scripts. A
   full document load lets the pre-paint script restore the stored appearance. */
export function LanguageToggle({ locale, label }: LanguageToggleProps) {
  const target = otherLocale(locale);

  return (
    <a
      href={`/${target}/`}
      lang={target === "pt" ? "pt-BR" : "en"}
      aria-label={`${target.toUpperCase()} - ${label}`}
      title={label}
      className="icon-btn font-[family-name:var(--font-meta)] text-xs font-semibold uppercase"
    >
      {target}
    </a>
  );
}
