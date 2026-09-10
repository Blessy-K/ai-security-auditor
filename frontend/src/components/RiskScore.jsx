import { Shield, TrendingUp, AlertTriangle } from "lucide-react";

export default function RiskScore({ report }) {
  if (!report) return null;

  const results = report.results || [];

  const critical = results.filter(
    (r) => r.finding.severity === "CRITICAL"
  ).length;

  const high = results.filter(
    (r) => r.finding.severity === "HIGH"
  ).length;

  const medium = results.filter(
    (r) => r.finding.severity === "MEDIUM"
  ).length;

  const score = Math.max(
    0,
    100 - critical * 25 - high * 15 - medium * 8
  );

  const circumference = 283;
  const offset = circumference - (score / 100) * circumference;

  const level =
    score >= 80
      ? "LOW RISK"
      : score >= 60
      ? "MODERATE"
      : score >= 40
      ? "HIGH RISK"
      : "CRITICAL";

  const color =
    score >= 80
      ? "#10B981"
      : score >= 60
      ? "#F59E0B"
      : score >= 40
      ? "#F97316"
      : "#EF4444";

  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-[#08142d] p-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="text-cyan-400" size={30} />
        <div>
          <h2 className="text-3xl font-black text-white">
            Executive Security Score
          </h2>
          <p className="text-slate-400">
            Overall project security posture
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Gauge */}
        <div className="flex justify-center">
          <div className="relative h-64 w-64">
            <svg className="h-full w-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="45"
                stroke="#1E293B"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="128"
                cy="128"
                r="45"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{
                  transition: "stroke-dashoffset 1.2s ease",
                }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-5xl font-black text-white">
                {score}
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Security Score
              </p>
              <span
                className="mt-3 px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: `${color}20`,
                  color,
                }}
              >
                {level}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-slate-800/60 p-5">
            <div className="flex justify-between">
              <span className="text-slate-400">
                Critical Vulnerabilities
              </span>
              <span className="text-red-400 font-bold">
                {critical}
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-800/60 p-5">
            <div className="flex justify-between">
              <span className="text-slate-400">
                High Risk Findings
              </span>
              <span className="text-orange-400 font-bold">
                {high}
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-800/60 p-5">
            <div className="flex justify-between">
              <span className="text-slate-400">
                Medium Risk Findings
              </span>
              <span className="text-yellow-400 font-bold">
                {medium}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp
                className="text-cyan-300"
                size={18}
              />
              <span className="font-semibold text-cyan-300">
                AI Recommendation
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-6">
              Prioritize fixing all Critical findings first, then High severity injection vulnerabilities to significantly improve the overall security posture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}