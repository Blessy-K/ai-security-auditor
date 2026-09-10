import { Shield, Wifi } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-8 shadow-2xl text-white">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-cyan-300/10 blur-2xl"></div>

      <div className="relative flex flex-col md:flex-row items-center gap-6">
        <div className="bg-white/15 backdrop-blur-md p-5 rounded-3xl border border-white/20">
          <Shield size={56} className="text-white" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            AI Security Auditor
          </h1>

          <p className="text-blue-100 mt-2 text-lg">
            Autonomous Software Vulnerability Scanner
          </p>

          <p className="text-blue-200 text-sm mt-1">
            Static Analysis • RAG • Gemini AI • Patch Validation
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
            <span className="flex items-center gap-2 bg-emerald-500 px-4 py-2 rounded-full text-sm font-medium">
              <Wifi size={16} />
              Backend Connected
            </span>

            <span className="bg-white/15 px-4 py-2 rounded-full text-sm">
              Semgrep
            </span>

            <span className="bg-white/15 px-4 py-2 rounded-full text-sm">
              Gemini
            </span>

            <span className="bg-white/15 px-4 py-2 rounded-full text-sm">
              OWASP RAG
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}