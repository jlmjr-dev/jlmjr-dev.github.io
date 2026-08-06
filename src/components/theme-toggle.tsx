"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

interface ThemeToggleProps {
  labelToLight: string;
  labelToDark: string;
}

export function ThemeToggle({ labelToLight, labelToDark }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage unavailable, theme just won't persist
    }
  };

  const label = isDark ? labelToLight : labelToDark;
  const showSun = !mounted || isDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex size-9 items-center justify-center border-2 border-edge text-muted transition-colors hover:border-accent hover:text-foreground"
    >
      {showSun ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </button>
  );
}
