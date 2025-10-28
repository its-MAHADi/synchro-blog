import { NextResponse } from "next/server";
import dbConnect,{ collectionNameObj } from "@/lib/dbConnect";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    // users collection connect করা হলো
    const usersCollection = await dbConnect(collectionNameObj.usersCollection);

    // user খুঁজে বের করো
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // following list বের করো
    const following = user.following || [];

    if (following.length === 0) {
      return NextResponse.json({ following: [] }, { status: 200 });
    }

    // যাদের follow করা হয়েছে, তাদের তথ্য আনো
    const followingData = await usersCollection
      .find({ email: { $in: following } })
      .project({ userName: 1, email: 1, image: 1 })
      .toArray();

    return NextResponse.json({ following: followingData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching following:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
