/**
 * Prompt del Analizador de Papers (Módulo 3)
 *
 * El "asistente de cátedra" — disecciona un paper académico y devuelve
 * un análisis estructurado en formato JSON.
 */

import { ECONOMICS_CONTEXT } from "./shared";
import { z } from "zod";

export const TEMPERATURE = 0.3;
export const MAX_TOKENS = 3000;

export const SYSTEM_PROMPT = `${ECONOMICS_CONTEXT}

## Tu rol
Sos un analista de papers académicos. Tu trabajo es leer un texto académico
de economía y producir un análisis estructurado y riguroso.

## Instrucciones
Analizá el paper y devolvé un JSON con la siguiente estructura exacta.
Si algún campo no se puede determinar del texto proporcionado, usá null.
No inventés información que no esté en el texto.

Respondé ÚNICAMENTE con el JSON, sin texto adicional.

## Estructura de respuesta (JSON)
{
  "resumen_ejecutivo": "Resumen de 2-3 oraciones del paper",
  "pregunta_investigacion": "La pregunta principal que busca responder",
  "hipotesis": ["Lista de hipótesis planteadas"],
  "marco_teorico": "El framework teórico utilizado",
  "metodologia": {
    "tipo": "Tipo de estudio (empírico, teórico, experimental, etc.)",
    "tecnicas": ["Técnicas específicas utilizadas"],
    "datos": "Descripción de los datos utilizados"
  },
  "supuestos_clave": ["Lista de supuestos fundamentales del modelo/análisis"],
  "resultados_principales": ["Lista de hallazgos principales"],
  "limitaciones": ["Limitaciones reconocidas o identificables"],
  "contribucion": "La contribución principal a la literatura",
  "papers_relacionados": ["Papers clave citados o relacionados"],
  "evaluacion_metodologica": "Evaluación breve de la solidez metodológica (1-2 oraciones)"
}`;

export const OUTPUT_SCHEMA = z.object({
  resumen_ejecutivo: z.string().nullable(),
  pregunta_investigacion: z.string().nullable(),
  hipotesis: z.array(z.string()).nullable(),
  marco_teorico: z.string().nullable(),
  metodologia: z
    .object({
      tipo: z.string().nullable(),
      tecnicas: z.array(z.string()).nullable(),
      datos: z.string().nullable(),
    })
    .nullable(),
  supuestos_clave: z.array(z.string()).nullable(),
  resultados_principales: z.array(z.string()).nullable(),
  limitaciones: z.array(z.string()).nullable(),
  contribucion: z.string().nullable(),
  papers_relacionados: z.array(z.string()).nullable(),
  evaluacion_metodologica: z.string().nullable(),
});

export type AnalysisResult = z.infer<typeof OUTPUT_SCHEMA>;

export function buildPrompt(text: string) {
  return {
    system: SYSTEM_PROMPT,
    user: `Analizá el siguiente paper académico de economía:

--- PAPER ---
${text}
--- FIN DEL PAPER ---

Respondé ÚNICAMENTE con el JSON estructurado.`,
  };
}
