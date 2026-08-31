import type { SkillGroupKey } from "@/content/skills";
import type { SkinId } from "@/skins/config";

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  identity: {
    role: string;
    focus: string;
    tagline: string;
    location: string;
    availability: string;
    downloadCv: string;
  };
  tabs: {
    about: string;
    work: string;
    projects: string;
    stack: string;
  };
  about: {
    paragraphs: string[];
    educationHeading: string;
    languagesHeading: string;
    languages: string[];
  };
  work: {
    intro: string;
    fullCv: string;
  };
  projects: {
    intro: string;
    viewCode: string;
    viewDemo: string;
    moreOnGitHub: string;
  };
  stack: {
    intro: string;
    outro: string;
    groups: Record<SkillGroupKey, string>;
  };
  skins: Record<SkinId, string>;
  a11y: {
    switchToLight: string;
    switchToDark: string;
    opensInNewTab: string;
    switchLocale: string;
    skinGroup: string;
    sections: string;
    skipToContent: string;
    email: string;
  };
}
