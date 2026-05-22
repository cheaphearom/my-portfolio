import Link from "next/link";

type Project = {
  title: string;
  description: string;
  tech: string;
};

const projects: Project[] = [
  {
    title: "BROWN App API",
    description: "Backend API for order flow, loyalty, payment, and app data.",
    tech: "PHP, MySQL, Business Central",
  },
  {
    title: "School Attendance System",
    description: "System for managing students, teachers, classes, and attendance.",
    tech: "Spring Boot, React, MySQL",
  },
  {
    title: "POS Integration",
    description: "Integration between POS, finance process, and backend services.",
    tech: "PHP, SQL Server, LS/BC",
  },
  {
    title: "Payment Gateway",
    description: "Payment checkout flow with transaction logging and validation.",
    tech: "PHP, ABA PayWay, MySQL",
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#2b2118] px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-sm text-[#8b5e34]">
          ← Back Home
        </Link>

        <h1 className="text-5xl font-bold mt-8 mb-10">My Work</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="bg-[#efe7dc] p-8 rounded-3xl">
              <h2 className="text-2xl font-bold">{project.title}</h2>

              <p className="mt-3 text-[#6b5a4a]">
                {project.description}
              </p>

              <p className="mt-5 text-sm font-semibold text-[#8b5e34]">
                {project.tech}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}