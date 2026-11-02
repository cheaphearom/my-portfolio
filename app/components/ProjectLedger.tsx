import Link from "next/link";
import type { ProjectView } from "../lib/content";
import { getProjectIcon } from "../lib/icons";

export default function ProjectLedger({ items }: { items: ProjectView[] }) {
  return (
    <ul className="border-b border-ink/20">
      {items.map(({ slug, title, summary, tech, icon }) => {
        const Icon = getProjectIcon(icon);

        return (
          <li
            key={slug}
            className="grid gap-3 border-t border-ink/20 py-7 md:grid-cols-[3.5rem_minmax(0,4fr)_minmax(0,5fr)_minmax(0,3fr)] md:items-center md:gap-8"
          >
            <div
              aria-hidden="true"
              className="flex size-14 items-center justify-center rounded-md bg-ink text-cream"
            >
              <Icon size={26} strokeWidth={1.75} />
            </div>

            <h3 className="text-2xl font-semibold tracking-tight">
              <Link
                href={`/work/${slug}`}
                className="underline-offset-4 hover:underline"
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
