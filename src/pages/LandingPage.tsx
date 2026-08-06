import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMic, FiTrendingUp, FiAward, FiGlobe, FiZap, FiShield,
  FiChevronDown, FiChevronUp, FiStar, FiCheck, FiArrowRight
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const FEATURES = [
  { icon: <FiMic className="w-6 h-6" />, title: "Real-Time Speech Recognition", desc: "Browser-native speech recognition converts your spoken words to text instantly with high accuracy." },
  { icon: <FiZap className="w-6 h-6" />, title: "AI-Powered Feedback", desc: "Get detailed analysis of grammar, vocabulary, fluency, confidence, and speaking speed after every session." },
  { icon: <FiTrendingUp className="w-6 h-6" />, title: "Progress Tracking", desc: "Visual charts and streaks keep you motivated as you watch your scores improve over time." },
  { icon: <FiGlobe className="w-6 h-6" />, title: "10 Practice Modes", desc: "From job interviews to storytelling, master English in the contexts that matter most to you." },
  { icon: <FiAward className="w-6 h-6" />, title: "Achievements & Badges", desc: "Earn achievements as you reach milestones — stay motivated with gamified learning goals." },
  { icon: <FiShield className="w-6 h-6" />, title: "Private & Secure", desc: "Your practice sessions stay private. We never share your voice data with third parties." },
];

const STEPS = [
  { num: "01", title: "Choose a Practice Mode", desc: "Pick from 10 specialized speaking scenarios — job interviews, storytelling, debate, and more." },
  { num: "02", title: "Read the AI Question", desc: "A context-appropriate question is generated to guide your speaking practice." },
  { num: "03", title: "Speak Naturally", desc: "Click Record and speak. Your words are transcribed in real-time using browser speech recognition." },
  { num: "04", title: "Get AI Feedback", desc: "Receive a detailed score breakdown with grammar tips, vocabulary suggestions, and improvement advice." },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Software Engineer", country: "India", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", score: 94, text: "SpeakAI helped me pass my Google interview. The job interview mode is incredibly realistic and the feedback is spot-on.", rating: 5 },
  { name: "Carlos Mendez", role: "MBA Student", country: "Mexico", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop", score: 88, text: "My presentation skills improved dramatically in just 3 weeks. The public speaking mode gives feedback I never got from professors.", rating: 5 },
  { name: "Yuki Tanaka", role: "Marketing Manager", country: "Japan", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop", score: 91, text: "I practice 20 minutes every morning before work. The daily streak feature keeps me accountable. Best investment in my career.", rating: 5 },
  { name: "Ahmed Hassan", role: "Doctor", country: "Egypt", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", score: 86, text: "The business communication mode transformed how I interact with international colleagues. My confidence in meetings has soared.", rating: 4 },
];

const FAQS = [
  { q: "Do I need any special hardware to use SpeakAI?", a: "No! SpeakAI uses your browser's built-in microphone and speech recognition. Any modern laptop or phone with a microphone works perfectly." },
  { q: "How accurate is the AI feedback?", a: "Our AI analyzes grammar patterns, vocabulary diversity, speaking pace, and fluency markers to provide detailed, actionable feedback aligned with CEFR standards." },
  { q: "Can I practice offline?", a: "Speech recognition requires an internet connection for cloud processing. Your session history and progress are stored locally and sync when online." },
  { q: "What languages are supported?", a: "SpeakAI currently focuses on English practice with American and British accent support. Additional languages are on our roadmap." },
  { q: "Is my voice data stored?", a: "Audio is processed in real-time and is never permanently stored. Only the text transcript is saved for your session history." },
  { q: "How often should I practice?", a: "We recommend 15-30 minutes daily for optimal results. Our streak system is designed around this habit-forming cadence." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "var(--background)", color: "var(--foreground)", fontFamily: "Inter, sans-serif" }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15" style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5" style={{ background: "radial-gradient(circle, #7c3aed, #06b6d4)" }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm font-medium"
            style={{ color: "var(--accent)", border: "1px solid rgba(6,182,212,0.3)" }}
          >
            <FiZap className="w-4 h-4" />
            AI-Powered English Speaking Practice
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Speak English with{" "}
            <span className="gradient-text">Confidence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Practice speaking English with real-time AI feedback. Master grammar, vocabulary, and fluency across 10 specialized modes — from job interviews to storytelling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              to="/register"
              className="btn-primary px-8 py-4 text-base rounded-xl inline-flex items-center gap-2 justify-center"
            >
              Start Speaking Free <FiArrowRight />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 text-base rounded-xl glass glass-hover inline-flex items-center gap-2 justify-center font-semibold"
              style={{ color: "var(--foreground)", fontFamily: "Plus Jakarta Sans" }}
            >
              Login to Practice
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mx-auto max-w-3xl rounded-2xl glass overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="p-6 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-mono mb-1" style={{ color: "var(--muted-foreground)" }}>LIVE SESSION — JOB INTERVIEW MODE</div>
                  <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    "Tell me about a time you demonstrated leadership..."
                  </div>
                </div>
                <div className="flex gap-1 items-end h-10">
                  {[6, 14, 22, 34, 28, 18, 10, 26, 38, 20, 12, 30].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-violet-500 wave-bar"
                      style={{ height: `${h}px`, animationDelay: `${i * 0.1}s`, animationDuration: `${0.8 + i * 0.05}s` }}
                    />
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl mb-4 text-sm leading-relaxed" style={{ background: "var(--muted)", color: "var(--foreground)" }}>
                "In my previous role as team lead at a fintech startup, I noticed our deployment cycle was causing significant delays. I organized a cross-functional meeting, proposed a CI/CD pipeline, and trained the team over two weeks. We reduced deployment time by 60%..."
              </div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {[
                  { label: "Overall", val: "86/100", color: "#7c3aed" },
                  { label: "Grammar", val: "9/10", color: "#06b6d4" },
                  { label: "Vocabulary", val: "8/10", color: "#059669" },
                  { label: "Confidence", val: "8/10", color: "#d97706" },
                  { label: "Fluency", val: "9/10", color: "#dc2626" },
                ].map((s) => (
                  <div key={s.label} className="text-center p-2 rounded-lg" style={{ background: "var(--muted)" }}>
                    <div className="text-base font-bold" style={{ color: s.color }}>{s.val}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "50K+", label: "Active Learners" },
              { num: "2.1M+", label: "Practice Sessions" },
              { num: "93%", label: "Improvement Rate" },
              { num: "10", label: "Practice Modes" },
            ].map((s, i) => (
              <motion.div key={s.label} custom={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
                <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-1" style={{ fontFamily: "Plus Jakarta Sans" }}>{s.num}</div>
                <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 max-w-6xl mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
          <div className="text-sm font-mono mb-3" style={{ color: "var(--accent)" }}>FEATURES</div>
          <h2 className="text-4xl font-extrabold mb-4" style={{ fontFamily: "Plus Jakarta Sans" }}>Everything You Need to Speak Better</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            Combining browser-native speech technology with AI analysis for the most natural practice experience.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-6 rounded-2xl glass glass-hover"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-violet-400" style={{ background: "rgba(124,58,237,0.15)" }}>
                {f.icon}
              </div>
              <h3 className="font-bold text-base mb-2" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20" style={{ background: "rgba(124,58,237,0.03)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="text-sm font-mono mb-3" style={{ color: "var(--accent)" }}>HOW IT WORKS</div>
            <h2 className="text-4xl font-extrabold mb-4" style={{ fontFamily: "Plus Jakarta Sans" }}>Four Steps to Fluency</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div key={step.num} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
                <div className="text-5xl font-extrabold mb-3 opacity-20" style={{ fontFamily: "JetBrains Mono", color: "#7c3aed" }}>{step.num}</div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
          <div className="text-sm font-mono mb-3" style={{ color: "var(--accent)" }}>TESTIMONIALS</div>
          <h2 className="text-4xl font-extrabold mb-4" style={{ fontFamily: "Plus Jakarta Sans" }}>Real People, Real Results</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-6 rounded-2xl glass"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => <FiStar key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--foreground)" }}>"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{t.name}</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{t.role} · {t.country}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold gradient-text" style={{ fontFamily: "Plus Jakarta Sans" }}>{t.score}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Score</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20" style={{ background: "rgba(124,58,237,0.03)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="text-sm font-mono mb-3" style={{ color: "var(--accent)" }}>PRICING</div>
            <h2 className="text-4xl font-extrabold mb-4" style={{ fontFamily: "Plus Jakarta Sans" }}>Simple, Transparent Pricing</h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 text-sm font-medium" style={{ background: "rgba(6,182,212,0.1)", color: "var(--accent)", border: "1px solid rgba(6,182,212,0.3)" }}>
              🚀 Coming Soon — Early Access is Free
            </div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: "Starter", price: "Free", features: ["5 sessions/month", "3 practice modes", "Basic feedback", "Session history"], highlight: false },
              { name: "Pro", price: "$12/mo", features: ["Unlimited sessions", "All 10 modes", "Advanced AI feedback", "Progress analytics", "Priority support"], highlight: true },
              { name: "Enterprise", price: "Custom", features: ["Team management", "Custom modes", "API access", "Dedicated support", "Analytics dashboard"], highlight: false },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`p-6 rounded-2xl relative ${plan.highlight ? "border-2" : "border"} glass`}
                style={{ borderColor: plan.highlight ? "#7c3aed" : "var(--border)" }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: "#7c3aed" }}>MOST POPULAR</div>
                )}
                <div className="text-base font-bold mb-2" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>{plan.name}</div>
                <div className="text-3xl font-extrabold mb-1 gradient-text" style={{ fontFamily: "Plus Jakarta Sans" }}>{plan.price}</div>
                <div className="text-xs mb-6" style={{ color: "var(--muted-foreground)" }}>Coming Soon</div>
                <ul className="space-y-2 text-sm text-left mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                      <FiCheck className="w-4 h-4 text-violet-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.highlight ? "btn-primary" : "glass glass-hover"}`} style={!plan.highlight ? { color: "var(--foreground)" } : {}}>
                  Notify Me
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
          <div className="text-sm font-mono mb-3" style={{ color: "var(--accent)" }}>FAQ</div>
          <h2 className="text-4xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans" }}>Frequently Asked Questions</h2>
        </motion.div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-xl glass overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-semibold pr-4" style={{ color: "var(--foreground)" }}>{faq.q}</span>
                {openFaq === i ? <FiChevronUp className="w-4 h-4 flex-shrink-0 text-violet-500" /> : <FiChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted-foreground)" }} />}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-12 rounded-3xl relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))", border: "1px solid rgba(124,58,237,0.3)" }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
            <h2 className="text-4xl font-extrabold mb-4 relative" style={{ fontFamily: "Plus Jakarta Sans" }}>Ready to Speak with Confidence?</h2>
            <p className="text-base mb-8 relative" style={{ color: "var(--muted-foreground)" }}>Join thousands of learners who transformed their English communication with SpeakAI.</p>
            <Link to="/register" className="btn-primary px-10 py-4 text-base rounded-xl inline-flex items-center gap-2 relative">
              Start Free Practice <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                  <FiMic className="text-white w-4 h-4" />
                </div>
                <span className="font-bold gradient-text" style={{ fontFamily: "Plus Jakarta Sans" }}>SpeakAI</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                AI-powered English speaking practice for learners worldwide.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "How It Works", "Roadmap"] },
              { title: "Practice", links: ["Job Interview", "Public Speaking", "Daily Conversation", "Business English"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>{col.title}</div>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}><Link to="#" className="text-sm hover:text-violet-400 transition-colors" style={{ color: "var(--muted-foreground)" }}>{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--border)" }}>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>© 2026 SpeakAI. All rights reserved.</div>
            <div className="flex gap-6 text-xs" style={{ color: "var(--muted-foreground)" }}>
              <Link to="#" className="hover:text-violet-400 transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-violet-400 transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-violet-400 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
