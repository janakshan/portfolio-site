import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { ContactForm } from "@/components/ContactForm";
import { isPlaceholder, mailtoHref, site } from "@/content/site";

const helpful = [
  "What you're building, or what's broken",
  "Roughly when you need it",
  "A budget range, if you have one in mind",
];

/** Direct links, shown alongside the form and as the fallback when it isn't wired up. */
function DirectContact() {
  const links = [
    { label: "Email", display: site.email, href: mailtoHref, value: site.email },
    { label: "LinkedIn", display: "Message me on LinkedIn", href: site.linkedin, value: site.linkedin },
    { label: "GitHub", display: "See my code on GitHub", href: site.github, value: site.github },
  ];

  return (
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.label} className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {link.label}
          </span>
          {isPlaceholder(link.value) ? (
            <span className="text-sm text-muted-foreground italic">
              Coming soon
            </span>
          ) : (
            <a
              href={link.href}
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-block rounded py-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {link.display}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Contact() {
  // Env var wins, so a staging deploy can point at a different form.
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || site.formspreeId;

  return (
    <Section id="contact" className="border-t border-border">
      <SectionHeading
        id="contact"
        eyebrow="Contact"
        title="Tell me about your project"
        description="A short description is enough to start. If it isn't something I'm the right person for, I'll say so and point you somewhere better."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-3">
          {formspreeId ? (
            <ContactForm endpoint={`https://formspree.io/f/${formspreeId}`} />
          ) : (
            // Form isn't configured — send people to email rather than render
            // a form that would silently swallow their message.
            <div className="rounded-xl border border-border bg-surface-raised p-6">
              <p className="text-base font-medium text-foreground">
                The quickest way to reach me is email.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Tell me what you&rsquo;re building and roughly when you need it,
                and I&rsquo;ll come back to you with honest next steps.
              </p>
              {!isPlaceholder(site.email) ? (
                <ButtonLink href={mailtoHref} size="lg" className="mt-5">
                  Email me
                </ButtonLink>
              ) : null}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-surface p-6">
            <p className="text-sm font-semibold text-foreground">
              {site.replyTime}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {site.timezoneNote}
            </p>
          </div>

          <h3 className="mt-8 text-sm font-semibold text-foreground">
            Helpful to include
          </h3>
          <ul className="mt-3 flex flex-col gap-2.5">
            {helpful.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                <CheckIcon />
                <span className="leading-relaxed text-pretty">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-border pt-6">
            <DirectContact />
          </div>
        </div>
      </div>
    </Section>
  );
}
