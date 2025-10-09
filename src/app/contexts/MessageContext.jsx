"use client";
import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [showMessageBar, setShowMessageBar] = useState(false);
  const [showNotificationBar, setShowNotificationBar] = useState(false);

  const toggleMessageBar = () => setShowMessageBar((prev) => !prev);
  const toggleNotificationBar = () => setShowNotificationBar((prev) => !prev);
  const closeMessageBar = () => setShowMessageBar(false);
  const closesNotificationBar = () => setShowNotificationBar(false);

  return (
    <MessageContext.Provider value={{ showMessageBar,showNotificationBar, toggleMessageBar, toggleNotificationBar, closeMessageBar, closesNotificationBar}}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
