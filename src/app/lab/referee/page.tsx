"use client";

import { LabTool } from "@/components/lab/LabTool";

export default function RefereePage() {
  return (
    <LabTool
      moduleNumber={7}
      title="Modo Referee"
      description="Evaluación crítica como un reviewer de una revista top-5. Riguroso, justo y constructivo. Incluye recomendación final."
      inputLabel="Paper a evaluar"
      inputPlaceholder="Pegá aquí el texto del paper que querés someter a revisión..."
      apiEndpoint="/api/referee"
      buildBody={(text) => ({ text, severity: "standard" })}
    />
  );
}
