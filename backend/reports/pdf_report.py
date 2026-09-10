from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
import os

REPORT_DIR = "reports/generated"
os.makedirs(REPORT_DIR, exist_ok=True)

def generate_pdf(filename, results):

    pdf_path = os.path.join(REPORT_DIR, "security_report.pdf")

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    story = []

    story.append(Paragraph("<b>AI Security Auditor Report</b>", styles["Title"]))
    story.append(Paragraph(f"File: {filename}", styles["Normal"]))
    story.append(Paragraph(f"Total Vulnerabilities: {len(results)}", styles["Normal"]))

    story.append(Paragraph("<br/><br/>", styles["Normal"]))

    for r in results:

        story.append(
            Paragraph(
                f"<b>{r['finding']['rule']}</b>",
                styles["Heading2"]
            )
        )

        story.append(
            Paragraph(
                f"Severity: {r['finding']['severity']}",
                styles["Normal"]
            )
        )

        story.append(
            Paragraph(
                f"CWE: {r['analysis']['cwe']}",
                styles["Normal"]
            )
        )

        story.append(
            Paragraph(
                f"OWASP: {r['analysis']['owasp']}",
                styles["Normal"]
            )
        )

        story.append(
            Paragraph(
                f"Explanation: {r['analysis']['explanation']}",
                styles["Normal"]
            )
        )

        story.append(
            Paragraph(
                f"Confidence: {r['analysis']['confidence']}",
                styles["Normal"]
            )
        )

        story.append(Paragraph("<br/>", styles["Normal"]))

    doc.build(story)

    return pdf_path