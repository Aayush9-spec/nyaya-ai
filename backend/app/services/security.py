import re
from fastapi import HTTPException

class SecurityService:
    def __init__(self):
        # Common prompt injection patterns
        self.injection_patterns = [
            r"ignore previous instructions",
            r"disregard all prior",
            r"system prompt",
            r"you are now a",
            r"act as a",
            r"reveal your instructions",
            r"forget everything"
        ]

    def check_prompt_injection(self, text: str):
        for pattern in self.injection_patterns:
            if re.search(pattern, text, re.IGNORECASE):
                raise HTTPException(
                    status_code=400, 
                    detail="Security Alert: Potential prompt injection detected. Please rephrase your request."
                )
        return True

security_service = SecurityService()
