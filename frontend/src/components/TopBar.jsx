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
      className={`sticky top-0 z-30 rounded-2xl md:rounded-3xl border backdrop-blur-xl px-4 sm:px-6 py-3 md:py-4 transition-all duration-500 ${
        dark
          ? "border-slate-800 bg-slate-900/80"
          : "border-slate-200 bg-white/80 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-cyan-500 font-semibold truncate">
            Enterprise Security Platform
          </p>

          <h1
            className={`mt-1 text-lg sm:text-xl md:text-2xl font-black truncate ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            AI Security Auditor
          </h1>

          {/* Mobile backend status */}
          <div className="mt-1 flex items-center gap-1 lg:hidden">
            <Wifi size={12} className="text-emerald-500" />
            <span className="text-[11px] font-medium text-emerald-500">
              Online
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop backend status */}
          <div
            className={`hidden lg:flex items-center gap-2 rounded-full px-3 py-2 border ${
              dark
                ? "bg-emerald-500/10 border-emerald-500/20"
                : "bg-emerald-100 border-emerald-300"
            }`}
          >
            <Wifi size={15} className="text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600">
              Backend Online
            </span>
          </div>

          {/* Notification */}
          <button
            className={`relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center transition ${
              dark
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            <Bell
              size={18}
              className={dark ? "text-white" : "text-slate-700"}
            />

            {report && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">
                {report.total_vulnerabilities}
              </span>
            )}
          </button>

          {/* Profile */}
          <div
            className={`flex items-center gap-2 rounded-xl sm:rounded-2xl px-2 sm:px-3 py-2 ${
              dark ? "bg-slate-800" : "bg-slate-100"
            }`}
          >
            <UserCircle2 size={32} className="text-cyan-500" />

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

      {/* Project name (mobile & tablet) */}
      {report && (
        <div
          className={`mt-3 xl:hidden flex items-center gap-2 rounded-xl px-3 py-2 ${
            dark ? "bg-slate-800/70" : "bg-slate-100"
          }`}
        >
          <FolderGit2 size={15} className="text-cyan-500 flex-shrink-0" />
          <span
            className={`truncate text-sm ${
              dark ? "text-slate-200" : "text-slate-700"
            }`}
          >
            {report.filename}
          </span>
        </div>
      )}

      {/* Desktop project */}
      {report && (
        <div className="hidden xl:block mt-3">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 ${
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
        </div>
      )}
    </header>
  );
}