"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Swal from "sweetalert2";
import {
    Home,
    FileText,
    Users,
    LogOut,
    Menu,
    X,
    ArrowLeft,
    BookCopy
} from "lucide-react";

export default function Sidebar() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const UserLinks = [
        { name: "Dashboard", href: "/user-dashboard", icon: Home },
        { name: "Add Posts", href: "/add-posts", icon: FileText },
        { name: "My Posts", href: "/my-posts", icon: BookCopy },
        { name: "My Profile", href: "/profile", icon: Users },
    ];

    const AdminLinks = [
        { name: "Admin Dashboard", href: "/admin-dashboard", icon: Home },
        { name: "Add Posts", href: "/add-posts", icon: FileText },
        { name: "My Posts", href: "/my-posts", icon: BookCopy },
        { name: "My Profile", href: "/profile", icon: Users },
    ];

    const role = session?.user?.role;
    const links = role === "admin" ? AdminLinks : UserLinks;

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            await signOut({ redirect: false });
            router.push("/");
            await Swal.fire({
                title: "Logged out!",
                text: "You have been logged out successfully.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
            >
                <div className="flex items-center justify-between h-[73px] px-6 border-b border-gray-200">
                    <h3 className="font-bold text-xl text-[#213943]">
                        SYN<span className="text-[#0000FF]">CHRO</span>
                    </h3>
                    <button
                        className="md:hidden text-gray-500 hover:text-gray-800"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 flex flex-col justify-between min-h-[calc(100vh-73px)]">
                    <div>
                        <h3 className="text-xs uppercase font-bold text-gray-400 mb-2 px-3">
                            Main Menu
                        </h3>
                        <div className="space-y-1">
                            {status === "loading" ? (
                                <div className="animate-pulse space-y-2 p-2">
                                    <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
                                    <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
                                    <div className="h-8 bg-gray-200 rounded-lg w-2/3"></div>
                                </div>
                            ) : (
                                <nav className="space-y-1">
                                    {links.map((link) => {
                                        const isActive = pathname === link.href;
                                        const Icon = link.icon;
                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-150 ${isActive
                                                        ? "bg-[#0000FF] text-white font-medium shadow-sm"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                    }`}
                                            >
                                                <Icon size={20} />
                                                <span>{link.name}</span>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            )}
                        </div>
                    </div>

                    {/* Bottom buttons */}
                    <div className="flex flex-col gap-2 border-t border-gray-200 pt-4">
                        <Link
                            href="/"
                            className="btn btn-outline rounded-xl border-[#0000FF] text-[#0000FF] hover:bg-[#0000FF] hover:text-white w-full flex items-center justify-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            <span>Back to home</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="btn btn-outline btn-error w-full rounded-xl hover:text-white flex items-center justify-center gap-2"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Mobile Hamburger Button */}
            {!isOpen && (
                <button
                    className="fixed top-4 left-4 z-30 md:hidden bg-white p-2 rounded-full shadow-lg text-gray-800 hover:bg-gray-100 transition"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu size={24} />
                </button>
            )}
        </>
    );
}
