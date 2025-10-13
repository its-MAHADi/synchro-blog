import React from "react";
import PostCart from "./PostCart";
import AllPostHeader from "./ui/AllPostHeader";

export const metadata = {
  title: "All Posts",
  description:
    "The purpose of Synchro - AI-Powered Blogging Site is to simplify and enhance the process of creating, managing, and publishing blog content by leveraging artificial intelligence.",
};

const AllPostPage = async () => {
  // ✅ Fetch from your API route
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all-blog-posts`, {
    cache: "no-store", // ensures fresh data on each request
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  const postsData = await res.json();

  return (
    <section className="max-w-11/12 mx-auto">
      <div>
        <AllPostHeader />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
        {postsData.length > 0 ? (
          postsData.map((postData) => (
            <PostCart key={postData._id} postData={postData} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No posts found</p>
        )}
      </div>
    </section>
  );
};

export default AllPostPage;
