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
      "Tailwind CSS",
      "Styled Components",
    ],
  },
  {
    key: "backend",
    items: ["Node.js", "GraphQL", "Java", "PostgreSQL", "Redis"],
  },
  {
    key: "tooling",
    items: ["Webpack", "Vite", "Turborepo", "Jest", "Git", "CI/CD", "Claude Code"],
  },
];
