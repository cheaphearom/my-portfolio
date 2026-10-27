import {
  CreditCard,
  GraduationCap,
  ShoppingBag,
  Store,
  type LucideIcon,
} from "lucide-react";

export type Project = {
  title: string;
  description: string;
  tech: string;
  icon: LucideIcon;
};

export const projects: Project[] = [
  {
    title: "BROWN App API",
    description: "Backend API for order flow, loyalty, payment, and app data.",
    tech: "PHP, MySQL, Business Central",
    icon: ShoppingBag,
  },
  {
    title: "School Attendance System",
    description:
      "System for managing students, teachers, classes, and attendance.",
    tech: "Spring Boot, React, MySQL",
    icon: GraduationCap,
  },
  {
    title: "POS Integration",
    description:
      "Integration between POS, finance process, and backend services.",
    tech: "PHP, SQL Server, LS/BC",
    icon: Store,
  },
  {
    title: "Payment Gateway",
    description:
      "Payment checkout flow with transaction logging and validation.",
    tech: "PHP, ABA PayWay, MySQL",
    icon: CreditCard,
  },
];

export const skills = [
  { label: "Backend", items: "PHP, Laravel, Spring Boot" },
  { label: "Frontend", items: "React, Next.js" },
  { label: "Databases", items: "MySQL, SQL Server" },
  {
    label: "Integrations",
    items: "Payments, loyalty, POS, Business Central",
  },
];
