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
        { "question": "Q2 text...", "score": 3, "feedback": "..." },
        ...
    ],
    "average_score": 3.5,
    "summary": "Overall feedback here..."
    }
    `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_ROUTER}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";

    // Try to parse the JSON portion safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!parsed) throw new Error("Failed to parse AI response");

    return NextResponse.json({ success: true, ...parsed });
  } catch (error) {
    console.error("AI verification error:", error);
    return NextResponse.json({ error: "Failed to verify answers" }, { status: 500 });
  }
}
