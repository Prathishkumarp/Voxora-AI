import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { FiUsers, FiMic, FiTrendingUp, FiTrash2, FiShield, FiSearch, FiAlertTriangle } from "react-icons/fi";

const MOCK_USERS = [
  { id: "u1", name: "Priya Sharma", email: "priya@example.com", country: "India", sessions: 47, avgScore: 84, joined: "2024-01-15", status: "active", level: "Intermediate" },
  { id: "u2", name: "Carlos Mendez", email: "carlos@example.com", country: "Mexico", sessions: 32, avgScore: 76, joined: "2024-02-20", status: "active", level: "Pre-Intermediate" },
  { id: "u3", name: "Yuki Tanaka", email: "yuki@example.com", country: "Japan", sessions: 89, avgScore: 91, joined: "2023-11-05", status: "active", level: "Advanced" },
  { id: "u4", name: "Ahmed Hassan", email: "ahmed@example.com", country: "Egypt", sessions: 12, avgScore: 62, joined: "2024-06-01", status: "inactive", level: "Elementary" },
  { id: "u5", name: "Sofia Petrov", email: "sofia@example.com", country: "Russia", sessions: 55, avgScore: 88, joined: "2024-03-10", status: "active", level: "Upper-Intermediate" },
  { id: "u6", name: "Liu Wei", email: "liu@example.com", country: "China", sessions: 28, avgScore: 73, joined: "2024-04-22", status: "active", level: "Intermediate" },
];

const ANALYTICS_DATA = [
  { month: "Jan", sessions: 1240, users: 320 }, { month: "Feb", sessions: 1580, users: 410 },
  { month: "Mar", sessions: 2100, users: 560 }, { month: "Apr", sessions: 1890, users: 490 },
  { month: "May", sessions: 2450, users: 680 }, { month: "Jun", sessions: 3120, users: 820 },
  { month: "Jul", sessions: 2890, users: 740 }, { month: "Aug", sessions: 3560, users: 920 },
];

const MODE_DATA = [
  { mode: "Job Interview", count: 8420 }, { mode: "Daily Conv.", count: 7180 },
  { mode: "Business", count: 5930 }, { mode: "Storytelling", count: 4720 },
  { mode: "Public Speaking", count: 4210 }, { mode: "Debate", count: 3180 },
  { mode: "Self Intro", count: 2950 }, { mode: "Travel", count: 2340 },
];

export default function AdminPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"users" | "analytics" | "sessions">("users");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const deleteUser = (id: string) => setUsers((p) => p.filter((u) => u.id !== id));

  const scoreColor = (s: number) => s >= 80 ? "#059669" : s >= 60 ? "#d97706" : "#dc2626";

  return (
    <div className="min-h-screen pt-20 pb-10 px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center">
              <FiShield className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-sm font-mono" style={{ color: "var(--accent)" }}>ADMIN PANEL</div>
          </div>
          <h1 className="text-3xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Administration</h1>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Users", value: "50,284", change: "+12% this month", icon: <FiUsers className="w-4 h-4" />, color: "#7c3aed" },
            { label: "Active Sessions", value: "3,562", change: "Today", icon: <FiMic className="w-4 h-4" />, color: "#06b6d4" },
            { label: "Avg. Score", value: "78.4", change: "+2.1 vs last month", icon: <FiTrendingUp className="w-4 h-4" />, color: "#059669" },
            { label: "Flagged Content", value: "3", change: "Needs review", icon: <FiAlertTriangle className="w-4 h-4" />, color: "#dc2626" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: `${s.color}22`, color: s.color }}>
                {s.icon}
              </div>
              <div className="text-xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>{s.value}</div>
              <div className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
              <div className="text-xs" style={{ color: s.color }}>{s.change}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 p-1 rounded-xl w-fit" style={{ background: "var(--muted)" }}>
          {(["users", "analytics", "sessions"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all" style={{ background: tab === t ? "#7c3aed" : "transparent", color: tab === t ? "white" : "var(--muted-foreground)" }}>
              {t}
            </button>
          ))}
        </div>

        {tab === "users" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="relative mb-4">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full max-w-md pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)" }} onFocus={(e) => (e.target.style.borderColor = "#7c3aed")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
            </div>
            <div className="rounded-2xl glass overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                      {["User", "Country", "Level", "Sessions", "Avg. Score", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u, i) => (
                      <tr key={u.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }} className="hover:bg-violet-500/5 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium" style={{ color: "var(--foreground)" }}>{u.name}</div>
                          <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{u.email}</div>
                        </td>
                        <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{u.country}</td>
                        <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>{u.level}</td>
                        <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>{u.sessions}</td>
                        <td className="px-4 py-3">
                          <span className="font-bold" style={{ color: scoreColor(u.avgScore) }}>{u.avgScore}/100</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: u.status === "active" ? "rgba(5,150,105,0.15)" : "rgba(107,114,128,0.15)", color: u.status === "active" ? "#34d399" : "#9ca3af" }}>
                            {u.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => deleteUser(u.id)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors">
                            <FiTrash2 className="w-3.5 h-3.5 text-red-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "analytics" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
              <h3 className="font-bold mb-4" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Monthly Sessions & Users</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={ANALYTICS_DATA}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, color: "var(--foreground)" }} />
                  <Line type="monotone" dataKey="sessions" stroke="#7c3aed" strokeWidth={2} dot={false} name="Sessions" />
                  <Line type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2} dot={false} name="Users" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="p-6 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
              <h3 className="font-bold mb-4" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Sessions by Practice Mode</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={MODE_DATA} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="mode" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, color: "var(--foreground)" }} />
                  <Bar dataKey="count" fill="#7c3aed" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {tab === "sessions" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="p-6 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
              <h3 className="font-bold mb-4" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Monitor Active Sessions</h3>
              <div className="space-y-3">
                {[
                  { user: "Priya S.", mode: "Job Interview", duration: "4:32", score: null, status: "live" },
                  { user: "Carlos M.", mode: "Business Communication", duration: "2:18", score: null, status: "live" },
                  { user: "Liu W.", mode: "Daily Conversation", duration: "6:05", score: 82, status: "complete" },
                  { user: "Sofia P.", mode: "Public Speaking", duration: "3:44", score: 91, status: "complete" },
                  { user: "Ahmed H.", mode: "Self Introduction", duration: "1:22", score: 65, status: "complete" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--muted)" }}>
                    <div>
                      <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{s.user}</div>
                      <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.mode} · {s.duration}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {s.score && <span className="text-sm font-bold" style={{ color: scoreColor(s.score) }}>{s.score}/100</span>}
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: s.status === "live" ? "rgba(220,38,38,0.15)" : "rgba(5,150,105,0.15)", color: s.status === "live" ? "#f87171" : "#34d399" }}>
                        {s.status === "live" ? "● LIVE" : "Complete"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
