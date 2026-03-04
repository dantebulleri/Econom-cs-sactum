"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

interface LabToolProps {
  moduleNumber: number;
  title: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  apiEndpoint: string;
  buildBody: (text: string) => Record<string, unknown>;
  children?: React.ReactNode;
}

export function LabTool({
  moduleNumber,
  title,
  description,
  inputLabel,
  inputPlaceholder,
  apiEndpoint,
  buildBody,
}: LabToolProps) {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!inputText.trim() || isLoading) return;
    setIsLoading(true);
    setResult("");

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildBody(inputText)),
      });

      if (!res.ok) throw new Error("Error en la solicitud");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No se pudo leer la respuesta");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        // Parse the AI SDK data stream format
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("0:")) {
            try {
              const text = JSON.parse(line.slice(2));
              accumulated += text;
              setResult(accumulated);
            } catch {
              // skip unparseable chunks
            }
          }
        }
      }
    } catch {
      setResult("Error al procesar la solicitud. Verificá tu conexión y API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-6 pt-24 pb-16">
      <AnimatedSection delay={0.1}>
        <div className="mb-8">
          <p className="mb-2 font-sans text-xs uppercase tracking-widest text-text-muted">
            Módulo {moduleNumber}
          </p>
          <h1 className="font-serif text-3xl font-normal text-text-primary">
            {title}
          </h1>
          <p className="mt-2 max-w-lg font-sans text-sm text-text-tertiary">
            {description}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="rounded-lg border border-border bg-surface/50 p-5">
          <label className="mb-2 block font-sans text-xs font-medium uppercase tracking-widest text-text-muted">
            {inputLabel}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={inputPlaceholder}
            rows={8}
            className="mb-4 w-full resize-y rounded-md border border-border bg-background p-4 font-serif text-sm leading-relaxed text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
          />
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Procesando...
              </>
            ) : (
              "Analizar"
            )}
          </Button>
        </div>
      </AnimatedSection>

      {result && (
        <AnimatedSection delay={0}>
          <div className="mt-6 rounded-lg border border-border bg-surface/50 p-6">
            <h2 className="mb-4 font-sans text-xs font-medium uppercase tracking-widest text-text-muted">
              Resultado
            </h2>
            <MarkdownRenderer content={result} />
          </div>
        </AnimatedSection>
      )}
    </main>
  );
}
