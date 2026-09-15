import os
from typing import List, Dict, Any
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from dotenv import load_dotenv

load_dotenv(override=True)

class VectorStoreService:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        self.embeddings = OpenAIEmbeddings(
            openai_api_key=api_key or "placeholder",
            openai_api_base="https://api.openai.com/v1",
        )
        self.stores = {} # Store by filename: FAISS index or raw chunks
        self.kb_store = None # Global legal knowledge base
        self.raw_chunks = {} # Fallback raw text storage: filename -> list of chunks
        self.kb_raw_docs = [] # Fallback raw KB docs

    def add_document(self, filename: str, chunks: List[Dict]):
        self.raw_chunks[filename] = chunks
        try:
            docs = [
                Document(
                    page_content=chunk["content"], 
                    metadata={"page": chunk["page"], "start_index": chunk["start_index"]}
                ) for chunk in chunks
            ]
            vector_store = FAISS.from_documents(docs, self.embeddings)
            self.stores[filename] = vector_store
        except Exception as e:
            print(f"Warning: Vector embedding index skipped ({e}). Using text-similarity fallback store.")
            self.stores[filename] = None

    def init_kb(self, kb_dir: str):
        """Initialize the global legal knowledge base from text files."""
        kb_docs = []
        if not os.path.exists(kb_dir):
            print(f"Warning: KB directory {kb_dir} not found.")
            return

        for filename in os.listdir(kb_dir):
            if filename.endswith(".txt"):
                with open(os.path.join(kb_dir, filename), "r") as f:
                    content = f.read()
                    doc = Document(
                        page_content=content, 
                        metadata={"source": filename}
                    )
                    kb_docs.append(doc)
                    self.kb_raw_docs.append({"content": content, "metadata": {"source": filename}})
        
        if kb_docs:
            try:
                self.kb_store = FAISS.from_documents(kb_docs, self.embeddings)
            except Exception as e:
                print(f"Warning: KB vector embedding skipped ({e}). Using text fallback for KB.")
                self.kb_store = None

    def search(self, filename: str, query: str, k: int = 4, include_kb: bool = True) -> List[Dict]:
        results = []
        query_words = set(query.lower().split())
        
        # 1. Search document store
        if filename in self.stores and self.stores[filename]:
            try:
                doc_results = self.stores[filename].similarity_search_with_score(query, k=k)
                for doc, score in doc_results:
                    results.append({
                        "content": doc.page_content,
                        "metadata": doc.metadata,
                        "score": float(score),
                        "type": "document"
                    })
            except Exception:
                pass

        # Fallback for document chunks if FAISS vector store search skipped/failed
        if not results and filename in self.raw_chunks:
            scored_chunks = []
            for chunk in self.raw_chunks[filename]:
                content_words = set(chunk["content"].lower().split())
                overlap = len(query_words.intersection(content_words))
                scored_chunks.append((overlap, chunk))
            scored_chunks.sort(key=lambda x: x[0], reverse=True)
            for _, chunk in scored_chunks[:k]:
                results.append({
                    "content": chunk["content"],
                    "metadata": {"page": chunk["page"], "start_index": chunk["start_index"]},
                    "score": 0.85,
                    "type": "document"
                })

        # 2. Search KB store
        if include_kb and self.kb_store:
            try:
                kb_results = self.kb_store.similarity_search_with_score(query, k=k)
                for doc, score in kb_results:
                    results.append({
                        "content": doc.page_content,
                        "metadata": doc.metadata,
                        "score": float(score),
                        "type": "legal_kb"
                    })
            except Exception:
                pass

        # Fallback for KB if FAISS vector search skipped/failed
        if include_kb and not any(r["type"] == "legal_kb" for r in results) and self.kb_raw_docs:
            for kb_doc in self.kb_raw_docs[:2]:
                results.append({
                    "content": kb_doc["content"][:600],
                    "metadata": kb_doc["metadata"],
                    "score": 0.80,
                    "type": "legal_kb"
                })

        return results

vector_store_service = VectorStoreService()

