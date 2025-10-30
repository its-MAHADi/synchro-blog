import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    // এখানে collectionName দিয়ে কল করতে হবে
    const usersCollection = await dbConnect(collectionNameObj.usersCollection);

    // প্রথমে user খুঁজে বের করো
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // followers array থেকে তাদের তথ্য বের করো
    const followers = user.followers || [];

    if (followers.length === 0) {
      return NextResponse.json({ followers: [] }, { status: 200 });
    }

    // যেসব email followers এ আছে, তাদের ডেটা আনো
    const followersData = await usersCollection
      .find({ email: { $in: followers } })
      .project({ userName: 1, email: 1, image: 1 })
      .toArray();

    return NextResponse.json({ followers: followersData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching followers:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
