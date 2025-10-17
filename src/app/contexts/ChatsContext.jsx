"use client";
import { createContext, useContext, useState } from "react";

const ChatPopupContext = createContext();

export const ChatPopupProvider = ({ children }) => {
  const [openPopupUser, setOpenPopupUser] = useState(null);

  const openPopup = (user) => setOpenPopupUser(user);
  const closePopup = () => setOpenPopupUser(null);

  return (
    <ChatPopupContext.Provider value={{ openPopupUser, openPopup, closePopup }}>
      {children}
    </ChatPopupContext.Provider>
  );
};

export const useChatPopup = () => useContext(ChatPopupContext);
