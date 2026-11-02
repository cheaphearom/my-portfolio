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

  const hasBody =
    details.length > 0 ||
    project.description.length > 0 ||
    project.results.length > 0;

  return (
    <>
      <SiteNav />

      <main className="flex-1">
        <article className="mx-auto max-w-4xl px-4 pb-16 pt-10">
          <Link
            href="/work"
            className="glass inline-block rounded-full px-5 py-2 font-semibold"
          >
            ← All projects
          </Link>

          <h1 className="glass inline-block rounded-2xl px-5 py-2 mt-8 text-balance text-4xl font-bold tracking-[-0.03em] md:text-6xl">
            {project.title}
          </h1>

          {project.summary ? (
            <p className="glass mt-6 max-w-[60ch] rounded-3xl p-6 text-xl leading-9 text-slate">
              {project.summary}
            </p>
          ) : null}

          {hasBody ? (
            <div className="glass mt-6 space-y-8 rounded-3xl p-6 md:p-8">
              {details.length > 0 ? (
                <dl>
                  {details.map((item) => (
                    <div
                      key={item.label}
                      className="grid gap-1 border-t border-ink/10 py-4 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6"
                    >
                      <dt className="font-semibold">{item.label}</dt>
                      <dd className="font-mono text-sm leading-7 text-slate">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {project.description.length > 0 ? (
                <div className="space-y-5 text-lg leading-8 text-slate">
                  {project.description.map((paragraph) => (
                    <p key={paragraph} className="max-w-[60ch]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              {project.results.length > 0 ? (
                <section>
                  <h2 className="text-2xl font-semibold tracking-tight">Results</h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-lg text-slate">
                    {project.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          ) : null}

          {project.images.length > 0 ? (
            <section className="mt-6 space-y-6" aria-label="Screenshots">
              {project.images.map((src) =>
                src.startsWith("/") ? (
                  <div
                    key={src}
                    className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/70 bg-sand shadow-xl shadow-indigo/25"
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
                    className="w-full rounded-3xl border border-white/70 bg-sand shadow-xl shadow-indigo/25"
                  />
                ),
              )}
            </section>
          ) : null}

          {project.repoUrl || project.liveUrl ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-ink px-6 py-3 font-semibold text-cream shadow-lg shadow-ink/25"
                >
                  View code
                </a>
              ) : null}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-full px-6 py-3 font-semibold"
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
