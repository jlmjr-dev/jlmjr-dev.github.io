"use client";

interface StartButtonProps {
  pressStart: string;
  skip: string;
  hint: string;
}

export function StartButton({ pressStart, skip, hint }: StartButtonProps) {
  const start = () => {
    window.dispatchEvent(new Event("snake:start"));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={start}
          className="pixel-btn cursor-blink bg-accent px-6 py-3 font-display text-sm font-bold uppercase text-background"
        >
          ▶ {pressStart}
        </button>
        <a href="#about" className="text-sm text-muted underline-offset-4 hover:underline">
          {skip} ↓
        </a>
      </div>
      <p className="mt-4 max-w-md text-xs leading-relaxed text-muted">{hint}</p>
    </div>
  );
}
