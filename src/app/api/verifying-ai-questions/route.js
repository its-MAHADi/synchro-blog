import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const { profession, questions, answers } = await req.json();

  if (!profession || !questions || !answers) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const formattedQA = questions
    .map((q, i) => `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] || "(no answer)"}`)
    .join("\n\n");

  const prompt = `
    You are an expert evaluator for ${profession}s.
    Evaluate all answers below. For each question, rate the answer on relevance, depth, and clarity.

    ${formattedQA}

    Now:
    1. Give each answer a score from 1 to 5.
    2. Provide short constructive feedback (2–3 sentences) per answer.
    3. Calculate an overall average score out of 5 and provide a brief summary.
    Return the output as structured JSON like this:

    {
      "results": [
        { "question": "Q1 text...", "score": 4, "feedback": "..." },
        { "question": "Q2 text...", "score": 3, "feedback": "..." }
      ],
      "average_score": 3.5,
      "summary": "Overall feedback here..."
    }
  `;

  try {
    const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Parse AI response safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!parsed) throw new Error("Invalid AI response format");

    return NextResponse.json({ success: true, ...parsed });
  } catch (error) {
    console.error("AI verification error:", error);
    return NextResponse.json({ error: "Failed to verify answers" }, { status: 500 });
  }
}
