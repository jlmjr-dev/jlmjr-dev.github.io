import { inAllLocales, type Localized } from "@/content/types";

export interface EducationEntry {
  degree: Localized;
  school: string;
  schoolUrl?: Localized;
  period: Localized;
}

export const education: EducationEntry[] = [
  {
    degree: {
      en: "Postgraduate specialization in Game Design",
      pt: "Pós-graduação lato sensu em Game Design",
    },
    school: "Universidade Positivo",
    schoolUrl: inAllLocales("https://www.up.edu.br/"),
    period: { en: "2018 - 2019", pt: "2018 - 2019" },
  },
  {
    degree: {
      en: "Technologist Degree in Systems Analysis and Development",
      pt: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    },
    school: "Univel, Cascavel",
    schoolUrl: inAllLocales("https://univel.br/"),
    period: { en: "2014 - 2016", pt: "2014 - 2016" },
  },
];
