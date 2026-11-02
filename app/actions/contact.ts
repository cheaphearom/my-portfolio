"use server";

import * as z from "zod";
import { getDb, hasDatabase, schema } from "../lib/db";
import {
  clientIp,
  isRateLimited,
  recordRateEvent,
} from "../lib/rate-limit";

export type ContactState =
  | { ok?: boolean; error?: string; fieldErrors?: Record<string, string> }
  | undefined;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.email("Please enter a valid email").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message is too long"),
});

const MAX_PER_HOUR = 5;

export async function sendMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("website")) {
    return { ok: true };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      fieldErrors[field] ??= issue.message;
    }
    return { fieldErrors };
  }

  if (!hasDatabase()) {
    return { error: "Messages are not available right now. Please use another contact method." };
  }

  const key = `contact:${await clientIp()}`;
  if (await isRateLimited(key, MAX_PER_HOUR, 60)) {
    return { error: "Too many messages. Please try again later." };
  }

  try {
    await getDb().insert(schema.messages).values({
      name: parsed.data.name,
      email: parsed.data.email,
      body: parsed.data.message,
    });
    await recordRateEvent(key);
  } catch (error) {
    console.error("Could not save message", error);
    return { error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
