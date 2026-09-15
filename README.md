# NyayaAI - Legal Action Navigator & Document Analysis Platform

NyayaAI is an AI-powered legal document analysis and action navigation platform. It enables users to upload, analyze, query, and compare legal documents (such as rental agreements, contracts, and legal notices) while generating plain-language summaries, risk assessments, actionable next steps, and grounded legal Q&A.

---

## 🌟 Key Features

- 📑 **Legal Document Analysis**: Upload PDF agreements to extract key clauses, identify hidden risks/liabilities, and generate multi-lingual summaries in simple or detailed legal terms.
- 📋 **Step-by-Step Action Plans**: Translate complex legal jargon into actionable checklists, key deadlines, required documentation, and legal recourse options.
- 💬 **Grounded Legal Q&A (RAG)**: Chat with uploaded documents powered by vector embeddings and context retrieval with built-in prompt injection guardrails.
- ⚖️ **Document Comparison**: Compare two legal PDFs side-by-side to identify key differences, additions, and clause variations.
- 🛡️ **Security & Guardrails**: Built-in prompt injection detection and security controls to block malicious inputs and preserve user privacy.
- 📊 **Evaluation Dashboard**: Transparency metrics tracking grounded Q&A accuracy, citation precision, risk detection recall, and security benchmark scores.

---

## 🏗️ Architecture & Tech Stack

```
nyaya_ai/
├── backend/            # FastAPI REST API & AI/RAG Services
│   ├── app/
│   │   ├── api/        # API Routers & Controllers
│   │   ├── core/       # Configurations & Settings
│   │   ├── services/   # AI, Document Processing, Vector Store, Security
│   │   └── main.py     # FastAPI Application & Endpoints
│   ├── data/           # Legal Knowledge Base & Data Files
│   └── requirements.txt
└── frontend/           # Next.js App Router & Responsive UI
    ├── app/            # Pages & Routes (Main Dashboard, Evaluation)
    ├── components/     # Reusable UI Components
    ├── lib/            # Helper Utilities & API Integration
    └── package.json
```

### Technologies Used

- **Backend**: [FastAPI](https://fastapi.tiangolo.com/), Python 3.10+, [Uvicorn](https://www.uvicorn.org/), [LangChain](https://www.langchain.com/), OpenAI API, Anthropic API, PyPDF2, Vector Store.
- **Frontend**: [Next.js](https://nextjs.org/) (App Router), React 18, TypeScript, [Tailwind CSS](https://tailwindcss.com/), Framer Motion, Lucide Icons.

---

## 🚀 Quick Start Guide

### Prerequisites

- **Python**: `3.10+` installed
- **Node.js**: `18.x` or `20.x` and `npm` installed
- **API Keys**: OpenAI API Key (or Anthropic API Key)

---

### 1. Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   Create a `.env` file in the `backend/` directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   # Optional: ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

5. **Start the FastAPI server**:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   The backend API will be available at `http://localhost:8000`. You can explore interactive API docs at `http://localhost:8000/docs`.

---

### 2. Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Next.js development server**:
   ```bash
   npm run dev
   ```

4. **Access the web application**:
   Open your browser and navigate to `http://localhost:3000`.

---

## 🧪 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/analyze` | Upload a PDF document for analysis and summary generation. |
| `POST` | `/action-plan` | Generate an actionable step-by-step legal plan from document analysis. |
| `POST` | `/ask` | Ask questions grounded in uploaded document context (RAG). |
| `POST` | `/compare` | Upload two PDF documents for side-by-side comparative analysis. |
| `GET` | `/evaluate` | Retrieve system evaluation metrics and security test benchmark results. |
| `GET` | `/health` | Health check and knowledge base status endpoint. |

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
