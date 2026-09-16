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
| Simplifying complex legal documents | Plain-language summary with risk scores | `POST /analyze` |
| Comparing contracts, agreements, or policies | Side-by-side clause diff | `POST /compare` |
| Highlighting clauses, obligations, risks | Risk Radar with severity tags | `POST /analyze` |
| Answering questions based on legal documents | RAG Q&A with citations | `POST /ask` |
| Understanding options and next steps | Step-by-step Action Plan | `POST /action-plan` |
| Generating summaries, checklists, actionable outputs | Evidence checklist, legal notice draft | Frontend |
| Preparing information for a legal professional | Lawyer questions, notice draft | Frontend |

---

## 🌟 Key Features

- 📑 **Legal Document Analysis**: Upload PDF agreements to extract key clauses, identify hidden risks/liabilities, and generate multi-lingual summaries in simple or detailed legal terms
- 📋 **Step-by-Step Action Plans**: Translate complex legal jargon into actionable checklists, key deadlines, required documentation, and legal recourse options
- 💬 **Grounded Legal Q&A (RAG)**: Chat with uploaded documents powered by vector embeddings and context retrieval with built-in prompt injection guardrails
- ⚖️ **Document Comparison**: Compare two legal PDFs side-by-side to identify key differences, additions, and clause variations
- 🛡️ **Security & Guardrails**: Built-in prompt injection detection and OWASP security headers
- 📊 **Evaluation Dashboard**: Live RAG metrics tracking accuracy, citation precision, and security benchmarks
- 🔍 **OCR Support**: Scanned PDF processing via Tesseract + pdf2image
- 📥 **Export**: One-click PDF/Markdown export of analysis reports and legal notice drafts
- 🌐 **Multi-language**: English, Hindi, and Spanish support

---

## 🏗️ Tech Stack

| Layer | Technology |
|:---|:---|
| **Frontend** | Next.js (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | FastAPI, Python 3.10+, Uvicorn |
| **AI/ML** | OpenAI GPT-4o, LangChain, FAISS, HuggingFace Embeddings |
| **OCR** | Tesseract (pytesseract), pdf2image |
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
cd backend && python -m pytest tests/ -v

# Frontend build verification
cd frontend && npm run build
```

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/` | Welcome endpoint |
| `GET` | `/health` | Health check and KB readiness |
| `POST` | `/analyze` | Upload a PDF for analysis, risk scoring, and summary |
| `POST` | `/action-plan` | Generate step-by-step legal action plan |
| `POST` | `/ask` | Grounded RAG Q&A with citation references |
| `POST` | `/compare` | Side-by-side PDF comparison |
| `GET` | `/evaluate` | Live RAG and security evaluation metrics |
| `POST` | `/evaluate/run` | Run dynamic RAG benchmark audit |

Interactive API docs: `http://localhost:8000/docs`

---

## ⚠️ Assumptions

1. **Information, not legal advice**: NyayaAI provides information and assistance to help users understand legal documents. It does **not** replace professional legal advice.
2. **PDF format**: Documents must be in PDF format (native text or scanned).
3. **Language support**: Currently optimized for English, Hindi, and Spanish legal documents.
4. **API availability**: The system operates with a deterministic fallback when OpenAI API is unavailable.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
