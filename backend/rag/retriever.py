import json

def retrieve(rule):

    with open("rag/knowledge/owasp.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    mapping = {
        "python-sqli-concat": "CWE-89",
        "xss": "CWE-79",
        "hardcoded-credentials": "CWE-798",
        "weak-crypto": "CWE-327"
    }

    cwe = mapping.get(rule)

    for item in data:
        if item["id"] == cwe:
            return item

    return None