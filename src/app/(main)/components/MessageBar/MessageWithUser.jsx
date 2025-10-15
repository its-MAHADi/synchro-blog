"use client";

import { MoreVertical, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function MessageWithUser({ currentUser }) {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL ||
          (process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000");

        // 🔹 1️⃣ Fetch current logged-in user
        const resUser = await fetch(`${baseUrl}/api/user?email=${currentUser}`);
        const currentUserData = await resUser.json();
        // console.log("Logged-in User:", currentUserData);

        const followingEmails = currentUserData.following || [];

        if (followingEmails.length === 0) {
          setMessages([]);
          setLoading(false);
          return;
        }

        // 🔹 2️⃣ Fetch all following users’ data at once
        const resFollowing = await fetch(
          `${baseUrl}/api/messageUser?emails=${followingEmails.join(",")}`
        );
        const followingUsers = await resFollowing.json();
        // console.log("Following Users:", followingUsers);

        // 🔹 3️⃣ Map them into message-style data
        const messagesData = followingUsers.map((user, idx) => ({
          id: idx + 1,
          sender: user.name || user.userName || "Unknown User",
          senderEmail: user.email,
          message: "Hey! How are you doing today?",
          time: "Just now",
          avatar: user.image || "https://i.pravatar.cc/150?img=12",
          read: false,
        }));

        setMessages(messagesData);
      } catch (err) {
        console.error("Message Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (currentUser) fetchMessages();
  }, [currentUser]);

  // 🔹 Mark as read
  const markAsRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  // 🔹 Filter search
  const filteredMessages = messages.filter(
    (msg) =>
      msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center mt-4">Loading messages...</p>;

  return (
    <div className="bg-white min-h-screen rounded-2xl shadow-md border border-gray-200 p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
        <MoreVertical size={18} className="text-gray-500 cursor-pointer" />
      </div>

      {/* Search Bar */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent space-y-3">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`flex items-start justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                msg.read
                  ? "bg-gray-50 border-gray-100"
                  : "bg-[#e0f7ff] border-[#00aaff25]"
              } hover:shadow-md hover:scale-[1.01]`}
              onClick={() => markAsRead(msg.id)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={msg.image}
                    alt={msg.sender}
                    className="object-cover rounded-full w-10 h-10"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {msg.sender}
                    </h3>
                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{msg.message}</p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-400 mt-8">
            No messages found 💬
          </p>
        )}
      </div>
    </div>
  );
}
