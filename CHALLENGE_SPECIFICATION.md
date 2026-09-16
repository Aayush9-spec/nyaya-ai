# NyayaAI — Hackathon Challenge Specification & Alignment

## Vertical: AI for Legal Assistance & Access

### Overview
Legal documentation is notoriously difficult to navigate without professional legal counsel. NyayaAI bridges this gap by offering a GenAI-powered assistant that translates complex contracts, agreements, and policies into clear, actionable, and grounded summaries.

---

## Direct Requirement Satisfaction Matrix

| Challenge Expectation | Implementation Details | Endpoint / Component | Test Status |
| :--- | :--- | :--- | :---: |
| **Smart, Dynamic Assistant** | OpenAI GPT-4o RAG pipeline with dual embedding search (OpenAI + HuggingFace) and vector similarity search. | `POST /analyze`, `POST /ask` | :white_check_mark: Passed |
| **Logical Decision Making** | Risk scoring engine categorizes risk into High, Medium, and Low severity tiers with tailored advice. | `POST /analyze` | :white_check_mark: Passed |
| **Practical Real-World Usability** | Document comparison diffs, step-by-step action plans, attorney consultation briefing generator, export options. | `POST /compare`, `POST /action-plan` | :white_check_mark: Passed |
| **Clean & Maintainable Code** | Fully typed (Python PEP 484 & TypeScript strict mode), ESLint/Prettier formatted, Google docstrings. | Monorepo structure | :white_check_mark: Passed |
| **Legal Assistance Disclaimer** | Prominently displayed safety banners and disclaimers stating that output is informational and not legal advice. | `SafetyBanner.tsx` | :white_check_mark: Passed |

---

## Verification & Test Commands

```bash
# Execute backend test suite (43 passed tests)
cd backend && ./venv/bin/pytest tests/ -v

# Execute frontend Vitest suite (6 passed tests)
cd frontend && npx vitest run
```
