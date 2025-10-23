// src/app/api/notification/route.js
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// ➕ Create Notification (POST)
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.senderEmail || !body.receiverEmail || !body.type) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const collection = await dbConnect(collectionNameObj.notificationCollection);

    const newNotification = {
      senderEmail: body.senderEmail,
      receiverEmail: body.receiverEmail,
      type: body.type, // "like" | "comment" | "follow"
      message: body.message || "",
      postId: body.postId || null, // 🔑 keep postId for navigation
      read: false,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newNotification);

    return new Response(
      JSON.stringify({ success: true, data: { ...newNotification, _id: result.insertedId } }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error creating notification:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to create notification" }),
      { status: 500 }
    );
  }
}

// 🔍 Get all notifications for a specific user (GET)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, message: "Email is required" }),
        { status: 400 }
      );
    }

    const collection = await dbConnect(collectionNameObj.notificationCollection);

    const notifications = await collection
      .find({ receiverEmail: email })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return new Response(
      JSON.stringify({ success: true, data: notifications }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch notifications" }),
      { status: 500 }
    );
  }
}

// ➕ Mark as read (PATCH)
export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("notificationId");

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: "Notification ID required" }),
        { status: 400 }
      );
    }

    const collection = await dbConnect(collectionNameObj.notificationCollection);

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { read: true } }
    );

    if (result.modifiedCount > 0) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Nothing updated" }), { status: 400 });
    }
  } catch (err) {
    console.error("Error marking notification as read:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to mark read" }),
      { status: 500 }
    );
  }
}
