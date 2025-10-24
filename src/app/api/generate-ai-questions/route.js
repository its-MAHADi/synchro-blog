import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const { profession } = await req.json();

  if (!profession) {
    return NextResponse.json(
      { error: "Profession is required" },
      { status: 400 }
    );
  }

  const prompt = `
    You are an expert interviewer.
    Generate 4 medium-hard, reasoning-based questions for a professional ${profession}.
    The questions must:
    - Require analysis, critical thinking, or experience-based insight.
    - Avoid definition or textbook-type questions.
    - Be practical and realistic for professionals in that field.
    - Questions must be concise (max 20 words each).
    Return only the questions, each on a new line.
    `;

  try {
    const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();

    // Gemini response structure:
    const content =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    const questions = content
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q)
      .map((q) => q.replace(/^\d+[\).\s-]*/, "")); // remove numbering if present

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Gemini AI generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
