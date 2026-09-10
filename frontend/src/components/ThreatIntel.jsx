import {
  Shield,
  Target,
  Fingerprint,
  Gauge,
  AlertOctagon,
} from "lucide-react";

export default function ThreatIntel({ analysis }) {
  const cvss = {
    CRITICAL: "9.8",
    HIGH: "8.2",
    MEDIUM: "6.4",
    LOW: "3.1",
  };

  const mitre = {
    "CWE-89": "T1190",
    "CWE-79": "T1059",
    "CWE-798": "T1552",
    "CWE-327": "T1040",
  };

  const score = cvss[analysis.risk] || "5.0";
  const attack = mitre[analysis.cwe] || "T1595";

  const color = {
    CRITICAL: "bg-red-500/20 text-red-300 border-red-500/30",
    HIGH: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    MEDIUM: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    LOW: "bg-green-500/20 text-green-300 border-green-500/30",
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="text-cyan-400" size={18} />
        <h4 className="font-semibold text-cyan-300">
          Threat Intelligence
        </h4>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-900/60 p-3">
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Fingerprint size={12} />
            CWE
          </div>
          <p className="text-white font-bold mt-1">{analysis.cwe}</p>
        </div>

        <div className="rounded-xl bg-slate-900/60 p-3">
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Target size={12} />
            OWASP
          </div>
          <p className="text-white font-bold mt-1">{analysis.owasp}</p>
        </div>

        <div className="rounded-xl bg-slate-900/60 p-3">
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Gauge size={12} />
            CVSS
          </div>
          <p className="text-white font-bold mt-1">{score}</p>
        </div>

        <div className="rounded-xl bg-slate-900/60 p-3">
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <AlertOctagon size={12} />
            MITRE
          </div>
          <p className="text-white font-bold mt-1">{attack}</p>
        </div>

        <div className="rounded-xl bg-slate-900/60 p-3 col-span-2">
          <div className="text-slate-400 text-xs mb-1">Risk Level</div>

          <span
            className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
              color[analysis.risk]
            }`}
          >
            {analysis.risk}
          </span>
        </div>
      </div>
    </div>
  );
}