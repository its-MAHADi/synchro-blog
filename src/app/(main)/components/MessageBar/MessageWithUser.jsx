"use client";

import { MoreVertical, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ChatPopup from "../ChatPopup/ChatPopup";
import { useMessage } from "@/app/contexts/MessageContext";
import { useChatPopup } from "@/app/contexts/ChatsContext";

export default function MessageWithUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const { closeMessageBar } = useMessage();
  const { openPopupUser, openPopup, closePopup } = useChatPopup();

  const handleUserClick = (user) => {
    openPopup(user);      // popup open
    // closeMessageBar();    // message bar auto close
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/messageUser");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Message User Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.userName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center mt-4">Loading chats...</p>;

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
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent space-y-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => handleUserClick(user)}
              className="flex items-start justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 border border-gray-300 bg-gray-50 hover:shadow-md hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3 w-full">
                <img
                  src={user.image || "https://i.pravatar.cc/150?img=12"}
                  alt={user.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {user.userName}
                  </h3>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-400 mt-8">
            No following users found 💬
          </p>
        )}
      </div>
      
      <div>
        {openPopupUser && (
          <ChatPopup
            user={openPopupUser}
            onClose={closePopup}
          />
        )}
      </div>

    </div>
  );
}
