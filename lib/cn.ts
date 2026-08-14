type ClassValue = string | false | null | undefined;

/** Joins class names, dropping falsy values. Deliberately dependency-free. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
