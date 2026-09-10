import {
  History,
  Clock,
  FileCode2,
  ShieldAlert,
  Trash2,
} from "lucide-react";

export default function ScanHistory({
  history,
  onClear,
}) {
  if (!history?.length) return null;

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <History
            className="text-cyan-400"
            size={24}
          />
          <div>
            <h2 className="text-2xl font-bold text-white">
              Scan History
            </h2>
            <p className="text-slate-400 text-sm">
              Last 10 scans stored locally
            </p>
          </div>
        </div>

        <button
          onClick={onClear}
          className="flex items-center gap-2 rounded-xl bg-red-500/15 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/25"
        >
          <Trash2 size={16} />
          Clear
        </button>
      </div>

      <div className="space-y-3">
        {history.map((scan, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-800/40 p-4 transition hover:border-cyan-500/30"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-slate-700 flex items-center justify-center">
                <FileCode2
                  className="text-cyan-400"
                  size={22}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  {scan.filename}
                </h3>

                <div className="mt-1 flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {scan.time}
                  </span>

                  <span>{scan.files_scanned} files</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-1 font-bold text-red-400">
                <ShieldAlert size={16} />
                {scan.total_vulnerabilities}
              </div>

              <p className="text-xs text-slate-500">
                vulnerabilities
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}