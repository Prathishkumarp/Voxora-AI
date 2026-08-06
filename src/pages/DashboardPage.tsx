import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FiMic, FiTrendingUp, FiAward, FiClock, FiZap, FiCalendar, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import type { SessionResult } from "../data/practiceData";

const ACHIEVEMENT_ICONS: Record<string, string> = {
  "First Session": "🎯",
  "7-Day Streak": "🔥",
  "30-Day Streak": "💎",
  "Grammar Master": "📝",
  "50 Sessions": "⚡",
  "100 Sessions": "🏆",
  "Vocabulary Pro": "📚",
};

const WEEKLY_DATA = [
  { day: "Mon", score: 72 }, { day: "Tue", score: 75 }, { day: "Wed", score: 68 },
  { day: "Thu", score: 80 }, { day: "Fri", score: 78 }, { day: "Sat", score: 85 },
  { day: "Sun", score: 82 },
];

const MONTHLY_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  score: Math.round(55 + Math.random() * 35),
}));

export default function DashboardPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<SessionResult[]>([]);
  const [chartRange, setChartRange] = useState<"weekly" | "monthly">("weekly");

  useEffect(() => {
    const stored = localStorage.getItem("ai_speak_sessions");
    if (stored) setSessions(JSON.parse(stored));
  }, []);

  const stats = user?.stats;
  const chartData = chartRange === "weekly" ? WEEKLY_DATA : MONTHLY_DATA;

  const scoreColor = (score: number) => {
    if (score >= 80) return "#059669";
    if (score >= 60) return "#d97706";
    return "#dc2626";
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-extrabold mb-1" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>
            Welcome back, {user?.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {stats?.streak ? `You're on a ${stats.streak}-day streak. Keep it up!` : "Start your first practice session today."}
          </p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Speaking Score", value: `${stats?.speakingScore || 0}`, unit: "/100", icon: <FiMic className="w-4 h-4" />, color: "#7c3aed" },
            { label: "Grammar Score", value: `${stats?.grammarScore || 0}`, unit: "/100", icon: <FiTrendingUp className="w-4 h-4" />, color: "#06b6d4" },
            { label: "Vocabulary", value: `${stats?.vocabularyScore || 0}`, unit: "/100", icon: <FiAward className="w-4 h-4" />, color: "#059669" },
            { label: "Daily Streak", value: `${stats?.streak || 0}`, unit: " days", icon: <FiZap className="w-4 h-4" />, color: "#d97706" },
            { label: "Practice Time", value: `${stats?.practiceTime || 0}`, unit: " min", icon: <FiClock className="w-4 h-4" />, color: "#dc2626" },
            { label: "Sessions", value: `${stats?.completedSessions || 0}`, unit: "", icon: <FiCalendar className="w-4 h-4" />, color: "#7c2d92" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-2xl glass"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${s.color}22`, color: s.color }}>
                {s.icon}
              </div>
              <div className="text-xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>
                {s.value}<span className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>{s.unit}</span>
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 p-6 rounded-2xl glass"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Progress Chart</h2>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Speaking score over time</p>
              </div>
              <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                {(["weekly", "monthly"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setChartRange(r)}
                    className="px-3 py-1.5 text-xs font-medium capitalize transition-colors"
                    style={{
                      background: chartRange === r ? "#7c3aed" : "transparent",
                      color: chartRange === r ? "white" : "var(--muted-foreground)",
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={30} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, color: "var(--foreground)" }}
                  cursor={{ stroke: "rgba(124,58,237,0.3)", strokeWidth: 1 }}
                />
                <Area type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={2} fill="url(#scoreGrad)" dot={{ fill: "#7c3aed", r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-6 rounded-2xl glass"
            style={{ border: "1px solid var(--border)" }}
          >
            <h2 className="font-bold mb-4" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Achievements</h2>
            {user?.achievements && user.achievements.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {user.achievements.map((a) => (
                  <div key={a} className="p-3 rounded-xl text-center" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                    <div className="text-2xl mb-1">{ACHIEVEMENT_ICONS[a] || "🏅"}</div>
                    <div className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{a}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8" style={{ color: "var(--muted-foreground)" }}>
                <div className="text-3xl mb-2">🏅</div>
                <p className="text-sm">Complete sessions to earn achievements!</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Recent Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl glass mb-6"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Recent Practice History</h2>
            <Link to="/history" className="text-xs text-violet-400 flex items-center gap-1 hover:gap-2 transition-all">View all <FiArrowRight className="w-3 h-3" /></Link>
          </div>
          {sessions.length > 0 ? (
            <div className="space-y-3">
              {sessions.slice(-5).reverse().map((s) => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--muted)" }}>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>{s.mode}</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{new Date(s.date).toLocaleDateString()} · {Math.round(s.duration)}s</div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-sm font-bold" style={{ color: scoreColor(s.overallScore) }}>{s.overallScore}/100</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Overall</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10" style={{ color: "var(--muted-foreground)" }}>
              <FiMic className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm mb-4">No practice sessions yet. Start speaking!</p>
              <Link to="/practice" className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold inline-block">
                Start First Session
              </Link>
            </div>
          )}
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-6 rounded-2xl relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))", border: "1px solid rgba(124,58,237,0.3)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold mb-1" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Ready to practice?</h2>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Choose a speaking mode and start improving today.</p>
            </div>
            <Link to="/practice" className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap flex items-center gap-2">
              <FiMic className="w-4 h-4" /> Start Speaking
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
