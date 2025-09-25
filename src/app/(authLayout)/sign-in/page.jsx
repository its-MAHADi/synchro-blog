"use client";

import Footer from "@/app/(main)/components/footer/Footer";
import Navbar from "@/app/(main)/components/Navbar/Navbar";
import Image from "next/image";
import SigninUser from "./componants/SignInUser";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
    // redirect to /dashboard after login (you can change)
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-[#f6f5ea] px-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden mt-20">
          {/* Left: Illustration */}
          <div className="hidden md:flex items-center justify-center">
            <Image
              src="/images/authentication.png"
              alt="Authentication"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>

          {/* Right: Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-[#213943] mb-2 text-center md:text-left">
              Welcome Back
            </h1>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              Sign in to your account
            </p>

            <SigninUser />

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-1 border-gray-300" />
              <span className="px-3 text-gray-500">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width={24}
                height={24}
              />
              <span className="text-[#213943] font-medium">
                Continue with Google
              </span>
            </button>

            {/* Github */}
            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition mt-3"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="GitHub"
                width={24}
                height={24}
              />
              <span className="text-[#213943] font-medium">
                Continue with GitHub
              </span>
            </button>


            {/* Sign Up Link */}
            <p className="text-sm text-center text-gray-500 mt-6">
              Don&apos;t have an account?{" "}
              <a href="/sign-up" className="text-[#c45627] font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}