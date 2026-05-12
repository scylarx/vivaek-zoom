"use server";

import { contactSchema } from "@/lib/validation/contact";

export type ContactState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
  formError?: string;
};

const kindLabels: Record<string, string> = {
  general: "General enquiry",
  classes: "Classes",
  charity: "Charity / ALEG",
  press: "Press",
  donation: "Donation",
};

export async function contactAction(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;

  if (!endpoint) {
    return {
      ok: false,
      formError: "Email isn't configured yet — please email odissisydney directly.",
    };
  }

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
  const subject = `Odissi Sydney — ${kindLabels[kind] ?? kind} from ${name}`;

  try {
    // Basin (usebasin.com) request shape: underscore-prefixed fields are special
    // (_subject, _replyto, _gotcha honeypot). Other fields render in the email body.
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _replyto: email,
        _gotcha: "",
        name,
        email,
        phone: phone ?? "",
        enquiry_type: kindLabels[kind] ?? kind,
        message,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("[contactAction] form endpoint error:", response.status, body);
      return {
        ok: false,
        formError: "Something went wrong sending the message. Please try again.",
      };
    }
  } catch (err) {
    console.error("[contactAction] form endpoint fetch failed:", err);
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
