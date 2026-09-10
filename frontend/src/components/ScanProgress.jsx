import {
  Upload,
  Shield,
  Database,
  Cpu,
  CheckCircle2,
} from "lucide-react";

const steps = [
  { icon: Upload, label: "Upload" },
  { icon: Shield, label: "Semgrep" },
  { icon: Database, label: "RAG" },
  { icon: Cpu, label: "Gemini" },
  { icon: CheckCircle2, label: "Validate" },
];

export default function ScanProgress({ step = 0 }) {
  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">
          Live Scan Pipeline
        </h3>

        <span className="text-cyan-400 text-sm font-semibold">
          Step {step + 1} / {steps.length}
        </span>
      </div>

      <div className="flex items-center justify-between">
        {steps.map((item, index) => {
          const Icon = item.icon;
          const active = index <= step;

          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`h-14 w-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                    active
                      ? "bg-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/30"
                      : "bg-slate-800 border-slate-700"
                  }`}
                >
                  <Icon
                    size={24}
                    className={active ? "text-white" : "text-slate-500"}
                  />
                </div>

                <span
                  className={`text-xs mt-3 ${
                    active ? "text-white" : "text-slate-500"
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 rounded bg-slate-700 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700 ${
                      index < step ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}