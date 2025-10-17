"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

export default function ChatPopup({ user, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(`/api/messages?email=${user.email}`);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Fetch messages error:", err);
      }
    }
    fetchMessages();
  }, [user]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageObj = {
      to: user.email,
      message: newMessage,
      time: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, messageObj]);
    setNewMessage("");

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageObj),
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-20 right-20  h-[50vh] w-80 bg-white/90 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#e2652fd2] text-white">
          <div className="flex items-center gap-2">
            <img
              src={user?.image || "https://i.pravatar.cc/100"}
              alt="avatar"
              className="w-8 h-8 rounded-full border border-white/40"
            />
            <h3 className="font-semibold text-sm">{user?.userName || "Unknown"}</h3>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 rounded-md transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 h-64 bg-white">
          {messages.length === 0 ? (
            <p className="text-center text-gray-400 text-sm mt-10">
              No messages yet. Start the conversation 👋
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] p-2 rounded-xl text-sm break-words ${
                  msg.to === user.email
                    ? "bg-[#c45627] text-white ml-auto"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.message}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 py-2  bg-white">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border border-[#c4562759] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#c45627]"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-[#c45627] hover:bg-blue-600 text-white rounded-xl transition"
          >
            <Send size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
