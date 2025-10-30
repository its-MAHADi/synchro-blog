"use client";

import { MoreVertical, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ChatPopup from "../ChatPopup/ChatPopup";
import { useMessage } from "@/app/contexts/MessageContext";
import { useChatPopup } from "@/app/contexts/ChatsContext";
import { useSession } from "next-auth/react";
import MassageLoading from "./MassageLoading";

export default function MessageWithUser() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [recentMessages, setRecentMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);


  const { openPopupUser, openPopup, closePopup } = useChatPopup();

  const handleUserClick = (user) => {
    openPopup(user);
  };

  // Fetch users
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

  // Fetch recent message for each user
  useEffect(() => {
    async function fetchRecentMessages() {
      if (!session?.user?.email) return;

      const messagesObj = {};
      for (let user of users) {
        try {
          const res = await fetch(
            `/api/messages?email=${user.email}&currentUser=${session.user.email}`
          );
          const msgs = await res.json();
          const lastMessage = msgs.length > 0 ? msgs[msgs.length - 1].message : "";
          messagesObj[user.email] = lastMessage;
        } catch (err) {
          console.error("Recent message fetch error:", err);
        }
      }
      setRecentMessages(messagesObj);
    }

    fetchRecentMessages();
  }, [users, session]);

  const filteredUsers = users.filter((user) =>
    user.userName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <><MassageLoading/></>

  return (
    <div className="bg-white min-h-screen rounded-2xl shadow-md border border-gray-300 p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
        <MoreVertical size={18} className="text-gray-500 cursor-pointer" />
      </div>

      {/* Search Bar */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-3 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              className="flex items-start justify-between p-3 rounded-xl cursor-pointer transition-all duration-300  bg-gray-50 hover:shadow-md hover:scale-[1.01]"
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
                  <p className="text-xs text-gray-500">
                    {recentMessages[user.email] || "No messages"}
                  </p>
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

      {/* Chat Popup */}
      {openPopupUser && (
        <ChatPopup user={openPopupUser} onClose={closePopup} />
      )}
    </div>
  );
}
