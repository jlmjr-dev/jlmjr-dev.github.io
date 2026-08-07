import type { Localized } from "@/content/types";

// The eras the site migrates through. "now" has no style overrides;
// it is the site as it actually is.
export type EraId = "1998" | "2006" | "2013" | "2019" | "now";

export interface Era {
  id: EraId;
  label: string;
  caption: Localized;
}

export const eras: Era[] = [
  {
    id: "1998",
    label: "1998",
    caption: {
      en: "Somewhere in Paraná, a kid discovers computers.",
      pt: "Em algum lugar do Paraná, um menino descobre os computadores.",
    },
  },
  {
    id: "2006",
    label: "2006",
    caption: {
      en: "Tables give way to CSS. Glossy buttons everywhere.",
      pt: "As tabelas dão lugar ao CSS. Botões brilhantes por todo lado.",
    },
  },
  {
    id: "2013",
    label: "2013",
    caption: {
      en: "Bootstrap and jQuery. Systems Analysis at Univel, then first production code at MV.",
      pt: "Bootstrap e jQuery. Análise de Sistemas na Univel, depois o primeiro código em produção na MV.",
    },
  },
  {
    id: "2019",
    label: "2019",
    caption: {
      en: "React, SPAs and very purple dark modes. Totvs, component libraries, a game design degree.",
      pt: "React, SPAs e dark modes bem roxos. Totvs, bibliotecas de componentes, uma pós em game design.",
    },
  },
  {
    id: "now",
    label: "2026",
    caption: {
      en: "Next.js, TypeScript and design systems. Ten years of migrations later.",
      pt: "Next.js, TypeScript e design systems. Dez anos de migrações depois.",
    },
  },
];
