export interface ChildItem {
  id?: number | string;
  name: string;
  icon?: LucideIcon;
  items?: ChildItem[];
  item?: unknown;
  url?: string;
  color?: string;
  disabled?: boolean;
  subtitle?: string;
  badge?: boolean;
  badgeType?: string;
  badgeContent?: string;
  isActive?: boolean;
  external?: boolean;
  isPro?: boolean;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: LucideIcon;
  id?: number;
  to?: string;
  item?: MenuItem[];
  items?: ChildItem[];
  url?: string;
  disabled?: boolean;
  subtitle?: string;
  badgeType?: string;
  badge?: boolean;
  badgeContent?: string;
  isActive?: boolean;
  isPro?: boolean;
}

import { uniqueId } from "lodash";

import { type LucideIcon, House, Newspaper } from "lucide-react";

const SidebarContent: MenuItem[] = [
  {
    heading: "Dashboard",
    items: [
      {
        id: uniqueId(),
        name: "Home",
        icon: House,
        url: "/admin/home",
      },
      {
        id: uniqueId(),
        name: "News",
        icon: Newspaper,
        url: "/admin/news",
      },
    ],
  },
  //   {
  //     heading: "Pages",
  //     items: [
  //       {
  //         id: uniqueId(),
  //         name: "Table",
  //         icon: Table2,
  //         url: "/pages/tables",
  //       },
  //       {
  //         id: uniqueId(),
  //         name: "Form",
  //         icon: Form,
  //         url: "/pages/form",
  //       },
  //       {
  //         id: uniqueId(),
  //         name: "User Profile",
  //         icon: CircleUserRound,
  //         url: "/pages/user-profile",
  //       },
  //     ],
  //   },
];

export default SidebarContent;
