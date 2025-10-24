"use server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

// Helper function to generate random userId like "SG5R-G8SD"
function generateUserId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const part1 = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  const part2 = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `${part1}-${part2}`;
}

export const registerUser = async (payload) => {
  const { email, password, name } = payload;
  if (!email || !password || !name) {
    console.warn("registerUser: Missing required fields", payload);
    return null;
  }

  let userCollection;
  try {
    userCollection = await dbConnect(collectionNameObj.usersCollection);
  } catch (err) {
    console.error("registerUser: Failed to connect to DB", err);
    return null;
  }

  try {
    // Check if user already exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      console.log("registerUser: User already exists:", email);
      return null;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const newUser = {
      userRole: "user",
      userId: generateUserId(),
      email,
      userName: name,
      image: null,
      cover_image: null,
      password: hashedPassword,
      createdAt: new Date(),
      last_log_in: new Date(),
      memberStatus: false,
      failedLoginAttempts: 0,
      lockUntil: null,
      bio: "",
      profession: "",
      education: "",
      location: "",
      skills: [],
      contact_email: "",
      contact_number: null,
      website: "",
      language: [],
      followers: [],
      following: [],
    };

    // Insert into DB
    const result = await userCollection.insertOne(newUser);
    console.log(
      "registerUser: User inserted:",
      email,
      result.insertedId.toString()
    );

    return { ...newUser, _id: result.insertedId.toString() };
  } catch (err) {
    console.error("registerUser: Error inserting user", err);
    return null;
  }
};