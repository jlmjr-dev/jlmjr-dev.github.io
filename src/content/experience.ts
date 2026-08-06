import type { Localized, LocalizedList } from "@/content/types";

export interface ExperienceEntry {
  company: string;
  role: string;
  location: Localized;
  period: Localized;
  summary?: Localized;
  highlights?: LocalizedList;
  tech: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "Collective Health (contractor via ExtendedTeam)",
    role: "Senior Software Engineer",
    location: { en: "Remote (US-based company)", pt: "Remoto (empresa dos EUA)" },
    period: { en: "Mar 2021 - Jun 2026", pt: "Mar 2021 - Jun 2026" },
    highlights: {
      en: [
        "Owned the webhook consolidation initiative end to end: authored the six-phase migration plan and architected a TypeScript/Node.js monorepo (pnpm, Turborepo, Express) merging four Dialogflow CX webhook services, with a shared OAuth2 client, structured logging with PII masking, and integrations from Zendesk to Firestore and Google Maps.",
        "Led the member web platform's framework and build modernization across three apps and 20+ libraries: Next.js 11 to 14, React 17 to 18, Node 18 to 22, and a full Yarn to pnpm migration that halved install times and cut the PR pipeline from 29 to 16 minutes, with React 19 and Next.js 15 underway.",
        "Built the web authentication experience: JWT sign-in, MFA over SMS and email, a 30-day trusted-device flow, password reset, SSO deep-linking and idle session handling.",
        "Replaced branch-per-environment deploys with an artifact-promotion pipeline on GitHub Actions, Terraform and Cloud Run, giving each service a repo-scoped deploy identity with no long-lived keys.",
        "Worked full-stack on payments: led the frontend REST to GraphQL migration from TanStack Query to Apollo Client, and built invoice and report state machines on the Java/GraphQL billing service.",
        "Maintained the internal design system with product and design: Radix UI accessible primitives, Storybook docs and individually versioned packages; owned internationalization including Spanish localization and the move to the Hygraph headless CMS.",
        "Mentored junior engineers into the codebase and authored 14 Confluence pages adopted as team reference: migration playbooks, architecture spikes and build-versus-buy analyses.",
      ],
      pt: [
        "Liderei a iniciativa de consolidação de webhooks de ponta a ponta: criei o plano de migração em seis fases e arquitetei um monorepo TypeScript/Node.js (pnpm, Turborepo, Express) unificando quatro serviços de webhook Dialogflow CX, com cliente OAuth2 compartilhado, logging estruturado com mascaramento de PII e integrações de Zendesk a Firestore e Google Maps.",
        "Liderei a modernização de frameworks e build da plataforma web do membro, com três aplicações e mais de 20 bibliotecas: Next.js 11 para 14, React 17 para 18, Node 18 para 22 e a migração completa de Yarn para pnpm, que reduziu os tempos de instalação pela metade e o pipeline de PR de 29 para 16 minutos, com React 19 e Next.js 15 em andamento.",
        "Desenvolvi a autenticação web: login com JWT, MFA por SMS e e-mail, dispositivo confiável com token de 30 dias, recuperação de senha, deep linking via SSO e tratamento de sessão ociosa.",
        "Substituí o modelo de uma branch por ambiente por um pipeline de promoção de artefatos em GitHub Actions, Terraform e Cloud Run, com identidade de deploy restrita por repositório e sem chaves de longa duração.",
        "Atuei full-stack em pagamentos: liderei a migração frontend de REST para GraphQL, de TanStack Query para Apollo Client, e construí state machines de invoice e relatórios no serviço de billing em Java/GraphQL.",
        "Mantive o design system interno junto a produto e design: primitivas acessíveis com Radix UI, documentação em Storybook e pacotes versionados individualmente; fui responsável pela internacionalização, incluindo a localização em espanhol e a migração para o headless CMS Hygraph.",
        "Fiz mentoria de engenheiros juniores na base de código e escrevi 14 páginas no Confluence adotadas como referência do time: playbooks de migração, spikes de arquitetura e análises de build versus buy.",
      ],
    },
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "React Native",
      "GraphQL",
      "GCP",
      "Kubernetes",
      "Terraform",
      "Java",
    ],
  },
  {
    company: "Localiza (contractor via Meta)",
    role: "Senior Frontend Software Engineer",
    location: { en: "Remote (Brazil-based company)", pt: "Remoto (empresa brasileira)" },
    period: { en: "Nov 2020 - Mar 2021", pt: "Nov 2020 - Mar 2021" },
    summary: {
      en: "Engineered the frontend of Zarp, a greenfield SaaS platform renting cars to rideshare drivers such as Uber and 99, in an agile program running the SAFe framework: responsive React interfaces, React-Redux state management, integration with C#/.NET and SQL Server services, and Jest unit tests on core flows.",
      pt: "Desenvolvi o frontend do Zarp, uma plataforma SaaS greenfield de aluguel de carros para motoristas de aplicativo como Uber e 99, em um programa ágil estruturado no framework SAFe: interfaces React responsivas, estado com React-Redux, integração com serviços em C#/.NET e SQL Server e testes unitários em Jest.",
    },
    tech: ["React", "Redux", "C#", ".NET", "SQL Server", "Jest", "Styled Components"],
  },
  {
    company: "Totvs",
    role: "Senior Software Engineer",
    location: { en: "Cascavel, Paraná, Brazil", pt: "Cascavel, Paraná, Brasil" },
    period: { en: "Jun 2017 - Nov 2020", pt: "Jun 2017 - Nov 2020" },
    highlights: {
      en: [
        "Designed and built a customization engine inside the core of a legacy Java ERP, letting each client's visual identity be configured through the product itself and sharply reducing the effort to onboard or migrate a client.",
        "Worked on the planning, definition and development of a B2B e-commerce platform for Seara Foods (JBS), one of the company's largest accounts, fully integrated with the client's ERP.",
        "Joined the innovation unit to work on a new SaaS CRM: helped create the reusable React component library used across the CRM teams and built the product's offline-first React Native app, including camera-based business-card capture with the Cloud Vision API.",
      ],
      pt: [
        "Projetei e desenvolvi um mecanismo de customização no núcleo de um ERP legado em Java, permitindo configurar a identidade visual de cada cliente pelo próprio sistema e reduzindo drasticamente o esforço de onboarding e migração.",
        "Atuei no planejamento, na definição e no desenvolvimento de uma plataforma de e-commerce B2B para a Seara Foods (JBS), um dos maiores clientes da empresa, totalmente integrada ao ERP do cliente.",
        "Integrei a unidade de inovação para atuar em um novo CRM SaaS: contribuí na criação da biblioteca de componentes React reutilizáveis usada pelas equipes do produto e atuei no app React Native offline-first, incluindo captura de cartões de visita pela câmera com a Cloud Vision API.",
      ],
    },
    tech: ["React", "MobX", "React Native", "Java", "Kotlin", "Spring Boot", "PostgreSQL", "AWS"],
  },
  {
    company: "Dimebras",
    role: "Full-Stack Engineer (B2B & B2C E-commerce)",
    location: {
      en: "Remote, Brazil (freelance, concurrent with Totvs)",
      pt: "Remoto, Brasil (freelance, em paralelo à Totvs)",
    },
    period: { en: "Feb 2019 - Mar 2020", pt: "Fev 2019 - Mar 2020" },
    summary: {
      en: "Delivered web and mobile e-commerce applications for a pharmaceutical distributor, from prototypes and MVPs through production: React and React Native frontends on an AdonisJS, PostgreSQL and Redis backend, full integration with the client's existing ERP, separate test and production environments, and direct client contact for estimation and negotiation.",
      pt: "Entreguei aplicações web e mobile de e-commerce para uma distribuidora de produtos farmacêuticos, desde protótipos e MVPs até produção: frontends em React e React Native sobre backend em AdonisJS, PostgreSQL e Redis, integração completa ao ERP do cliente, ambientes separados de teste e produção e contato direto para estimativa e negociação.",
    },
    tech: ["React", "React Native", "AdonisJS", "Redux Saga", "PostgreSQL", "Redis"],
  },
  {
    company: "MV",
    role: "Software Engineer",
    location: { en: "Cascavel, Paraná, Brazil", pt: "Cascavel, Paraná, Brasil" },
    period: { en: "Nov 2015 - Jun 2017", pt: "Nov 2015 - Jun 2017" },
    highlights: {
      en: [
        "Developed new features and provided production support for the largest public health management system in Brazil, and contributed to the modernization program that migrated version control from Apache Subversion to Git and consolidated legacy applications into a single product suite.",
        "Joined the S.A.M.U. (Mobile Emergency Medical Service) project at its start as a frontend developer, building the interface in TypeScript and AngularJS and taking part in UI/UX analysis with the client.",
      ],
      pt: [
        "Desenvolvi novas funcionalidades e prestei suporte ao maior sistema de gestão de saúde pública do Brasil, participando também do programa de modernização que migrou o controle de versão de Apache Subversion para Git e consolidou aplicações legadas em um único produto.",
        "Participei do projeto S.A.M.U. (Serviço de Atendimento Móvel de Urgência) desde o início como desenvolvedor frontend, construindo a interface em TypeScript e AngularJS e atuando na análise de UI/UX junto ao cliente.",
      ],
    },
    tech: ["JavaScript", "jQuery", "AngularJS", "TypeScript", "Java", "Postgres"],
  },
];
