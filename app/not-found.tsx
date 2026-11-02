import Link from "next/link";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-24">
          <div className="glass rounded-3xl p-8 md:p-12">
            <p className="font-mono text-sm text-slate">HTTP 404</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              Page not found.
            </h1>
            <p className="mt-4 text-lg text-slate">
              It works on my machine, but this page does not exist anywhere.
            </p>
            <Link
              href="/"
              className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-cream"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
