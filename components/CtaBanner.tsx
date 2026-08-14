import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { contactHref, site } from "@/content/site";

/**
 * The single CTA, repeated after each section — "nothing clever, just present
 * everywhere" (04-portfolio/portfolio-plan.md).
 */
export function CtaBanner() {
  return (
    // Bottom padding matches a Section's, so the banner sits centred in the gap
    // between sections. Without it the card butts straight up against the next
    // section's top border — the space above comes from the previous section's
    // bottom padding, and nothing was supplying the space below.
    <Container className="pb-16 sm:pb-20 lg:pb-24">
      <div className="flex flex-col items-start gap-4 rounded-xl border border-border bg-surface px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base font-medium text-foreground">{site.ctaPrompt}</p>
        <ButtonLink href={contactHref}>{site.ctaLabel}</ButtonLink>
      </div>
    </Container>
  );
}
