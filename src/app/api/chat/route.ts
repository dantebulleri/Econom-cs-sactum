import { streamText } from "ai";
import { models } from "@/lib/ai/provider";
import { SYSTEM_PROMPT, TEMPERATURE, MAX_TOKENS } from "@/lib/prompts/chat-economist";
import { chatMessageSchema } from "@/lib/validators/chat";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatMessageSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { messages } = parsed.data;

    const result = streamText({
      model: models.chat,
      system: SYSTEM_PROMPT,
      messages,
      temperature: TEMPERATURE,
      maxOutputTokens: MAX_TOKENS,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[API /chat]", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
