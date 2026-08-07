import type { Localized } from "@/content/types";

export interface EducationEntry {
  label: Localized;
  period: string;
}

export const gameDesignDegree: EducationEntry = {
  label: {
    en: "Postgraduate specialization in Game Design, Universidade Positivo",
    pt: "Pós-graduação em Game Design, Universidade Positivo",
  },
  period: "2018 - 2019",
};

export const bachelorDegree: EducationEntry = {
  label: {
    en: "Bachelor's in Systems Analysis and Development, Univel",
    pt: "Graduação em Análise e Desenvolvimento de Sistemas, Univel",
  },
  period: "2014 - 2016",
};
