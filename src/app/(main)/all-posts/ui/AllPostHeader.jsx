"use client";

import React from "react";
import { FaSearch } from "react-icons/fa";
import Button from "./Button";

const AllPostHeader = () => {
  return (
    <div className="md:flex items-center justify-between md:px-4 py-2 md:py-4 mb-3 lg:mb-4 border-b border-gray-300">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold">All Blog Posts</h1>

      {/* Search bar */}
      <div className="flex items-center gap-2 border px-3 py-1 border-[#c45627a8] rounded-full">
        {/* <input
          type="text"
          placeholder="Search..."
          className=" py-2 bg-[#f6f5ea] rounded-full outline-none w-full md:w-64 lg:w-72"
        /> */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-2 py-3 md:w-72 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
        />
        <Button
          label={<FaSearch className="text-white" />}
          type="button"
          clsName="btn bg-[#c45627] rounded-full p-3 flex items-center justify-center"
        />
      </div>
    </div>
  );
};

export default AllPostHeader;
