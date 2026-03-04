/**
 * Cliente para CrossRef API.
 * Documentación: https://api.crossref.org/
 * API gratuita. Útil para lookup por DOI y búsqueda bibliográfica.
 */

import type { SearchResult } from "./semantic-scholar";

const BASE_URL = "https://api.crossref.org/works";

interface CrossRefItem {
  DOI: string;
  title: string[];
  author?: { given?: string; family?: string }[];
  abstract?: string;
  published?: { "date-parts": number[][] };
  "container-title"?: string[];
  URL?: string;
  "is-referenced-by-count"?: number;
}

export async function searchPapers(
  query: string,
  limit: number = 10
): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    query,
    rows: String(limit),
    filter: "type:journal-article",
    select:
      "DOI,title,author,abstract,published,container-title,URL,is-referenced-by-count",
  });

  const response = await fetch(`${BASE_URL}?${params}`, {
    headers: {
      "User-Agent": "EconomicLab/1.0 (mailto:contact@economiclab.dev)",
    },
  });

  if (!response.ok) {
    throw new Error(`CrossRef API error: ${response.status}`);
  }

  const data = await response.json();
  const items: CrossRefItem[] = data.message?.items ?? [];

  return items.map(
    (item): SearchResult => ({
      id: item.DOI,
      title: item.title?.[0] ?? "Sin título",
      authors: (item.author ?? []).map(
        (a) => `${a.given ?? ""} ${a.family ?? ""}`.trim()
      ),
      abstract: item.abstract
        ? item.abstract.replace(/<[^>]*>/g, "")
        : null,
      year: item.published?.["date-parts"]?.[0]?.[0] ?? null,
      journal: item["container-title"]?.[0] ?? null,
      doi: item.DOI,
      url: item.URL ?? `https://doi.org/${item.DOI}`,
      source: "semantic-scholar", // unified type
      citations: item["is-referenced-by-count"] ?? 0,
    })
  );
}
