import type { TechItem } from "./types";

/**
 * One stack, listed honestly — positioning.md is explicit that "expert in
 * everything" reads as expert in nothing. These are the ten named in
 * 04-portfolio/portfolio-plan.md, and they match the CV.
 */
export const tech: TechItem[] = [
  { name: "TypeScript", category: "Languages" },
  { name: "React", category: "Front-end" },
  { name: "Next.js", category: "Front-end" },
  { name: "Node.js", category: "Back-end" },
  { name: "Express", category: "Back-end" },
  { name: "PostgreSQL", category: "Data" },
  { name: "MongoDB", category: "Data" },
  { name: "React Native", category: "Mobile" },
  { name: "AWS", category: "Cloud & AI" },
  { name: "Claude / LLM APIs", category: "Cloud & AI" },
];

/** Display order for the groups. */
const categoryOrder: TechItem["category"][] = [
  "Languages",
  "Front-end",
  "Back-end",
  "Data",
  "Mobile",
  "Cloud & AI",
];

export const techByCategory = categoryOrder.map((category) => ({
  category,
  items: tech.filter((item) => item.category === category),
}));
