import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { contactHref, site } from "@/content/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-emerald-500 dark:bg-emerald-400"
            />
            {site.availability}
          </p>

          <h1 id="hero-heading" className="mt-6">
            <span className="block text-sm font-semibold tracking-wide text-accent uppercase">
              {site.name}
            </span>
            {/* Each word is its own nowrap unit, so narrow screens break at
                spaces only — otherwise "Full-Stack" splits at its hyphen and
                the headline reads "Senior Full-" / "Stack Engineer". */}
            <span className="mt-3 flex flex-wrap gap-x-[0.28em] text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {site.role.split(" ").map((word) => (
                <span key={word} className="whitespace-nowrap">
                  {word}
                </span>
              ))}
            </span>
            {/* Each item carries its own leading separator, so a wrap breaks
                before "· TypeScript" rather than stranding a "·" at a line end. */}
            <span className="mt-3 flex flex-wrap items-baseline text-lg leading-snug font-medium text-muted-foreground sm:text-xl lg:text-2xl">
              {site.stack.map((item, index) => (
                <span key={item} className="whitespace-nowrap">
                  {index > 0 ? (
                    <span aria-hidden="true" className="mx-2 text-accent">
                      ·
                    </span>
                  ) : null}
                  {item}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-6 text-lg font-medium text-foreground text-pretty sm:text-xl">
            {site.valueProp}
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
            {site.valuePropDetail}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={contactHref} size="lg">
              {site.ctaLabel}
            </ButtonLink>
            <ButtonLink href="/#projects" size="lg" variant="secondary">
              See projects
            </ButtonLink>
          </div>

          <p className="mt-10 max-w-xl border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground">
            {site.timezoneNote}
          </p>
        </div>
      </Container>
    </section>
  );
}
