import type { MetadataRoute } from "next";
import { getProjects } from "./lib/content";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
  const projects = await getProjects();

  return [
    { url: `${base}/` },
    { url: `${base}/about` },
    { url: `${base}/work` },
    { url: `${base}/contact` },
    ...projects.map((project) => ({ url: `${base}/work/${project.slug}` })),
  ];
}
