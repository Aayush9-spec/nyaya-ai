import os
from typing import List, Dict, Any
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.docstore.document import Document

class VectorStoreService:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings()
        self.stores = {} # Store by filename: FAISS index
        self.kb_store = None # Global legal knowledge base

    def add_document(self, filename: str, chunks: List[Dict]):
        docs = [
            Document(
                page_content=chunk["content"], 
                metadata={"page": chunk["page"], "start_index": chunk["start_index"]}
            ) for chunk in chunks
        ]
        vector_store = FAISS.from_documents(docs, self.embeddings)
        self.stores[filename] = vector_store

    def init_kb(self, kb_dir: str):
        """Initialize the global legal knowledge base from text files."""
        kb_docs = []
        for filename in os.listdir(kb_dir):
            if filename.endswith(".txt"):
                with open(os.path.join(kb_dir, filename), "r") as f:
                    content = f.read()
                    # Simple chunking for KB
                    kb_docs.append(Document(
                        page_content=content, 
                        metadata={"source": filename}
                    ))
        
        if kb_docs:
            self.kb_store = FAISS.from_documents(kb_docs, self.embeddings)

    def search(self, filename: str, query: str, k: int = 4, include_kb: bool = True) -> List[Dict]:
        results = []
        
        # Search in user document
        if filename in self.stores:
            vector_store = self.stores[filename]
            doc_results = vector_store.similarity_search_with_score(query, k=k)
            for doc, score in doc_results:
                results.append({
                    "content": doc.page_content,
                    "metadata": doc.metadata,
                    "score": score,
                    "type": "document"
                })
        
        # Search in Knowledge Base
        if include_kb and self.kb_store:
            kb_results = self.kb_store.similarity_search_with_score(query, k=k)
            for doc, score in kb_results:
                results.append({
                    "content": doc.page_content,
                    "metadata": doc.metadata,
                    "score": score,
                    "type": "legal_kb"
                })
                
        return results

vector_store_service = VectorStoreService()
