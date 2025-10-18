"use client";

import React, { useRef, useState } from "react";
import { Camera, Image, Upload, User, Sparkles } from "lucide-react";

export default function SignupCoverProfile({ onSubmit }) {
  const [coverFile, setCoverFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const MAX_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  function fileToPreview(file, setPreview) {
    if (!file) return setPreview(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }

  function validateFile(file) {
    if (!file) return "No file provided";
    if (!ALLOWED_TYPES.includes(file.type)) return "Only JPG, PNG or WEBP allowed";
    if (file.size > MAX_SIZE) return `File too large (max 5MB)`;
    return "";
  }

  function handleFileSelect(e, type) {
    const file = e.target.files?.[0];
    const err = file ? validateFile(file) : "";
    if (type === "cover") {
      if (!err && file) {
        setCoverFile(file);
        fileToPreview(file, setCoverPreview);
      } else {
        setCoverFile(null);
        setCoverPreview(null);
      }
    } else {
      if (!err && file) {
        setProfileFile(file);
        fileToPreview(file, setProfilePreview);
      } else {
        setProfileFile(null);
        setProfilePreview(null);
      }
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

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    if (coverFile) fd.append("cover", coverFile);
    if (profileFile) fd.append("profile", profileFile);
    if (onSubmit) onSubmit(fd);
    else console.log("Form submitted", [...fd.entries()]);
  }

  function handleSkip() {
    const fd = new FormData();
    if (onSubmit) onSubmit(fd);
    else console.log("Skipped image upload");
  }

  return (
    <div className="min-h-screen my-20 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Almost there!</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Create Your Profile
          </h1>
          <p className="text-gray-600 text-lg">Make your profile shine with stunning visuals</p>
        </div>

        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            
            {/* Profile Photo Section */}
            <div className="flex justify-center mb-12">
              <div className="relative group">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50 transition-all duration-300 group-hover:ring-purple-200 group-hover:scale-105">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="object-cover w-full h-full transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-100 to-pink-100 text-purple-400">
                      <User className="w-12 h-12 mb-2" />
                      <p className="text-sm font-medium">Add Photo</p>
                    </div>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Camera className="w-6 h-6 mx-auto mb-1" />
                      <p className="text-xs font-medium">Change</p>
                    </div>
                  </div>
                </div>

                {/* Change button */}
                <button
                  type="button"
                  onClick={() => profileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl"
                >
                  <Camera className="w-5 h-5" />
                </button>

                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, "profile")}
                  className="hidden"
                />
              </div>
            </div>

            {/* Cover Photo Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5 text-purple-600" />
                <label className="text-lg font-semibold text-gray-800">Cover Photo</label>
              </div>
              
              <div
                className={`relative border-2 border-dashed rounded-2xl overflow-hidden h-48 sm:h-64 lg:h-80 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  isDragOver 
                    ? 'border-purple-400 bg-purple-50 scale-102' 
                    : coverPreview 
                      ? 'border-transparent' 
                      : 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 hover:border-purple-400 hover:bg-purple-50'
                }`}
                onClick={() => coverInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {coverPreview ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-medium">Change Cover</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-lg font-semibold text-gray-800 mb-2">
                      {isDragOver ? 'Drop your image here!' : 'Drag & drop or click to upload'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Recommended size: 1200×300 • JPG, PNG, WEBP • Max 5MB
                    </div>
                  </div>
                )}
                
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, "cover")}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleSkip}
              className="px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:shadow-md"
            >
              Skip for now
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}