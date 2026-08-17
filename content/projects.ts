import type { Project } from "./types";

/**
 * The three demo projects from freelance-business/04-portfolio/.
 *
 * Trueline is built and `published`. BookBoard and FieldNote stay
 * `status: "placeholder"` until they actually exist — a placeholder renders as a
 * card with no outbound link and is excluded from the case-study routes, so
 * nothing on the site ever points at something that isn't there.
 *
 * ── To publish one ──────────────────────────────────────────────────────────
 * 1. Fill `result` with numbers you actually measured. No estimates.
 * 2. Add `liveUrl` and `codeUrl`.
 * 3. Drop screenshots in `public/projects/<slug>/` and list them in `screenshots`
 *    with their real pixel dimensions (needed to reserve layout space).
 * 4. Flip `status` to "published".
 *
 * `problem` and `approach` are already written from the project briefs — they
 * describe intent, which is true today. `result` is deliberately empty: the
 * case-study template allows measured numbers only.
 */
export const projects: Project[] = [
  {
    slug: "trueline",
    name: "Trueline",
    outcome: "Turning document piles into clean data, with a human in the loop",
    type: "Demo project — built to demonstrate my approach",
    role: "Design, development, deployment (solo)",
    timeline: "1 day (~5 hours), solo",
    status: "published",
    liveUrl: "https://trueline.janakshan.dev",
    codeUrl: "https://github.com/janakshan/trueline",
    teaser:
      "Businesses retype invoices and receipts into spreadsheets by hand. This reads them instead, points out the numbers that do not add up, and lets a person confirm the result in seconds before exporting it clean.",
    tags: ["Next.js", "Claude API", "PostgreSQL", "AI extraction", "Human-in-the-loop"],
    problem: [
      "Small businesses receive invoices and receipts as PDFs and phone photos. Someone has to retype every one of them into a spreadsheet.",
      "It is slow, nobody enjoys it, and the mistakes only surface later — in the accounts, where they cost real money.",
    ],
    approach: [
      "Upload a document and it comes back as structured data: supplier, dates, line items, tax and totals. Check it, then export a batch to CSV.",
      "AI extraction is never completely right, so the review step is the product rather than an afterthought. The extracted fields sit beside the original document, editable, and the app checks the sums itself: when the line items do not add up to the printed subtotal, it says so in plain words and shows the exact difference.",
      "The key decision was to tell the AI to copy what the document says and never to correct it. That sounds backwards until you follow it through — if the AI quietly fixes a wrong total, nobody ever learns the document was wrong. Copying it exactly is what lets the arithmetic check catch it.",
      "Only genuinely uncertain fields are flagged, because if everything is highlighted people stop looking. Nothing is ever approved automatically, and nothing the AI returns is saved until it has been checked.",
      "Deliberately not built: teams and roles, billing, accounting integrations, a mobile app. One idea done properly is worth more than five half-finished ones, and knowing where to stop is part of the job.",
    ],
    result: [
      "Tested against the real Claude API on four sample documents: 6–7 seconds and roughly two US cents per single-page document.",
      "The arithmetic check does its job on a document built to break it — the AI reported the printed subtotal of £1,420.00 while the line items came to £1,240.00, and the app flagged the £180.00 gap instead of silently choosing one. An unclear date (03/04/2026) is left blank and flagged rather than guessed.",
      "170 automated checks across four suites, all passing: the extraction pipeline, sign-in, every API route, and a full upload-to-export run.",
      "Honest limits: this is a demo built to show the approach. Four sample documents demonstrate the workflow rather than an accuracy benchmark, and the cost figure is measured on single-page files — a dense multi-page scan will cost more.",
    ],
    tech: {
      stack:
        "Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · PostgreSQL 16 with Drizzle · Zod · Claude API",
      architecture:
        "API routes handle upload, extraction and export. Files go to storage behind a swappable interface; the pipeline claims a document, calls Claude with a structured-output schema, parses and validates the reply, then writes the extraction and its flags in one transaction. Every successful extraction lands on \"needs review\" — only a person moves it to approved.",
      interestingBits: [
        "One Zod schema does four jobs: it defines the fields, generates the JSON Schema sent to the model, validates the reply at runtime, and gives the stored data its TypeScript type — so the field list cannot drift out of sync with itself.",
        "Failures are split into retryable and permanent. A malformed reply gets one repair attempt that names the offending fields; a bad API key gets none, because retrying a permanent failure just burns the budget.",
        "The database enforces its own invariants — generated columns and a partial unique index guarantee exactly one current extraction per document, rather than trusting the application to remember.",
      ],
    },
    screenshots: [
      {
        src: "/projects/trueline/documents.png",
        alt: "Document list showing five invoices with status labels and flag counts",
        caption:
          "Every document's status at a glance, with a count of the fields that want a human.",
        width: 1440,
        height: 560,
      },
      {
        src: "/projects/trueline/review.png",
        alt: "Extracted invoice amounts with the subtotal flagged, above a message reading: line items total 1,240.00 but subtotal reads 1,420.00 — 180.00 difference",
        caption:
          "The review step. The app spotted that the line items total £1,240.00 while the subtotal reads £1,420.00, and shows the £180.00 difference instead of quietly picking a side.",
        width: 808,
        height: 315,
      },
    ],
  },
  {
    slug: "bookboard",
    name: "BookBoard",
    outcome: "A live view of today's schedule, without hitting refresh",
    type: "Demo project — built to demonstrate my approach",
    role: "Design, development, deployment (solo)",
    timeline: "~2 weeks, part-time",
    status: "placeholder",
    teaser:
      "Clinics, salons and repair shops run on spreadsheets and can't see today at a glance. This shows the schedule live, updating the moment anything changes, with the numbers behind it.",
    tags: ["Next.js", "WebSocket", "PostgreSQL", "Charts"],
    problem: [
      "Service businesses manage bookings in spreadsheets or on paper. The owner cannot see today's schedule as it actually stands right now.",
      "And when someone asks how busy last month was, the honest answer is a guess.",
    ],
    approach: [
      "A today view that updates instantly across every device the moment a booking changes — open it on two screens and watch them stay in step.",
      "Bookings can be created, edited and cancelled, with the statuses that matter to a small business: booked, done, no-show.",
      "An analytics page answering the four questions owners actually ask: how many bookings per week, when are we busiest, roughly what did that earn, and how many people didn't turn up.",
      "The connection will drop — on a phone, in a back office, it always does. So the live view degrades to polling rather than silently showing stale data.",
      "Deliberately not built: a customer-facing booking page, payments, notifications, multi-location support.",
    ],
    result: [
      // TODO after building: sync latency between devices, number of bookings the
      // list stays smooth with, chart render time. Measured figures only.
    ],
    tech: {
      stack:
        "Next.js (App Router) · TypeScript · Tailwind · WebSocket · PostgreSQL (Neon) · Recharts · Vercel",
      architecture:
        "A small WebSocket service broadcasts booking changes to connected clients; the database stays the single source of truth. Clients reconcile on reconnect rather than trusting their local copy.",
      interestingBits: [
        "The same real-time patterns I've used for live sports scores and patient monitoring, applied to a business context.",
        "A \"simulate a busy day\" generator seeds realistic demo data, so the live demo has something to show.",
        "Reconnect logic reconciles against the server instead of replaying missed events — simpler, and correct under any drop.",
      ],
    },
    screenshots: [],
  },
  {
    slug: "fieldnote",
    name: "FieldNote",
    outcome: "Offline is a feature, not an error state",
    type: "Demo project — built to demonstrate my approach",
    role: "Design, development, deployment (solo)",
    timeline: "~2 weeks, part-time",
    status: "placeholder",
    teaser:
      "Field teams collect data where there's no signal, so web forms fail and paper gets lost. This keeps working with no connection at all, and syncs itself the moment one comes back.",
    tags: ["React Native", "SQLite", "Offline sync", "Express"],
    problem: [
      "Inspectors, surveyors and delivery teams collect information in places where the internet barely works.",
      "Web forms fail at exactly the wrong moment, and paper forms get lost, soaked, or typed up wrong a week later.",
    ],
    approach: [
      "A mobile app for structured data collection — text, numbers, choices, photos and location — that works fully offline, because on-device storage is the primary store rather than a cache.",
      "Records sync automatically when a connection returns, and every record shows its own sync state, so nobody has to wonder whether their morning's work made it.",
      "Conflicts resolve last-write-wins. That is a real limitation and the case study says so plainly rather than implying something cleverer.",
      "Deliberately not built: a form builder, teams, push notifications, App Store polish. A recorded walkthrough demonstrates it better than asking anyone to install an APK.",
    ],
    result: [
      // TODO after building: records held offline before sync, sync time on
      // reconnect, duration of the recorded demo. Measured figures only.
    ],
    tech: {
      stack:
        "React Native (Expo) · TypeScript · on-device SQLite · Node/Express sync API · PostgreSQL",
      architecture:
        "Local-first: writes land in SQLite immediately and enter a sync queue. A background worker drains the queue against an idempotent server API, with retry and backoff.",
      interestingBits: [
        "Server writes are idempotent, so a retried record can never be duplicated — the failure mode that makes naive sync engines lose trust.",
        "The sync state machine (draft → queued → synced → conflict) is surfaced directly in the UI rather than hidden.",
        "The same offline-first approach I've built for healthcare workers in low-connectivity environments.",
      ],
    },
    screenshots: [],
  },
];

export const publishedProjects = projects.filter(
  (project) => project.status === "published",
);

/** Returns a project only if it is publishable — placeholders resolve to undefined. */
export function getPublishedProject(slug: string): Project | undefined {
  return publishedProjects.find((project) => project.slug === slug);
}
