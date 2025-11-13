// src/app/api/users/route.js
import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // ✅ Await DB connection
    const usersCollection = await dbConnect(collectionNameObj.usersCollection);

    // Fetch user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// export async function GET(req) {
//   try {
//     const url = new URL(req.url);
//     const email = url.searchParams.get("email");

//     if (!email) {
//       return Response.json({ error: "Email is required" }, { status: 400 });
//     }

//     const usersCollection = dbConnect(collectionNameObj.usersCollection);

//     // Only fetch profile & cover images
//     const user = await usersCollection.findOne(
//       { email },
//       { projection: { image: 1, cover_image: 1 } } // ✅ Only needed fields
//     );

//     if (!user) {
//       return Response.json({ message: "User not found" }, { status: 404 });
//     }

//     return Response.json(
//       {
//         profileImage: user.image || null,
//         coverImage: user.cover_image || null,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return Response.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
