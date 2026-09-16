"""Document processing service for PDF text extraction and chunking.

Provides text extraction from both native and scanned PDFs (via OCR),
and token-aware chunking for downstream RAG vector indexing.
"""

import PyPDF2
import tiktoken
from typing import List, Dict

class DocumentService:
    """Service for extracting and chunking text from legal PDF documents.

    Supports native PDF text extraction via PyPDF2 and falls back to
    OCR (Tesseract + pdf2image) for scanned document pages.
    """

    def __init__(self) -> None:
        """Initialize the document service with a tiktoken encoder."""
        self.encoder = tiktoken.get_encoding("cl100k_base")

    def extract_text(self, file_path: str) -> List[Dict]:
        """Extract text from each page of a PDF document.

        If a page contains fewer than 50 characters of extractable text,
        the OCR fallback pipeline is triggered automatically.

        Args:
            file_path: Absolute path to the PDF file.

        Returns:
            List of dicts with 'page' (int) and 'content' (str) keys.
        """
        text_with_pages = []
        try:
            with open(file_path, "rb") as f:
                reader = PyPDF2.PdfReader(f)
                for i, page in enumerate(reader.pages):
                    text = ""
                    try:
                        text = page.extract_text() or ""
                    except Exception:
                        text = ""
                    # If page contains minimal text (< 50 chars), attempt OCR extraction
                    if len(text.strip()) < 50:
                        ocr_text = self._ocr_fallback(file_path, i, page)
                        if ocr_text:
                            text = f"[OCR Extracted Page {i+1}]\n" + ocr_text

                    text_with_pages.append({"page": i + 1, "content": text})
        except Exception:
            # Fallback for corrupted/minimal PDFs that PyPDF2 fails to parse
            ocr_text = self._ocr_fallback(file_path, 0, None)
            text_with_pages.append({"page": 1, "content": ocr_text or ""})

        return text_with_pages

    def _ocr_fallback(self, file_path: str, page_num: int, page_obj) -> str:
        """Attempt OCR extraction on scanned PDF page images."""
        extracted = []
        # Method A: PyPDF2 image object extraction
        try:
            if hasattr(page_obj, "images") and page_obj.images:
                import pytesseract
                from PIL import Image
                import io
                for img in page_obj.images:
                    image = Image.open(io.BytesIO(img.data))
                    txt = pytesseract.image_to_string(image)
                    if txt.strip():
                        extracted.append(txt)
        except Exception:
            pass

        # Method B: pdf2image page rendering OCR
        if not extracted:
            try:
                from pdf2image import convert_from_path
                import pytesseract
                images = convert_from_path(file_path, first_page=page_num+1, last_page=page_num+1)
                if images:
                    txt = pytesseract.image_to_string(images[0])
                    if txt.strip():
                        extracted.append(txt)
            except Exception:
                pass

        return "\n".join(extracted)

    def chunk_text(self, pages: List[Dict], chunk_size: int = 500, chunk_overlap: int = 50) -> List[Dict]:
        """Split extracted page text into overlapping token-level chunks.

        Uses the cl100k_base tiktoken encoder for consistent tokenization
        aligned with OpenAI models.

        Args:
            pages: List of page dicts from extract_text().
            chunk_size: Maximum tokens per chunk.
            chunk_overlap: Number of overlapping tokens between adjacent chunks.

        Returns:
            List of chunk dicts with 'page', 'content', and 'start_index' keys.
        """
        chunks = []
        step = max(1, chunk_size - chunk_overlap if chunk_overlap < chunk_size else max(1, chunk_size // 2))
        for page in pages:
            content = page["content"]
            page_num = page["page"]
            
            tokens = self.encoder.encode(content)
            for i in range(0, len(tokens), step):
                chunk_tokens = tokens[i : i + chunk_size]
                chunk_text = self.encoder.decode(chunk_tokens)
                chunks.append({
                    "page": page_num,
                    "content": chunk_text,
                    "start_index": i
                })
        return chunks

document_service = DocumentService()
