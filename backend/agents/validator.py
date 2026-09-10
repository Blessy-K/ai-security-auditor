def validate_patch(finding, fixed_code):

    if fixed_code == "":
        return {
            "passed": False,
            "issues": ["No patch generated"]
        }

    if finding["rule"] == "python-sqli-concat":

        if "?" in fixed_code or "execute(" in fixed_code:
            return {
                "passed": True,
                "issues": []
            }

    if finding["rule"] == "hardcoded-credentials":

        if "os.getenv" in fixed_code:
            return {
                "passed": True,
                "issues": []
            }

    return {
        "passed": False,
        "issues": ["Patch requires manual review"]
    }