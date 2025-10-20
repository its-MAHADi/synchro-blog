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
};

// Global variable to reuse client in dev
let cachedClient = global._mongoClient;

export default async function dbConnect(collectionName) {
  if (cachedClient) return cachedClient.db(process.env.DB_NAME).collection(collectionName);

  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: { version: ServerApiVersion.v1 },
  });

  await client.connect();
  cachedClient = client;
  global._mongoClient = client;

  return client.db(process.env.DB_NAME).collection(collectionName);
}
