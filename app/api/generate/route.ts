import { openai } from "@/lib/ai";
import { buildPrompt } from "@/lib/prompt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { match } = body;

    if (!match) {
      return Response.json(
        { error: "match is required" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: buildPrompt(match),
        },
      ],
    });

    const result = response.choices[0].message.content;

    return Response.json({
      success: true,
      result,
    });
  } catch (error) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}