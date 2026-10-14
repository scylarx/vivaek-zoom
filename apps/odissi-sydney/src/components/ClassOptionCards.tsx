"use client";

import { classOptions, SELECT_CLASS_EVENT } from "@/lib/class-options";

export function ClassOptionCards() {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {classOptions.map((tier) => (
        <button
          key={tier.value}
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent(SELECT_CLASS_EVENT, { detail: tier.value }));
            document.getElementById("enquire")?.scrollIntoView();
          }}
          className="group flex cursor-pointer flex-col text-left border border-rule bg-bg p-5 transition-colors hover:border-jewel-maroon focus-visible:border-jewel-maroon focus-visible:outline-none"
        >
          <p className="font-(family-name:--font-body) text-xs uppercase tracking-[0.18em] text-jewel-maroon">
            {tier.title}
          </p>
          <p className="mt-3 font-(family-name:--font-display) text-4xl font-medium leading-none text-ink">
            {tier.price}
          </p>
          <p className="mt-1 text-xs text-ink-muted">{tier.cadence}</p>
          <p className="mt-3 text-sm leading-[1.55] text-ink-muted">{tier.text}</p>
          <span className="mt-auto pt-4 font-(family-name:--font-body) text-sm text-jewel-maroon">
            Enquire{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
