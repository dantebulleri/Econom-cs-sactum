/**
 * POST /api/economic-chat
 *
 * Endpoint del chat económico restrictivo.
 * - Valida input con Zod
 * - Filtra mensajes no-económicos ANTES de llamar al LLM (ahorro de tokens)
 * - Delega al servicio para prompt + streaming
 * - Devuelve streaming text o error JSON
 */

import { chatMessageSchema } from "@/lib/validators/chat";
import {
  isEconomicsRelated,
  createEconomicChatStream,
} from "@/services/economicChatService";

const REJECTION_MESSAGE = "Este entorno está diseñado exclusivamente para economía.";

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

    // Extraer el último mensaje del usuario para el filtro pre-LLM
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user");

    if (lastUserMessage && !isEconomicsRelated(lastUserMessage.content)) {
      return Response.json(
        { error: REJECTION_MESSAGE },
        { status: 400 }
      );
    }

    // Llamar al servicio — toda la lógica de prompt/modelo vive allá
    const result = createEconomicChatStream(messages);

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[API /economic-chat]", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
