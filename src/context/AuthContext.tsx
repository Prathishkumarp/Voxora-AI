import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  level: string;
  goal: string;
  avatar: string;
  role: "user" | "admin";
  joinedAt: string;
  stats: {
    speakingScore: number;
    grammarScore: number;
    vocabularyScore: number;
    streak: number;
    practiceTime: number;
    completedSessions: number;
  };
  achievements: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: User[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    email: "alex@example.com",
    country: "United States",
    level: "Intermediate",
    goal: "Improve professional communication",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format",
    role: "user",
    joinedAt: "2024-01-15",
    stats: {
      speakingScore: 78,
      grammarScore: 82,
      vocabularyScore: 75,
      streak: 12,
      practiceTime: 340,
      completedSessions: 47,
    },
    achievements: ["First Session", "7-Day Streak", "Grammar Master", "50 Sessions"],
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    country: "United Kingdom",
    level: "Advanced",
    goal: "Platform management",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    role: "admin",
    joinedAt: "2023-06-01",
    stats: {
      speakingScore: 95,
      grammarScore: 97,
      vocabularyScore: 93,
      streak: 30,
      practiceTime: 1200,
      completedSessions: 180,
    },
    achievements: ["First Session", "7-Day Streak", "30-Day Streak", "Grammar Master", "100 Sessions", "Vocabulary Pro"],
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("ai_speak_token");
    const storedUser = localStorage.getItem("ai_speak_user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    const found = DEMO_USERS.find((u) => u.email === email);
    if (found && password.length >= 6) {
      const fakeToken = `jwt_${found.id}_${Date.now()}`;
      setUser(found);
      setToken(fakeToken);
      localStorage.setItem("ai_speak_token", fakeToken);
      localStorage.setItem("ai_speak_user", JSON.stringify(found));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      country: "United States",
      level: "Beginner",
      goal: "Improve English speaking",
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&auto=format`,
      role: "user",
      joinedAt: new Date().toISOString().split("T")[0],
      stats: { speakingScore: 0, grammarScore: 0, vocabularyScore: 0, streak: 0, practiceTime: 0, completedSessions: 0 },
      achievements: [],
    };
    const fakeToken = `jwt_${newUser.id}_${Date.now()}`;
    setUser(newUser);
    setToken(fakeToken);
    localStorage.setItem("ai_speak_token", fakeToken);
    localStorage.setItem("ai_speak_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("ai_speak_token");
    localStorage.removeItem("ai_speak_user");
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("ai_speak_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
