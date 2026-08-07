import type { Localized } from "@/content/types";

// Real CV numbers rendered as dashboard stat tiles
export interface Metric {
  value: string;
  label: Localized;
}

export const metrics: Metric[] = [
  {
    value: "10",
    label: { en: "years shipping software", pt: "anos entregando software" },
  },
  {
    value: "29→16",
    label: { en: "PR pipeline minutes", pt: "minutos do pipeline de PR" },
  },
  {
    value: "x0.5",
    label: { en: "install time after Yarn to pnpm", pt: "tempo de install após Yarn para pnpm" },
  },
  {
    value: "4→1",
    label: { en: "webhook repos consolidated", pt: "repos de webhook consolidados" },
  },
];
