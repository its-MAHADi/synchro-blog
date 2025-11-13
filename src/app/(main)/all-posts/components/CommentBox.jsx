"use client";
import React from "react";

const CommentBox = () => {
  return (
    <div className="bg-white p-6 rounded-lg border border-[#e7e5e4] shadow-sm">
      <h3 className="text-xl font-semibold text-black mb-4">Leave a Comment</h3>
      <form>
        <div className="mb-4">
          <label htmlFor="comment" className="sr-only">
            Your Comment
          </label>
          <textarea
            id="comment"
            rows="5"
            placeholder="Write your comment here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0000FF] focus:outline-none transition duration-200 placeholder-gray-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto bg-[#0000FF] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#a8431f] transition duration-300 cursor-pointer"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentBox;
