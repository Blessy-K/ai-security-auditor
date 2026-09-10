import {
  ShieldAlert,
  AlertTriangle,
  FileCode2,
  Flame,
} from "lucide-react";
import CountUp from "./CountUp";

export default function SummaryCards({ report, dark }) {
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

  const cards = [
    {
      title: "Files Scanned",
      value: report.files_scanned,
      icon: FileCode2,
      color: "cyan",
    },
    {
      title: "Vulnerabilities",
      value: report.total_vulnerabilities,
      icon: ShieldAlert,
      color: "violet",
    },
    {
      title: "Critical",
      value: critical,
      icon: Flame,
      color: "red",
    },
    {
      title: "High Risk",
      value: high + medium,
      icon: AlertTriangle,
      color: "orange",
    },
  ];

  const colors = {
    cyan: {
      icon: "text-cyan-500",
      border: "border-cyan-500/20",
      bgDark: "from-cyan-500/10 to-cyan-900/10",
      bgLight: "from-cyan-50 to-white",
    },
    violet: {
      icon: "text-violet-500",
      border: "border-violet-500/20",
      bgDark: "from-violet-500/10 to-violet-900/10",
      bgLight: "from-violet-50 to-white",
    },
    red: {
      icon: "text-red-500",
      border: "border-red-500/20",
      bgDark: "from-red-500/10 to-red-900/10",
      bgLight: "from-red-50 to-white",
    },
    orange: {
      icon: "text-orange-500",
      border: "border-orange-500/20",
      bgDark: "from-orange-500/10 to-orange-900/10",
      bgLight: "from-orange-50 to-white",
    },
  };

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        const style = colors[card.color];

        return (
          <div
            key={card.title}
            className={`rounded-3xl border bg-gradient-to-br p-5 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] ${
              style.border
            } ${
              dark
                ? `${style.bgDark} bg-slate-900`
                : `${style.bgLight} bg-white shadow-sm`
            }`}
          >
            <div className="flex items-center justify-between">
              <Icon size={28} className={style.icon} />

              <div
                className={`h-2 w-2 rounded-full animate-pulse ${style.icon.replace(
                  "text-",
                  "bg-"
                )}`}
              />
            </div>

            <p
              className={`mt-5 text-sm ${
                dark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {card.title}
            </p>

            <h2
              className={`text-4xl font-black mt-1 ${
                dark ? "text-white" : "text-slate-900"
              }`}
            >
              <CountUp value={card.value} />
            </h2>
          </div>
        );
      })}
    </section>
  );
}