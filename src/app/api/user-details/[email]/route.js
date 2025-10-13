// File: app/api/user-details/[email]/route.js

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// Projection for GET
const projection = {
  image: 1,
  userName: 1,
  email: 1,
  work: 1,
  education: 1,
  location: 1,
  skills: 1,
  website: 1,
  languages: 1,
  createdAt: 1,
  contact_email: 1,
  contact_number: 1,
  followers: 1,
  following: 1,
};

const defaultData = {
  work: "",
  education: "",
  location: "",
  skills: "",
  website: "",
  languages: "",
  contact_email: "",
  contact_number: "",
  followers: [],
  following: [],
};

// ---------------- GET ----------------
export async function GET(_, { params }) {
  const { email } = params;
  if (!email) {
    return NextResponse.json(
      { success: false, message: "Email missing" },
      { status: 400 }
    );
  }

  try {
    const users = dbConnect(collectionNameObj.usersCollection);
    const user = await users.findOne({ email }, { projection });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const { _id, ...rest } = user;

    const formattedUser = {
      ...defaultData,
      ...rest,
      skills: Array.isArray(user.skills)
        ? user.skills.join(", ")
        : user.skills || "",
      languages: Array.isArray(user.languages)
        ? user.languages.join(", ")
        : user.languages || "",
    };

    return NextResponse.json({ success: true, user: formattedUser });
  } catch (error) {
    console.error("GET user-details error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ---------------- PATCH ----------------
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { email, ...updateFields } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email missing" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.email || session.user.email !== email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const allowedFields = [
      "work",
      "education",
      "location",
      "skills",
      "website",
      "languages",
      "contact_email",
      "contact_number",
    ];

    const updateData = Object.fromEntries(
      Object.entries(updateFields).filter(([key]) =>
        allowedFields.includes(key)
      )
    );

    if (updateData.skills && typeof updateData.skills === "string") {
      updateData.skills = updateData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (updateData.languages && typeof updateData.languages === "string") {
      updateData.languages = updateData.languages
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean);
    }

    const users = dbConnect(collectionNameObj.usersCollection);
    const result = await users.findOneAndUpdate(
      { email },
      { $set: updateData },
      { returnDocument: "after", projection }
    );

    if (!result.value) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const updatedUser = result.value;

    return NextResponse.json({
      success: true,
      message: "Details updated successfully",
      user: {
        ...updatedUser,
        skills: Array.isArray(updatedUser.skills)
          ? updatedUser.skills.join(", ")
          : "",
        languages: Array.isArray(updatedUser.languages)
          ? updatedUser.languages.join(", ")
          : "",
      },
    });
  } catch (error) {
    console.error("PATCH user-details error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
