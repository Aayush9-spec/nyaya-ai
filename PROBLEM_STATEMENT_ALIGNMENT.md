# NyayaAI — Problem Statement Alignment Matrix

## Challenge Vertical: AI for Legal Assistance & Access

NyayaAI is an AI-powered legal assistance and access platform designed for the **PromptWars Virtual September Hackathon**. It helps non-lawyers understand, compare, and navigate complex legal agreements, contracts, and policies.

---

## Complete Problem Statement Criteria & Implementation Mapping

### 1. Simplifying Complex Legal Documents
- **Implemented In:** `POST /analyze` API endpoint & `SummaryCard` component (`frontend/components/SummaryCard.tsx`).
- **Functionality:** Converts dense legal terminology, legalese, and nested clauses into plain-language summaries categorized by risk level (High, Medium, Low) and simplified line-by-line summaries.
- **Evidence:** `backend/app/services/ai_service.py:analyze_document()`.

### 2. Comparing Contracts, Agreements, or Policies
- **Implemented In:** `POST /compare` API endpoint & `ComparisonModal` component (`frontend/components/modals/ComparisonModal.tsx`).
- **Functionality:** Accepts two legal documents (e.g. Master Services Agreement vs. Standard Terms, Vendor A vs. Vendor B, pre-amendment vs. post-amendment) and generates side-by-side clause comparisons, identifying key differences, conflicting terms, and risk shifts.
- **Evidence:** `backend/app/services/ai_service.py:compare_documents()`.

### 3. Highlighting Important Clauses, Obligations, Risks, or Inconsistencies
- **Implemented In:** `POST /analyze` endpoint & `RiskMeter` / `ClauseAccordion` components (`frontend/components/RiskMeter.tsx`).
- **Functionality:** Flags risky indemnity clauses, automatic renewal traps, unlimited liability terms, unilateral termination rights, and governing jurisdiction traps with visual risk badges.
- **Evidence:** `backend/app/services/ai_service.py:detect_risks()`.

### 4. Answering Questions Based on Provided Legal Documents
- **Implemented In:** `POST /ask` API endpoint & `ChatDrawer` / Grounded Q&A interface (`frontend/components/ChatDrawer.tsx`).
- **Functionality:** Retrieval-Augmented Generation (RAG) system using FAISS vector indexes and OpenAI/HuggingFace embeddings. Every answer cites exact page numbers, clauses, and document sections.
- **Evidence:** `backend/app/services/vector_store.py:search()`.

### 5. Helping Users Understand Their Options & Potential Next Steps
- **Implemented In:** `POST /action-plan` API endpoint & `ActionPlanModal` component (`frontend/components/modals/ActionPlanModal.tsx`).
- **Functionality:** Generates tailored legal option paths, risk-weighted recommendations, notice window timelines, and negotiation checklists.
- **Evidence:** `backend/app/services/ai_service.py:generate_action_plan()`.

### 6. Generating Summaries, Checklists, or Other Actionable Outputs
- **Implemented In:** `POST /action-plan` & `SummaryCard` PDF/JSON exporter.
- **Functionality:** Produces structured checklists, executive summaries, negotiation talking points, and downloadable action summaries.
- **Evidence:** `frontend/components/modals/ActionPlanModal.tsx`.

### 7. Helping Users Prepare Information or Questions for a Legal Professional
- **Implemented In:** Attorney Consultation Briefing generator (`AttorneyBriefing` tab).
- **Functionality:** Assembles a structured briefing document detailing key document parameters, flagged high-risk clauses, specific ambiguous terms, and prioritized questions for a licensed attorney.
- **Evidence:** `backend/app/services/ai_service.py:generate_attorney_briefing()`.

---

## Mandatory Legal Disclaimer & Guardrails
> **DISCLAIMER:** NyayaAI is designed strictly to provide legal information, document simplification, and navigational assistance. NyayaAI **does not provide legal advice** and **does not replace professional legal counsel**. Users are encouraged to consult a qualified attorney for specific legal representation.

---

## Architectural Principles
1. **Accessibility First:** Semantic HTML tags, ARIA labels (`aria-live`, `aria-expanded`), high-contrast colors, and complete keyboard navigation.
2. **Deterministic Fallback Engine:** Offline RAG & rule-based legal analysis fallback when remote LLM endpoints are unreachable.
3. **Defense in Depth:** Dual-layer security scanning including regex prompt injection detection, input validation, and OWASP security response headers.
