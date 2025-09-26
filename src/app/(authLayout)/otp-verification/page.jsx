
import React from 'react';
import OTPFrom from "./OTPFrom";
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

export const metadata = {
  title: "OTP | Synchro",
  description:
    "The purpose of Synchro - AI-Powered Blogging Site is to simplify and enhance the process of creating, managing, and publishing blog content by leveraging artificial intelligence.",
};
const router = useRouter();
const searchParams = useSearchParams();

export default function OTPVerificationPage() {

  return (
    <section className="bg-[#f6f5ea] min-h-screen flex justify-center items-center">
      <OTPFrom router={router} searchParams={searchParams}/>

    </section>
  );
}
