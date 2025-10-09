"use client";

import { useState } from "react";
import { Search, Circle, MessageSquare, MoreVertical } from "lucide-react";


const dummyChats = [
  {
    id: 1,
    name: "Mahadi Hasan",
    img: "https://i.pravatar.cc/150?img=1",
    message: "Hey! How’s your project going?",
    time: "2m",
    active: true,
  },
  {
    id: 2,
    name: "Ariyan Chowdhury",
    img: "https://i.pravatar.cc/150?img=5",
    message: "Let’s play eFootball tonight ⚽",
    time: "10m",
    active: true,
  },
  {
    id: 3,
    name: "Sadia Noor",
    img: "https://i.pravatar.cc/150?img=6",
    message: "I’ll send the files soon!",
    time: "1h",
    active: false,
  },
  {
    id: 4,
    name: "Farhan Rafi",
    img: "https://i.pravatar.cc/150?img=3",
    message: "Check your inbox please.",
    time: "3h",
    active: false,
  },
  {
    id: 5,
    name: "Tuhin Rahman",
    img: "https://i.pravatar.cc/150?img=9",
    message: "Bro, nice UI design 🔥",
    time: "5h",
    active: false,
  },
];

export default function MessageBar() {
  const [search, setSearch] = useState("");

  const filteredChats = dummyChats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen rounded-2xl shadow-md border border-gray-200 p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MessageSquare className="text-[#c45627]" size={20} />
          Chats
        </h2>
        <MoreVertical size={18} className="text-gray-500 cursor-pointer" />
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute top-3 left-3 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-[#c45627]"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent space-y-2">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center justify-between hover:bg-gray-100 transition-all cursor-pointer p-2 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={chat.img}
                  alt={chat.name}
                 
                  className="rounded-full border w-10 h-10 border-gray-200"
                />
                {chat.active && (
                  <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>

              <div className="flex flex-col">
                <h3 className="text-sm font-medium text-gray-800">{chat.name}</h3>
                <p className="text-xs text-gray-500 truncate w-[160px]">
                  {chat.message}
                </p>
              </div>
            </div>
            <span className="text-[10px] text-gray-400">{chat.time}</span>
          </div>
        ))}

        {filteredChats.length === 0 && (
          <p className="text-center text-sm text-gray-400 mt-8">
            No chats found 😢
          </p>
        )}
      </div>
    </div>
  );
}
