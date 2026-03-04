"use client";

import { LabTool } from "@/components/lab/LabTool";

export default function IdeasPage() {
  return (
    <LabTool
      moduleNumber={6}
      title="Generador de Ideas"
      description="Identificá gaps en la literatura y generá ideas de investigación originales con pregunta, hipótesis y metodología sugerida."
      inputLabel="Área de interés"
      inputPlaceholder="Describí tu área de interés, el contexto de tu investigación, y opcionalmente los papers que ya leíste sobre el tema..."
      apiEndpoint="/api/ideas"
      buildBody={(text) => ({ area: text })}
    />
  );
}
