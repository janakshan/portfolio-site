import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { isPlaceholder, site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${site.name} — Senior Full-Stack Engineer`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.intro,
  keywords: [
    "freelance full-stack developer",
    "React developer",
    "Node.js developer",
    "TypeScript",
    "Next.js",
    "AI integration",
    "LLM API integration",
    "React Native",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: site.name,
    title,
    description: site.valueProp,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.valueProp,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Runs before first paint: applies the saved theme, or the OS preference when
 * nothing is saved. Without this the page would flash the wrong theme.
 */
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var d=s==="dark"||(!s&&window.matchMedia("(prefers-color-scheme: dark)").matches);var c=document.documentElement.classList;c.toggle("dark",d);c.toggle("light",!d);}catch(e){}})();`;

/**
 * Structured data, so search engines and AI assistants can read who this is
 * rather than infer it. Placeholder profile links are omitted rather than
 * published as broken URLs.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.intro,
    url: siteUrl,
    image: site.photo ? `${siteUrl}${site.photo}` : undefined,
    email: isPlaceholder(site.email) ? undefined : `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
    },
    knowsAbout: site.stack,
    sameAs: [site.linkedin, site.github].filter(
      (link) => !isPlaceholder(link),
    ),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SkipLink />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
