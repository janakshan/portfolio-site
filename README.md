# Portfolio site

Freelance portfolio for Janakshan Krishnamoorthy — a single scrolling homepage
plus one case-study page per project.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and TypeScript.
**Zero runtime dependencies beyond Next, React and `@vercel/analytics`** — no
icon library, no theme library, no animation library. Everything renders as
static HTML.

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
npx tsc --noEmit # typecheck
```

---

## Before this goes live

Four things, in order.

### 1. Fill in your details

Everything personal lives in **`content/site.ts`**. Search for `TODO_` — there
are four:

| Field      | What to put                                    |
| ---------- | ---------------------------------------------- |
| `email`    | the address you want enquiries to reach        |
| `linkedin` | full profile URL                               |
| `github`   | full profile URL                               |
| `url`      | your domain, e.g. `https://janakshan.dev`      |

Until a value is filled, the site renders it as plain text instead of a dead
link — `isPlaceholder()` guards every one. Nothing breaks if you launch with
some still empty, it just shows less.

### 2. Contact form — already wired

The form posts to Formspree form `meajgpjw`, set as `formspreeId` in
`content/site.ts`. Nothing to configure; it works on first deploy.

The ID is committed deliberately — it ships in the client bundle either way, so
there is no secret to protect. To point one environment at a different form
(say a throwaway for staging), set `NEXT_PUBLIC_FORMSPREE_ID`; it takes
precedence. Set it to nothing anywhere and the Contact section falls back to an
"Email me" panel rather than rendering a form that would swallow enquiries.

No `@formspree/react`: `components/ContactForm.tsx` does the same AJAX POST
`useForm` wraps, and parses Formspree's `{ errors: [{ field, message }] }`
response to mark the offending input `aria-invalid` and print the message
beneath it — the `<ValidationError>` behaviour, without the dependency.

### 3. Deploy

The repo has no git remote yet.

```bash
git remote add origin git@github.com:<you>/portfolio-site.git
git push -u origin main
```

Then import the repo at [vercel.com/new](https://vercel.com/new). Defaults are
correct — no build configuration and no environment variables needed.

Absolute URLs (sitemap, OG tags, structured data) resolve in this order:
`NEXT_PUBLIC_SITE_URL` → Vercel's own production domain → `site.url`. So the
free `*.vercel.app` deploy produces correct links before you own a domain.

### 4. Add your first case study

See below.

---

## Where the content lives

All copy is in `content/`. You should never need to edit a component to change
words.

| File           | Holds                                                     |
| -------------- | --------------------------------------------------------- |
| `site.ts`      | name, headline, contact details, availability, the one CTA |
| `about.ts`     | the About section — verbatim from `positioning.md`         |
| `services.ts`  | the four packages and their starting prices                |
| `projects.ts`  | the three projects and their full case studies             |
| `tech.ts`      | the stack list, grouped                                    |
| `types.ts`     | the shapes the above must satisfy                          |

The source of truth for the wording is
`../freelance-business/01-strategy/positioning.md`. The rule there is **same
story everywhere** — if you change the About text here, change it on Upwork and
LinkedIn too.

### Adding or publishing a project

Each entry in `content/projects.ts` has a `status`. All three ship as
`"placeholder"`: the card renders with an "In build — case study coming soon"
note, no link, and `/projects/<slug>` returns 404 so a half-written case study
can't be reached by guessing the URL.

To publish one:

1. Fill `result` with numbers you actually measured. The case-study template
   allows measured figures only — each `result: []` has a comment naming which
   ones to capture.
2. Add `liveUrl` and `codeUrl`.
3. Put screenshots in `public/projects/<slug>/` and list them in `screenshots`
   with their real pixel dimensions (needed to reserve layout space).
4. Change `status` to `"published"`.

The card gains a "Read the case study" link, the page starts building, and it
enters the sitemap. Nothing else to touch.

### Swapping the photo

Drop a square image in `public/` and point `site.photo` at it. Resize to about
800×800 first — `next/image` serves smaller variants from it and anything
larger is dead weight in the repo. Set it to `""` to fall back to initials.

---

## How it's put together

```
app/
  layout.tsx              shell, metadata, no-flash theme script, JSON-LD
  page.tsx                homepage — composes the sections in order
  projects/[slug]/        case-study template
  opengraph-image.tsx     generated 1200×630 link preview
  sitemap.ts robots.ts    generated, published projects only
components/
  ui/                     Container, Section, Button, Card, Pill, CheckIcon
  layout/                 Header, Footer, ThemeToggle, MobileNav, SkipLink
  sections/               one file per homepage section
  ContactForm.tsx         the only interactive form
content/                  all copy and data
lib/                      cn(), siteUrl
```

**Theming.** Colours are CSS custom properties in `app/globals.css`, defined
twice — once on `:root`, once on `.dark`. Utilities like `bg-surface` and
`text-muted-foreground` read them, so changing the palette is one file. The
theme class is set before first paint by an inline script that reads
`localStorage`, falling back to the OS preference.

**Client components.** Only three: `ThemeToggle`, `MobileNav`, `ContactForm`.
Everything else is a server component and ships no JavaScript.

**One gotcha.** There is no `tailwind-merge` in this project, so passing a
utility via `className` that competes with one already in a component's base
classes resolves by stylesheet order, not by argument order. Put layout and
visibility utilities on a wrapper element instead — see the header CTA in
`components/layout/Header.tsx` — or add a variant prop, as `Pill` does with
`tone`.

---

## Maintenance

Per `../freelance-business/04-portfolio/portfolio-plan.md`:

- After every real project: ~30 minutes to add or refresh a case study.
- Monthly: 15 minutes — check links work and the availability line is current.
- No redesigns. Content updates only.
