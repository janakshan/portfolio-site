import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { contactHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container>
      <div className="max-w-xl py-24 sm:py-32">
        <p className="text-sm font-semibold tracking-wide text-accent uppercase">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          That page doesn&rsquo;t exist
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
          The link may be out of date, or the case study may not be published
          yet. Everything live is on the home page.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href={contactHref} size="lg" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
