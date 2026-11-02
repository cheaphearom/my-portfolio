import { config } from "dotenv";
import { eq } from "drizzle-orm";
import {
  defaultEducation,
  defaultExperience,
  defaultProfile,
  defaultProjects,
  defaultSkills,
} from "../app/data";
import { getDb, schema } from "../app/lib/db";

config({ path: ".env.local" });
config({ path: ".env" });

// Seeds only tables that are empty, so running it twice never duplicates
// or overwrites content you already edited in /admin.
async function main() {
  const db = getDb();

  const [existingProfile] = await db
    .select({ id: schema.profile.id })
    .from(schema.profile)
    .where(eq(schema.profile.id, 1))
    .limit(1);

  if (!existingProfile) {
    await db.insert(schema.profile).values({ id: 1, ...defaultProfile });
    console.log("seeded profile");
  } else {
    console.log("profile already exists, skipped");
  }

  const seedTable = async <T extends object>(
    name: string,
    table:
      | typeof schema.projects
      | typeof schema.skills
      | typeof schema.experience
      | typeof schema.education,
    rows: T[],
  ) => {
    if (rows.length === 0) {
      console.log(`${name}: nothing to seed`);
      return;
    }
    const existing = await db.select().from(table).limit(1);
    if (existing.length > 0) {
      console.log(`${name} already has rows, skipped`);
      return;
    }
    // Row shapes differ per table; the defaults in app/data.ts match each schema.
    await db.insert(table).values(rows as never);
    console.log(`seeded ${rows.length} ${name}`);
  };

  await seedTable("projects", schema.projects, defaultProjects);
  await seedTable("skills", schema.skills, defaultSkills);
  await seedTable("experience", schema.experience, defaultExperience);
  await seedTable("education", schema.education, defaultEducation);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
