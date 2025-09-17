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
    title: "AI-Assisted Writing",
    description:
      "Generate high-quality drafts, headlines, and outlines with contextual prompts — speed up writing while keeping your voice.",
  },
  {
    id: 2,
    icon: <FaSearch size={26} className="text-[#c45627]" />,
    title: "SEO Suggestions",
    description:
      "Real-time SEO tips: keywords, meta descriptions, readability scoring, and suggested internal links to boost discoverability.",
  },
  {
    id: 3,
    icon: <FaGlobe size={26} className="text-[#c45627]" />,
    title: "Multilingual Publishing",
    description:
      "Translate and localize posts automatically so your content reaches readers in multiple languages with minimal effort.",
  },
  {
    id: 4,
    icon: <FaQuestionCircle size={26} className="text-[#c45627]" />,
    title: "Q&A & Study Generator",
    description:
      "Turn articles into quizzes, FAQs, or study guides using AI — great for knowledge retention and interactive readers.",
  },
  {
    id: 5,
    icon: <FaShareAlt size={26} className="text-[#c45627]" />,
    title: "Publishing Workflow",
    description:
      "Streamlined drafting, review, scheduling, and social sharing. Collaborate with editors and publish confidently.",
  },
  {
    id: 6,
    icon: <FaChartLine size={26} className="text-[#c45627]" />,
    title: "Analytics Dashboard",
    description:
      "Track performance with traffic, engagement, and revenue insights so you know what resonates with readers.",
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
      className="flex items-center w-full relative cursor-pointer"
    >
      {/* Left column (even steps text) */}
      {isEven ? (
        <div className="w-1/2 pr-8 text-right">
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
        className="relative flex items-center justify-center w-12 h-12 bg-white border-4 border-[#c45627] rounded-full z-10 shadow-lg"
      >
        {step.icon}
      </motion.div>

      {/* Right column (odd steps text) */}
      {!isEven ? (
        <div className="w-1/2 pl-8 text-left">
          <h3 className="text-2xl font-bold text-[#c45627]">{step.title}</h3>
          <p className="text-gray-600 mt-2 text-lg">{step.description}</p>
        </div>
      ) : (
        <div className="w-1/2"></div>
      )}
    </motion.div>
  );
};

// Main component
export default function SynchroWorks() {
  return (
    <section className="max-w-screen-xl mx-auto px-4 mt-20 mb-20">
      <h1 className="text-4xl md:text-5xl text-center font-bold bg-gradient-to-r from-[#c45627] via-orange-500 to-[#c45627] bg-clip-text text-transparent">
        Get The Best, Be The Best
      </h1>

      <ProjectDescription />

      <div className="relative container mx-auto py-16">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 w-1 h-full bg-[#c45627] transform -translate-x-1/2"></div>

        <div className="space-y-16 mt-8">
          {steps.map((s, idx) => (
            <StepItem key={s.id} step={s} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
