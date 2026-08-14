import type { Service } from "./types";

/**
 * The four packages from freelance-business/01-strategy/positioning.md.
 *
 * Only the *starting* price is shown, per 04-portfolio/portfolio-plan.md: it
 * filters out no-budget enquiries while leaving the real number to the
 * conversation. Quick Fix starts at $150 here (portfolio-plan) rather than the
 * $100 floor in positioning.md — the lower figure stays for negotiation.
 */
export const services: Service[] = [
  {
    id: "quick-fix",
    name: "Quick Fix",
    summary:
      "A bug fix or small feature on an existing React or Node app, turned around fast.",
    startingPrice: "from $150",
    turnaround: "1–5 days",
    includes: [
      "Root-cause fix, not a patch over the symptom",
      "A short written summary of what was wrong",
      "Fixed price agreed before I start",
    ],
  },
  {
    id: "feature-sprint",
    name: "Feature Sprint",
    summary:
      "One to two weeks of focused development — a dashboard, an AI feature, or an integration.",
    startingPrice: "from $500",
    turnaround: "1–2 weeks",
    includes: [
      "Scoped and priced before any work starts",
      "A working, deployed feature at the end",
      "Progress updates you don't have to chase",
    ],
  },
  {
    id: "mvp-build",
    name: "MVP Build",
    summary:
      "A full web application, taken from design through build to deployment.",
    startingPrice: "from $3,000",
    turnaround: "4–8 weeks",
    includes: [
      "Milestone-based — you release payment per completed stage",
      "React + Node + PostgreSQL, deployed and documented",
      "Code reviews and tests, so it survives after handover",
    ],
  },
  {
    id: "care-plan",
    name: "Care Plan",
    summary:
      "Ongoing monthly support for an app that's already live and needs to stay that way.",
    startingPrice: "from $300",
    turnaround: "Monthly retainer",
    includes: [
      "Bug fixes and small improvements",
      "Monitoring, so problems reach me before they reach your users",
      "Priority response ahead of new-project work",
    ],
  },
];
