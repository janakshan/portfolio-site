import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary:
    "border border-border bg-surface-raised text-foreground hover:border-accent hover:text-accent",
  ghost: "text-muted-foreground hover:bg-surface hover:text-foreground",
};

const sizes: Record<ButtonSize, string> = {
  // 44px on touch-sized screens, 40px once there's a pointer — h-10 was below
  // the 44px minimum comfortable tap target.
  md: "h-11 px-4 text-sm sm:h-10",
  lg: "h-12 px-6 text-base",
};

/** Shared styling, so a real <button> (e.g. the contact form) can match a link CTA. */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

/**
 * Anchor-styled CTA. Every link on this site is either a page anchor or an
 * external URL, so a plain <a> is correct — no client-side router needed.
 */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className={buttonClasses({ variant, size, className })}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
