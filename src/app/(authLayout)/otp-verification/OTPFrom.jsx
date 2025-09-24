"use client";
import React, { useState } from 'react';
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";

const OTPFrom = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const password = searchParams.get("password") || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        if (!otp || otp.length !== 6) {
            Swal.fire({
                icon: "warning",
                title: "Invalid OTP",
                text: "Please enter a 6-digit OTP.",
            });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: otp.trim() }),
            });
            const data = await res.json();

            if (res.ok) {
                // Auto-login
                const loginResult = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                setLoading(false);

                if (loginResult?.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Verified & Logged In",
                        text: "Welcome! Redirecting...",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    router.push("/signupCoverProfile"); // go home
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Login Failed",
                        text: "Please try signing in manually.",
                    });
                }
            } else {
                setLoading(false);
                Swal.fire({ icon: "error", title: "Error", text: data.message });
            }
        } catch (error) {
            setLoading(false);
            console.error("OTP verification error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <div className="flex justify-center  px-4 bg-[#f6f5ea] ">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">OTP Verification</h1>
                <p className="text-gray-600 mb-4 text-center">
                    Enter the OTP sent to <span className="font-medium">{email}</span>
                </p>

                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
                    maxLength={6}
                    placeholder="Enter OTP"
                    className="border p-3 rounded-lg w-full text-center text-xl tracking-widest mb-4 focus:outline-none focus:ring-2 focus:ring-[#c45627]"
                />

                <button
                    onClick={handleVerify}
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-[#c45627] text-white py-3 rounded-lg hover:bg-[#a03e1c] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>
            </div>
        </div>
    );
};

export default OTPFrom;