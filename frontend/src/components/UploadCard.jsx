import { useState } from "react";
import {
  UploadCloud,
  FileCode2,
  Loader2,
  CheckCircle2,
  X,
} from "lucide-react";
import ScanProgress from "./ScanProgress";

export default function UploadCard({
  onScanComplete,
  onFileSelected,
  dark,
}) {
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState("");

  const stages = [
    "Uploading source code...",
    "Running Semgrep scan...",
    "Retrieving OWASP RAG...",
    "Generating Gemini remediation...",
    "Validating secure patch...",
  ];

  const selectFile = (f) => {
    if (!f) return;
    setFile(f);
    onFileSelected?.(f);
  };

  const scanFile = async () => {
    if (!file) return;

    setLoading(true);
    setCurrentStep(0);
    setStatus(stages[0]);

    let index = 0;

    const timer = setInterval(() => {
      index++;
      if (index < stages.length) {
        setCurrentStep(index);
        setStatus(stages[index]);
      }
    }, 900);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("http://127.0.0.1:8001/scan", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      clearInterval(timer);
      setCurrentStep(4);
      setStatus("Analysis Complete");

      onScanComplete(data);
    } catch (err) {
      clearInterval(timer);
      alert("Backend connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`rounded-[30px] border p-8 shadow-xl transition-all duration-500 ${
        dark
          ? "border-white/10 bg-gradient-to-br from-slate-900 to-[#08142d]"
          : "border-slate-200 bg-gradient-to-br from-white to-slate-50"
      }`}
    >
      {/* Heading */}
      <div className="mb-6">
        <h2
          className={`text-4xl font-black ${
            dark ? "text-white" : "text-slate-900"
          }`}
        >
          Upload Source Code
        </h2>

        <p
          className={`mt-2 ${
            dark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Python • Java • JavaScript • C/C++ • ZIP Archive
        </p>
      </div>

      {/* Upload Area */}
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          selectFile(e.dataTransfer.files[0]);
        }}
        className={`group flex h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-all duration-300 ${
          drag
            ? "border-cyan-400 bg-cyan-500/10"
            : dark
            ? "border-cyan-500/40 bg-slate-950/40 hover:border-cyan-400 hover:bg-cyan-500/5"
            : "border-cyan-300 bg-white hover:border-cyan-500 hover:bg-cyan-50"
        }`}
      >
        <input
          hidden
          type="file"
          accept=".zip,.py,.js,.java,.cpp,.c,.txt"
          onChange={(e) => selectFile(e.target.files[0])}
        />

        <UploadCloud
          size={60}
          className="text-cyan-500 mb-4 group-hover:scale-110 transition-transform"
        />

        <h3
          className={`text-2xl font-bold ${
            dark ? "text-white" : "text-slate-900"
          }`}
        >
          Drop file or Choose File
        </h3>

        <p
          className={`mt-2 ${
            dark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Drag & drop your project here
        </p>

        {file && (
          <div className="mt-5 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
            <FileCode2 size={17} className="text-emerald-500" />

            <span className="text-emerald-600 text-sm font-medium">
              {file.name}
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                setFile(null);
              }}
            >
              <X
                size={15}
                className={`${
                  dark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              />
            </button>
          </div>
        )}
      </label>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between">
        {loading ? (
          <div className="flex items-center gap-3">
            <Loader2
              className="animate-spin text-cyan-500"
              size={20}
            />

            <div>
              <p className="text-cyan-500 font-medium">{status}</p>
              <p
                className={`text-sm ${
                  dark ? "text-slate-500" : "text-slate-600"
                }`}
              >
                AI security analysis running...
              </p>
            </div>
          </div>
        ) : file ? (
          <div className="flex items-center gap-3">
            <CheckCircle2
              className="text-emerald-500"
              size={22}
            />

            <div>
              <p
                className={`font-medium ${
                  dark ? "text-white" : "text-slate-900"
                }`}
              >
                {file.name}
              </p>

              <p
                className={`text-sm ${
                  dark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Ready to scan
              </p>
            </div>
          </div>
        ) : (
          <p
            className={`${
              dark ? "text-slate-500" : "text-slate-600"
            }`}
          >
            Select a source file or ZIP archive
          </p>
        )}

        <button
          disabled={!file || loading}
          onClick={scanFile}
          className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-bold text-white shadow-lg transition hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Scanning..." : "Start AI Scan"}
        </button>
      </div>

      {/* Live Pipeline */}
      {loading && (
        <div className="mt-8">
          <ScanProgress step={currentStep} />
        </div>
      )}
    </section>
  );
}