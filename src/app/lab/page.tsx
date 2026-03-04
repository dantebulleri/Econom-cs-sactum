"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ToolCard } from "@/components/lab/ToolCard";

const tools = [
  {
    title: "Traductor Técnico",
    description:
      "Traducí papers y textos académicos manteniendo la terminología económica precisa.",
    href: "/lab/translator",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <path d="M5 8l6 10M4 14h8M2 5h12M7 2L7 5" />
        <path d="M22 22l-5-10-5 10M14 18h6" />
      </svg>
    ),
  },
  {
    title: "Analizador de Papers",
    description:
      "Diseccioná cualquier paper: estructura, supuestos, metodología, hipótesis y resultados.",
    href: "/lab/analyzer",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    title: "Generador de Ideas",
    description:
      "Identificá gaps en la literatura y generá ideas de investigación originales y viables.",
    href: "/lab/ideas",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Modo Referee",
    description:
      "Evaluación crítica como un reviewer de revista top-5. Riguroso, justo y constructivo.",
    href: "/lab/referee",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
];

export default function LabPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 pt-24 pb-16">
      <AnimatedSection delay={0.1}>
        <div className="mb-10">
          <p className="mb-2 font-sans text-xs uppercase tracking-widest text-text-muted">
            Herramientas
          </p>
          <h1 className="font-serif text-3xl font-normal text-text-primary">
            Laboratorio
          </h1>
          <p className="mt-2 max-w-lg font-sans text-sm text-text-tertiary">
            Herramientas de IA especializadas para cada etapa de tu
            investigación.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {tools.map((tool, i) => (
          <ToolCard key={tool.href} {...tool} delay={0.15 + i * 0.08} />
        ))}
      </div>
    </main>
  );
}
