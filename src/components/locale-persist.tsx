"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

interface LocalePersistProps {
  locale: Locale;
}

export function LocalePersist({ locale }: LocalePersistProps) {
  useEffect(() => {
    try {
      localStorage.setItem("locale", locale);
    } catch {
      // storage unavailable, the root redirect will fall back to the browser language
    }
  }, [locale]);

  return null;
}
