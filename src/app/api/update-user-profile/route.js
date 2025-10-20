"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import fs from "fs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const email = formData.get("email");
    const bio = formData.get("bio") || "";
    const work = formData.get("work") || "";
    const education = formData.get("education") || "";
    const location = formData.get("location") || "";
    const website = formData.get("website") || "";
    const language = formData.get("language") ? formData.get("language").split(",") : [];

    const profileImage = formData.get("profile"); // File
    const coverImage = formData.get("cover"); // File

    const userCollection = dbConnect(collectionNameObj.usersCollection);

    // For simplicity, let's store base64 image strings
    let updateData = { bio, work, education, location, website, language };

    if (profileImage && profileImage.size > 0) {
      const buffer = Buffer.from(await profileImage.arrayBuffer());
      updateData.image = `data:${profileImage.type};base64,${buffer.toString("base64")}`;
    }

    if (coverImage && coverImage.size > 0) {
      const buffer = Buffer.from(await coverImage.arrayBuffer());
      updateData.cover_image = `data:${coverImage.type};base64,${buffer.toString("base64")}`;
    }

    const result = await userCollection.updateOne(
      { email },
      { $set: updateData }
    );

    if (result.modifiedCount > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "No changes made" });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}


// console.log({
//   email,
//   bio,
//   work,
//   education,
//   location,
//   website,
//   language,
//   profileFile,
//   coverFile
// });
 