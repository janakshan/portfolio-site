import type { NavItem } from "./types";

/**
 * Every piece of personal detail lives here. Search for "TODO_" to find the
 * values you still need to fill in — nothing else in the codebase hardcodes them.
 */
export const site = {
  name: "Janakshan Krishnamoorthy",

  // ── Positioning (verbatim from freelance-business/01-strategy/positioning.md) ──
  /** Full string — used for metadata, OG tags and anywhere one line is needed. */
  headline:
    "Senior Full-Stack Engineer — React · Node.js · TypeScript · AI Integration",
  /** Same headline, split so the hero can wrap it without stranding a separator. */
  role: "Senior Full-Stack Engineer",
  stack: ["React", "Node.js", "TypeScript", "AI Integration"],
  shortHeadline:
    "Senior Full-Stack Developer — React/Node/TypeScript + AI features",
  valueProp: "Senior quality, sensible price, zero communication headaches.",
  valuePropDetail:
    "One experienced engineer who can handle your front-end, back-end, database, mobile, and AI features — and explains things in plain language.",
  intro:
    "I'm a senior full-stack engineer with 8+ years of experience building web and mobile apps with TypeScript, React, and Node.js. In my current role I own the API layer of an AI-powered platform, so I'm comfortable adding AI features (chat, document processing, automation) to real products. I focus on clean, maintainable code and clear communication.",

  /**
   * Formspree form ID — the last segment of https://formspree.io/f/<id>.
   * Public by design: it ships in the client bundle either way, so there is no
   * secret to protect. Override per-environment with NEXT_PUBLIC_FORMSPREE_ID
   * to point at a different form without a code change.
   */
  formspreeId: "meajgpjw",

  // ── Contact details ──
  email: "hello@janakshan.dev",
  linkedin: "https://www.linkedin.com/in/janakshan/",
  github: "https://github.com/janakshan",
  /** Production URL, used for metadata, sitemap and OG tags. */
  url: "https://janakshan.dev",

  /**
   * Square headshot in `public/`. Set to "" to fall back to initials instead.
   * The source is downscaled to 800×800 — next/image serves smaller variants
   * from it, so there's no point committing anything larger.
   */
  photo: "/profile.jpg",

  // ── Availability ──
  location: "Sri Lanka",
  timezone: "UTC+5:30",
  timezoneNote:
    "Based in Sri Lanka (UTC+5:30) — I overlap comfortably with EU/UK hours, Australian hours, and US mornings/evenings.",
  availability: "Available for new projects",
  replyTime: "Typical reply within 12 hours",

  // ── The one CTA, repeated after every section ──
  ctaPrompt: "Have a project in mind?",
  ctaLabel: "Get in touch",

  /** Honest framing for company work that can't be shown. */
  ndaNote:
    "8+ years of professional experience; company work is under NDA, so I built these public demos to show my approach.",
} as const;

/** Root-relative hashes so the header works from case-study pages too. */
export const navItems: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const contactHref = "/#contact";

/**
 * True while a value is still an unfilled placeholder. Used to render plain text
 * instead of a link that would go nowhere.
 */
export function isPlaceholder(value: string): boolean {
  return value.includes("TODO_") || value.includes("TODO-");
}

export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Project enquiry",
)}`;
