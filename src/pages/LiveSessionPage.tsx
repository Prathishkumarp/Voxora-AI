import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMic, FiMicOff, FiPause, FiPlay, FiSquare, FiArrowLeft } from "react-icons/fi";
import { PRACTICE_MODES, generateAIFeedback } from "../data/practiceData";

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export default function LiveSessionPage() {
  const { modeId } = useParams<{ modeId: string }>();
  const navigate = useNavigate();

  const mode = PRACTICE_MODES.find((m) => m.id === modeId);
  const [questionIndex] = useState(() => Math.floor(Math.random() * (mode?.questions.length || 1)));
  const question = mode?.questions[questionIndex] || "";

  const [status, setStatus] = useState<"idle" | "recording" | "paused" | "processing">("idle");
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [micAllowed, setMicAllowed] = useState<boolean | null>(null);
  const [bars, setBars] = useState<number[]>(Array(16).fill(4));

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const barsRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const finalTranscriptRef = useRef("");

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const animateBars = useCallback(() => {
    barsRef.current = setInterval(() => {
      setBars(Array(16).fill(0).map(() => Math.round(4 + Math.random() * 36)));
    }, 100);
  }, []);

  const stopBars = useCallback(() => {
    if (barsRef.current) clearInterval(barsRef.current);
    setBars(Array(16).fill(4));
  }, []);

  const initRecognition = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onresult = (e: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalTranscriptRef.current += t + " ";
          setTranscript(finalTranscriptRef.current);
        } else {
          interim += t;
        }
      }
      setInterimTranscript(interim);
    };

    rec.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error === "not-allowed") setMicAllowed(false);
    };

    return rec;
  }, []);

  const startRecording = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAllowed(true);
    } catch {
      setMicAllowed(false);
      return;
    }

    const rec = initRecognition();
    if (!rec) {
      setMicAllowed(false);
      return;
    }
    recognitionRef.current = rec;
    rec.start();
    setStatus("recording");
    startTimer();
    animateBars();
  }, [initRecognition, startTimer, animateBars]);

  const pauseRecording = useCallback(() => {
    recognitionRef.current?.stop();
    stopTimer();
    stopBars();
    setStatus("paused");
    setInterimTranscript("");
  }, [stopTimer, stopBars]);

  const resumeRecording = useCallback(() => {
    const rec = initRecognition();
    if (!rec) return;
    recognitionRef.current = rec;
    rec.start();
    setStatus("recording");
    startTimer();
    animateBars();
  }, [initRecognition, startTimer, animateBars]);

  const stopRecording = useCallback(async () => {
    recognitionRef.current?.stop();
    stopTimer();
    stopBars();
    setStatus("processing");
    setInterimTranscript("");

    await new Promise((r) => setTimeout(r, 1500));

    const fullTranscript = finalTranscriptRef.current.trim() || "I would like to share my thoughts on this topic.";
    const result = generateAIFeedback(fullTranscript, modeId || "random");
    result.question = question;
    result.duration = elapsed;

    const stored = localStorage.getItem("ai_speak_sessions");
    const sessions = stored ? JSON.parse(stored) : [];
    sessions.push(result);
    localStorage.setItem("ai_speak_sessions", JSON.stringify(sessions));

    navigate("/result", { state: { result } });
  }, [stopTimer, stopBars, modeId, question, elapsed, navigate]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      stopTimer();
      stopBars();
    };
  }, [stopTimer, stopBars]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (!mode) return <div className="min-h-screen pt-24 flex items-center justify-center" style={{ color: "var(--foreground)" }}>Mode not found.</div>;

  return (
    <div className="min-h-screen pt-20 pb-10 px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button
            onClick={() => navigate("/practice")}
            className="flex items-center gap-2 text-sm mb-6 hover:text-violet-400 transition-colors"
            style={{ color: "var(--muted-foreground)" }}
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Modes
          </button>

          {/* Mode Header */}
          <div className="p-6 rounded-2xl glass mb-5" style={{ border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">{mode.icon}</span>
              <div>
                <div className="text-xs font-mono" style={{ color: "var(--accent)" }}>PRACTICE MODE</div>
                <h1 className="text-xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>{mode.title}</h1>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="p-6 rounded-2xl mb-5" style={{ background: `${mode.color}15`, border: `1px solid ${mode.color}40` }}>
            <div className="text-xs font-mono mb-2" style={{ color: mode.color }}>CURRENT QUESTION</div>
            <p className="text-base font-medium leading-relaxed" style={{ fontFamily: "Plus Jakarta Sans", color: "var(--foreground)" }}>
              "{question}"
            </p>
          </div>

          {/* Waveform + Controls */}
          <div className="p-8 rounded-2xl glass mb-5 text-center" style={{ border: "1px solid var(--border)" }}>
            {/* Elapsed */}
            <div className="text-4xl font-bold mb-6" style={{ fontFamily: "JetBrains Mono", color: "var(--foreground)" }}>
              {formatTime(elapsed)}
            </div>

            {/* Wave Visualization */}
            <div className="flex items-center justify-center gap-1 h-14 mb-8">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-100"
                  style={{
                    width: "4px",
                    height: `${status === "recording" ? h : 4}px`,
                    background: status === "recording" ? mode.color : "var(--border)",
                    opacity: status === "recording" ? 0.7 + (i % 3) * 0.1 : 0.3,
                  }}
                />
              ))}
            </div>

            {/* Mic Button */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {status === "idle" && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={startRecording}
                  className="w-20 h-20 rounded-full flex items-center justify-center pulse-ring"
                  style={{ background: mode.color }}
                >
                  <FiMic className="w-8 h-8 text-white" />
                </motion.button>
              )}

              {status === "recording" && (
                <>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={pauseRecording} className="w-12 h-12 rounded-full flex items-center justify-center glass glass-hover" style={{ border: "1px solid var(--border)" }}>
                    <FiPause className="w-5 h-5" style={{ color: "var(--foreground)" }} />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={stopRecording} className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "#dc2626" }}>
                    <FiSquare className="w-7 h-7 text-white" />
                  </motion.button>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${mode.color}20`, border: `1px solid ${mode.color}40` }}>
                    <FiMic className="w-5 h-5" style={{ color: mode.color }} />
                  </div>
                </>
              )}

              {status === "paused" && (
                <>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={resumeRecording} className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: mode.color }}>
                    <FiPlay className="w-7 h-7 text-white" />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={stopRecording} className="w-12 h-12 rounded-full flex items-center justify-center glass glass-hover" style={{ border: "1px solid #dc2626" }}>
                    <FiSquare className="w-5 h-5 text-red-400" />
                  </motion.button>
                </>
              )}

              {status === "processing" && (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full border-4 border-violet-600 border-t-transparent animate-spin" />
                  <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>Analyzing your speech...</span>
                </div>
              )}
            </div>

            <div className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
              {status === "idle" && "Click the microphone to begin speaking"}
              {status === "recording" && <span className="text-red-400 flex items-center justify-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400 inline-block animate-pulse" /> Recording — click stop when finished</span>}
              {status === "paused" && "Paused — click play to resume"}
              {status === "processing" && "Processing your response..."}
            </div>
          </div>

          {/* Microphone Warning */}
          {micAllowed === false && (
            <div className="p-4 rounded-xl mb-5 text-sm" style={{ background: "rgba(220,38,38,0.1)", color: "#f87171", border: "1px solid rgba(220,38,38,0.2)" }}>
              <div className="flex items-center gap-2 mb-1 font-semibold"><FiMicOff className="w-4 h-4" /> Microphone access denied</div>
              <p className="text-xs">Please allow microphone access in your browser settings to use speech recognition. Alternatively, the app will simulate a response for demo purposes.</p>
              <button
                onClick={stopRecording}
                className="mt-2 text-xs underline hover:no-underline"
              >
                Continue with demo transcript
              </button>
            </div>
          )}

          {/* Live Transcript */}
          <AnimatePresence>
            {(transcript || interimTranscript) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-5 rounded-2xl glass"
                style={{ border: "1px solid var(--border)" }}
              >
                <div className="text-xs font-mono mb-2" style={{ color: "var(--accent)" }}>LIVE TRANSCRIPT</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                  {transcript}
                  <span style={{ color: "var(--muted-foreground)" }}>{interimTranscript}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
