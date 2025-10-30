"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfessionalsTest() {
  const questions = [
    {
      id: 1,
      question: "Which activity do you enjoy the most?",
      options: [
        { text: "Coding or building apps", type: "developer" },
        { text: "Designing graphics or layouts", type: "designer" },
        { text: "Writing stories or blogs", type: "writer" },
        { text: "Taking photos or editing", type: "photographer" },
      ],
    },
    {
      id: 2,
      question: "Which tool do you prefer working with?",
      options: [
        { text: "VS Code or GitHub", type: "developer" },
        { text: "Figma or Photoshop", type: "designer" },
        { text: "Notion or Google Docs", type: "writer" },
        { text: "Lightroom or a camera", type: "photographer" },
      ],
    },
    {
      id: 3,
      question: "How do you express creativity?",
      options: [
        { text: "By creating useful software", type: "developer" },
        { text: "By visual design and aesthetics", type: "designer" },
        { text: "Through words and storytelling", type: "writer" },
        { text: "Through visuals and photography", type: "photographer" },
      ],
    },
    {
      id: 4,
      question: "What’s your favorite kind of project?",
      options: [
        { text: "Tech startup or app idea", type: "developer" },
        { text: "Branding or website UI", type: "designer" },
        { text: "Blog or online magazine", type: "writer" },
        { text: "Travel or lifestyle shoot", type: "photographer" },
      ],
    },
  ];

  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  const handleSelect = (qid, type) => {
    setAnswers((prev) => ({ ...prev, [qid]: type }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions!");
      return;
    }

    // Count answers
    const counts = {};
    Object.values(answers).forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });

    // Get the top result
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const resultType = sorted[0][0];
    setResult(resultType);
    setShowResult(true);
  };

  const professionDetails = {
    developer:
      "You love solving problems and building things. A Developer profession fits you best!",
    designer:
      "You have an eye for aesthetics and love creating beautiful visuals — you’re a Designer at heart!",
    writer:
      "You express yourself through words — you’d shine as a Writer or Content Creator!",
    photographer:
      "You see beauty in moments and visuals — Photography or Visual Media suits you best!",
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Blogger Profession Test
        </h1>
        <p className="text-gray-600 mb-8">
          Answer these questions to discover which creative profession fits you best!
        </p>

        <AnimatePresence>
          {!showResult ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {questions.map((q) => (
                <Card key={q.id} className="p-5 shadow-sm hover:shadow-md transition-all">
                  <CardContent>
                    <h3 className="font-semibold text-gray-800 mb-3">{q.question}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelect(q.id, opt.type)}
                          className={`p-3 rounded-xl border text-sm transition-all duration-300 ${
                            answers[q.id] === opt.type
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-300 hover:bg-blue-50"
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                onClick={handleSubmit}
                className="mt-6 px-8 py-3 text-lg rounded-xl"
              >
                Submit Test
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 bg-white rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4 capitalize text-blue-600">
                You’re a {result}!
              </h2>
              <p className="text-gray-700 mb-6">{professionDetails[result]}</p>
              <button
                variant="outline"
                onClick={() => {
                  setShowResult(false);
                  setAnswers({});
                }}
              >
                Retake Test
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
