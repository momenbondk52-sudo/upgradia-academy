import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  BookOpen,
  Award,
  User,
  Bell,
  LogOut,
  Menu,
  X,
  MessageCircle,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { Progress } from "./ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Badge } from "./ui/badge";
import { NewsFeed } from "./student/NewsFeed";
import { Courses } from "./student/Courses";
import { Grades } from "./student/Grades";
import { Profile } from "./student/Profile";
import { AIBot } from "./AIBot";

interface StudentDashboardProps {
  user: any;
  onLogout: () => void;
  language: "en" | "ar";
}

export function StudentDashboard({
  user,
  onLogout,
  language,
}: StudentDashboardProps) {
  const [currentPage, setCurrentPage] = useState<
    "news" | "courses" | "grades" | "profile"
  >("news");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAIBot, setShowAIBot] = useState(false);

  // Mock user data with XP
  const [studentData, setStudentData] = useState({
    xp: 750,
    level: 7,
    nextLevelXP: 800,
    streak: 12,
    notifications: 3,
  });

  const translations = {
    en: {
      dashboard: "Dashboard",
      newsFeed: "News Feed",
      courses: "My Courses",
      grades: "Grades & Performance",
      profile: "Profile",
      logout: "Logout",
      level: "Level",
      xp: "XP",
      streak: "Day Streak",
      notifications: "Notifications",
    },
    ar: {
      dashboard: "لوحة التحكم",
      newsFeed: "الأخبار",
      courses: "مقرراتي",
      grades: "الدرجات والأداء",
      profile: "الملف الشخصي",
      logout: "تسجيل الخروج",
      level: "المستوى",
      xp: "نقاط الخبرة",
      streak: "سلسلة الأيام",
      notifications: "الإشعارات",
    },
  };

  const t = translations[language];

  const menuItems = [
    { id: "news", label: t.newsFeed, icon: Home },
    { id: "courses", label: t.courses, icon: BookOpen },
    { id: "grades", label: t.grades, icon: Award },
    { id: "profile", label: t.profile, icon: User },
  ];

  const xpProgress =
    (studentData.xp / studentData.nextLevelXP) * 100;

  return (
    <div className="fixed inset-0 bg-background flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-72 bg-card border-r border-border flex flex-col"
          >
            {/* Logo - Clean */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold">
                    U
                  </span>
                </div>
                <div>
                  <h2 className="tracking-wider font-extrabold">
                    UPGRADIA
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.dashboard}
                  </p>
                </div>
              </div>
            </div>

            {/* User Profile Card - Clean */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12 border-2 border-primary/30">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {user?.fullName?.[0] || "S"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">
                    {user?.fullName || "Student Name"}
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {user?.studentCode || "STU12345"}
                  </p>
                </div>
              </div>

              {/* XP Progress - Cleaner */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Zap className="w-4 h-4 text-primary" />
                    {t.level} {studentData.level}
                  </span>
                  <span className="text-muted-foreground font-mono text-xs">
                    {studentData.xp}/{studentData.nextLevelXP}
                  </span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>

              {/* Stats - Cleaner cards */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-muted/50 border border-primary/10 rounded-lg p-2.5 text-center">
                  <Trophy className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">
                    {t.streak}
                  </p>
                  <p className="font-bold text-primary">
                    {studentData.streak}
                  </p>
                </div>
                <div className="bg-muted/50 border border-secondary/10 rounded-lg p-2.5 text-center">
                  <TrendingUp className="w-4 h-4 text-secondary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">
                    Rank
                  </p>
                  <p className="font-bold text-secondary">
                    #42
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() =>
                        setCurrentPage(item.id as any)
                      }
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                        currentPage === item.id
                          ? "bg-primary/10 text-foreground font-medium border-l-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 ${currentPage === item.id ? "text-primary" : ""}`}
                      />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-border">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>{t.logout}</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar - 72px height */}
        <header className="h-18 bg-card/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Logo + Breadcrumb */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  U
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                / {currentPage}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Level & XP Progress */}
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">
                Lvl {studentData.level}
              </span>
              <div className="w-28 h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground font-mono">
                {studentData.xp} XP
              </span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              {studentData.notifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
            </button>

            {/* Profile Avatar */}
            <Avatar className="w-10 h-10 border-2 border-primary/30 cursor-pointer hover:border-primary/60 transition-colors">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/20 text-primary">
                {user?.fullName?.[0] || "S"}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 web-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentPage === "news" && (
                <NewsFeed language={language} />
              )}
              {currentPage === "courses" && (
                <Courses
                  language={language}
                  onXPEarned={(xp) =>
                    setStudentData((prev) => ({
                      ...prev,
                      xp: prev.xp + xp,
                    }))
                  }
                />
              )}
              {currentPage === "grades" && (
                <Grades
                  language={language}
                  studentData={studentData}
                />
              )}
              {currentPage === "profile" && (
                <Profile
                  language={language}
                  user={user}
                  studentData={studentData}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* AI Bot Button - Clean Spider Blue */}
      <motion.button
        onClick={() => setShowAIBot(!showAIBot)}
        className="fixed bottom-8 right-7 w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg border-2 border-secondary/30 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
        }}
      >
        <MessageCircle className="w-7 h-7" />
      </motion.button>

      {/* AI Bot Dialog */}
      <AnimatePresence>
        {showAIBot && (
          <AIBot
            onClose={() => setShowAIBot(false)}
            language={language}
            studentData={studentData}
          />
        )}
      </AnimatePresence>
    </div>
  );
}