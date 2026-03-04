/**
 * Cliente para arXiv API.
 * Documentación: https://info.arxiv.org/help/api/
 * API gratuita, devuelve XML (Atom feed).
 */

import type { SearchResult } from "./semantic-scholar";

const BASE_URL = "http://export.arxiv.org/api/query";

interface ArxivEntry {
  title: string;
  authors: string[];
  summary: string;
  published: string;
  id: string;
  doi?: string;
}

function parseArxivXml(xml: string): ArxivEntry[] {
  const entries: ArxivEntry[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;

  let match;
  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];

    const title =
      entry.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/\s+/g, " ").trim() ?? "";
    const summary =
      entry.match(/<summary>([\s\S]*?)<\/summary>/)?.[1]?.replace(/\s+/g, " ").trim() ?? "";
    const id = entry.match(/<id>([\s\S]*?)<\/id>/)?.[1]?.trim() ?? "";
    const published =
      entry.match(/<published>([\s\S]*?)<\/published>/)?.[1]?.trim() ?? "";

    const authors: string[] = [];
    const authorRegex = /<author>\s*<name>([\s\S]*?)<\/name>/g;
    let authorMatch;
    while ((authorMatch = authorRegex.exec(entry)) !== null) {
      authors.push(authorMatch[1].trim());
    }

    const doi = entry.match(/<arxiv:doi[^>]*>([\s\S]*?)<\/arxiv:doi>/)?.[1]?.trim();

    entries.push({ title, authors, summary, published, id, doi });
  }

  return entries;
}

export async function searchPapers(
  query: string,
  limit: number = 10
): Promise<SearchResult[]> {
  // arXiv search in economics categories
  const searchQuery = `all:${encodeURIComponent(query)}+AND+(cat:econ.*+OR+cat:q-fin.*)`;
  const params = new URLSearchParams({
    search_query: searchQuery,
    start: "0",
    max_results: String(limit),
    sortBy: "relevance",
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error(`arXiv API error: ${response.status}`);
  }

  const xml = await response.text();
  const entries = parseArxivXml(xml);

  return entries.map(
    (entry): SearchResult => ({
      id: entry.id,
      title: entry.title,
      authors: entry.authors,
      abstract: entry.summary,
      year: entry.published
        ? new Date(entry.published).getFullYear()
        : null,
      journal: "arXiv preprint",
      doi: entry.doi ?? null,
      url: entry.id,
      source: "semantic-scholar", // unified type
      citations: 0,
    })
  );
}
