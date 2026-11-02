import "server-only";
import { createHash, scryptSync, timingSafeEqual } from "node:crypto";

// Stored format: scrypt:<saltHex>:<hashHex> (see scripts/hash-password.mjs).

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

function verifyPassword(password: string, stored: string): boolean {
  const [scheme, saltHex, hashHex] = stored.split(":");
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false;

  const expected = Buffer.from(hashHex, "hex");
  const actual = scryptSync(password, Buffer.from(saltHex, "hex"), expected.length);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

/**
 * Checks the submitted credentials against ADMIN_EMAIL / ADMIN_PASSWORD_HASH.
 * The password hash is always computed, even for a wrong email, so response
 * time does not reveal which part was wrong.
 */
export function verifyAdminCredentials(
  email: string,
  password: string,
): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminHash) {
    console.error("ADMIN_EMAIL or ADMIN_PASSWORD_HASH is not configured");
    return false;
  }

  const emailOk = timingSafeEqual(
    digest(email.trim().toLowerCase()),
    digest(adminEmail.trim().toLowerCase()),
  );
  const passwordOk = verifyPassword(password, adminHash);

  return emailOk && passwordOk;
}
