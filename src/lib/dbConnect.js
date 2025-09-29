
import { MongoClient, ServerApiVersion } from 'mongodb';

export const collectionNameObj = {
  usersCollection: 'users',
  eventCollection: 'events',
  blogCollection: 'blogs',
  followerCollection: 'followers',
  featuresCollection: 'features',
};

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let client;
let clientPromise;

if (!uri) throw new Error("Please add your MongoDB URI to .env");

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1 } });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1 } });
  clientPromise = client.connect();
}

export default async function dbConnect(collectionName) {
  const client = await clientPromise;
  const db = client.db(dbName);
  return db.collection(collectionName);
}