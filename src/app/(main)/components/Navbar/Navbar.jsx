"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaRegFileAlt,
  FaUserCircle,
  FaPlusCircle,
} from "react-icons/fa";
import { AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { LucideSquareMenu, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { RiMessengerLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { useMessage } from "@/app/contexts/MessageContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const {
    toggleMessageBar,
    toggleNotificationBar,
    showMessageBar,
    showNotificationBar,
  } = useMessage();
  // Navbar component এর state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Example dummy user data, তোমার API দিয়ে fetch করতে পারবে
  const users = [
    { id: 1, name: "Sudipto Mahadi" },
    { id: 22, name: "Sudipto Mahadi" },
    { id: 12, name: "Sudipto Mahadi" },
    { id: 2, name: "Rakib Hasan" },
    { id: 3, name: "Raisa Akter" },
    { id: 4, name: "Tanvir Islam" },
  ];

  // Search logic
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = users.filter((user) =>
      user.name[0].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  // console.log(session?.user.image, status)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white z-50 border-b border-[#c45627] rounded-b-xs transition-all md:px-11 duration-300 ${
        scrolled ? "backdrop-blur-md bg-base-100/70 shadow-sm" : "bg-base-100"
      }`}
    >
      <div className="px-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex justify-center items-center gap-5">
            <div className="flex items-center">
              <img src="/main_logo.png" alt="logo" className="w-10 pr-2" />
              <Link href="/" className="text-2xl font-bold">
                {" "}
                <span className="text-[#213943]">SYN</span>
                <span className="text-[#c45627]">CHRO</span>{" "}
              </Link>
            </div>
            {/* Search Bar */}
            <div className="relative hidden md:flex flex-1 max-w-md items-center">
              {/* Search Icon */}
              <Search
                size={17}
                className="absolute left-3 text-[#c45627]  pointer-events-none"
              />

              {/* Input Field */}
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-1 rounded-2xl border border-gray-300 
               focus:outline-none focus:ring-2 focus:ring-[#c45627] 
               transition duration-200 ease-in-out
               placeholder-gray-400 text-gray-700"
              />

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div
                  className="absolute top-full left-0 w-full bg-white border border-gray-200 
                    rounded-lg mt-2 shadow-lg z-50 max-h-60 overflow-y-auto animate-fadeIn"
                >
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="px-3 py-2 hover:bg-[#fef2e9] cursor-pointer transition-colors duration-200"
                      onClick={() => {
                        console.log("Selected user:", user.name);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                    >
                      {user.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-10 text-[16px] font-semibold">
            <li>
              <Link
                href="/"
                className={`flex items-center gap-2 hover:text-[#c45627] transition ${
                  pathname === "/"
                    ? "text-[#c45627] border-b-2 border-[#c45627]" // ✅ Active route style
                    : "text-gray-700 hover:text-[#213943]"
                }`}
              >
                <GoHome /> Home
              </Link>
            </li>
            {/* <li>
              <Link href="/all-posts" className={`flex items-center gap-2 hover:text-[#c45627] transition ${pathname === "/all-posts"
                ? "text-[#c45627] border-b-2 border-[#c45627]" // ✅ Active route style
                : "text-gray-700 hover:text-[#213943]"
                }`}>
                <FaRegFileAlt /> All Blog Posts
              </Link>
            </li> */}
            {/* <li>
              <Link href="/popular" className={`flex items-center gap-2 hover:text-[#c45627] transition ${pathname === "/popular"
                ? "text-[#c45627] border-b-2 border-[#c45627]" // ✅ Active route style
                : "text-gray-700 hover:text-[#213943]"
                }`}>
                <FaRegStar /> Popular Post
              </Link>
            </li> */}
            <li>
              <Link
                href="/events"
                className={`flex items-center gap-2 hover:text-[#c45627] transition ${
                  pathname === "/events"
                    ? "text-[#c45627] border-b-2 border-[#c45627]" // ✅ Active route style
                    : "text-gray-700 hover:text-[#213943]"
                }`}
              >
                <MdOutlineEmojiEvents /> Events
              </Link>
            </li>
            {/* <li>
              <Link href="/add-post" className={`flex items-center gap-2 hover:text-[#c45627] transition ${pathname === "/add-post"
                ? "text-[#c45627] border-b-2 border-[#c45627]" // ✅ Active route style
                : "text-gray-700 hover:text-[#213943]"
                }`}>
                <FaPlusCircle /> Add Post
              </Link>
            </li> */}
            <li>
              <Link
                href="/user-dashboard"
                className={`flex items-center gap-2 hover:text-[#c45627] transition ${
                  pathname === "/user-dashboard"
                    ? "text-[#c45627] border-b-2 border-[#c45627]" // ✅ Active route style
                    : "text-gray-700 hover:text-[#213943]"
                }`}
              >
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/aboutUs"
                className={`flex items-center gap-2 hover:text-[#c45627] transition ${
                  pathname === "/aboutUs"
                    ? "text-[#c45627] border-b-2 border-[#c45627]" // ✅ Active route style
                    : "text-gray-700 hover:text-[#213943]"
                }`}
              >
                <AiOutlineInfoCircle /> About Us
              </Link>
            </li>
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden lg:block">
            {!session?.user ? (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/sign-in"
                  className="btn border-[#c45627] text-[#c45627] font-bold hover:bg-[#c45627] hover:text-white rounded-sm"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="btn border-[#c45627] text-[#c45627] font-bold hover:bg-[#c45627] hover:text-white rounded-sm"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div
                  className={` shadow-lg rounded-full p-3 ${
                    showMessageBar ? "bg-[#c45627]" : "bg-white"
                  } border border-[#c456275d]`}
                >
                  <RiMessengerLine
                    color={showMessageBar ? "white" : "#c45627"}
                    size={19}
                    className="cursor-pointer"
                    onClick={toggleMessageBar}
                  />
                </div>
                <div
                  className={` shadow-lg rounded-full p-3 ${
                    showNotificationBar ? "bg-[#c45627]" : "bg-white"
                  } border border-[#c456275d]`}
                >
                  <IoNotificationsOutline
                    color={showNotificationBar ? "white" : "#c45627"}
                    size={19}
                    className="cursor-pointer"
                    onClick={toggleNotificationBar}
                  />
                </div>
                {session?.user?.image ? (
                  <div>
                    <Link href={"/user-dashboard/profile"}>
                      <img
                        className="w-10 h-10 rounded-full"
                        src={session?.user?.image}
                        alt=""
                      />
                    </Link>
                  </div>
                ) : (
                  <Link href={"/user-dashboard/profile"}>
                    <FaUserCircle size={30} />
                  </Link>
                )}

                {/* <Link href="/" onClick={() => signOut()} className="btn border-[#c45627] text-[#c45627] font-bold hover:bg-[#c45627] hover:text-white rounded-sm">
                    Logout
                  </Link> */}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center"
            onClick={() => setOpen(true)}
          >
            <LucideSquareMenu
              size={28}
              className="text-[#c45627] cursor-pointer"
            />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-200 shadow-lg transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b bg-white">
          <h2 className="text-lg font-bold text-[#c45627]">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <AiOutlineCloseCircle className="h-7 w-7 cursor-pointer text-[#c45627]" />
          </button>
        </div>
        <ul className="p-4 space-y-3 font-medium bg-white min-h-screen">
          <li>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 hover:text-[#c45627]"
            >
              <GoHome /> Home
            </Link>
          </li>
          <li>
            <Link
              href="/all-posts"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 hover:text-[#c45627]"
            >
              <FaRegFileAlt /> All Blog Posts
            </Link>
          </li>
          <li>
            <Link
              href="/events"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 hover:text-[#c45627]"
            >
              <MdOutlineEmojiEvents /> Events
            </Link>
          </li>
          <li>
            <Link
              href="/user-dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 hover:text-[#c45627]"
            >
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

          {/* Auth Buttons */}
          <div className="mt-4 flex flex-col gap-2">
            {session?.user ? (
              <button
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="btn btn-sm bg-[#c45627] text-white hover:opacity-90"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn btn-sm btn-outline border-[#c45627] text-[#c45627] hover:bg-[#c45627] hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-sm bg-[#c45627] text-white hover:opacity-90"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 min-h-screen"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
