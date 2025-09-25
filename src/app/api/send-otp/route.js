// app/api/send-otp/route.js

import { transporter } from "@/lib/nodemailer";
import crypto from "crypto";
import { otpStore } from "@/lib/otpStore";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
// import dbConnect, { collectionNameObj } from "@/lib/db";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "Name, email, and password required" }),
        { status: 400 }
      );
    }

    // 1️⃣ Connect DB and check if user exists
    const usersCollection = dbConnect(collectionNameObj.usersCollection);
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return new Response(
        JSON.stringify({ alreadyExists: true, message: "Account already exists" }),
        { status: 200 }
      );
    }

    // 2️⃣ Check if OTP already requested for this email
    if (otpStore[email]) {
      return new Response(
        JSON.stringify({
          alreadyExists: true,
          message: "OTP already sent. Please check your email.",
        }),
        { status: 200 }
      );
    }

    // 3️⃣ Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    otpStore[email] = { otp, name, password, expiresAt };

    // 4️⃣ Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Account Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="text-align: center; color: #333;">Welcome, ${name}!</h2>
          <p style="font-size: 16px;">Thank you for signing up. Please use the following One-Time Password (OTP) to verify your account:</p>
          <p style="text-align: center; font-size: 28px; font-weight: bold; letter-spacing: 8px; background-color: #f5f5f5; padding: 15px 20px; border-radius: 5px; margin: 20px 0;">
            ${otp}
          </p>
          <p style="font-size: 16px;">This code is valid for 5 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ message: "OTP sent successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return new Response(JSON.stringify({ message: "Failed to send OTP" }), {
      status: 500,
    });
  }
}
