import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Upload,
  History,
  BarChart3,
  ShieldAlert,
  Bot,
  ArrowLeft,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";

import TopBar from "./components/TopBar";
import PageWrapper from "./components/PageWrapper";
import Hero from "./components/Hero";
import UploadCard from "./components/UploadCard";
import SummaryCards from "./components/SummaryCards";
import ScanMetrics from "./components/ScanMetrics";
import RiskScore from "./components/RiskScore";
import Pipeline from "./components/Pipeline";
import Analytics from "./components/Analytics";
import VulnerabilityCard from "./components/VulnerabilityCard";
import PdfButton from "./components/PdfButton";
import SeverityFilter from "./components/SeverityFilter";
import ScanToast from "./components/ScanToast";
import ScanHistory from "./components/ScanHistory";
import ThemeToggle from "./components/ThemeToggle";
import AIAssistant from "./components/AIAssistant";

function App() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("dashboard");

  const [report, setReport] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVulnerability, setSelectedVulnerability] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("scanHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    localStorage.setItem("scanHistory", JSON.stringify(history));
  }, [history]);

  const clearHistory = () => {
    localStorage.removeItem("scanHistory");
    setHistory([]);
  };

  const handleScanComplete = (data) => {
    setReport(data);
    setShowToast(true);
    setActive("dashboard");
    setSelectedVulnerability(null);

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setHistory((prev) =>
      [
        {
          filename: data.filename,
          files_scanned: data.files_scanned,
          total_vulnerabilities: data.total_vulnerabilities,
          time,
        },
        ...prev,
      ].slice(0, 10)
    );
  };

  const filteredResults = useMemo(() => {
    if (!report) return [];

    return report.results.filter((item) => {
      const ok = filter === "ALL" || item.finding.severity === filter;
      const txt = (item.finding.rule + item.file).toLowerCase();
      return ok && txt.includes(search.toLowerCase());
    });
  }, [report, filter, search]);

  const filteredReport = report
    ? {
        ...report,
        results: filteredResults,
        total_vulnerabilities: filteredResults.length,
      }
    : null;

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "upload", label: "Upload", icon: Upload },
    { id: "history", label: "History", icon: History },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: ShieldAlert },
    { id: "assistant", label: "AI Assistant", icon: Bot },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        dark ? "bg-[#030712] text-white" : "bg-slate-100 text-slate-900"
      }`}
    >
      <ScanToast
        open={showToast}
        onClose={() => setShowToast(false)}
        report={report}
      />

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`w-72 min-h-screen border-r p-6 sticky top-0 transition-colors ${
            dark
              ? "bg-slate-950 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="mb-10">
            <h1 className="text-2xl font-black text-cyan-500">
              AI Security
            </h1>
            <p className={dark ? "text-slate-500" : "text-slate-600"}>
              Auditor Dashboard
            </p>
          </div>

          <nav className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActive(item.id);
                    setSelectedVulnerability(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    active === item.id
                      ? "bg-cyan-500 text-white"
                      : dark
                      ? "text-slate-400 hover:bg-slate-800"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-10">
            <ThemeToggle dark={dark} setDark={setDark} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <TopBar report={report} dark={dark} />

          <AnimatePresence mode="wait">
            <PageWrapper
              key={`${active}-${selectedVulnerability ? "detail" : "page"}`}
            >
              <Hero dark={dark} />

              {/* Upload */}
              {active === "upload" && (
                <UploadCard
                  dark={dark}
                  onScanComplete={handleScanComplete}
                  onFileSelected={setSelectedFile}
                />
              )}

              {/* History */}
              {active === "history" && (
                <ScanHistory
                  history={history}
                  onClear={clearHistory}
                  dark={dark}
                />
              )}

              {/* Dashboard */}
              {active === "dashboard" && report && (
                <>
                  <SummaryCards report={filteredReport} dark={dark} />
                  <ScanMetrics report={filteredReport} dark={dark} />
                  <RiskScore report={filteredReport} dark={dark} />
                  <Pipeline dark={dark} />
                </>
              )}

              {/* Analytics */}
              {active === "analytics" && report && (
                <Analytics report={filteredReport} dark={dark} />
              )}

              {/* Reports */}
              {active === "reports" && report && (
                <>
                  {!selectedVulnerability ? (
                    <>
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-3xl font-black">
                            Vulnerability Reports
                          </h2>
                          <p
                            className={
                              dark ? "text-slate-400 mt-1" : "text-slate-600 mt-1"
                            }
                          >
                            Click a vulnerability to open its detailed analysis
                          </p>
                        </div>

                        <PdfButton file={selectedFile} />
                      </div>

                      <SeverityFilter
                        search={search}
                        setSearch={setSearch}
                        filter={filter}
                        setFilter={setFilter}
                        dark={dark}
                      />

                      <div className="space-y-6">
                        {filteredResults.map((item, i) => (
                          <VulnerabilityCard
                            key={i}
                            data={item}
                            preview
                            dark={dark}
                            onOpen={() => setSelectedVulnerability(item)}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedVulnerability(null)}
                        className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400"
                      >
                        <ArrowLeft size={18} />
                        Back to Reports
                      </button>

                      <div>
                        <h2 className="text-3xl font-black">
                          Vulnerability Analysis
                        </h2>
                        <p
                          className={
                            dark ? "text-slate-400 mt-1" : "text-slate-600 mt-1"
                          }
                        >
                          AI-powered threat intelligence and secure remediation
                        </p>
                      </div>

                      <Analytics
                        dark={dark}
                        report={{
                          ...report,
                          results: [selectedVulnerability],
                        }}
                      />

                      <VulnerabilityCard
                        data={selectedVulnerability}
                        defaultOpen
                        dark={dark}
                      />
                    </>
                  )}
                </>
              )}

              {/* Assistant */}
              {active === "assistant" && (
                <div
                  className={`rounded-3xl border p-10 text-center transition-colors ${
                    dark
                      ? "border-slate-700 bg-slate-900"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <Bot size={60} className="mx-auto text-cyan-500 mb-4" />
                  <h2 className="text-3xl font-bold">
                    AI Security Assistant
                  </h2>
                  <p
                    className={
                      dark ? "text-slate-400 mt-2" : "text-slate-600 mt-2"
                    }
                  >
                    Use the floating chat button to ask about CWE, OWASP,
                    SQL Injection, XSS and secure coding.
                  </p>
                </div>
              )}

              {/* Empty State */}
              {!report &&
                active !== "upload" &&
                active !== "assistant" && (
                  <div
                    className={`rounded-3xl border border-dashed p-16 text-center transition-colors ${
                      dark
                        ? "border-slate-700 bg-slate-900/30"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    <ShieldAlert
                      size={48}
                      className="mx-auto text-slate-400 mb-4"
                    />

                    <h2 className="text-2xl font-bold">
                      No Scan Available
                    </h2>

                    <p
                      className={
                        dark ? "text-slate-500 mt-2" : "text-slate-600 mt-2"
                      }
                    >
                      Upload a project to view dashboards and reports.
                    </p>

                    <button
                      onClick={() => setActive("upload")}
                      className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                      Upload Project
                    </button>
                  </div>
                )}
            </PageWrapper>
          </AnimatePresence>
        </main>
      </div>

      <AIAssistant />
    </div>
  );
}

export default App;