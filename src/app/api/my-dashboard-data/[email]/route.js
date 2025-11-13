import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
// import { authOptions } from "@/lib/authOptions"; // Your NextAuth config

export async function GET(request, { params }) {
  const { email } = params;

  // ✅ Check if user is logged in
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to access this data." },
      { status: 401 }
    );
  }

  // Optional: Only allow users to fetch their own data
  if (session.user.email !== email) {
    return NextResponse.json(
      { error: "You are not allowed to access this user's data." },
      { status: 403 }
    );
  }

  if (!email) {
    return NextResponse.json(
      { error: "Email is required in the URL." },
      { status: 400 }
    );
  }

  try {
    const usersCollection = await dbConnect(collectionNameObj.usersCollection);
    const blogsCollection = await dbConnect(collectionNameObj.blogCollection);

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const userBlogs = await blogsCollection
      .find({ author_email: email })
      .toArray();

    const total_posts = userBlogs.length;
    const total_likes = userBlogs.reduce(
      (sum, post) => sum + (post.likes || 0),
      0
    );
    const total_comments = userBlogs.reduce(
      (sum, post) => sum + (post.comments || 0),
      0
    );

    const total_followers = Array.isArray(user.followers)
      ? user.followers.length
      : 0;
    const total_following = Array.isArray(user.following)
      ? user.following.length
      : 0;

    return NextResponse.json(
      {
        email,
        total_posts,
        total_likes,
        total_comments,
        total_followers,
        total_following,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data." },
      { status: 500 }
    );
  }
}
