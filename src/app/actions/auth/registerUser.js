"use server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

// Helper function to generate random userId like "SG5R-G8SD"
function generateUserId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const part1 = Array.from({ length: 4 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  const part2 = Array.from({ length: 4 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `${part1}-${part2}`;
}

export const registerUser = async (payload) => {
  const userCollection = dbConnect(collectionNameObj.usersCollection);

  // Validation
  const { email, password, name } = payload;
  if (!email || !password || !name) return null;

  const existingUser = await userCollection.findOne({ email });
  if (existingUser) return null;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Prepare user object
  const newUser = {
    userRole: "user",
    userId: generateUserId(),
    email,
    userName: name,
    password: hashedPassword,
    createdAt: new Date(),
    last_log_in: null,
    memberStatus: false,
    failedLoginAttempts: 0,
    lockUntil: null
  };

  // Insert into DB
  const result = await userCollection.insertOne(newUser);
  result.insertedId = result.insertedId.toString();
  return result;
};
