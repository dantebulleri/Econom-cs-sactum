import { z } from "zod";

export const createPaperSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  authors: z.array(z.string()).min(1, "Al menos un autor es requerido"),
  abstract: z.string().optional(),
  year: z.number().int().min(1900).max(2100).optional(),
  journal: z.string().optional(),
  doi: z.string().optional(),
  url: z.string().url().optional().or(z.literal("")),
  pdfUrl: z.string().url().optional().or(z.literal("")),
  fullText: z.string().optional(),
  source: z
    .enum(["semantic-scholar", "arxiv", "crossref", "manual"])
    .default("manual"),
  status: z.enum(["unread", "reading", "read", "archived"]).default("unread"),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const updatePaperSchema = createPaperSchema.partial().extend({
  rating: z.number().int().min(1).max(5).optional(),
  status: z.enum(["unread", "reading", "read", "archived"]).optional(),
});

export type CreatePaperInput = z.infer<typeof createPaperSchema>;
export type UpdatePaperInput = z.infer<typeof updatePaperSchema>;
