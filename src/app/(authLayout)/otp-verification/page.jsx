import React from 'react';
import OTPForm from "./OTPForm";

export const metadata = {
  title: "OTP | Synchro",
  description:
    "The purpose of Synchro - AI-Powered Blogging Site is to simplify and enhance the process of creating, managing, and publishing blog content by leveraging artificial intelligence.",
};

export default function OTPVerificationPage() {
  return (
    <section className="bg-[#f6f5ea] min-h-screen flex justify-center items-center">
      <OTPForm />  {/* child component handles all client hooks */}
    </section>
  );
}
