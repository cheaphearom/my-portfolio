import { eq } from "drizzle-orm";
import { defaultProfile } from "../../../data";
import { requireAdmin } from "../../../lib/auth/session";
import { getDb, hasDatabase, schema } from "../../../lib/db";
import {
  Banner,
  Field,
  NoDatabase,
  PageTitle,
  SubmitButton,
  TextArea,
} from "../../_components/ui";
import { saveProfile } from "../../actions";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  if (!hasDatabase()) return <NoDatabase />;

  const { saved, error } = await searchParams;

  const [row] = await getDb()
    .select()
    .from(schema.profile)
    .where(eq(schema.profile.id, 1))
    .limit(1);
  const profile = row ?? { ...defaultProfile };

  return (
    <>
      <PageTitle
        title="Profile"
        description="Your name, intro text and contact links. Empty links are hidden on the site."
      />
      <Banner saved={saved} error={error} />

      <form action={saveProfile} className="space-y-5 rounded-md border border-ink/20 bg-white p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" name="name" defaultValue={profile.name} required />
          <Field label="Headline" name="headline" defaultValue={profile.headline} />
        </div>

        <TextArea
          label="About"
          name="about"
          rows={6}
          defaultValue={profile.about}
          hint="Shown in the About section on the home page."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" name="email" type="email" defaultValue={profile.email} />
          <Field
            label="CV link"
            name="cvUrl"
            defaultValue={profile.cvUrl}
            placeholder="/cv.pdf"
            hint="A file in /public (for example /cv.pdf) or a full https:// link."
          />
          <Field label="GitHub" name="github" defaultValue={profile.github} placeholder="https://github.com/…" />
          <Field label="LinkedIn" name="linkedin" defaultValue={profile.linkedin} placeholder="https://linkedin.com/in/…" />
          <Field label="Telegram" name="telegram" defaultValue={profile.telegram} placeholder="https://t.me/…" />
          <Field label="Facebook" name="facebook" defaultValue={profile.facebook} />
          <Field label="Instagram" name="instagram" defaultValue={profile.instagram} />
        </div>

        <SubmitButton>Save profile</SubmitButton>
      </form>
    </>
  );
}
