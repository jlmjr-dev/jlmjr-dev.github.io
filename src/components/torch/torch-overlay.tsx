"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// The page sits in the dark; a warm, gently flickering torch light follows
// the cursor and reveals what it touches. Content stays faintly legible
// outside the light, and a persistent switch turns the lights fully on.

const LIGHTS_KEY = "torch-lights";
const INNER_RADIUS = 150;
const RIM_RADIUS = 240;
const DARK_RADIUS = 520;

interface TorchOverlayProps {
  hint: string;
  lightsOn: string;
  lightsOff: string;
}

export function TorchOverlay({ hint, lightsOn, lightsOff }: TorchOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [lit, setLit] = useState(true);
  const [hasMoved, setHasMoved] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const litRef = useRef(true);

  litRef.current = lit;

  useEffect(() => {
    setMounted(true);
    const torchActive = document.documentElement.dataset.torch === "on";
    setLit(!torchActive);
    pointer.current = { x: window.innerWidth / 2, y: window.innerHeight * 0.4 };
    delete document.documentElement.dataset.torch;
  }, []);

  useEffect(() => {
    if (!mounted || lit) {
      return;
    }
    const overlay = overlayRef.current;
    if (!overlay) {
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onPointerMove = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
      setHasMoved(true);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    const paint = (now: number) => {
      const t = now * 0.001;
      const flicker = reducedMotion
        ? 1
        : 1 + Math.sin(t * 9.3) * 0.015 + Math.sin(t * 23.7) * 0.01 + Math.sin(t * 4.1) * 0.012;
      const inner = INNER_RADIUS * flicker;
      const rim = RIM_RADIUS * flicker;
      const { x, y } = pointer.current;
      overlay.style.background = `radial-gradient(circle at ${x}px ${y}px,
        rgba(0, 0, 0, 0) 0px,
        rgba(0, 0, 0, 0) ${inner}px,
        rgba(38, 22, 8, 0.38) ${rim}px,
        rgba(7, 5, 3, 0.9) ${DARK_RADIUS}px,
        rgba(4, 3, 2, 0.93) 100%)`;
      raf = requestAnimationFrame(paint);
    };
    raf = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [mounted, lit]);

  const toggleLights = useCallback(() => {
    setLit((current) => {
      const next = !current;
      try {
        localStorage.setItem(LIGHTS_KEY, next ? "on" : "off");
      } catch {
        // preference just won't persist
      }
      return next;
    });
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <TorchDarkness lit={lit} overlayRef={overlayRef} />
      <TorchHint visible={!lit && !hasMoved} text={hint} />
      <button
        type="button"
        onClick={toggleLights}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-amber-200/30 bg-black/70 px-4 py-2.5 text-sm font-semibold text-amber-100 shadow-lg backdrop-blur transition-colors hover:border-amber-200/60"
      >
        <span
          className={`size-2 rounded-full ${lit ? "bg-amber-300" : "bg-amber-500/40"}`}
          aria-hidden
        />
        {lit ? lightsOn : lightsOff}
      </button>
    </>
  );
}

function TorchDarkness({
  lit,
  overlayRef,
}: {
  lit: boolean;
  overlayRef: React.RefObject<HTMLDivElement | null>;
}) {
  if (lit) {
    return null;
  }
  return <div ref={overlayRef} className="pointer-events-none fixed inset-0 z-40" aria-hidden />;
}

function TorchHint({ visible, text }: { visible: boolean; text: string }) {
  if (!visible) {
    return null;
  }
  return (
    <p className="pointer-events-none fixed inset-x-0 bottom-16 z-50 text-center text-sm font-medium text-amber-100/90">
      {text}
    </p>
  );
}
