"use server";


import  dbConnect  from "@/lib/dbConnect";

import bcrypt from "bcrypt";

export const loginUser = async ({ email, password }) => {
  const userCollection = await dbConnect("users");
  const user = await userCollection.findOne({ email });

  if (!user) return { error: "Invalid email or password" };

  const now = new Date();

  // 1️⃣ Reset failed login attempts if lockUntil has passed
  if (user.lockUntil && user.lockUntil <= now) {
    await userCollection.updateOne(
      { _id: user._id },
      { $set: { failedLoginAttempts: 0, lockUntil: null } }
    );
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
  }

  // 2️⃣ Check if account is still locked
  if (user.lockUntil && user.lockUntil > now) {
    const minutesLeft = Math.ceil((user.lockUntil - now) / 60000);
    return {
      error: `Your account is locked. Try again in ${minutesLeft} minutes.`,
    };
  }

  // 3️⃣ Check password (guard in case no password is set)
  if (!user.password) {
    return { error: "This account has no password set. Please use social login." };
  }

  const isPasswordOk = await bcrypt.compare(password, user.password);
  if (!isPasswordOk) {
    let failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
    let lockUntil = null;
    let errorMessage = "Invalid email or password";

    if (failedLoginAttempts === 3) {
      errorMessage = "warning-2-left"; // frontend handles this
    }

    if (failedLoginAttempts === 5) {
      lockUntil = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes
      errorMessage = "Your account is locked for 15 minutes.";
    }

    await userCollection.updateOne(
      { _id: user._id },
      { $set: { failedLoginAttempts, lockUntil } }
    );

    return { error: errorMessage };
  }

  // 4️⃣ Successful login → reset counters + update last login
  await userCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        failedLoginAttempts: 0,
        lockUntil: null,
        last_log_in: now,
      },
    }
  );

  // ✅ Explicitly return fields NextAuth needs
  return {
    user: {
      _id: user._id,
      userName: user.userName ?? null,   // optional
      name: user.userName ?? user.email, // fallback to email
      email: user.email,
      userRole: user.userRole ?? "user", // ✅ include role
    },
  };
};
