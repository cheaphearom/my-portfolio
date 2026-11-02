import Link from "next/link";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import Receipt from "./components/Receipt";
import ProjectLedger from "./components/ProjectLedger";
import SkillList from "./components/SkillList";
import ContactSection from "./components/ContactSection";
import KramaBand from "./components/KramaBand";
import Portrait from "./components/Portrait";
import { getProfile, getProjects, getSkills } from "./lib/content";

// Re-generated in the background at most once a minute; admin saves also
// trigger an immediate refresh via revalidatePath.
export const revalidate = 60;

export default async function Home() {
  const [profile, projects, skills] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
  ]);

  return (
    <>
      <SiteNav />

      <header>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-10 pt-10 lg:grid-cols-[1.35fr_1fr] lg:gap-0 lg:pb-16 lg:pt-16">
          <div className="glass rounded-[2rem] px-7 py-10 md:px-12 md:py-14">
            <h1 className="text-balance text-[clamp(2.5rem,5.6vw,4.9rem)] font-bold leading-[1] tracking-[-0.03em]">
              Phearom builds the backend behind orders, payments and POS.
            </h1>

            <p className="mt-8 max-w-[52ch] text-lg leading-8 text-slate">
              I’m a backend developer working on APIs, mobile app integrations,
              POS systems and web applications, with a clean and scalable
              structure.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-full bg-ink px-6 py-3 font-semibold text-cream shadow-lg shadow-ink/25"
              >
                View work
              </a>
              <a
                href="#contact"
                className="glass rounded-full px-6 py-3 font-semibold"
              >
                Contact me
              </a>
              {profile.cvUrl ? (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-full px-6 py-3 font-semibold"
                >
                  Download CV
                </a>
              ) : null}
            </div>
          </div>

          {/* The receipt overlaps the pane's right edge, as if printed over it. */}
          <div className="relative z-10 lg:-ml-10 lg:mt-24">
            <Receipt />
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4">
          <KramaBand className="overflow-hidden rounded-full" />
        </div>
      </header>

      <main>
        <section id="about" className="scroll-mt-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-12 md:py-24">
            <div className="md:col-span-5">
              <h2 className="glass inline-block rounded-2xl px-5 py-2 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Developer focused on real business systems.
              </h2>

              <Portrait className="mt-10 max-w-[18rem]" />
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <div className="glass rounded-3xl p-7">
                <p className="max-w-[56ch] text-lg leading-8 text-slate">
                  {profile.about}
                </p>
              </div>

              <div className="mt-6">
                <SkillList skills={skills} />
              </div>

              <Link
                href="/about"
                className="glass mt-6 inline-block rounded-full px-6 py-3 font-semibold"
              >
                More about me
              </Link>
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <h2 className="glass inline-block rounded-2xl px-5 py-2 mb-10 text-4xl font-bold tracking-tight md:text-5xl">
              Selected projects
            </h2>

            <ProjectLedger items={projects.slice(0, 3)} />

            <Link
              href="/work"
              className="glass mt-8 inline-block rounded-full px-6 py-3 font-semibold"
            >
              See all projects
            </Link>
          </div>
        </section>

        <ContactSection id="contact" profile={profile} />
      </main>

      <SiteFooter />
    </>
  );
}
