"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BlogForm from "../BlogForm/BlogForm";
import { useMessage } from "@/app/contexts/MessageContext";


async function getUserByEmail(email) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/user?email=${email}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch user");

    return res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

const PostField = () => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const { showMessageBar } = useMessage();
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    async function fetchUserData() {
      if (session?.user?.email) {
        const data = await getUserByEmail(session.user.email);
        setUserData(data);
      }
    }

    fetchUserData();
  }, [session?.user?.email]);

  // console.log(session?.user);
  return (
    <>
      {/* Post Input Box */}
      <div className="mt-10 bg-white rounded-xl shadow-lg p-1 md:p-3">
        <div className="flex items-center justify-center gap-3">
          <div>
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : userData?.image ? (
              <img
                src={userData.image}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <img
                src="/default_profile.jpg"
                alt="default profile pic"
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
          </div>

          <div
            onClick={() => setShowModal(true)}
            className={`cursor-pointer w-80 md:w-[1090px]`}
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
