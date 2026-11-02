import "server-only";
import { asc, eq } from "drizzle-orm";
import {
  defaultEducation,
  defaultExperience,
  defaultProfile,
  defaultProjects,
  defaultSkills,
} from "../data";
import { getDb, hasDatabase, schema } from "./db";

/**
 * Read layer for the public site.
 *
 * - No DATABASE_URL: serve the defaults in app/data.ts (local dev, first build).
 * - DATABASE_URL set: read from Neon. A failing query throws on purpose, so a
 *   database outage keeps the last good static page instead of replacing
 *   real content with defaults.
 */

export function lines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function paragraphs(value: string): string[] {
  return value
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export type ProfileView = typeof defaultProfile;

export type ProjectView = {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  tech: string;
  role: string;
  results: string[];
  images: string[];
  repoUrl: string;
  liveUrl: string;
  icon: string;
};

export type SkillView = { label: string; items: string };

export type ExperienceView = {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
};

export type EducationView = {
  school: string;
  degree: string;
  period: string;
  notes: string;
};

type ProjectSource = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string;
  role: string;
  results: string;
  images: string;
  repoUrl: string;
  liveUrl: string;
  icon: string;
};

function toProjectView(row: ProjectSource): ProjectView {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    description: paragraphs(row.description),
    tech: row.tech,
    role: row.role,
    results: lines(row.results),
    images: lines(row.images),
    repoUrl: row.repoUrl,
    liveUrl: row.liveUrl,
    icon: row.icon,
  };
}

function period(start: string, end: string, fallbackEnd = "Present") {
  if (!start && !end) return "";
  return `${start || "?"} – ${end || fallbackEnd}`;
}

export async function getProfile(): Promise<ProfileView> {
  if (!hasDatabase()) return defaultProfile;

  const [row] = await getDb()
    .select()
    .from(schema.profile)
    .where(eq(schema.profile.id, 1))
    .limit(1);

  if (!row) return defaultProfile;

  const { id, updatedAt, ...rest } = row;
  void id;
  void updatedAt;
  return rest;
}

export async function getProjects(): Promise<ProjectView[]> {
  if (!hasDatabase()) {
    return [...defaultProjects]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(toProjectView);
  }

  const rows = await getDb()
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.published, true))
    .orderBy(asc(schema.projects.sortOrder), asc(schema.projects.id));

  return rows.map(toProjectView);
}

export async function getProject(slug: string): Promise<ProjectView | null> {
  if (!hasDatabase()) {
    const match = defaultProjects.find((p) => p.slug === slug);
    return match ? toProjectView(match) : null;
  }

  const [row] = await getDb()
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.slug, slug))
    .limit(1);

  return row && row.published ? toProjectView(row) : null;
}

export async function getSkills(): Promise<SkillView[]> {
  if (!hasDatabase()) {
    return [...defaultSkills].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  return getDb()
    .select({ label: schema.skills.label, items: schema.skills.items })
    .from(schema.skills)
    .orderBy(asc(schema.skills.sortOrder), asc(schema.skills.id));
}

export async function getExperience(): Promise<ExperienceView[]> {
  const rows = hasDatabase()
    ? await getDb()
        .select()
        .from(schema.experience)
        .orderBy(asc(schema.experience.sortOrder), asc(schema.experience.id))
    : defaultExperience;

  return rows.map((row) => ({
    company: row.company,
    role: row.role,
    location: row.location,
    period: period(row.startDate, row.endDate),
    bullets: lines(row.bullets),
  }));
}

export async function getEducation(): Promise<EducationView[]> {
  const rows = hasDatabase()
    ? await getDb()
        .select()
        .from(schema.education)
        .orderBy(asc(schema.education.sortOrder), asc(schema.education.id))
    : defaultEducation;

  return rows.map((row) => ({
    school: row.school,
    degree: row.degree,
    period: period(row.startYear, row.endYear, ""),
    notes: row.notes,
  }));
}
