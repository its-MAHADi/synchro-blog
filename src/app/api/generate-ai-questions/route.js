import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const { profession } = await req.json();

  if (!profession) {
    return NextResponse.json({ error: "Profession is required" }, { status: 400 });
  }

  const prompt = `
  You are an expert interviewer.
  Generate 4 medium-hard questions for a professional ${profession}.
  - Questions must require reasoning or experience-based answers.
  - Avoid simple definitions or beginner-level questions.
  - Make them practical, analytical, and thought-provoking.
  Return only the questions, each on a new line.
  `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_ROUTER}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    const questions = content
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q)
      .map((q) => q.replace(/^\d+\.\s*/, ""));

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("AI generation error:", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}