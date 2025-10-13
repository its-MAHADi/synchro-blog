import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new Response(
        JSON.stringify({ success: false, message: "You must be logged in to like a post." }),
        { status: 401 }
      );
    }

    const { blogId } = await req.json();
    const userEmail = session.user.email;

    if (!blogId || !ObjectId.isValid(blogId)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid blog ID." }),
        { status: 400 }
      );
    }

    const blogCollection = await dbConnect("blogs");
    const blog = await blogCollection.findOne({ _id: new ObjectId(blogId) });

    if (!blog) {
      return new Response(
        JSON.stringify({ success: false, message: "Blog not found." }),
        { status: 404 }
      );
    }

    let liked;

    if (blog.likedUsers?.includes(userEmail)) {
      // Already liked → remove like (dislike)
      await blogCollection.updateOne(
        { _id: new ObjectId(blogId) },
        { $inc: { likes: -1 }, $pull: { likedUsers: userEmail } }
      );
      liked = false;
    } else {
      // Not liked → add like
      await blogCollection.updateOne(
        { _id: new ObjectId(blogId) },
        { $inc: { likes: 1 }, $push: { likedUsers: userEmail } }
      );
      liked = true;
    }

    const updatedBlog = await blogCollection.findOne({ _id: new ObjectId(blogId) });

    return new Response(
      JSON.stringify({
        success: true,
        liked,
        likes: updatedBlog.likes,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling like:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error." }),
      { status: 500 }
    );
  }
}
