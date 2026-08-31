"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { setTheme, useTheme } from "@/skins/appearance";

interface ThemeToggleProps {
  labelToLight: string;
  labelToDark: string;
}

export function ThemeToggle({ labelToLight, labelToDark }: ThemeToggleProps) {
  const isDark = useTheme() === "dark";
  const label = isDark ? labelToLight : labelToDark;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="icon-btn theme-toggle"
    >
      {/* Both ship; CSS picks one from the .dark class the pre-paint script
          sets, so the icon is right on the first frame. */}
      <SunIcon className="theme-icon-sun size-4" />
      <MoonIcon className="theme-icon-moon size-4" />
    </button>
  );
}
