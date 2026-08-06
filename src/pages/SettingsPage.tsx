import { useState } from "react";
import { motion } from "framer-motion";
import { FiMoon, FiGlobe, FiBell, FiMic, FiShield, FiSave } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

interface Settings {
  language: string;
  notifications: boolean;
  sessionReminder: boolean;
  voiceSpeed: string;
  accent: string;
  dataSaving: boolean;
  profileVisible: boolean;
}

const DEFAULT: Settings = {
  language: "English",
  notifications: true,
  sessionReminder: true,
  voiceSpeed: "Normal",
  accent: "American English",
  dataSaving: false,
  profileVisible: true,
};

export default function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem("ai_speak_settings");
    return stored ? JSON.parse(stored) : DEFAULT;
  });
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setSettings((p) => ({ ...p, [key]: value }));

  const save = () => {
    localStorage.setItem("ai_speak_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className="relative w-12 h-6 rounded-full transition-colors"
      style={{ background: value ? "#7c3aed" : "var(--muted)" }}
    >
      <div
        className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
        style={{ transform: value ? "translateX(26px)" : "translateX(4px)" }}
      />
    </button>
  );

  return (
    <div className="min-h-screen pt-20 pb-10 px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="text-sm font-mono mb-1" style={{ color: "var(--accent)" }}>PREFERENCES</div>
          <h1 className="text-3xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Settings</h1>
        </motion.div>

        <div className="space-y-4">
          {/* Appearance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="p-6 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-4">
              <FiMoon className="w-4 h-4 text-violet-400" />
              <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Appearance</h2>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Dark Mode</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Use dark theme across the app</div>
              </div>
              <Toggle value={isDark} onChange={() => toggleTheme()} />
            </div>
          </motion.div>

          {/* Language */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-4">
              <FiGlobe className="w-4 h-4 text-cyan-400" />
              <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Language</h2>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Interface Language</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Language used in the UI</div>
              </div>
              <select value={settings.language} onChange={(e) => update("language", e.target.value)} className="text-sm px-3 py-1.5 rounded-lg outline-none" style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                {["English", "Spanish", "French", "Hindi", "Arabic"].map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="p-6 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-4">
              <FiBell className="w-4 h-4 text-amber-400" />
              <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Notifications</h2>
            </div>
            {[
              { label: "Push Notifications", sub: "Receive updates and tips", key: "notifications" as const },
              { label: "Session Reminders", sub: "Daily reminder to practice", key: "sessionReminder" as const },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{n.label}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{n.sub}</div>
                </div>
                <Toggle value={settings[n.key]} onChange={(v) => update(n.key, v)} />
              </div>
            ))}
          </motion.div>

          {/* Voice */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-4">
              <FiMic className="w-4 h-4 text-emerald-400" />
              <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Voice Preferences</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>Voice Speed</div>
                <div className="flex gap-2">
                  {["Slow", "Normal", "Fast"].map((s) => (
                    <button key={s} onClick={() => update("voiceSpeed", s)} className="flex-1 py-1.5 rounded-lg text-sm font-medium transition-all" style={{ background: settings.voiceSpeed === s ? "#7c3aed" : "var(--muted)", color: settings.voiceSpeed === s ? "white" : "var(--muted-foreground)" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>Accent Preference</div>
                <select value={settings.accent} onChange={(e) => update("accent", e.target.value)} className="w-full text-sm px-3 py-2 rounded-lg outline-none" style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                  {["American English", "British English", "Australian English", "Canadian English"].map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="p-6 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-4">
              <FiShield className="w-4 h-4 text-blue-400" />
              <h2 className="font-bold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Privacy Settings</h2>
            </div>
            {[
              { label: "Public Profile", sub: "Allow others to see your profile and scores", key: "profileVisible" as const },
              { label: "Data Saving Mode", sub: "Reduce data usage during sessions", key: "dataSaving" as const },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{n.label}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{n.sub}</div>
                </div>
                <Toggle value={settings[n.key]} onChange={(v) => update(n.key, v)} />
              </div>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={save}
            className="w-full py-3 rounded-xl btn-primary text-sm font-semibold flex items-center justify-center gap-2"
          >
            <FiSave className="w-4 h-4" />
            {saved ? "Settings Saved!" : "Save Settings"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
