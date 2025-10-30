import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    // ✅ Check admin session
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access. Admins only." },
        { status: 403 }
      );
    }

    // ✅ Connect to collections
    const blogCollection = await dbConnect(collectionNameObj.blogCollection);
    const usersCollection = await dbConnect(collectionNameObj.usersCollection);
    const commentCollection = await dbConnect(
      collectionNameObj.commentCollection
    );

    // ✅ Count documents
    const total_posts = await blogCollection.countDocuments();
    const total_users = await usersCollection.countDocuments();
    const total_comments = await commentCollection.countDocuments();

    // ✅ Return response
    return NextResponse.json({
      total_posts,
      total_users,
      total_comments,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
