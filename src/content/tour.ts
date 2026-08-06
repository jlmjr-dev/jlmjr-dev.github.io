import type { Localized } from "@/content/types";

export interface TourStop {
  id: string;
  anchor?: string;
  label: Localized;
  teaser: Localized;
  isCvDownload?: boolean;
}

export const tourStops: TourStop[] = [
  {
    id: "about",
    anchor: "#about",
    label: { en: "About", pt: "Sobre" },
    teaser: {
      en: "Ten years of frontend, from Cascavel to US healthcare platforms.",
      pt: "Dez anos de frontend, de Cascavel a plataformas de saúde americanas.",
    },
  },
  {
    id: "experience",
    anchor: "#experience",
    label: { en: "Experience", pt: "Experiência" },
    teaser: {
      en: "Five years at Collective Health, plus Localiza, Totvs, Dimebras and MV.",
      pt: "Cinco anos na Collective Health, além de Localiza, Totvs, Dimebras e MV.",
    },
  },
  {
    id: "projects",
    anchor: "#projects",
    label: { en: "Projects", pt: "Projetos" },
    teaser: {
      en: "tickr, frontrow, tubefy and a retro 8-bit pokedex.",
      pt: "tickr, frontrow, tubefy e uma pokedex retrô 8-bit.",
    },
  },
  {
    id: "skills",
    anchor: "#skills",
    label: { en: "Skills", pt: "Habilidades" },
    teaser: {
      en: "React, Next.js, TypeScript, and the whole delivery chain behind them.",
      pt: "React, Next.js, TypeScript e toda a cadeia de entrega por trás deles.",
    },
  },
  {
    id: "contact",
    anchor: "#contact",
    label: { en: "Contact", pt: "Contato" },
    teaser: {
      en: "Email, LinkedIn, GitHub. Remote from Brazil, UTC-3.",
      pt: "Email, LinkedIn, GitHub. Remoto do Brasil, UTC-3.",
    },
  },
  {
    id: "cv",
    label: { en: "CV", pt: "CV" },
    teaser: {
      en: "The full story, in PDF.",
      pt: "A história completa, em PDF.",
    },
    isCvDownload: true,
  },
];
