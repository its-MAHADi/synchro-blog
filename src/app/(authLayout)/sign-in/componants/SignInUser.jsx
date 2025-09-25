"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function SignInForm() {
  const router = useRouter();

  //Sign in handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      if (res.error === "warning-2-left") {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "3 failed attempts. You have 2 attempts left!",
        });   
      } else if (res.error.startsWith("Your account is locked")) {
        Swal.fire({
          icon: "error",
          title: "Account Locked",
          text: res.error,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: res.error,
        });
      }
    } else {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full px-4 py-3 border rounded-lg"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full px-4 py-3 border rounded-lg"
      />
      <button
        type="submit"
        className="w-full bg-[#c45627] text-white py-3 rounded-lg cursor-pointer"
      >
        Sign In
      </button>
    </form>
  );
}
