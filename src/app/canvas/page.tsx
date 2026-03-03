"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface Note {
  id: string;
  title: string;
  content: string;
  lastEdited: string;
}

const sampleNotes: Note[] = [
  {
    id: "1",
    title: "Hipótesis sobre ciclos de deuda",
    content:
      "Los ciclos de deuda a largo plazo (Dalio) pueden modelarse como sistemas dinámicos no lineales. La acumulación de deuda privada crea vulnerabilidades sistémicas que los indicadores convencionales no capturan.\n\nPuntos clave:\n- El ratio deuda/ingreso disponible es más relevante que deuda/PIB\n- Los momentos de Minsky requieren un análisis de distribución, no solo promedios\n- La velocidad del dinero decae antes de las crisis — ¿indicador líder?",
    lastEdited: "Hace 2 horas",
  },
  {
    id: "2",
    title: "Notas de lectura: Piketty",
    content:
      "r > g como tendencia estructural, no ley universal.\n\nSin embargo, la concentración de riqueza en economías emergentes sigue patrones distintos:\n1. El capital humano tiene mayor peso relativo\n2. La informalidad distorsiona las mediciones\n3. Las transferencias intergeneracionales operan por canales no financieros",
    lastEdited: "Ayer",
  },
  {
    id: "3",
    title: "Ideas para paper: Mercados Laborales",
    content:
      "Investigar la relación entre automatización y salarios medianos en economías duales (formal/informal). Hipótesis: la automatización en el sector formal presiona a la baja los salarios del sector informal a través de un efecto de desplazamiento.",
    lastEdited: "3 Mar",
  },
];

export default function CanvasPage() {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [activeNote, setActiveNote] = useState<Note>(sampleNotes[0]);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [isEditing]);

  const handleContentChange = (value: string) => {
    const updated = notes.map((n) =>
      n.id === activeNote.id
        ? { ...n, content: value, lastEdited: "Justo ahora" }
        : n
    );
    setNotes(updated);
    setActiveNote({ ...activeNote, content: value, lastEdited: "Justo ahora" });

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleTitleChange = (value: string) => {
    const updated = notes.map((n) =>
      n.id === activeNote.id
        ? { ...n, title: value, lastEdited: "Justo ahora" }
        : n
    );
    setNotes(updated);
    setActiveNote({ ...activeNote, title: value, lastEdited: "Justo ahora" });
  };

  const addNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Sin título",
      content: "",
      lastEdited: "Justo ahora",
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setIsEditing(true);
  };

  const wordCount = activeNote.content
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  return (
    <main className="mx-auto max-w-6xl px-6 pt-24 pb-16">
      <AnimatedSection delay={0.1}>
        <div className="mb-8">
          <p className="mb-2 font-sans text-xs uppercase tracking-widest text-text-muted">
            Escritura
          </p>
          <h1 className="font-serif text-3xl font-normal tracking-tight text-text-primary">
            Lienzo de Pensamiento
          </h1>
          <p className="mt-2 max-w-lg font-sans text-sm text-text-tertiary">
            Un espacio limpio para ideas, borradores y conexiones intelectuales.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* ─── Notes Sidebar ─── */}
        <AnimatedSection delay={0.2} className="lg:col-span-1">
          <div className="rounded-lg border border-border bg-surface/50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-sans text-xs font-medium uppercase tracking-widest text-text-muted">
                Notas
              </h2>
              <button
                onClick={addNewNote}
                className="flex h-6 w-6 items-center justify-center rounded border border-border bg-background text-text-muted transition-colors hover:border-accent hover:text-accent"
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
              </button>
            </div>

            <div className="space-y-1">
              {notes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => {
                    setActiveNote(note);
                    setIsEditing(false);
                  }}
                  className={`w-full rounded-md px-3 py-2.5 text-left transition-colors ${
                    activeNote.id === note.id
                      ? "border border-accent/30 bg-accent/5"
                      : "hover:bg-surface-hover"
                  }`}
                >
                  <p
                    className={`font-serif text-sm truncate ${
                      activeNote.id === note.id
                        ? "text-text-primary"
                        : "text-text-secondary"
                    }`}
                  >
                    {note.title}
                  </p>
                  <p className="mt-0.5 font-sans text-[10px] text-text-muted">
                    {note.lastEdited}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ─── Editor ─── */}
        <AnimatedSection delay={0.3} className="lg:col-span-3">
          <motion.div
            key={activeNote.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-border bg-surface/50"
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded border border-border bg-background">
                  <svg
                    width="12"
                    height="12"
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
                <span className="font-sans text-xs text-text-muted">
                  {wordCount} palabras
                </span>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`rounded-md border px-3 py-1 font-sans text-xs transition-colors ${
                  isEditing
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-text-tertiary hover:border-accent hover:text-accent"
                }`}
              >
                {isEditing ? "Leyendo" : "Editar"}
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={activeNote.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="mb-4 w-full bg-transparent font-serif text-2xl text-text-primary outline-none placeholder:text-text-muted"
                    placeholder="Título de la nota..."
                  />
                  <textarea
                    ref={textareaRef}
                    value={activeNote.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="min-h-[300px] w-full resize-none bg-transparent font-serif text-sm leading-relaxed text-text-secondary outline-none placeholder:text-text-muted"
                    placeholder="Comenzá a escribir..."
                  />
                </>
              ) : (
                <>
                  <h2 className="mb-4 font-serif text-2xl text-text-primary">
                    {activeNote.title}
                  </h2>
                  <div className="font-serif text-sm leading-relaxed text-text-secondary whitespace-pre-wrap">
                    {activeNote.content}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border-subtle px-5 py-2.5">
              <p className="font-sans text-[10px] text-text-muted">
                Última edición: {activeNote.lastEdited}
              </p>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </main>
  );
}
