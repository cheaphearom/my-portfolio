// Default content. It is used (1) as the seed for the database and (2) as the
// fallback when DATABASE_URL is not set, so the site still renders locally.
// Once the database is seeded, edit content from /admin instead of this file.

export const defaultProfile = {
  name: "Phearom",
  headline: "Backend developer",
  about:
    "I have experience building backend APIs, payment integrations, loyalty systems, POS integrations, school management systems, dashboards, and automation workflows. I care about clean structure, performance, reusable code, and real production usage.",
  email: "",
  github: "",
  linkedin: "",
  telegram: "",
  facebook: "",
  instagram: "",
  cvUrl: "",
};

export const defaultProjects = [
  {
    slug: "brown-app-api",
    title: "BROWN App API",
    summary: "Backend API for order flow, loyalty, payment, and app data.",
    description: "",
    tech: "PHP, MySQL, Business Central",
    role: "",
    results: "",
    images: "",
    repoUrl: "",
    liveUrl: "",
    icon: "ShoppingBag",
    sortOrder: 1,
    published: true,
  },
  {
    slug: "school-attendance-system",
    title: "School Attendance System",
    summary: "System for managing students, teachers, classes, and attendance.",
    description: "",
    tech: "Spring Boot, React, MySQL",
    role: "",
    results: "",
    images: "",
    repoUrl: "",
    liveUrl: "",
    icon: "GraduationCap",
    sortOrder: 2,
    published: true,
  },
  {
    slug: "pos-integration",
    title: "POS Integration",
    summary: "Integration between POS, finance process, and backend services.",
    description: "",
    tech: "PHP, SQL Server, LS/BC",
    role: "",
    results: "",
    // Only pos-1.jpg is an actual POS screenshot; pos-2/pos-3 are unrelated images.
    images: "/images/projects/pos-1.jpg",
    repoUrl: "",
    liveUrl: "",
    icon: "Store",
    sortOrder: 3,
    published: true,
  },
  {
    slug: "payment-gateway",
    title: "Payment Gateway",
    summary: "Payment checkout flow with transaction logging and validation.",
    description: "",
    tech: "PHP, ABA PayWay, MySQL",
    role: "",
    results: "",
    images: "",
    repoUrl: "",
    liveUrl: "",
    icon: "CreditCard",
    sortOrder: 4,
    published: true,
  },
];

export const defaultSkills = [
  { label: "Backend", items: "PHP, Laravel, Spring Boot", sortOrder: 1 },
  { label: "Frontend", items: "React, Next.js", sortOrder: 2 },
  { label: "Databases", items: "MySQL, SQL Server", sortOrder: 3 },
  {
    label: "Integrations",
    items: "Payments, loyalty, POS, Business Central",
    sortOrder: 4,
  },
];

// Intentionally empty: real job history and education must come from the owner.
export const defaultExperience: {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string;
  sortOrder: number;
}[] = [];

export const defaultEducation: {
  school: string;
  degree: string;
  startYear: string;
  endYear: string;
  notes: string;
  sortOrder: number;
}[] = [];
