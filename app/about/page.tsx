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
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:pt-16">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-8">
              <h1 className="glass inline-block rounded-2xl px-5 py-2 text-5xl font-bold tracking-[-0.03em] md:text-7xl">
                About me
              </h1>

              <div className="glass mt-8 rounded-3xl p-7">
                <p className="max-w-[56ch] text-xl leading-9 text-slate">
                  Hi, I’m PHEAROM, a backend developer focused on building APIs,
                  mobile app systems, POS integrations, dashboards, and
                  automation workflows.
                </p>
              </div>

              {profile.cvUrl ? (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-cream shadow-lg shadow-ink/25"
                >
                  Download CV
                </a>
              ) : null}
            </div>

            <Portrait className="max-w-[16rem] md:col-span-3 md:col-start-10" />
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-x-12 md:gap-y-14">
            <h2 className="glass inline-block self-start rounded-2xl px-5 py-2 text-2xl font-semibold tracking-tight md:col-span-4">
              Skills
            </h2>
            <div className="md:col-span-8">
              <SkillList skills={skills} />
            </div>

            <h2 className="glass inline-block self-start rounded-2xl px-5 py-2 mt-6 text-2xl font-semibold tracking-tight md:col-span-4 md:mt-0">
              Experience
            </h2>
            {experience.length > 0 ? (
              <ol className="space-y-4 md:col-span-8">
                {experience.map((job) => (
                  <li
                    key={`${job.company}-${job.role}-${job.period}`}
                    className="glass rounded-3xl p-6"
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
              <div className="glass rounded-3xl p-6 md:col-span-8">
                <p className="max-w-[56ch] text-lg leading-8 text-slate">
                  API development, payment integration, loyalty systems, and
                  POS integration.
                </p>
              </div>
            )}

            {education.length > 0 ? (
              <>
                <h2 className="glass inline-block self-start rounded-2xl px-5 py-2 mt-6 text-2xl font-semibold tracking-tight md:col-span-4 md:mt-0">
                  Education
                </h2>
                <ul className="space-y-4 md:col-span-8">
                  {education.map((item) => (
                    <li
                      key={`${item.school}-${item.degree}`}
                      className="glass rounded-3xl p-6"
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
