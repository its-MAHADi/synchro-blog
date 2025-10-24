// src/lib/dbConnect.js
import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
  usersCollection: "users",
  blogCollection: "blogs",
  eventCollection: "events",
  followerCollection: "followers",
  featuresCollection: "features",
  commentCollection: "comments",
  messageCollection: "message",
  notificationCollection: "notification",
  applyCommunity: "applyCommunity",
};

// Use globalThis to store client in dev (works better in Next.js)
let cachedClient = globalThis._mongoClient || null;

export default async function dbConnect(collectionName) {
  if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
    throw new Error(
      "Please define MONGODB_URI and DB_NAME in your environment variables"
    );
  }

  // Reuse client if it exists
  if (cachedClient) {
    const db = cachedClient.db(process.env.DB_NAME);
    return db.collection(collectionName);
  }

  // Create new client
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    cachedClient = client;
    globalThis._mongoClient = client;

    const db = client.db(process.env.DB_NAME);
    return db.collection(collectionName);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
