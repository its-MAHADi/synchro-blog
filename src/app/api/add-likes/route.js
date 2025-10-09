import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    // 1️⃣ Check user login
    if (!session || !session.user?.email) {
      return new Response(
        JSON.stringify({ success: false, message: "You must be logged in to like a blog." }),
        { status: 401 }
      );
    }

    const { blogId } = await req.json();

    // 2️⃣ Validate blogId
    if (!blogId || !ObjectId.isValid(blogId)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid blog ID." }),
        { status: 400 }
      );
    }

    // 3️⃣ Connect to collection
    const blogCollection = await dbConnect("blogs");

    // 4️⃣ Increment like count
    const result = await blogCollection.updateOne(
      { _id: new ObjectId(blogId) },
      { $inc: { likes: 1 } }
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Blog not found or like not updated." }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Like added successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding like:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error." }),
      { status: 500 }
    );
  }
}
