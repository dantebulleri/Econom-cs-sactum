import { streamText } from "ai";
import { models } from "@/lib/ai/provider";
import { buildPrompt, TEMPERATURE, MAX_TOKENS } from "@/lib/prompts/analyzer";
import { analyzeSchema } from "@/lib/validators/chat";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = analyzeSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { text } = parsed.data;
    const prompt = buildPrompt(text);

    const result = streamText({
      model: models.analysis,
      system: prompt.system,
      messages: [{ role: "user", content: prompt.user }],
      temperature: TEMPERATURE,
      maxOutputTokens: MAX_TOKENS,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[API /analyze]", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
