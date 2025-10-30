"use client";
import React, { useState } from "react";
import {
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  Users,
  Bell,
  TrendingUp,
  Star
} from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  const features = [
    { icon: Mail, text: "Weekly curated content" },
    { icon: Users, text: "Expert insights & tips" },
    { icon: TrendingUp, text: "Industry trends" },
    { icon: Star, text: "Exclusive resources" },
  ];

  return (
    <section className="w-full py-20 px-4 -mt-30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-blue-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side - Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold mb-6 border border-white/30 animate-fadeIn">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>Weekly Newsletter</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight animate-fadeInUp">
                  Get Weekly Insights
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed animate-fadeInUp" style={{ animationDelay: "100ms" }}>
                  From professionals you admire, delivered straight to your inbox.
                </p>

                {/* Features list */}
                <div className="space-y-4 mb-8">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 animate-slideIn"
                        style={{ animationDelay: `${200 + index * 100}ms` }}
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-medium">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-blue-50/30">
              {isSubmitted ? (
                <div className="text-center animate-scaleIn">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white mb-6 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">You're all set!</h3>
                  <p className="text-gray-600 mb-6">
                    Check your inbox for a confirmation email. We'll send you amazing content every week!
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Bell className="w-4 h-4" />
                    <span>First newsletter coming this Sunday</span>
                  </div>
                </div>
              ) : (
                <div className="animate-fadeInUp">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Join Our Community
                    </h3>
                    <p className="text-gray-600">
                      Subscribe now and never miss an update from the professionals you follow.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Email Input */}
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSubmit();
                          }
                        }}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-900 placeholder-gray-400 font-medium"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      className="group w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Subscribe Now</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </div>

                  {/* Privacy note */}
                  <p className="mt-6 text-xs text-center text-gray-500 leading-relaxed">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates. Unsubscribe anytime.
                  </p>

                  {/* Trust badges */}
                  <div className="mt-6 flex items-center justify-center gap-4 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                      </div>
                      <span>No spam</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200"></div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                      </div>
                      <span>Unsubscribe anytime</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}