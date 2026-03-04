/**
 * Servicio del Chat Económico.
 *
 * Responsabilidades:
 * 1. Cargar el system prompt desde archivo .txt (una sola vez, cacheado)
 * 2. Filtrar mensajes no-económicos ANTES de llamar al LLM
 * 3. Llamar al LLM y devolver el stream
 *
 * El route handler solo orquesta request/response — toda la lógica vive acá.
 */

import fs from "fs";
import path from "path";
import { streamText, type ModelMessage } from "ai";
import { models } from "@/lib/ai/provider";

// ── System prompt (leído una vez, cacheado en memoria) ──────────────────────

let cachedSystemPrompt: string | null = null;

export function getSystemPrompt(): string {
  if (cachedSystemPrompt) return cachedSystemPrompt;

  const promptPath = path.join(process.cwd(), "prompts", "economic_chat.system.txt");
  cachedSystemPrompt = fs.readFileSync(promptPath, "utf-8");
  return cachedSystemPrompt;
}

// ── Filtro pre-LLM ─────────────────────────────────────────────────────────
// Detecta si el último mensaje del usuario claramente NO es sobre economía.
// Esto evita gastar tokens en preguntas irrelevantes.

const ECONOMICS_KEYWORDS = [
  // Macro
  "pib", "gdp", "inflación", "inflation", "desempleo", "unemployment",
  "tipo de cambio", "exchange rate", "política monetaria", "monetary policy",
  "política fiscal", "fiscal policy", "tasa de interés", "interest rate",
  "crecimiento", "growth", "recesión", "recession", "deuda", "debt",
  "déficit", "deficit", "superávit", "surplus", "banco central", "central bank",
  // Micro
  "oferta", "supply", "demanda", "demand", "equilibrio", "equilibrium",
  "elasticidad", "elasticity", "monopolio", "monopoly", "oligopolio", "oligopoly",
  "competencia", "competition", "utilidad", "utility", "costo marginal",
  "marginal cost", "externalidad", "externality", "bien público", "public good",
  // Econometría
  "regresión", "regression", "ols", "mco", "variable instrumental",
  "instrumental variable", "panel data", "datos de panel", "heteroscedasticidad",
  "heteroscedasticity", "endogeneidad", "endogeneity", "causalidad", "causality",
  "diferencias en diferencias", "diff-in-diff", "matching", "propensity score",
  // Finanzas
  "mercado", "market", "acción", "stock", "bono", "bond", "riesgo", "risk",
  "rendimiento", "return", "portfolio", "portafolio", "capm", "black-scholes",
  "derivado", "derivative", "volatilidad", "volatility",
  // Desarrollo
  "pobreza", "poverty", "desigualdad", "inequality", "gini", "desarrollo",
  "development", "capital humano", "human capital", "instituciones", "institutions",
  // Comercio
  "comercio", "trade", "aranceles", "tariff", "ventaja comparativa",
  "comparative advantage", "balanza de pagos", "balance of payments",
  // Teoría
  "nash", "pareto", "keynes", "friedman", "hayek", "smith", "ricardo",
  "marshall", "walras", "samuelson", "stiglitz", "krugman", "piketty",
  "solow", "lucas", "mundell", "fleming", "phillips", "okun", "coase",
  // Conceptos generales
  "economía", "economy", "economics", "económico", "economic",
  "mercado laboral", "labor market", "productividad", "productivity",
  "incentivo", "incentive", "escasez", "scarcity", "costo de oportunidad",
  "opportunity cost", "bienestar", "welfare", "paper", "papers", "investigación",
  "research", "modelo", "model", "teoría", "theory", "hipótesis", "hypothesis",
  "datos", "data", "estimación", "estimation", "metodología", "methodology",
  "econométrico", "econometric", "microeconóm", "macroeconóm",
  "precio", "price", "salario", "wage", "ingreso", "income", "consumo",
  "consumption", "inversión", "investment", "ahorro", "saving",
  "presupuesto", "budget", "impuesto", "tax", "subsidio", "subsidy",
];

/**
 * Determina si un mensaje es potencialmente sobre economía.
 * Es un filtro amplio — ante la duda, deja pasar (el LLM decide).
 * Solo bloquea mensajes claramente off-topic.
 */
export function isEconomicsRelated(message: string): boolean {
  const lower = message.toLowerCase();

  // Mensajes muy cortos (saludos, etc.) los dejamos pasar — el LLM los maneja
  if (lower.length < 15) return true;

  // Si contiene alguna keyword económica, es relevante
  return ECONOMICS_KEYWORDS.some((kw) => lower.includes(kw));
}

// ── Llamada al LLM ──────────────────────────────────────────────────────────

const TEMPERATURE = 0.7;
const MAX_TOKENS = 2048;

export interface ChatStreamResult {
  stream: ReturnType<typeof streamText>;
}

export function createEconomicChatStream(messages: ModelMessage[]) {
  const systemPrompt = getSystemPrompt();

  return streamText({
    model: models.chat,
    system: systemPrompt,
    messages,
    temperature: TEMPERATURE,
    maxOutputTokens: MAX_TOKENS,
  });
}
