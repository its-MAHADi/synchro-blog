// src/app/(main)/components/AllPosts.jsx
import AllPostsClient from "./AllPostsClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Fetch all blog posts
async function getAllPosts() {
  try {
    const res = await fetch(`${BASE_URL}/api/all-blog-posts`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch blog posts: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Fetch user by email
async function getUserByEmail(email) {
  if (!email) return null;

  try {
    const res = await fetch(`${BASE_URL}/api/user?email=${email}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

const AllPosts = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || null;

  const usersData = await getUserByEmail(email);
  const postsData = await getAllPosts();

  // Sort newest first
  const sortedPosts = postsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  console.log("Users Data:", usersData);
  console.log("Posts Data:", sortedPosts);

  return <AllPostsClient initialPosts={sortedPosts} userEmail={email} usersData={usersData} />;
};

export default AllPosts;
