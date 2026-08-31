import type { Dictionary } from "@/i18n/types";

export const en: Dictionary = {
  meta: {
    title: "José Luiz Monteiro Junior | Senior Full-Stack Software Engineer",
    description:
      "Senior full-stack software engineer, frontend-focused, with ten years building and scaling web, mobile and micro-frontend products with React, Next.js, TypeScript and Node.js.",
  },
  identity: {
    role: "Senior Full-Stack Software Engineer",
    focus: "Frontend-focused",
    tagline:
      "Ten years building and scaling web, mobile and micro-frontend applications across healthcare, payments and ERP.",
    location: "Santa Lúcia, PR, Brazil",
    availability: "Remote, UTC-3, overlapping US business hours",
    downloadCv: "Download CV",
  },
  tabs: {
    about: "About",
    work: "Professional Career",
    projects: "Projects",
    stack: "Stack",
  },
  about: {
    paragraphs: [
      "I'm a full-stack engineer with a frontend focus and about ten years across healthcare, payments, mobility and ERP. I spent the last five years at Collective Health, a US healthcare platform, owning cross-cutting initiatives end to end: the member web platform's Next.js and React upgrades, a Yarn to pnpm migration that halved install times, a TypeScript monorepo consolidating four production webhook services, and the frontend REST to GraphQL migration on payments.",
      "The recurring thread is platform and design-system work: reusable component libraries, accessibility, internationalization, and the tooling and CI/CD around them. When the work calls for it I go down the stack, into Node services, GraphQL, Postgres, Terraform, Kubernetes and GCP.",
      "Before the web took over completely I studied game design, and that still shapes how I think about interaction, feedback and polish.",
    ],
    educationHeading: "Education",
    languagesHeading: "Languages",
    languages: ["Portuguese (native)", "English (fluent)", "French (beginner)"],
  },
  work: {
    intro: "Ten years, five companies.",
    fullCv: "Full detail is in the CV.",
  },
  projects: {
    intro: "Things I build in my own time. All open source.",
    viewCode: "View code",
    viewDemo: "Live demo",
    moreOnGitHub: "More on GitHub",
  },
  stack: {
    outro: "Every chip links to its documentation.",
    intro: "What I reach for, roughly in order of how often.",
    groups: {
      frontend: "Frontend",
      backend: "Backend & data",
      platform: "Platform & CI/CD",
      quality: "Testing & quality",
    },
  },
  skins: {
    modern: "Modern",
    editorial: "Editorial",
    swiss: "Swiss",
    brutalist: "Brutalist",
    blueprint: "Blueprint",
    cyberpunk: "Cyberpunk",
    terminal: "Terminal",
    crt: "CRT",
  },
  a11y: {
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
    opensInNewTab: "opens in a new tab",
    switchLocale: "Mudar para português",
    skinGroup: "Visual style",
    sections: "Sections",
    skipToContent: "Skip to content",
    email: "Email",
  },
};
