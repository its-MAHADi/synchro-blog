"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Flag, Megaphone, Settings } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard/admin-dashboard", icon: Home },
  { name: "Manage Users", href: "/dashboard/admin-dashboard/users", icon: Users },
  { name: "Reports", href: "/dashboard/admin-dashboard/reports", icon: Flag },
  { name: "Announcements", href: "/dashboard/admin-dashboard/announcements", icon: Megaphone },
  { name: "Settings", href: "/dashboard/admin-dashboard/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r shadow-md min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-8 text-purple-600">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-purple-500 text-white"
                  : "text-gray-700 hover:bg-purple-100 hover:text-purple-600"
              }`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
