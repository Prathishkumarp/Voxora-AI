import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMic, FiMail, FiCheckCircle } from "react-icons/fi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden" style={{ background: "var(--background)" }}>
      <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-15" style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="p-8 rounded-2xl glass" style={{ border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <FiMic className="text-white w-4 h-4" />
            </div>
            <span className="font-bold gradient-text" style={{ fontFamily: "Plus Jakarta Sans" }}>SpeakAI</span>
          </div>

          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(5,150,105,0.15)" }}>
                <FiCheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-xl font-bold mb-2" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Check your email</h1>
              <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
                If an account exists for <strong style={{ color: "var(--foreground)" }}>{email}</strong>, you will receive a password reset link shortly.
              </p>
              <Link to="/login" className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors">
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold mb-1" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>Reset password</h1>
              <p className="text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>
                Enter your email and we will send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--muted-foreground)" }}>Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                      onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl btn-primary text-sm font-semibold disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <p className="text-center text-sm mt-6" style={{ color: "var(--muted-foreground)" }}>
                Remember your password?{" "}
                <Link to="/login" className="font-semibold text-violet-400 hover:text-violet-300 transition-colors">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
