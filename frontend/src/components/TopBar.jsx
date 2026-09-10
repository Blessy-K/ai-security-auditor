import {
  Bell,
  ShieldCheck,
  FolderGit2,
  Wifi,
  UserCircle2,
} from "lucide-react";

export default function TopBar({ report, dark }) {
  return (
    <header
      className={`sticky top-0 z-30 rounded-3xl border backdrop-blur-xl px-6 py-4 transition-all duration-500 ${
        dark
          ? "border-slate-800 bg-slate-900/70"
          : "border-slate-200 bg-white/80 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-500 font-semibold">
            Enterprise Security Platform
          </p>

          <h1
            className={`text-2xl font-black mt-1 ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            AI Security Auditor
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Backend Status */}
          <div
            className={`hidden lg:flex items-center gap-2 rounded-full px-3 py-2 border ${
              dark
                ? "bg-emerald-500/10 border-emerald-500/20"
                : "bg-emerald-100 border-emerald-300"
            }`}
          >
            <Wifi size={15} className="text-emerald-500" />
            <span className="text-sm text-emerald-600 font-medium">
              Backend Online
            </span>
          </div>

          {/* Current Project */}
          {report && (
            <div
              className={`hidden xl:flex items-center gap-2 rounded-full px-3 py-2 ${
                dark ? "bg-slate-800" : "bg-slate-100"
              }`}
            >
              <FolderGit2 size={15} className="text-cyan-500" />
              <span
                className={`text-sm ${
                  dark ? "text-slate-200" : "text-slate-700"
                }`}
              >
                {report.filename}
              </span>
            </div>
          )}

          {/* Notifications */}
          <button
            className={`relative h-11 w-11 rounded-xl flex items-center justify-center transition ${
              dark
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            <Bell
              size={19}
              className={dark ? "text-white" : "text-slate-700"}
            />

            {report && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                {report.total_vulnerabilities}
              </span>
            )}
          </button>

          {/* Profile */}
          <div
            className={`flex items-center gap-3 rounded-2xl px-3 py-2 ${
              dark ? "bg-slate-800" : "bg-slate-100"
            }`}
          >
            <UserCircle2 size={34} className="text-cyan-500" />

            <div className="hidden md:block">
              <p
                className={`text-sm font-semibold ${
                  dark ? "text-white" : "text-slate-900"
                }`}
              >
                Security Admin
              </p>

              <div className="flex items-center gap-1 text-xs text-emerald-500">
                <ShieldCheck size={12} />
                Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}