import { Resend } from "resend";

// Resend client. Returns null when RESEND_API_KEY is unset so callers
// can handle the missing-config case gracefully instead of crashing.
const apiKey = process.env.RESEND_API_KEY;

export const resend: Resend | null = apiKey ? new Resend(apiKey) : null;
