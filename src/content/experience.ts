import type { Localized } from "@/content/types";

export interface ExperienceEntry {
  company: string;
  role: string;
  location: Localized;
  period: string;
  summary: Localized;
  tech: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "Collective Health",
    role: "Senior Software Engineer",
    location: { en: "Remote", pt: "Remoto" },
    period: "2021 - 2026",
    summary: {
      en: "Five years as a contractor on a US healthcare platform. Maintained the Next.js member portal, led pipeline optimizations and major dependency migrations, built Dialogflow virtual agents for chat and IVR, led an internal plan configuration tool, shipped React Native features and helped move payments to GraphQL, while evolving the internal UI component library.",
      pt: "Cinco anos como prestador de serviços em uma plataforma americana de saúde. Mantive o portal do membro em Next.js, liderei otimizações de pipeline e migrações de dependências vitais, construí agentes virtuais com Dialogflow para chat e URA, liderei uma ferramenta interna de configuração de planos, entreguei funcionalidades no app React Native e ajudei a migrar pagamentos para GraphQL, evoluindo em paralelo a biblioteca interna de componentes UI.",
    },
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "xState",
      "React Native",
      "GraphQL",
      "Java",
      "Postgres",
    ],
  },
  {
    company: "Meta (Localiza)",
    role: "Senior Frontend Software Engineer",
    location: { en: "Remote", pt: "Remoto" },
    period: "2020 - 2021",
    summary: {
      en: "Contractor for Localiza building Zarp, a SaaS web app for renting cars to rideshare drivers such as Uber and 99. Full-stack work focused on the frontend, in an agile SAFe environment.",
      pt: "Prestador de serviços para a Localiza no desenvolvimento do Zarp, uma aplicação SaaS de aluguel de carros para motoristas de aplicativo como Uber e 99. Atuação full-stack com foco no frontend, em ambiente ágil SAFe.",
    },
    tech: ["React", "Redux", "C#", ".NET", "SQL Server", "Jest", "Styled Components"],
  },
  {
    company: "Dimebras",
    role: "Full-Stack Engineer (Freelance)",
    location: { en: "Remote", pt: "Remoto" },
    period: "2019 - 2020",
    summary: {
      en: "Built web and mobile apps for a pharmaceutical distributor's B2B and B2C e-commerce, working directly with the client from prototypes and MVPs through a full ERP integration, maintaining both test and production environments.",
      pt: "Desenvolvi aplicativos web e mobile para o e-commerce B2B e B2C de uma distribuidora de produtos farmacêuticos, trabalhando direto com o cliente, de protótipos e MVPs até a integração completa com o ERP, mantendo ambientes de teste e produção.",
    },
    tech: ["React", "React Native", "AdonisJS", "Redux Saga", "PostgreSQL", "Redis"],
  },
  {
    company: "Totvs",
    role: "Senior Software Engineer",
    location: { en: "Cascavel, Brazil", pt: "Cascavel, PR" },
    period: "2017 - 2020",
    summary: {
      en: "Built a customization mechanism in the core of a legacy ERP, delivered a full B2B e-commerce for Seara Foods (JBS) integrated with the ERP, then joined the innovation team to build the reusable UI component library and the offline-first mobile app for a new SaaS CRM.",
      pt: "Criei um mecanismo de customização no núcleo de um ERP legado, entreguei um e-commerce B2B completo para a Seara Foods (JBS) integrado ao ERP e depois entrei no time de inovação para construir a biblioteca de componentes UI reutilizáveis e o app mobile offline-first de um novo CRM SaaS.",
    },
    tech: ["React", "MobX", "React Native", "Java", "Kotlin", "Spring Boot", "PostgreSQL", "AWS"],
  },
  {
    company: "MV",
    role: "Software Engineer",
    location: { en: "Cascavel, Brazil", pt: "Cascavel, PR" },
    period: "2015 - 2017",
    summary: {
      en: "Full-stack work on the largest public health management system in Brazil, including the SVN to Git migration and the consolidation of legacy products. Led the frontend of an emergency dispatch project for S.A.M.U., Brazil's mobile emergency medical service.",
      pt: "Atuação full-stack no maior sistema de gestão de saúde pública do Brasil, incluindo a migração de SVN para Git e a consolidação de produtos legados. Foquei no frontend de um projeto para o S.A.M.U., o Serviço de Atendimento Móvel de Urgência.",
    },
    tech: ["JavaScript", "jQuery", "AngularJS", "TypeScript", "Java", "Postgres"],
  },
];
