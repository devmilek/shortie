import { Home, Link2, PieChart } from "lucide-react";

export const SidebarNavItems = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/app/dashboard",
    isPro: false,
  },
  {
    label: "Statistics",
    icon: PieChart,
    href: "/app/statistics",
    isPro: true,
  },
  {
    label: "Links",
    icon: Link2,
    href: "/app/links",
    isPro: false,
  },
];
