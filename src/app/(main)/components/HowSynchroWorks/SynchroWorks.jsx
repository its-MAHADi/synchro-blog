"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaRobot,
  FaSearch,
  FaGlobe,
  FaQuestionCircle,
  FaShareAlt,
  FaChartLine,
} from "react-icons/fa";

// Steps for the Synchro "How It Works" timeline
const steps = [
  {
    id: 1,
    icon: <FaRobot size={26} className="text-[#c45627]" />,
    title: "AI-Powered Content Creation",
    description:
      "Quickly generate blog posts, outlines, headlines, and more using advanced AI tools tailored to your voice and audience.",
  },
  {
    id: 2,
    icon: <FaSearch size={26} className="text-[#c45627]" />,
    title: "Smart SEO Optimization",
    description:
      "Get real-time keyword suggestions, meta tags, readability insights, and structured data tips to maximize search visibility.",
  },
  {
    id: 3,
    icon: <FaGlobe size={26} className="text-[#c45627]" />,
    title: "One-Click Multilingual Support",
    description:
      "Instantly translate and localize your content to reach global audiences with consistent quality and tone.",
  },
  {
    id: 4,
    icon: <FaQuestionCircle size={26} className="text-[#c45627]" />,
    title: "Content Repurposing Tools",
    description:
      "Easily transform your blog posts into newsletters, social media snippets, or content summaries to maximize reach and reuse.",

  },
  {
    id: 5,
    icon: <FaShareAlt size={26} className="text-[#c45627]" />,
    title: "Effortless Publishing & Sharing",
    description:
      "Plan, schedule, and publish content seamlessly. Auto-share to social platforms and collaborate with your team in real-time.",
  },
  {
    id: 6,
    icon: <FaChartLine size={26} className="text-[#c45627]" />,
    title: "AI-Driven Analytics",
    description:
      "Track performance, engagement, and content ROI with actionable insights powered by intelligent analytics.",
  },
];


// Project description under the main heading
const ProjectDescription = () => (
  <p className="max-w-3xl mx-auto pt-2 pb-8 text-center text-lg text-gray-700 mt-4">
    Synchro is an AI-powered blogging platform that helps writers create SEO-optimized, multilingual content faster with intelligent drafting, workflows, and analytics.
  </p>
);

// Step item component (animated with hover zoom)
const StepItem = ({ step, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      whileHover={{
        scale: 1.03,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      className="lg:flex lg:items-center lg:w-full lg:relative lg:cursor-pointer"
    >
      {/* Left column (even steps text) */}
      {isEven ? (
        <div className="hidden lg:block w-1/2 pr-8 text-right">
          <h3 className="text-2xl font-bold text-[#c45627]">{step.title}</h3>
          <p className="text-gray-600 mt-2 text-lg">{step.description}</p>
        </div>
      ) : (
        <div className="w-1/2"></div>
      )}

      {/* Center icon */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
        className="hidden lg:flex relative items-center justify-center w-12 h-12 bg-white border-4 border-[#c45627] rounded-full z-10 shadow-lg"
      >
        {step.icon}
      </motion.div>

      {/* Right column (odd steps text) */}
      {!isEven ? (
        <div className="hidden lg:block w-1/2 pl-8 text-left">
          <h3 className="text-2xl font-bold text-[#c45627]">{step.title}</h3>
          <p className="text-gray-600 mt-2 text-lg">{step.description}</p>
        </div>
      ) : (
        <div className="w-1/2"></div>
      )}

      <div className="lg:hidden block bg-[#f6f5ea] max-w-4xl mx-auto p-4 rounded-r-2xl">
        <div>
            <h3 className="text-2xl font-bold text-[#c45627]">{step.title}</h3>
            <p className="text-gray-600 mt-2 text-lg">{step.description}</p>
        </div>
      </div>
    </motion.div>
    
  );
};

// Main component
export default function SynchroWorks() {
  return (
    <section className="max-w-screen-xl mx-auto px-4 mt-20 mb-20">
      <h1 className="text-4xl md:text-5xl text-center font-bold bg-gradient-to-br from-[#853716] via-[#ed703b] to-[#853716] bg-clip-text text-transparent mb-5">
        Synchro Works Differently
      </h1>

      <ProjectDescription />

      <div className="relative container mx-auto py-16">
        {/* Vertical line */}
        <div className="hidden lg:block absolute left-1/2 top-0 w-1 h-full bg-[#c45627] transform -translate-x-1/2"></div>

        <div className="space-y-16 mt-2 lg:mt-8">
          {steps.map((s, idx) => (
            <StepItem key={s.id} step={s} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
