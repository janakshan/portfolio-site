export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  id: string;
  name: string;
  summary: string;
  /** Starting price shown on the site. Exact quotes stay in conversations. */
  startingPrice: string;
  turnaround: string;
  includes: string[];
};

export type ProjectStatus = "published" | "placeholder";

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  /** One-line outcome, business-first. Pairs with the name in the case-study title. */
  outcome: string;
  /** Honest label. Demos must never be presented as paid client work. */
  type: "Demo project — built to demonstrate my approach" | "Client project";
  role: string;
  timeline: string;
  status: ProjectStatus;
  /** Card blurb on the homepage, 1–2 sentences, no technical words. */
  teaser: string;
  liveUrl?: string;
  codeUrl?: string;
  /** 2–3 sentences, zero technical words. */
  problem: string[];
  /** 3–5 bullets, one of which is a deliberate non-goal (senior judgement). */
  approach: string[];
  /** 2–4 bullets, measured claims only. */
  result: string[];
  tech: {
    stack: string;
    architecture: string;
    interestingBits: string[];
  };
  /** Primary tags shown on the project card. */
  tags: string[];
  screenshots: ProjectScreenshot[];
};

export type TechItem = {
  name: string;
  category: "Languages" | "Front-end" | "Back-end" | "Data" | "Mobile" | "Cloud & AI";
};
