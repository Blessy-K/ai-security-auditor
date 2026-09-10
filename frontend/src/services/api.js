const API = "http://127.0.0.1:8000";

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