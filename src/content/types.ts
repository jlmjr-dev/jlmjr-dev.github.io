import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

export type LocalizedList = Record<Locale, string[]>;

/** For values that are identical in every locale, such as a single-language URL. */
export function inAllLocales(value: string): Localized {
  return { en: value, pt: value };
}
