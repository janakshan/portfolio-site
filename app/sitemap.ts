import type { MetadataRoute } from "next";
import { publishedProjects } from "@/content/projects";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Placeholders are excluded — they 404, and a sitemap entry that 404s is a
    // negative signal rather than a neutral one.
    ...publishedProjects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
