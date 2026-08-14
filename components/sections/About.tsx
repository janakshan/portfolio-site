import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { about } from "@/content/about";
import { site } from "@/content/site";

function Portrait() {
  if (site.photo) {
    return (
      <Image
        src={site.photo}
        alt={`${site.name}, ${site.role}`}
        width={800}
        height={800}
        sizes="(min-width: 1024px) 320px, 224px"
        priority={false}
        className="aspect-square w-full rounded-xl border border-border object-cover"
      />
    );
  }

  // No photo set yet — initials read as a choice, a broken image does not.
  const initials = site.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div
      aria-hidden="true"
      className="flex aspect-square w-full items-center justify-center rounded-xl border border-border bg-accent-soft text-5xl font-semibold tracking-tight text-accent-soft-foreground"
    >
      {initials}
    </div>
  );
}

export function About() {
  return (
    <Section id="about" className="border-t border-border">
      <SectionHeading
        id="about"
        eyebrow="About"
        title="Who you'd be working with"
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-10">
        <div>
          {/* Width constraint sits on the photo alone. Applied to the whole
              column it also squeezed the caption below to 224px, so its measure
              no longer matched the body text — which read as misalignment.
              Centred while stacked; left-aligned once it becomes a real column. */}
          <div className="mx-auto w-56 lg:mx-0 lg:w-full">
            <Portrait />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
            {site.ndaNote}
          </p>
        </div>

        <div className="lg:col-span-2">
          <p className="text-lg leading-relaxed font-medium text-foreground text-pretty">
            {about.lead}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            {about.background}
          </p>

          <blockquote className="mt-6 border-l-2 border-accent pl-5 text-base leading-relaxed text-foreground text-pretty">
            {about.usp}
          </blockquote>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Card>
          <h3 className="text-base font-semibold tracking-tight">
            What I can do for you
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {about.canDo.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-foreground">
                <CheckIcon />
                <span className="leading-relaxed text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="text-base font-semibold tracking-tight">How I work</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {about.howIWork.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-foreground">
                <CheckIcon />
                <span className="leading-relaxed text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}
