import { asc } from "drizzle-orm";
import { requireAdmin } from "../../../lib/auth/session";
import { getDb, hasDatabase, schema } from "../../../lib/db";
import { projectIconKeys } from "../../../lib/icons";
import type { ProjectRow } from "../../../lib/db/schema";
import {
  AddNew,
  Banner,
  Checkbox,
  EditableItem,
  Field,
  NoDatabase,
  PageTitle,
  Select,
  SubmitButton,
  TextArea,
} from "../../_components/ui";
import {
  createProject,
  deleteProject,
  updateProject,
} from "../../actions";

function ProjectFields({ project }: { project?: ProjectRow }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={project?.title} required />
        <Field
          label="Slug"
          name="slug"
          defaultValue={project?.slug}
          hint="Used in the URL: /work/your-slug. Leave blank to generate from the title."
        />
      </div>

      <Field label="Summary" name="summary" defaultValue={project?.summary} hint="One line shown in the project list." />

      <TextArea
        label="Description"
        name="description"
        rows={6}
        defaultValue={project?.description}
        hint="Problem, approach and architecture. Separate paragraphs with a blank line."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tech" name="tech" defaultValue={project?.tech} placeholder="PHP, MySQL, ABA PayWay" />
        <Field label="Your role" name="role" defaultValue={project?.role} />
      </div>

      <TextArea
        label="Results"
        name="results"
        rows={3}
        defaultValue={project?.results}
        hint="One result per line, ideally with numbers."
      />

      <TextArea
        label="Images"
        name="images"
        rows={3}
        defaultValue={project?.images}
        hint="One per line: a /path in /public or an https:// URL."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Repository link" name="repoUrl" defaultValue={project?.repoUrl} />
        <Field label="Live link" name="liveUrl" defaultValue={project?.liveUrl} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Select label="Icon" name="icon" options={projectIconKeys} defaultValue={project?.icon ?? "Server"} />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={project?.sortOrder ?? 0} />
        <div className="flex items-end pb-2">
          <Checkbox label="Published" name="published" defaultChecked={project?.published ?? true} />
        </div>
      </div>
    </>
  );
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  if (!hasDatabase()) return <NoDatabase />;

  const { saved, error } = await searchParams;

  const rows = await getDb()
    .select()
    .from(schema.projects)
    .orderBy(asc(schema.projects.sortOrder), asc(schema.projects.id));

  return (
    <>
      <PageTitle
        title="Projects"
        description="Each project gets its own page at /work/slug. Unpublished projects are hidden."
      />
      <Banner saved={saved} error={error} />

      <AddNew label="project" defaultOpen={rows.length === 0}>
        <form action={createProject} className="space-y-4">
          <ProjectFields />
          <SubmitButton>Create project</SubmitButton>
        </form>
      </AddNew>

      <div className="space-y-3">
        {rows.map((project) => (
          <EditableItem
            key={project.id}
            id={project.id}
            deleteAction={deleteProject}
            summary={
              <>
                {project.title}
                {project.published ? null : (
                  <span className="ml-2 rounded bg-sand px-2 py-0.5 text-xs">Draft</span>
                )}
              </>
            }
          >
            <form action={updateProject} className="space-y-4">
              <input type="hidden" name="id" value={project.id} />
              <ProjectFields project={project} />
              <SubmitButton>Save changes</SubmitButton>
            </form>
          </EditableItem>
        ))}

        {rows.length === 0 ? (
          <p className="text-slate">No projects yet. Add the first one above.</p>
        ) : null}
      </div>
    </>
  );
}
