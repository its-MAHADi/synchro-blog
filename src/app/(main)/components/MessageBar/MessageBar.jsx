"use client";
import { useSession } from "next-auth/react";
import React, { useState, useRef, useEffect } from "react";
import { IoIosSend } from "react-icons/io";

const MessageBar = () => {
  const { data: session } = useSession();
  const user_image = session?.user?.image || "/defult_profile.jpg";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI assistant. Ask me about blog post ideas, the AI blog website, or future plans.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);
  const primaryColor = "#0000FF";

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Send message to API
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();
      const aiMessage = {
        role: "assistant",
        content: data.reply || "Sorry, no reply from AI.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Could not get AI response." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Single message bubble
  const Message = ({ msg }) => {
    const isUser = msg.role === "user";
    return (
      <div className={`flex mb-5 ${isUser ? "justify-end" : "justify-start"}`}>
        {/* Assistant avatar */}
        {!isUser && (
          <div className="flex w-8">
            <img className="w-full h-8 rounded-full mr-2 flex-shrink-0 self-start" src="/main_logo.png" alt="ai" />
            <h2 className="text-xs mt-1 font-bold">SYNCHRO</h2>
          </div>

        )}

        {/* Message bubble */}
        <div
          className={`mx-2 px-4 py-2 mt-8 border border-gray-300 rounded-2xl max-w-xs md:max-w-md ${isUser
            ? "text-white rounded-br-none"
            : "text-gray-800 rounded-bl-none"
            }`}
          style={{ backgroundColor: isUser ? primaryColor : "#f0f0f0" }}
        >
          {msg.content}
        </div>

        {/* User avatar */}
        {isUser && (
          <img
            src={user_image}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
      </div>
    );
  };

  // Typing indicator
  const Typing = () => (
    <div className="flex items-end mb-3">
      <img className="w-8 h-8 rounded-full mr-2 flex-shrink-0 self-start" src="/main_logo.png" alt="ai" />
      <div className="px-4 py-2 rounded-2xl bg-gray-100 rounded-bl-none flex gap-1">
        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col max-w-2xl mx-auto h-[50vh] rounded-2xl shadow-lg bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 flex items-center">
        <img src="/main_logo.png" className="w-10 h-10 rounded-full" alt="ai-assistant" />
        <div className="ml-3">
          <h2 className="font-bold text-md text-gray-800">SYNCHRO</h2>
          <p className="text-sm text-green-500 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>{" "}
            Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatRef} className="flex-1 p-4 overflow-y-auto bg-orange-50">
        {messages.map((m, i) => (
          <Message key={i} msg={m} />
        ))}
        {isLoading && <Typing />}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 flex gap-3 bg-gray-50">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none "
          style={{ borderColor: primaryColor }}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="text-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: primaryColor }}
        >
          <IoIosSend size={22} />
        </button>
      </div>
    </div>
  );
};

export default MessageBar;
