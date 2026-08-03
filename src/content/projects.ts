import type { Localized } from "@/content/types";

export interface Project {
  name: string;
  description: Localized;
  tech: string[];
  repoUrl: string;
}

export const projects: Project[] = [
  {
    name: "tubefy",
    description: {
      en: "A cinematic web app that turns Spotify playlists into YouTube music-video mixes.",
      pt: "Um app web cinematográfico que transforma playlists do Spotify em mixes de videoclipes do YouTube.",
    },
    tech: ["React 19", "Vite", "Tailwind CSS", "TypeScript", "OAuth"],
    repoUrl: "https://github.com/jlmjr-dev/tubefy",
  },
  {
    name: "pokedex",
    description: {
      en: "A responsive, retro 8-bit Pokedex powered by the PokeAPI.",
      pt: "Uma Pokedex retrô 8-bit e responsiva, alimentada pela PokeAPI.",
    },
    tech: ["Next.js", "React 19", "Tailwind CSS", "TypeScript"],
    repoUrl: "https://github.com/jlmjr-dev/pokedex",
  },
];
