"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Flag,
  Megaphone,
  Settings,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  HomeIcon,
  LayoutDashboardIcon,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard/admin-dashboard", icon: LayoutDashboardIcon, gradient: "from-[#c45627] to-[#a8431f]" },
  { name: "Manage Users", href: "/dashboard/admin-dashboard/users", icon: Users, gradient: "from-[#c45627] to-[#a8431f]" },
  // { name: "Reports", href: "/dashboard/admin-dashboard/reports", icon: Flag, gradient: "from-[#c45627] to-[#a8431f]" },
  { name: "Announcements", href: "/dashboard/admin-dashboard/announcements", icon: Megaphone, gradient: "from-[#c45627] to-[#a8431f]" },
   { name: "Home", href: "/", icon: HomeIcon, gradient: "from-[#c45627] to-[#a8431f]" },
  // { name: "Settings", href: "/dashboard/admin-dashboard/settings", icon: Settings, gradient: "from-[#c45627] to-[#a8431f]" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between p-4 bg-[#c45627] shadow-2xl">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:rotate-6 shadow-lg"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <h2 className="text-xl font-bold text-white drop-shadow-md">Admin Panel</h2>
        <div className="w-12" />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-72 md:w-80 transform transition-all duration-500 ease-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          background: "white",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        {/* Subtle Animated Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(196,86,39,0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(168,67,31,0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(196,86,39,0.3) 0%, transparent 50%)
              `,
            }}
          />
        </div>

        {/* Header */}
        <div className="p-6 border-b border-gray-200 relative flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl border-2 border-[#c45627] flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 relative"
            style={{
              boxShadow: "0 10px 25px rgba(196,86,39,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <ShieldCheck size={28} className="text-[#c45627]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-lime-500 rounded-full animate-pulse shadow-lg" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#c45627] to-[#a8431f] bg-clip-text text-transparent drop-shadow-sm">
              Admin Panel
            </h2>
            <p className="text-sm text-gray-500 font-medium">Manage the entire system</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2 p-6 pt-8 relative">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-2xl scale-105`
                    : "text-gray-700 hover:bg-[#c45627]/10 hover:text-gray-800 hover:shadow-xl"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  boxShadow: isActive
                    ? "0 15px 35px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)"
                    : "0 5px 15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
                onClick={() => setIsOpen(false)}
              >
                {/* Icon */}
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 transform group-hover:rotate-6 relative ${
                    isActive
                      ? "bg-white/25 shadow-inner"
                      : "bg-white/30 group-hover:bg-white/40 shadow-md"
                  }`}
                  style={{
                    boxShadow: isActive
                      ? "inset 0 2px 4px rgba(0,0,0,0.1)"
                      : "0 4px 15px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)",
                  }}
                >
                  <Icon
                    size={20}
                    className={`transition-all duration-300 ${
                      isActive ? "text-white drop-shadow-lg" : "text-gray-600 group-hover:text-[#c45627]"
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`font-semibold flex-1 transition-all duration-300 ${
                    isActive
                      ? "text-white drop-shadow-sm"
                      : "group-hover:text-[#c45627]"
                  }`}
                >
                  {item.name}
                </span>

                {/* Chevron */}
                <div
                  className={`transform transition-all duration-300 ${
                    isActive
                      ? "translate-x-0 opacity-100"
                      : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
                  }`}
                >
                  <ChevronRight size={18} className={isActive ? "text-white/90" : "text-[#c45627]/70"} />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-gradient-to-t from-white/10 to-transparent backdrop-blur-sm">
          <div
            className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm shadow-inner"
            style={{
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <p className="text-sm font-semibold bg-gradient-to-r from-[#c45627] to-[#a8431f] bg-clip-text text-transparent">
              Admin Dashboard
            </p>
            <p className="text-xs text-gray-500 font-medium mt-1">v2.0.0 • Secure Edition</p>
          </div>
        </div>
      </aside>
    </>
  );
}
