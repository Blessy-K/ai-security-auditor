import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

export default function PdfButton({ file }) {
  const [loading, setLoading] = useState(false);

  const downloadPDF = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("http://127.0.0.1:8001/scan/pdf", {
        method: "POST",
        body: form,
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "AI_Security_Report.pdf";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to generate PDF.");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={downloadPDF}
      disabled={loading || !file}
      className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <Download size={18} />
      )}

      {loading ? "Generating..." : "Download PDF Report"}
    </button>
  );
}