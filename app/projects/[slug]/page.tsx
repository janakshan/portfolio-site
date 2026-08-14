import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { AccentPill, Pill } from "@/components/ui/Card";
import { CtaBanner } from "@/components/CtaBanner";
import { getPublishedProject, publishedProjects } from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublishedProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.name} — ${project.outcome}`,
    description: project.teaser,
    openGraph: {
      title: `${project.name} — ${project.outcome}`,
      description: project.teaser,
      type: "article",
    },
  };
}

function Heading({ children }: { children: string }) {
  return (
    <h2 className="mt-12 text-xl font-semibold tracking-tight sm:text-2xl">
      {children}
    </h2>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getPublishedProject(slug);

  // Placeholder projects resolve to undefined too, so a half-finished entry can
  // never be reached by guessing the URL.
  if (!project) notFound();

  return (
    <article className="py-12 sm:py-16">
      <Container>
        <div className="max-w-2xl">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span aria-hidden="true">←</span> All projects
          </Link>

          <div className="mt-6">
            <AccentPill>{project.type}</AccentPill>
          </div>

          <h1 className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            {project.name}
            <span className="mt-2 block text-xl font-normal text-muted-foreground sm:text-2xl">
              {project.outcome}
            </span>
          </h1>

          <dl className="mt-8 flex flex-col gap-3 border-y border-border py-5 text-sm sm:flex-row sm:gap-10">
            <div>
              <dt className="font-medium text-muted-foreground">Role</dt>
              <dd className="mt-1 text-foreground">{project.role}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Timeline</dt>
              <dd className="mt-1 text-foreground">{project.timeline}</dd>
            </div>
          </dl>

          {project.liveUrl || project.codeUrl ? (
            <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  View live demo ↗
                </a>
              ) : null}
              {project.codeUrl ? (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  View code ↗
                </a>
              ) : null}
            </div>
          ) : null}

          <Heading>The problem</Heading>
          {project.problem.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty"
            >
              {paragraph}
            </p>
          ))}

          <Heading>The approach</Heading>
          <ul className="mt-4 flex flex-col gap-3">
            {project.approach.map((item) => (
              <li
                key={item}
                className="border-l-2 border-border pl-4 text-base leading-relaxed text-muted-foreground text-pretty"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {project.screenshots.length > 0 ? (
          <ul className="mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {project.screenshots.map((shot) => (
              <li key={shot.src}>
                <figure>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    className="h-auto w-full rounded-lg border border-border"
                  />
                  {shot.caption ? (
                    <figcaption className="mt-2 text-sm text-muted-foreground">
                      {shot.caption}
                    </figcaption>
                  ) : null}
                </figure>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="max-w-2xl">
          {project.result.length > 0 ? (
            <>
              <Heading>The result</Heading>
              <ul className="mt-4 flex flex-col gap-3">
                {project.result.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-base leading-relaxed text-muted-foreground text-pretty"
                  >
                    <span aria-hidden="true" className="text-accent">
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {/* Small print, for the technical evaluator rather than the founder. */}
          <details className="mt-12 rounded-xl border border-border bg-surface p-5">
            <summary className="cursor-pointer text-sm font-semibold text-foreground marker:text-accent">
              Tech details
            </summary>
            <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Stack: </span>
                {project.tech.stack}
              </p>
              <p>
                <span className="font-medium text-foreground">Architecture: </span>
                {project.tech.architecture}
              </p>
              <ul className="flex flex-col gap-2">
                {project.tech.interestingBits.map((bit) => (
                  <li key={bit} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-accent">
                      •
                    </span>
                    {bit}
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-2 pt-1">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Pill>{tag}</Pill>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </Container>

      <div className="mt-12">
        <CtaBanner />
      </div>
    </article>
  );
}
