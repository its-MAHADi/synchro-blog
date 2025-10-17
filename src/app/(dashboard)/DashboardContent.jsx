// DashboardContent.jsx (Client Component)
"use client";

import Navbar from "../(main)/components/Navbar/Navbar";
import { ChatPopupProvider } from "../contexts/ChatsContext";
import { MessageProvider } from "../contexts/MessageContext";



export default function DashboardContent({ children, role }) {
  return (
    <MessageProvider>
      <ChatPopupProvider>
        <div className="flex-1 bg-gray-50">
          {role !== "admin" && <Navbar />}
          <main className="flex-1 h-screen overflow-x-auto max-w-[100%] mx-auto">
            {children}
          </main>
        </div>
      </ChatPopupProvider>
    </MessageProvider>
  );
}
