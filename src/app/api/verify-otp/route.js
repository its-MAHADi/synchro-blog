import { otpStore } from "@/lib/otpStore";
import { registerUser } from "@/app/actions/auth/registerUser";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new Response(
        JSON.stringify({ message: "Email and OTP are required" }),
        { status: 400 }
      );
    }

    const record = otpStore[email];
    console.log("verify-otp record:", record); // debug

    if (!record) {
      return new Response(
        JSON.stringify({ message: "OTP not found. Please request a new one." }),
        { status: 400 }
      );
    }

    if (Date.now() > record.expiresAt) {
      delete otpStore[email];
      return new Response(
        JSON.stringify({ message: "OTP expired. Please try again." }),
        { status: 400 }
      );
    }

    if (record.otp !== otp) {
      return new Response(JSON.stringify({ message: "Invalid OTP." }), {
        status: 400,
      });
    }

    // ✅ Register user
    const result = await registerUser({
      name: record.name,
      email,
      password: record.password,
    });

    delete otpStore[email]; // cleanup

    if (!result) {
      return new Response(JSON.stringify({ message: "User already exists." }), {
        status: 409,
      });
    }

    return new Response(
      JSON.stringify({ message: "OTP verified and user registered!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("verify-otp error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
