"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, FilePlus, List, CreditCard, Menu, X, ChevronRight, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";

const navItems = [
    { name: "Dashboard", href: "/user-dashboard", icon: Home, gradient: "from-amber-500 to-[#c45627]" },
    { name: "My Profile", href: "/user-dashboard/profile", icon: User, gradient: "from-amber-500 to-[#c45627]" },
    { name: "My Posts", href: "/user-dashboard/posts/my-posts", icon: List, gradient: "from-amber-500 to-[#c45627]" },
    // { name: "Add Post", href: "/user-dashboard/posts/add-posts", icon: FilePlus, gradient: "from-amber-500 to-[#c45627]" },
    { name: "Add Event", href: "/user-dashboard/events/add-events", icon: FilePlus, gradient: "from-amber-500 to-[#c45627]" },
    { name: "Membership", href: "/user-dashboard/membership", icon: CreditCard, gradient: "from-amber-500 to-[#c45627]" },
];



export default function UserSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession();
      console.log(session?.user?.image, status)
      console.log(session?.user?.image)

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close sidebar when route changes on mobile
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Mobile Overlay with blur effect */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Header with 3D effect */}
            <div className="md:hidden sticky top-0 z-30 flex items-center justify-between p-4 bg-amber-600 shadow-2xl">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-xl"
                    style={{
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 15px rgba(0,0,0,0.2)'
                    }}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
                <div className="relative flex items-center gap-2">
                    <Sparkles size={20} className="text-yellow-300 animate-pulse" />
                    <h2 className="text-xl font-bold text-white drop-shadow-lg">User Panel</h2>
                </div>
                <div className="w-12 h-12" />
            </div>

            {/* 3D Glassmorphism Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 h-screen w-72 md:w-80 transform transition-all duration-500 ease-out z-50 
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
                        style={{
                            background: 'white',
                            backdropFilter: 'blur(20px)',
                            borderRight: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                        }}
                    >
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `
                                    radial-gradient(circle at 20% 20%, rgba(120,119,198,0.3) 0%, transparent 50%),
                                    radial-gradient(circle at 80% 80%, rgba(255,119,198,0.3) 0%, transparent 50%),
                                    radial-gradient(circle at 40% 60%, rgba(119,255,198,0.3) 0%, transparent 50%)
                                `
                            }} />
                        </div>

                {/* Desktop Header with 3D effect */}
                <div className="hidden md:block p-6 border-b border-gray-200 relative">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-2xl border-2 border-[#c45627] flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 relative"
                            style={{
                                boxShadow: '0 10px 25px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                            }}
                        >
                            {
                                session?.user?.image ?
                                    <div>

                                        <img className="w-10 h-10 rounded-full" src={session?.user?.image} alt="userImage" />

                                    </div>
                                    :
                                    <FaUserCircle size={30} />
                            }
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-lime-500 rounded-full animate-pulse shadow-lg" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent drop-shadow-sm"> {session?.user?.name}</h2>
                            <p className="text-sm text-gray-500 font-medium">Manage your writings digitally</p>
                        </div>
                    </div>
                </div>

                {/* Mobile Header inside sidebar with enhanced 3D */}
                <div className="md:hidden p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-white/10 relative">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl transform transition-all duration-300 relative"
                            style={{
                                boxShadow: '0 15px 35px rgba(124,58,237,0.5), inset 0 2px 0 rgba(255,255,255,0.3)'
                            }}
                        >
                            <User size={28} className="text-white drop-shadow-lg" />
                            <div className="absolute -top-1 -right-2 w-4 h-4 bg-lime-500 rounded-full  shadow-lg" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent drop-shadow-sm">User Panel</h2>
                            <p className="text-sm text-gray-500 font-medium">Manage your digital world</p>
                        </div>
                    </div>
                </div>

                {/* 3D Navigation */}
                <nav className="flex flex-col gap-2 p-6 pt-8 relative">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${isActive
                                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-2xl scale-105`
                                    : "text-gray-700 hover:bg-white/20 hover:text-gray-800 hover:shadow-xl"
                                    }`}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    boxShadow: isActive
                                        ? '0 15px 35px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
                                        : '0 5px 15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)'
                                }}
                                onClick={() => setIsOpen(false)}
                            >
                                {/* 3D Icon Container */}
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 transform group-hover:rotate-6 relative ${isActive
                                        ? "bg-white/25 shadow-inner"
                                        : "bg-white/30 group-hover:bg-white/40 shadow-md"
                                        }`}
                                    style={{
                                        boxShadow: isActive
                                            ? 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                            : '0 4px 15px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)'
                                    }}
                                >
                                    <Icon
                                        size={20}
                                        className={`transition-all duration-300 ${isActive ? "text-white drop-shadow-lg" : "text-gray-600 group-hover:text-gray-800"
                                            }`}
                                    />
                                </div>

                                {/* Label with gradient */}
                                <span className={`font-semibold flex-1 transition-all duration-300 ${isActive
                                    ? "text-white drop-shadow-sm"
                                    : "group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 group-hover:bg-clip-text group-hover:text-transparent"
                                    }`}>
                                    {item.name}
                                </span>

                                {/* 3D Chevron */}
                                <div className={`transform transition-all duration-300 ${isActive ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
                                    }`}>
                                    <ChevronRight size={18} className={isActive ? "text-white/90" : "text-gray-500"} />
                                </div>

                                {/* Floating particles for active state */}
                                {isActive && (
                                    <>
                                        <div className="absolute top-2 right-4 w-1 h-1 bg-white/60 rounded-full animate-ping" />
                                        <div className="absolute bottom-3 right-6 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                                    </>
                                )}

                                {/* Hover glow effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/10 transition-all duration-300" />
                            </Link>
                        );
                    })}
                </nav>

                {/* 3D Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-gradient-to-t from-white/10 to-transparent backdrop-blur-sm">
                    <div
                        className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm shadow-inner"
                        style={{
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.2)'
                        }}
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg" />
                            <p className="text-sm font-semibold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">User Dashboard</p>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">v2.0.0 • Premium Edition</p>
                    </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-20 right-4 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }} />
                <div className="absolute top-32 right-8 w-2 h-2 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-44 right-6 w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-40 animate-ping" style={{ animationDelay: '3s' }} />
            </aside>
        </>
    );
}