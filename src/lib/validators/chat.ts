import { z } from "zod";

export const chatMessageSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1),
      })
    )
    .min(1, "Al menos un mensaje es requerido"),
  conversationId: z.string().optional(),
});

export const translateSchema = z.object({
  text: z.string().min(1, "El texto a traducir es requerido"),
  sourceLang: z.string().default("inglés"),
  targetLang: z.string().default("español"),
});

export const analyzeSchema = z.object({
  text: z.string().min(1, "El texto del paper es requerido"),
  paperId: z.string().optional(),
});

export const ideasSchema = z.object({
  area: z.string().min(1, "El área de interés es requerida"),
  context: z.string().optional(),
  paperIds: z.array(z.string()).optional(),
});

export const refereeSchema = z.object({
  text: z.string().min(1, "El texto del paper es requerido"),
  paperId: z.string().optional(),
  severity: z.enum(["standard", "strict"]).default("standard"),
});

export const searchSchema = z.object({
  query: z.string().min(1, "La búsqueda es requerida"),
  source: z
    .enum(["all", "semantic-scholar", "arxiv", "crossref"])
    .default("all"),
  limit: z.number().int().min(1).max(50).default(10),
});

export type ChatInput = z.infer<typeof chatMessageSchema>;
export type TranslateInput = z.infer<typeof translateSchema>;
export type AnalyzeInput = z.infer<typeof analyzeSchema>;
export type IdeasInput = z.infer<typeof ideasSchema>;
export type RefereeInput = z.infer<typeof refereeSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
