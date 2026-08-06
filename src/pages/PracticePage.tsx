import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { PRACTICE_MODES } from "../data/practiceData";

export default function PracticePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 pb-10 px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="text-sm font-mono mb-2" style={{ color: "var(--accent)" }}>AI SPEAKING PRACTICE</div>
          <h1 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Choose Your Practice Mode</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Select a speaking scenario that matches your learning goal. Each mode uses AI-generated questions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PRACTICE_MODES.map((mode, i) => (
            <motion.button
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/session/${mode.id}`)}
              className="p-5 rounded-2xl glass text-left group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              style={{ border: "1px solid var(--border)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = mode.color + "60";
                (e.currentTarget as HTMLElement).style.background = mode.color + "10";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.background = "var(--card)";
              }}
            >
              <div className="text-3xl mb-3">{mode.icon}</div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-sm leading-tight" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>
                  {mode.title}
                </h3>
                <FiArrowRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" style={{ color: mode.color }} />
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{mode.description}</p>
              <div className="mt-3 flex gap-1">
                {mode.tips.slice(0, 2).map((tip) => (
                  <span key={tip} className="text-xs px-2 py-0.5 rounded-full" style={{ background: mode.color + "20", color: mode.color }}>
                    {tip.split(" ").slice(0, 2).join(" ")}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
