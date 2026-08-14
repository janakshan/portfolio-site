import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface-raised p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

const pillTones = {
  muted: "bg-surface text-muted-foreground",
  solid: "bg-surface-raised text-foreground",
} as const;

/**
 * `tone` rather than a colour class in `className` — there is no tailwind-merge
 * here, so two competing `bg-*` utilities would resolve by stylesheet order.
 */
export function Pill({
  tone = "muted",
  className,
  children,
}: {
  tone?: keyof typeof pillTones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium",
        pillTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Accent-tinted variant, for the honesty label on demo projects. */
export function AccentPill({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-soft-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
