import { streamText } from "ai";
import { models } from "@/lib/ai/provider";
import { buildPrompt, TEMPERATURE, MAX_TOKENS } from "@/lib/prompts/referee";
import { refereeSchema } from "@/lib/validators/chat";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = refereeSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { text, severity } = parsed.data;
    const prompt = buildPrompt(text, severity);

    const result = streamText({
      model: models.referee,
      system: prompt.system,
      messages: [{ role: "user", content: prompt.user }],
      temperature: TEMPERATURE,
      maxOutputTokens: MAX_TOKENS,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[API /referee]", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
