"use client";

import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface PaperCardProps {
  title: string;
  authors: string[];
  abstract: string | null;
  year: number | null;
  journal: string | null;
  citations: number;
  url: string;
  onSave?: () => void;
  delay?: number;
}

export function PaperCard({
  title,
  authors,
  abstract,
  year,
  journal,
  citations,
  url,
  onSave,
  delay = 0,
}: PaperCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="rounded-lg border border-border bg-surface/50 p-5 transition-colors hover:border-accent-light"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-serif text-sm font-medium leading-snug text-text-primary">
          {title}
        </h3>
        {year && (
          <Badge variant="default">{year}</Badge>
        )}
      </div>

      <p className="mb-2 font-sans text-xs text-text-muted">
        {authors.slice(0, 3).join(", ")}
        {authors.length > 3 && ` et al.`}
      </p>

      {abstract && (
        <p className="mb-3 font-sans text-xs leading-relaxed text-text-tertiary line-clamp-3">
          {abstract}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {journal && (
            <span className="font-sans text-[10px] text-text-muted">{journal}</span>
          )}
          {citations > 0 && (
            <span className="font-mono text-[10px] text-text-muted">
              {citations} citas
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[10px] text-accent hover:underline"
          >
            Ver paper &rarr;
          </a>
          {onSave && (
            <Button variant="primary" size="sm" onClick={onSave}>
              Guardar
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
