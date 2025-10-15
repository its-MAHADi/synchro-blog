"use client";

import { useMessage, MessageProvider } from "../contexts/MessageContext";
import Footer from "./components/footer/Footer";
import MessageBar from "./components/MessageBar/MessageBar";
import Navbar from "./components/Navbar/Navbar";
import NextProvider from "@/Provider/NextProvider";
import { motion, AnimatePresence } from "framer-motion";
import NotificationBar from "./components/NotificationBar/NotificationBar";

function MainContent({ children }) {
  const { showMessageBar, showNotificationBar } = useMessage();

  // ✅ ঠিক করলাম যেন একসাথে একটাই sidebar খোলে
  const activeSidebar = showMessageBar
    ? "message"
    : showNotificationBar
    ? "notification"
    : null;

  return (
    <main className="max-w-7xl mx-auto py-10 flex gap-8 items-start relative transition-all duration-500 ease-in-out">
      {/* 🧩 বাম পাশের কনটেন্ট (smooth move + resize) */}
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

      {/* 🧩 ডান পাশে Sidebar (Animated) */}
      <AnimatePresence mode="wait">
        {activeSidebar === "message" && (
          <motion.aside
            key="messagebar"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-[35%] sticky top-[90px] h-fit bg-white shadow-md rounded-xl overflow-y-auto"
          >
            <MessageBar />
          </motion.aside>
        )}

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

export default function MainLayout({ children }) {
  return (
    <NextProvider>
      <MessageProvider>
        <div className="relative min-h-screen">
          {/* Navbar */}
          <header className="sticky top-0 z-50 bg-white shadow-sm">
            <Navbar />
          </header>

          {/* Main Content */}
          <div className="max-w-11/12 mx-auto min-h-[calc(100vh-4 .33px)]">
            <MainContent>{children}</MainContent>
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-10">
            <Footer />
          </footer>
        </div>
      </MessageProvider>
    </NextProvider>
  );
}
