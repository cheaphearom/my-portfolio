import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { getProject, getProjects } from "../../lib/content";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary || undefined,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const details = [
    { label: "Role", value: project.role },
    { label: "Tech", value: project.tech },
  ].filter((item) => item.value);

  return (
    <>
      <SiteNav />

      <main className="flex-1">
        <article className="mx-auto max-w-4xl px-6 pb-24 pt-10">
          <Link
            href="/work"
            className="font-semibold underline underline-offset-4"
          >
            ← All projects
          </Link>

          <h1 className="mt-8 text-balance text-4xl font-bold tracking-[-0.03em] md:text-6xl">
            {project.title}
          </h1>

          {project.summary ? (
            <p className="mt-6 max-w-[56ch] text-xl leading-9 text-slate">
              {project.summary}
            </p>
          ) : null}

          {details.length > 0 ? (
            <dl className="mt-10 border-b border-ink/20">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 border-t border-ink/20 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
                >
                  <dt className="font-semibold">{item.label}</dt>
                  <dd className="font-mono text-sm leading-7 text-slate">{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {project.description.length > 0 ? (
            <div className="mt-12 space-y-5 text-lg leading-8 text-slate">
              {project.description.map((paragraph) => (
                <p key={paragraph} className="max-w-[60ch]">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          {project.results.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-2xl font-semibold tracking-tight">Results</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-lg text-slate">
                {project.results.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.images.length > 0 ? (
            <section className="mt-12 space-y-6" aria-label="Screenshots">
              {project.images.map((src) =>
                src.startsWith("/") ? (
                  <div
                    key={src}
                    className="relative aspect-[16/9] overflow-hidden rounded-md bg-sand"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(min-width: 896px) 896px, 100vw"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  // Remote images are not in next.config remotePatterns, so use a plain img.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    className="w-full rounded-md bg-sand"
                  />
                ),
              )}
            </section>
          ) : null}

          {project.repoUrl || project.liveUrl ? (
            <div className="mt-12 flex flex-wrap gap-4">
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-ink px-6 py-3 font-semibold text-cream"
                >
                  View code
                </a>
              ) : null}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-ink px-6 py-3 font-semibold"
                >
                  Live site
                </a>
              ) : null}
            </div>
          ) : null}
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
