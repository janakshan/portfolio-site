import { Container } from "@/components/ui/Container";
import { isPlaceholder, mailtoHref, navItems, site } from "@/content/site";

type FooterLink = { label: string; href: string; value: string };

export function Footer() {
  const year = new Date().getFullYear();

  const links: FooterLink[] = [
    { label: "Email", href: mailtoHref, value: site.email },
    { label: "LinkedIn", href: site.linkedin, value: site.linkedin },
    { label: "GitHub", href: site.github, value: site.github },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container>
        <div className="flex flex-col gap-8 py-10 sm:py-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-sm font-semibold text-foreground">{site.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {site.shortHeadline}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{site.replyTime}</p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <h2 className="text-xs font-semibold tracking-wide text-foreground uppercase">
                Site
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-block rounded py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-xs font-semibold tracking-wide text-foreground uppercase">
                Elsewhere
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {isPlaceholder(link.value) ? (
                      // Not filled in yet — render plain text rather than a dead
                      // link. Full-strength muted: at /60 it fell to 2.9:1.
                      <span className="text-sm text-muted-foreground italic">
                        {link.label}
                      </span>
                    ) : (
                      <a
                        href={link.href}
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-block rounded py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border py-6">
          <p className="text-xs text-muted-foreground">
            © {year} {site.name}. Based in {site.location} ({site.timezone}).
          </p>
        </div>
      </Container>
    </footer>
  );
}
