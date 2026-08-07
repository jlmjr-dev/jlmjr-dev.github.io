import type { Locale } from "@/i18n/config";
import { metrics } from "@/content/metrics";

interface MetricTilesProps {
  locale: Locale;
}

export function MetricTiles({ locale }: MetricTilesProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.value} className="rounded-lg border border-edge bg-surface p-4">
          <p className="text-3xl font-semibold tracking-tight">{metric.value}</p>
          <p className="mt-1 text-xs leading-snug text-muted">{metric.label[locale]}</p>
        </div>
      ))}
    </div>
  );
}
