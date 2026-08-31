import { inAllLocales, type Localized, type LocalizedList } from "@/content/types";

/** The firm a contract ran through, shown next to the client it was for. */
export interface Intermediary {
  name: Localized;
  url?: Localized;
}

/** A product built in the role that the public can go and look at. */
export interface Product {
  name: string;
  url: Localized;
}

export interface ExperienceEntry {
  company: string;
  companyUrl?: Localized;
  role: string;
  location: Localized;
  period: Localized;
  /** One line, shown while the entry is collapsed. */
  summary: Localized;
  highlights?: LocalizedList;
  tech: string[];
  via?: Intermediary;
  products?: Product[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "Collective Health",
    companyUrl: inAllLocales("https://collectivehealth.com/"),
    role: "Senior Software Engineer",
    location: { en: "Remote, US company", pt: "Remoto, empresa dos EUA" },
    via: {
      name: inAllLocales("ExtendedTeam"),
      url: inAllLocales("https://extendedteam.com.br/"),
    },
    period: { en: "Mar 2021 - Jun 2026", pt: "Mar 2021 - Jun 2026" },
    summary: {
      en: "Five years on a US health benefits platform, owning cross-cutting initiatives end to end across the member web platform, payments and the conversational stack.",
      pt: "Cinco anos em uma plataforma de benefícios de saúde dos EUA, conduzindo iniciativas transversais de ponta a ponta na plataforma web do membro, em pagamentos e na stack conversacional.",
    },
    highlights: {
      en: [
        "Owned the webhook consolidation initiative end to end: a six-phase migration plan, then a TypeScript monorepo (pnpm, Turborepo, Express) merging four Dialogflow CX services behind a shared OAuth2 client, structured logging with PII masking, and integrations from Zendesk to Firestore.",
        "Led framework and build modernization across three apps and 20+ libraries: Next.js 11 to 14, React 17 to 18, Node 18 to 22, and a Yarn to pnpm migration that halved install times and cut the PR pipeline from 29 to 16 minutes.",
        "Built the web authentication experience: JWT sign-in, MFA over SMS and email, a 30-day trusted-device flow, password reset, SSO deep-linking and idle session handling.",
        "Replaced branch-per-environment deploys with an artifact-promotion pipeline on GitHub Actions, Terraform and Cloud Run, giving each service a repo-scoped deploy identity with no long-lived keys.",
        "Worked full-stack on payments: led the frontend REST to GraphQL migration onto Apollo Client, and built invoice and report state machines on the Java billing service.",
        "Maintained the design system with product and design on Radix primitives and Storybook, and owned internationalization through Spanish localization and the move to a headless CMS.",
        "Mentored junior engineers into the codebase and wrote 14 Confluence pages adopted as team reference: migration playbooks, architecture spikes and build-versus-buy analyses.",
      ],
      pt: [
        "Conduzi a iniciativa de consolidação de webhooks de ponta a ponta: um plano de migração em seis fases e um monorepo TypeScript (pnpm, Turborepo, Express) unificando quatro serviços Dialogflow CX sobre um cliente OAuth2 compartilhado, logging estruturado com mascaramento de PII e integrações de Zendesk a Firestore.",
        "Liderei a modernização de frameworks e build em três aplicações e mais de 20 bibliotecas: Next.js 11 para 14, React 17 para 18, Node 18 para 22 e a migração de Yarn para pnpm, que reduziu pela metade os tempos de instalação e o pipeline de PR de 29 para 16 minutos.",
        "Desenvolvi a autenticação web: login com JWT, MFA por SMS e e-mail, dispositivo confiável com token de 30 dias, recuperação de senha, deep linking via SSO e tratamento de sessão ociosa.",
        "Substituí o modelo de uma branch por ambiente por um pipeline de promoção de artefatos em GitHub Actions, Terraform e Cloud Run, com identidade de deploy restrita por repositório e sem chaves de longa duração.",
        "Atuei full-stack em pagamentos: liderei a migração frontend de REST para GraphQL sobre Apollo Client e construí state machines de invoice e relatórios no serviço de billing em Java.",
        "Mantive o design system junto a produto e design sobre primitivas Radix e Storybook, e fui responsável pela internacionalização, da localização em espanhol à migração para um headless CMS.",
        "Fiz mentoria de engenheiros juniores na base de código e escrevi 14 páginas no Confluence adotadas como referência do time: playbooks de migração, spikes de arquitetura e análises de build versus buy.",
      ],
    },
    tech: ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "GCP", "Terraform", "Java"],
  },
  {
    company: "Localiza",
    companyUrl: inAllLocales("https://www.localiza.com/"),
    role: "Senior Frontend Software Engineer",
    location: { en: "Remote, Brazil", pt: "Remoto, Brasil" },
    via: {
      name: { en: "Meta (now Insi)", pt: "Meta (hoje Insi)" },
      url: { en: "https://insi.com/en", pt: "https://insi.com/br" },
    },
    period: { en: "Nov 2020 - Mar 2021", pt: "Nov 2020 - Mar 2021" },
    summary: {
      en: "Engineered the frontend of Zarp, a greenfield SaaS platform renting cars to rideshare drivers such as Uber and 99, in a SAFe program.",
      pt: "Desenvolvi o frontend do Zarp, uma plataforma SaaS greenfield de aluguel de carros para motoristas de aplicativo como Uber e 99, em um programa SAFe.",
    },
    highlights: {
      en: [
        "Responsive, cross-browser React interfaces with React-Redux state management, integrated with C#/.NET and SQL Server services, and Jest unit tests over the core flows.",
      ],
      pt: [
        "Interfaces React responsivas e cross-browser com estado em React-Redux, integradas a serviços em C#/.NET e SQL Server, e testes unitários em Jest nos fluxos principais.",
      ],
    },
    tech: ["React", "Redux", "C#", ".NET", "SQL Server", "Jest"],
    products: [{ name: "Localiza Zarp", url: inAllLocales("https://zarp.localiza.com/") }],
  },
  {
    company: "Totvs",
    companyUrl: { en: "https://en.totvs.com/", pt: "https://www.totvs.com/" },
    role: "Senior Software Engineer",
    location: { en: "Cascavel, Paraná, Brazil", pt: "Cascavel, Paraná, Brasil" },
    period: { en: "Jun 2017 - Nov 2020", pt: "Jun 2017 - Nov 2020" },
    summary: {
      en: "ERP core work, a B2B commerce platform for one of the largest accounts, then the innovation unit building a new SaaS CRM.",
      pt: "Trabalho no núcleo do ERP, uma plataforma de comércio B2B para um dos maiores clientes e, depois, a unidade de inovação construindo um novo CRM SaaS.",
    },
    highlights: {
      en: [
        "Designed a customization engine inside the core of a legacy Java ERP, letting each client's visual identity be configured through the product itself and sharply cutting the effort to onboard or migrate a client.",
        "Planned and built a B2B e-commerce platform for Seara Foods (JBS), fully integrated with the client's ERP.",
        "In the innovation unit, helped create the reusable React component library used across the CRM teams and built the offline-first React Native app, including business-card capture through the camera with the Cloud Vision API.",
      ],
      pt: [
        "Projetei um mecanismo de customização no núcleo de um ERP legado em Java, permitindo configurar a identidade visual de cada cliente pelo próprio sistema e reduzindo drasticamente o esforço de onboarding e migração.",
        "Planejei e desenvolvi uma plataforma de e-commerce B2B para a Seara Foods (JBS), totalmente integrada ao ERP do cliente.",
        "Na unidade de inovação, ajudei a criar a biblioteca de componentes React reutilizáveis usada pelas equipes do CRM e desenvolvi o app React Native offline-first, incluindo captura de cartões de visita pela câmera com a Cloud Vision API.",
      ],
    },
    tech: ["React", "MobX", "React Native", "Java", "Spring Boot", "PostgreSQL", "AWS"],
    products: [
      {
        name: "TOTVS CRM",
        url: inAllLocales("https://www.totvs.com/crm/gestao-de-clientes/"),
      },
    ],
  },
  {
    company: "Dimebras",
    companyUrl: inAllLocales("https://www.dimebras.com.br/"),
    role: "Full-Stack Engineer",
    location: {
      en: "Remote, Brazil (freelance, alongside Totvs)",
      pt: "Remoto, Brasil (freelance, em paralelo à Totvs)",
    },
    period: { en: "Feb 2019 - Mar 2020", pt: "Fev 2019 - Mar 2020" },
    summary: {
      en: "Web and mobile e-commerce for a pharmaceutical distributor, from prototype to production, with direct client contact for estimation and negotiation.",
      pt: "E-commerce web e mobile para uma distribuidora farmacêutica, do protótipo à produção, com contato direto com o cliente para estimativa e negociação.",
    },
    highlights: {
      en: [
        "React and React Native frontends on an AdonisJS, PostgreSQL and Redis backend, fully integrated with the client's existing ERP across separate test and production environments.",
      ],
      pt: [
        "Frontends em React e React Native sobre backend em AdonisJS, PostgreSQL e Redis, integrados ao ERP existente do cliente em ambientes separados de teste e produção.",
      ],
    },
    tech: ["React", "React Native", "AdonisJS", "PostgreSQL", "Redis"],
  },
  {
    company: "MV",
    companyUrl: { en: "https://mv.com.br/en", pt: "https://mv.com.br/" },
    role: "Software Engineer",
    location: { en: "Cascavel, Paraná, Brazil", pt: "Cascavel, Paraná, Brasil" },
    period: { en: "Nov 2015 - Jun 2017", pt: "Nov 2015 - Jun 2017" },
    summary: {
      en: "Features and production support for the largest public health management system in Brazil, and the S.A.M.U. emergency service project from its start.",
      pt: "Funcionalidades e suporte em produção para o maior sistema de gestão de saúde pública do Brasil, e o projeto do S.A.M.U. desde o início.",
    },
    highlights: {
      en: [
        "Contributed to the modernization program that moved version control from Apache Subversion to Git and consolidated legacy applications into a single product suite.",
        "Joined the S.A.M.U. (Mobile Emergency Medical Service) project at its start as a frontend developer, building the interface in TypeScript and AngularJS and taking part in UI/UX analysis with the client.",
      ],
      pt: [
        "Participei do programa de modernização que migrou o controle de versão de Apache Subversion para Git e consolidou aplicações legadas em um único produto.",
        "Entrei no projeto do S.A.M.U. (Serviço de Atendimento Móvel de Urgência) desde o início como desenvolvedor frontend, construindo a interface em TypeScript e AngularJS e atuando na análise de UI/UX junto ao cliente.",
      ],
    },
    tech: ["JavaScript", "AngularJS", "TypeScript", "Java", "PostgreSQL"],
  },
];
