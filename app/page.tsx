import Link from "next/link";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import Receipt from "./components/Receipt";
import ProjectLedger from "./components/ProjectLedger";
import SkillList from "./components/SkillList";
import ContactSection from "./components/ContactSection";
import KramaBand from "./components/KramaBand";
import Portrait from "./components/Portrait";
import { projects } from "./data";

export default function Home() {
  return (
    <>
      <header className="bg-cream text-ink">
        <SiteNav />

        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 pt-10 lg:grid-cols-[1.25fr_1fr] lg:pb-32 lg:pt-16">
          <div>
            <h1 className="text-balance text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.03em]">
              Phearom builds the backend behind orders, payments and POS.
            </h1>

            <p className="mt-8 max-w-[52ch] text-lg leading-8 text-slate">
              I’m a backend developer working on APIs, mobile app integrations,
              POS systems and web applications, with a clean and scalable
              structure.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#work"
                className="rounded-md bg-ink px-6 py-3 font-semibold text-cream"
              >
                View work
              </a>
              <a
                href="#contact"
                className="rounded-md border border-ink px-6 py-3 font-semibold"
              >
                Contact me
              </a>
            </div>
          </div>

          <Receipt />
        </div>

        <KramaBand />
      </header>

      <main>
        <section id="about" className="scroll-mt-4 bg-paper">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Developer focused on real business systems.
              </h2>

              <Portrait className="mt-12 max-w-[18rem]" />
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <p className="max-w-[56ch] text-lg leading-8 text-slate">
                I have experience building backend APIs, payment integrations,
                loyalty systems, POS integrations, school management systems,
                dashboards, and automation workflows. I care about clean
                structure, performance, reusable code, and real production
                usage.
              </p>

              <div className="mt-10">
                <SkillList />
              </div>

              <Link
                href="/about"
                className="mt-8 inline-block font-semibold text-ink underline underline-offset-4"
              >
                More about me
              </Link>
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-4 bg-cream">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="mb-12 text-4xl font-bold tracking-tight md:text-5xl">
              Selected projects
            </h2>

            <ProjectLedger items={projects.slice(0, 3)} />

            <Link
              href="/work"
              className="mt-8 inline-block font-semibold text-ink underline underline-offset-4"
            >
              See all projects
            </Link>
          </div>
        </section>

        <ContactSection id="contact" />
        <KramaBand />
      </main>

      <SiteFooter />
    </>
  );
}
