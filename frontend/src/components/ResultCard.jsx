import { AlertTriangle, ShieldCheck } from "lucide-react";

export default function ResultCard({ data }) {
  if (!data) return null;

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6">Scan Report</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm">File</p>
          <p className="text-white font-semibold">{data.filename}</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Vulnerabilities</p>
          <p className="text-red-400 text-xl font-bold">
            {data.total_vulnerabilities}
          </p>
        </div>
      </div>

      {data.results?.map((item, index) => (
        <div key={index} className="bg-slate-800 rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-red-400" size={22} />
            <h3 className="text-lg font-bold text-white">
              {item.finding.rule}
            </h3>
          </div>

          <p className="text-yellow-400 mb-4">
            Severity: {item.finding.severity}
          </p>

          <div className="space-y-4 text-slate-200">
            <div>
              <h4 className="text-cyan-400 font-semibold">CWE</h4>
              <p>{item.analysis.cwe}</p>
            </div>

            <div>
              <h4 className="text-cyan-400 font-semibold">Risk</h4>
              <p>{item.analysis.risk}</p>
            </div>

            <div>
              <h4 className="text-cyan-400 font-semibold">Explanation</h4>
              <p>{item.analysis.explanation}</p>
            </div>

            <div>
              <h4 className="text-cyan-400 font-semibold">Secure Fix</h4>
              <pre className="bg-black/40 p-3 rounded-lg overflow-x-auto text-green-300 text-sm whitespace-pre-wrap">
                {item.analysis.fixed_code}
              </pre>
            </div>

            <div>
              <h4 className="text-cyan-400 font-semibold">
                Why the Fix Works
              </h4>
              <p>{item.analysis.why_fix_works}</p>
            </div>

            <div className="flex items-center gap-2 text-green-400">
              <ShieldCheck size={18} />
              Confidence: {item.analysis.confidence}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}