import { cn } from "@/lib/cn";

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("mt-0.5 size-4 shrink-0 text-accent", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
