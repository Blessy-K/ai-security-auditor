import {
  Shield,
  Sparkles,
  Activity,
  Database,
  Cpu,
  CheckCircle,
} from "lucide-react";

export default function Hero({ dark }) {
  const steps = [
    { icon: Activity, label: "Upload", color: "text-cyan-400" },
    { icon: Shield, label: "Semgrep", color: "text-emerald-400" },
    { icon: Database, label: "RAG", color: "text-violet-400" },
    { icon: Cpu, label: "Gemini", color: "text-pink-400" },
    { icon: CheckCircle, label: "Validate", color: "text-green-400" },
  ];

  return (
    <section
      className={`relative overflow-hidden rounded-[24px] md:rounded-[32px] border p-5 sm:p-7 lg:p-10 shadow-2xl transition-all duration-500 ${
        dark
          ? "border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"
          : "border-slate-200 bg-gradient-to-br from-white via-slate-50 to-cyan-50"
      }`}
    >
      {/* Background Glow */}
      <div className="absolute -top-16 -right-16 h-48 w-48 md:h-72 md:w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-40 w-40 md:h-64 md:w-64 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div
            className={`rounded-3xl p-4 md:p-5 border backdrop-blur shrink-0 ${
              dark
                ? "bg-cyan-500/15 border-cyan-400/20"
                : "bg-cyan-100 border-cyan-200"
            }`}
          >
            <Shield size={42} className="text-cyan-500 md:w-[46px] md:h-[46px]" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-cyan-500 mb-2">
              <Sparkles size={18} />
              <span className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase">
                Autonomous AI Security
              </span>
            </div>

            <h1
              className={`text-3xl sm:text-4xl lg:text-6xl font-black leading-tight ${
                dark ? "text-white" : "text-slate-900"
              }`}
            >
              AI Security Auditor
            </h1>

            <p
              className={`mt-3 text-sm sm:text-base lg:text-lg ${
                dark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Static Analysis • OWASP RAG • Gemini AI • Patch Validation
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {[
            {
              title: "Semgrep + Custom Rules",
              label: "Detection Engine",
              border: "border-cyan-500/20",
            },
            {
              title: "Gemini 1.5 Flash",
              label: "AI Model",
              border: "border-purple-500/20",
            },
            {
              title: "OWASP + CWE RAG",
              label: "Knowledge Base",
              border: "border-emerald-500/20",
            },
          ].map((card) => (
            <div
              key={card.label}
              className={`rounded-2xl border p-5 backdrop-blur transition ${
                dark
                  ? `${card.border} bg-white/5`
                  : `${card.border} bg-white shadow-sm`
              }`}
            >
              <p
                className={`text-sm ${
                  dark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {card.label}
              </p>

              <h3
                className={`mt-2 text-lg md:text-xl font-bold ${
                  dark ? "text-white" : "text-slate-900"
                }`}
              >
                {card.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Pipeline */}
        <div
          className={`mt-8 rounded-2xl border p-5 md:p-6 backdrop-blur ${
            dark
              ? "border-white/10 bg-black/20"
              : "border-slate-200 bg-white/70"
          }`}
        >
          <h3
            className={`mb-5 text-lg font-semibold ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            Scan Pipeline
          </h3>

          {/* Mobile */}
          <div className="flex flex-col gap-4 md:hidden">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.label} className="flex items-center gap-4">
                  <div
                    className={`h-12 w-12 rounded-xl border flex items-center justify-center ${
                      dark
                        ? "border-slate-700 bg-slate-800"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <Icon size={22} className={step.color} />
                  </div>

                  <span
                    className={`font-medium ${
                      dark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    {index + 1}. {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between overflow-x-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.label}
                  className="flex items-center flex-1 min-w-max"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-14 w-14 rounded-2xl border flex items-center justify-center shadow-lg ${
                        dark
                          ? "border-slate-700 bg-slate-800/80"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <Icon size={24} className={step.color} />
                    </div>

                    <span
                      className={`mt-3 text-sm ${
                        dark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {index !== steps.length - 1 && (
                    <div className="mx-4 h-[2px] flex-1 min-w-[80px] bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 opacity-80" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}