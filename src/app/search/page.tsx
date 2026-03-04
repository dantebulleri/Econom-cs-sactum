"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { PaperCard } from "@/components/search/PaperCard";

interface SearchResult {
  id: string;
  title: string;
  authors: string[];
  abstract: string | null;
  year: number | null;
  journal: string | null;
  doi: string | null;
  url: string;
  citations: number;
}

const sources = ["Todas", "Semantic Scholar", "arXiv", "CrossRef"];
const sourceMap: Record<string, string> = {
  Todas: "all",
  "Semantic Scholar": "semantic-scholar",
  arXiv: "arxiv",
  CrossRef: "crossref",
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSource, setActiveSource] = useState("Todas");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setHasSearched(true);

    try {
      const source = sourceMap[activeSource];
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&source=${source}&limit=15`
      );
      const data = await res.json();
      setResults(data.results ?? []);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (paper: SearchResult) => {
    try {
      await fetch("/api/papers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: paper.title,
          authors: paper.authors,
          abstract: paper.abstract,
          year: paper.year,
          journal: paper.journal,
          doi: paper.doi,
          url: paper.url,
          source: "semantic-scholar",
        }),
      });
    } catch {
      // Silent fail for now
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-6 pt-24 pb-16">
      <AnimatedSection delay={0.1}>
        <div className="mb-8">
          <p className="mb-2 font-sans text-xs uppercase tracking-widest text-text-muted">
            Módulo 1
          </p>
          <h1 className="font-serif text-3xl font-normal text-text-primary">
            Buscador de Papers
          </h1>
          <p className="mt-2 max-w-lg font-sans text-sm text-text-tertiary">
            Buscá en Semantic Scholar, arXiv y CrossRef desde un solo lugar.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="mb-4">
          <Tabs tabs={sources} activeTab={activeSource} onTabChange={setActiveSource} />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="mb-8"
        >
          <Input
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="inflation targeting emerging markets..."
          />
        </form>
      </AnimatedSection>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse [animation-delay:0.15s]" />
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse [animation-delay:0.3s]" />
            <span className="ml-2 font-sans text-xs text-text-muted">
              Buscando en bases académicas...
            </span>
          </div>
        </div>
      )}

      {!isLoading && hasSearched && (
        <p className="mb-4 font-sans text-xs text-text-muted">
          {results.length} resultado{results.length !== 1 ? "s" : ""}
        </p>
      )}

      <div className="space-y-3">
        {results.map((paper, i) => (
          <PaperCard
            key={paper.id}
            title={paper.title}
            authors={paper.authors}
            abstract={paper.abstract}
            year={paper.year}
            journal={paper.journal}
            citations={paper.citations}
            url={paper.url}
            onSave={() => handleSave(paper)}
            delay={i * 0.05}
          />
        ))}
      </div>

      {!isLoading && hasSearched && results.length === 0 && (
        <div className="mt-12 text-center">
          <p className="font-serif text-sm italic text-text-tertiary">
            No se encontraron papers. Intentá con otros términos.
          </p>
        </div>
      )}
    </main>
  );
}
