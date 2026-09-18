# NyayaAI — AI-Powered Legal Assistance & Access Platform

> **PromptWars Virtual September — AI for Legal Assistance & Access**
>
> GenAI-powered solution that makes legal information and basic legal assistance more accessible by helping users understand, compare, and navigate legal documents and information.

---

## 🎯 Chosen Vertical

**AI for Legal Assistance & Access** — Building a smart, dynamic assistant that simplifies complex legal documents, highlights risks, answers questions with cited sources, and generates actionable next steps for users.

---

## 🧠 Approach & Logic

NyayaAI combines **Retrieval-Augmented Generation (RAG)** with a **deterministic fallback engine** to provide reliable legal document analysis even when external AI APIs are unavailable:

1. **Document Ingestion**: PDF text extraction via PyPDF2 with automatic OCR fallback (Tesseract + pdf2image) for scanned documents
2. **Vector Indexing**: Token-aware chunking → FAISS vector store with dual embedding support (OpenAI + HuggingFace `all-MiniLM-L6-v2`)
3. **AI Analysis**: GPT-4o generates structured risk assessments, summaries, and action plans; a rule-based NLP engine provides offline fallback
4. **Security Layer**: Regex-based prompt injection detection blocks adversarial queries before they reach the AI model
5. **Grounded Q&A**: RAG pipeline retrieves relevant document chunks, grounds answers with page-level citations

---

## 🏗️ How the Solution Works

### Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js + React)                 │
│  Dashboard │ File Upload │ Analysis │ Compare │ Action Plan    │
│  Q&A Chat  │ Risk Radar  │ Evaluation │ Export                 │
└──────────────────────────┬────────────────────────────────────┘
                           │ REST API (FastAPI)
┌──────────────────────────┴────────────────────────────────────┐
│                        Backend (Python)                        │
│  ┌────────────┐ ┌────────────────┐ ┌───────────┐ ┌──────────┐│
│  │ Security   │ │ DocumentService│ │ AIService │ │VectorStore││
│  │ Service    │ │   + OCR        │ │ +Fallback │ │  +FAISS  ││
│  └────────────┘ └────────────────┘ └───────────┘ └──────────┘│
│                           │                                    │
│              ┌────────────┴────────────┐                      │
│              │  GPT-4o / Fallback NLP  │                      │
│              │  + Legal Knowledge Base  │                      │
│              └─────────────────────────┘                      │
└───────────────────────────────────────────────────────────────┘
```

### Problem Statement Alignment

| Problem Statement Use Case | NyayaAI Feature | Endpoint |
|:---|:---|:---|
| 1. Simplifying complex legal documents | Plain-language summary, legalese glossary, risk scores | `POST /analyze` |
| 2. Comparing contracts, agreements, or policies | Side-by-side clause diff & risk shift analysis | `POST /compare` |
| 3. Highlighting clauses, obligations, risks, inconsistencies | Risk Radar, hidden traps, inconsistency detector | `POST /analyze` |
| 4. Answering questions based on legal documents | Grounded RAG Q&A with citations & confidence scores | `POST /ask` |
| 5. Helping users understand options & next steps | Legal Recourse & Options Matrix (4 pathways) | `POST /legal-options` |
| 6. Generating summaries, checklists, actionable outputs | Action plans, evidence checklists, legal notice drafts | `POST /draft-notice` & `POST /action-plan` |
| 7. Preparing info & questions for a legal professional | Attorney Consultation Briefing Packet generator | `POST /attorney-briefing` |

---

## 🌟 Key Features

- 📑 **Legal Document Analysis**: Upload PDF agreements to extract key clauses, identify hidden traps/inconsistencies, and generate multi-lingual summaries in simple or detailed legal terms
- ⚖️ **Legal Recourse & Options Matrix**: Compare 4 distinct legal pathways (Informal Negotiation, Pre-Legal Notice, Consumer/Regulatory Escalation, Mutual Cancellation) with pros, cons, costs, and timelines
- 👔 **Attorney Consultation Briefing**: Generate structured briefing packets for consulting legal counsel with case synopses, ambiguous terms, and prioritized questions for lawyers
- 📜 **Legal Notice Generator**: Draft formal legal demand letters customized to contract terms and user disputes
- 📋 **Step-by-Step Action Plans**: Translate complex legal jargon into actionable checklists, key deadlines, required documentation, and recourse options
- 💬 **Grounded Legal Q&A (RAG)**: Chat with uploaded documents powered by vector embeddings and context retrieval with built-in prompt injection guardrails
- ⚖️ **Document Comparison**: Compare two legal PDFs side-by-side to identify key differences, additions, and clause risk shifts
- ⚡ **Async & Sub-5ms SHA-256 Caching Engine**: Native `AsyncOpenAI` non-blocking event loop execution with multi-tier content hashing for instant cached responses
- 🛡️ **Security & Guardrails**: Built-in prompt injection detection and OWASP security headers
- 📊 **Evaluation Dashboard**: Live RAG metrics tracking accuracy, citation precision, and security benchmarks

---

## 🏗️ Tech Stack

| Layer | Technology |
|:---|:---|
| **Frontend** | Next.js (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | FastAPI, Python 3.10+, Uvicorn, AsyncOpenAI |
| **AI/ML** | OpenAI GPT-4o, LangChain, FAISS, HuggingFace Embeddings |
| **OCR & PDF** | PyPDF / PyPDF2, Tesseract (pytesseract), pdf2image |
| **Performance** | SHA-256 multi-tier caching, Async non-blocking event loop, GZip compression |
| **Security** | Prompt injection detection, OWASP headers, CSP, HSTS |
| **Testing** | Pytest (backend), GitHub Actions CI |
| **Deployment** | Vercel (frontend) |

---

## 🚀 Quick Start

### Prerequisites

- **Python**: `3.10+`
- **Node.js**: `18.x` or `20.x`
- **API Key**: OpenAI API Key (optional — fallback engine works offline)

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your OPENAI_API_KEY

# Start server
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

### Run Tests

```bash
# Backend tests
cd backend && ./venv/bin/pytest tests/ -v

# Frontend build verification
cd frontend && npm run build
```

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/` | Welcome endpoint |
| `GET` | `/health` | Health check and KB readiness |
| `POST` | `/analyze` | Upload a PDF/text doc for analysis, risk scoring, hidden traps, & inconsistencies |
| `POST` | `/action-plan` | Generate step-by-step legal action plan & evidence checklist |
| `POST` | `/attorney-briefing` | Prepare structured attorney briefing packet with lawyer questions |
| `POST` | `/legal-options` | Generate 4-path Legal Recourse Options Matrix (costs & timelines) |
| `POST` | `/draft-notice` | Draft formal legal demand letter / notice customized to document |
| `POST` | `/ask` | Grounded RAG Q&A with citation references & confidence scores |
| `POST` | `/compare` | Side-by-side PDF comparison & risk shift evaluation |
| `GET` | `/evaluate` | Live RAG and security evaluation metrics |
| `POST` | `/evaluate/run` | Run dynamic RAG benchmark audit |

Interactive API docs: `http://localhost:8000/docs`

---

## ⚠️ Assumptions

1. **Information, not legal advice**: NyayaAI provides information and assistance to help users understand legal documents. It does **not** replace professional legal counsel.
2. **Document formats**: Supports PDF (native text or scanned via OCR) and plain text (.txt) documents.
3. **Language support**: Optimized for English, Hindi, and Spanish legal documents.
4. **Offline fallback**: The system operates with a deterministic legal analysis engine when OpenAI API is unavailable.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

