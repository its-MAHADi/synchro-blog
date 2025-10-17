"use client";

import { useMessage, MessageProvider } from "../contexts/MessageContext";
import Footer from "./components/footer/Footer";
import MessageBar from "./components/MessageBar/MessageBar";
import Navbar from "./components/Navbar/Navbar";
import NextProvider from "@/Provider/NextProvider";
import { motion, AnimatePresence } from "framer-motion";
import NotificationBar from "./components/NotificationBar/NotificationBar";
import { useState } from "react";
import { Bot, X } from "lucide-react";
import MessageWithUser from "./components/MessageBar/MessageWithUser";
import { useSession } from "next-auth/react";
import { ChatPopupProvider, useChatPopup } from "../contexts/ChatsContext";
import ChatPopup from "./components/ChatPopup/ChatPopup";


function MainContent({ children }) {
  const { showNotificationBar, showMessageBar } = useMessage();

  const { data: session } = useSession();
  const currentUser = session?.user?.email
  // এখন শুধু notification sidebar থাকবে (AI chat popup হবে)
  const activeSidebar = showMessageBar ? "message" : showNotificationBar ? "notification" : null;

  return (
    <main className="max-w-7xl mx-auto py-10 flex gap-8 items-start relative transition-all duration-500 ease-in-out">
      {/* বাম দিকের content */}
      <motion.section
        className="flex-1"
        animate={{
          width: activeSidebar ? "65%" : "100%",
          opacity: activeSidebar ? 0.95 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.section>




      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {/* message */}
        {activeSidebar === "message" && (<motion.aside key="messagebar" initial={{ x: 400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 400, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="w-[35%] sticky top-[90px] h-fit bg-white shadow-md rounded-xl overflow-y-auto" >
          <MessageWithUser currentUser={currentUser} />
        </motion.aside>)}

        {/* notification */}
        {activeSidebar === "notification" && (
          <motion.aside
            key="notificationbar"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-[35%] sticky top-[90px] h-fit bg-white shadow-md rounded-xl overflow-y-auto"
          >
            <NotificationBar />
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ✅ Floating Chat Button + Popup Chat */
/* ✅ Floating Chat Button + Popup Chat */
function FloatingChatPopup() {
  const [openChat, setOpenChat] = useState(false);
  const { openPopupUser, closePopup } = useChatPopup();
  return (
    <>
      {/* Chat Floating Button */}
      <button
        onClick={() => setOpenChat(true)}
        className={`fixed ${openChat && 'ml-40 mb-10'} bottom-6 cursor-pointer right-6 bg-[#c45627] hover:bg-[#d35c29] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-transform hover:scale-105 z-50`}
      >
        <Bot size={20} />
        Chat with AI
      </button>

      {/* Popup Chat Modal */}
      <AnimatePresence>
        {openChat && (
          <motion.div
            key="chatbox"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            // 🟢 নিচের অংশটাই popup box — এখন blur নেই
            className="fixed bottom-0 right-0 w-[420px] max-w-[95vw] my-10 h-[60vh] bg-white shadow-2xl rounded-2xl border border-gray-300 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center  p-3 border-b bg-[#c45627] text-white">
              <h2 className="font-semibold text-md text-center  w-full">Your Personal Assistant From Synchro</h2>
              <button
                onClick={() => setOpenChat(false)}
                className="hover:text-gray-200 transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-hidden">

              <MessageBar />
            </div>
           

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


export default function MainLayout({ children }) {
  return (
    <NextProvider>
      <MessageProvider>
        <ChatPopupProvider>
          <div className="relative min-h-screen">
            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-white shadow-sm">
              <Navbar />
            </header>

            {/* Main Content */}
            <div className="max-w-11/12 mx-auto min-h-[calc(100vh-4.33px)]">
              <MainContent>{children}</MainContent>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-10">
              <Footer />
            </footer>

            {/* 💬 Floating Chat Button + Popup */}
               
            <FloatingChatPopup />
           
          </div>
        </ChatPopupProvider>
      </MessageProvider>
    </NextProvider>
  );
}
