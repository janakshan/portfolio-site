import { Section, SectionHeading } from "@/components/ui/Section";
import { Card, Pill } from "@/components/ui/Card";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { services } from "@/content/services";

export function Services() {
  return (
    <Section id="services" className="border-t border-border">
      <SectionHeading
        id="services"
        eyebrow="Services"
        title="Four ways to work with me"
        description="Each one is scoped and priced before any work begins, so you know what you're committing to."
      />

      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {services.map((service) => (
          <li key={service.id}>
            <Card className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  {service.name}
                </h3>
                <p className="shrink-0 text-sm font-semibold text-accent">
                  {service.startingPrice}
                </p>
              </div>

              <Pill className="mt-3 self-start">{service.turnaround}</Pill>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
                {service.summary}
              </p>

              <ul className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-foreground">
                    <CheckIcon />
                    <span className="leading-relaxed text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-muted-foreground">
        These are starting points, not a menu — I quote each project once I
        understand the scope.
      </p>
    </Section>
  );
}
