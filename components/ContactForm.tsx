"use client";

import { useId, useState, type FormEvent } from "react";
import { buttonClasses } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

/** Formspree returns `{ errors: [{ field?, message, code }] }` on a 4xx. */
type FormspreeError = { field?: string; message: string; code?: string };

const fieldClasses =
  // `aria-invalid` is not one of Tailwind's built-in aria variants, hence the
  // arbitrary selector.
  "mt-2 block w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-red-600 dark:aria-[invalid=true]:border-red-400";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-red-700 dark:text-red-400">
      {message}
    </p>
  );
}

export function ContactForm({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const uid = useId();

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    message: `${uid}-message`,
    gotcha: `${uid}-gotcha`,
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setFieldErrors({});
    setFormError("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
        return;
      }

      // Surface Formspree's own validation messages against the right field,
      // rather than collapsing everything into one generic failure.
      const body: { errors?: FormspreeError[] } | null = await response
        .json()
        .catch(() => null);

      const nextFieldErrors: Record<string, string> = {};
      let nextFormError = "";

      for (const error of body?.errors ?? []) {
        if (error.field && error.field in ids) {
          nextFieldErrors[error.field] = error.message;
        } else {
          nextFormError = error.message;
        }
      }

      setFieldErrors(nextFieldErrors);
      setFormError(
        nextFormError ||
          (Object.keys(nextFieldErrors).length
            ? "Please check the highlighted fields."
            : "That didn't send. Please try again, or email me directly."),
      );
      setStatus("error");
    } catch {
      setFormError(
        "That didn't send — you may be offline. Please try again, or email me directly.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-border bg-surface-raised p-6"
      >
        <p className="text-base font-medium text-foreground">
          Thanks — your message is on its way.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          I read everything myself and normally reply within 12 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={buttonClasses({ variant: "secondary", className: "mt-5" })}
        >
          Send another message
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor={ids.name} className="text-sm font-medium text-foreground">
          Your name
        </label>
        <input
          id={ids.name}
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? `${ids.name}-error` : undefined}
          className={fieldClasses}
        />
        <FieldError id={`${ids.name}-error`} message={fieldErrors.name} />
      </div>

      <div>
        <label htmlFor={ids.email} className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id={ids.email}
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? `${ids.email}-error` : undefined}
          className={fieldClasses}
        />
        <FieldError id={`${ids.email}-error`} message={fieldErrors.email} />
      </div>

      <div>
        <label
          htmlFor={ids.message}
          className="text-sm font-medium text-foreground"
        >
          What are you building?
        </label>
        <textarea
          id={ids.message}
          name="message"
          required
          rows={5}
          placeholder="A sentence or two about the project, and roughly when you need it."
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={
            fieldErrors.message ? `${ids.message}-error` : undefined
          }
          className={`${fieldClasses} resize-y`}
        />
        <FieldError id={`${ids.message}-error`} message={fieldErrors.message} />
      </div>

      {/* Fixed subject line: gives the notification a stable, recognisable
          subject you can write a "never send to spam" mail filter against.
          Deliberately not interpolated from user input — a constant string has
          no injection surface and makes a better filter target. */}
      <input
        type="hidden"
        name="_subject"
        value="New enquiry from your portfolio site"
      />

      {/* Honeypot — Formspree silently discards submissions that fill _gotcha. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={ids.gotcha}>Leave this field empty</label>
        <input
          id={ids.gotcha}
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonClasses({ size: "lg", className: "sm:w-auto" })}
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>

        <p
          aria-live="polite"
          className="text-sm text-red-700 empty:hidden dark:text-red-400"
        >
          {status === "error" ? formError : ""}
        </p>
      </div>
    </form>
  );
}
