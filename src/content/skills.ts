export interface Skill {
  name: string;
  url: string;
  /** Simple Icons slug, omitted for concepts with no brand icon. */
  slug?: string;
}

export type SkillGroupKey = "frontend" | "backend" | "platform" | "quality";

export interface SkillGroup {
  key: SkillGroupKey;
  items: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    key: "frontend",
    items: [
      {
        name: "React",
        url: "https://react.dev",
        slug: "react",
      },
      {
        name: "Next.js",
        url: "https://nextjs.org/docs",
        slug: "nextdotjs",
      },
      {
        name: "TypeScript",
        url: "https://www.typescriptlang.org/docs/",
        slug: "typescript",
      },
      {
        name: "React Native",
        url: "https://reactnative.dev",
      },
      {
        name: "Micro-frontends",
        url: "https://micro-frontends.org",
      },
      {
        name: "Design systems",
        url: "https://www.nngroup.com/articles/design-systems-101/",
      },
      {
        name: "Radix UI",
        url: "https://www.radix-ui.com/primitives/docs/overview/introduction",
        slug: "radixui",
      },
      {
        name: "Storybook",
        url: "https://storybook.js.org/docs",
        slug: "storybook",
      },
      {
        name: "Redux",
        url: "https://redux.js.org",
        slug: "redux",
      },
      {
        name: "xState",
        url: "https://stately.ai/docs/xstate",
        slug: "xstate",
      },
      {
        name: "TanStack Query",
        url: "https://tanstack.com/query/latest",
        slug: "reactquery",
      },
      {
        name: "Apollo Client",
        url: "https://www.apollographql.com/docs/react",
        slug: "apollographql",
      },
      {
        name: "Tailwind CSS",
        url: "https://tailwindcss.com/docs",
        slug: "tailwindcss",
      },
      {
        name: "i18n",
        url: "https://www.w3.org/International/",
      },
    ],
  },
  {
    key: "backend",
    items: [
      {
        name: "Node.js",
        url: "https://nodejs.org/docs/latest/api/",
        slug: "nodedotjs",
      },
      {
        name: "Express",
        url: "https://expressjs.com",
        slug: "express",
      },
      {
        name: "GraphQL",
        url: "https://graphql.org/learn/",
        slug: "graphql",
      },
      {
        name: "REST",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/REST",
      },
      {
        name: "PostgreSQL",
        url: "https://www.postgresql.org/docs/",
        slug: "postgresql",
      },
      {
        name: "Redis",
        url: "https://redis.io/docs/latest/",
        slug: "redis",
      },
      {
        name: "Firestore",
        url: "https://firebase.google.com/docs/firestore",
      },
      {
        name: "Java",
        url: "https://docs.oracle.com/en/java/javase/",
      },
      {
        name: "Spring Boot",
        url: "https://docs.spring.io/spring-boot/index.html",
        slug: "springboot",
      },
    ],
  },
  {
    key: "platform",
    items: [
      {
        name: "GCP",
        url: "https://cloud.google.com/docs",
        slug: "googlecloud",
      },
      {
        name: "Cloud Run",
        url: "https://cloud.google.com/run/docs",
      },
      {
        name: "Kubernetes",
        url: "https://kubernetes.io/docs/home/",
        slug: "kubernetes",
      },
      {
        name: "Terraform",
        url: "https://developer.hashicorp.com/terraform/docs",
        slug: "terraform",
      },
      {
        name: "Docker",
        url: "https://docs.docker.com",
        slug: "docker",
      },
      {
        name: "GitHub Actions",
        url: "https://docs.github.com/en/actions",
        slug: "githubactions",
      },
      {
        name: "Buildkite",
        url: "https://buildkite.com/docs",
        slug: "buildkite",
      },
      {
        name: "pnpm",
        url: "https://pnpm.io",
        slug: "pnpm",
      },
      {
        name: "Turborepo",
        url: "https://turborepo.dev/docs",
        slug: "turborepo",
      },
      {
        name: "Webpack",
        url: "https://webpack.js.org",
        slug: "webpack",
      },
      {
        name: "Turbopack",
        url: "https://nextjs.org/docs/app/api-reference/turbopack",
      },
    ],
  },
  {
    key: "quality",
    items: [
      {
        name: "Jest",
        url: "https://jestjs.io/docs/getting-started",
        slug: "jest",
      },
      {
        name: "Testing Library",
        url: "https://testing-library.com/docs/",
        slug: "testinglibrary",
      },
      {
        name: "Playwright",
        url: "https://playwright.dev/docs/intro",
      },
      {
        name: "Cypress",
        url: "https://docs.cypress.io",
        slug: "cypress",
      },
      {
        name: "Accessibility (WCAG)",
        url: "https://www.w3.org/WAI/standards-guidelines/wcag/",
      },
      {
        name: "Observability",
        url: "https://opentelemetry.io/docs/concepts/observability-primer/",
      },
      {
        name: "CSP",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP",
      },
      {
        name: "LaunchDarkly",
        url: "https://launchdarkly.com/docs/home",
      },
      {
        name: "Sentry",
        url: "https://docs.sentry.io",
        slug: "sentry",
      },
      {
        name: "Claude Code",
        url: "https://code.claude.com/docs/en/overview",
        slug: "claudecode",
      },
    ],
  },
];
