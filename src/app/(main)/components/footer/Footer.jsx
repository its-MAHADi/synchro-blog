"use client"
import { usePathname } from "next/navigation";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiX } from "react-icons/si"; // New X logo

const Footer = () => {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/view-profile/");

  if (hideFooter) return null;

  return (
    <footer className="bg-[#b4b4fd1a] text-[#0000FF] pt-16 pb-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Branding */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <img src="/main_logo_v2.png" alt="main-logo" className="w-12" />
            <span className="text-3xl font-bold">Synchro</span>
          </div>
          <p className="text-[#0000FF] text-sm leading-relaxed">
            Helping students organize, plan, and succeed. Stay productive with our all-in-one toolkit.
          </p>
          <div className="flex space-x-4 mt-2">
            <a target="_blank" href="https://www.facebook.com/" className="hover:text-indigo-700 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a target="_blank" href="https://www.x.com/" className="hover:text-indigo-700 transition-colors">
              <SiX size={20} />
            </a>
            <a target="_blank" href="https://www.instagram.com/" className="hover:text-indigo-700 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a target="_blank" href="https://www.linkedin.com" className="hover:text-indigo-700 transition-colors">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h6 className="font-bold text-lg border-b-2 border-[#0000FF] inline-block pb-1 mb-4">Our Features</h6>
          <ul className="list-disc list-inside space-y-2 text-[#0000FF]">
            <li className="hover:text-indigo-700 transition-colors">
              AI-powered smart blogging platform
            </li>
            <li className="hover:text-indigo-700 transition-colors">
              Make blogging faster, smarter, and more efficient with AI assistance
            </li>
            <li className="hover:text-indigo-700 transition-colors">
              Profession-based blogging system available for all users
            </li>
            <li className="hover:text-indigo-700 transition-colors">
              Community-driven and socially connected platform
            </li>
          </ul>
        </div>



        {/* Contact / Info */}
        <div className="space-y-4">
          <h6 className="font-bold text-lg border-b-2 border-[#0000FF] inline-block pb-1 mb-4">Contact Us</h6>
          <p className="text-[#0000FF] text-sm leading-relaxed">
            Have questions or want to collaborate? Reach out to us and we’ll get back to you promptly.
          </p>
          <p className="text-[#0000FF] text-sm"><span className="font-bold">Email:</span> synchroapp06@gmail.com</p>
          <p className="text-[#0000FF] text-sm"><span className="font-bold">Address:</span> Dhaka, Bangladesh</p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-[#0000FF] pt-6 text-center text-gray-800 text-sm">
        © {new Date().getFullYear()} Synchro. Built with ❤️ by <span className="text-[#0000FF] font-semibold">CODEVENGERS</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
