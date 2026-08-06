import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiTrash2, FiFilter, FiCalendar, FiClock, FiMic } from "react-icons/fi";
import type { SessionResult } from "../data/practiceData";

const scoreColor = (s: number) => s >= 75 ? "#059669" : s >= 55 ? "#d97706" : "#dc2626";

export default function HistoryPage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionResult[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ai_speak_sessions");
    if (stored) setSessions(JSON.parse(stored).reverse());
  }, []);

  const modes = ["all", ...Array.from(new Set(sessions.map((s) => s.mode)))];

  const filtered = sessions.filter((s) => {
    const matchSearch = s.mode.toLowerCase().includes(search.toLowerCase()) || s.transcript.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.mode === filter;
    return matchSearch && matchFilter;
  });

  const deleteSession = (id: string) => {
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);
    localStorage.setItem("ai_speak_sessions", JSON.stringify([...updated].reverse()));
    if (selected === id) setSelected(null);
  };

  const selectedSession = sessions.find((s) => s.id === selected);

  return (
    <div className="min-h-screen pt-20 pb-10 px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="text-sm font-mono mb-1" style={{ color: "var(--accent)" }}>PRACTICE HISTORY</div>
          <h1 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Session History</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Review all your past practice sessions and track your improvement.</p>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sessions..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)" }}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl text-sm outline-none appearance-none"
              style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            >
              {modes.map((m) => <option key={m} value={m}>{m === "all" ? "All Modes" : m}</option>)}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: "var(--muted-foreground)" }}>
            <FiMic className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-base mb-4">{sessions.length === 0 ? "No practice sessions yet." : "No sessions match your search."}</p>
            {sessions.length === 0 && (
              <button onClick={() => navigate("/practice")} className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold">
                Start First Session
              </button>
            )}
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-5">
            {/* Session List */}
            <div className="lg:col-span-2 space-y-3">
              {filtered.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelected(s.id)}
                  className="p-4 rounded-xl cursor-pointer transition-all"
                  style={{
                    background: selected === s.id ? "rgba(124,58,237,0.15)" : "var(--card)",
                    border: `1px solid ${selected === s.id ? "rgba(124,58,237,0.5)" : "var(--border)"}`,
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>{s.mode}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                          <FiCalendar className="w-3 h-3" /> {new Date(s.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                          <FiClock className="w-3 h-3" /> {Math.round(s.duration)}s
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-base font-bold" style={{ color: scoreColor(s.overallScore) }}>{s.overallScore}</div>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteSession(s.id); }}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors"
                      >
                        <FiTrash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Session Detail */}
            <div className="lg:col-span-3">
              {selectedSession ? (
                <motion.div
                  key={selectedSession.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl glass sticky top-24"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>{selectedSession.mode}</h2>
                      <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        {new Date(selectedSession.date).toLocaleString()} · {Math.round(selectedSession.duration)}s
                      </div>
                    </div>
                    <div className="text-3xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans", color: scoreColor(selectedSession.overallScore) }}>
                      {selectedSession.overallScore}
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {[
                      { l: "Grammar", v: selectedSession.grammar },
                      { l: "Vocab", v: selectedSession.vocabulary },
                      { l: "Confidence", v: selectedSession.confidence },
                      { l: "Fluency", v: selectedSession.fluency },
                      { l: "Speed", v: selectedSession.speakingSpeed },
                    ].map((s) => (
                      <div key={s.l} className="p-2 rounded-lg text-center" style={{ background: "var(--muted)" }}>
                        <div className="text-sm font-bold" style={{ color: scoreColor(s.v) }}>{s.v}/10</div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{s.l}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl mb-4" style={{ background: "var(--muted)" }}>
                    <div className="text-xs font-mono mb-1" style={{ color: "var(--accent)" }}>QUESTION</div>
                    <p className="text-sm" style={{ color: "var(--foreground)" }}>{selectedSession.question || "—"}</p>
                  </div>

                  <div className="p-3 rounded-xl mb-4" style={{ background: "var(--muted)" }}>
                    <div className="text-xs font-mono mb-1" style={{ color: "var(--accent)" }}>TRANSCRIPT</div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)", fontFamily: "JetBrains Mono" }}>
                      {selectedSession.transcript || "—"}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl" style={{ background: "var(--muted)" }}>
                    <div className="text-xs font-mono mb-1" style={{ color: "var(--accent)" }}>AI FEEDBACK</div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--foreground)" }}>{selectedSession.aiFeedback}</p>
                  </div>

                  <button
                    onClick={() => navigate(`/session/${selectedSession.modeId}`)}
                    className="mt-4 w-full py-2.5 rounded-xl btn-primary text-sm font-semibold"
                  >
                    Practice This Mode Again
                  </button>
                </motion.div>
              ) : (
                <div className="p-8 rounded-2xl glass text-center" style={{ border: "1px solid var(--border)" }}>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Select a session to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
