import { useState } from "react";
import { Bot, Send, X, MessageCircle } from "lucide-react";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! Ask me anything about the vulnerabilities detected.",
    },
  ]);

  const askAI = async () => {
    if (!question.trim()) return;

    const userMsg = { role: "user", text: question };
    setMessages((m) => [...m, userMsg]);
    setQuestion("");

    try {
      const res = await fetch("http://127.0.0.1:8001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      setMessages((m) => [
        ...m,
        { role: "ai", text: data.answer },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "ai", text: "Backend connection failed." },
      ]);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-cyan-500 text-white shadow-2xl hover:scale-105"
        >
          <MessageCircle className="mx-auto" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-96 h-[540px] rounded-3xl border border-cyan-500/20 bg-slate-900 shadow-2xl flex flex-col">
          <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="text-cyan-400" />
              <h3 className="font-bold text-white">
                AI Security Assistant
              </h3>
            </div>

            <button onClick={() => setOpen(false)}>
              <X className="text-slate-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-cyan-500 text-white"
                    : "bg-slate-800 text-slate-200"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-700 flex gap-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about CWE, OWASP, XSS..."
              className="flex-1 rounded-xl bg-slate-800 px-3 py-2 text-white outline-none"
            />

            <button
              onClick={askAI}
              className="rounded-xl bg-cyan-500 p-3 text-white"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}