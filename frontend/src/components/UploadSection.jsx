import { UploadCloud, FileCode2 } from "lucide-react";

export default function UploadSection({ onFileSelect, file }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-[#08142d] p-8 shadow-xl">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-4xl font-black text-white">
          Upload Source Code
        </h2>

        <p className="mt-2 text-lg text-slate-400">
          Python, Java, JavaScript, C/C++, ZIP
        </p>
      </div>

      {/* Upload Box */}
      <label className="group relative flex h-80 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-cyan-400/50 bg-slate-950/40 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-500/5">
        <input
          type="file"
          accept=".zip,.py,.js,.java,.cpp,.c,.txt"
          className="hidden"
          onChange={(e) => onFileSelect(e.target.files[0])}
        />

        <UploadCloud
          size={64}
          className="mb-5 text-cyan-400 transition-transform duration-300 group-hover:scale-110"
        />

        <h3 className="text-2xl font-bold text-white">
          Drop file or Choose File
        </h3>

        <p className="mt-2 text-slate-400">Click to upload</p>

        {file && (
          <div className="mt-6 flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2">
            <FileCode2 size={18} className="text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">
              {file.name}
            </span>
          </div>
        )}
      </label>
    </section>
  );
}