import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type Db = ReturnType<typeof createDb>;

function createDb(url: string) {
  return drizzle(neon(url), { schema });
}

let cached: Db | null = null;

/** True when a Neon connection string is configured. */
export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Lazily creates the Drizzle client so importing this module never fails
 * (builds and local dev work without a database; callers fall back to defaults).
 */
export function getDb(): Db {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!cached) {
    cached = createDb(url);
  }
  return cached;
}

export { schema };
