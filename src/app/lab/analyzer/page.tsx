"use client";

import { LabTool } from "@/components/lab/LabTool";

export default function AnalyzerPage() {
  return (
    <LabTool
      moduleNumber={3}
      title="Analizador de Papers"
      description="Disecciona cualquier paper académico: identifica pregunta de investigación, hipótesis, metodología, supuestos clave y limitaciones."
      inputLabel="Paper a analizar"
      inputPlaceholder="Pegá aquí el texto del paper (abstract + introducción + metodología, o el paper completo)..."
      apiEndpoint="/api/analyze"
      buildBody={(text) => ({ text })}
    />
  );
}
