"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface Document {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  status: "draft" | "published" | "review";
  tags: string[];
}

const documents: Document[] = [
  {
    id: "1",
    title: "Análisis de Inflación Q4 2025",
    category: "Macroeconomía",
    date: "28 Feb 2026",
    excerpt: "Estudio exhaustivo de las tendencias inflacionarias del último trimestre, con foco en economías latinoamericanas y proyecciones para 2026.",
    status: "draft",
    tags: ["inflación", "latam", "2025"],
  },
  {
    id: "2",
    title: "Modelo de Equilibrio General Dinámico",
    category: "Modelos",
    date: "25 Feb 2026",
    excerpt: "Implementación de un modelo DSGE con fricciones financieras para analizar el impacto de shocks monetarios en economías abiertas.",
    status: "published",
    tags: ["DSGE", "modelos", "monetaria"],
  },
  {
    id: "3",
    title: "Notas sobre Política Monetaria Moderna",
    category: "Investigación",
    date: "22 Feb 2026",
    excerpt: "Reflexiones sobre la MMT y sus implicaciones para la política fiscal en países en desarrollo. Análisis crítico del marco teórico.",
    status: "draft",
    tags: ["MMT", "política monetaria", "fiscal"],
  },
  {
    id: "4",
    title: "Reporte Mercados Emergentes",
    category: "Reportes",
    date: "18 Feb 2026",
    excerpt: "Análisis comparativo del desempeño de mercados emergentes en el contexto de tasas de interés globales elevadas.",
    status: "review",
    tags: ["emergentes", "mercados", "tasas"],
  },
  {
    id: "5",
    title: "Series de Tiempo: Metodología VAR",
    category: "Econometría",
    date: "15 Feb 2026",
    excerpt: "Guía metodológica para la estimación de modelos VAR con aplicaciones a datos macroeconómicos de Argentina.",
    status: "published",
    tags: ["VAR", "econometría", "series de tiempo"],
  },
  {
    id: "6",
    title: "Elasticidad de Demanda en Mercados Digitales",
    category: "Microeconomía",
    date: "10 Feb 2026",
    excerpt: "Estimación de elasticidades precio-demanda en plataformas de e-commerce. Modelos de competencia imperfecta.",
    status: "draft",
    tags: ["elasticidad", "digital", "microeconomía"],
  },
  {
    id: "7",
    title: "Impacto Fiscal del Gasto Público 2025",
    category: "Política Fiscal",
    date: "05 Feb 2026",
    excerpt: "Evaluación del multiplicador fiscal en contextos de consolidación. Evidencia empírica de programas de inversión pública.",
    status: "published",
    tags: ["fiscal", "gasto público", "multiplicador"],
  },
  {
    id: "8",
    title: "Causalidad de Granger en Datos de Panel",
    category: "Econometría",
    date: "01 Feb 2026",
    excerpt: "Revisión de tests de causalidad para datos de panel con aplicaciones a la relación entre apertura comercial y crecimiento.",
    status: "review",
    tags: ["Granger", "panel", "causalidad"],
  },
];

const categories = [
  "Todos",
  "Macroeconomía",
  "Microeconomía",
  "Econometría",
  "Modelos",
  "Investigación",
  "Reportes",
  "Política Fiscal",
];

const statusConfig = {
  draft: { label: "Borrador", className: "bg-warning/15 text-warning" },
  published: { label: "Publicado", className: "bg-success/15 text-success" },
  review: { label: "En revisión", className: "bg-accent/15 text-accent" },
};

export default function VaultPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = documents.filter((doc) => {
    const matchesCategory =
      activeCategory === "Todos" || doc.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="mx-auto max-w-6xl px-6 pt-24 pb-16">
      {/* ─── Header ─── */}
      <AnimatedSection delay={0.1}>
        <div className="mb-8">
          <p className="mb-2 font-sans text-xs uppercase tracking-widest text-text-muted">
            Archivo
          </p>
          <h1 className="font-serif text-3xl font-normal tracking-tight text-text-primary">
            Bóveda de Documentos
          </h1>
          <p className="mt-2 max-w-lg font-sans text-sm text-text-tertiary">
            Tu colección personal de investigaciones, análisis y notas
            académicas, organizada por categorías.
          </p>
        </div>
      </AnimatedSection>

      {/* ─── Search ─── */}
      <AnimatedSection delay={0.15}>
        <div className="mb-6">
          <div className="relative">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por título, etiqueta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-border bg-background py-2.5 pl-9 pr-4 font-sans text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* ─── Category Filters ─── */}
      <AnimatedSection delay={0.2}>
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-3 py-1 font-sans text-xs transition-all ${
                activeCategory === cat
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-text-tertiary hover:border-accent-light hover:text-text-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* ─── Results count ─── */}
      <AnimatedSection delay={0.25}>
        <p className="mb-4 font-sans text-xs text-text-muted">
          {filtered.length} documento{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "Todos" && ` en ${activeCategory}`}
        </p>
      </AnimatedSection>

      {/* ─── Document Grid ─── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((doc) => (
            <motion.article
              key={doc.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="group cursor-pointer rounded-lg border border-border bg-surface/50 p-5 transition-colors hover:border-accent-light hover:bg-surface-hover"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-sans text-[10px] uppercase tracking-widest text-text-muted">
                  {doc.category}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 font-sans text-[10px] font-medium ${statusConfig[doc.status].className}`}
                >
                  {statusConfig[doc.status].label}
                </span>
              </div>

              <h3 className="mb-2 font-serif text-base text-text-primary transition-colors group-hover:text-accent">
                {doc.title}
              </h3>

              <p className="mb-4 font-sans text-xs leading-relaxed text-text-tertiary line-clamp-2">
                {doc.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {doc.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border-subtle bg-background px-1.5 py-0.5 font-mono text-[10px] text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-sans text-[11px] text-text-muted">
                  {doc.date}
                </span>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <p className="font-serif text-sm italic text-text-tertiary">
            No se encontraron documentos con esos criterios.
          </p>
        </div>
      )}
    </main>
  );
}
