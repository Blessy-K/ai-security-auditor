import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { BarChart3 } from "lucide-react";

export default function Analytics({ report, dark }) {
  if (!report) return null;

  const results = report.results || [];

  const counts = {
    CRITICAL: results.filter((r) => r.finding.severity === "CRITICAL").length,
    HIGH: results.filter((r) => r.finding.severity === "HIGH").length,
    MEDIUM: results.filter((r) => r.finding.severity === "MEDIUM").length,
    LOW: results.filter((r) => r.finding.severity === "LOW").length,
  };

  const data = [
    { name: "Critical", value: counts.CRITICAL, color: "#ef4444" },
    { name: "High", value: counts.HIGH, color: "#f97316" },
    { name: "Medium", value: counts.MEDIUM, color: "#eab308" },
    { name: "Low", value: counts.LOW, color: "#22c55e" },
  ].filter((d) => d.value > 0);

  return (
    <section className="grid lg:grid-cols-3 gap-6">
      {/* Pie Chart */}
      <div
        className={`lg:col-span-2 rounded-3xl border p-6 backdrop-blur-xl transition-all duration-500 ${
          dark
            ? "border-white/10 bg-slate-900/70"
            : "border-slate-200 bg-white shadow-sm"
        }`}
      >
        <div className="flex items-center gap-3 mb-5">
          <BarChart3 className="text-cyan-500" />

          <div>
            <h2
              className={`text-2xl font-bold ${
                dark ? "text-white" : "text-slate-900"
              }`}
            >
              Severity Distribution
            </h2>

            <p
              className={`text-sm ${
                dark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Interactive vulnerability breakdown
            </p>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  background: dark ? "#0f172a" : "#ffffff",
                  border: dark
                    ? "1px solid #334155"
                    : "1px solid #e2e8f0",
                  borderRadius: "12px",
                  color: dark ? "#fff" : "#0f172a",
                }}
              />

              <Legend />

              <Pie
                data={data}
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
                animationDuration={900}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Overview */}
      <div
        className={`rounded-3xl border p-6 backdrop-blur-xl transition-all duration-500 ${
          dark
            ? "border-white/10 bg-slate-900/70"
            : "border-slate-200 bg-white shadow-sm"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-5 ${
            dark ? "text-white" : "text-slate-900"
          }`}
        >
          Risk Overview
        </h2>

        <div className="space-y-4">
          {[
            ["CRITICAL", counts.CRITICAL, "bg-red-500"],
            ["HIGH", counts.HIGH, "bg-orange-500"],
            ["MEDIUM", counts.MEDIUM, "bg-yellow-500"],
            ["LOW", counts.LOW, "bg-green-500"],
          ].map(([label, value, color]) => (
            <div key={label}>
              <div className="flex justify-between mb-2 text-sm">
                <span
                  className={
                    dark ? "text-slate-300" : "text-slate-600"
                  }
                >
                  {label}
                </span>

                <span
                  className={`font-bold ${
                    dark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {value}
                </span>
              </div>

              <div
                className={`h-2 rounded-full overflow-hidden ${
                  dark ? "bg-slate-800" : "bg-slate-200"
                }`}
              >
                <div
                  className={`h-full ${color}`}
                  style={{
                    width: `${
                      results.length
                        ? (value / results.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-8 rounded-2xl p-4 ${
            dark ? "bg-slate-800/60" : "bg-slate-50"
          }`}
        >
          <p
            className={`text-sm ${
              dark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Files Scanned
          </p>

          <h3 className="text-3xl font-black text-cyan-500">
            {report.files_scanned}
          </h3>

          <div
            className={`mt-4 pt-4 border-t ${
              dark ? "border-slate-700" : "border-slate-200"
            }`}
          >
            <p
              className={`text-sm ${
                dark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Total Vulnerabilities
            </p>

            <h3 className="text-3xl font-black text-red-500">
              {report.total_vulnerabilities}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}