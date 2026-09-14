import PyPDF2
import tiktoken
from typing import List, Dict

class DocumentService:
    def __init__(self):
        self.encoder = tiktoken.get_encoding("cl100k_base")

    def extract_text(self, file_path: str) -> List[Dict]:
        text_with_pages = []
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                text_with_pages.append({"page": i + 1, "content": text})
        return text_with_pages

    def chunk_text(self, pages: List[Dict], chunk_size: int = 500, chunk_overlap: int = 50) -> List[Dict]:
        chunks = []
        for page in pages:
            content = page["content"]
            page_num = page["page"]
            
            tokens = self.encoder.encode(content)
            for i in range(0, len(tokens), chunk_size - chunk_overlap):
                chunk_tokens = tokens[i : i + chunk_size]
                chunk_text = self.encoder.decode(chunk_tokens)
                chunks.append({
                    "page": page_num,
                    "content": chunk_text,
                    "start_index": i
                })
        return chunks

document_service = DocumentService()
