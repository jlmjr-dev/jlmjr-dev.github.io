"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { tourStops } from "@/content/tour";
import { cvFiles } from "@/content/links";
import { DownloadIcon } from "@/components/icons";
import {
  GRID_H,
  GRID_W,
  initialState,
  step,
  turn,
  withFood,
  type Direction,
  type SnakeState,
} from "@/components/snake/engine";

const CELL = 24;
const BOARD_W = GRID_W * CELL;
const BOARD_H = GRID_H * CELL;
const BASE_TICK_MS = 150;
const TICK_DROP_PER_STOP = 8;
const MIN_TICK_MS = 100;

type Status = "intro" | "playing" | "card" | "over" | "won";

const KEY_DIRECTIONS: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
  W: "up",
  S: "down",
  A: "left",
  D: "right",
};

interface SnakeGameProps {
  locale: Locale;
  dict: Dictionary;
}

function themeColor(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value === "" ? fallback : value;
}

export function SnakeGame({ locale, dict }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<SnakeState>(initialState(0));
  const statusRef = useRef<Status>("intro");
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const [status, setStatus] = useState<Status>("intro");
  const [stopIndex, setStopIndex] = useState(0);

  statusRef.current = status;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    const accent = themeColor("--accent", "#4ade80");
    const amber = themeColor("--accent-alt", "#fbbf24");
    const edge = themeColor("--edge", "#24382a");

    ctx.clearRect(0, 0, BOARD_W, BOARD_H);

    ctx.fillStyle = edge;
    for (let x = 0; x < GRID_W; x++) {
      for (let y = 0; y < GRID_H; y++) {
        ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2);
      }
    }

    const state = gameRef.current;
    if (statusRef.current === "playing" || statusRef.current === "intro") {
      ctx.fillStyle = amber;
      ctx.fillRect(state.food.x * CELL + 3, state.food.y * CELL + 3, CELL - 6, CELL - 6);
    }

    state.snake.forEach((cell, index) => {
      ctx.fillStyle = accent;
      ctx.globalAlpha = index === 0 ? 1 : Math.max(0.35, 1 - index * 0.06);
      ctx.fillRect(cell.x * CELL + 2, cell.y * CELL + 2, CELL - 4, CELL - 4);
    });
    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const dpr = window.devicePixelRatio || 1;
    canvas.width = BOARD_W * dpr;
    canvas.height = BOARD_H * dpr;
    canvas.getContext("2d")?.scale(dpr, dpr);
    draw();
  }, [draw]);

  useEffect(() => {
    if (status !== "playing") {
      draw();
      return;
    }
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const tickMs = Math.max(MIN_TICK_MS, BASE_TICK_MS - stopIndex * TICK_DROP_PER_STOP);

    const loop = (now: number) => {
      acc += now - last;
      last = now;
      while (acc >= tickMs) {
        acc -= tickMs;
        const result = step(gameRef.current);
        gameRef.current = result.state;
        if (!result.state.alive) {
          setStatus("over");
          draw();
          return;
        }
        if (result.ate) {
          setStopIndex((current) => current + 1);
          setStatus("card");
          draw();
          return;
        }
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [status, stopIndex, draw]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const current = statusRef.current;
      if (current === "intro" && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        setStatus("playing");
        return;
      }
      if (current !== "playing") {
        return;
      }
      const dir = KEY_DIRECTIONS[event.key];
      if (dir) {
        event.preventDefault();
        gameRef.current = turn(gameRef.current, dir);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const steer = (dir: Direction) => {
    if (statusRef.current === "playing") {
      gameRef.current = turn(gameRef.current, dir);
    }
  };

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) {
      return;
    }
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 24 && Math.abs(dy) < 24) {
      return;
    }
    if (Math.abs(dx) > Math.abs(dy)) {
      steer(dx > 0 ? "right" : "left");
    } else {
      steer(dy > 0 ? "down" : "up");
    }
  };

  const startGame = () => {
    gameRef.current = initialState(0);
    setStopIndex(0);
    setStatus("playing");
  };

  const continueAfterCard = () => {
    if (stopIndex >= tourStops.length) {
      setStatus("won");
      return;
    }
    gameRef.current = withFood(gameRef.current, stopIndex);
    setStatus("playing");
  };

  const continueAfterDeath = () => {
    gameRef.current = withFood(initialState(stopIndex), stopIndex);
    setStatus("playing");
  };

  const eatenStop = stopIndex > 0 ? tourStops[stopIndex - 1] : null;
  const currentStop = stopIndex < tourStops.length ? tourStops[stopIndex] : null;

  return (
    <div className="mt-10 w-full max-w-3xl">
      <div className="mb-2 flex items-center justify-between font-display text-xs">
        <span className="text-muted">
          {Math.min(stopIndex, tourStops.length)}/{tourStops.length} {dict.game.unlocked}
        </span>
        <a href="#about" className="text-accent-alt hover:underline">
          {dict.game.skip} ↓
        </a>
      </div>
      <div
        className="pixel-card relative aspect-[24/14] w-full select-none overflow-hidden !shadow-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 size-full"
          style={{ imageRendering: "pixelated" }}
          aria-hidden
        />
        <FoodLabel status={status} stopLabel={currentStop?.label[locale]} />
        <IntroOverlay
          status={status}
          pressStart={dict.game.pressStart}
          hint={dict.game.hint}
          onStart={startGame}
        />
        <CardOverlay
          status={status}
          locale={locale}
          title={eatenStop?.label[locale]}
          teaser={eatenStop?.teaser[locale]}
          anchor={eatenStop?.anchor}
          isCvDownload={eatenStop?.isCvDownload === true}
          jumpTo={dict.game.jumpTo}
          keepPlaying={dict.game.keepPlaying}
          downloadCv={dict.hero.downloadCv}
          onContinue={continueAfterCard}
        />
        <GameOverOverlay
          status={status}
          gameOver={dict.game.gameOver}
          continueGame={dict.game.continueGame}
          onContinue={continueAfterDeath}
        />
        <WinOverlay
          status={status}
          win={dict.game.win}
          winSub={dict.game.winSub}
          playAgain={dict.game.playAgain}
          onRestart={startGame}
        />
      </div>
      <DPad status={status} onSteer={steer} />
    </div>
  );
}

function FoodLabel({ status, stopLabel }: { status: Status; stopLabel?: string }) {
  if (status !== "playing" || !stopLabel) {
    return null;
  }
  return (
    <span className="pointer-events-none absolute left-3 top-2 font-display text-[10px] uppercase text-accent-alt">
      ▶ {stopLabel}
    </span>
  );
}

interface IntroOverlayProps {
  status: Status;
  pressStart: string;
  hint: string;
  onStart: () => void;
}

function IntroOverlay({ status, pressStart, hint, onStart }: IntroOverlayProps) {
  if (status !== "intro") {
    return null;
  }
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/70 p-4 text-center">
      <button
        type="button"
        onClick={onStart}
        className="pixel-btn cursor-blink bg-accent px-6 py-3 font-display text-sm font-bold uppercase text-background"
      >
        {pressStart}
      </button>
      <p className="max-w-xs text-xs text-muted">{hint}</p>
    </div>
  );
}

interface CardOverlayProps {
  status: Status;
  locale: Locale;
  title?: string;
  teaser?: string;
  anchor?: string;
  isCvDownload: boolean;
  jumpTo: string;
  keepPlaying: string;
  downloadCv: string;
  onContinue: () => void;
}

function CardOverlay({
  status,
  locale,
  title,
  teaser,
  anchor,
  isCvDownload,
  jumpTo,
  keepPlaying,
  downloadCv,
  onContinue,
}: CardOverlayProps) {
  if (status !== "card" || !title) {
    return null;
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/70 p-4">
      <div className="pixel-card max-w-sm bg-surface p-5 text-center">
        <h3 className="font-display text-sm font-bold uppercase text-accent">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{teaser}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <CardAction
            locale={locale}
            anchor={anchor}
            isCvDownload={isCvDownload}
            jumpTo={jumpTo}
            downloadCv={downloadCv}
          />
          <button
            type="button"
            onClick={onContinue}
            className="pixel-btn bg-accent px-4 py-2 text-xs font-bold text-background"
          >
            {keepPlaying}
          </button>
        </div>
      </div>
    </div>
  );
}

interface CardActionProps {
  locale: Locale;
  anchor?: string;
  isCvDownload: boolean;
  jumpTo: string;
  downloadCv: string;
}

function CardAction({ locale, anchor, isCvDownload, jumpTo, downloadCv }: CardActionProps) {
  if (isCvDownload) {
    return (
      <a
        href={cvFiles[locale]}
        download
        className="pixel-btn inline-flex items-center gap-1.5 bg-surface px-4 py-2 text-xs font-bold"
      >
        <DownloadIcon className="size-3.5" />
        {downloadCv}
      </a>
    );
  }
  if (!anchor) {
    return null;
  }
  return (
    <a href={anchor} className="pixel-btn bg-surface px-4 py-2 text-xs font-bold">
      {jumpTo} ↓
    </a>
  );
}

interface GameOverOverlayProps {
  status: Status;
  gameOver: string;
  continueGame: string;
  onContinue: () => void;
}

function GameOverOverlay({ status, gameOver, continueGame, onContinue }: GameOverOverlayProps) {
  if (status !== "over") {
    return null;
  }
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/70 p-4">
      <p className="font-display text-lg font-bold uppercase text-accent-alt">{gameOver}</p>
      <button
        type="button"
        onClick={onContinue}
        className="pixel-btn bg-accent px-5 py-2.5 text-xs font-bold text-background"
      >
        {continueGame}
      </button>
    </div>
  );
}

interface WinOverlayProps {
  status: Status;
  win: string;
  winSub: string;
  playAgain: string;
  onRestart: () => void;
}

function WinOverlay({ status, win, winSub, playAgain, onRestart }: WinOverlayProps) {
  if (status !== "won") {
    return null;
  }
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 p-4 text-center">
      <p className="font-display text-xl font-bold uppercase text-accent">{win}</p>
      <p className="max-w-xs text-sm text-muted">{winSub}</p>
      <button
        type="button"
        onClick={onRestart}
        className="pixel-btn mt-1 bg-surface px-4 py-2 text-xs font-bold"
      >
        {playAgain}
      </button>
    </div>
  );
}

interface DPadProps {
  status: Status;
  onSteer: (dir: Direction) => void;
}

function DPad({ status, onSteer }: DPadProps) {
  if (status !== "playing") {
    return null;
  }
  return (
    <div className="mt-4 grid w-36 grid-cols-3 gap-1 sm:hidden" aria-hidden>
      <span />
      <DPadButton label="▲" onPress={() => onSteer("up")} />
      <span />
      <DPadButton label="◀" onPress={() => onSteer("left")} />
      <span />
      <DPadButton label="▶" onPress={() => onSteer("right")} />
      <span />
      <DPadButton label="▼" onPress={() => onSteer("down")} />
      <span />
    </div>
  );
}

function DPadButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="pixel-btn flex size-11 items-center justify-center bg-surface text-sm"
    >
      {label}
    </button>
  );
}
