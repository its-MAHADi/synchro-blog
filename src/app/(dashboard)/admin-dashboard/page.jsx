"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  FileText,
  MessageSquare,
  BarChart2,
  UserCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import AdminDashboardLoading from "./loading";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    total_users: 0,
    total_posts: 0,
    total_comments: 0,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Redirect if not admin
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [status, session, router]);

  // ✅ Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [adminRes, userRes] = await Promise.all([
          fetch("/api/admin-dashboard-data"),
          fetch("/api/users"),
        ]);

        if (!adminRes.ok) throw new Error("Failed to fetch admin data");

        const adminData = await adminRes.json();
        const userData = await userRes.json();

        setStats(adminData);
        setUsers(Array.isArray(userData) ? userData.slice(0, 5) : []);
      } catch (err) {
        // console.error(err);
        setError("Failed to load admin dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") fetchDashboardData();
  }, [status]);

  if (loading || status === "loading") {
    return (
      <div>
        <AdminDashboardLoading/>
      </div>
    );
  }

  if (!session || session?.user?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-500">Only admins can view this page.</p>
      </div>
    );
  }

  const adminName = session?.user?.name || "Admin";

  const statCards = [
    {
      id: 1,
      label: "Total Users",
      value: stats.total_users,
      icon: Users,
      color: "#0000FF",
    },
    {
      id: 2,
      label: "Total Posts",
      value: stats.total_posts,
      icon: FileText,
      color: "#0000FF",
    },
    {
      id: 3,
      label: "Total Comments",
      value: stats.total_comments,
      icon: MessageSquare,
      color: "#0000FF",
    },
  ];

  const chartData = [
    { name: "Users", value: stats.total_users },
    { name: "Posts", value: stats.total_posts },
    { name: "Comments", value: stats.total_comments },
  ];

  return (
    <div className="p-6 space-y-8 my-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Welcome back, {adminName}
          </h1>
          <p className="text-gray-500 mt-1">
            Platform statistics and recent insights
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0000FF] text-white font-semibold shadow-lg hover:scale-105 transform transition">
            Export Report
          </button>
          <div className="p-3 rounded-lg bg-white shadow-md">
            <span className="text-sm text-gray-600">v3.0.0</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}20 0%, ${stat.color}10 100%)`,
                    }}
                  >
                    <Icon size={22} className="text-[#0000FF]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart + Users */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Platform Statistics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0000FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-500 mt-4">
            Real-time overview of total users, posts, and comments.
          </p>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Users
            </h3>
            <button className="text-sm text-[#0000FF] font-semibold hover:underline">
              View all
            </button>
          </div>

          <ul className="space-y-3 flex-1 overflow-auto pr-2">
            {users.length > 0 ? (
              users.map((u, i) => (
                <li
                  key={u._id || i}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  {u.image ? (
                    <img
                      src={u.image}
                      alt={u.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <UserCircle className="w-10 h-10 text-gray-400" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {u.name || "Unnamed User"}
                    </p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No users found.</p>
            )}
          </ul>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-600 rounded-lg p-3 text-center mt-4">
          {error}
        </div>
      )}
    </div>
  );
}
