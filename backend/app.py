from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

import os
import shutil
import uuid
import zipfile

from scanners.semgrep_scanner import run_semgrep
from agents.analyzer import analyze_all
from agents.validator import validate_patch
from reports.pdf_report import generate_pdf

# -------------------- ENV -------------------- #

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")

# -------------------- APP -------------------- #

app = FastAPI(title="AI Security Auditor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
EXTRACT_DIR = "extracted"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(EXTRACT_DIR, exist_ok=True)

SOURCE_EXTENSIONS = (
    ".py", ".js", ".ts", ".java",
    ".c", ".cpp", ".cc",
    ".cs", ".go", ".php",
    ".rb", ".rs", ".swift",
    ".kt", ".scala", ".txt"
)

# -------------------- MODELS -------------------- #

class ChatRequest(BaseModel):
    question: str

# -------------------- HOME -------------------- #

@app.get("/")
def home():
    return {
        "status": "running",
        "project": "AI Security Auditor"
    }

# -------------------- ZIP EXTRACTION -------------------- #

def extract_zip(zip_path: str):
    folder = os.path.join(EXTRACT_DIR, str(uuid.uuid4()))
    os.makedirs(folder, exist_ok=True)

    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(folder)

    targets = []

    for root, _, files in os.walk(folder):
        for f in files:
            if f.lower().endswith(SOURCE_EXTENSIONS):
                targets.append(os.path.join(root, f))

    return targets

# -------------------- SCAN ENGINE -------------------- #

def scan_targets(targets):
    results = []

    for target in targets:
        findings = run_semgrep(target)

        if not findings:
            continue

        try:
            with open(target, "r", encoding="utf-8", errors="ignore") as f:
                code = f.read()
        except Exception:
            code = ""

        analyses = analyze_all(code, findings)

        for finding, analysis in zip(findings, analyses):
            validation = validate_patch(
                finding,
                analysis.get("fixed_code", "")
            )

            results.append({
                "file": target,
                "finding": finding,
                "analysis": analysis,
                "validation": validation
            })

    return results

# -------------------- SCAN API -------------------- #

@app.post("/scan")
async def scan_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    targets = (
        extract_zip(file_path)
        if file.filename.lower().endswith(".zip")
        else [file_path]
    )

    results = scan_targets(targets)

    return {
        "filename": file.filename,
        "files_scanned": len(targets),
        "total_vulnerabilities": len(results),
        "results": results
    }

# -------------------- PDF REPORT -------------------- #

@app.post("/scan/pdf")
async def scan_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    targets = (
        extract_zip(file_path)
        if file.filename.lower().endswith(".zip")
        else [file_path]
    )

    results = scan_targets(targets)

    pdf_path = generate_pdf(file.filename, results)

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="security_report.pdf"
    )

# -------------------- AI SECURITY ASSISTANT -------------------- #

@app.post("/chat")
def chat(req: ChatRequest):
    prompt = f"""
You are an expert cybersecurity assistant.

Answer in a concise, technical, interview-quality way.

Question:
{req.question}
"""

    try:
        response = model.generate_content(prompt)
        return {"answer": response.text}

    except Exception as e:
        return {"answer": f"Gemini API Error: {str(e)}"}