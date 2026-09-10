import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";

export default function ScanToast({ open, onClose, report }) {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [open]);

  if (!open || !report) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top duration-500">
      <div className="w-96 rounded-2xl border border-emerald-500/30 bg-slate-900/95 backdrop-blur-xl p-5 shadow-2xl">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <CheckCircle2
              className="text-emerald-400 mt-1"
              size={28}
            />

            <div>
              <h3 className="font-bold text-white">
                Scan Completed
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                {report.total_vulnerabilities} vulnerabilities found across{" "}
                {report.files_scanned} files.
              </p>
            </div>
          </div>

          <button onClick={onClose}>
            <X className="text-slate-400 hover:text-white" size={18} />
          </button>
        </div>

        <div className="mt-4 h-2 rounded-full bg-slate-700 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}