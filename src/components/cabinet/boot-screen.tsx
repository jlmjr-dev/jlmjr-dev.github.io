"use client";

import { useCallback, useEffect, useState } from "react";
import { arcadeSounds } from "@/components/cabinet/audio";

const SEEN_KEY = "cabinet-seen";
const SOUND_KEY = "arcade-sound";

interface BootScreenProps {
  insertCoin: string;
  attract: string;
  soundOn: string;
  soundOff: string;
}

type Phase = "hidden" | "flicker" | "attract" | "off";

export function BootScreen({ insertCoin, attract, soundOn, soundOff }: BootScreenProps) {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [sound, setSound] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.boot !== "pending") {
      return;
    }
    try {
      setSound(localStorage.getItem(SOUND_KEY) === "1");
    } catch {
      // sound just stays off
    }
    setPhase("flicker");
    const timer = window.setTimeout(() => setPhase("attract"), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const enter = useCallback(() => {
    setPhase((current) => {
      if (current !== "attract") {
        return current;
      }
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {
        // the boot will just replay next visit
      }
      if (localStorage.getItem(SOUND_KEY) === "1") {
        arcadeSounds.coin();
      }
      delete document.documentElement.dataset.boot;
      return "off";
    });
  }, []);

  useEffect(() => {
    if (phase !== "attract") {
      return;
    }
    const onKey = () => enter();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, enter]);

  const toggleSound = (event: React.MouseEvent) => {
    event.stopPropagation();
    const next = !sound;
    setSound(next);
    try {
      localStorage.setItem(SOUND_KEY, next ? "1" : "0");
    } catch {
      // preference just won't persist
    }
    if (next) {
      arcadeSounds.coin();
    }
  };

  if (phase === "hidden" || phase === "off") {
    return null;
  }

  return (
    <div
      className="boot-screen scanlines fixed inset-0 z-[90] flex cursor-pointer flex-col items-center justify-center gap-8 bg-black text-center"
      onClick={enter}
      role="button"
      tabIndex={0}
      aria-label={attract}
    >
      <BootFlicker phase={phase} />
      <AttractContent
        phase={phase}
        insertCoin={insertCoin}
        attract={attract}
        soundLabel={sound ? soundOn : soundOff}
        onToggleSound={toggleSound}
      />
    </div>
  );
}

function BootFlicker({ phase }: { phase: Phase }) {
  if (phase !== "flicker") {
    return null;
  }
  return <div className="boot-flicker h-0.5 w-full bg-accent" aria-hidden />;
}

interface AttractContentProps {
  phase: Phase;
  insertCoin: string;
  attract: string;
  soundLabel: string;
  onToggleSound: (event: React.MouseEvent) => void;
}

function AttractContent({
  phase,
  insertCoin,
  attract,
  soundLabel,
  onToggleSound,
}: AttractContentProps) {
  if (phase !== "attract") {
    return null;
  }
  return (
    <>
      <p className="boot-pop font-display text-2xl font-bold uppercase text-accent sm:text-4xl">
        JLMJR <span className="text-accent-alt">arcade</span>
      </p>
      <p className="cursor-blink font-display text-sm font-bold uppercase text-foreground sm:text-lg">
        ▶ {insertCoin}
      </p>
      <p className="max-w-xs text-xs text-muted">{attract}</p>
      <button
        type="button"
        onClick={onToggleSound}
        className="pixel-btn bg-surface px-3 py-1.5 font-display text-[10px] font-bold uppercase"
      >
        {soundLabel}
      </button>
    </>
  );
}
