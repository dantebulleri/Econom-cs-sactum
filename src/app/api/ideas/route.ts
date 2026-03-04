import { streamText } from "ai";
import { models } from "@/lib/ai/provider";
import { buildPrompt, TEMPERATURE, MAX_TOKENS } from "@/lib/prompts/idea-generator";
import { ideasSchema } from "@/lib/validators/chat";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ideasSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { area, context, paperIds } = parsed.data;

    // Si hay paperIds, cargar los abstracts de la DB
    let paperAbstracts: string[] | undefined;
    if (paperIds && paperIds.length > 0) {
      const papers = await prisma.paper.findMany({
        where: { id: { in: paperIds } },
        select: { abstract: true, title: true },
      });
      paperAbstracts = papers
        .filter((p) => p.abstract)
        .map((p) => `${p.title}: ${p.abstract}`);
    }

    const prompt = buildPrompt(area, context, paperAbstracts);

    const result = streamText({
      model: models.ideas,
      system: prompt.system,
      messages: [{ role: "user", content: prompt.user }],
      temperature: TEMPERATURE,
      maxOutputTokens: MAX_TOKENS,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[API /ideas]", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
