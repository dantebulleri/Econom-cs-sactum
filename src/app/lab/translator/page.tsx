"use client";

import { LabTool } from "@/components/lab/LabTool";

export default function TranslatorPage() {
  return (
    <LabTool
      moduleNumber={2}
      title="Traductor Técnico"
      description="Traducciones de calidad publicable que preservan la terminología económica, ecuaciones y referencias bibliográficas."
      inputLabel="Texto a traducir"
      inputPlaceholder="Pegá aquí el texto del paper en inglés (o cualquier idioma)..."
      apiEndpoint="/api/translate"
      buildBody={(text) => ({
        text,
        sourceLang: "inglés",
        targetLang: "español",
      })}
    />
  );
}
