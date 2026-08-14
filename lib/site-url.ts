import { site } from "@/content/site";

/**
 * The canonical origin, resolved at build/request time on the server.
 *
 * Order matters: an explicit NEXT_PUBLIC_SITE_URL always wins, then Vercel's own
 * production domain (so previews and the free *.vercel.app deploy get correct
 * absolute URLs before you own a domain), then the value in content/site.ts.
 *
 * Server-only — do not import this from a client component.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : site.url)
).replace(/\/$/, "");
