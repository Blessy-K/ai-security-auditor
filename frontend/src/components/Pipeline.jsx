import {
  Upload,
  ShieldCheck,
  Database,
  Sparkles,
  CheckCircle,
} from "lucide-react";

const steps = [
  { icon: Upload, label: "Upload", color: "text-cyan-400" },
  { icon: ShieldCheck, label: "Semgrep", color: "text-emerald-400" },
  { icon: Database, label: "RAG", color: "text-violet-400" },
  { icon: Sparkles, label: "Gemini", color: "text-fuchsia-400" },
  { icon: CheckCircle, label: "Validated", color: "text-green-400" },
];

export default function Pipeline() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">
      <h2 className="text-xl font-bold text-white mb-6">
        AI Scan Pipeline
      </h2>

      <div className="flex items-center justify-between overflow-x-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center min-w-[90px]">
                <div className="h-14 w-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg">
                  <Icon className={`${step.color}`} size={28} />
                </div>

                <p className="text-sm text-slate-300 mt-3">{step.label}</p>
              </div>

              {index !== steps.length - 1 && (
                <div className="flex-1 h-1 mx-3 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 opacity-80" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}