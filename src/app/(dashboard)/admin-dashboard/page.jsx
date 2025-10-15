"use client";

import React from "react";
import { Users, FileText, BarChart2, Settings } from "lucide-react";

/**
 * Admin Dashboard (polished + animated)
 * Primary color: #c45627
 */
export default function AdminDashboard() {
  // demo numbers
  const stats = [
    { id: 1, label: "Total Users", value: "1,245", icon: Users, color: "#c45627", pct: 72 },
    { id: 2, label: "Total Posts", value: "320", icon: FileText, color: "#c45627", pct: 54 },
    { id: 3, label: "Engagement", value: "98%", icon: BarChart2, color: "#c45627", pct: 98 },
    { id: 4, label: "Pending Tasks", value: "12", icon: Settings, color: "#c45627", pct: 30 },
  ];

  const recent = [
    { text: "New user Mahadi Hasan joined the platform", time: "2m ago" },
    { text: 'Published "Next.js Performance Tips"', time: "1h ago" },
    { text: "Updated roles and permissions", time: "3h ago" },
    { text: "Generated weekly analytics report", time: "1d ago" },
  ];

  return (
    <div className="p-6 space-y-8 my-20">
      {/* small inline keyframes for progress animation */}
      <style>{`
        @keyframes grow {
          from { width: 0%; }
          to { width: var(--pct); }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Welcome back, Mahadi Hasan</h1>
          <p className="text-gray-500 mt-1">Overview of platform activity and recent events</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c45627] text-white font-semibold shadow-lg hover:scale-105 transform transition"
            aria-label="Create report"
          >
            Create Report
          </button>
          <div className="p-3 rounded-lg bg-white shadow-md">
            <span className="text-sm text-gray-600">v2.0.0</span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${s.color}20 0%, ${s.color}10 100%)`,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
                    }}
                  >
                    <Icon size={20} className="text-[#c45627] animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{s.label}</p>
                    <p className="text-xl font-bold text-gray-900">{s.value}</p>
                  </div>
                </div>

                {/* small badge */}
                <div className="text-sm px-2 py-1 rounded-full bg-[#c45627]/10 text-[#c45627] font-semibold">
                  {s.pct}%
                </div>
              </div>

              {/* animated progress bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${s.color}, #a8431f)`,
                      width: `${s.pct}%`,
                      animation: `grow 1.2s ease forwards`,
                      // custom property used by keyframes
                      // for safety, also set width inline
                      "--pct": `${s.pct}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">Progress toward monthly goal</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large chart-ish card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User growth (demo)</h3>
            <div className="text-sm text-gray-500">Last 30 days</div>
          </div>

          {/* mini sparkline bars */}
          <div className="flex items-end gap-2 h-40">
            {[30, 40, 55, 70, 60, 80, 95, 75, 85, 100, 90].map((val, idx) => (
              <div
                key={idx}
                className="flex-1 bg-[#c45627]/20 rounded-t-md transition-all transform hover:scale-y-105 origin-bottom"
                style={{
                  height: `${(val / 100) * 100}%`,
                  boxShadow: "inset 0 -2px 8px rgba(0,0,0,0.05)",
                }}
                title={`${val}%`}
              />
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-4">
            This mini visualization is a demo. Replace with a real chart (Recharts, Chart.js, or similar) for production analytics.
          </p>
        </div>

        {/* Recent activity & quick actions */}
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent activity</h3>
            <button className="text-sm text-[#c45627] font-semibold hover:underline">See all</button>
          </div>

          <ul className="space-y-3 flex-1 overflow-auto pr-2">
            {recent.map((r, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#c45627]/10 text-[#c45627] font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{r.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{r.time}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#c45627] text-[#c45627] hover:bg-[#c45627] hover:text-white transition">
              Create Announcement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
