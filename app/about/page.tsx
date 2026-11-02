import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import SkillList from "../components/SkillList";
import Portrait from "../components/Portrait";
import {
  getEducation,
  getExperience,
  getProfile,
  getSkills,
} from "../lib/content";

export const metadata: Metadata = { title: "About" };

export const revalidate = 60;

export default async function AboutPage() {
  const [profile, skills, experience, education] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperience(),
    getEducation(),
  ]);

  return (
    <>
      <SiteNav />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
          <div className="grid items-end gap-14 md:grid-cols-12">
            <div className="md:col-span-8">
              <h1 className="text-5xl font-bold tracking-[-0.03em] md:text-7xl">
                About me
              </h1>

              <p className="mt-8 max-w-[56ch] text-xl leading-9 text-slate">
                Hi, I’m PHEAROM, a backend developer focused on building APIs,
                mobile app systems, POS integrations, dashboards, and automation
                workflows.
              </p>

              {profile.cvUrl ? (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block rounded-md bg-ink px-6 py-3 font-semibold text-cream"
                >
                  Download CV
                </a>
              ) : null}
            </div>

            <Portrait className="max-w-[16rem] md:col-span-3 md:col-start-10" />
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-12">
            <h2 className="text-2xl font-semibold tracking-tight md:col-span-4">
              Skills
            </h2>
            <div className="md:col-span-8">
              <SkillList skills={skills} />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight md:col-span-4">
              Experience
            </h2>
            {experience.length > 0 ? (
              <ol className="md:col-span-8">
                {experience.map((job) => (
                  <li
                    key={`${job.company}-${job.role}-${job.period}`}
                    className="border-t border-ink/20 py-6 first:border-t-0 first:pt-0"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="text-xl font-semibold tracking-tight">
                        {job.role} · {job.company}
                      </h3>
                      {job.period ? (
                        <p className="font-mono text-sm text-slate">{job.period}</p>
                      ) : null}
                    </div>
                    {job.location ? (
                      <p className="mt-1 text-slate">{job.location}</p>
                    ) : null}
                    {job.bullets.length > 0 ? (
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-slate">
                        {job.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="max-w-[56ch] text-lg leading-8 text-slate md:col-span-8">
                API development, payment integration, loyalty systems, and POS
                integration.
              </p>
            )}

            {education.length > 0 ? (
              <>
                <h2 className="text-2xl font-semibold tracking-tight md:col-span-4">
                  Education
                </h2>
                <ul className="md:col-span-8">
                  {education.map((item) => (
                    <li
                      key={`${item.school}-${item.degree}`}
                      className="border-t border-ink/20 py-5 first:border-t-0 first:pt-0"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h3 className="text-xl font-semibold tracking-tight">
                          {item.degree ? `${item.degree} · ${item.school}` : item.school}
                        </h3>
                        {item.period ? (
                          <p className="font-mono text-sm text-slate">{item.period}</p>
                        ) : null}
                      </div>
                      {item.notes ? (
                        <p className="mt-2 text-slate">{item.notes}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
