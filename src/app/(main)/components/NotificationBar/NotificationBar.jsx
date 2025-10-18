"use client";

import { Bell, MoreVertical, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
// import Image from "next/image";

const dummyNotifications = [
  {
    id: 1,
    title: "New comment on your post",
    message: "Mahadi Hasan commented: “Awesome project bro!”",
    time: "2m ago",
    type: "comment",
    read: false,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 2,
    title: "Membership Activated",
    message: "Congrats! Your premium membership is now active 🎉",
    time: "30m ago",
    type: "success",
    read: false,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 3,
    title: "Post Reported",
    message: "Your post ‘Next.js Guide’ has been reported for review.",
    time: "1h ago",
    type: "warning",
    read: true,
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 4,
    title: "New Announcement",
    message: "Admin published: ‘Weekly Forum Updates’",
    time: "3h ago",
    type: "info",
    read: true,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 5,
    title: "Badge Unlocked",
    message: "You earned the ‘Helpful Member’ badge 🏅",
    time: "6h ago",
    type: "success",
    read: true,
    avatar: "https://i.pravatar.cc/150?img=7",
  },
];

export default function NotificationBar() {
  const [notifications, setNotifications] = useState(dummyNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="bg-white min-h-screen rounded-2xl shadow-md border border-gray-200 p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Bell className="text-[#0000FF]" size={20} />
          Notifications
        </h2>
        <MoreVertical size={18} className="text-gray-500 cursor-pointer" />
      </div>

      {/* Notification List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent space-y-3">
        {notifications.map((noti) => (
          <motion.div
            key={noti.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`flex items-start justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
              noti.read
                ? "bg-gray-50 border-gray-100"
                : "bg-[#fff5f0] border-[#0000FF25]"
            } hover:shadow-md hover:scale-[1.01]`}
            onClick={() => markAsRead(noti.id)}
          >
            {/* Left Part: Avatar + Icon + Text */}
            <div className="flex items-start gap-3 w-full">
              {/* Avatar */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={noti.avatar}
                  alt={noti.title}
                  className="object-cover rounded-full w-10 h-10"
                />
              </div>

              {/* Message Section */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {noti.title}
                  </h3>
                  <span className="text-[10px] text-gray-400">{noti.time}</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{noti.message}</p>
              </div>
            </div>

            {/* Type Icon */}
            <div
              className={`p-2 rounded-full ml-2 ${
                noti.type === "success"
                  ? "bg-green-100 text-green-600"
                  : noti.type === "warning"
                  ? "bg-red-100 text-red-600"
                  : "bg-[#0000FF20] text-[#0000FF]"
              }`}
            >
              {noti.type === "success" ? (
                <CheckCircle size={18} />
              ) : noti.type === "warning" ? (
                <AlertCircle size={18} />
              ) : (
                <Bell size={18} />
              )}
            </div>
          </motion.div>
        ))}

        {notifications.length === 0 && (
          <p className="text-center text-sm text-gray-400 mt-8">
            No notifications 🔕
          </p>
        )}
      </div>
    </div>
  );
}
