import {
  Cloud,
  Code,
  CreditCard,
  Database,
  GraduationCap,
  Globe,
  Layers,
  Package,
  Server,
  ShoppingBag,
  Smartphone,
  Store,
  Terminal,
  Workflow,
  type LucideIcon,
} from "lucide-react";

// Icons an admin can pick for a project. The key is what is stored in the database.
export const projectIcons = {
  Server,
  ShoppingBag,
  GraduationCap,
  Store,
  CreditCard,
  Database,
  Code,
  Globe,
  Smartphone,
  Cloud,
  Package,
  Workflow,
  Terminal,
  Layers,
} satisfies Record<string, LucideIcon>;

export type ProjectIconKey = keyof typeof projectIcons;

export const projectIconKeys = Object.keys(projectIcons) as ProjectIconKey[];

export function getProjectIcon(key: string): LucideIcon {
  return key in projectIcons
    ? projectIcons[key as ProjectIconKey]
    : projectIcons.Server;
}
