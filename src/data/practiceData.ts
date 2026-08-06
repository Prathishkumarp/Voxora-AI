export interface PracticeMode {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  questions: string[];
  tips: string[];
}

export const PRACTICE_MODES: PracticeMode[] = [
  {
    id: "self-intro",
    title: "Self Introduction",
    description: "Practice introducing yourself confidently in any situation",
    icon: "👤",
    color: "#7c3aed",
    gradient: "from-violet-600 to-purple-700",
    questions: [
      "Tell me about yourself. Who are you and what do you do?",
      "Describe your background, education, and professional experience.",
      "What are your greatest strengths and how do they define you?",
      "Where are you from and what has shaped your personality?",
      "Describe yourself in three words and explain why you chose them.",
    ],
    tips: ["Speak clearly and at a moderate pace", "Use the STAR method for examples", "Show enthusiasm"],
  },
  {
    id: "daily-conversation",
    title: "Daily Conversation",
    description: "Build fluency for everyday English interactions",
    icon: "💬",
    color: "#0891b2",
    gradient: "from-cyan-600 to-blue-600",
    questions: [
      "What did you do over the weekend? Tell me all about it.",
      "How has your day been so far? Any interesting moments?",
      "What is your favorite hobby and why do you enjoy it so much?",
      "Describe a typical day in your life from morning to evening.",
      "Tell me about a movie or book you recently enjoyed. What made it special?",
    ],
    tips: ["Use natural filler phrases", "Ask follow-up questions", "Vary your intonation"],
  },
  {
    id: "job-interview",
    title: "Job Interview",
    description: "Nail your next interview with professional English",
    icon: "💼",
    color: "#059669",
    gradient: "from-emerald-600 to-teal-600",
    questions: [
      "Why are you interested in this position and our company specifically?",
      "Tell me about a challenging project you led and how you overcame obstacles.",
      "Where do you see yourself professionally in the next five years?",
      "Describe a time you had a conflict with a colleague. How did you resolve it?",
      "What makes you the best candidate for this role over others?",
    ],
    tips: ["Use formal vocabulary", "Provide specific examples", "Be concise and structured"],
  },
  {
    id: "public-speaking",
    title: "Public Speaking",
    description: "Develop confidence for presentations and speeches",
    icon: "🎤",
    color: "#dc2626",
    gradient: "from-red-600 to-rose-600",
    questions: [
      "Deliver a two-minute speech on why education is the key to success.",
      "Give a motivational speech about overcoming failure and rising again.",
      "Present your opinion on the importance of environmental conservation.",
      "Deliver an opening statement for a conference on technology and society.",
      "Give a speech about a person who has greatly inspired your life.",
    ],
    tips: ["Project your voice", "Make eye contact", "Use rhetorical questions"],
  },
  {
    id: "storytelling",
    title: "Story Telling",
    description: "Master the art of engaging narrative in English",
    icon: "📖",
    color: "#d97706",
    gradient: "from-amber-600 to-orange-600",
    questions: [
      "Tell me the most memorable travel experience you have ever had.",
      "Share a story about a time when you unexpectedly made a new friend.",
      "Describe the most challenging moment in your life and what you learned.",
      "Tell a funny or embarrassing story from your childhood.",
      "Share a story about a risk you took that changed your life.",
    ],
    tips: ["Use vivid descriptive language", "Build suspense", "Include emotional moments"],
  },
  {
    id: "debate",
    title: "Debate",
    description: "Practice arguing and defending positions persuasively",
    icon: "⚖️",
    color: "#7c2d92",
    gradient: "from-purple-700 to-fuchsia-700",
    questions: [
      "Argue for or against: Social media has done more harm than good to society.",
      "Debate: Remote work should become the permanent standard for office jobs.",
      "Argue your position: Artificial intelligence will ultimately eliminate human creativity.",
      "Debate: Mandatory voting should be implemented in democratic countries.",
      "Argue: Online education is superior to traditional classroom learning.",
    ],
    tips: ["State your position clearly first", "Anticipate counterarguments", "Use evidence and logic"],
  },
  {
    id: "business",
    title: "Business Communication",
    description: "Excel in professional meetings and negotiations",
    icon: "📊",
    color: "#1d4ed8",
    gradient: "from-blue-700 to-indigo-700",
    questions: [
      "Present a quarterly business review for your team. Highlight key metrics and next steps.",
      "Lead a client negotiation for a partnership deal. Address concerns and close.",
      "Conduct a performance review meeting with a team member who missed targets.",
      "Present a business proposal for expanding into a new market segment.",
      "Handle a difficult client complaint call and turn it into a positive outcome.",
    ],
    tips: ["Use professional vocabulary", "Be direct and solution-focused", "Listen actively"],
  },
  {
    id: "travel",
    title: "Travel English",
    description: "Communicate confidently in travel situations worldwide",
    icon: "✈️",
    color: "#0f766e",
    gradient: "from-teal-600 to-cyan-700",
    questions: [
      "Check in at a hotel and request a room upgrade explaining your reasoning.",
      "Navigate a flight delay situation and negotiate with airline staff.",
      "Ask for directions and local recommendations in an unfamiliar city.",
      "Order a special dietary meal at a restaurant abroad with specific requests.",
      "Handle a lost luggage situation at the airport and file a claim.",
    ],
    tips: ["Speak slowly and clearly", "Confirm understanding", "Be polite but assertive"],
  },
  {
    id: "college",
    title: "College Presentation",
    description: "Build academic English for university success",
    icon: "🎓",
    color: "#b45309",
    gradient: "from-yellow-700 to-amber-700",
    questions: [
      "Present your thesis research proposal to your academic committee.",
      "Explain the causes and effects of climate change to your class.",
      "Give a critical analysis of a contemporary social issue for a seminar.",
      "Defend your capstone project design choices to your professors.",
      "Deliver a literature review on a topic in your field of study.",
    ],
    tips: ["Use academic vocabulary", "Cite evidence", "Organize with clear structure"],
  },
  {
    id: "random",
    title: "Random Topics",
    description: "Build spontaneous speaking confidence on any topic",
    icon: "🎲",
    color: "#6b7280",
    gradient: "from-gray-600 to-slate-700",
    questions: [
      "If you could have dinner with any historical figure, who would it be and why?",
      "Describe the ideal city of the future. What would make it perfect?",
      "If you could change one thing about the world, what would it be?",
      "Describe your perfect day from the moment you wake up to when you sleep.",
      "If you invented something new, what would it be and how would it help humanity?",
    ],
    tips: ["Think aloud if needed", "Use transition phrases", "Keep it interesting"],
  },
];

export interface SessionResult {
  id: string;
  date: string;
  mode: string;
  modeId: string;
  duration: number;
  transcript: string;
  overallScore: number;
  grammar: number;
  vocabulary: number;
  confidence: number;
  fluency: number;
  speakingSpeed: number;
  suggestions: string[];
  mistakes: { original: string; corrected: string; explanation: string }[];
  vocabularySuggestions: { word: string; alternatives: string[] }[];
  grammarTips: string[];
  aiFeedback: string;
  question: string;
}

export function generateAIFeedback(transcript: string, mode: string): SessionResult {
  const words = transcript.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = transcript.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  const baseScore = Math.min(95, Math.max(40, 55 + wordCount * 0.3 + sentences.length * 2));
  const grammar = Math.round(Math.min(10, Math.max(4, baseScore / 10 + (Math.random() - 0.5))));
  const vocabulary = Math.round(Math.min(10, Math.max(4, (baseScore - 5) / 10 + (Math.random() - 0.5))));
  const confidence = Math.round(Math.min(10, Math.max(3, (baseScore - 3) / 10 + (Math.random() - 0.5))));
  const fluency = Math.round(Math.min(10, Math.max(4, baseScore / 10 + (Math.random() - 0.5))));
  const speakingSpeed = Math.round(Math.min(10, Math.max(4, baseScore / 10)));
  const overall = Math.round(
    ((grammar + vocabulary + confidence + fluency + speakingSpeed) / 50) * 100
  );

  const fillerWords = ["um", "uh", "like", "you know", "basically", "literally", "actually"];
  const foundFillers = fillerWords.filter((w) => transcript.toLowerCase().includes(w));

  const suggestions = [
    wordCount < 50 ? "Try to speak for longer — aim for at least 2 minutes per response." : null,
    foundFillers.length > 0 ? `Reduce filler words: "${foundFillers.join('", "')}"` : null,
    vocabulary < 8 ? "Incorporate more advanced vocabulary to elevate your speech." : null,
    fluency < 8 ? "Work on smoother transitions between ideas for better flow." : null,
    "Practice speaking slightly slower to improve clarity and comprehension.",
  ].filter(Boolean) as string[];

  const commonMistakes = [
    { original: "I am go to", corrected: "I am going to", explanation: 'Use the gerund "-ing" form after "am/is/are"' },
    { original: "She don't", corrected: "She doesn't", explanation: 'Use "doesn\'t" for third-person singular' },
    { original: "more better", corrected: "better", explanation: '"Better" is already a comparative — no "more" needed' },
  ];

  const vocabSuggestions = [
    { word: "good", alternatives: ["excellent", "remarkable", "outstanding"] },
    { word: "said", alternatives: ["mentioned", "explained", "articulated"] },
    { word: "big", alternatives: ["substantial", "considerable", "significant"] },
  ];

  const grammarTips = [
    "Use the present perfect tense to describe past experiences: 'I have worked...'",
    "Connect ideas with linking words: 'Furthermore', 'In addition', 'Consequently'",
    "Use conditional sentences for hypothetical situations: 'If I were..., I would...'",
  ];

  const modeLabel = PRACTICE_MODES.find((m) => m.id === mode)?.title || mode;

  const aiFeedback = `Your ${modeLabel} practice session shows ${overall >= 75 ? "strong" : "developing"} communication skills. ${
    overall >= 80
      ? "Your speech demonstrates good command of English with clear articulation and structured thinking."
      : "With consistent practice, your fluency and confidence will improve significantly."
  } Focus on ${suggestions[0] || "expanding your vocabulary"} to reach the next level. ${
    grammar >= 8 ? "Your grammar is commendable — a real strength to build upon." : "Pay attention to verb tense agreement for more polished delivery."
  } Keep up the practice — consistency is the key to mastery!`;

  return {
    id: `session_${Date.now()}`,
    date: new Date().toISOString(),
    mode: modeLabel,
    modeId: mode,
    duration: Math.max(30, wordCount * 0.5),
    transcript,
    overallScore: overall,
    grammar,
    vocabulary,
    confidence,
    fluency,
    speakingSpeed,
    suggestions,
    mistakes: wordCount > 10 ? commonMistakes.slice(0, 2) : [],
    vocabularySuggestions: vocabSuggestions,
    grammarTips,
    aiFeedback,
    question: "",
  };
}
