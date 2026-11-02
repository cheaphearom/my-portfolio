import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

// A floating glass pill that stays at the top while scrolling.
export default function SiteNav() {
  return (
    <nav aria-label="Main" className="sticky top-3 z-50 px-3 pt-3 sm:top-4 sm:px-4 sm:pt-4">
      <div className="glass mx-auto flex max-w-5xl items-center justify-between rounded-full py-2 pl-4 pr-2 sm:py-2.5 sm:pl-6 sm:pr-3">
        <Link href="/" className="text-base font-bold tracking-tight sm:text-lg">
          PHEAROM.DEV
        </Link>

        <ul className="flex items-center gap-0.5 text-sm font-medium sm:gap-1 sm:text-[0.95rem]">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-full px-2.5 py-2 hover:bg-white/70 sm:px-4"
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
