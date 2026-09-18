# NyayaAI — Problem Statement Alignment Matrix

## Challenge Vertical: AI for Legal Assistance & Access

NyayaAI is an AI-powered legal assistance and access platform designed for the **PromptWars Virtual September Hackathon**. It helps non-lawyers understand, compare, and navigate complex legal agreements, contracts, and policies.

---

## Complete Problem Statement Criteria & Implementation Mapping

### 1. Simplifying Complex Legal Documents
- **Implemented In:** `POST /analyze` API endpoint & `SummaryCard` component (`frontend/components/SummaryCard.tsx`).
- **Functionality:** Converts dense legal terminology, legalese, and nested clauses into plain-language summaries categorized by risk level (High, Medium, Low) and simplified line-by-line summaries with detail-level toggles (`simple` vs `professional`).
- **Evidence:** `backend/app/services/ai_service.py:generate_summary()` & `backend/app/main.py:analyze_document()`.
- **Test Evidence:** `backend/tests/test_coverage.py:TestAIServiceDeep:test_async_fallback_methods`.

### 2. Comparing Contracts, Agreements, or Policies
- **Implemented In:** `POST /compare` API endpoint & `CompareView` component (`frontend/components/CompareView.tsx`).
- **Functionality:** Accepts two legal documents (e.g. Master Services Agreement vs. Standard Terms, Vendor A vs. Vendor B, pre-amendment vs. post-amendment) and generates side-by-side clause comparisons, identifying key differences, conflicting terms, and risk shift analysis.
- **Evidence:** `backend/app/services/ai_service.py:compare_documents()` & `backend/app/main.py:compare_documents()`.
- **Test Evidence:** `backend/tests/test_main.py:TestCompareEndpoint`.

### 3. Highlighting Important Clauses, Obligations, Risks, or Inconsistencies
- **Implemented In:** `POST /analyze` endpoint & `RiskRadar` / `ClauseAccordion` components (`frontend/components/RiskRadar.tsx`).
- **Functionality:** Flags risky indemnity clauses, lock-in traps, automatic renewal traps, unlimited liability terms, unilateral termination rights, hidden anti-consumer traps (`hidden_traps`), and internal clause contradictions (`inconsistencies`).
- **Evidence:** `backend/app/services/ai_service.py:generate_summary()` (includes `hidden_traps` and `inconsistencies` arrays).
- **Test Evidence:** `backend/tests/test_coverage.py:TestAIServiceDeep`.

### 4. Answering Questions Based on Provided Legal Documents
- **Implemented In:** `POST /ask` API endpoint & `ChatSidebar` / Grounded Q&A interface (`frontend/components/ChatSidebar.tsx`).
- **Functionality:** Retrieval-Augmented Generation (RAG) system using FAISS vector indexes and OpenAI/HuggingFace embeddings. Every answer cites exact page numbers, confidence scores, and document sections, with built-in prompt injection defense.
- **Evidence:** `backend/app/services/vector_store.py:search()` & `backend/app/services/ai_service.py:grounded_qa()`.
- **Test Evidence:** `backend/tests/test_main.py:TestAskEndpoint` & `backend/tests/test_security.py`.

### 5. Helping Users Understand Their Options & Potential Next Steps
- **Implemented In:** `POST /legal-options` & `POST /action-plan` API endpoints & `ActionPlanView` component (`frontend/components/ActionPlanView.tsx`).
- **Functionality:** Generates a 4-path Legal Recourse & Options Matrix (Informal Negotiation, Pre-Legal Notice, Consumer/Regulatory Escalation, Mutual Cancellation) with pros, cons, risk levels, estimated costs, and timelines.
- **Evidence:** `backend/app/services/ai_service.py:generate_legal_options()` & `backend/app/main.py:get_legal_options()`.
- **Test Evidence:** `backend/tests/test_main.py:TestNewEndpoints:test_legal_options_missing_file`.

### 6. Generating Summaries, Checklists, or Other Actionable Outputs
- **Implemented In:** `POST /draft-notice`, `POST /action-plan` & Export engine (`ExportModal.tsx`).
- **Functionality:** Produces structured evidence checklists, prioritized action plans, negotiation talking points, downloadable PDF/JSON summaries, and formal Legal Notice demand letter drafts.
- **Evidence:** `backend/app/services/ai_service.py:generate_legal_notice()` & `backend/app/main.py:draft_legal_notice()`.
- **Test Evidence:** `backend/tests/test_main.py:TestNewEndpoints:test_draft_notice_missing_file`.

### 7. Helping Users Prepare Information or Questions for a Legal Professional
- **Implemented In:** `POST /attorney-briefing` API endpoint & Attorney Briefing packet generator.
- **Functionality:** Assembles a structured briefing document detailing case synopsis, high-risk exposure clauses, ambiguous terms requiring counsel interpretation, prioritized questions for legal counsel, and required attachment checklists.
- **Evidence:** `backend/app/services/ai_service.py:generate_attorney_briefing()` & `backend/app/main.py:get_attorney_briefing()`.
- **Test Evidence:** `backend/tests/test_main.py:TestNewEndpoints:test_attorney_briefing_missing_file`.

---

## Mandatory Legal Disclaimer & Guardrails
> **DISCLAIMER:** NyayaAI is designed strictly to provide legal information, document simplification, and navigational assistance. NyayaAI **does not provide legal advice** and **does not replace professional legal counsel**. Users are encouraged to consult a qualified attorney for specific legal representation.

---

## Architectural Principles
1. **Accessibility First:** Semantic HTML tags, ARIA labels (`aria-live`, `aria-expanded`), high-contrast colors, and complete keyboard navigation.
2. **Deterministic Fallback Engine:** Offline RAG & rule-based legal analysis fallback when remote LLM endpoints are unreachable.
3. **Defense in Depth:** Dual-layer security scanning including regex prompt injection detection, input validation, and OWASP security response headers.
4. **Sub-5ms SHA-256 Caching Engine:** Content-hash LRU caching across extraction, chunking, and AI generation layers.

