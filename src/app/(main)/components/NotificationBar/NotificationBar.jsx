"use client";
import { useEffect, useState } from "react";
import { Bell, Heart, UserCheck, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NotificationBar() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

  // 🔔 Fetch notifications
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/notification?email=${session.user.email}`);
        const data = await res.json();
        if (data.success) setNotifications(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, [session]);

  // 🔔 Click: mark read + navigate
  const handleNotificationClick = async (noti) => {
    try {
      if (!noti.read) {
        await fetch(`/api/notification?notificationId=${noti._id}`, { method: "PATCH" });
        setNotifications((prev) =>
          prev.map((n) => (n._id === noti._id ? { ...n, read: true } : n))
        );
      }

      if (noti.type === "follow") router.push(`/view-profile/${noti.senderEmail}`);
      else if ((noti.type === "like" || noti.type === "comment") && noti.postId) {
        router.push(`/post/${noti.postId}`); // 🔑 Navigate to the post
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatTime = (time) => {
    const diff = Date.now() - new Date(time);
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "comment":
        return { icon: <MessageSquare size={18} />, bg: "bg-blue-100", color: "text-blue-600" };
      case "like":
        return { icon: <Heart size={18} />, bg: "bg-pink-100", color: "text-pink-600" };
      case "follow":
        return { icon: <UserCheck size={18} />, bg: "bg-green-100", color: "text-green-600" };
      default:
        return { icon: <Bell size={18} />, bg: "bg-gray-100", color: "text-gray-600" };
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 flex flex-col min-h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bell size={20} />
          Notifications
          {unreadCount > 0 && (
            <span className="ml-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </h2>
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((noti) => {
            const { icon, bg, color } = getTypeIcon(noti.type);
            return (
              <motion.div
                key={noti._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start justify-between p-3 rounded-xl cursor-pointer border ${noti.read ? "bg-gray-50" : "bg-[#fff5f0]"} hover:shadow-md`}
                onClick={() => handleNotificationClick(noti)}
              >
                <div className="flex items-start gap-3 w-full">
                  <img src="/default_profile.jpg" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{noti.message}</p>
                    <small className="text-xs text-gray-500">{formatTime(noti.createdAt)}</small>
                  </div>
                </div>
                <div className={`p-2 rounded-full ml-2 ${bg} ${color}`}>{icon}</div>
              </motion.div>
            );
          })
        ) : (
          <p className="text-center text-sm text-gray-400 mt-8">No notifications yet 🔕</p>
        )}
      </div>
    </div>
  );
}
