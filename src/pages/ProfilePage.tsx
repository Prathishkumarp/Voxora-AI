import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiGlobe, FiTarget, FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const LEVELS = ["Beginner", "Elementary", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Advanced"];
const GOALS = [
  "Improve professional communication",
  "Prepare for job interviews",
  "Study abroad",
  "Travel with confidence",
  "General English fluency",
  "Academic presentations",
];
const ACHIEVEMENT_ICONS: Record<string, string> = {
  "First Session": "🎯", "7-Day Streak": "🔥", "30-Day Streak": "💎",
  "Grammar Master": "📝", "50 Sessions": "⚡", "100 Sessions": "🏆", "Vocabulary Pro": "📚",
};

const WEEKLY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEKLY_SCORES = [72, 0, 80, 75, 68, 85, 82];

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    country: user?.country || "",
    level: user?.level || "Beginner",
    goal: user?.goal || "",
  });

  if (!user) return null;

  const save = () => {
    updateUser(form);
    setEditing(false);
  };

  const cancel = () => {
    setForm({ name: user.name, country: user.country, level: user.level, goal: user.goal });
    setEditing(false);
  };

  const completionPct = Math.round((user.stats.completedSessions / 100) * 100);

  return (
    <div className="min-h-screen pt-20 pb-10 px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="text-sm font-mono mb-1" style={{ color: "var(--accent)" }}>PROFILE</div>
          <h1 className="text-3xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>My Profile</h1>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl glass text-center"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="relative inline-block mb-4">
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover ring-4" style={{ ringColor: "#7c3aed" }} />
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center cursor-pointer">
                <FiEdit2 className="w-3 h-3 text-white" />
              </div>
            </div>
            <h2 className="font-bold text-lg mb-0.5" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>{user.name}</h2>
            <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>{user.email}</p>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(124,58,237,0.2)", color: "#c4b5fd" }}>
              {user.level}
            </div>
            <div className="mt-4 text-xs" style={{ color: "var(--muted-foreground)" }}>
              Member since {new Date(user.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </div>
          </motion.div>

          {/* Edit Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="md:col-span-2 p-6 rounded-2xl glass"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Personal Information</h2>
              {editing ? (
                <div className="flex gap-2">
                  <button onClick={save} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg text-emerald-400" style={{ background: "rgba(5,150,105,0.15)" }}>
                    <FiCheck className="w-3.5 h-3.5" /> Save
                  </button>
                  <button onClick={cancel} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg text-red-400" style={{ background: "rgba(220,38,38,0.1)" }}>
                    <FiX className="w-3.5 h-3.5" /> Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => setEditing(true)} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg text-violet-400" style={{ background: "rgba(124,58,237,0.15)" }}>
                  <FiEdit2 className="w-3.5 h-3.5" /> Edit
                </button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", field: "name", icon: <FiUser className="w-4 h-4" />, type: "text" },
                { label: "Country", field: "country", icon: <FiGlobe className="w-4 h-4" />, type: "text" },
              ].map((f) => (
                <div key={f.field}>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--muted-foreground)" }}>{f.label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }}>{f.icon}</span>
                    <input
                      value={form[f.field as keyof typeof form]}
                      onChange={(e) => setForm((p) => ({ ...p, [f.field]: e.target.value }))}
                      disabled={!editing}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none disabled:opacity-70"
                      style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                    />
                  </div>
                </div>
              ))}

              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--muted-foreground)" }}>English Level</label>
                <select
                  value={form.level}
                  onChange={(e) => setForm((p) => ({ ...p, level: e.target.value }))}
                  disabled={!editing}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none disabled:opacity-70"
                  style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                >
                  {LEVELS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium mb-1.5 flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
                  <FiTarget className="w-3.5 h-3.5" /> Learning Goal
                </label>
                <select
                  value={form.goal}
                  onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value }))}
                  disabled={!editing}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none disabled:opacity-70"
                  style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                >
                  {GOALS.map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium mb-1.5 flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
                  <FiMail className="w-3.5 h-3.5" /> Email
                </label>
                <input
                  value={user.email}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none opacity-60"
                  style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Weekly Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl glass"
            style={{ border: "1px solid var(--border)" }}
          >
            <h2 className="font-bold mb-4" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Weekly Progress</h2>
            <div className="flex items-end justify-between h-20 gap-1">
              {WEEKLY.map((day, i) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-sm transition-all"
                    style={{
                      height: `${WEEKLY_SCORES[i] ? (WEEKLY_SCORES[i] / 100) * 64 : 4}px`,
                      background: WEEKLY_SCORES[i] ? "#7c3aed" : "var(--muted)",
                      opacity: WEEKLY_SCORES[i] ? 0.8 : 0.3,
                    }}
                  />
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{day[0]}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="md:col-span-2 p-6 rounded-2xl glass"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Achievements</h2>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{user.achievements.length} earned</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(ACHIEVEMENT_ICONS).map(([name, icon]) => {
                const earned = user.achievements.includes(name);
                return (
                  <div key={name} className="flex flex-col items-center gap-1 p-3 rounded-xl" style={{ background: earned ? "rgba(124,58,237,0.15)" : "var(--muted)", border: `1px solid ${earned ? "rgba(124,58,237,0.4)" : "var(--border)"}`, opacity: earned ? 1 : 0.4 }}>
                    <div className="text-2xl">{icon}</div>
                    <div className="text-xs text-center whitespace-nowrap" style={{ color: earned ? "var(--foreground)" : "var(--muted-foreground)" }}>{name}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Session Goal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-3 p-6 rounded-2xl glass"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Goal: 100 Sessions</h2>
              <span className="text-sm font-bold" style={{ color: "#7c3aed" }}>{user.stats.completedSessions}/100</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, completionPct)}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }}
              />
            </div>
            <div className="text-xs mt-2" style={{ color: "var(--muted-foreground)" }}>
              {100 - user.stats.completedSessions > 0 ? `${100 - user.stats.completedSessions} sessions remaining to reach 100!` : "Goal achieved! 🎉"}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
