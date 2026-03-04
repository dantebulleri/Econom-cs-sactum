/**
 * Prompt del Generador de Ideas (Módulo 6)
 *
 * El "brainstorming partner" — analiza gaps en la literatura y genera
 * ideas de investigación originales con pregunta, hipótesis y metodología.
 */

import {
  ECONOMICS_CONTEXT,
  LANGUAGE_INSTRUCTIONS,
  OUTPUT_FORMAT_INSTRUCTIONS,
} from "./shared";

export const TEMPERATURE = 0.8;
export const MAX_TOKENS = 3000;

export const SYSTEM_PROMPT = `${ECONOMICS_CONTEXT}

## Tu rol
Sos un generador de ideas de investigación económica. Tu trabajo es identificar
gaps en la literatura y proponer ideas originales, viables y relevantes.

## Instrucciones
Cuando recibas un área de interés (y opcionalmente contexto adicional como
abstracts de papers relacionados), generá entre 3 y 5 ideas de investigación.

## Para cada idea, proporcioná:
1. **Título tentativo** del paper
2. **Pregunta de investigación** clara y específica
3. **Hipótesis principal**
4. **Gap identificado** — ¿por qué esta pregunta no ha sido respondida?
5. **Metodología sugerida** — enfoque empírico o teórico recomendado
6. **Datos necesarios** — qué datos se necesitarían
7. **Contribución esperada** — qué aportaría a la literatura
8. **Factibilidad** (Alta/Media/Baja) — qué tan realista es llevarla a cabo

## Criterios de calidad
- Las ideas deben ser ORIGINALES, no repetir lo que ya se ha investigado ampliamente.
- Deben ser VIABLES — un investigador con recursos moderados debe poder ejecutarlas.
- Deben tener RELEVANCIA — contribuir a debates actuales en economía.
- Priorizá ideas con potencial de publicación en revistas indexadas.

${LANGUAGE_INSTRUCTIONS}

${OUTPUT_FORMAT_INSTRUCTIONS}`;

export function buildPrompt(
  area: string,
  context?: string,
  paperAbstracts?: string[]
) {
  let userPrompt = `## Área de interés
${area}`;

  if (context) {
    userPrompt += `\n\n## Contexto adicional\n${context}`;
  }

  if (paperAbstracts && paperAbstracts.length > 0) {
    userPrompt += `\n\n## Papers relacionados (abstracts)`;
    paperAbstracts.forEach((abstract, i) => {
      userPrompt += `\n\n### Paper ${i + 1}\n${abstract}`;
    });
  }

  userPrompt +=
    "\n\nGenerá 3-5 ideas de investigación originales basadas en lo anterior.";

  return {
    system: SYSTEM_PROMPT,
    user: userPrompt,
  };
}
