/**
 * Cliente para Semantic Scholar API.
 * Documentación: https://api.semanticscholar.org/
 * No requiere API key para uso básico.
 */

export interface SemanticScholarPaper {
  paperId: string;
  title: string;
  authors: { name: string }[];
  abstract: string | null;
  year: number | null;
  venue: string | null;
  url: string;
  citationCount: number;
  externalIds?: { DOI?: string; ArXiv?: string };
}

export interface SearchResult {
  id: string;
  title: string;
  authors: string[];
  abstract: string | null;
  year: number | null;
  journal: string | null;
  doi: string | null;
  url: string;
  source: "semantic-scholar";
  citations: number;
}

const BASE_URL = "https://api.semanticscholar.org/graph/v1";

export async function searchPapers(
  query: string,
  limit: number = 10
): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    query,
    limit: String(limit),
    fields:
      "title,authors,abstract,year,venue,url,citationCount,externalIds",
  });

  const response = await fetch(`${BASE_URL}/paper/search?${params}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(
      `Semantic Scholar API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  return (data.data ?? []).map(
    (paper: SemanticScholarPaper): SearchResult => ({
      id: paper.paperId,
      title: paper.title,
      authors: paper.authors.map((a) => a.name),
      abstract: paper.abstract,
      year: paper.year,
      journal: paper.venue,
      doi: paper.externalIds?.DOI ?? null,
      url: paper.url,
      source: "semantic-scholar",
      citations: paper.citationCount,
    })
  );
}
