"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="inline-flex w-fit items-center border border-[--color-jewel-maroon] bg-[--color-jewel-maroon] px-6 py-3 font-(family-name:--font-body) text-base text-[--color-stone-cream] transition-colors hover:bg-transparent hover:text-[--color-jewel-maroon] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send"}
    </button>
  );
}
