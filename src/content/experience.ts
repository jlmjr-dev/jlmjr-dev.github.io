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
      en: "Five years on a US healthcare platform. Led the member web platform's framework and build modernization (Next.js 11 to 14, React 17 to 18, Yarn to pnpm, halving install times), architected a TypeScript monorepo consolidating four Dialogflow webhook services onto GCP with Terraform and Cloud Run, built the web authentication experience (JWT, MFA, trusted devices, SSO), led the frontend REST to GraphQL migration on payments, and maintained the internal design system with Radix UI primitives and Storybook.",
      pt: "Cinco anos em uma plataforma americana de saúde. Liderei a modernização de frameworks e build da plataforma web do membro (Next.js 11 para 14, React 17 para 18, Yarn para pnpm, reduzindo os tempos de instalação pela metade), arquitetei um monorepo TypeScript consolidando quatro serviços de webhook Dialogflow em GCP com Terraform e Cloud Run, desenvolvi a autenticação web (JWT, MFA, dispositivos confiáveis, SSO), liderei a migração frontend de REST para GraphQL em pagamentos e mantive o design system interno com primitivas Radix UI e Storybook.",
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
    company: "Localiza (via Meta)",
    role: "Senior Frontend Software Engineer",
    location: { en: "Remote", pt: "Remoto" },
    period: "2020 - 2021",
    summary: {
      en: "Engineered the frontend of Zarp, a greenfield SaaS platform renting cars to rideshare drivers such as Uber and 99, in an agile program running the SAFe framework: responsive React interfaces, React-Redux state and integration with C#/.NET services.",
      pt: "Desenvolvi o frontend do Zarp, uma plataforma SaaS greenfield de aluguel de carros para motoristas de aplicativo como Uber e 99, em um programa ágil estruturado no framework SAFe: interfaces React responsivas, estado com React-Redux e integração com serviços em C#/.NET.",
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
      en: "Built a customization engine in the core of a legacy ERP, delivered a full B2B e-commerce for Seara Foods (JBS) integrated with the ERP, then joined the innovation unit to build the reusable React component library and the offline-first React Native app for a new SaaS CRM, including camera-based business-card capture with the Cloud Vision API.",
      pt: "Criei um mecanismo de customização no núcleo de um ERP legado, entreguei um e-commerce B2B completo para a Seara Foods (JBS) integrado ao ERP e depois entrei na unidade de inovação para construir a biblioteca de componentes React reutilizáveis e o app React Native offline-first de um novo CRM SaaS, incluindo captura de cartões de visita pela câmera com a Cloud Vision API.",
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
