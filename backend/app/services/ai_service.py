import os
import json
from openai import OpenAI
from typing import List, Dict, Any
from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        # Bypass any inherited local OpenAI-compatible proxy.
        self.client = OpenAI(
            api_key=os.getenv("OPENAI_API_KEY"),
            base_url="https://api.openai.com/v1",
        )
        self.model = "gpt-4o"

    def _get_persona(self, detail_level: str):
        if detail_level == "professional":
            return "You are a senior Indian legal counsel. Use precise legal terminology, cite specific statutory provisions, and maintain a formal, authoritative tone."
        return "You are a helpful legal guide. Use simple, plain language that a 15-year-old can understand. Avoid jargon; if you must use a legal term, explain it simply."

    async def generate_summary(self, document_text: str, language: str = "English", detail_level: str = "simple") -> Dict[str, Any]:
        persona = self._get_persona(detail_level)
        prompt = f"""
        {persona}
        Analyze the following legal document text and provide a structured analysis in {language}.
        
        Requirements:
        1. Plain language summary.
        2. Key obligations and rights.
        3. Critical deadlines or dates.
        4. A risk score (0-100) and a detailed risk breakdown (High/Medium/Low).

        Document Text:
        {document_text}

        Respond in JSON format:
        {{
            "summary": "...",
            "obligations": ["...", "..."],
            "rights": ["...", "..."],
            "deadlines": ["...", "..."],
            "risk_score": 0,
            "risk_breakdown": [
                {{"severity": "High", "issue": "...", "explanation": "...", "impact": "..."}},
            ]
        }}
        """
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "system", "content": f"{persona} Respond in {language}."},
                      {"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def generate_action_plan(self, summary: Dict, document_text: str, language: str = "English", detail_level: str = "simple") -> Dict[str, Any]:
        persona = self._get_persona(detail_level)
        prompt = f"""
        {persona}
        Based on the following legal summary and document text, create a source-grounded Action Plan for an ordinary person in {language}.
        
        Summary: {json.dumps(summary)}
        Document Text: {document_text}

        The Action Plan should include:
        1. Immediate steps (Today).
        2. Short-term steps (Before deadlines).
        3. Professional advice recommendation based on risk.
        4. An evidence checklist of documents to collect.
        5. Questions to ask a lawyer.

        Respond in JSON format:
        {{
            "action_plan": [
                {{"step": "...", "action": "...", "priority": "High/Medium/Low", "deadline": "..."}},
            ],
            "evidence_checklist": ["...", "..."],
            "lawyer_questions": ["...", "..."]
        }}
        """
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "system", "content": f"{persona} Respond in {language}."},
                      {"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def grounded_qa(self, query: str, context_chunks: List[Dict], language: str = "English", detail_level: str = "simple") -> Dict[str, Any]:
        persona = self._get_persona(detail_level)
        context_text = "\n\n".join([
            f"Source [{c['type']} - Page/File {c['metadata'].get('page', c['metadata'].get('source'))}]: {c['content']}" 
            for c in context_chunks
        ])
        
        prompt = f"""
        {persona}
        Answer the user's question based ONLY on the provided context. 
        If the answer is not in the context, explicitly state that you don't have sufficient evidence.
        
        Provide the answer in {language}.
        
        User Question: {query}
        
        Context:
        {context_text}

        Respond in JSON format:
        {{
            "answer": "...",
            "citations": [
                {{"source": "document/legal_kb", "page": 0, "text": "...", "confidence": 0.9}},
            ],
            "suggested_follow_ups": ["...", "..."]
        }}
        """
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "system", "content": f"{persona} Respond in {language}."},
                      {"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def compare_documents(self, doc1_text: str, doc2_text: str, language: str = "English") -> Dict[str, Any]:
        prompt = f"""
        You are an expert legal auditor. Compare two versions of a legal document in {language}.
        Identify key differences in:
        - Payment terms
        - Termination clauses
        - Liability
        - Obligations
        - Deadlines

        Document 1:
        {doc1_text}

        Document 2:
        {doc2_text}

        Respond in JSON format:
        {{
            "comparison": [
                {{"clause": "...", "v1": "...", "v2": "...", "status": "🔴 Red (Significant) / 🟠 Amber (Moderate) / 🟢 Green (Minor)", "explanation": "..."}},
            ],
            "overall_assessment": "..."
        }}
        """
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "system", "content": f"You are a legal auditor. Respond in {language}."},
                      {"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

ai_service = AIService()
