/**
 * Configuración del proveedor de IA.
 *
 * Centraliza la configuración del LLM. Todos los módulos importan desde aquí.
 * Para cambiar de proveedor (OpenAI → Claude), solo se modifica este archivo.
 */

import { createOpenAI } from "@ai-sdk/openai";

// El proveedor se configura con la API key del entorno
export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

// Modelo por defecto para cada tipo de tarea
export const models = {
  chat: openai("gpt-4o"),
  analysis: openai("gpt-4o"),
  translation: openai("gpt-4o"),
  ideas: openai("gpt-4o"),
  referee: openai("gpt-4o"),
  embedding: openai.embedding("text-embedding-3-small"),
} as const;
