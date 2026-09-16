# Security Policy & Vulnerability Disclosure

## Overview
NyayaAI adheres to strict security standards to ensure user data confidentiality, API resilience, and defense against adversarial attacks.

---

## Supported Versions

| Version | Supported          | Security Updates |
| ------- | ------------------ | ---------------- |
| 1.0.x   | :white_check_mark: | Active           |
| < 1.0   | :x:                | Deprecated       |

---

## Security Protections Implemented

### 1. Adversarial Prompt Injection Defense
- **Pattern Matching Engine:** All incoming document Q&A queries pass through `SecurityService.check_prompt_injection()`.
- **Blocked Vectors:** Standard jailbreaks, instructions override, system prompt extraction, DAN modes, and role-playing attacks are rejected with HTTP 400.

### 2. HTTP Security Response Headers
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Content-Security-Policy: default-src 'self'...`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### 3. Dependency Vulnerability Monitoring
- Automated weekly Dependabot security audits configured via `.github/dependabot.yml`.
- GitHub CodeQL Static Application Security Testing (SAST) active via `.github/workflows/codeql.yml`.

---

## Reporting a Vulnerability

If you discover a security vulnerability within NyayaAI, please submit a report to `security@nyaya-ai.org` or open a confidential security advisory on GitHub.

**Response SLA:**
- **Initial Acknowledgment:** Within 24 hours
- **Severity Triage:** Within 48 hours
- **Patch Release:** Within 5 business days
