import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon, FiMic, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
  };

  const navLinks = isAuthenticated
    ? [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/practice", label: "Practice" },
        { to: "/history", label: "History" },
        ...(user?.role === "admin" ? [{ to: "/admin", label: "Admin" }] : []),
      ]
    : [
        { to: "/#features", label: "Features" },
        { to: "/#how-it-works", label: "How It Works" },
        { to: "/#pricing", label: "Pricing" },
      ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 glass"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <FiMic className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-lg gradient-text" style={{ fontFamily: "Plus Jakarta Sans" }}>
              SpeakAI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: location.pathname === link.to ? "var(--accent)" : "var(--muted-foreground)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg glass glass-hover flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun className="w-4 h-4" style={{ color: "var(--foreground)" }} /> : <FiMoon className="w-4 h-4" style={{ color: "var(--foreground)" }} />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 glass glass-hover"
                >
                  <img src={user?.avatar} alt={user?.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-sm font-medium hidden sm:block" style={{ color: "var(--foreground)" }}>
                    {user?.name.split(" ")[0]}
                  </span>
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 top-12 w-48 rounded-xl glass border py-2"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-violet-500/10 transition-colors"
                        style={{ color: "var(--foreground)" }}
                      >
                        <FiUser className="w-4 h-4" /> Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-violet-500/10 transition-colors"
                        style={{ color: "var(--foreground)" }}
                      >
                        <FiSettings className="w-4 h-4" /> Settings
                      </Link>
                      <hr className="my-1" style={{ borderColor: "var(--border)" }} />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-red-500/10 transition-colors text-red-400"
                      >
                        <FiLogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  style={{ color: "var(--foreground)" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold px-4 py-2 rounded-lg btn-primary"
                >
                  Get Started
                </Link>
              </div>
            )}

            <button
              className="md:hidden w-9 h-9 rounded-lg glass flex items-center justify-center"
              onClick={() => setMobileOpen((p) => !p)}
            >
              {mobileOpen ? <FiX style={{ color: "var(--foreground)" }} /> : <FiMenu style={{ color: "var(--foreground)" }} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-violet-500/10 transition-colors"
                  style={{ color: "var(--foreground)" }}
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium px-3 py-2 rounded-lg" style={{ color: "var(--foreground)" }}>Login</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="text-sm font-semibold px-3 py-2 rounded-lg btn-primary text-center">Get Started</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
