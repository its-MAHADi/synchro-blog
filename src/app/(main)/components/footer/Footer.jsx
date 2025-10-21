"use client"
import { usePathname } from "next/navigation";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";


const Footer = () => {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/view-profile/");

  if (hideFooter) return null;
  return (
    <footer className="bg-[#f6f5ea] text-[#0000FF] pt-16 pb-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img src="/main_logo.png" alt="main-logo" className="w-10" />
            <span className="text-2xl font-bold">Synchro</span>
          </div>
          <p className="text-[#0000FF] text-sm">
            Helping students organize, plan, and succeed. Stay productive with our all-in-one toolkit.
          </p>
          <div className="flex space-x-4 mt-2">
            <a target="_blank" href="https://www.facebook.com/" className="hover:text-yellow-800"><FaFacebookF /></a>
            <a target="_blank" href="https://www.x.com/" className="hover:text-yellow-800"><FaTwitter /></a>
            <a target="_blank" href="https://www.instragram.com/" className="hover:text-yellow-800"><FaInstagram /></a>
            <a target="_blank" href="https://www.linkedin.com" className="hover:text-yellow-800"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h6 className="font-bold mb-4">Features</h6>
          <ul className="space-y-2 text-[#0000FF]">
            <li><a to="/classTracker" className="hover:text-yellow-800">AI-powered Draft Generator</a></li>
            <li><a to="/budgetTracker" className="hover:text-yellow-800">Title Suggestion</a></li>
            <li><a to="/qaGenerator" className="hover:text-yellow-800">Tag Suggestion</a></li>
            <li><a to="/studyPlanner" className="hover:text-yellow-800">SEO keywords Suggestions</a></li>
          </ul>
        </div>

        {/* Shortcuts */}
        <div>
          <h6 className="font-bold mb-4">Shortcuts</h6>
          <ul className="space-y-2 text-[#0000FF]">
            <li><a href="#features" className="hover:text-yellow-800">About Us</a></li>
            <li><a href="#faq" className="hover:text-yellow-800">FAQ</a></li>
            <li><a href="#trendingTopics" className="hover:text-yellow-800">Trending Topics</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h6 className="font-bold mb-4">Newsletter</h6>
          <p className="text-[#0000FF] text-sm mb-4">
            Subscribe for tips, updates, and new features.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full rounded-lg text-black"
            />
            <button className="btn bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-yellow-800 pt-6 text-center text-gray-800 text-sm">
        © {new Date().getFullYear()} Synchro. Built with ❤️ by <span style={{ color: "#0000FF" }}>CODEVENGERS</span> <br/> All rights reserved to CodeVengers.
      </div>
    </footer>
  );
};

export default Footer;