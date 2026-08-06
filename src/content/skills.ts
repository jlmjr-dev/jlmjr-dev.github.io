export interface SkillGroup {
  key: "frontend" | "backend" | "tooling";
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    key: "frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Redux",
      "xState",
      "TanStack Query",
      "Storybook",
      "Radix UI",
      "Tailwind CSS",
    ],
  },
  {
    key: "backend",
    items: [
      "Node.js",
      "Express",
      "GraphQL",
      "Apollo Client",
      "PostgreSQL",
      "Redis",
      "Java",
    ],
  },
  {
    key: "tooling",
    items: [
      "GCP",
      "Kubernetes",
      "Docker",
      "Terraform",
      "GitHub Actions",
      "pnpm",
      "Turborepo",
      "Jest",
      "Playwright",
      "Claude Code",
    ],
  },
];
