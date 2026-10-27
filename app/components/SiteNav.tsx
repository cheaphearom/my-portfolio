import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav({ onDark = false }: { onDark?: boolean }) {
  return (
    <nav
      aria-label="Main"
      className={onDark ? "text-cream" : "text-ink"}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          BRN.DEV
        </Link>

        <ul className="flex gap-7 text-[0.95rem] font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
