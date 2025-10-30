"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaTachometerAlt, FaRegFileAlt, FaUserCircle, FaPlusCircle } from "react-icons/fa";
import { AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineEmojiEvents, } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { LucideSquareMenu } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { RiMessengerLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { useMessage } from "@/app/contexts/MessageContext";


async function getUserByEmail(email) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/user?email=${email}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch user");

    return res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { toggleMessageBar, toggleNotificationBar, showMessageBar, showNotificationBar } = useMessage();
  // const [userImage, setUserImage] = useState(null);
  // Navbar component এর state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // console.log(session?.user.role)
  // Example dummy user data, তোমার API দিয়ে fetch করতে পারবে
  const users = [
    { id: 1, name: "Sudipto Mahadi" },
    { id: 22, name: "Sudipto Mahadi" },
    { id: 12, name: "Sudipto Mahadi" },
    { id: 2, name: "Rakib Hasan" },
    { id: 3, name: "Raisa Akter" },
    { id: 4, name: "Tanvir Islam" },
  ];
  // console.log(first)

  // profile pic in profile btn



  useEffect(() => {
    async function fetchUserData() {
      if (session?.user?.email) {
        const data = await getUserByEmail(session.user.email);
        setUserData(data);
      }
    }

    fetchUserData();
  }, [session?.user?.email]);

  useEffect(() => {
    if (userData) {
      // console.log("✅ User data fetched:", userData);
    }
  }, [userData]);


  useEffect(() => {
    async function fetchUserImage() {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/get-user?email=${encodeURIComponent(session.user.email)}`);
          const data = await res.json();

          if (data?.user?.image) {
            setUserImage(data.user.image); // ✅ from MongoDB
          } else {
            setUserImage(session?.user?.image || null); // fallback to NextAuth image
          }
        } catch (error) {
          console.error("Failed to load user image:", error);
        }
      }
    }

    fetchUserImage();
  }, [session]);



  // Search logic
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      className={`fixed top-0 left-0 w-full bg-white z-50 border-b border-[#0000ff1a] rounded-b-xs transition-all md:px-11 duration-300 ${scrolled
        ? "backdrop-blur-md bg-base-100/70 shadow-sm"
        : "bg-base-100"
        }`}
    >
      <div className="px-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex justify-center items-center gap-5">
            <div className="flex items-center">
              <img src="/main_logo_v2.png" alt="logo" className="w-10 pr-2" />
              <Link href="/" className="text-2xl font-bold"> <span className="text-[#213943]">SYN</span><span className="text-[#0000FF]">CHRO</span> </Link>
            </div>
            {/* Search Bar */}
            {/* <div className="relative hidden md:flex flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0000FF]"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="px-3 py-2 hover:bg-[#fef2e9] cursor-pointer"
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
            </div> */}

          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-10 text-[16px] font-semibold">
            <li>
              <Link href="/" className={`flex items-center gap-2 hover:text-[#0000FF] transition ${pathname === '/'
                ? "text-[#0000FF] border-b-2 border-[#0000FF]" // ✅ Active route style
                : "text-gray-700 hover:text-[#213943]"
                }`}>
                <GoHome /> Home
              </Link>
            </li>
            <li>
              <Link href="/all-posts" className={`flex items-center gap-2 hover:text-[#0000FF] transition ${pathname === "/all-posts"
                ? "text-[#0000FF] border-b-2 border-[#0000FF]" // ✅ Active route style
                : "text-gray-700 hover:text-[#213943]"
                }`}>
                <FaRegFileAlt /> All Blog Posts
              </Link>
            </li>


            {session?.user &&
              <li>
                <Link href={`${session?.user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}`} className={`flex items-center gap-2 hover:text-[#0000FF] transition ${pathname === "/user-dashboard"
                  ? "text-[#0000FF] border-b-2 border-[#0000FF]" // ✅ Active route style
                  : "text-gray-700 hover:text-[#213943]"
                  }`}>
                  <FaTachometerAlt /> Dashboard
                </Link>
              </li>
            }
            <li>
              <Link href="/aboutUs" className={`flex items-center gap-2 hover:text-[#0000FF] transition ${pathname === "/aboutUs"
                ? "text-[#0000FF] border-b-2 border-[#0000FF]" // ✅ Active route style
                : "text-gray-700 hover:text-[#213943]"
                }`}>
                <AiOutlineInfoCircle /> About Us
              </Link>
            </li>
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden lg:block">
            {
              !session?.user ?
                <div className="hidden lg:flex items-center gap-3">
                  <Link href="/sign-in" className="btn border-[#0000FF] text-[#0000FF] font-bold hover:bg-[#0000FF] hover:text-white rounded-sm">
                    Sign In
                  </Link>
                  <Link href="/sign-up" className="btn border-[#0000FF] text-[#0000FF] font-bold hover:bg-[#0000FF] hover:text-white rounded-sm">
                    Sign Up
                  </Link>
                </div>
                :
                // massage bar and notification bar
                <div className="flex items-center gap-2">
                  <div className={` shadow-lg rounded-full p-3 ${showMessageBar ? 'bg-[#0000FF]' : 'bg-white'} border border-[#0000FF5d]`}>
                    <RiMessengerLine
                      color={showMessageBar ? 'white' : "#0000FF"}
                      size={15}
                      className="cursor-pointer"
                      onClick={toggleMessageBar}
                    />
                  </div>
                  <div className={` shadow-lg rounded-full p-3 ${showNotificationBar ? 'bg-[#0000FF]' : 'bg-white'} border border-[#0000FF5d]`}>
                    <IoNotificationsOutline
                      color={showNotificationBar ? 'white' : "#0000FF"}
                      size={15}
                      className="cursor-pointer"
                      onClick={toggleNotificationBar}
                    />

                  </div>


                  {userImage ? (
                    <Link href="/my-profile">
                      <img
                        src={userImage}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                    </Link>
                  ) : userData?.image ? (
                    <Link href="/my-profile">
                      <img
                        src={userData.image}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                    </Link>
                  ) : (
                    <Link href="/my-profile">
                      <img
                        src="/default_profile.jpg"
                        alt="Default profile pic"
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                    </Link>
                  )}





                  <Link href="/" onClick={() => signOut()} className="btn border-[#0000FF] text-[#0000FF] font-bold hover:bg-[#0000FF] hover:text-white rounded-sm">
                    Sign Out
                  </Link>
                </div>
            }
          </div>


          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {
              session?.user &&
              <div className="flex items-center gap-2">
                <div className={` shadow-lg rounded-full p-2 ${showMessageBar ? 'bg-[#0000FF]' : 'bg-white'} border border-[#0000FF5d]`}>
                  <RiMessengerLine
                    color={showMessageBar ? 'white' : "#0000FF"}
                    size={15}
                    className="cursor-pointer"
                    onClick={toggleMessageBar}
                  />
                </div>
                <div className={` shadow-lg rounded-full p-2 ${showNotificationBar ? 'bg-[#0000FF]' : 'bg-white'} border border-[#0000FF5d]`}>
                  <IoNotificationsOutline
                    color={showNotificationBar ? 'white' : "#0000FF"}
                    size={15}
                    className="cursor-pointer"
                    onClick={toggleNotificationBar}
                  />

                </div>
              </div>
            }
            <div>
              <button
                className="md:hidden flex items-center"
                onClick={() => setOpen(true)}
              >
                <LucideSquareMenu size={28} className="text-[#0000FF] cursor-pointer" />
              </button>
            </div>
          </div>


        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-200 shadow-lg transform transition-transform duration-300 z-50 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b bg-white">
          {
            session?.user ?
              <div className="flex items-center gap-2">
                <div>
                  {userImage ? (
                    <Link href="/my-profile">
                      <img
                        src={userImage}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                    </Link>
                  ) : userData?.image ? (
                    <Link href="/my-profile">
                      <img
                        src={userData.image}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                    </Link>
                  ) : (
                    <Link href="/my-profile">
                      <img
                        src="/default_profile.jpg"
                        alt="Default profile pic"
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                    </Link>
                  )}

                </div>
                <div>
                  <Link href="/my-profile">
                    <h2 className="text-xl font-bold">{userData?.userName}</h2>
                  </Link>
                </div>
              </div>
              :
              <div className="flex items-center gap-1">
                <img src="/main_logo_v2.png" alt="" className="w-8 rounded-full " />
                <h2 className="font-bold">SYNCHRO</h2>
              </div>
          }
          <button onClick={() => setOpen(false)}>
            <AiOutlineCloseCircle className="h-7 w-7 cursor-pointer text-[#0000FF]" />
          </button>
        </div>
        <ul className="p-4 space-y-3 font-medium bg-white min-h-screen">
          <li>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 hover:text-[#0000FF]"
            >
              <GoHome /> Home
            </Link>
          </li>
          <li>
            <Link
              href="/all-posts"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 hover:text-[#0000FF]"
            >
              <FaRegFileAlt /> All Blog Posts
            </Link>
          </li>

          <li>
            <Link
              href="/user-dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 hover:text-[#0000FF]"
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
                className="btn rounded-lg btn-sm bg-[#0000FF] text-white hover:opacity-90"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="btn rounded-lg btn-sm btn-outline border-[#0000FF] text-[#0000FF] hover:bg-[#0000FF] hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="btn rounded-lg btn-sm bg-[#0000FF] text-white hover:opacity-90"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
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
