import { desc } from "drizzle-orm";
import { requireAdmin } from "../../../lib/auth/session";
import { getDb, hasDatabase, schema } from "../../../lib/db";
import {
  Banner,
  NoDatabase,
  PageTitle,
  SubmitButton,
} from "../../_components/ui";
import { deleteMessage, toggleMessageRead } from "../../actions";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  if (!hasDatabase()) return <NoDatabase />;

  const { saved, error } = await searchParams;

  const rows = await getDb()
    .select()
    .from(schema.messages)
    .orderBy(desc(schema.messages.createdAt))
    .limit(200);

  return (
    <>
      <PageTitle
        title="Messages"
        description="Messages sent through the contact form, newest first."
      />
      <Banner saved={saved} error={error} />

      <ul className="space-y-4">
        {rows.map((message) => (
          <li
            key={message.id}
            className={`rounded-md border bg-white p-5 ${
              message.read ? "border-ink/15" : "border-ink"
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold">
                {message.name}{" "}
                <a
                  href={`mailto:${message.email}`}
                  className="font-normal text-slate underline underline-offset-4"
                >
                  {message.email}
                </a>
              </p>
              <time
                dateTime={message.createdAt.toISOString()}
                className="font-mono text-sm text-slate"
              >
                {message.createdAt.toISOString().slice(0, 16).replace("T", " ")} UTC
              </time>
            </div>

            {/* React escapes the text; whitespace-pre-wrap keeps line breaks. */}
            <p className="mt-3 whitespace-pre-wrap break-words">{message.body}</p>

            <div className="mt-4 flex gap-3">
              <form action={toggleMessageRead}>
                <input type="hidden" name="id" value={message.id} />
                <input type="hidden" name="read" value={String(!message.read)} />
                <SubmitButton tone="quiet">
                  {message.read ? "Mark unread" : "Mark read"}
                </SubmitButton>
              </form>
              <form action={deleteMessage}>
                <input type="hidden" name="id" value={message.id} />
                <SubmitButton tone="danger">Delete</SubmitButton>
              </form>
            </div>
          </li>
        ))}

        {rows.length === 0 ? <li className="text-slate">No messages yet.</li> : null}
      </ul>
    </>
  );
}
