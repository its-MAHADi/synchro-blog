"use client";

import Link from "next/link";
import Image from "next/image";

const AuthNavbar = () => {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Website Name */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/main_logo.png"
            alt="logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-2xl font-bold">
            <span className="text-[#213943]">SYN</span>
            <span className="text-[#0000FF]">CHRO</span>
          </span>
        </Link>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="px-4 py-2 border border-[#0000FF] text-[#0000FF] rounded-lg hover:bg-[#0000FF] hover:text-white transition"
        >
          Back to Home
        </Link>
      </div>
    </nav>
  );
};

export default AuthNavbar;
