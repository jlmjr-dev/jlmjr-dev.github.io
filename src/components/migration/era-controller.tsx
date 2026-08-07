"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { eras, type EraId } from "@/content/eras";

const HOLD_MS = 1700;
const TOAST_MS = 750;
const SEEN_KEY = "migration-seen";

interface EraControllerProps {
  locale: Locale;
  dict: Dictionary;
}

function applyEra(era: EraId) {
  document.documentElement.dataset.era = era;
}

export function EraController({ locale, dict }: EraControllerProps) {
  const [era, setEra] = useState<EraId>("now");
  const [autoplaying, setAutoplaying] = useState(false);
  const [migratingTo, setMigratingTo] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const markSeen = useCallback(() => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      // private mode: the intro will just replay next visit
    }
  }, []);

  const jumpTo = useCallback(
    (target: EraId) => {
      clearTimers();
      setAutoplaying(false);
      setMigratingTo(null);
      setEra(target);
      applyEra(target);
      markSeen();
    },
    [clearTimers, markSeen],
  );

  const autoplay = useCallback(() => {
    clearTimers();
    setAutoplaying(true);
    setEra("1998");
    applyEra("1998");
    let delay = HOLD_MS;
    for (const nextEra of eras.slice(1)) {
      const toastAt = delay;
      const swapAt = delay + TOAST_MS;
      timers.current.push(
        window.setTimeout(() => setMigratingTo(nextEra.label), toastAt),
        window.setTimeout(() => {
          setMigratingTo(null);
          setEra(nextEra.id);
          applyEra(nextEra.id);
          if (nextEra.id === "now") {
            setAutoplaying(false);
            markSeen();
          }
        }, swapAt),
      );
      delay = swapAt + HOLD_MS;
    }
  }, [clearTimers, markSeen]);

  useEffect(() => {
    const initial = document.documentElement.dataset.era;
    if (initial === "1998") {
      autoplay();
    } else {
      setEra("now");
    }
    return clearTimers;
  }, [autoplay, clearTimers]);

  const currentEra = eras.find((candidate) => candidate.id === era) ?? eras[eras.length - 1];

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
      <MigrateToast prefix={dict.migration.migrating} target={migratingTo} />
      <div className="flex max-w-full flex-col items-center gap-1.5 rounded-xl border border-black/20 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur dark:border-white/20 dark:bg-black/80">
        <div className="flex items-center gap-1">
          {eras.map((candidate) => (
            <EraButton
              key={candidate.id}
              label={candidate.label}
              active={candidate.id === era}
              onSelect={() => jumpTo(candidate.id)}
            />
          ))}
          <SkipOrReplay
            autoplaying={autoplaying}
            skipLabel={dict.migration.skip}
            replayLabel={dict.migration.replay}
            onSkip={() => jumpTo("now")}
            onReplay={autoplay}
          />
        </div>
        <p className="max-w-md truncate text-center text-xs text-neutral-600 dark:text-neutral-300">
          {currentEra.caption[locale]}
        </p>
      </div>
    </div>
  );
}

function MigrateToast({ prefix, target }: { prefix: string; target: string | null }) {
  if (!target) {
    return null;
  }
  return (
    <p className="rounded-md bg-black px-3 py-1.5 font-mono text-xs text-green-400 shadow-lg">
      $ {prefix} {target}
    </p>
  );
}

interface EraButtonProps {
  label: string;
  active: boolean;
  onSelect: () => void;
}

function EraButton({ label, active, onSelect }: EraButtonProps) {
  const activeClasses = active
    ? "bg-black text-white dark:bg-white dark:text-black"
    : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white";
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-md px-2 py-1 font-mono text-xs font-semibold transition-colors ${activeClasses}`}
    >
      {label}
    </button>
  );
}

interface SkipOrReplayProps {
  autoplaying: boolean;
  skipLabel: string;
  replayLabel: string;
  onSkip: () => void;
  onReplay: () => void;
}

function SkipOrReplay({ autoplaying, skipLabel, replayLabel, onSkip, onReplay }: SkipOrReplayProps) {
  if (autoplaying) {
    return (
      <button
        type="button"
        onClick={onSkip}
        className="ml-2 rounded-md border border-neutral-400 px-2 py-1 text-xs font-semibold text-neutral-600 hover:border-black hover:text-black dark:border-neutral-500 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white"
      >
        {skipLabel} ≫
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onReplay}
      aria-label={replayLabel}
      title={replayLabel}
      className="ml-2 rounded-md px-2 py-1 text-xs text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
    >
      ↺
    </button>
  );
}
