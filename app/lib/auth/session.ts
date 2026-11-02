import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  signSession,
  verifySessionToken,
} from "./jwt";

export async function createSession() {
  const token = await signSession();
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export const isAdmin = cache(async (): Promise<boolean> => {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
});

/**
 * Call at the top of every admin page AND every admin Server Action.
 * proxy.ts only does a quick redirect; this is the real check, close to the data.
 */
export async function requireAdmin() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}
