# Problem Statement Alignment — NyayaAI

## Challenge: AI for Legal Assistance & Access

> *"Legal information can often be complex, difficult to understand, and challenging to navigate without professional assistance. Build a GenAI-powered solution that makes legal information and basic legal assistance more accessible by helping users understand, compare, and navigate legal documents and information."*
>
> — PromptWars Virtual September, Hack2Skill

---

## How NyayaAI Addresses Every Use Case

### 1. Simplifying Complex Legal Documents
**Endpoint:** `POST /analyze`

NyayaAI uses GPT-4o (with a deterministic fallback engine for offline use) to transform complex legal jargon into plain-language summaries. Users can choose between "Simple" (15-year-old readable) and "Professional" (legal counsel) detail levels, and switch between English, Hindi, and Spanish.

**Key Features:**
- Automated plain-language summary generation
- Risk score (0-100) with severity breakdown
- Obligation and rights extraction
- Critical deadline identification

---

### 2. Comparing Contracts, Agreements, or Policies
**Endpoint:** `POST /compare`

Users upload two PDF documents side-by-side. NyayaAI performs clause-by-clause comparison using RAG-grounded analysis, highlighting:
- Clauses present in one document but missing in the other
- Conflicting terms between the two documents
- Differences in liability, indemnification, and termination terms
- A summary of which document is more favorable

---

### 3. Highlighting Important Clauses, Obligations, Risks, or Inconsistencies
**Endpoint:** `POST /analyze` (Risk Radar component)

The Risk Radar visualization provides:
- **High/Medium/Low severity** tags for each identified risk
- Specific clause references with page numbers
- Impact assessment for each flagged issue
- Visual risk score gauge (0-100)

---

### 4. Answering Questions Based on Provided Legal Documents
**Endpoint:** `POST /ask`

Grounded Retrieval-Augmented Generation (RAG) Q&A system:
- Documents are chunked and indexed in FAISS vector store
- Queries are embedded and matched against document chunks
- Answers include **citation references** with page numbers
- Prompt injection defense layer blocks adversarial queries
- Legal knowledge base provides supplementary context

---

### 5. Helping Users Understand Their Options and Next Steps
**Endpoint:** `POST /action-plan`

Generates a structured, step-by-step action plan:
- Prioritized actions (Immediate / Within 1 Week / Within 1 Month)
- Specific deadlines for each action item
- Evidence checklist with completion tracking
- Lawyer questions to prepare for professional consultation

---

### 6. Generating Summaries, Checklists, or Actionable Outputs
**Frontend Components:** ActionPlanView, ExportModal

- Interactive evidence checklist with progress tracking
- Legal notice draft generator (Markdown export)
- One-click PDF/text export of full analysis reports
- Downloadable audit report with all findings

---

### 7. Helping Users Prepare Information for a Legal Professional
**Frontend Components:** ActionPlanView (Lawyer Questions section)

- Auto-generated list of specific questions to ask a lawyer
- Evidence collection checklist
- Timeline of critical actions and deadlines
- Formal legal notice template

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│  Dashboard │ Upload │ Analysis │ Compare │ Action Plan │ Q&A │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST API
┌──────────────────────────┴──────────────────────────────────┐
│                     Backend (FastAPI)                         │
│  ┌──────────┐ ┌──────────────┐ ┌────────────┐ ┌──────────┐ │
│  │ Security │ │DocumentService│ │ AI Service │ │VectorStore│ │
│  │ Service  │ │  + OCR       │ │ +Fallback  │ │ +FAISS   │ │
│  └──────────┘ └──────────────┘ └────────────┘ └──────────┘ │
│                                      │                       │
│                        ┌─────────────┴─────────────┐        │
│                        │   GPT-4o / Fallback Engine │        │
│                        │   + Legal Knowledge Base   │        │
│                        └───────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## GenAI Integration Points

| Component | GenAI Technology | Purpose |
|:---|:---|:---|
| AI Service | GPT-4o via OpenAI API | Document analysis, Q&A, comparison, action plans |
| Fallback Engine | Rule-based NLP (regex + heuristics) | Offline analysis when API is unavailable |
| Vector Store | OpenAI Embeddings + HuggingFace `all-MiniLM-L6-v2` | RAG retrieval for grounded answers |
| FAISS Index | Facebook AI Similarity Search | Fast nearest-neighbor search on document chunks |
| OCR Pipeline | Tesseract + pdf2image | Extract text from scanned legal documents |

## Disclaimer

NyayaAI provides **information and assistance** to help users understand legal documents. It does **not** replace professional legal advice. Users are always encouraged to consult qualified legal professionals for specific legal matters.
