
import React from "react";
import PostCard from "./PostCard/PostCard";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: "All Posts",
  description:
    "The purpose of Synchro - AI-Powered Blogging Site is to simplify and enhance the process of creating, managing, and publishing blog content by leveraging artificial intelligence.",
};

// 🧠 Helper function for server-side data fetching
async function getAllPosts() {
  try {
    // ✅ Determine base URL (works in dev + production)
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

    // ✅ Fetch data from your backend API route
    const res = await fetch(`${baseUrl}/api/all-blog-posts`, {
      cache: "no-store", // always get fresh data
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// user find
async function getUserByEmail(email) {

  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/user?email=${email}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}



const AllPosts = async () => {
  // ✅ Fetch posts from backend
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const postsData = await getAllPosts();
  const usersData = await getUserByEmail(email);
  // 🔹 Sort posts by created_at descending (recent posts first)
  const sortedPosts = postsData.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <section className="mt-10">


      <div className="grid grid-cols-1  gap-10">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((postData) => (
            <PostCard key={postData._id} postData={postData} usersData={usersData}/>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No posts found
          </p>
        )}
      </div>
    </section>
  );
};

export default AllPosts;
