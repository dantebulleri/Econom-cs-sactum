"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const recentDocuments = [
  { title: "Análisis de Inflación Q4 2025", category: "Macroeconomía", date: "28 Feb", status: "draft" as const },
  { title: "Modelo de Equilibrio General", category: "Modelos", date: "25 Feb", status: "published" as const },
  { title: "Notas sobre Política Monetaria", category: "Investigación", date: "22 Feb", status: "draft" as const },
  { title: "Reporte Mercados Emergentes", category: "Reportes", date: "18 Feb", status: "review" as const },
];

const vaultCategories = [
  { name: "Macroeconomía", count: 24, icon: TrendingIcon },
  { name: "Microeconomía", count: 18, icon: GridIcon },
  { name: "Econometría", count: 12, icon: ChartIcon },
  { name: "Política Fiscal", count: 9, icon: BuildingIcon },
];

const statusColors = {
  draft: "bg-warning/15 text-warning",
  published: "bg-success/15 text-success",
  review: "bg-accent/15 text-accent",
};

const statusLabels = {
  draft: "Borrador",
  published: "Publicado",
  review: "En revisión",
};

export default function Home() {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Buenos días"
      : currentHour < 18
        ? "Buenas tardes"
        : "Buenas noches";

  return (
    <main className="mx-auto max-w-6xl px-6 pt-24 pb-16">
      {/* ─── Hero / Greeting ─── */}
      <AnimatedSection delay={0.1}>
        <div className="mb-12">
          <p className="mb-2 font-sans text-xs uppercase tracking-widest text-text-muted">
            {greeting}
          </p>
          <h1 className="font-serif text-3xl font-normal tracking-tight text-text-primary">
            Bienvenido al Sanctum
          </h1>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-text-tertiary">
            Tu espacio privado para investigación, análisis y pensamiento
            económico. Todo lo que necesitás, en un solo lugar.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* ─── Recent Documents ─── */}
        <AnimatedSection delay={0.2} className="lg:col-span-2">
          <div className="rounded-lg border border-border bg-surface/50 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-lg text-text-primary">
                Documentos Recientes
              </h2>
              <Link
                href="/vault"
                className="font-sans text-xs text-text-muted transition-colors hover:text-accent"
              >
                Ver todos &rarr;
              </Link>
            </div>

            <div className="space-y-1">
              {recentDocuments.map((doc, i) => (
                <motion.div
                  key={doc.title}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="group flex items-center justify-between rounded-md px-3 py-3 transition-colors hover:bg-surface-hover cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-text-muted"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-serif text-sm text-text-primary group-hover:text-accent transition-colors">
                        {doc.title}
                      </p>
                      <p className="font-sans text-xs text-text-muted">
                        {doc.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-2 py-0.5 font-sans text-[10px] font-medium ${statusColors[doc.status]}`}
                    >
                      {statusLabels[doc.status]}
                    </span>
                    <span className="font-sans text-xs text-text-muted">
                      {doc.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ─── Quick Access: Vault Categories ─── */}
        <AnimatedSection delay={0.3}>
          <div className="rounded-lg border border-border bg-surface/50 p-6">
            <h2 className="mb-5 font-serif text-lg text-text-primary">
              Bóveda
            </h2>
            <div className="space-y-2">
              {vaultCategories.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <Link
                    href="/vault"
                    className="group flex items-center justify-between rounded-md px-3 py-2.5 transition-colors hover:bg-surface-hover"
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon />
                      <span className="font-sans text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                        {cat.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-text-muted">
                      {cat.count}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <Link
                href="/vault"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background py-2 font-sans text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Nuevo documento
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* ─── Thinking Canvas Preview ─── */}
      <AnimatedSection delay={0.45}>
        <div className="mt-8 rounded-lg border border-border bg-surface/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <div>
                <h2 className="font-serif text-lg text-text-primary">
                  Lienzo de Pensamiento
                </h2>
                <p className="font-sans text-xs text-text-muted">
                  Tu espacio para escribir, pensar y conectar ideas
                </p>
              </div>
            </div>
            <Link
              href="/canvas"
              className="font-sans text-xs text-text-muted transition-colors hover:text-accent"
            >
              Abrir lienzo &rarr;
            </Link>
          </div>

          <div className="rounded-md border border-border-subtle bg-background p-5">
            <p className="font-serif text-sm italic leading-relaxed text-text-tertiary">
              &ldquo;La economía es la ciencia de pensar en términos de modelos,
              junto con el arte de elegir los modelos relevantes para el mundo
              contemporáneo.&rdquo;
            </p>
            <p className="mt-2 font-sans text-xs text-text-muted">
              &mdash; John Maynard Keynes
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── Footer ornament ─── */}
      <AnimatedSection delay={0.55}>
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-text-muted"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="mt-3 text-center font-sans text-[10px] uppercase tracking-[0.2em] text-text-muted">
          Economist Sanctum &middot; Est. 2026
        </p>
      </AnimatedSection>
    </main>
  );
}

/* ─── Category Icons ─── */
function TrendingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="16" />
      <line x1="15" y1="22" x2="15" y2="16" />
      <line x1="8" y1="6" x2="10" y2="6" />
      <line x1="14" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="10" y2="10" />
      <line x1="14" y1="10" x2="16" y2="10" />
    </svg>
  );
}
