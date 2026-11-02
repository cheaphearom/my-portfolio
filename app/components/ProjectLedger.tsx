import Link from "next/link";
import type { ProjectView } from "../lib/content";
import { getProjectIcon } from "../lib/icons";

export default function ProjectLedger({ items }: { items: ProjectView[] }) {
  return (
    <ul className="space-y-4">
      {items.map(({ slug, title, summary, tech, icon }) => {
        const Icon = getProjectIcon(icon);

        return (
          <li
            key={slug}
            className="glass glass-hover grid gap-3 rounded-3xl px-6 py-6 has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink md:grid-cols-[3.5rem_minmax(0,4fr)_minmax(0,5fr)_minmax(0,3fr)] md:items-center md:gap-8"
          >
            <div
              aria-hidden="true"
              className="flex size-14 items-center justify-center rounded-2xl bg-ink text-cream"
            >
              <Icon size={26} strokeWidth={1.75} />
            </div>

            <h3 className="text-2xl font-semibold tracking-tight">
              {/* The ::after covers the whole row, so the full card is the link. */}
              <Link
                href={`/work/${slug}`}
                className="underline-offset-4 after:absolute after:inset-0 after:rounded-3xl after:content-[''] hover:underline focus-visible:outline-none"
              >
                {title}
              </Link>
            </h3>
            <p className="max-w-[48ch] text-slate">{summary}</p>
            <p className="font-mono text-sm text-ink md:text-right">{tech}</p>
          </li>
        );
      })}
    </ul>
  );
}
