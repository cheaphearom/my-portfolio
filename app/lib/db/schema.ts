import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// Single-row table (id is always 1) holding the site owner's details.
export const profile = pgTable("profile", {
  id: integer("id").primaryKey().default(1),
  name: text("name").notNull().default(""),
  headline: text("headline").notNull().default(""),
  about: text("about").notNull().default(""),
  email: text("email").notNull().default(""),
  github: text("github").notNull().default(""),
  linkedin: text("linkedin").notNull().default(""),
  telegram: text("telegram").notNull().default(""),
  facebook: text("facebook").notNull().default(""),
  instagram: text("instagram").notNull().default(""),
  // Public URL of the CV, e.g. "/cv.pdf" (a file in /public) or a full https URL.
  cvUrl: text("cv_url").notNull().default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull().default(""),
  // Long description. Blank lines separate paragraphs.
  description: text("description").notNull().default(""),
  tech: text("tech").notNull().default(""),
  role: text("role").notNull().default(""),
  // One result per line.
  results: text("results").notNull().default(""),
  // One image path or URL per line.
  images: text("images").notNull().default(""),
  repoUrl: text("repo_url").notNull().default(""),
  liveUrl: text("live_url").notNull().default(""),
  // Key into the icon map in app/lib/icons.ts.
  icon: text("icon").notNull().default("Server"),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  location: text("location").notNull().default(""),
  // Free text such as "Mar 2023" so partial dates are fine.
  startDate: text("start_date").notNull().default(""),
  // Empty means "Present".
  endDate: text("end_date").notNull().default(""),
  // One achievement per line.
  bullets: text("bullets").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  school: text("school").notNull(),
  degree: text("degree").notNull().default(""),
  startYear: text("start_year").notNull().default(""),
  endYear: text("end_year").notNull().default(""),
  notes: text("notes").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  items: text("items").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  body: text("body").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Rows used to rate-limit login attempts and contact-form submissions.
// Serverless instances do not share memory, so the counter lives in the database.
export const rateEvents = pgTable(
  "rate_events",
  {
    id: serial("id").primaryKey(),
    key: text("key").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("rate_events_key_idx").on(table.key, table.createdAt)],
);

export type Profile = typeof profile.$inferSelect;
export type ProjectRow = typeof projects.$inferSelect;
export type ExperienceRow = typeof experience.$inferSelect;
export type EducationRow = typeof education.$inferSelect;
export type SkillRow = typeof skills.$inferSelect;
export type MessageRow = typeof messages.$inferSelect;
