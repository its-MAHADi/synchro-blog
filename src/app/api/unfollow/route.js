import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUserEmail = session.user.email;
    const { targetEmail } = await req.json();

    if (!targetEmail) {
      return NextResponse.json(
        { error: "Target email required" },
        { status: 400 }
      );
    }

    if (currentUserEmail === targetEmail) {
      return NextResponse.json(
        { error: "Cannot unfollow yourself" },
        { status: 400 }
      );
    }

    const usersCollection = await dbConnect(collectionNameObj.usersCollection);

    // Remove current user from target's followers
    await usersCollection.updateOne(
      { email: targetEmail },
      { $pull: { followers: currentUserEmail } }
    );

    // Remove target from current user's following
    await usersCollection.updateOne(
      { email: currentUserEmail },
      { $pull: { following: targetEmail } }
    );

    return NextResponse.json(
      { message: "Unfollowed successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unfollow API error:", err);
    return NextResponse.json({ error: "Failed to unfollow" }, { status: 500 });
  }
}
