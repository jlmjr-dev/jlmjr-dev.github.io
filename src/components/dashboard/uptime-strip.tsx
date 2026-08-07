interface UptimeStripProps {
  caption: string;
  deployedLabel: string;
  availableLabel: string;
}

const DEPLOYED_SEGMENTS = 44;

export function UptimeStrip({ caption, deployedLabel, availableLabel }: UptimeStripProps) {
  return (
    <div className="max-w-xl">
      <div className="flex gap-0.5" aria-hidden>
        {Array.from({ length: DEPLOYED_SEGMENTS }, (_, index) => (
          <span key={index} className="h-2.5 flex-1 rounded-[2px] bg-emerald-500/80" />
        ))}
        <span className="h-2.5 flex-1 rounded-[2px] bg-amber-400" />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
        <span>{caption}</span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-500/80" aria-hidden />
          {deployedLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-amber-400" aria-hidden />
          {availableLabel}
        </span>
      </div>
    </div>
  );
}
