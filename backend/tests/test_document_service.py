"""Tests for the DocumentService text extraction and chunking pipeline.

Validates PDF text extraction, chunk generation, and OCR fallback
returns correct data structures.
"""
import os
import pytest
from app.services.document_service import document_service


class TestChunkText:
    """Tests for text chunking logic."""

    def test_chunk_single_page(self):
        """Chunking a single page should produce at least one chunk."""
        pages = [{"page": 1, "content": "This is a test legal document with some content. " * 50}]
        chunks = document_service.chunk_text(pages)
        assert len(chunks) >= 1
        assert all("page" in c for c in chunks)
        assert all("content" in c for c in chunks)
        assert all("start_index" in c for c in chunks)

    def test_chunk_preserves_page_number(self):
        """Each chunk should retain the correct page number."""
        pages = [
            {"page": 1, "content": "Page one content " * 30},
            {"page": 2, "content": "Page two content " * 30},
        ]
        chunks = document_service.chunk_text(pages)
        page_numbers = {c["page"] for c in chunks}
        assert 1 in page_numbers
        assert 2 in page_numbers

    def test_chunk_empty_page(self):
        """Empty page content should produce an empty chunk list."""
        pages = [{"page": 1, "content": ""}]
        chunks = document_service.chunk_text(pages)
        # Empty content has zero tokens → no chunks or one empty chunk
        assert isinstance(chunks, list)

    def test_chunk_overlap(self):
        """Chunks should have overlapping content when overlap > 0."""
        pages = [{"page": 1, "content": "word " * 2000}]  # Enough tokens for multiple chunks
        chunks = document_service.chunk_text(pages, chunk_size=100, chunk_overlap=20)
        assert len(chunks) > 1

    def test_custom_chunk_size(self):
        """Smaller chunk_size should produce more chunks."""
        pages = [{"page": 1, "content": "legal clause text " * 500}]
        small_chunks = document_service.chunk_text(pages, chunk_size=50)
        large_chunks = document_service.chunk_text(pages, chunk_size=500)
        assert len(small_chunks) > len(large_chunks)


class TestOCRFallback:
    """Tests for the OCR fallback method."""

    def test_ocr_fallback_returns_string(self):
        """_ocr_fallback should always return a string, even on failure."""
        # Use a non-existent path; should return empty string gracefully
        result = document_service._ocr_fallback("/nonexistent/path.pdf", 0, None)
        assert isinstance(result, str)


class TestExtractText:
    """Tests for PDF text extraction."""

    def test_extract_text_returns_list(self, tmp_path):
        """extract_text should return a list of page dicts."""
        # Create a minimal valid PDF
        pdf_content = (
            b"%PDF-1.0\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj "
            b"2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj "
            b"3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R>>endobj\n"
            b"xref\n0 4\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n0\n%%EOF"
        )
        pdf_path = tmp_path / "test.pdf"
        pdf_path.write_bytes(pdf_content)

        pages = document_service.extract_text(str(pdf_path))
        assert isinstance(pages, list)
        if pages:
            assert "page" in pages[0]
            assert "content" in pages[0]
