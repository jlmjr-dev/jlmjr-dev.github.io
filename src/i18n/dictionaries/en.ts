import type { Dictionary } from "@/i18n/types";

export const en: Dictionary = {
  meta: {
    title: "José Luiz Monteiro Junior | Senior Full-Stack Software Engineer",
    description:
      "Senior full-stack software engineer, frontend-focused, with ten years building and scaling web, mobile and micro-frontend products with React, Next.js, TypeScript and Node.js.",
  },
  nav: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
  },
  hero: {
    greeting: "Hi, I'm",
    role: "Senior Full-Stack Software Engineer, Frontend-Focused",
    tagline:
      "I build and scale web, mobile and micro-frontend products across healthcare, payments and ERP. Ten years deep in the React ecosystem, from design-system components to CI/CD pipelines and Kubernetes.",
    downloadCv: "Download CV",
    contactMe: "Get in touch",
  },
  about: {
    heading: "About",
    paragraphs: [
      "I'm a full-stack engineer with a frontend focus and about ten years of experience across healthcare, payments, mobility and ERP. I spent the last five years at Collective Health, a US healthcare platform, owning cross-cutting initiatives end to end: the member web platform's Next.js and React upgrades, a Yarn to pnpm monorepo migration that halved install times, a TypeScript monorepo consolidating four production webhook services, and the frontend REST to GraphQL migration on payments.",
      "The recurring thread is platform and design-system work: the reusable component libraries at Collective Health and Totvs, accessibility, internationalization, and the tooling and CI/CD around them. When the work calls for it I go down the stack: Node services, GraphQL, Postgres, Terraform, Kubernetes and GCP.",
      "Before the web took over completely, I studied game design. That background still shapes how I think about interaction, feedback and polish. I'm also a daily user of AI-assisted development tools like Claude Code.",
    ],
  },
  experience: {
    heading: "Experience",
  },
  projects: {
    heading: "Projects",
    intro: "Things I build in my own time.",
    viewCode: "View code",
    moreOnGitHub: "More on GitHub",
  },
  skills: {
    heading: "Skills",
    groups: {
      frontend: "Frontend",
      backend: "Backend & data",
      tooling: "Platform & tooling",
    },
  },
  contact: {
    heading: "Let's talk",
    blurb:
      "Open to senior frontend and full-stack opportunities. Based in Brazil, working remotely (UTC-3, overlapping US business hours). The fastest way to reach me is email or LinkedIn.",
    languagesHeading: "Languages",
    languages: ["Portuguese (native)", "English (fluent)", "French (learning)"],
  },
  footer: {
    credit: "Designed and built by José Luiz Monteiro Junior",
    note: "Next.js, Tailwind CSS, statically exported.",
  },
  game: {
    pressStart: "Press start",
    skip: "Skip the game, just scroll",
    hint: "Arrow keys or WASD. Swipe on touch screens.",
    unlocked: "unlocked",
    gameOver: "Game over",
    continueGame: "Continue",
    keepPlaying: "Keep playing",
    jumpTo: "Go to section",
    win: "You win!",
    winSub: "Full profile unlocked. Thanks for playing.",
    playAgain: "Play again",
  },
  a11y: {
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
    switchLocale: "Mudar para português",
  },
};
