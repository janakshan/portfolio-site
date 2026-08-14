import { Section, SectionHeading } from "@/components/ui/Section";
import { Pill } from "@/components/ui/Card";
import { techByCategory } from "@/content/tech";

export function TechStack() {
  return (
    <Section id="tech" className="border-t border-border">
      <SectionHeading
        id="tech"
        eyebrow="Tech stack"
        title="One stack, used properly"
        description="Not a list of everything I've touched once — this is what I build with day to day, and what I'll still be able to explain to you in six months."
      />

      <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {techByCategory.map((group) => (
          <div key={group.category}>
            <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {group.category}
            </dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Pill tone="solid">{item.name}</Pill>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
