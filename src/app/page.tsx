"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const modules = [
  {
    title: "Buscador de Papers",
    description: "Semantic Scholar, arXiv y CrossRef en un solo lugar",
    href: "/search",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "Chat Económico",
    description: "Tu colega economista con PhD, siempre disponible",
    href: "/chat",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Laboratorio IA",
    description: "Traductor, analizador, generador de ideas y referee",
    href: "/lab",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <path d="M9 3h6v7l4 9H5l4-9V3z" />
        <line x1="9" y1="3" x2="15" y2="3" />
      </svg>
    ),
  },
  {
    title: "Bóveda de Documentos",
    description: "Tu colección personal de papers con notas y análisis",
    href: "/vault",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Lienzo de Pensamiento",
    description: "Espacio limpio para ideas, borradores y conexiones",
    href: "/canvas",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
];

export default function Home() {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Buenos días"
      : currentHour < 18
        ? "Buenas tardes"
        : "Buenas noches";

  return (
    <main className="mx-auto max-w-5xl px-6 pt-24 pb-16">
      {/* ─── Hero ─── */}
      <AnimatedSection delay={0.1}>
        <div className="mb-12">
          <p className="mb-2 font-sans text-xs uppercase tracking-widest text-text-muted">
            {greeting}
          </p>
          <h1 className="font-serif text-3xl font-normal tracking-tight text-text-primary">
            Economic Lab
          </h1>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-text-tertiary">
            Tu laboratorio privado de investigación económica. Buscá papers,
            conversá con IA especializada, analizá trabajos y organizá tu
            producción intelectual.
          </p>
        </div>
      </AnimatedSection>

      {/* ─── Module Grid ─── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod, i) => (
          <motion.div
            key={mod.href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Link
              href={mod.href}
              className="group block rounded-lg border border-border bg-surface/50 p-5 transition-all hover:border-accent-light hover:bg-surface-hover"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background transition-colors group-hover:border-accent">
                {mod.icon}
              </div>
              <h2 className="mb-1 font-serif text-base text-text-primary transition-colors group-hover:text-accent">
                {mod.title}
              </h2>
              <p className="font-sans text-xs leading-relaxed text-text-tertiary">
                {mod.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ─── Keynes Quote ─── */}
      <AnimatedSection delay={0.55}>
        <div className="mt-12 rounded-md border border-border-subtle bg-surface/30 p-6">
          <p className="font-serif text-sm italic leading-relaxed text-text-tertiary">
            &ldquo;La economía es la ciencia de pensar en términos de modelos,
            junto con el arte de elegir los modelos relevantes para el mundo
            contemporáneo.&rdquo;
          </p>
          <p className="mt-2 font-sans text-xs text-text-muted">
            &mdash; John Maynard Keynes
          </p>
        </div>
      </AnimatedSection>

      {/* ─── Footer ornament ─── */}
      <AnimatedSection delay={0.65}>
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-muted">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="mt-3 text-center font-sans text-[10px] uppercase tracking-[0.2em] text-text-muted">
          Economic Lab &middot; Est. 2026
        </p>
      </AnimatedSection>
    </main>
  );
}
