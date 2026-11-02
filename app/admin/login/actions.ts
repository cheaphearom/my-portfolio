"use server";

import { redirect } from "next/navigation";
import * as z from "zod";
import { verifyAdminCredentials } from "../../lib/auth/password";
import { createSession } from "../../lib/auth/session";
import {
  clientIp,
  isRateLimited,
  recordRateEvent,
} from "../../lib/rate-limit";

export type LoginState = { error?: string } | undefined;

const credentials = z.object({
  email: z.string().trim().min(1).max(200),
  password: z.string().min(1).max(200),
});

const MAX_FAILURES = 5;
const WINDOW_MINUTES = 15;

export async function login(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const ip = await clientIp();
  const key = `login:${ip}`;

  if (await isRateLimited(key, MAX_FAILURES, WINDOW_MINUTES)) {
    return { error: "Too many failed attempts. Try again in 15 minutes." };
  }

  const parsed = credentials.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success || !verifyAdminCredentials(parsed.data.email, parsed.data.password)) {
    await recordRateEvent(key);
    return { error: "Invalid email or password." };
  }

  try {
    await createSession();
  } catch (error) {
    console.error("Could not create session", error);
    return { error: "Server is missing SESSION_SECRET (32+ characters)." };
  }

  redirect("/admin");
}
