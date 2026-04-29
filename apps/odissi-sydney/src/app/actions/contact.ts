"use server";

import { render } from "@react-email/components";
import { resend } from "@/lib/email/client";
import { ContactEmail } from "@/lib/email/contact-email";
import { contactSchema } from "@/lib/validation/contact";

export type ContactState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
  formError?: string;
};

export async function contactAction(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Guard: configuration check before doing anything else.
  const destinationEmail = process.env.CONTACT_DESTINATION_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!resend || !destinationEmail) {
    return {
      ok: false,
      formError: "Email isn't configured yet — please email odissisydney directly.",
    };
  }

  // Parse and validate the form data.
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    kind: formData.get("kind"),
    message: formData.get("message"),
    botfield: formData.get("botfield"),
  };

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !(field in fieldErrors)) {
        fieldErrors[field] = issue.message;
      }
    }

    // Silently discard honeypot hits — return ok: false with no field errors
    // so bots don't learn what triggered the block.
    if ("botfield" in fieldErrors) {
      return { ok: false };
    }

    return { ok: false, fieldErrors };
  }

  const { name, email, phone, kind, message } = result.data;

  // Render the React Email template to HTML.
  const emailProps = phone ? { name, email, phone, kind, message } : { name, email, kind, message };
  const html = await render(ContactEmail(emailProps));

  const kindLabels: Record<string, string> = {
    general: "General enquiry",
    classes: "Classes",
    charity: "Charity / ALEG",
    press: "Press",
    donation: "Donation",
  };

  const subject = `Odissi Sydney — ${kindLabels[kind] ?? kind} from ${name}`;

  const { error } = await resend.emails.send({
    from: `Odissi Sydney Contact Form <${fromEmail}>`,
    to: destinationEmail,
    replyTo: email,
    subject,
    html,
  });

  if (error) {
    console.error("[contactAction] Resend error:", error);
    return {
      ok: false,
      formError: "Something went wrong sending the message. Please try again.",
    };
  }

  return {
    ok: true,
    message: "Got it — Nirmal and Chitrita will be in touch.",
  };
}
