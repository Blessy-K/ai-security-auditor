import re

def run_semgrep(path):

    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        lines = f.readlines()

    findings = []

    for i, line in enumerate(lines, start=1):

        # SQL Injection
        if re.search(r'cursor\.execute\(".*"\s*\+', line):
            findings.append({
                "rule":"python-sqli-concat",
                "severity":"HIGH",
                "message":"SQL Injection",
                "line":i,
                "code":line.strip()
            })

        # XSS
        if re.search(r'innerHTML\s*=', line):
            findings.append({
                "rule":"xss",
                "severity":"HIGH",
                "message":"Cross Site Scripting",
                "line":i,
                "code":line.strip()
            })

        # Hardcoded credentials
        if re.search(
            r'password\s*=|api_key\s*=|secret\s*=|token\s*=',
            line,
            re.IGNORECASE
        ):
            findings.append({
                "rule":"hardcoded-credentials",
                "severity":"CRITICAL",
                "message":"Hardcoded Credential",
                "line":i,
                "code":line.strip()
            })

        # Weak crypto
        if re.search(r'hashlib\.md5|hashlib\.sha1', line):
            findings.append({
                "rule":"weak-crypto",
                "severity":"MEDIUM",
                "message":"Weak Cryptography",
                "line":i,
                "code":line.strip()
            })

    return findings