import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path
import os
import json

# ---------- Load Environment ----------

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")

# ---------- Offline fallback ----------

def offline_analysis(finding):
    rule = finding["rule"]

    if rule == "python-sqli-concat":
        return {
            "cwe": "CWE-89",
            "owasp": "A03:2021 Injection",
            "risk": "HIGH",
            "explanation": "User input is directly concatenated into an SQL query, allowing SQL Injection attacks.",
            "fixed_code": """cursor.execute(
    "SELECT * FROM users WHERE id = ?",
    (user_id,)
)""",
            "why_fix_works": "Parameterized queries separate SQL code from user input.",
            "confidence": 0.95,
        }

    if rule == "xss":
        return {
            "cwe": "CWE-79",
            "owasp": "A03:2021 Injection",
            "risk": "HIGH",
            "explanation": "Unsanitized user input is rendered using innerHTML, allowing JavaScript execution.",
            "fixed_code": """const name = location.hash;
document.getElementById("app").textContent = name;""",
            "why_fix_works": "textContent treats input as plain text instead of HTML.",
            "confidence": 0.94,
        }

    if rule == "hardcoded-credentials":
        return {
            "cwe": "CWE-798",
            "owasp": "A07:2021 Identification and Authentication Failures",
            "risk": "CRITICAL",
            "explanation": "Secrets are stored directly in source code and may leak through repositories.",
            "fixed_code": """import os

api_key = os.getenv("API_KEY")
password = os.getenv("DB_PASSWORD")""",
            "why_fix_works": "Environment variables keep secrets outside the source code.",
            "confidence": 0.97,
        }

    if rule == "weak-crypto":
        return {
            "cwe": "CWE-327",
            "owasp": "A02:2021 Cryptographic Failures",
            "risk": "MEDIUM",
            "explanation": "MD5 is cryptographically broken and unsuitable for password hashing.",
            "fixed_code": """import bcrypt

hashed = bcrypt.hashpw(
    b"password",
    bcrypt.gensalt()
)""",
            "why_fix_works": "bcrypt is a secure adaptive password hashing algorithm.",
            "confidence": 0.93,
        }

    return {
        "cwe": "UNKNOWN",
        "owasp": "UNKNOWN",
        "risk": finding["severity"],
        "explanation": "Unknown vulnerability.",
        "fixed_code": "",
        "why_fix_works": "",
        "confidence": 0.50,
    }


# ---------- Gemini Analysis ----------

def analyze_all(code, findings):
    prompt = f"""
You are an OWASP cybersecurity expert.

Analyze ALL vulnerabilities and return ONLY a JSON array.

Each object MUST contain:
cwe
owasp
risk
explanation
fixed_code
why_fix_works
confidence

Source Code:
{code}

Findings:
{json.dumps(findings, indent=2)}
"""

    try:
        response = model.generate_content(prompt)

        text = (
            response.text.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(text)

    except Exception:
        return [offline_analysis(f) for f in findings]