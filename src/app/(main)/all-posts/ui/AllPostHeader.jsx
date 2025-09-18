"use client";

import React from "react";
import { FaSearch } from "react-icons/fa";
import Button from "./Button";


const AllPostHeader = () => {
  return (
    <div className="flex items-center justify-between md:px-4 py-2 md:py-4 mb-3 lg:mb-4 border-b border-gray-300">
      {/* Title */}
      <h1 className="text-lg md:text-2xl font-bold">All Blog Posts</h1>

      {/* Search bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 bg-[#f6f5ea] rounded-full outline-none w-36 md:w-64 lg:w-72"
        />
        <Button
          label={<FaSearch className="text-white" />}
          type="button"
          clsName="btn btn-primary rounded-full p-3 flex items-center justify-center"
        />
      </div>
    </div>
  );
};

export default AllPostHeader;