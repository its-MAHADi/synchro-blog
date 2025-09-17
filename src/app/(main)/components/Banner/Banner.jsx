"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaGlobe, FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white mt-15 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left space-y-6 z-10">
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight drop-shadow-lg">
            AI-Assisted Blogging Platform
          </h1>
          <p className="text-base lg:text-lg text-gray-200 max-w-2xl mx-auto lg:mx-0">
            The main goal is to provide{" "}
            <span className="font-semibold">bloggers, writers, and organizations</span>{" "}
            with an AI-assisted platform to create, manage, and publish high-quality
            blog content efficiently, while maintaining{" "}
            <span className="font-semibold">SEO optimization, originality,</span> and{" "}
            <span className="font-semibold">multilingual reach.</span>
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button className="btn btn-primary text-white px-6">
              Get Started
            </button>
            <button className="btn btn-outline border-white text-white hover:bg-white hover:text-indigo-600 px-6">
              Learn More
            </button>
          </div>

          {/* Features */}
          <div className="flex gap-8 mt-8 justify-center lg:justify-start">
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
            src="/BLOG_CORNER-1.WEBP"
            alt="Corner 1"
            className="absolute -top-5 -left-5 w-16 h-16 shadow-xl object-cover rounded-lg z-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.img
            src="/BLOG_CORNER-2.WEBP"
            alt="Corner 2"
            className="absolute -top-5 -right-5 w-16 h-16 shadow-xl object-cover rounded-lg z-20"
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.img
            src="/BLOG_CORNER-3.WEBP"
            alt="Corner 3"
            className="absolute -bottom-5 -left-5 w-16 h-16 shadow-xl object-cover rounded-lg z-20"
            animate={{ x: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.img
            src="/BLOG_CORNER-4.jpg"
            alt="Corner 4"
            className="absolute -bottom-5 -right-5 w-16 h-16 shadow-xl object-cover rounded-lg z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
