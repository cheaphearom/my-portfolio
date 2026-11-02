import { asc } from "drizzle-orm";
import { requireAdmin } from "../../../lib/auth/session";
import { getDb, hasDatabase, schema } from "../../../lib/db";
import type { SkillRow } from "../../../lib/db/schema";
import {
  AddNew,
  Banner,
  EditableItem,
  Field,
  NoDatabase,
  PageTitle,
  SubmitButton,
} from "../../_components/ui";
import { createSkill, deleteSkill, updateSkill } from "../../actions";

function SkillFields({ skill }: { skill?: SkillRow }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_2fr_8rem]">
      <Field label="Group" name="label" defaultValue={skill?.label} required placeholder="Backend" />
      <Field label="Skills" name="items" defaultValue={skill?.items} placeholder="PHP, Laravel, Spring Boot" />
      <Field label="Order" name="sortOrder" type="number" defaultValue={skill?.sortOrder ?? 0} />
    </div>
  );
}

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  if (!hasDatabase()) return <NoDatabase />;

  const { saved, error } = await searchParams;

  const rows = await getDb()
    .select()
    .from(schema.skills)
    .orderBy(asc(schema.skills.sortOrder), asc(schema.skills.id));

  return (
    <>
      <PageTitle
        title="Skills"
        description="Grouped skills shown on the home and About pages. Suggested groups: Backend, APIs and auth, Databases, DevOps, Frontend."
      />
      <Banner saved={saved} error={error} />

      <AddNew label="skill group" defaultOpen={rows.length === 0}>
        <form action={createSkill} className="space-y-4">
          <SkillFields />
          <SubmitButton>Add group</SubmitButton>
        </form>
      </AddNew>

      <div className="space-y-3">
        {rows.map((skill) => (
          <EditableItem
            key={skill.id}
            id={skill.id}
            deleteAction={deleteSkill}
            summary={`${skill.label}: ${skill.items}`}
          >
            <form action={updateSkill} className="space-y-4">
              <input type="hidden" name="id" value={skill.id} />
              <SkillFields skill={skill} />
              <SubmitButton>Save changes</SubmitButton>
            </form>
          </EditableItem>
        ))}
      </div>
    </>
  );
}
