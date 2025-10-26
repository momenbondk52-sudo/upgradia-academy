import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { IntroAnimation } from "./components/IntroAnimation";
import { RoleSelection } from "./components/RoleSelection";
import { AuthCard } from "./components/AuthCard";
import { StudentDashboard } from "./components/StudentDashboard";
import { InstructorDashboard } from "./components/InstructorDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { Toaster } from "./components/ui/sonner";
import { Globe } from "lucide-react";

type AppState =
  | "intro"
  | "role-selection"
  | "auth"
  | "student-dashboard"
  | "instructor-dashboard"
  | "admin-dashboard";

type Role = "student" | "professor" | "ta" | "admin" | null;

export default function App() {
  const [appState, setAppState] = useState<AppState>("intro");
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleIntroComplete = () => {
    setAppState("role-selection");
  };

  const handleRoleSelect = (
    role: "student" | "professor" | "ta" | "admin",
  ) => {
    setSelectedRole(role);
    setAppState("auth");
  };

  const handleAuthBack = () => {
    setSelectedRole(null);
    setAppState("role-selection");
  };

  const handleLogin = (credentials: any) => {
    // Mock login - in real app, this would authenticate with backend
    const user = {
      ...credentials,
      role: selectedRole,
    };

    setCurrentUser(user);

    // Route to appropriate dashboard based on role
    if (selectedRole === "student") {
      setAppState("student-dashboard");
    } else if (
      selectedRole === "professor" ||
      selectedRole === "ta"
    ) {
      setAppState("instructor-dashboard");
    } else if (selectedRole === "admin") {
      setAppState("admin-dashboard");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedRole(null);
    setAppState("role-selection");
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  return (
    <div
      className="size-full relative"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Language Toggle Button - Always visible */}
      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg hover:border-accent transition-all"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {language === "en" ? "AR" : "EN"}
        </span>
      </button>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {appState === "intro" && (
          <IntroAnimation
            key="intro"
            onComplete={handleIntroComplete}
          />
        )}

        {appState === "role-selection" && (
          <RoleSelection
            key="role-selection"
            onRoleSelect={handleRoleSelect}
            language={language}
          />
        )}

        {appState === "auth" && selectedRole && (
          <AuthCard
            key="auth"
            role={selectedRole}
            onBack={handleAuthBack}
            onLogin={handleLogin}
            language={language}
          />
        )}

        {appState === "student-dashboard" && (
          <StudentDashboard
            key="student-dashboard"
            user={currentUser}
            onLogout={handleLogout}
            language={language}
          />
        )}

        {appState === "instructor-dashboard" && (
          <InstructorDashboard
            key="instructor-dashboard"
            user={currentUser}
            onLogout={handleLogout}
            language={language}
          />
        )}

        {appState === "admin-dashboard" && (
          <AdminDashboard
            key="admin-dashboard"
            user={currentUser}
            onLogout={handleLogout}
            language={language}
          />
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        expand={true}
        richColors
        closeButton
        theme="dark"
      />
    </div>
  );
}