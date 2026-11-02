"use server";

import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";
import { deleteSession, requireAdmin } from "../lib/auth/session";
import { getDb, schema } from "../lib/db";
import { projectIconKeys } from "../lib/icons";

// Every export below is a Server Action, so each one re-checks the session
// with requireAdmin(): actions can be called by direct POST, not only from the UI.

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function back(path: string, kind: "saved" | "error", message = "1"): never {
  redirect(`${path}?${kind}=${encodeURIComponent(message)}`);
}

function refreshSite() {
  revalidatePath("/", "layout");
}

const isSafeUrl = (value: string) =>
  value === "" || value.startsWith("/") || /^https?:\/\//i.test(value);

const url = z
  .string()
  .trim()
  .max(500)
  .refine(isSafeUrl, "Links must start with https://, http:// or /");

const sortOrder = z.coerce.number().int().min(0).max(9999).catch(0);

function firstError(error: z.ZodError): string {
  const issue = error.issues[0];
  const field = issue?.path.join(".") || "form";
  return `${field}: ${issue?.message ?? "invalid value"}`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ---------------------------------------------------------------- auth

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}

// ---------------------------------------------------------------- profile

const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  headline: z.string().trim().max(200),
  about: z.string().trim().max(3000),
  email: z.union([z.literal(""), z.email().max(200)]),
  github: url,
  linkedin: url,
  telegram: url,
  facebook: url,
  instagram: url,
  cvUrl: url,
});

export async function saveProfile(formData: FormData) {
  await requireAdmin();

  const parsed = profileSchema.safeParse({
    name: text(formData, "name"),
    headline: text(formData, "headline"),
    about: text(formData, "about"),
    email: text(formData, "email").trim(),
    github: text(formData, "github"),
    linkedin: text(formData, "linkedin"),
    telegram: text(formData, "telegram"),
    facebook: text(formData, "facebook"),
    instagram: text(formData, "instagram"),
    cvUrl: text(formData, "cvUrl"),
  });
  if (!parsed.success) back("/admin/profile", "error", firstError(parsed.error));

  const values = { ...parsed.data, updatedAt: new Date() };
  await getDb()
    .insert(schema.profile)
    .values({ id: 1, ...values })
    .onConflictDoUpdate({ target: schema.profile.id, set: values });

  refreshSite();
  back("/admin/profile", "saved");
}

// ---------------------------------------------------------------- projects

const imageLines = z
  .string()
  .max(3000)
  .refine(
    (value) =>
      value
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .every(isSafeUrl),
    "Every image must be an https:// URL or a /path",
  );

const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes")
    .max(80),
  summary: z.string().trim().max(300),
  description: z.string().trim().max(8000),
  tech: z.string().trim().max(300),
  role: z.string().trim().max(200),
  results: z.string().trim().max(3000),
  images: imageLines,
  repoUrl: url,
  liveUrl: url,
  icon: z.enum(projectIconKeys as [string, ...string[]]),
  sortOrder,
  published: z.boolean(),
});

function readProject(formData: FormData) {
  const title = text(formData, "title");
  return projectSchema.safeParse({
    title,
    slug: slugify(text(formData, "slug") || title),
    summary: text(formData, "summary"),
    description: text(formData, "description"),
    tech: text(formData, "tech"),
    role: text(formData, "role"),
    results: text(formData, "results"),
    images: text(formData, "images"),
    repoUrl: text(formData, "repoUrl"),
    liveUrl: text(formData, "liveUrl"),
    icon: text(formData, "icon"),
    sortOrder: text(formData, "sortOrder"),
    published: formData.get("published") === "on",
  });
}

export async function createProject(formData: FormData) {
  await requireAdmin();

  const parsed = readProject(formData);
  if (!parsed.success) back("/admin/projects", "error", firstError(parsed.error));

  const db = getDb();
  const [clash] = await db
    .select({ id: schema.projects.id })
    .from(schema.projects)
    .where(eq(schema.projects.slug, parsed.data.slug))
    .limit(1);
  if (clash) back("/admin/projects", "error", "That slug is already used");

  await db.insert(schema.projects).values(parsed.data);

  refreshSite();
  back("/admin/projects", "saved");
}

export async function updateProject(formData: FormData) {
  await requireAdmin();

  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) back("/admin/projects", "error", "Invalid project");

  const parsed = readProject(formData);
  if (!parsed.success) back("/admin/projects", "error", firstError(parsed.error));

  const db = getDb();
  const [clash] = await db
    .select({ id: schema.projects.id })
    .from(schema.projects)
    .where(
      and(
        eq(schema.projects.slug, parsed.data.slug),
        ne(schema.projects.id, id),
      ),
    )
    .limit(1);
  if (clash) back("/admin/projects", "error", "That slug is already used");

  await db
    .update(schema.projects)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(schema.projects.id, id));

  refreshSite();
  back("/admin/projects", "saved");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();

  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) back("/admin/projects", "error", "Invalid project");

  await getDb().delete(schema.projects).where(eq(schema.projects.id, id));

  refreshSite();
  back("/admin/projects", "saved");
}

// ---------------------------------------------------------------- experience

const experienceSchema = z.object({
  company: z.string().trim().min(1, "Company is required").max(150),
  role: z.string().trim().min(1, "Role is required").max(150),
  location: z.string().trim().max(150),
  startDate: z.string().trim().max(40),
  endDate: z.string().trim().max(40),
  bullets: z.string().trim().max(3000),
  sortOrder,
});

function readExperience(formData: FormData) {
  return experienceSchema.safeParse({
    company: text(formData, "company"),
    role: text(formData, "role"),
    location: text(formData, "location"),
    startDate: text(formData, "startDate"),
    endDate: text(formData, "endDate"),
    bullets: text(formData, "bullets"),
    sortOrder: text(formData, "sortOrder"),
  });
}

export async function createExperience(formData: FormData) {
  await requireAdmin();
  const parsed = readExperience(formData);
  if (!parsed.success) back("/admin/experience", "error", firstError(parsed.error));

  await getDb().insert(schema.experience).values(parsed.data);

  refreshSite();
  back("/admin/experience", "saved");
}

export async function updateExperience(formData: FormData) {
  await requireAdmin();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) back("/admin/experience", "error", "Invalid entry");

  const parsed = readExperience(formData);
  if (!parsed.success) back("/admin/experience", "error", firstError(parsed.error));

  await getDb()
    .update(schema.experience)
    .set(parsed.data)
    .where(eq(schema.experience.id, id));

  refreshSite();
  back("/admin/experience", "saved");
}

export async function deleteExperience(formData: FormData) {
  await requireAdmin();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) back("/admin/experience", "error", "Invalid entry");

  await getDb().delete(schema.experience).where(eq(schema.experience.id, id));

  refreshSite();
  back("/admin/experience", "saved");
}

// ---------------------------------------------------------------- education

const educationSchema = z.object({
  school: z.string().trim().min(1, "School is required").max(150),
  degree: z.string().trim().max(150),
  startYear: z.string().trim().max(20),
  endYear: z.string().trim().max(20),
  notes: z.string().trim().max(1000),
  sortOrder,
});

function readEducation(formData: FormData) {
  return educationSchema.safeParse({
    school: text(formData, "school"),
    degree: text(formData, "degree"),
    startYear: text(formData, "startYear"),
    endYear: text(formData, "endYear"),
    notes: text(formData, "notes"),
    sortOrder: text(formData, "sortOrder"),
  });
}

export async function createEducation(formData: FormData) {
  await requireAdmin();
  const parsed = readEducation(formData);
  if (!parsed.success) back("/admin/education", "error", firstError(parsed.error));

  await getDb().insert(schema.education).values(parsed.data);

  refreshSite();
  back("/admin/education", "saved");
}

export async function updateEducation(formData: FormData) {
  await requireAdmin();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) back("/admin/education", "error", "Invalid entry");

  const parsed = readEducation(formData);
  if (!parsed.success) back("/admin/education", "error", firstError(parsed.error));

  await getDb()
    .update(schema.education)
    .set(parsed.data)
    .where(eq(schema.education.id, id));

  refreshSite();
  back("/admin/education", "saved");
}

export async function deleteEducation(formData: FormData) {
  await requireAdmin();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) back("/admin/education", "error", "Invalid entry");

  await getDb().delete(schema.education).where(eq(schema.education.id, id));

  refreshSite();
  back("/admin/education", "saved");
}

// ---------------------------------------------------------------- skills

const skillSchema = z.object({
  label: z.string().trim().min(1, "Label is required").max(80),
  items: z.string().trim().max(400),
  sortOrder,
});

function readSkill(formData: FormData) {
  return skillSchema.safeParse({
    label: text(formData, "label"),
    items: text(formData, "items"),
    sortOrder: text(formData, "sortOrder"),
  });
}

export async function createSkill(formData: FormData) {
  await requireAdmin();
  const parsed = readSkill(formData);
  if (!parsed.success) back("/admin/skills", "error", firstError(parsed.error));

  await getDb().insert(schema.skills).values(parsed.data);

  refreshSite();
  back("/admin/skills", "saved");
}

export async function updateSkill(formData: FormData) {
  await requireAdmin();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) back("/admin/skills", "error", "Invalid skill");

  const parsed = readSkill(formData);
  if (!parsed.success) back("/admin/skills", "error", firstError(parsed.error));

  await getDb()
    .update(schema.skills)
    .set(parsed.data)
    .where(eq(schema.skills.id, id));

  refreshSite();
  back("/admin/skills", "saved");
}

export async function deleteSkill(formData: FormData) {
  await requireAdmin();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) back("/admin/skills", "error", "Invalid skill");

  await getDb().delete(schema.skills).where(eq(schema.skills.id, id));

  refreshSite();
  back("/admin/skills", "saved");
}

// ---------------------------------------------------------------- messages

export async function toggleMessageRead(formData: FormData) {
  await requireAdmin();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) back("/admin/messages", "error", "Invalid message");

  const read = text(formData, "read") === "true";
  await getDb()
    .update(schema.messages)
    .set({ read })
    .where(eq(schema.messages.id, id));

  revalidatePath("/admin", "layout");
  back("/admin/messages", "saved");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) back("/admin/messages", "error", "Invalid message");

  await getDb().delete(schema.messages).where(eq(schema.messages.id, id));

  revalidatePath("/admin", "layout");
  back("/admin/messages", "saved");
}
