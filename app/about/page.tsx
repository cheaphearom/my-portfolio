import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#2b2118] px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm text-[#8b5e34]">
          ← Back Home
        </Link>

        <h1 className="text-5xl font-bold mt-8 mb-6">About Me</h1>

        <p className="text-lg text-[#6b5a4a] leading-8">
          Hi, I’m Brn, a backend developer focused on building APIs, mobile app
          systems, POS integrations, dashboards, and automation workflows.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-[#efe7dc] p-6 rounded-3xl">
            <h2 className="text-2xl font-bold mb-3">Skills</h2>
            <p>PHP, Laravel, Spring Boot, React, Next.js, MySQL, SQL Server</p>
          </div>

          <div className="bg-[#efe7dc] p-6 rounded-3xl">
            <h2 className="text-2xl font-bold mb-3">Experience</h2>
            <p>
              API development, payment integration, loyalty systems, and POS
              integration.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}