"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/types";

type Skin = "neutral" | "editorial" | "arcade" | "glossy";
type Accent = "default" | "violet" | "emerald" | "amber" | "rose";
type Radius = "sharp" | "soft" | "round";

const SKIN_KEY = "pg-skin";
const ACCENT_KEY = "pg-accent";
const RADIUS_KEY = "pg-radius";

const ACCENT_SWATCHES: Record<Accent, string> = {
  default: "#3b82f6",
  violet: "#8b5cf6",
  emerald: "#10b981",
  amber: "#d97706",
  rose: "#f43f5e",
};

function applyAttribute(name: string, value: string, defaultValue: string) {
  if (value === defaultValue) {
    delete document.documentElement.dataset[name];
  } else {
    document.documentElement.dataset[name] = value;
  }
}

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // the choice just won't persist
  }
}

interface PlaygroundPanelProps {
  dict: Dictionary;
}

export function PlaygroundPanel({ dict }: PlaygroundPanelProps) {
  const [open, setOpen] = useState(false);
  const [skin, setSkin] = useState<Skin>("neutral");
  const [accent, setAccent] = useState<Accent>("default");
  const [radius, setRadius] = useState<Radius>("soft");

  useEffect(() => {
    const dataset = document.documentElement.dataset;
    setSkin((dataset.skin as Skin) ?? "neutral");
    setAccent((dataset.accent as Accent) ?? "default");
    setRadius((dataset.radius as Radius) ?? "soft");
  }, []);

  const pickSkin = (next: Skin) => {
    setSkin(next);
    applyAttribute("skin", next, "neutral");
    store(SKIN_KEY, next);
  };

  const pickAccent = (next: Accent) => {
    setAccent(next);
    applyAttribute("accent", next, "default");
    store(ACCENT_KEY, next);
  };

  const pickRadius = (next: Radius) => {
    setRadius(next);
    applyAttribute("radius", next, "soft");
    store(RADIUS_KEY, next);
  };

  const reset = () => {
    pickSkin("neutral");
    pickAccent("default");
    pickRadius("soft");
  };

  const skins: { id: Skin; label: string }[] = [
    { id: "neutral", label: dict.playground.themes.neutral },
    { id: "editorial", label: dict.playground.themes.editorial },
    { id: "arcade", label: dict.playground.themes.arcade },
    { id: "glossy", label: dict.playground.themes.glossy },
  ];

  const radii: { id: Radius; label: string }[] = [
    { id: "sharp", label: dict.playground.cornersOptions.sharp },
    { id: "soft", label: dict.playground.cornersOptions.soft },
    { id: "round", label: dict.playground.cornersOptions.round },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <Panel
        open={open}
        dict={dict}
        skin={skin}
        accent={accent}
        radius={radius}
        skins={skins}
        radii={radii}
        onSkin={pickSkin}
        onAccent={pickAccent}
        onRadius={pickRadius}
        onReset={reset}
      />
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 shadow-lg dark:border-white/20 dark:bg-neutral-900 dark:text-neutral-100"
      >
        <span
          className="size-3 rounded-full"
          style={{ background: ACCENT_SWATCHES[accent] }}
          aria-hidden
        />
        {open ? dict.playground.close : dict.playground.customize}
      </button>
    </div>
  );
}

interface PanelProps {
  open: boolean;
  dict: Dictionary;
  skin: Skin;
  accent: Accent;
  radius: Radius;
  skins: { id: Skin; label: string }[];
  radii: { id: Radius; label: string }[];
  onSkin: (skin: Skin) => void;
  onAccent: (accent: Accent) => void;
  onRadius: (radius: Radius) => void;
  onReset: () => void;
}

function Panel({
  open,
  dict,
  skin,
  accent,
  radius,
  skins,
  radii,
  onSkin,
  onAccent,
  onRadius,
  onReset,
}: PanelProps) {
  if (!open) {
    return null;
  }
  return (
    <div className="w-72 rounded-xl border border-black/15 bg-white p-4 text-neutral-800 shadow-xl dark:border-white/20 dark:bg-neutral-900 dark:text-neutral-100">
      <ControlLabel text={dict.playground.theme} />
      <div className="mt-1.5 grid grid-cols-2 gap-1.5">
        {skins.map((option) => (
          <OptionButton
            key={option.id}
            label={option.label}
            active={skin === option.id}
            onSelect={() => onSkin(option.id)}
          />
        ))}
      </div>

      <ControlLabel text={dict.playground.accent} className="mt-4" />
      <div className="mt-1.5 flex gap-2">
        {(Object.keys(ACCENT_SWATCHES) as Accent[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onAccent(option)}
            aria-label={option}
            aria-pressed={accent === option}
            className={`size-7 rounded-full border-2 transition-transform hover:scale-110 ${
              accent === option ? "border-neutral-800 dark:border-white" : "border-transparent"
            }`}
            style={{ background: ACCENT_SWATCHES[option] }}
          />
        ))}
      </div>

      <ControlLabel text={dict.playground.corners} className="mt-4" />
      <div className="mt-1.5 grid grid-cols-3 gap-1.5">
        {radii.map((option) => (
          <OptionButton
            key={option.id}
            label={option.label}
            active={radius === option.id}
            onSelect={() => onRadius(option.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 w-full rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:border-neutral-500 hover:text-neutral-800 dark:border-neutral-600 dark:text-neutral-400 dark:hover:border-neutral-300 dark:hover:text-white"
      >
        {dict.playground.reset}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        {dict.playground.tagline}
      </p>
    </div>
  );
}

function ControlLabel({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 ${className}`}>
      {text}
    </p>
  );
}

function OptionButton({
  label,
  active,
  onSelect,
}: {
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  const activeClasses = active
    ? "border-neutral-800 bg-neutral-800 text-white dark:border-white dark:bg-white dark:text-neutral-900"
    : "border-neutral-300 text-neutral-600 hover:border-neutral-500 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-neutral-300";
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`rounded-lg border px-2 py-1.5 text-xs font-semibold transition-colors ${activeClasses}`}
    >
      {label}
    </button>
  );
}
