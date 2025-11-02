import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IntroAnimation } from "./components/IntroAnimation";
import { RoleSelection } from "./components/RoleSelection";
import { AuthCard } from "./components/AuthCard";
import { StudentDashboard } from "./components/StudentDashboard";
import { InstructorDashboard } from "./components/InstructorDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { SpiderWebTransition } from "./components/SpiderWebTransition";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { Toaster } from "./components/ui/sonner";
import { Globe } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { soundManager } from "./utils/soundManager";

type AppState =
  | "intro"
  | "role-selection"
  | "auth"
  | "student-dashboard"
  | "instructor-dashboard"
  | "admin-dashboard";

type Role = "student" | "professor" | "ta" | "admin" | null;

interface RegistrationRequest {
  id: string;
  name: string;
  email: string;
  role: "student" | "professor" | "ta";
  universityCode?: string;
  nationalId: string;
  idPhoto?: File;
  proofDocument?: File;
  timestamp: string;
  status: "pending" | "approved" | "rejected";
}

export default function App() {
  const [appState, setAppState] = useState<AppState>("intro");
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [registrationRequests, setRegistrationRequests] = useState<
    RegistrationRequest[]
  >([]);
  const [showTransition, setShowTransition] = useState(false);

  const handleIntroComplete = () => {
    setShowTransition(true);
    setTimeout(() => {
      setAppState("role-selection");
      setShowTransition(false);
    }, 800);
  };

  const handleRoleSelect = (
    role: "student" | "professor" | "ta" | "admin",
  ) => {
    setShowTransition(true);
    setTimeout(() => {
      setSelectedRole(role);
      setAppState("auth");
      setShowTransition(false);
    }, 800);
  };

  const handleAuthBack = () => {
    setShowTransition(true);
    setTimeout(() => {
      setSelectedRole(null);
      setAppState("role-selection");
      setShowTransition(false);
    }, 800);
  };

  const handleLogin = (credentials: any) => {
    // Admin login check with fixed credentials
    if (selectedRole === "admin") {
      if (
        credentials.username !== "20102010" ||
        credentials.password !== "30305090102090"
      ) {
        toast.error(
          language === "en"
            ? "Invalid admin credentials"
            : "بيانات المسؤول غير صحيحة"
        );
        return;
      }
    }

    const user = {
      ...credentials,
      role: selectedRole,
    };

    soundManager.playSuccess();
    setShowTransition(true);
    
    setTimeout(() => {
      setCurrentUser(user);

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
      setShowTransition(false);
    }, 800);
  };

  const handleLogout = () => {
    setShowTransition(true);
    setTimeout(() => {
      setCurrentUser(null);
      setSelectedRole(null);
      setAppState("role-selection");
      setShowTransition(false);
    }, 800);
  };

  const toggleLanguage = () => {
    soundManager.playClick();
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
    toast.success(
      language === "en" ? "تم التبديل إلى العربية" : "Switched to English"
    );
  };

  const handleRegister = (registrationData: any) => {
    const newRequest: RegistrationRequest = {
      id: `REQ-${Date.now()}`,
      ...registrationData,
    };
    setRegistrationRequests((prev) => [...prev, newRequest]);
  };

  const handleApproveRequest = (requestId: string) => {
    const request = registrationRequests.find((req) => req.id === requestId);
    if (!request) return;

    let username = "";
    let password = request.nationalId;

    if (request.role === "student") {
      username = request.universityCode || "";
      toast.success(
        language === "en"
          ? `${request.name} approved! Username: ${username}, Password: National ID`
          : `تمت الموافقة على ${request.name}! اسم المستخدم: ${username}، كلمة المرور: الرقم القومي`
      );
    } else {
      username = `${request.role === "professor" ? "PROF" : "TA"}${Date.now().toString().slice(-6)}`;
      toast.success(
        language === "en"
          ? `${request.name} approved! Username: ${username}, Password: National ID (${password})`
          : `تمت الموافقة على ${request.name}! اسم المستخدم: ${username}، كلمة المرور: الرقم القومي (${password})`
      );
    }

    setRegistrationRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "approved" as const } : req
      )
    );
  };

  const handleRejectRequest = (requestId: string) => {
    setRegistrationRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "rejected" as const } : req
      )
    );
  };

  return (
    <div
      className="size-full fixed inset-0 overflow-hidden"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Persistent Animated Background - Never unmounts */}
      {appState !== "intro" && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <AnimatedBackground />
        </div>
      )}

      {/* Language Toggle Button - Always visible */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={toggleLanguage}
        onMouseEnter={() => soundManager.playHover()}
        className={`fixed top-4 sm:top-6 z-50 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg sm:rounded-xl hover:border-accent transition-all btn-press hover:scale-105 ${
          language === "ar" ? "left-4 sm:left-6" : "right-4 sm:right-6"
        }`}
      >
        <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="text-xs sm:text-sm font-medium">
          {language === "en" ? "عربي" : "English"}
        </span>
      </motion.button>

      {/* Spider-Man Web Transition */}
      {showTransition && <SpiderWebTransition />}

      {/* Main Content with Transitions */}
      <AnimatePresence mode="wait">
        {appState === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <IntroAnimation onComplete={handleIntroComplete} language={language} />
          </motion.div>
        )}

        {appState === "role-selection" && (
          <motion.div
            key="role-selection"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10"
          >
            <RoleSelection
              onRoleSelect={handleRoleSelect}
              language={language}
            />
          </motion.div>
        )}

        {appState === "auth" && selectedRole && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, x: language === "ar" ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: language === "ar" ? 50 : -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10"
          >
            <AuthCard
              role={selectedRole}
              onBack={handleAuthBack}
              onLogin={handleLogin}
              onRegister={handleRegister}
              language={language}
            />
          </motion.div>
        )}

        {appState === "student-dashboard" && (
          <motion.div
            key="student-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <StudentDashboard
              user={currentUser}
              onLogout={handleLogout}
              language={language}
            />
          </motion.div>
        )}

        {appState === "instructor-dashboard" && (
          <motion.div
            key="instructor-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <InstructorDashboard
              user={currentUser}
              onLogout={handleLogout}
              language={language}
            />
          </motion.div>
        )}

        {appState === "admin-dashboard" && (
          <motion.div
            key="admin-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <AdminDashboard
              user={currentUser}
              onLogout={handleLogout}
              language={language}
              registrationRequests={registrationRequests}
              onApproveRequest={handleApproveRequest}
              onRejectRequest={handleRejectRequest}
            />
          </motion.div>
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
