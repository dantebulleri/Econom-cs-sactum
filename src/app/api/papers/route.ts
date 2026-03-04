import { prisma } from "@/lib/db";
import { createPaperSchema } from "@/lib/validators/paper";

// GET /api/papers — Listar papers con filtros
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("q");
    const limit = Number(searchParams.get("limit") ?? 50);

    const papers = await prisma.paper.findMany({
      where: {
        ...(category ? { category: { name: category } } : {}),
        ...(status ? { status } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search } },
                { abstract: { contains: search } },
              ],
            }
          : {}),
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
        notes: { orderBy: { updatedAt: "desc" }, take: 1 },
        _count: { select: { analyses: true, notes: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });

    return Response.json({ papers, count: papers.length });
  } catch (error) {
    console.error("[API GET /papers]", error);
    return Response.json(
      { error: "Error al obtener papers" },
      { status: 500 }
    );
  }
}

// POST /api/papers — Crear un paper nuevo
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createPaperSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { tags, ...data } = parsed.data;

    const paper = await prisma.paper.create({
      data: {
        ...data,
        authors: JSON.stringify(data.authors),
        url: data.url || null,
        pdfUrl: data.pdfUrl || null,
        ...(tags && tags.length > 0
          ? {
              tags: {
                create: tags.map((tagName) => ({
                  tag: {
                    connectOrCreate: {
                      where: { name: tagName },
                      create: { name: tagName },
                    },
                  },
                })),
              },
            }
          : {}),
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    return Response.json({ paper }, { status: 201 });
  } catch (error) {
    console.error("[API POST /papers]", error);
    return Response.json(
      { error: "Error al crear paper" },
      { status: 500 }
    );
  }
}
