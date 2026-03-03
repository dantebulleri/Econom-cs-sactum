# ECONOMIC LAB — Arquitectura del Sistema
## Documento de Diseño Técnico v1.0

---

## 1. VISIÓN GENERAL

Economic Lab es una plataforma de investigación económica potenciada por IA que se
construye sobre la estética y la base del Economist Sanctum existente. No es un
chatbot genérico con skin de economía — es un **laboratorio especializado** donde
cada módulo está diseñado para resolver un problema específico del workflow de un
economista investigador.

### Los 7 módulos:

| # | Módulo | Metáfora | Rol |
|---|--------|----------|-----|
| 1 | **Paper Search** | El bibliotecario | Busca papers en bases académicas externas |
| 2 | **Traductor Técnico** | El intérprete | Traduce papers manteniendo jerga económica |
| 3 | **Paper Analyzer** | El asistente de cátedra | Disecciona papers: estructura, supuestos, metodología |
| 4 | **Economics Chat** | El colega economista | Chat especializado SOLO en economía |
| 5 | **Paper Database** | La bóveda personal | Almacena papers leídos con notas y análisis |
| 6 | **Idea Generator** | El brainstorming partner | Genera ideas de investigación a partir de gaps |
| 7 | **Referee Mode** | El reviewer anónimo | Crítica académica rigurosa de trabajos |

---

## 2. STACK TECNOLÓGICO RECOMENDADO

### Frontend
```
Framework:      Next.js 16 (App Router) ← YA INSTALADO
Estilos:        Tailwind CSS v4          ← YA INSTALADO
Animaciones:    Framer Motion            ← YA INSTALADO
Estado global:  Zustand (liviano, sin boilerplate)
Markdown:       react-markdown + remark-math + rehype-katex
Chat UI:        Componentes custom (no librerías externas — control total de la estética)
```

### Backend (API Routes dentro de Next.js)
```
API Layer:      Next.js Route Handlers (app/api/*)
ORM:            Prisma (type-safe, migraciones claras)
Base de datos:  SQLite en desarrollo → PostgreSQL en producción
AI SDK:         Vercel AI SDK (@ai-sdk/openai) — streaming nativo con Next.js
Validación:     Zod (esquemas de entrada/salida para cada endpoint)
```

### Inteligencia Artificial
```
LLM principal:     Claude (vía @ai-sdk/anthropic) o GPT-4 (vía @ai-sdk/openai)
Embeddings:        OpenAI text-embedding-3-small (para búsqueda semántica en la bóveda)
Vector store:      Prisma + pgvector (PostgreSQL) o búsqueda local con similitud coseno
Prompts:           Archivos .ts independientes en src/lib/prompts/
```

### APIs Externas (integración futura)
```
Papers:         Semantic Scholar API (gratuita, sin API key)
                arXiv API (gratuita, XML)
                CrossRef API (gratuita, DOI lookup)
                SSRN (scraping controlado o API cuando disponible)
                OpenAlex API (gratuita, datos abiertos)
```

### ¿Por qué este stack?

| Decisión | Razón |
|----------|-------|
| **Next.js monorepo** (no microservicios) | Un economista no necesita Kubernetes. Necesita que funcione. API Routes + frontend en un solo deploy. |
| **Prisma + SQLite/PostgreSQL** | SQLite para prototipar rápido (archivo local), Prisma hace trivial la migración a PostgreSQL cuando escale. |
| **Vercel AI SDK** | Streaming nativo, soporte multi-proveedor (Claude, GPT-4, Gemini), hooks `useChat` que simplifican el frontend. |
| **Zustand** (no Redux) | Estado global minimalista. Un economista no necesita un state manager enterprise — necesita que la UI reaccione rápido. |
| **Prompts como archivos .ts** | Cada prompt es versionable, testeable, y modificable sin tocar lógica de negocio. Si mañana querés mejorar el referee, editás UN archivo. |

---

## 3. ESTRUCTURA DE CARPETAS PROPUESTA

```
src/
├── app/                              # ─── RUTAS (páginas) ───
│   ├── layout.tsx                    # Layout raíz (tema, navbar, providers)
│   ├── page.tsx                      # Dashboard / Landing (YA EXISTE)
│   ├── globals.css                   # Sistema de temas (YA EXISTE)
│   │
│   ├── vault/                        # Módulo 5: Base de datos de papers
│   │   ├── page.tsx                  # Vista principal de la bóveda (YA EXISTE, se expande)
│   │   └── [id]/page.tsx             # Vista detalle de un paper
│   │
│   ├── canvas/                       # Lienzo de pensamiento (YA EXISTE)
│   │   └── page.tsx
│   │
│   ├── search/                       # Módulo 1: Buscador de papers
│   │   └── page.tsx
│   │
│   ├── chat/                         # Módulo 4: Chat económico
│   │   └── page.tsx
│   │
│   ├── lab/                          # Hub para herramientas de IA
│   │   ├── page.tsx                  # Selector de herramientas
│   │   ├── translator/page.tsx       # Módulo 2: Traductor técnico
│   │   ├── analyzer/page.tsx         # Módulo 3: Analizador de papers
│   │   ├── ideas/page.tsx            # Módulo 6: Generador de ideas
│   │   └── referee/page.tsx          # Módulo 7: Modo referee
│   │
│   └── api/                          # ─── BACKEND (API Routes) ───
│       ├── chat/route.ts             # POST: Chat económico (streaming)
│       ├── translate/route.ts        # POST: Traducción técnica
│       ├── analyze/route.ts          # POST: Análisis de paper
│       ├── ideas/route.ts            # POST: Generación de ideas
│       ├── referee/route.ts          # POST: Crítica académica
│       ├── search/route.ts           # GET:  Búsqueda en APIs externas
│       └── papers/                   # CRUD: Papers en la bóveda
│           ├── route.ts              # GET (listar), POST (crear)
│           └── [id]/route.ts         # GET, PUT, DELETE un paper
│
├── components/                       # ─── COMPONENTES UI ───
│   ├── navigation/
│   │   └── Navbar.tsx                # Navegación principal (YA EXISTE, se expande)
│   │
│   ├── theme/
│   │   ├── ThemeProvider.tsx          # (YA EXISTE)
│   │   └── ThemeToggle.tsx            # (YA EXISTE)
│   │
│   ├── ui/                           # Componentes reutilizables
│   │   ├── AnimatedSection.tsx        # (YA EXISTE)
│   │   ├── Card.tsx                   # Tarjeta genérica estilo sanctum
│   │   ├── Badge.tsx                  # Etiquetas de estado (draft, published)
│   │   ├── Input.tsx                  # Input con estilo académico
│   │   ├── Button.tsx                 # Botón con variantes
│   │   ├── Modal.tsx                  # Modal con backdrop blur
│   │   ├── Tabs.tsx                   # Tabs animados
│   │   └── MarkdownRenderer.tsx       # Renderizado de markdown con LaTeX
│   │
│   ├── chat/                         # Componentes del chat
│   │   ├── ChatWindow.tsx             # Contenedor principal del chat
│   │   ├── MessageBubble.tsx          # Burbuja de mensaje (user/AI)
│   │   ├── ChatInput.tsx              # Input con envío por Enter
│   │   └── StreamingText.tsx          # Texto que aparece progresivamente
│   │
│   ├── search/                       # Componentes del buscador
│   │   ├── SearchBar.tsx              # Barra de búsqueda con sugerencias
│   │   └── PaperCard.tsx              # Tarjeta de resultado de paper
│   │
│   ├── vault/                        # Componentes de la bóveda
│   │   ├── PaperDetail.tsx            # Vista detalle de paper guardado
│   │   └── NotesEditor.tsx            # Editor de notas por paper
│   │
│   └── lab/                          # Componentes del laboratorio
│       ├── ToolCard.tsx               # Tarjeta de herramienta (traductor, etc.)
│       ├── AnalysisResult.tsx         # Resultado estructurado del análisis
│       └── RefereeReport.tsx          # Reporte de referee formateado
│
├── lib/                              # ─── LÓGICA DE NEGOCIO ───
│   ├── prompts/                      # Prompts de IA (SEPARADOS)
│   │   ├── chat-economist.ts          # System prompt del chat económico
│   │   ├── translator.ts             # Prompt del traductor técnico
│   │   ├── analyzer.ts               # Prompt del analizador de papers
│   │   ├── idea-generator.ts         # Prompt del generador de ideas
│   │   ├── referee.ts                # Prompt del modo referee
│   │   └── shared.ts                 # Fragmentos de prompt reutilizables
│   │
│   ├── ai/                           # Configuración de IA
│   │   ├── provider.ts               # Configuración del proveedor LLM
│   │   └── embeddings.ts             # Generación de embeddings
│   │
│   ├── search/                       # Integraciones de búsqueda
│   │   ├── semantic-scholar.ts        # Cliente Semantic Scholar API
│   │   ├── arxiv.ts                   # Cliente arXiv API
│   │   ├── crossref.ts               # Cliente CrossRef API
│   │   └── aggregator.ts             # Unifica resultados de múltiples fuentes
│   │
│   ├── db/                           # Base de datos
│   │   └── index.ts                  # Cliente Prisma exportado
│   │
│   ├── validators/                   # Esquemas Zod
│   │   ├── paper.ts                  # Validación de papers
│   │   ├── chat.ts                   # Validación de mensajes
│   │   └── search.ts                 # Validación de búsquedas
│   │
│   └── utils/                        # Utilidades
│       ├── pdf-parser.ts             # Extracción de texto de PDFs
│       └── citation-formatter.ts     # Formateo de citas (APA, Chicago, etc.)
│
├── store/                            # ─── ESTADO GLOBAL (Zustand) ───
│   ├── use-chat-store.ts             # Estado del chat (mensajes, loading)
│   ├── use-vault-store.ts            # Estado de la bóveda (filtros, papers)
│   └── use-ui-store.ts               # Estado de UI (sidebar, modales)
│
└── prisma/                           # ─── BASE DE DATOS ───
    ├── schema.prisma                 # Esquema de la base de datos
    └── migrations/                   # Migraciones auto-generadas
```

---

## 4. ORGANIZACIÓN DE LOS MÓDULOS DE IA

### Principio fundamental: Cada módulo de IA es un "sandwich" de 3 capas

```
┌─────────────────────────────────────────────────────┐
│  CAPA 1: FRONTEND (página + componentes)            │
│  → Lo que el usuario ve y toca                      │
│  → Archivos en: app/[módulo]/page.tsx               │
│  → Componentes en: components/[módulo]/*.tsx         │
├─────────────────────────────────────────────────────┤
│  CAPA 2: API ROUTE (endpoint)                       │
│  → Recibe el pedido, valida, llama al LLM           │
│  → Archivos en: app/api/[módulo]/route.ts           │
│  → Usa Zod para validar entrada/salida              │
├─────────────────────────────────────────────────────┤
│  CAPA 3: PROMPT (instrucciones al LLM)              │
│  → El "cerebro" del módulo, separado y versionable  │
│  → Archivos en: lib/prompts/[módulo].ts             │
│  → Exporta funciones que construyen el prompt       │
└─────────────────────────────────────────────────────┘
```

### Ejemplo concreto: Módulo 3 (Analizador de Papers)

```
Usuario pega texto de un paper
        │
        ▼
┌── app/lab/analyzer/page.tsx ──┐
│  Textarea + botón "Analizar"  │
│  Muestra resultado formateado │
└───────────┬───────────────────┘
            │ POST /api/analyze
            ▼
┌── app/api/analyze/route.ts ───┐
│  1. Valida input con Zod      │
│  2. Importa prompt desde      │
│     lib/prompts/analyzer.ts   │
│  3. Llama al LLM vía AI SDK  │
│  4. Devuelve streaming        │
└───────────┬───────────────────┘
            │ importa
            ▼
┌── lib/prompts/analyzer.ts ────┐
│  buildAnalyzerPrompt(text) {  │
│    return {                   │
│      system: "Eres un...",    │
│      user: `Analiza: ${text}` │
│    }                          │
│  }                            │
└───────────────────────────────┘
```

### Estructura de cada archivo de prompt:

```typescript
// lib/prompts/analyzer.ts
// Cada prompt exporta:

export const SYSTEM_PROMPT = "..."     // Instrucciones base del rol
export const TEMPERATURE = 0.3        // Temperatura óptima para este módulo

export function buildPrompt(input) {   // Función que construye el prompt final
  return { system, user }              // con variables dinámicas
}

export const OUTPUT_SCHEMA = z.object({...})  // Esquema esperado de la respuesta
```

### ¿Por qué separar los prompts?

| Sin separar | Con separar |
|-------------|-------------|
| Cambiar una instrucción requiere buscar en el código del endpoint | Abrís `lib/prompts/referee.ts` y editás |
| No podés testear el prompt sin levantar la app | Podés importar el prompt y testearlo aislado |
| Si dos módulos comparten contexto, duplicás texto | `shared.ts` tiene fragmentos reutilizables |
| No tenés historial de cambios del prompt | Git trackea cada versión del prompt |

---

## 5. MODELO DE DATOS (Prisma Schema)

```
┌─────────────────────────────────────────────────────────────────┐
│                         PAPERS                                  │
├─────────────────────────────────────────────────────────────────┤
│ id            String     @id                                    │
│ title         String                                            │
│ authors       String[]                                          │
│ abstract      String?                                           │
│ year          Int?                                               │
│ journal       String?                                           │
│ doi           String?    @unique                                │
│ url           String?                                           │
│ pdfUrl        String?                                           │
│ fullText      String?    (texto extraído del PDF)               │
│ source        String     (semantic-scholar | arxiv | manual)    │
│ status        String     (unread | reading | read | archived)   │
│ rating        Int?       (1-5 estrellas)                        │
│ createdAt     DateTime                                          │
│ updatedAt     DateTime                                          │
│                                                                 │
│ → notes       Note[]                                            │
│ → tags        Tag[]      (many-to-many)                         │
│ → analyses    Analysis[]                                        │
│ → embedding   Float[]?   (vector para búsqueda semántica)       │
│ → category    Category?  @relation                              │
└─────────────────────────────────────────────────────────────────┘
         │                    │                     │
         ▼                    ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐
│     NOTES       │  │      TAGS       │  │     ANALYSES        │
├─────────────────┤  ├─────────────────┤  ├─────────────────────┤
│ id              │  │ id              │  │ id                  │
│ content  (md)   │  │ name            │  │ type (analyzer |    │
│ paperId         │  │ color           │  │       referee |     │
│ createdAt       │  │                 │  │       translation)  │
│ updatedAt       │  │ → papers []     │  │ result     (JSON)   │
└─────────────────┘  └─────────────────┘  │ paperId             │
                                          │ createdAt           │
                                          └─────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      CONVERSATIONS                              │
├─────────────────────────────────────────────────────────────────┤
│ id            String     @id                                    │
│ title         String                                            │
│ module        String     (chat | translator | analyzer | etc.)  │
│ createdAt     DateTime                                          │
│ updatedAt     DateTime                                          │
│                                                                 │
│ → messages    Message[]                                         │
└─────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                       MESSAGES                                  │
├─────────────────────────────────────────────────────────────────┤
│ id              String     @id                                  │
│ role            String     (user | assistant | system)           │
│ content         String                                          │
│ conversationId  String                                          │
│ metadata        Json?      (tokens usados, modelo, etc.)        │
│ createdAt       DateTime                                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     RESEARCH IDEAS                              │
├─────────────────────────────────────────────────────────────────┤
│ id            String     @id                                    │
│ title         String                                            │
│ description   String                                            │
│ methodology   String?                                           │
│ relatedPapers String[]   (IDs de papers relacionados)           │
│ status        String     (new | exploring | active | archived)  │
│ createdAt     DateTime                                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      CATEGORIES                                 │
├─────────────────────────────────────────────────────────────────┤
│ id            String     @id                                    │
│ name          String     @unique                                │
│ description   String?                                           │
│ icon          String?                                           │
│ → papers      Paper[]                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. FLUJO DE DATOS POR MÓDULO

### Módulo 1: Paper Search (Buscador)
```
Usuario escribe query
    → Frontend envía GET /api/search?q=...&source=semantic-scholar
    → API Route llama a lib/search/aggregator.ts
    → Aggregator consulta Semantic Scholar + arXiv en paralelo
    → Normaliza resultados a formato unificado
    → Frontend muestra tarjetas con botón "Guardar en Bóveda"
    → Si guarda → POST /api/papers (crea en DB)
```

### Módulo 2: Traductor Técnico
```
Usuario pega texto en inglés
    → Frontend envía POST /api/translate { text, targetLang }
    → API valida con Zod
    → Carga prompt desde lib/prompts/translator.ts
    → LLM traduce manteniendo terminología económica
    → Streaming de respuesta al frontend
    → Opción: "Guardar traducción" → vincula a paper en DB
```

### Módulo 3: Analizador de Papers
```
Usuario pega texto o selecciona paper de la bóveda
    → Frontend envía POST /api/analyze { text, paperId? }
    → Carga prompt de lib/prompts/analyzer.ts
    → LLM devuelve JSON estructurado:
      {
        resumen_ejecutivo,
        pregunta_investigacion,
        hipotesis,
        metodologia,
        supuestos_clave,
        datos_utilizados,
        resultados_principales,
        limitaciones,
        contribucion
      }
    → Se guarda como Analysis en DB (vinculada al paper)
    → Frontend renderiza con componente AnalysisResult
```

### Módulo 4: Chat Económico
```
Usuario envía mensaje
    → Frontend usa useChat() del AI SDK
    → POST /api/chat { messages[] }
    → System prompt de lib/prompts/chat-economist.ts:
      "Eres un economista PhD. Solo respondés sobre economía.
       Si te preguntan otra cosa, redirigí elegantemente."
    → Streaming de respuesta con markdown + LaTeX
    → Mensajes se guardan en Conversation + Messages
```

### Módulo 5: Paper Database (Bóveda expandida)
```
CRUD puro:
    → Listar papers con filtros → GET /api/papers?category=...&status=...
    → Ver paper detalle → GET /api/papers/[id]
    → Guardar paper nuevo → POST /api/papers
    → Actualizar notas/estado → PUT /api/papers/[id]
    → Eliminar → DELETE /api/papers/[id]

Búsqueda semántica (futuro):
    → Al guardar un paper, se genera embedding del abstract
    → Búsqueda "papers similares a este" usa similitud coseno
```

### Módulo 6: Generador de Ideas
```
Usuario describe área de interés + papers relevantes
    → POST /api/ideas { area, context, paperIds[] }
    → Carga abstracts de papers seleccionados de la DB
    → Prompt de lib/prompts/idea-generator.ts:
      "Analiza los gaps en la literatura. Genera 3-5 ideas
       originales con pregunta, hipótesis y metodología sugerida."
    → Resultado se guarda como ResearchIdea en DB
```

### Módulo 7: Referee Mode
```
Usuario pega paper o selecciona de la bóveda
    → POST /api/referee { text, paperId?, severity }
    → Prompt de lib/prompts/referee.ts:
      "Eres un referee anónimo de una revista top-5.
       Sé riguroso, justo y constructivo. Evalúa:
       originalidad, metodología, robustez, presentación."
    → Respuesta formateada como reporte de referee real
    → Se guarda como Analysis (type: 'referee') en DB
```

---

## 7. MAPA DE NAVEGACIÓN

```
                    ┌──────────────────┐
                    │    DASHBOARD     │
                    │   (página /)     │
                    │                  │
                    │  Resumen rápido  │
                    │  de todo el Lab  │
                    └────────┬─────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────────┐
│   BUSCADOR   │   │    CHAT      │   │       LAB        │
│  /search     │   │   /chat      │   │      /lab        │
│              │   │              │   │                  │
│ Buscar en    │   │ Conversación │   │ Hub de           │
│ arXiv,       │   │ económica    │   │ herramientas IA  │
│ Semantic     │   │ con IA       │   │                  │
│ Scholar...   │   │              │   ├──────────────────┤
│              │   │              │   │ /lab/translator   │
│ [Guardar] ──►│   │              │   │ /lab/analyzer     │
│   en bóveda  │   │              │   │ /lab/ideas        │
└──────┬───────┘   └──────────────┘   │ /lab/referee      │
       │                              └──────────────────┘
       ▼
┌──────────────┐   ┌──────────────┐
│   BÓVEDA     │   │   LIENZO     │
│  /vault      │   │  /canvas     │
│              │   │              │
│ Papers       │   │ Notas        │
│ guardados,   │   │ libres,      │
│ notas,       │   │ borradores,  │
│ análisis     │   │ ideas        │
└──────────────┘   └──────────────┘
```

---

## 8. INTEGRACIÓN CON LA ESTÉTICA EXISTENTE

El sistema de diseño del Sanctum ya está definido y NO se modifica. Los nuevos
módulos heredan:

- **Paleta**: Las CSS variables de globals.css (--background, --accent, --gold, etc.)
- **Tipografía**: font-serif para títulos/lectura, font-sans para UI, font-mono para datos
- **Componentes**: Se construyen sobre los patrones visuales existentes (bordes border,
  superficies surface, hover states con accent)
- **Animaciones**: Framer Motion con la misma curva ease [0.25, 0.4, 0.25, 1]
- **Navegación**: Navbar se expande con los nuevos items (Search, Chat, Lab)

### Nuevos patrones de UI necesarios:

| Componente | Uso | Estilo |
|------------|-----|--------|
| ChatWindow | Chat económico, traductor | Panel con fondo background, bordes border, mensajes alternados |
| MessageBubble | Mensajes user/AI | User: alineado derecha, fondo accent/10. AI: izquierda, fondo surface |
| StreamingText | Respuestas del LLM | Texto serif que aparece letra por letra con cursor dorado |
| ToolCard | Selector de herramientas /lab | Tarjeta con icono, título, descripción. Hover → borde accent |
| PaperCard | Resultados de búsqueda | Similar a los doc cards actuales pero con abstract y botón guardar |
| AnalysisResult | Resultado del analizador | Secciones colapsables con headings serif y contenido formateado |

---

## 9. DEPENDENCIAS NUEVAS NECESARIAS

```
# IA y Streaming
ai                          # Vercel AI SDK (core)
@ai-sdk/openai              # Proveedor OpenAI/compatible
@ai-sdk/anthropic           # Proveedor Claude (alternativa)

# Base de datos
prisma                      # ORM (dev dependency)
@prisma/client              # Cliente runtime

# Estado
zustand                     # Estado global liviano

# Markdown & LaTeX
react-markdown              # Renderizar markdown
remark-math                 # Soporte para ecuaciones
rehype-katex                # Renderizar LaTeX a HTML
katex                       # Motor de renderizado LaTeX

# Validación
zod                         # Esquemas de validación

# Utilidades
pdf-parse                   # Extraer texto de PDFs
```

---

## 10. ORDEN DE IMPLEMENTACIÓN RECOMENDADO

### Fase 1: Infraestructura (Semana 1)
```
1. Instalar dependencias nuevas
2. Configurar Prisma + SQLite
3. Crear schema de DB y migraciones
4. Crear componentes UI base (Card, Button, Input, Badge, Tabs)
5. Expandir Navbar con nuevos items
6. Actualizar Dashboard para reflejar todos los módulos
```

### Fase 2: Chat + Prompts (Semana 2)
```
7. Configurar Vercel AI SDK con proveedor LLM
8. Crear lib/prompts/shared.ts (contexto económico base)
9. Crear lib/prompts/chat-economist.ts
10. Construir ChatWindow, MessageBubble, ChatInput
11. Implementar /api/chat/route.ts con streaming
12. Construir página /chat
```

### Fase 3: Bóveda Completa (Semana 3)
```
13. Expandir /vault con CRUD real (no datos mock)
14. Implementar API /api/papers/* (todas las operaciones)
15. Crear vista detalle /vault/[id]
16. Editor de notas por paper
17. Sistema de tags y categorías
```

### Fase 4: Herramientas del Lab (Semana 4)
```
18. Crear hub /lab con selector de herramientas
19. Módulo Traductor: prompt + API + UI
20. Módulo Analizador: prompt + API + UI + esquema JSON
21. Módulo Generador de Ideas: prompt + API + UI
22. Módulo Referee: prompt + API + UI
```

### Fase 5: Buscador + Integración (Semana 5)
```
23. Implementar clientes: Semantic Scholar, arXiv, CrossRef
24. Crear aggregator que unifica resultados
25. Construir UI de búsqueda con filtros
26. Flujo: buscar → preview → guardar en bóveda
```

### Fase 6: Polish (Semana 6)
```
27. Búsqueda semántica (embeddings) en la bóveda
28. Soporte PDF upload + extracción de texto
29. Formateo de citas (APA, Chicago)
30. Responsive design final
31. Error handling y loading states
```

---

## 11. DECISIONES ARQUITECTÓNICAS CLAVE

### ¿Por qué NO microservicios?
Un solo deploy de Next.js. Los API Routes viven junto al frontend. Para un
usuario individual o un equipo pequeño, un monolito bien estructurado es
más rápido de desarrollar, debuggear y deployar que N servicios separados.
Si escala, los módulos ya están lo suficientemente desacoplados para
extraerlos.

### ¿Por qué prompts como archivos TypeScript y no en base de datos?
Porque los prompts son código, no datos. Necesitan versionado (git),
revisión (pull requests), testing (importar y evaluar), y tipado
(TypeScript). Una base de datos para prompts solo tiene sentido si
múltiples usuarios no-técnicos necesitan editarlos en producción.

### ¿Por qué Zustand y no Context API?
Context re-renderiza todo el árbol cuando cambia un valor. Zustand
permite subscripciones selectivas (solo se re-renderiza el componente
que usa la parte del estado que cambió). Para un chat con streaming
donde los mensajes se actualizan 30 veces por segundo, esto es crítico.

### ¿Por qué SQLite primero?
Cero configuración. Un archivo. Prisma abstrae la base de datos, así
que migrar a PostgreSQL es cambiar UNA línea en schema.prisma. Para
prototipo y desarrollo local, SQLite es imbatible.

### ¿Por qué Vercel AI SDK y no llamar directamente a la API?
El SDK maneja: streaming, parsing de chunks, cancelación, retry logic,
múltiples proveedores con la misma interfaz, y hooks de React (useChat,
useCompletion) que eliminan 200+ líneas de boilerplate por módulo.
