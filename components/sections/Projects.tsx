import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card, Pill } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

function ProjectCard({ project }: { project: Project }) {
  const isPublished = project.status === "published";

  return (
    /* Published cards are clickable across their whole surface. The anchor
       stays a single real link and stretches over the card with `after:inset-0`
       rather than wrapping everything — nesting the tags and heading inside an
       <a> would give screen readers one enormous link label. The ring lives on
       the card via focus-within so keyboard focus outlines the whole tile. */
    <Card
      className={cn(
        "flex h-full flex-col",
        isPublished &&
          "relative transition-colors hover:border-accent focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-4 focus-within:ring-offset-background",
      )}
    >
      {/* A caption rather than a pill: the label is a full sentence and wrapped
          to two lines inside a rounded-full pill, which read as broken. */}
      <p className="flex gap-2 text-xs leading-relaxed font-medium text-accent">
        <span aria-hidden="true">◆</span>
        {project.type}
      </p>

      <h3 className="mt-4 text-lg font-semibold tracking-tight">
        {project.name}
        <span className="block text-base font-normal text-muted-foreground">
          {project.outcome}
        </span>
      </h3>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
        {project.teaser}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Pill>{tag}</Pill>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-border pt-4">
        {isPublished ? (
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none after:absolute after:inset-0 after:rounded-xl"
          >
            Read the case study
            <span aria-hidden="true">→</span>
            <span className="sr-only">for {project.name}</span>
          </Link>
        ) : (
          // No link while there is nothing to link to.
          <p className="text-sm text-muted-foreground">
            In build — case study coming soon
          </p>
        )}
      </div>
    </Card>
  );
}

export function Projects() {
  return (
    <Section id="projects" className="border-t border-border">
      <SectionHeading
        id="projects"
        eyebrow="Projects"
        title="What I'm building to show the work"
        description="Each of these is a small, complete product rather than a code sample — a business problem, the decisions I made, and what came out of it."
      />

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
