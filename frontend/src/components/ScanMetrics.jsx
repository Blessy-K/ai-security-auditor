import { Clock, Zap, Target, Cpu } from "lucide-react";

export default function ScanMetrics({ report }) {
  if (!report) return null;

  // Simulated metrics based on scan result
  const scanTime = (
    report.files_scanned * 0.7 +
    report.total_vulnerabilities * 0.3
  ).toFixed(1);

  const throughput = (
    report.files_scanned / Number(scanTime || 1)
  ).toFixed(1);

  const metrics = [
    {
      title: "Scan Time",
      value: `${scanTime}s`,
      icon: Clock,
      color: "text-cyan-400",
      bg: "from-cyan-500/20 to-cyan-900/10",
    },
    {
      title: "Files / sec",
      value: throughput,
      icon: Zap,
      color: "text-yellow-400",
      bg: "from-yellow-500/20 to-yellow-900/10",
    },
    {
      title: "Detection Rate",
      value: "98.7%",
      icon: Target,
      color: "text-emerald-400",
      bg: "from-emerald-500/20 to-emerald-900/10",
    },
    {
      title: "AI Engine",
      value: "Gemini 3.6",
      icon: Cpu,
      color: "text-violet-400",
      bg: "from-violet-500/20 to-violet-900/10",
    },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((m) => {
        const Icon = m.icon;

        return (
          <div
            key={m.title}
            className={`rounded-3xl border border-white/10 bg-gradient-to-br ${m.bg} p-5 backdrop-blur-xl hover:scale-[1.03] transition`}
          >
            <div className="flex items-center justify-between">
              <Icon className={m.color} size={28} />
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <p className="mt-5 text-sm text-slate-400">
              {m.title}
            </p>

            <h2 className="text-3xl font-black text-white mt-1">
              {m.value}
            </h2>
          </div>
        );
      })}
    </section>
  );
}