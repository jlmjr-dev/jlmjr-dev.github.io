import type { Localized } from "@/content/types";

// Production war stories from the CV, framed as resolved incidents
export interface Incident {
  id: string;
  severity: "high" | "medium";
  severityLabel: Localized;
  title: Localized;
  fix: Localized;
}

export const incidents: Incident[] = [
  {
    id: "INC-419",
    severity: "high",
    severityLabel: { en: "high", pt: "alta" },
    title: {
      en: "LCP/TTI regression on the sign-in path, tripping the synthetic login-timeout monitor",
      pt: "Regressão de LCP/TTI no fluxo de sign-in, estourando o monitor sintético de timeout de login",
    },
    fix: {
      en: "Removed two render gates and inlined i18n so i18next initializes synchronously.",
      pt: "Removi dois render gates e embuti o i18n para que o i18next inicialize de forma síncrona.",
    },
  },
  {
    id: "INC-508",
    severity: "medium",
    severityLabel: { en: "medium", pt: "média" },
    title: {
      en: "Hydration mismatches after the React 18 upgrade",
      pt: "Hydration mismatches após o upgrade para React 18",
    },
    fix: {
      en: "Tracked down and fixed the mismatched markup left behind by the framework migrations.",
      pt: "Rastreei e corrigi a marcação divergente deixada pelas migrações de framework.",
    },
  },
  {
    id: "INC-233",
    severity: "medium",
    severityLabel: { en: "medium", pt: "média" },
    title: {
      en: "Race condition in the embedded chat widget",
      pt: "Race condition no widget de chat embarcado",
    },
    fix: {
      en: "Fixed the initialization race so the widget loads reliably regardless of script order.",
      pt: "Corrigi a corrida de inicialização para o widget carregar de forma confiável em qualquer ordem de scripts.",
    },
  },
];
