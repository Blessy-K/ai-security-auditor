import { UploadCloud, FileCode2 } from "lucide-react";

export default function UploadSection({ onFileSelect, file }) {
  return (
    <section className="rounded-2xl md:rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-[#08142d] p-5 sm:p-6 md:p-8 shadow-xl">
      {/* Heading */}
      <div className="mb-5 md:mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
          Upload Source Code
        </h2>

        <p className="mt-2 text-sm sm:text-base md:text-lg text-slate-400">
          Python, Java, JavaScript, C/C++, ZIP
        </p>
      </div>

      {/* Upload Box */}
      <label className="group relative flex min-h-[240px] sm:min-h-[280px] md:h-80 cursor-pointer flex-col items-center justify-center rounded-2xl md:rounded-3xl border-2 border-dashed border-cyan-400/50 bg-slate-950/40 px-4 py-6 text-center transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-500/5">
        <input
          type="file"
          accept=".zip,.py,.js,.java,.cpp,.c,.txt"
          className="hidden"
          onChange={(e) => onFileSelect(e.target.files[0])}
        />

        <UploadCloud
          size={48}
          className="mb-4 text-cyan-400 transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 md:h-16 md:w-16"
        />

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
          Drop file or Choose File
        </h3>

        <p className="mt-2 text-sm sm:text-base text-slate-400">
          Click or drag your project here
        </p>

        {file && (
          <div className="mt-5 flex max-w-full items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-2">
            <FileCode2
              size={18}
              className="text-emerald-400 flex-shrink-0"
            />
            <span className="text-xs sm:text-sm font-medium text-emerald-300 truncate max-w-[180px] sm:max-w-[280px] md:max-w-[360px]">
              {file.name}
            </span>
          </div>
        )}
      </label>
    </section>
  );
}