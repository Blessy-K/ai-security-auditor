import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800/70 px-4 py-2 text-white transition hover:border-cyan-400"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-sm font-medium">
        {dark ? "Light" : "Dark"}
      </span>
    </button>
  );
}