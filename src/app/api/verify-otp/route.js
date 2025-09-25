// app/api/verify-otp/route.js

import { otpStore } from "@/lib/otpStore"; // Import from the centralized store
import { registerUser } from "@/app/actions/auth/registerUser"; // Import your user registration function

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new Response(
        JSON.stringify({ message: "Email and OTP are required" }),
        {
          status: 400,
        }
      );
    }

    const record = otpStore[email];

    // 1. Check if an OTP request even exists for this email
    if (!record) {
      return new Response(
        JSON.stringify({ message: "Invalid request. Please sign up again." }),
        {
          status: 400,
        }
      );
    }

    // 2. Check if the OTP has expired
    if (Date.now() > record.expiresAt) {
      delete otpStore[email]; // Clean up the expired record
      return new Response(
        JSON.stringify({ message: "OTP has expired. Please try again." }),
        {
          status: 400,
        }
      );
    }

    // 3. Check if the OTP is correct
    if (record.otp !== otp) {
      return new Response(
        JSON.stringify({
          message: "Invalid OTP. Please check the code and try again.",
        }),
        {
          status: 400,
        }
      );
    }

    // OTP is valid! Now we create the user using your centralized function.
    const registrationPayload = {
      name: record.name,
      email: email,
      password: record.password, // Use the temporarily stored plain password
    };

    const result = await registerUser(registrationPayload);

    // IMPORTANT: Clean up the OTP record from the store immediately after use
    delete otpStore[email];

    if (!result) {
      // This case is handled by your registerUser function (e.g., user already exists)
      return new Response(
        JSON.stringify({ message: "User with this email already exists." }),
        { status: 409 } // 409 Conflict is a good status code for this
      );
    }

    // If registration is successful, send a success response.
    // The front-end will now proceed with the auto-login.
    return new Response(
      JSON.stringify({
        message: "OTP verified and account created successfully!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during OTP verification:", error);
    // Attempt to clean up the record in case of an unexpected error
    try {
        const { email } = await req.json();
        if (email && otpStore[email]) {
            delete otpStore[email];
        }
    } catch (e) {
        // Ignore if request body can't be parsed again
    }
    return new Response(
      JSON.stringify({
        message: "An internal server error occurred during verification.",
      }),
      { status: 500 }
    );
  }
}
