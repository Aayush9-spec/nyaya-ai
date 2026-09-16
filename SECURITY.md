# Security Policy — NyayaAI

## Threat Model

NyayaAI processes sensitive legal documents. The following threats are addressed:

| Threat | Mitigation |
|:---|:---|
| **Prompt Injection** | `SecurityService` regex-based detection blocks 50+ known injection patterns before any AI call |
| **Unauthorized File Upload** | Strict `.pdf` extension validation + MIME type checking on all upload endpoints |
| **XSS / Content Injection** | `X-Content-Type-Options: nosniff` header prevents MIME sniffing; CSP restricts inline scripts |
| **Clickjacking** | `X-Frame-Options: DENY` prevents iframe embedding |
| **Data Exfiltration** | No document text is stored permanently; uploaded files are processed in-memory and discarded |
| **API Abuse** | CORS restricted to known deployment origins |

## Security Headers

Every HTTP response includes:

- `Content-Security-Policy: default-src 'self'`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Prompt Injection Defense

All user-supplied text queries pass through `SecurityService.check_prompt_injection()` before reaching the AI model. The service checks against a curated list of known injection patterns including:

- "ignore previous instructions"
- "disregard all prior"
- "reveal your instructions"
- "forget everything"
- "you are now a"
- "act as a"
- "system prompt"

Blocked queries return HTTP 400 with a clear security alert message.

## Data Handling

- **No persistent storage**: Uploaded PDFs are processed for text extraction, then the extracted text is held in-memory only for the duration of the session.
- **No PII collection**: NyayaAI does not collect, store, or transmit personally identifiable information.
- **Encryption in transit**: All production deployments enforce HTTPS via HSTS headers.

## Responsible Disclosure

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public GitHub issue.
2. Email: **security@nyayaai.example.com**
3. Include: description, reproduction steps, and potential impact.
4. We will acknowledge receipt within 48 hours and provide a fix timeline within 7 days.

## Supported Versions

| Version | Supported |
|:---|:---:|
| 1.x (current) | ✅ |

## Dependencies

All dependencies are pinned in `requirements.txt` (backend) and `package.json` (frontend). We regularly audit for known CVEs using `pip-audit` and `npm audit`.
