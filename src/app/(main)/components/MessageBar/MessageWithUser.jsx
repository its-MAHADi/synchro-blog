"use client";

import { MoreVertical, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const dummyMessages = [
  {
    id: 1,
    sender: "Mahadi Hasan",
    message: "Hey! Can you check my last post?",
    time: "2m ago",
    avatar: "https://i.pravatar.cc/150?img=5",
    read: false,
  },
  {
    id: 2,
    sender: "Admin",
    message: "Your premium membership has been updated.",
    time: "30m ago",
    avatar: "https://i.pravatar.cc/150?img=11",
    read: false,
  },
  {
    id: 3,
    sender: "Ali Raza",
    message: "Thanks for your help on the project!",
    time: "1h ago",
    avatar: "https://i.pravatar.cc/150?img=9",
    read: true,
  },
  {
    id: 4,
    sender: "Forum Team",
    message: "Weekly forum updates are live now.",
    time: "3h ago",
    avatar: "https://i.pravatar.cc/150?img=2",
    read: true,
  },
];

export default function MessageWithUser() {
  const [messages, setMessages] = useState(dummyMessages);
  const [searchTerm, setSearchTerm] = useState("");

  const markAsRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  // Filter messages based on search term
  const filteredMessages = messages.filter(
    (msg) =>
      msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    src={msg.avatar}
                    alt={msg.sender}
                    className="object-cover rounded-full w-10 h-10"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {msg.sender}
                    </h3>
                    <span className="text-[10px] text-gray-400">
                      {msg.time}
                    </span>
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
