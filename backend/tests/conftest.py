"""Shared pytest fixtures for NyayaAI backend tests."""
import os
import sys
import pytest
from fastapi.testclient import TestClient

# Ensure the backend app module is importable
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.main import app


@pytest.fixture
def client():
    """Create a FastAPI TestClient for endpoint testing."""
    return TestClient(app)


@pytest.fixture
def sample_pdf_path():
    """Return the path to the bundled sample rental agreement PDF."""
    path = os.path.join(
        os.path.dirname(__file__), "..", "..", "frontend", "public", "sample_rental_agreement.pdf"
    )
    return os.path.abspath(path)


@pytest.fixture
def sample_chunks():
    """Return pre-built document chunks for unit testing."""
    return [
        {"page": 1, "content": "The monthly rent is 25000 payable on the 5th.", "start_index": 0},
        {"page": 1, "content": "Security deposit of 100000 is non-refundable.", "start_index": 50},
        {"page": 2, "content": "Tenant may terminate by giving 60 days notice.", "start_index": 0},
    ]
