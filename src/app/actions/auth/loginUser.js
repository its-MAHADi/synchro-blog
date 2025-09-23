"use server"

import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcrypt';

export const loginUser = async (payload) => {
  
  const { email, password } = payload;
const userCollection = dbConnect("users"); // ✅ await
  const user = await userCollection.findOne({ email });
  if (!user) return null;

  const isPasswordOk = await bcrypt.compare(password, user.password); // ✅ await
  if (!isPasswordOk) return null;

  // Update last login time
  await userCollection.updateOne(
    { _id: user._id },
    { $set: { last_log_in: new Date() } }
  );

  return user;
}
