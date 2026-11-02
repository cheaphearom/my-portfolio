import { asc } from "drizzle-orm";
import { requireAdmin } from "../../../lib/auth/session";
import { getDb, hasDatabase, schema } from "../../../lib/db";
import type { ExperienceRow } from "../../../lib/db/schema";
import {
  AddNew,
  Banner,
  EditableItem,
  Field,
  NoDatabase,
  PageTitle,
  SubmitButton,
  TextArea,
} from "../../_components/ui";
import {
  createExperience,
  deleteExperience,
  updateExperience,
} from "../../actions";

function ExperienceFields({ entry }: { entry?: ExperienceRow }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" name="company" defaultValue={entry?.company} required />
        <Field label="Role" name="role" defaultValue={entry?.role} required />
        <Field label="Location" name="location" defaultValue={entry?.location} />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={entry?.sortOrder ?? 0} hint="Lower numbers appear first. Use 1 for your latest job." />
        <Field label="Start" name="startDate" defaultValue={entry?.startDate} placeholder="Mar 2023" />
        <Field label="End" name="endDate" defaultValue={entry?.endDate} placeholder="Leave blank for Present" />
      </div>
      <TextArea
        label="Achievements"
        name="bullets"
        rows={5}
        defaultValue={entry?.bullets}
        hint="One per line. Focus on results, for example: Built payment checkout with ABA PayWay serving X transactions/month."
      />
    </>
  );
}

export default async function ExperiencePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  if (!hasDatabase()) return <NoDatabase />;

  const { saved, error } = await searchParams;

  const rows = await getDb()
    .select()
    .from(schema.experience)
    .orderBy(asc(schema.experience.sortOrder), asc(schema.experience.id));

  return (
    <>
      <PageTitle
        title="Experience"
        description="Your work history, shown as a timeline on the About page."
      />
      <Banner saved={saved} error={error} />

      <AddNew label="experience" defaultOpen={rows.length === 0}>
        <form action={createExperience} className="space-y-4">
          <ExperienceFields />
          <SubmitButton>Add entry</SubmitButton>
        </form>
      </AddNew>

      <div className="space-y-3">
        {rows.map((entry) => (
          <EditableItem
            key={entry.id}
            id={entry.id}
            deleteAction={deleteExperience}
            summary={`${entry.role} · ${entry.company}`}
          >
            <form action={updateExperience} className="space-y-4">
              <input type="hidden" name="id" value={entry.id} />
              <ExperienceFields entry={entry} />
              <SubmitButton>Save changes</SubmitButton>
            </form>
          </EditableItem>
        ))}

        {rows.length === 0 ? (
          <p className="text-slate">No experience yet. Add your first job above.</p>
        ) : null}
      </div>
    </>
  );
}
