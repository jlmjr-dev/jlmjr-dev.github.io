import type { Localized } from "@/content/types";

export interface Project {
  name: string;
  description: Localized;
  tech: string[];
  repoUrl: string;
}

export const projects: Project[] = [
  {
    name: "tickr",
    description: {
      en: "A live crypto market dashboard: streaming prices, TradingView-style candlestick charts, order book and trades tape, all over one multiplexed WebSocket.",
      pt: "Um dashboard de mercado cripto ao vivo: preços em tempo real, gráficos de candlestick estilo TradingView, livro de ofertas e fita de negociações, tudo por um único WebSocket multiplexado.",
    },
    tech: ["React 19", "Vite", "Tailwind CSS", "TypeScript", "WebSockets"],
    repoUrl: "https://github.com/jlmjr-dev/tickr",
  },
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
