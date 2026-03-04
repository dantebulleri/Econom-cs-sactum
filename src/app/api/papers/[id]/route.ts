import { prisma } from "@/lib/db";
import { updatePaperSchema } from "@/lib/validators/paper";

// GET /api/papers/[id] — Obtener un paper con todo su detalle
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const paper = await prisma.paper.findUnique({
      where: { id },
      include: {
        category: true,
        tags: { include: { tag: true } },
        notes: { orderBy: { updatedAt: "desc" } },
        analyses: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!paper) {
      return Response.json(
        { error: "Paper no encontrado" },
        { status: 404 }
      );
    }

    return Response.json({ paper });
  } catch (error) {
    console.error("[API GET /papers/id]", error);
    return Response.json(
      { error: "Error al obtener paper" },
      { status: 500 }
    );
  }
}

// PUT /api/papers/[id] — Actualizar un paper
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = updatePaperSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { tags, authors, ...data } = parsed.data;

    const paper = await prisma.paper.update({
      where: { id },
      data: {
        ...data,
        ...(authors ? { authors: JSON.stringify(authors) } : {}),
        url: data.url || undefined,
        pdfUrl: data.pdfUrl || undefined,
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    return Response.json({ paper });
  } catch (error) {
    console.error("[API PUT /papers/id]", error);
    return Response.json(
      { error: "Error al actualizar paper" },
      { status: 500 }
    );
  }
}

// DELETE /api/papers/[id] — Eliminar un paper
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.paper.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    console.error("[API DELETE /papers/id]", error);
    return Response.json(
      { error: "Error al eliminar paper" },
      { status: 500 }
    );
  }
}
