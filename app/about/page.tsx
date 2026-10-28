import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import SkillList from "../components/SkillList";
import Portrait from "../components/Portrait";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
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
            </div>

            <Portrait className="max-w-[16rem] md:col-span-3 md:col-start-10" />
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-12">
            <h2 className="text-2xl font-semibold tracking-tight md:col-span-4">
              Skills
            </h2>
            <div className="md:col-span-8">
              <SkillList />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight md:col-span-4">
              Experience
            </h2>
            <p className="max-w-[56ch] text-lg leading-8 text-slate md:col-span-8">
              API development, payment integration, loyalty systems, and POS
              integration.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
