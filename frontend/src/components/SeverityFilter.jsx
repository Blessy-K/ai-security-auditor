import { Search } from "lucide-react";

export default function SeverityFilter({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  const filters = ["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"];

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="relative w-full lg:w-80">
          <Search
            className="absolute left-3 top-3 text-slate-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search rule or filename..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-slate-800 border border-slate-700 pl-10 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filter === item
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}