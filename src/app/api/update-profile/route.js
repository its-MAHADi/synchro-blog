// app/api/update-profile/route.js (App Router)
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function PATCH(req) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const { email, image } = body;

    if (!email || !image) {
      return new Response(
        JSON.stringify({ success: false, message: "Email and image are required" }),
        { status: 400 }
      );
    }

    // Connect to users collection
    const usersCol = await dbConnect(collectionNameObj.usersCollection);
    const postsCol = await dbConnect(collectionNameObj.blogCollection);

    // Update user profile image
    const userUpdateResult = await usersCol.updateOne(
      { email },
      { $set: { image } }
    );

    if (userUpdateResult.matchedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    // Update all posts by this user with new author_image
    const postsUpdateResult = await postsCol.updateMany(
      { author_email: email },
      { $set: { author_image: image } }
    );

    console.log("Profile updated. Posts updated:", postsUpdateResult.modifiedCount);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Profile and all posts updated!",
        updatedPosts: postsUpdateResult.modifiedCount,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Profile update error:", err);
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 }
    );
  }
}
