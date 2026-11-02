import { asc } from "drizzle-orm";
import { requireAdmin } from "../../../lib/auth/session";
import { getDb, hasDatabase, schema } from "../../../lib/db";
import type { EducationRow } from "../../../lib/db/schema";
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
  createEducation,
  deleteEducation,
  updateEducation,
} from "../../actions";

function EducationFields({ entry }: { entry?: EducationRow }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="School" name="school" defaultValue={entry?.school} required />
        <Field label="Degree / certificate" name="degree" defaultValue={entry?.degree} />
        <Field label="Start year" name="startYear" defaultValue={entry?.startYear} />
        <Field label="End year" name="endYear" defaultValue={entry?.endYear} />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={entry?.sortOrder ?? 0} />
      </div>
      <TextArea label="Notes" name="notes" rows={3} defaultValue={entry?.notes} />
    </>
  );
}

export default async function EducationPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  if (!hasDatabase()) return <NoDatabase />;

  const { saved, error } = await searchParams;

  const rows = await getDb()
    .select()
    .from(schema.education)
    .orderBy(asc(schema.education.sortOrder), asc(schema.education.id));

  return (
    <>
      <PageTitle
        title="Education"
        description="Schools, degrees and certifications shown on the About page."
      />
      <Banner saved={saved} error={error} />

      <AddNew label="education" defaultOpen={rows.length === 0}>
        <form action={createEducation} className="space-y-4">
          <EducationFields />
          <SubmitButton>Add entry</SubmitButton>
        </form>
      </AddNew>

      <div className="space-y-3">
        {rows.map((entry) => (
          <EditableItem
            key={entry.id}
            id={entry.id}
            deleteAction={deleteEducation}
            summary={entry.degree ? `${entry.degree} · ${entry.school}` : entry.school}
          >
            <form action={updateEducation} className="space-y-4">
              <input type="hidden" name="id" value={entry.id} />
              <EducationFields entry={entry} />
              <SubmitButton>Save changes</SubmitButton>
            </form>
          </EditableItem>
        ))}

        {rows.length === 0 ? (
          <p className="text-slate">No education yet. Add your first entry above.</p>
        ) : null}
      </div>
    </>
  );
}
