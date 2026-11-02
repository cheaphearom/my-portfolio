import "server-only";
import { and, count, eq, gt, lt } from "drizzle-orm";
import { headers } from "next/headers";
import { getDb, hasDatabase, schema } from "./db";

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "unknown";
}

/** True when `key` already has `limit` or more events inside the window. */
export async function isRateLimited(
  key: string,
  limit: number,
  windowMinutes: number,
): Promise<boolean> {
  if (!hasDatabase()) return false;

  const since = new Date(Date.now() - windowMinutes * 60_000);
  const [row] = await getDb()
    .select({ total: count() })
    .from(schema.rateEvents)
    .where(
      and(
        eq(schema.rateEvents.key, key),
        gt(schema.rateEvents.createdAt, since),
      ),
    );

  return (row?.total ?? 0) >= limit;
}

/** Records one event for `key` and drops events older than a day. */
export async function recordRateEvent(key: string): Promise<void> {
  if (!hasDatabase()) return;

  const db = getDb();
  await db.insert(schema.rateEvents).values({ key });
  await db
    .delete(schema.rateEvents)
    .where(lt(schema.rateEvents.createdAt, new Date(Date.now() - 86_400_000)));
}
