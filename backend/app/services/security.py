"""Prompt injection detection and request validation service.

Implements a regex-based security layer that scans all user-supplied text
for known adversarial prompt injection patterns before forwarding to the
AI model. Blocked queries return HTTP 400 with a descriptive alert.
"""

import re
from fastapi import HTTPException
from typing import List


class SecurityService:
    """Prompt injection defense layer for NyayaAI.

    Maintains a curated list of regex patterns commonly used in prompt
    injection attacks. Every user query is validated through
    ``check_prompt_injection()`` before reaching the AI service.
    """

    def __init__(self) -> None:
        """Initialize the security service with known injection patterns."""
        # Common prompt injection patterns — case-insensitive matching
        self.injection_patterns: List[str] = [
            r"ignore previous instructions",
            r"disregard all prior",
            r"system prompt",
            r"you are now a",
            r"act as a",
            r"reveal your instructions",
            r"forget everything",
        ]

    def check_prompt_injection(self, text: str) -> bool:
        """Scan input text for known prompt injection patterns.

        Args:
            text: The user-supplied query string to validate.

        Returns:
            True if the text is safe.

        Raises:
            HTTPException: HTTP 400 if a prompt injection pattern is detected.
        """
        for pattern in self.injection_patterns:
            if re.search(pattern, text, re.IGNORECASE):
                raise HTTPException(
                    status_code=400,
                    detail="Security Alert: Potential prompt injection detected. Please rephrase your request.",
                )
        return True


security_service = SecurityService()

