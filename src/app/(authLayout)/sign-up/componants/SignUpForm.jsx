"use client";

import { registerUser } from "@/app/actions/auth/registerUser";
import Image from "next/image";
import Swal from "sweetalert2";
import React from "react";

export default function SignUpForm() {
  const router = useRouter();

  const handleGoogleLogin = () => {
  signIn("google", { callbackUrl: "/" }); // redirect to homepage after login
};

const handleGithubLogin = () => {
  signIn("github", { callbackUrl: "/" }); // redirect to homepage after login
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value; 

    try {
      const result = await registerUser({ name, email, password });
      if (result?.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Your account has been created!',
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          router.push('/sign-in');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // JSX **function body থেকে আলাদা return করতে হবে**
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f5ea] px-4 ">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden mt-20 ">
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
            Get Started Now
          </h1>
          <p className="text-gray-600 mb-6 text-center md:text-left">
            Please create your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#c45627]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#c45627]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#c45627]"
            />
            <button
              type="submit"
              className="w-full bg-[#c45627] text-white py-3 rounded-lg hover:bg-[#a9441f] transition"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-gray-500">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Sign In */}
          <button
  onClick={handleGoogleLogin}
  type="button"
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
{/* git hub */}
<button
  onClick={handleGithubLogin}
  type="button"
  className="mt-4 w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition"
>
  <Image
    src="https://www.svgrepo.com/show/512317/github-142.svg"
    alt="GitHub"
    width={24}
    height={24}
  />
  <span className="text-[#213943] font-medium">
    Continue with GitHub
  </span>
</button>


          {/* Sign In Link */}
          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/sign-in" className="text-[#c45627] font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
