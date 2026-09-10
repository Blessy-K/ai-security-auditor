import { Copy, Bug, ShieldCheck } from "lucide-react";

export default function CodeDiff({
  vulnerable,
  fixed,
  dark = true,
}) {
  const copy = () => {
    navigator.clipboard.writeText(fixed || "");
  };

  return (
    <div
      className={`rounded-2xl overflow-hidden border transition-colors ${
        dark
          ? "border-slate-700 bg-slate-900"
          : "border-slate-300 bg-white"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-3 border-b ${
          dark
            ? "bg-slate-800 border-slate-700"
            : "bg-slate-100 border-slate-300"
        }`}
      >
        <h3
          className={`font-semibold ${
            dark ? "text-white" : "text-slate-900"
          }`}
        >
          AI Code Diff
        </h3>

        <button
          onClick={copy}
          className={`flex items-center gap-1 text-sm transition ${
            dark
              ? "text-slate-300 hover:text-white"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Copy size={15} />
          Copy Fix
        </button>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Vulnerable */}
        <div
          className={`border-r ${
            dark
              ? "border-slate-700 bg-red-950/20"
              : "border-slate-300 bg-red-50"
          }`}
        >
          <div
            className={`flex items-center gap-2 px-4 py-3 border-b ${
              dark
                ? "border-red-500/20"
                : "border-red-200"
            }`}
          >
            <Bug
              className={
                dark ? "text-red-400" : "text-red-600"
              }
              size={18}
            />
            <span
              className={`font-semibold ${
                dark ? "text-red-300" : "text-red-700"
              }`}
            >
              Vulnerable
            </span>
          </div>

          <pre
            className={`p-4 overflow-x-auto text-sm whitespace-pre-wrap ${
              dark ? "text-red-200" : "text-red-900"
            }`}
          >
            <code>{vulnerable}</code>
          </pre>
        </div>

        {/* Secure Fix */}
        <div
          className={
            dark ? "bg-emerald-950/20" : "bg-emerald-50"
          }
        >
          <div
            className={`flex items-center gap-2 px-4 py-3 border-b ${
              dark
                ? "border-emerald-500/20"
                : "border-emerald-200"
            }`}
          >
            <ShieldCheck
              className={
                dark
                  ? "text-emerald-400"
                  : "text-emerald-600"
              }
              size={18}
            />
            <span
              className={`font-semibold ${
                dark
                  ? "text-emerald-300"
                  : "text-emerald-700"
              }`}
            >
              AI Secure Fix
            </span>
          </div>

          <pre
            className={`p-4 overflow-x-auto text-sm whitespace-pre-wrap ${
              dark
                ? "text-emerald-200"
                : "text-emerald-900"
            }`}
          >
            <code>{fixed}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}