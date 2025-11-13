import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // 🔹 Check if logged in
    if (!session || !session.user?.email) {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401 }
      );
    }

    const currentUserEmail = session.user.email;

    // ✅ Connect DB
    const usersCollection = await dbConnect(collectionNameObj.usersCollection);

    // 🔹 Find current user and get following emails
    const currentUser = await usersCollection.findOne(
      { email: currentUserEmail },
      { projection: { following: 1, _id: 0 } }
    );

    if (!currentUser) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    const followingEmails = currentUser.following || [];

    // 🔹 If no following, return empty array
    if (followingEmails.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    // 🔹 Get all followed users FULL DATA
    const followedUsers = await usersCollection
      .find({ email: { $in: followingEmails } })
      .toArray(); // ⬅️ পুরো ডেটা নিচ্ছে (projection নাই)

    return new Response(JSON.stringify(followedUsers), { status: 200 });
  } catch (error) {
    console.error("API Error (/api/messageUser):", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
