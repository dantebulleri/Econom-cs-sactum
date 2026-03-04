/**
 * Aggregator de búsqueda — unifica resultados de múltiples fuentes.
 *
 * Consulta Semantic Scholar, arXiv y CrossRef en paralelo,
 * normaliza los resultados y los devuelve ordenados por relevancia.
 */

import type { SearchResult } from "./semantic-scholar";
import * as semanticScholar from "./semantic-scholar";
import * as arxiv from "./arxiv";
import * as crossref from "./crossref";

export type SearchSource = "all" | "semantic-scholar" | "arxiv" | "crossref";

export async function searchAll(
  query: string,
  source: SearchSource = "all",
  limit: number = 10
): Promise<SearchResult[]> {
  if (source !== "all") {
    return searchSingle(query, source, limit);
  }

  // Búsqueda en paralelo en las 3 fuentes
  const perSource = Math.ceil(limit / 3);
  const results = await Promise.allSettled([
    semanticScholar.searchPapers(query, perSource),
    arxiv.searchPapers(query, perSource),
    crossref.searchPapers(query, perSource),
  ]);

  const allResults: SearchResult[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      allResults.push(...result.value);
    }
    // Si una fuente falla, las otras siguen funcionando
  }

  // Deduplicar por DOI cuando sea posible
  const seen = new Set<string>();
  const deduplicated = allResults.filter((paper) => {
    if (paper.doi) {
      if (seen.has(paper.doi)) return false;
      seen.add(paper.doi);
    }
    return true;
  });

  // Ordenar por año (más recientes primero), luego por citas
  return deduplicated
    .sort((a, b) => {
      const yearDiff = (b.year ?? 0) - (a.year ?? 0);
      if (yearDiff !== 0) return yearDiff;
      return (b.citations ?? 0) - (a.citations ?? 0);
    })
    .slice(0, limit);
}

async function searchSingle(
  query: string,
  source: Exclude<SearchSource, "all">,
  limit: number
): Promise<SearchResult[]> {
  switch (source) {
    case "semantic-scholar":
      return semanticScholar.searchPapers(query, limit);
    case "arxiv":
      return arxiv.searchPapers(query, limit);
    case "crossref":
      return crossref.searchPapers(query, limit);
  }
}
