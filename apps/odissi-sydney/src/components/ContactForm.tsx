"use client";

import { useActionState } from "react";
import { contactAction } from "@/app/actions/contact";
import { SubmitButton } from "./SubmitButton";

const kindOptions = [
  { value: "general", label: "General enquiry" },
  { value: "classes", label: "Classes" },
  { value: "charity", label: "Charity / ALEG" },
  { value: "press", label: "Press" },
  { value: "donation", label: "Donation" },
] as const;

const inputClass =
  "w-full border border-[--color-rule] bg-[--color-bg] px-4 py-3 font-(family-name:--font-body) text-base text-[--color-ink] placeholder:text-[--color-ink-muted] focus:border-[--color-jewel-teal] focus:outline-none aria-invalid:border-[--color-alta]";

const labelClass =
  "block font-(family-name:--font-body) text-sm uppercase tracking-[0.12em] text-[--color-ink-muted]";

const errorClass = "mt-1 font-(family-name:--font-body) text-sm text-[--color-alta]";

export function ContactForm() {
  const [state, action] = useActionState(contactAction, { ok: false });

  if (state.ok) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-[--color-jewel-teal] bg-[--color-bg-elevated] p-8"
      >
        <p className="font-(family-name:--font-display) text-2xl font-medium text-[--color-ink]">
          {state.message ?? "Message sent."}
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-6">
      {/* Honeypot — hidden from real users, filled by bots */}
      <input
        type="text"
        name="botfield"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
      />

      {state.formError ? (
        <div
          role="alert"
          aria-live="assertive"
          className="border border-[--color-alta] bg-[color-mix(in_oklch,var(--color-alta)_8%,var(--color-bg))] p-4 font-(family-name:--font-body) text-base text-[--color-alta]"
        >
          {state.formError}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-describedby={state.fieldErrors?.name ? "contact-name-error" : undefined}
            aria-invalid={state.fieldErrors?.name ? true : undefined}
            className={`${inputClass} mt-2`}
          />
          {state.fieldErrors?.name ? (
            <p id="contact-name-error" role="alert" className={errorClass}>
              {state.fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-describedby={state.fieldErrors?.email ? "contact-email-error" : undefined}
            aria-invalid={state.fieldErrors?.email ? true : undefined}
            className={`${inputClass} mt-2`}
          />
          {state.fieldErrors?.email ? (
            <p id="contact-email-error" role="alert" className={errorClass}>
              {state.fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone{" "}
            <span className="normal-case tracking-normal text-[--color-ink-muted]">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-describedby={state.fieldErrors?.phone ? "contact-phone-error" : undefined}
            aria-invalid={state.fieldErrors?.phone ? true : undefined}
            className={`${inputClass} mt-2`}
          />
          {state.fieldErrors?.phone ? (
            <p id="contact-phone-error" role="alert" className={errorClass}>
              {state.fieldErrors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-kind" className={labelClass}>
            What&apos;s this about?
          </label>
          <select
            id="contact-kind"
            name="kind"
            required
            aria-required="true"
            aria-describedby={state.fieldErrors?.kind ? "contact-kind-error" : undefined}
            aria-invalid={state.fieldErrors?.kind ? true : undefined}
            className={`${inputClass} mt-2 cursor-pointer appearance-none`}
          >
            <option value="">Choose one</option>
            {kindOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {state.fieldErrors?.kind ? (
            <p id="contact-kind-error" role="alert" className={errorClass}>
              {state.fieldErrors.kind}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Tell us more
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          aria-required="true"
          aria-describedby={state.fieldErrors?.message ? "contact-message-error" : undefined}
          aria-invalid={state.fieldErrors?.message ? true : undefined}
          className={`${inputClass} mt-2 resize-y`}
        />
        {state.fieldErrors?.message ? (
          <p id="contact-message-error" role="alert" className={errorClass}>
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      <SubmitButton />
    </form>
  );
}
