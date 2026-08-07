export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role: string;
    tagline: string;
    downloadCv: string;
    contactMe: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
  };
  experience: {
    heading: string;
  };
  projects: {
    heading: string;
    intro: string;
    viewCode: string;
    moreOnGitHub: string;
  };
  skills: {
    heading: string;
    groups: {
      frontend: string;
      backend: string;
      tooling: string;
    };
  };
  contact: {
    heading: string;
    blurb: string;
    languagesHeading: string;
    languages: string[];
  };
  footer: {
    credit: string;
    note: string;
  };
  playground: {
    customize: string;
    tagline: string;
    theme: string;
    accent: string;
    corners: string;
    reset: string;
    close: string;
    themes: {
      neutral: string;
      editorial: string;
      arcade: string;
      glossy: string;
    };
    cornersOptions: {
      sharp: string;
      soft: string;
      round: string;
    };
  };
  a11y: {
    switchToLight: string;
    switchToDark: string;
    switchLocale: string;
  };
}
