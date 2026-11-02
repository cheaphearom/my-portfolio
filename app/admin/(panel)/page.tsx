import Link from "next/link";
import { count, eq } from "drizzle-orm";
import { requireAdmin } from "../../lib/auth/session";
import { getDb, hasDatabase, schema } from "../../lib/db";
import { NoDatabase, PageTitle } from "../_components/ui";

export default async function DashboardPage() {
  await requireAdmin();
  if (!hasDatabase()) return <NoDatabase />;

  const db = getDb();

  const [projects] = await db.select({ n: count() }).from(schema.projects);
  const [experience] = await db.select({ n: count() }).from(schema.experience);
  const [education] = await db.select({ n: count() }).from(schema.education);
  const [skills] = await db.select({ n: count() }).from(schema.skills);
  const [unread] = await db
    .select({ n: count() })
    .from(schema.messages)
    .where(eq(schema.messages.read, false));

  const cards = [
    { href: "/admin/projects", label: "Projects", value: projects?.n ?? 0 },
    { href: "/admin/experience", label: "Experience entries", value: experience?.n ?? 0 },
    { href: "/admin/education", label: "Education entries", value: education?.n ?? 0 },
    { href: "/admin/skills", label: "Skill groups", value: skills?.n ?? 0 },
    { href: "/admin/messages", label: "Unread messages", value: unread?.n ?? 0 },
  ];

  return (
    <>
      <PageTitle
        title="Dashboard"
        description="Edit what visitors see on the portfolio. Changes appear on the public site within a few seconds."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="block rounded-md border border-ink/20 bg-white p-5 hover:border-ink"
            >
              <p className="text-4xl font-bold tracking-tight">{card.value}</p>
              <p className="mt-1 text-slate">{card.label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
