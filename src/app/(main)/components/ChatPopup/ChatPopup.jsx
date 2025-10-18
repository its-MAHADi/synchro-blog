"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ChatPopup({ user, onClose }) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // 🔹 Fetch messages
  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(
          `/api/messages?email=${user.email}&currentUser=${session?.user?.email}`
        );
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Fetch messages error:", err);
      }
    }

    if (session?.user?.email && user?.email) fetchMessages();
  }, [user, session]);

  // 🔹 Send message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageObj = {
      to: user.email,
      from: session?.user?.email,
      message: newMessage,
      time: new Date().toISOString(),
      deleted: false,
    };

    setMessages((prev) => [...prev, messageObj]);
    setNewMessage("");

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageObj),
    });
  };

  // 🔹 Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Delete for everyone
  const deleteMessage = async (msgId) => {
    try {
      await fetch("/api/messagesDelete", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msgId }),
      });

      setMessages((prev) =>
        prev.map((m) => (m._id === msgId ? { ...m, deleted: true } : m))
      );
    } catch (err) {
      console.error("Delete message failed:", err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-20 right-20 w-80 h-[40vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col z-50"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#0000FF] text-white">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                src={user?.image || "https://i.pravatar.cc/100"}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h3 className="text-sm font-semibold">
                {user?.userName || "Unknown"}
              </h3>
              <p className="text-xs text-white/80">Active now</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 rounded-md transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-center text-gray-400 text-sm mt-10">
              No messages yet. Start chatting 👋
            </p>
          ) : (
            messages.map((msg, idx) => {
              const isMine = msg.from === session?.user?.email;
              return (
                <div
                  key={idx}
                  className={`flex ${isMine ? "justify-end" : "justify-start"} items-center`}
                >
                  <div
                    className={`px-3 py-2 max-w-[75%] rounded-2xl text-sm shadow-sm ${
                      isMine
                        ? "bg-[#0000FF] text-white rounded-br-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.deleted ? (
                      <em className="text-gray-400 italic text-sm">
                        This message was deleted
                      </em>
                    ) : (
                      msg.message
                    )}
                  </div>

                  {isMine && !msg.deleted && (
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      X
                    </button>
                  )}
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 py-2 bg-white">
          <input
            type="text"
            placeholder="Aa"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-[#0000FF] hover:bg-[#a3431c] text-white rounded-full transition"
          >
            <Send size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
