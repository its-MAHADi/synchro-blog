// AllPosts.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AllPostsClient from "./AllPostsClient";


async function getAllPosts() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/all-blog-posts`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error("Failed to fetch blog posts");

    return res.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

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

const AllPosts = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const usersData = await getUserByEmail(email);
  // console.log(usersData)
  const postsData = await getAllPosts();
  const sortedPosts = postsData.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
// console.log(postsData)
  return <AllPostsClient initialPosts={sortedPosts} userEmail={email} usersData={usersData} />;
};

export default AllPosts;