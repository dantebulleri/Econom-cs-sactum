import { searchAll } from "@/lib/search/aggregator";
import { searchSchema } from "@/lib/validators/chat";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const parsed = searchSchema.safeParse({
      query: searchParams.get("q") ?? "",
      source: searchParams.get("source") ?? "all",
      limit: Number(searchParams.get("limit") ?? 10),
    });

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { query, source, limit } = parsed.data;
    const results = await searchAll(query, source, limit);

    return Response.json({ results, count: results.length });
  } catch (error) {
    console.error("[API /search]", error);
    return Response.json(
      { error: "Error al buscar papers" },
      { status: 500 }
    );
  }
}
