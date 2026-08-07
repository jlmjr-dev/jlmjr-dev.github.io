"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { snakeTargets } from "@/content/tour";
import { cvFiles } from "@/content/links";
import { DownloadIcon } from "@/components/icons";
import {
  initialState,
  step,
  turn,
  type Direction,
  type Grid,
  type Point,
  type SnakeState,
} from "@/components/snake/engine";
import { arcadeSounds } from "@/components/cabinet/audio";

function soundEnabled(): boolean {
  try {
    return localStorage.getItem("arcade-sound") === "1";
  } catch {
    return false;
  }
}

const CELL = 32;
const TICK_MS = 170;

type Status = "idle" | "playing" | "over" | "won";

interface MeasuredTarget {
  cell: Point;
  element: HTMLElement;
  label: string;
}

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

interface PageSnakeProps {
  locale: Locale;
  dict: Dictionary;
}

export function PageSnake({ locale, dict }: PageSnakeProps) {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [targetIndex, setTargetIndex] = useState(0);
  const [, forceRender] = useState(0);

  const gameRef = useRef<SnakeState>(initialState({ x: 4, y: 4 }, "right"));
  const gridRef = useRef<Grid>({ w: 20, h: 40 });
  const docHeightRef = useRef(0);
  const targetsRef = useRef<MeasuredTarget[]>([]);
  const statusRef = useRef<Status>("idle");
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  statusRef.current = status;

  useEffect(() => {
    setMounted(true);
  }, []);

  const measureBoard = useCallback(() => {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    const docHeight = document.documentElement.scrollHeight;
    docHeightRef.current = docHeight;
    gridRef.current = {
      w: Math.max(8, Math.floor(window.innerWidth / CELL)),
      h: Math.max(10, Math.floor(docHeight / CELL)),
    };
    const measured: MeasuredTarget[] = [];
    for (const target of snakeTargets) {
      const element = document.querySelector<HTMLElement>(target.selector);
      if (!element) {
        continue;
      }
      const rect = element.getBoundingClientRect();
      const cx = Math.min(
        gridRef.current.w - 1,
        Math.max(0, Math.floor((rect.left + rect.width / 2) / CELL)),
      );
      const cy = Math.min(
        gridRef.current.h - 1,
        Math.max(0, Math.floor((rect.top + window.scrollY + rect.height / 2) / CELL)),
      );
      measured.push({ cell: { x: cx, y: cy }, element, label: target.label[locale] });
    }
    targetsRef.current = measured;
  }, [locale]);

  const followCamera = useCallback(() => {
    const head = gameRef.current.snake[0];
    const desired = head.y * CELL - window.innerHeight * 0.45;
    const max = docHeightRef.current - window.innerHeight;
    window.scrollTo(0, Math.min(Math.max(0, desired), Math.max(0, max)));
  }, []);

  const startGame = useCallback(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document
      .querySelectorAll(".snake-eaten")
      .forEach((el) => el.classList.remove("snake-eaten"));
    measureBoard();
    gameRef.current = initialState({ x: 4, y: Math.floor(window.innerHeight / 2 / CELL) }, "right");
    setTargetIndex(0);
    setStatus("playing");
    followCamera();
  }, [measureBoard, followCamera]);

  const exitGame = useCallback(() => {
    document
      .querySelectorAll(".snake-eaten")
      .forEach((el) => el.classList.remove("snake-eaten"));
    targetsRef.current.forEach((target) => target.element.classList.remove("snake-target-glow"));
    document.documentElement.style.scrollBehavior = "";
    setStatus("idle");
  }, []);

  useEffect(() => {
    const onStart = () => startGame();
    window.addEventListener("snake:start", onStart);
    return () => window.removeEventListener("snake:start", onStart);
  }, [startGame]);

  useEffect(() => {
    if (status !== "playing") {
      return;
    }
    const current = targetsRef.current[targetIndex];
    current?.element.classList.add("snake-target-glow");
    return () => current?.element.classList.remove("snake-target-glow");
  }, [status, targetIndex]);

  useEffect(() => {
    if (status !== "playing") {
      return;
    }
    let raf = 0;
    let last = performance.now();
    let acc = 0;

    const loop = (now: number) => {
      acc += now - last;
      last = now;
      while (acc >= TICK_MS) {
        acc -= TICK_MS;
        const target = targetsRef.current[targetIndex]?.cell ?? null;
        const result = step(gameRef.current, gridRef.current, target);
        gameRef.current = result.state;
        if (!result.state.alive) {
          if (soundEnabled()) {
            arcadeSounds.gameOver();
          }
          setStatus("over");
          return;
        }
        if (result.ate) {
          const eaten = targetsRef.current[targetIndex];
          eaten.element.classList.remove("snake-target-glow");
          eaten.element.classList.add("snake-eaten");
          const nextIndex = targetIndex + 1;
          setTargetIndex(nextIndex);
          if (nextIndex >= targetsRef.current.length) {
            if (soundEnabled()) {
              arcadeSounds.win();
            }
            setStatus("won");
            return;
          }
          if (soundEnabled()) {
            arcadeSounds.eat();
          }
        }
      }
      followCamera();
      forceRender((n) => n + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [status, targetIndex, followCamera]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (statusRef.current !== "playing") {
        return;
      }
      if (event.key === "Escape") {
        exitGame();
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
  }, [exitGame]);

  useEffect(() => {
    const onTouchStart = (event: TouchEvent) => {
      if (statusRef.current !== "playing") {
        return;
      }
      const touch = event.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    };
    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start || statusRef.current !== "playing") {
        return;
      }
      const touch = event.changedTouches[0];
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dx) < 24 && Math.abs(dy) < 24) {
        return;
      }
      const dir: Direction =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? "right"
            : "left"
          : dy > 0
            ? "down"
            : "up";
      gameRef.current = turn(gameRef.current, dir);
    };
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const steer = (dir: Direction) => {
    if (statusRef.current === "playing") {
      gameRef.current = turn(gameRef.current, dir);
    }
  };

  const continueAfterDeath = () => {
    const target = targetsRef.current[targetIndex];
    const spawnY = target ? Math.max(2, target.cell.y - 6) : 4;
    gameRef.current = initialState({ x: 4, y: spawnY }, "down");
    setStatus("playing");
    followCamera();
  };

  if (!mounted || status === "idle") {
    return null;
  }

  const target = targetsRef.current[targetIndex];
  const grid = gridRef.current;

  return createPortal(
    <>
      <PlayScrim status={status} />
      <div
        className="pointer-events-none absolute left-0 top-0 z-40 w-full overflow-hidden"
        style={{ height: docHeightRef.current }}
        aria-hidden
      >
        {gameRef.current.snake.map((cell, index) => (
          <div
            key={`${cell.x}-${cell.y}-${index}`}
            className="absolute bg-accent"
            style={{
              left: cell.x * CELL + 3,
              top: cell.y * CELL + 3,
              width: CELL - 6,
              height: CELL - 6,
              opacity: index === 0 ? 1 : Math.max(0.4, 1 - index * 0.04),
            }}
          />
        ))}
        <PelletMarker status={status} cell={target?.cell} label={target?.label} />
      </div>
      <Hud
        status={status}
        eatenCount={targetIndex}
        totalCount={targetsRef.current.length}
        eatenLabel={dict.game.eaten}
        exitLabel={dict.game.exit}
        targetLabel={target?.label}
        head={gameRef.current.snake[0]}
        targetCell={target?.cell}
        gridW={grid.w}
        onExit={exitGame}
      />
      <DPad status={status} onSteer={steer} />
      <GameOverOverlay
        status={status}
        gameOver={dict.game.gameOver}
        continueGame={dict.game.continueGame}
        exitLabel={dict.game.exit}
        onContinue={continueAfterDeath}
        onExit={exitGame}
      />
      <WinOverlay
        status={status}
        locale={locale}
        win={dict.game.win}
        winSub={dict.game.winSub}
        playAgain={dict.game.playAgain}
        restore={dict.game.restore}
        downloadCv={dict.hero.downloadCv}
        onRestart={startGame}
        onExit={exitGame}
      />
    </>,
    document.body,
  );
}

function PlayScrim({ status }: { status: Status }) {
  if (status !== "playing") {
    return null;
  }
  return <div className="snake-scrim fixed inset-0 z-30" aria-hidden />;
}

function PelletMarker({
  status,
  cell,
  label,
}: {
  status: Status;
  cell?: Point;
  label?: string;
}) {
  if (status !== "playing" || !cell) {
    return null;
  }
  return (
    <div
      className="absolute"
      style={{ left: cell.x * CELL, top: cell.y * CELL, width: CELL, height: CELL }}
    >
      <div className="snake-pellet absolute inset-1 bg-accent-alt" />
      <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface px-1.5 py-0.5 font-display text-[10px] uppercase text-accent-alt">
        {label}
      </span>
    </div>
  );
}

interface HudProps {
  status: Status;
  eatenCount: number;
  totalCount: number;
  eatenLabel: string;
  exitLabel: string;
  targetLabel?: string;
  head: Point;
  targetCell?: Point;
  gridW: number;
  onExit: () => void;
}

function Hud({
  status,
  eatenCount,
  totalCount,
  eatenLabel,
  exitLabel,
  targetLabel,
  head,
  targetCell,
  gridW,
  onExit,
}: HudProps) {
  if (status !== "playing") {
    return null;
  }
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3">
      <div className="pixel-card flex items-center gap-3 bg-surface px-3 py-2 font-display text-xs">
        <span className="text-muted">
          {eatenCount}/{totalCount} {eatenLabel}
        </span>
        <TargetCompass label={targetLabel} head={head} targetCell={targetCell} gridW={gridW} />
      </div>
      <button
        type="button"
        onClick={onExit}
        className="pixel-btn bg-surface px-3 py-2 font-display text-xs font-bold"
      >
        ✕ {exitLabel}
      </button>
    </div>
  );
}

function TargetCompass({
  label,
  head,
  targetCell,
  gridW,
}: {
  label?: string;
  head: Point;
  targetCell?: Point;
  gridW: number;
}) {
  if (!label || !targetCell) {
    return null;
  }
  // Horizontal wrap means the shortest path may cross the edge
  let dx = targetCell.x - head.x;
  if (Math.abs(dx) > gridW / 2) {
    dx = dx > 0 ? dx - gridW : dx + gridW;
  }
  const angle = (Math.atan2(targetCell.y - head.y, dx) * 180) / Math.PI;
  return (
    <span className="flex items-center gap-1.5 text-accent-alt">
      <span
        className="inline-block transition-transform duration-200"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        ➤
      </span>
      {label}
    </span>
  );
}

function DPad({ status, onSteer }: { status: Status; onSteer: (dir: Direction) => void }) {
  if (status !== "playing") {
    return null;
  }
  return (
    <div className="fixed bottom-4 right-4 z-50 grid w-36 grid-cols-3 gap-1 sm:hidden" aria-hidden>
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

interface GameOverOverlayProps {
  status: Status;
  gameOver: string;
  continueGame: string;
  exitLabel: string;
  onContinue: () => void;
  onExit: () => void;
}

function GameOverOverlay({
  status,
  gameOver,
  continueGame,
  exitLabel,
  onContinue,
  onExit,
}: GameOverOverlayProps) {
  if (status !== "over") {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/80 p-4">
      <p className="font-display text-xl font-bold uppercase text-accent-alt">{gameOver}</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="pixel-btn bg-accent px-5 py-2.5 text-xs font-bold text-background"
        >
          {continueGame}
        </button>
        <button
          type="button"
          onClick={onExit}
          className="pixel-btn bg-surface px-5 py-2.5 text-xs font-bold"
        >
          {exitLabel}
        </button>
      </div>
    </div>
  );
}

interface WinOverlayProps {
  status: Status;
  locale: Locale;
  win: string;
  winSub: string;
  playAgain: string;
  restore: string;
  downloadCv: string;
  onRestart: () => void;
  onExit: () => void;
}

function WinOverlay({
  status,
  locale,
  win,
  winSub,
  playAgain,
  restore,
  downloadCv,
  onRestart,
  onExit,
}: WinOverlayProps) {
  if (status !== "won") {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
      <div className="pixel-card max-w-md bg-surface p-6 text-center">
        <p className="font-display text-2xl font-bold uppercase text-accent">{win}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{winSub}</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href={cvFiles[locale]}
            download
            className="pixel-btn inline-flex items-center gap-1.5 bg-accent px-4 py-2 text-xs font-bold text-background"
          >
            <DownloadIcon className="size-3.5" />
            {downloadCv}
          </a>
          <button
            type="button"
            onClick={onRestart}
            className="pixel-btn bg-surface px-4 py-2 text-xs font-bold"
          >
            {playAgain}
          </button>
          <button
            type="button"
            onClick={onExit}
            className="pixel-btn bg-surface px-4 py-2 text-xs font-bold"
          >
            {restore}
          </button>
        </div>
      </div>
    </div>
  );
}
