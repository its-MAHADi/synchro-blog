


"use client";

import React, { useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Camera, Upload, User, Sparkles } from "lucide-react";

export default function SignupCoverProfile() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const [coverFile, setCoverFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const MAX_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  // Convert file to preview URL
  function fileToPreview(file, setPreview) {
    if (!file) return setPreview(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }

  // Validate file type & size
  function validateFile(file) {
    if (!file) return "No file provided";
    if (!ALLOWED_TYPES.includes(file.type)) return "Only JPG, PNG or WEBP allowed";
    if (file.size > MAX_SIZE) return "File too large (max 5MB)";
    return "";
  }

  // Handle file select
  function handleFileSelect(e, type) {
    const file = e.target.files?.[0];
    const err = file ? validateFile(file) : "";
    if (err) {
      Swal.fire({ icon: "error", title: err });
      return;
    }
    if (type === "cover") {
      setCoverFile(file);
      fileToPreview(file, setCoverPreview);
    } else {
      setProfileFile(file);
      fileToPreview(file, setProfilePreview);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const syntheticEvent = { target: { files: [file] } };
      handleFileSelect(syntheticEvent, "cover");
    }
  }

  // Save & Continue
  async function handleSubmit() {
    if (!email) {
      Swal.fire({ icon: "error", title: "Email missing", text: "Cannot update profile without email." });
      return;
    }

    const fd = new FormData();
    fd.append("email", email);
    if (coverFile) fd.append("cover", coverFile);
    if (profileFile) fd.append("profile", profileFile);

    try {
      const res = await fetch("/api/update-user-profile", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        Swal.fire({ icon: "success", title: "Profile Updated", timer: 1500, showConfirmButton: false });
        router.push("/");
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message || "Something went wrong" });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" });
    }
  }

  function handleSkip() {
    router.push("/");
  }

  return (
    <div className="min-h-screen my-20 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Almost there!</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Add Profile & Cover Photo
          </h1>
          <p className="text-gray-600 text-lg">Make your profile more personalized</p>
        </div>

        {/* Profile + Cover Upload */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 space-y-6">
          {/* Profile */}
          <div className="flex justify-center mb-4">
            <div className="relative group">
              <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50 transition-all duration-300 group-hover:ring-purple-200 group-hover:scale-105">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-100 to-pink-100 text-purple-400">
                    <User className="w-12 h-12 mb-2" />
                    <p className="text-sm font-medium">Add Photo</p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => profileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:scale-110"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <input ref={profileInputRef} type="file" accept="image/*" onChange={(e) => handleFileSelect(e, "profile")} className="hidden" />
              </div>
            </div>
          </div>

          {/* Cover */}
          <div
            className={`relative border-2 border-dashed rounded-2xl overflow-hidden h-48 flex items-center justify-center cursor-pointer ${
              isDragOver ? "border-purple-400 bg-purple-50" : "border-gray-300 bg-gray-100"
            }`}
            onClick={() => coverInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {coverPreview ? (
              <img src={coverPreview} alt="Cover" className="object-cover w-full h-full" />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6">
                <Upload className="w-10 h-10 text-purple-600 mb-2" />
                <p className="text-gray-700">Drag & drop or click to upload cover photo</p>
              </div>
            )}
            <input ref={coverInputRef} type="file" accept="image/*" onChange={(e) => handleFileSelect(e, "cover")} className="hidden" />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <button onClick={handleSkip} className="px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50">
              Skip for now
            </button>
            <button onClick={handleSubmit} className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
