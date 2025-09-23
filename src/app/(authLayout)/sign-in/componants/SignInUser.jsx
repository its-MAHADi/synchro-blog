"use client"
import React from 'react'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2';


export default function SigninUser() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value
    const password = form.password.value
    try {
      const response = await signIn("credentials", { email, password, callbackUrl: "/", redirect: false })
      // console.log(response)
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          router.push("/");
        }, 5000)
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Wrong Candidate',
          text: '!!!',
          timer: 2000,
          showConfirmButton: false,
        });
      }

    }
    catch (error) {
      console.log(error)
      alert('wrong')
    }

    //   console.log(email, password)

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name='email'
        placeholder="Email"
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#c45627]"
      />
      <input
        type="password"
        name='password'
        placeholder="Password"
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#c45627]"
      />
      <button
        type="submit"
        className="w-full bg-[#c45627] cursor-pointer text-white py-3 rounded-lg hover:bg-[#a9441f] transition"
      >
        Sign In
      </button>
    </form>
  )
}
