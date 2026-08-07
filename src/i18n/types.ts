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
  game: {
    pressStart: string;
    skip: string;
    hint: string;
    eaten: string;
    exit: string;
    gameOver: string;
    continueGame: string;
    win: string;
    winSub: string;
    playAgain: string;
    restore: string;
  };
  cabinet: {
    insertCoin: string;
    attract: string;
    hiscores: string;
    soundOn: string;
    soundOff: string;
  };
  a11y: {
    switchToLight: string;
    switchToDark: string;
    switchLocale: string;
  };
}
