"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaGlobe, FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative rounded-xl bg-[#c45627] text-white mt-15 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left space-y-6 z-10">
          <h1 className="text-2xl lg:text-5xl font-extrabold leading-tight drop-shadow-lg">
            AI-Assisted Blogging Platform
          </h1>
          <p className="p-2 lg:p-0 text-sm lg:text-lg text-gray-200 max-w-2xl mx-auto lg:mx-0">
            The main goal is to provide{" "}
            <span className="font-semibold">bloggers, writers, and organizations</span>{" "}
            with an AI-assisted platform to create, manage, and publish high-quality
            blog content efficiently, while maintaining{" "}
            <span className="font-semibold">SEO optimization, originality,</span> and{" "}
            <span className="font-semibold">multilingual reach.</span>
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button className="btn bg-white text-[#c45627] hover:bg-[#ce5622] hover:border-[#ce5622] border-white hover:text-white rounded-lg px-6">
              Get Started
            </button>
            <button className="btn btn-outline border-white text-white hover:bg-[#ce5622] hover:border-[#ce5622]hover:border-white hover:text-white rounded-lg px-6">
              Learn More
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-col lg:flex-row justify-center items-center  gap-8 mt-8 lg:justify-start">
            <div className="flex items-center gap-2">
              <FaRobot className="text-xl" />
              <span>AI Writing</span>
            </div>
            <div className="flex items-center gap-2">
              <FaSearch className="text-xl" />
              <span>SEO Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <FaGlobe className="text-xl" />
              <span>Multilingual</span>
            </div>
          </div>
        </div>

        {/* Right Image / Illustration */}
        <div className="flex-1 relative w-full max-w-md mb-6 lg:mb-0">
          {/* Main Image */}
          <img
            src="/Ai-Blog.png"
            alt="AI Blogging"
            className="rounded-2xl shadow-2xl w-full mx-auto lg:mx-0 relative z-10"
          />

          {/* Corner Images with motion */}
          <motion.img
            src="/BLOG_CORNER-1.png"
            alt="Corner 1"
            className="absolute -top-5 -left-5 w-10 h-10 lg:w-16 lg:h-16 shadow-xl object-cover rounded-lg z-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.img
            src="/BLOG_CORNER-2.png"
            alt="Corner 2"
            className="absolute -top-5 -right-5 w-10 h-10 lg:w-16 lg:h-16 shadow-xl object-cover rounded-lg z-20"
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.img
            src="/BLOG_CORNER-3.png"
            alt="Corner 3"
            className="absolute -bottom-5 -left-5 w-10 h-10 lg:w-16 lg:h-16 shadow-xl object-cover rounded-lg z-20"
            animate={{ x: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.img
            src="/BLOG_CORNER-4.jpg"
            alt="Corner 4"
            className="absolute -bottom-5 -right-5 w-10 h-10 lg:w-16 lg:h-16 shadow-xl object-cover rounded-lg z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
