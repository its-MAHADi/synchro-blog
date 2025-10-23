'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function NextStepPage() {
  const params = useSearchParams();
  const profession = params.get('profession') || 'Writer';

  const manualQuestionMap = {
    Writer: "How do you avoid plagiarism in your writing?",
    Developer: "What is your approach to debugging complex code?",
    Blogger: "What makes a blog truly engaging?",
    Designer: "How do you deal with creative block?",
    Gamer: "How do you balance gaming and real life?",
  };

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch questions (AI + manual)
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);

      const manual = manualQuestionMap[profession] || `What's your favorite thing about being a ${profession}?`;

      try {
        const res = await fetch('/api/generate-ai-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profession }),
        });

        const data = await res.json();
        const aiQs = data.questions || [];
        const allQs = [manual, ...aiQs.slice(0, 4)];

        setQuestions(allQs);
        setAnswers(Array(allQs.length).fill(''));
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to generate questions. Try again later.', 'error');
        setQuestions([manual]);
        setAnswers(['']);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [profession]);

  // Input change
  const handleInputChange = (e) => {
    const updated = [...answers];
    updated[currentIndex] = e.target.value;
    setAnswers(updated);
  };

  // Handle next question / submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!answers[currentIndex].trim()) {
      Swal.fire("Oops!", "Please answer this question before continuing.", "warning");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Swal.fire({
        title: "All questions answered!",
        text: "Do you want to submit your answers for AI verification?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, verify",
        cancelButtonText: "Review answers",
      }).then((result) => {
        if (result.isConfirmed) {
          setSubmitted(true);
        } else {
          setCurrentIndex(0);
        }
      });
    }
  };

  // Verify all answers using AI
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

      if (!data.success) throw new Error("Verification failed");

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
                  <p><strong>Q:</strong> ${r.question}</p>
                  <p><strong>Score:</strong> ${r.score}</p>
                  <p><strong>Feedback:</strong> ${r.feedback}</p>
                </li>`
              )
              .join("")}
          </ul>
        </div>
      `;

      if (average_score < 3) {
        Swal.fire({
          icon: "warning",
          title: "Please Retake the Questions 😔",
          html: feedbackHtml,
          confirmButtonText: "Retake",
        }).then(() => {
          setAnswers(Array(questions.length).fill(""));
          setSubmitted(false);
          setCurrentIndex(0);
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Great Job 🎉",
          html: feedbackHtml,
          confirmButtonText: "Done",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to verify answers. Try again later.", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-blue-600 space-y-4">
        <div className="flex items-center justify-center space-x-2 text-blue-600">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
        <p>Generating questions for <span className="font-semibold">{profession}</span>...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          {submitted
            ? 'All Questions Answered!'
            : `Question ${currentIndex + 1} of ${questions.length} for ${profession}`}
        </h1>

        {/* ✅ Before submission — show question form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-slate-700 mb-2">{questions[currentIndex]}</p>
            <textarea
              rows={4}
              value={answers[currentIndex]}
              onChange={handleInputChange}
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </form>
        ) : (
          // ✅ After submission — show answers + verify button
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
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Verify My Answers
            </button>
          </div>
        )}
      </div>

      {/* Back button */}
      <Link href="/user-dashboard/profile" className="mt-6">
        <button className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          Back to dashboard
        </button>
      </Link>
    </div>
  );
}
