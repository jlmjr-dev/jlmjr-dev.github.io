import type { Localized } from "@/content/types";

export interface Project {
  name: string;
  tagline: Localized;
  description: Localized;
  tech: string[];
  repoUrl: string;
  /** Set once the project is deployed; the card grows a "Live demo" link. */
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    name: "jlmjr-dev.github.io",
    tagline: { en: "The site you are reading", pt: "O site que você está lendo" },
    description: {
      en: "One screen that never scrolls, with the CV behind four tabs. Eight visual skins, each with a light and a dark palette, are one token set redefined eight ways, so the layout code is identical across all of them. Skin, theme and open tab are restored before the first paint. Statically exported, two locales, no client-side routing.",
      pt: "Uma tela que nunca rola, com o CV atrás de quatro abas. Oito skins visuais, cada uma com paleta clara e escura, são um único conjunto de tokens redefinido oito vezes, então o código de layout é idêntico em todas. Skin, tema e aba aberta são restaurados antes da primeira renderização. Exportado estaticamente, em dois idiomas, sem roteamento no cliente.",
    },
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Static export"],
    repoUrl: "https://github.com/jlmjr-dev/jlmjr-dev.github.io",
  },
  {
    name: "agent-ui-study",
    tagline: { en: "Agentic chat, rebuilt", pt: "Chat agêntico, reconstruído" },
    description: {
      en: "A study rebuild of the agentic chat interface: replies that stream over the same event protocol, tool calls that really act on an in-memory workspace, conversations that branch when you edit a turn, and an artifacts panel with version history.",
      pt: "Uma reconstrução de estudo da interface de chat agêntico: respostas em streaming sobre o mesmo protocolo de eventos, tool calls que agem de verdade em um workspace em memória, conversas que ramificam ao editar um turno e um painel de artifacts com histórico de versões.",
    },
    tech: ["React 19", "TypeScript", "Vite", "Tailwind v4", "pnpm monorepo"],
    repoUrl: "https://github.com/jlmjr-dev/agent-ui-study",
    demoUrl: "https://agent-ui-study-jlmjr-dev.vercel.app",
  },
  {
    name: "frontrow",
    tagline: { en: "White-label membership video", pt: "Vídeo por assinatura white-label" },
    description: {
      en: "A two-sided membership video platform. A creator runs a four-step wizard with a live preview, and their public page renders from one element that re-declares the whole token set, so accent, type and corner style reach every component with no per-creator code.",
      pt: "Uma plataforma de vídeo por assinatura de dois lados. O criador passa por um wizard de quatro etapas com preview ao vivo, e a página pública renderiza a partir de um elemento que redeclara todo o conjunto de tokens, levando cor, tipografia e cantos a cada componente sem código por criador.",
    },
    tech: ["React 19", "TypeScript", "Vite", "Tailwind v4"],
    repoUrl: "https://github.com/jlmjr-dev/frontrow",
    demoUrl: "https://frontrow-jlmjr-dev.vercel.app",
  },
  {
    name: "tickr",
    tagline: { en: "Live crypto market dashboard", pt: "Dashboard de mercado cripto ao vivo" },
    description: {
      en: "Streaming prices, a TradingView-library candlestick chart, a real order book and a trades tape. One stream manager multiplexes every subscription over a single Binance socket, reference-counts handlers and reconnects with backoff.",
      pt: "Preços em streaming, gráfico de candlestick com a biblioteca do TradingView, livro de ofertas real e fita de negociações. Um gerenciador de stream multiplexa todas as inscrições em um único socket da Binance, faz contagem de referências e reconecta com backoff.",
    },
    tech: ["React 19", "TypeScript", "Vite", "WebSockets"],
    repoUrl: "https://github.com/jlmjr-dev/tickr",
    demoUrl: "https://tickr-jlmjr-dev.vercel.app",
  },
  {
    name: "tubefy",
    tagline: { en: "Spotify playlists to YouTube mixes", pt: "Playlists do Spotify em mixes do YouTube" },
    description: {
      en: "Two live OAuth-protected APIs with no backend and no client secrets. It scores YouTube candidates for each track on duration, channel type and title similarity, flags the shaky matches, and plays the result in a cinematic focus-mode player.",
      pt: "Duas APIs OAuth ao vivo, sem backend e sem client secrets. Pontua os candidatos do YouTube de cada faixa por duração, tipo de canal e similaridade de título, sinaliza os matches duvidosos e toca o resultado em um player cinematográfico em modo foco.",
    },
    tech: ["React 19", "TypeScript", "Vite", "OAuth + PKCE"],
    repoUrl: "https://github.com/jlmjr-dev/tubefy",
    demoUrl: "https://tubefy-jlmjr-dev.vercel.app",
  },
  {
    name: "pokedex",
    tagline: { en: "The full National Dex, 8-bit", pt: "A National Dex completa, em 8-bit" },
    description: {
      en: "All 1025 Pokémon in a virtualized grid that stays smooth, with a dual-mode detail view: clicking a card opens a sidebar overlay, while the same URL opened directly renders a full, deep-linkable page.",
      pt: "Os 1025 Pokémon em uma grade virtualizada que se mantém fluida, com detalhe em modo duplo: clicar em um card abre um overlay lateral, enquanto a mesma URL aberta direto renderiza uma página completa e linkável.",
    },
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4"],
    repoUrl: "https://github.com/jlmjr-dev/pokedex",
    demoUrl: "https://pokedex-jlmjr-dev.vercel.app",
  },
];
