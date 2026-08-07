import type { Localized } from "@/content/types";

// Real numbers from the CV, presented as arcade high scores
export interface HighScore {
  score: string;
  label: Localized;
}

export const highScores: HighScore[] = [
  {
    score: "29→16",
    label: { en: "PR pipeline minutes", pt: "Minutos do pipeline de PR" },
  },
  {
    score: "x0.5",
    label: { en: "Install time after Yarn→pnpm", pt: "Tempo de install após Yarn→pnpm" },
  },
  {
    score: "4→1",
    label: { en: "Webhook repos consolidated", pt: "Repos de webhook consolidados" },
  },
  {
    score: "3→1",
    label: { en: "Auth round trips", pt: "Chamadas na autenticação" },
  },
  {
    score: "20+",
    label: { en: "Libraries migrated in one monorepo", pt: "Bibliotecas migradas em um monorepo" },
  },
  {
    score: "10",
    label: { en: "Years shipping software", pt: "Anos entregando software" },
  },
];
