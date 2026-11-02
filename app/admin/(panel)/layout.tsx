import Link from "next/link";
import AdminNav from "../_components/AdminNav";
import { logout } from "../actions";

// No auth check here on purpose: layouts do not re-render on navigation.
// Each page calls requireAdmin() instead.

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper md:flex">
      <aside className="bg-ink text-cream md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:overflow-y-auto">
        <div className="flex h-full flex-col px-5 py-6">
          <Link href="/admin" className="text-lg font-bold tracking-tight">
            PHEAROM.DEV
          </Link>
          <p className="text-xs text-cream/60">Admin portal</p>

          <AdminNav />

          <div className="mt-6 space-y-3 text-sm md:mt-auto">
            <Link
              href="/"
              target="_blank"
              className="block px-3 underline underline-offset-4"
            >
              View site
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="w-full rounded-md border border-cream/50 px-3 py-2 text-left"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-6 py-10 md:px-10">
        <div className="max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
