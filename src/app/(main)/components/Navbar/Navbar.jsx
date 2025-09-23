"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaRegStar, FaTachometerAlt, FaRegFileAlt, FaUserCircle } from "react-icons/fa";
import { AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineEmojiEvents, } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { LucideSquareMenu } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  console.log(session?.user, status)


  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white z-50 border-b border-[#c45627] rounded-b-xs transition-all md:px-11 duration-300 ${scrolled
        ? "backdrop-blur-md bg-base-100/70 shadow-sm"
        : "bg-base-100"
        }`}
    >
      <div className="px-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex justify-center items-center">
            <img src="main_logo.png" alt="main logo" className="w-10 pr-2" />
            <Link href="/" className="text-2xl font-bold"> <span className="text-[#213943]">SYN</span><span className="text-[#c45627]">CHRO</span> </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-10 text-[16px] font-semibold">
            <li>
              <Link href="/" className={`flex items-center gap-2 hover:text-[#c45627] transition ${pathname === '/'
                ? "text-[#c45627] border-b-2 border-[#c45627]" // ✅ Active route style
                : "text-gray-700 hover:text-[#213943]"
                }`}>
                <GoHome /> Home
              </Link>
            </li>
            <li>
              <Link href="/all-posts" className={`flex items-center gap-2 hover:text-[#c45627] transition ${pathname === "/all-posts"
                ? "text-[#c45627] border-b-2 border-[#c45627]" // ✅ Active route style
                : "text-gray-700 hover:text-[#213943]"
                }`}>
                <FaRegFileAlt /> All Blog Posts
              </Link>
            </li>
            <li>
              <Link href="/popular" className={`flex items-center gap-2 hover:text-[#c45627] transition ${pathname === "/popular"
                ? "text-[#c45627] border-b-2 border-[#c45627]" // ✅ Active route style
                : "text-gray-700 hover:text-[#213943]"
                }`}>
                <FaRegStar /> Popular Post
              </Link>
            </li>
            <li>
              <Link href="/events" className={`flex items-center gap-2 hover:text-[#c45627] transition ${pathname === "/events"
                ? "text-[#c45627] border-b-2 border-[#c45627]" // ✅ Active route style
                : "text-gray-700 hover:text-[#213943]"
                }`}>
                <MdOutlineEmojiEvents /> Events
              </Link>
            </li>
            {/* <li>
              <Link href="/add-post" className="flex items-center gap-2 hover:text-[#c45627]">
                <FaPlusCircle /> Add Post
              </Link>
            </li> */}
            <li>
              <Link href="/aboutUs" className={`flex items-center gap-2 hover:text-[#c45627] transition ${pathname === "/aboutUs"
                ? "text-[#c45627] border-b-2 border-[#c45627]" // ✅ Active route style
                : "text-gray-700 hover:text-[#213943]"
                }`}>
                <AiOutlineInfoCircle /> About Us
              </Link>
            </li>
          </ul>

          {/* Desktop Buttons */}
          {
            !session?.user ?
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/sign-in" className="btn border-[#c45627] text-[#c45627] font-bold hover:bg-[#c45627] hover:text-white rounded-sm">
                  Login
                </Link>
                <Link href="/sign-up" className="btn border-[#c45627] text-[#c45627] font-bold hover:bg-[#c45627] hover:text-white rounded-sm">
                  Register
                </Link>
              </div>
              :
              <div className="flex items-center gap-2">
                {
                  session?.user?.image ? <img src={session?.user?.imag} alt="" />
                    :
                    <Link href={"/user-dashboard"}>
                      <FaUserCircle size={30} />
                    </Link>

                }

                <Link href="/" onClick={() => signOut()} className="btn border-[#c45627] text-[#c45627] font-bold hover:bg-[#c45627] hover:text-white rounded-sm">
                  Logout
                </Link>
              </div>
          }


          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center"
            onClick={() => setOpen(true)}
          >
            <LucideSquareMenu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
<<<<<<< HEAD
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-200 shadow-lg transform transition-transform duration-300 z-50 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <AiOutlineCloseCircle className="h-7 w-7 cursor-pointer" />
          </button>
        </div>
        <ul className="p-4 space-y-3 font-medium">
          <li>
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <GoHome /> Home
            </Link>
          </li>
          <li>
            <Link href="/all-posts" className="flex items-center gap-2 hover:text-[#c45627]">
              <FaRegFileAlt /> All Blog Posts
            </Link>
          </li>
          <li>
            <Link href="/events" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <MdOutlineEmojiEvents /> Events
            </Link>
          </li>
          {/* <li>
            <Link href="/add-post" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <FaPlusCircle /> Add Post
            </Link>
          </li> */}
          <li>
            <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/login"
              className="btn btn-sm btn-outline"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn btn-sm btn-primary"
              onClick={() => setOpen(false)}
            >
              Register
            </Link>
          </div>
        </ul>
      </div>
=======
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
        href="/dashboard"
        onClick={() => setOpen(false)}
        className="flex items-center gap-2 hover:text-[#c45627]"
      >
        <FaTachometerAlt /> Dashboard
      </Link>
    </li>

    {/* Auth Buttons */}
    <div className="mt-4 flex flex-col gap-2">
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
    </div>
  </ul>
</div>

>>>>>>> 913b194da415040a15f85c2ff1a64135897d6830

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