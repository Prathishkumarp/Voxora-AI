import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from "recharts";
import { FiArrowLeft, FiRefreshCw, FiHome, FiCheckCircle, FiAlertTriangle, FiBook, FiZap } from "react-icons/fi";
import type { SessionResult } from "../data/practiceData";

const scoreColor = (s: number) => s >= 8 ? "#059669" : s >= 6 ? "#d97706" : "#dc2626";
const pctColor = (s: number) => s >= 75 ? "#059669" : s >= 55 ? "#d97706" : "#dc2626";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result: SessionResult | undefined = location.state?.result;

  if (!result) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <p>No result data found.</p>
        <Link to="/practice" className="btn-primary px-6 py-2 rounded-xl text-sm">Go to Practice</Link>
      </div>
    );
  }

  const radarData = [
    { metric: "Grammar", value: result.grammar * 10 },
    { metric: "Vocabulary", value: result.vocabulary * 10 },
    { metric: "Confidence", value: result.confidence * 10 },
    { metric: "Fluency", value: result.fluency * 10 },
    { metric: "Speed", value: result.speakingSpeed * 10 },
  ];

  const barData = [
    { name: "Grammar", score: result.grammar, max: 10 },
    { name: "Vocabulary", score: result.vocabulary, max: 10 },
    { name: "Confidence", score: result.confidence, max: 10 },
    { name: "Fluency", score: result.fluency, max: 10 },
    { name: "Speed", score: result.speakingSpeed, max: 10 },
  ];

  return (
    <div className="min-h-screen pt-20 pb-10 px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => navigate("/practice")} className="flex items-center gap-2 text-sm mb-6 hover:text-violet-400 transition-colors" style={{ color: "var(--muted-foreground)" }}>
            <FiArrowLeft className="w-4 h-4" /> Back to Practice
          </button>

          {/* Overall Score */}
          <div className="p-8 rounded-2xl glass mb-5 text-center relative overflow-hidden" style={{ border: "1px solid var(--border)", background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.08))" }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10" style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
            <div className="text-sm font-mono mb-2" style={{ color: "var(--accent)" }}>SESSION COMPLETE — {result.mode.toUpperCase()}</div>
            <div className="text-7xl font-extrabold mb-2" style={{ fontFamily: "Plus Jakarta Sans", color: pctColor(result.overallScore) }}>
              {result.overallScore}
            </div>
            <div className="text-sm mb-1" style={{ color: "var(--muted-foreground)" }}>Overall Score out of 100</div>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Duration: {Math.round(result.duration)}s · {new Date(result.date).toLocaleDateString()}
            </div>
          </div>

          {/* Score Breakdown + Radar */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div className="p-6 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
              <h2 className="font-bold mb-4" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Detailed Breakdown</h2>
              <div className="space-y-3">
                {barData.map((b) => (
                  <div key={b.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: "var(--foreground)" }}>{b.name}</span>
                      <span className="font-bold" style={{ color: scoreColor(b.score) }}>{b.score}/10</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${b.score * 10}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ background: scoreColor(b.score) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
              <h2 className="font-bold mb-4" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Performance Graph</h2>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <Radar dataKey="value" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Feedback */}
          <div className="p-6 rounded-2xl glass mb-5" style={{ border: "1px solid var(--border)", borderLeft: "3px solid #7c3aed" }}>
            <div className="flex items-center gap-2 mb-3">
              <FiZap className="w-4 h-4 text-violet-400" />
              <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>AI Feedback</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{result.aiFeedback}</p>
          </div>

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <div className="p-6 rounded-2xl glass mb-5" style={{ border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 mb-4">
                <FiAlertTriangle className="w-4 h-4 text-amber-400" />
                <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Suggestions</h2>
              </div>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--foreground)" }}>
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {/* Mistakes */}
            {result.mistakes.length > 0 && (
              <div className="p-6 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <FiAlertTriangle className="w-4 h-4 text-red-400" />
                  <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Common Mistakes</h2>
                </div>
                <div className="space-y-3">
                  {result.mistakes.map((m, i) => (
                    <div key={i} className="p-3 rounded-xl" style={{ background: "var(--muted)" }}>
                      <div className="text-xs mb-0.5 line-through" style={{ color: "#f87171" }}>{m.original}</div>
                      <div className="text-xs mb-1 font-medium" style={{ color: "#34d399" }}>{m.corrected}</div>
                      <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{m.explanation}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grammar Tips */}
            <div className="p-6 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 mb-4">
                <FiBook className="w-4 h-4 text-cyan-400" />
                <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Grammar Tips</h2>
              </div>
              <ul className="space-y-2">
                {result.grammarTips.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--foreground)" }}>
                    <span className="text-cyan-400 mt-0.5 flex-shrink-0">→</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vocabulary Suggestions */}
          <div className="p-6 rounded-2xl glass mb-5" style={{ border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-4">
              <FiCheckCircle className="w-4 h-4 text-emerald-400" />
              <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Vocabulary Suggestions</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {result.vocabularySuggestions.map((v, i) => (
                <div key={i} className="p-3 rounded-xl" style={{ background: "var(--muted)" }}>
                  <div className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>Instead of "{v.word}"</div>
                  <div className="flex flex-wrap gap-1">
                    {v.alternatives.map((a) => (
                      <span key={a} className="text-xs px-2 py-0.5 rounded-full text-emerald-400" style={{ background: "rgba(5,150,105,0.15)" }}>{a}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transcript */}
          {result.transcript && (
            <div className="p-6 rounded-2xl glass mb-6" style={{ border: "1px solid var(--border)" }}>
              <h2 className="font-bold mb-3" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Your Transcript</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)", fontFamily: "JetBrains Mono" }}>
                {result.transcript}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(`/session/${result.modeId}`)}
              className="flex-1 py-3 rounded-xl btn-primary text-sm font-semibold flex items-center justify-center gap-2"
            >
              <FiRefreshCw className="w-4 h-4" /> Practice Again
            </button>
            <Link to="/practice" className="flex-1 py-3 rounded-xl glass glass-hover text-sm font-semibold flex items-center justify-center gap-2" style={{ color: "var(--foreground)", border: "1px solid var(--border)" }}>
              Try Another Mode
            </Link>
            <Link to="/dashboard" className="flex-1 py-3 rounded-xl glass glass-hover text-sm font-semibold flex items-center justify-center gap-2" style={{ color: "var(--foreground)", border: "1px solid var(--border)" }}>
              <FiHome className="w-4 h-4" /> Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
