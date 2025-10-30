"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
    FileText,
    Heart,
    MessageCircle,
    Users,
    UserCheck,
    TrendingUp,
} from "lucide-react";
import UserDashboardLoading from "./loading";

export default function UserDashboard() {
    const { data: session, status } = useSession();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const primary = "#0000FF";

    useEffect(() => {
        if (session?.user?.email) {
            const fetchData = async () => {
                try {
                    const res = await fetch(`/api/my-dashboard-data/${session.user.email}`);
                    const data = await res.json();
                    setStats(data);
                } catch (err) {
                    console.error("Error loading dashboard data:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [session]);

    if (status === "loading" || loading) {
        return (
            <><UserDashboardLoading/></>
        );
    }

    if (!session?.user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Please sign in to view your dashboard
                </h2>
                <p className="text-gray-500">Access is restricted to logged-in users.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 md:px-8 py-10">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <Image
                        src={session.user.image || "/default_profile.jpg"}
                        alt="Profile"
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-blue-500 shadow-lg object-cover"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome, <span style={{ color: primary }}>{session.user.name}</span>
                        </h1>
                        <p className="text-gray-500">{session.user.email}</p>
                    </div>
                </div>
                <div className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg font-semibold flex items-center gap-2">
                    <TrendingUp size={20} />
                    Dashboard Overview
                </div>
            </div>

            {/* MAIN STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {[
                    {
                        icon: FileText,
                        label: "Total Posts",
                        value: stats?.total_posts ?? 0,
                    },
                    {
                        icon: Heart,
                        label: "Total Likes",
                        value: stats?.total_likes ?? 0,
                    },
                    {
                        icon: MessageCircle,
                        label: "Total Comments",
                        value: stats?.total_comments ?? 0,
                    },
                    {
                        icon: Users,
                        label: "Total Followers",
                        value: stats?.total_followers ?? 0,
                    },
                    {
                        icon: UserCheck,
                        label: "Total Following",
                        value: stats?.total_following ?? 0,
                    },
                ].map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex items-center justify-between"
                        >
                            <div>
                                <p className="text-sm text-gray-500">{card.label}</p>
                                <h3
                                    className="text-3xl font-bold mt-2"
                                    style={{
                                        color: primary,
                                    }}
                                >
                                    {card.value}
                                </h3>
                            </div>
                            <div
                                className="p-4 rounded-full bg-blue-50"
                                style={{
                                    color: primary,
                                }}
                            >
                                <Icon size={26} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* PROFILE SUMMARY */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Users size={24} style={{ color: primary }} /> Profile Summary
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <p>
                            <span className="font-medium text-gray-700">Name:</span>{" "}
                            {session.user.name || "N/A"}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Email:</span>{" "}
                            {session.user.email}
                        </p>
                    </div>
                    <div className="space-y-3">
                        <p>
                            <span className="font-medium text-gray-700">Followers:</span>{" "}
                            {stats?.total_followers ?? 0}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Following:</span>{" "}
                            {stats?.total_following ?? 0}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
