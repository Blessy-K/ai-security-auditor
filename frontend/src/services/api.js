const API = "https://ai-security-auditor-api.onrender.com";

export async function scanFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API}/scan`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Scan failed");
  }

  return await response.json();
}

export async function downloadPdf(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API}/scan/pdf`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("PDF generation failed");
  }

  return await response.blob();
}

export async function askAI(question) {
  const response = await fetch(`${API}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("AI Assistant failed");
  }

  return await response.json();
}