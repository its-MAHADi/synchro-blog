"use client";
import React, { Suspense } from "react";
import OTPForm from "./OTPForm";

export default function OTPVerificationPage() {
  return (
    <section className="bg-[#f6f5ea] min-h-screen flex justify-center items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <OTPForm />
      </Suspense>
    </section>
  );
}
