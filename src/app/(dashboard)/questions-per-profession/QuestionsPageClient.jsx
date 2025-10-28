"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function QuestionsPageClient() {
  const params = useSearchParams();
  const profession = params.get("profession") || "Writer";

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const manualQuestionMap = {
    Writer: "How do you avoid plagiarism in your writing?",
    Developer: "What is your approach to debugging complex code?",
    Blogger: "What makes a blog truly engaging?",
    Designer: "How do you deal with creative block?",
    Gamer: "How do you balance gaming and real life?",
  };

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);

      const manual =
        manualQuestionMap[profession] ||
        `What's your favorite thing about being a ${profession}?`;

      try {
        const res = await fetch("/api/generate-ai-questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profession }),
        });

        const data = await res.json();
        const aiQs = data.questions || [];
        const allQs = [manual, ...aiQs.slice(0, 4)];

        setQuestions(allQs);
        setAnswers(Array(allQs.length).fill(""));
      } catch (err) {
        console.error(err);
        Swal.fire(
          "Error",
          "Failed to generate questions. Try again later.",
          "error"
        );
        setQuestions([manual]);
        setAnswers([""]);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [profession]);

  const handleInputChange = (e, index) => {
    const updated = [...answers];
    updated[index] = e.target.value;
    setAnswers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.some((a) => !a.trim())) {
      Swal.fire(
        "Oops!",
        "Please answer all questions before submitting.",
        "warning"
      );
      return;
    }

    Swal.fire({
      title: "All questions answered!",
      text: "Do you want to submit your answers for AI verification?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, verify",
      cancelButtonText: "Review answers",
    }).then((result) => {
      if (result.isConfirmed) setSubmitted(true);
    });
  };

  const handleVerifyAll = async () => {
    try {
      Swal.fire({
        title: "Verifying your answers...",
        text: "Please wait while AI reviews them.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await fetch("/api/verifying-ai-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profession, questions, answers }),
      });

      const data = await res.json();
      Swal.close();

      const { results, average_score, summary } = data;

      let feedbackHtml = `
        <div class="text-left">
          <p><strong>Average Score:</strong> ${average_score.toFixed(2)} / 5</p>
          <p><strong>Summary:</strong> ${summary}</p>
          <hr class="my-3" />
          <ul>
            ${results
              .map(
                (r) => `
                <li class="mb-3">
                  <p><strong>Question:</strong> ${r.question}</p>
                  <p><strong>Score:</strong> ${r.score}</p>
                  <p><strong>Feedback:</strong> ${r.feedback}</p>
                </li>`
              )
              .join("")}
          </ul>
        </div>
      `;

      if (average_score >= 4) {
        if (!userEmail) throw new Error("User not authenticated");

        await fetch("/api/update-profession", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail, profession }),
        });

        Swal.fire({
          icon: "success",
          title: "Excellent Work! 🎉",
          html: `
            <p>Your average score is <strong>${average_score.toFixed(
              2
            )}</strong>.</p>
            <p>You’re now eligible to apply to the <strong>${profession}</strong> community!</p>
          `,
          confirmButtonText: "Go to Profile",
        }).then(() => {
          window.location.href = "/user-dashboard/profile";
        });
        return;
      }

      const retryKey = `retryCount_${profession}`;
      let retryCount = parseInt(localStorage.getItem(retryKey) || "0");
      retryCount += 1;
      localStorage.setItem(retryKey, retryCount.toString());

      if (retryCount >= 3) {
        Swal.fire({
          icon: "info",
          title: "Need Expert Review 🧠",
          html: `
            ${feedbackHtml}
            <p class="mt-3">You've attempted this test 3 times. You can now <strong>apply to the ${profession} community</strong> for personalized review and guidance.</p>
          `,
          confirmButtonText: "Apply to Community",
          allowOutsideClick: false,
        }).then(() => {
          window.location.href = "/apply-to-community";
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Please Retake the Questions 😔",
          html: feedbackHtml,
          confirmButtonText: "Retake",
          allowOutsideClick: false,
        }).then(() => {
          setAnswers(Array(questions.length).fill(""));
          setSubmitted(false);
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to verify answers. Try again later.", "error");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-blue-600 space-y-4">
        <div className="flex items-center justify-center space-x-2 text-blue-600">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full [animation-delay:-0.15s] animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
        <p>
          Generating questions for <span className="font-semibold">{profession}</span>...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          {submitted ? "All Questions Answered!" : `Questions for ${profession}`}
        </h1>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((q, i) => (
              <div key={i}>
                <p className="text-slate-700 mb-2 font-medium">{i + 1}. {q}</p>
                <textarea
                  rows={4}
                  value={answers[i]}
                  onChange={(e) => handleInputChange(e, i)}
                  className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-600 cursor-pointer text-white w-full py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit All Answers
            </button>
          </form>
        ) : (
          <div className="text-left">
            <h2 className="text-lg font-medium mb-4 text-slate-800">Your Answers:</h2>
            <ul className="space-y-4 mb-6">
              {questions.map((q, i) => (
                <li key={i}>
                  <p className="font-semibold text-slate-700">{q}</p>
                  <p className="text-slate-600 mt-1">{answers[i]}</p>
                </li>
              ))}
            </ul>
            <button
              onClick={handleVerifyAll}
              className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition"
            >
              Verify My Answers
            </button>
          </div>
        )}
      </div>

      <Link href="/user-dashboard/profile" className="mt-6">
        <button className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          Back to Dashboard
        </button>
      </Link>
    </div>
  );
}
