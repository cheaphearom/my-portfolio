import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import ProjectLedger from "../components/ProjectLedger";
import { getProjects } from "../lib/content";

export const metadata: Metadata = { title: "Work" };

export const revalidate = 60;

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <>
      <SiteNav />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:pt-16">
          <h1 className="glass inline-block rounded-2xl px-5 py-2 mb-12 text-5xl font-bold tracking-[-0.03em] md:text-7xl">
            My work
          </h1>

          <ProjectLedger items={projects} />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
