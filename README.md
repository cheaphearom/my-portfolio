# PHEAROM.DEV: backend developer portfolio

Next.js 16 (App Router) + Tailwind 4 portfolio with a private **admin portal**.
Content (profile, projects, experience, education, skills) lives in a
[Neon](https://neon.com) Postgres database and is edited from `/admin`.
Visitors can send messages through the contact form; you read them in the admin.

## Stack

- Next.js 16, React 19, Tailwind CSS 4
- Neon serverless Postgres + Drizzle ORM
- Server Actions for all admin writes, validated with Zod
- Signed-cookie session (`jose`), scrypt password hash, database-backed rate limiting

## How it works

- Public pages (`/`, `/about`, `/work`, `/work/[slug]`, `/contact`) are statically
  generated and refresh at most once a minute. Saving in `/admin` refreshes them
  immediately.
- `/admin/*` is protected twice: `proxy.ts` redirects visitors without a valid
  session cookie, and every admin page and Server Action calls `requireAdmin()`
  itself (Server Actions can be called by direct POST, so the proxy alone is not enough).
- Without `DATABASE_URL` the site still renders, using the defaults in `app/data.ts`.
  Admin and the contact form need the database.

## Local setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Create a Neon project and copy the **pooled** connection string.

3. Create `.env.local` from the template and fill it in

   ```bash
   cp .env.example .env.local
   ```

   - `DATABASE_URL`: Neon connection string
   - `SESSION_SECRET`: `openssl rand -base64 32`
   - `ADMIN_EMAIL`: the email you will sign in with
   - `ADMIN_PASSWORD_HASH`: `npm run hash-password -- "a password of 12+ characters"`
   - `NEXT_PUBLIC_SITE_URL`: `http://localhost:3000` locally, your real URL in production

4. Create the tables and seed the starting content

   ```bash
   npm run db:push
   npm run db:seed
   ```

   `db:seed` only fills empty tables, so running it again never overwrites edits.

5. Start the dev server and sign in at <http://localhost:3000/admin>

   ```bash
   npm run dev
   ```

## Deploying (Vercel)

1. Add the same environment variables in the Vercel project settings
   (use your production site URL for `NEXT_PUBLIC_SITE_URL`).
2. Run `npm run db:push` and `npm run db:seed` once against the production
   database **before the first deploy**. When `DATABASE_URL` is set, the build
   reads from the database and fails if the tables do not exist yet. That is
   deliberate, so an outage cannot silently replace real content with defaults.
3. Deploy, then sign in at `/admin`.

## Editing content

| Admin page | What it controls |
| --- | --- |
| Profile | Name, about text, email, GitHub/LinkedIn/Telegram/etc. links, CV link |
| Projects | Project list and `/work/[slug]` pages (description, role, results, images, links) |
| Experience | Timeline on the About page |
| Education | Education list on the About page |
| Skills | Grouped skills on Home and About |
| Messages | Contact-form messages (mark read, delete) |

Empty links and empty sections are hidden on the public site.

**CV and images:** the database stores links, not files. Put your CV at
`public/cv.pdf` and enter `/cv.pdf` as the CV link, or paste an `https://` URL.
Project images work the same way (`/images/projects/...` or a full URL).

## Security notes

- Passwords are never stored. Only a scrypt hash is kept in an environment variable.
- Login is limited to 5 failed attempts per IP per 15 minutes; the contact form to
  5 messages per IP per hour. Counters live in the `rate_events` table because
  serverless instances do not share memory.
- Links entered in the admin must start with `https://`, `http://` or `/`
  (blocks `javascript:` URLs).
- The session cookie is `HttpOnly`, `SameSite=Lax`, `Secure` in production, and expires after 8 hours.
- Rotate `SESSION_SECRET` to sign everyone out.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run db:push` | Create/update tables in Neon from `app/lib/db/schema.ts` |
| `npm run db:seed` | Fill empty tables with the defaults from `app/data.ts` |
| `npm run hash-password -- "..."` | Print a value for `ADMIN_PASSWORD_HASH` |

## Project layout

```
app/
  admin/            admin portal (login, dashboard, content pages, Server Actions)
  actions/          public Server Actions (contact form)
  components/       site UI
  lib/
    auth/           session cookie, password check
    db/             Drizzle schema and Neon client
    content.ts      read layer for public pages
    rate-limit.ts   database-backed rate limiting
  data.ts           default content / seed data
proxy.ts            optimistic gate for /admin
scripts/            seed and password-hash scripts
```
