import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name.").max(200),
  email: z.string().trim().email("That email doesn't look right.").max(320),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+\d\s\-()]*$/, "Numbers, spaces, +, -, () only.")
    .optional()
    .or(z.literal("")),
  kind: z.enum(["general", "classes", "charity", "press", "donation"]),
  message: z.string().trim().min(10, "A few sentences, please.").max(5000),
  // Honeypot — must be empty or absent
  botfield: z.string().max(0, "Bot detected.").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
