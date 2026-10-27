import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import ProjectLedger from "../components/ProjectLedger";
import { projects } from "../data";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <SiteNav />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
          <h1 className="mb-14 text-5xl font-bold tracking-[-0.03em] md:text-7xl">
            My work
          </h1>

          <ProjectLedger items={projects} />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
