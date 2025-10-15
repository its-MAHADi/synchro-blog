import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { message } = await req.json();

  // Restrict the AI’s topic
  const systemPrompt = `
You are a friendly AI assistant for an AI blog website.

- Always answer questions about:
  1. Blog post title suggestions
  2. The AI blog website itself (features, ideas, improvements)
  3. Future plans for this blog website
- You can also respond naturally to greetings, pleasantries, or general website questions.
- If the user asks something completely unrelated (like sports, movies, personal advice), reply politely:
  "Sorry, I can only talk about blog titles, this AI blog website, or its future plans."

Make your responses smart, helpful, friendly, and natural.
`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;
    return new Response(JSON.stringify({ reply }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ reply: "Something went wrong." }), {
      status: 500,
    });
  }
}
