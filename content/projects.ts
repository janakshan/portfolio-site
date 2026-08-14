import type { Project } from "./types";

/**
 * The three demo projects from freelance-business/04-portfolio/.
 *
 * All three are `status: "placeholder"` until they actually exist. A placeholder
 * renders as a card with no outbound link and is excluded from the case-study
 * routes, so nothing on the site ever points at something that isn't there.
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
    slug: "docudata",
    name: "DocuData",
    outcome: "Turning document piles into clean data with AI",
    type: "Demo project — built to demonstrate my approach",
    role: "Design, development, deployment (solo)",
    timeline: "~1 week, part-time",
    status: "placeholder",
    teaser:
      "Businesses retype invoices and receipts into spreadsheets by hand. This reads them instead — a person confirms the result in seconds, then exports it clean.",
    tags: ["Next.js", "Claude API", "PostgreSQL", "AI extraction"],
    problem: [
      "Small businesses receive invoices, receipts and forms as PDFs and photos. Someone has to retype every one of them into a spreadsheet.",
      "It is slow, nobody enjoys it, and the mistakes only surface later — in the accounts.",
    ],
    approach: [
      "Upload a document, and it comes back as structured data: vendor, date, line items, totals, currency.",
      "AI extraction is never 100% right, so I designed a human review step — the extracted fields sit beside the original document, editable, with the uncertain ones flagged. The AI does the boring work; a person confirms it in seconds.",
      "Bad AI output can never reach the database. Malformed responses get one retry, then the document is marked \"needs manual review\" rather than saved as junk.",
      "Deliberately not built: teams and roles, billing, third-party integrations, a mobile app. It is a demo of one idea, and scope discipline is the point.",
    ],
    result: [
      // TODO after building: processing time per document, accuracy on your own
      // test set, number of sample documents tested. Measured figures only.
    ],
    tech: {
      stack:
        "Next.js (App Router) · TypeScript · Tailwind · PostgreSQL (Neon) · Claude API · Vercel",
      architecture:
        "Next.js API routes handle upload, extraction and export. Documents go to object storage; extractions are stored as validated JSON against a fixed schema, keyed to the document record.",
      interestingBits: [
        "The extraction prompt lives in its own file so it can be tuned without touching application code.",
        "Per-field confidence is stored where the model expresses uncertainty, which is what drives the review screen's flagging.",
        "Extracted text is untrusted input and is escaped on render — AI output is a real XSS vector that is easy to forget.",
      ],
    },
    screenshots: [],
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
