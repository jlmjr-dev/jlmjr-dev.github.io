import type { Localized } from "@/content/types";

// Real page elements the snake eats, in order. Selectors resolve to the
// first match at game start.
export interface SnakeTarget {
  id: string;
  selector: string;
  label: Localized;
}

export const snakeTargets: SnakeTarget[] = [
  {
    id: "about",
    selector: "#about h2",
    label: { en: "About", pt: "Sobre" },
  },
  {
    id: "experience",
    selector: "#experience article h3",
    label: { en: "Experience", pt: "Experiência" },
  },
  {
    id: "projects",
    selector: "#projects article h3",
    label: { en: "Projects", pt: "Projetos" },
  },
  {
    id: "skills",
    selector: "#skills li",
    label: { en: "Skills", pt: "Habilidades" },
  },
  {
    id: "contact",
    selector: "#contact a[href^='mailto']",
    label: { en: "Contact", pt: "Contato" },
  },
  {
    id: "footer",
    selector: "footer p",
    label: { en: "The end", pt: "O fim" },
  },
];
