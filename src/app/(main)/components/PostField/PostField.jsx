"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import BlogForm from "../BlogForm/BlogForm";
import { useMessage } from "@/app/contexts/MessageContext";


const PostField = () => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const { showMessageBar } = useMessage();

  // console.log(session?.user);
  return (
    <>
      {/* Post Input Box */}
      <div className="mt-10 bg-white rounded-xl shadow-lg p-3">
        <div className="flex items-center justify-center gap-3">
          <div>
            {session?.user?.image ? (
              <img
                className="rounded-full w-12 h-12 object-cover "
                src={session?.user?.image}
                alt="profile"
              />
            ) : (
              <img src="/default_profile.jpg" alt="default profile pic" className="w-12 h-12 rounded-full"/>
            )}
          </div>

          <div
            onClick={() => setShowModal(true)}
            className={`cursor-pointer w-96 ${showMessageBar ? 'md:w-[700px]' : 'md:w-[1090px]'}`}
          >
            <input
              readOnly
              className="border border-gray-300 text-gray-500 w-full text-sm h-12 rounded-2xl px-4 cursor-pointer focus:outline-none"
              placeholder="What's on your mind today? Share your thoughts, stories, or ideas with the world..."
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative p-4">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✖
            </button>

            {/* Blog Form */}
            {/* Blog Form */}
            <div className="pt-6">
              <BlogForm onClose={() => setShowModal(false)} />
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default PostField;
