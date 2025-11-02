import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  Home,
  BookOpen,
  Trophy,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Zap,
  Star,
  Target,
  TrendingUp,
  Award,
  Clock,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { soundManager } from "../utils/soundManager";
import { AIBot } from "./AIBot";
import { AnimatedBackground } from "./AnimatedBackground";
import { NewsFeed } from "./student/NewsFeed";
import { Notifications } from "./Notifications";
import { ProfileSettings } from "./ProfileSettings";

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
  const [activeTab, setActiveTab] = useState("home");
  const [showAIBot, setShowAIBot] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  // Student data - will be populated from user profile
  const studentData = {
    name: user?.name || "",
    level: user?.level || 0,
    xp: user?.xp || 0,
    xpToNext: user?.xpToNext || 1000,
    rank: user?.rank || "",
    streak: user?.streak || 0,
    achievements: user?.achievements || 0,
    courses: user?.courses || 0,
  };

  const menuItems = [
    {
      id: "home",
      icon: Home,
      labelEn: "Home",
      labelAr: "الرئيسية",
    },
    {
      id: "courses",
      icon: BookOpen,
      labelEn: "Courses",
      labelAr: "الدورات",
    },
    {
      id: "progress",
      icon: TrendingUp,
      labelEn: "Progress",
      labelAr: "التقدم",
    },
    {
      id: "leaderboard",
      icon: Trophy,
      labelEn: "Leaderboard",
      labelAr: "المتصدرين",
    },
    {
      id: "community",
      icon: Users,
      labelEn: "Community",
      labelAr: "المجتمع",
    },
    {
      id: "messages",
      icon: MessageSquare,
      labelEn: "Messages",
      labelAr: "الرسائل",
    },
  ];

  const handleTabChange = (tabId: string) => {
    soundManager.playTabSwitch();
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    soundManager.playClick();
    onLogout();
  };

  const handleAIBot = () => {
    soundManager.playClick();
    setShowAIBot(!showAIBot);
  };

  return (
    <div className="fixed inset-0 game-background overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Mobile Menu Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => {
          soundManager.playClick();
          setSidebarOpen(!sidebarOpen);
        }}
        className={`fixed top-4 sm:top-6 z-50 lg:hidden w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-card/80 backdrop-blur-xl border border-border flex items-center justify-center btn-press hover:scale-105 transition-transform ${
          language === "ar" ? "right-4 sm:right-6" : "left-4 sm:left-6"
        }`}
      >
        {sidebarOpen ? (
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </motion.button>
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: sidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 1024 ? 0 : language === "ar" ? 300 : -300,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
        }}
        className={`fixed ${language === "ar" ? "right-0 border-l" : "left-0 border-r"} top-0 bottom-0 w-64 sm:w-72 lg:w-80 bg-card/90 backdrop-blur-2xl border-border z-40 flex flex-col lg:translate-x-0`}
      >
            {/* Logo/Header */}
            <div className="p-4 sm:p-5 md:p-6 border-b border-border">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-red">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-black gradient-text">
                    UPGRADIA
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Academy
                  </p>
                </div>
              </div>
            </div>

            {/* User Profile Card */}
            <div className="p-4 sm:p-5 md:p-6 border-b border-border">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-primary/50 glow-red">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold truncate">
                    {studentData.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-primary fill-primary" />
                    <span className="text-xs text-muted-foreground truncate">
                      {studentData.rank}
                    </span>
                  </div>
                </div>
              </div>

              {/* Level & XP */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">
                    Level {studentData.level}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {studentData.xp}/{studentData.xpToNext} XP
                  </span>
                </div>
                <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(studentData.xp / studentData.xpToNext) * 100}%`,
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                    }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
                    style={{
                      boxShadow:
                        "0 0 10px rgba(255, 43, 54, 0.5)",
                    }}
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                <div className="text-center p-1.5 sm:p-2 rounded-lg bg-muted/20">
                  <div className="text-base sm:text-lg font-bold text-primary">
                    {studentData.streak}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    Streak
                  </div>
                </div>
                <div className="text-center p-1.5 sm:p-2 rounded-lg bg-muted/20">
                  <div className="text-base sm:text-lg font-bold text-secondary">
                    {studentData.achievements}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    Badges
                  </div>
                </div>
                <div className="text-center p-1.5 sm:p-2 rounded-lg bg-muted/20">
                  <div className="text-base sm:text-lg font-bold text-accent">
                    {studentData.courses}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    Courses
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    onMouseEnter={() =>
                      soundManager.playHover()
                    }
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all btn-press ${
                      isActive
                        ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-white"
                        : "hover:bg-muted/20"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium truncate">
                      {language === "en"
                        ? item.labelEn
                        : item.labelAr}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="ml-auto w-2 h-2 rounded-full bg-primary"
                        style={{
                          boxShadow:
                            "0 0 10px rgba(255, 43, 54, 0.8)",
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 sm:p-4 border-t border-border space-y-1.5 sm:space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs sm:text-sm rounded-xl hover:bg-muted/20 h-9 sm:h-10"
                onClick={() => {
                  soundManager.playClick();
                  setShowProfileSettings(true);
                }}
                onMouseEnter={() => soundManager.playHover()}
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                {language === "en" ? "Settings" : "الإعدادات"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs sm:text-sm rounded-xl hover:bg-destructive/20 text-destructive h-9 sm:h-10"
                onClick={handleLogout}
                onMouseEnter={() => soundManager.playHover()}
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                {language === "en" ? "Logout" : "تسجيل الخروج"}
              </Button>
            </div>
          </motion.div>

      {/* Main Content */}
      <div className={`h-full overflow-y-auto custom-scrollbar ${
        language === "ar" ? "mr-0 lg:mr-80" : "ml-0 lg:ml-80"
      }`}>
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-card/80 backdrop-blur-2xl border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <div className={`flex-1 min-w-0 ${language === "ar" ? "mr-14 lg:mr-0" : "ml-14 lg:ml-0"}`}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-black truncate">
                {language === "en"
                  ? menuItems.find((m) => m.id === activeTab)
                      ?.labelEn
                  : menuItems.find((m) => m.id === activeTab)
                      ?.labelAr}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                {language === "en"
                  ? "Welcome back, hero!"
                  : "مرحباً بعودتك، بطل!"}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl hover:bg-muted/20 w-9 h-9 sm:w-10 sm:h-10"
                onClick={() => {
                  soundManager.playNotification();
                  setShowNotifications(true);
                }}
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse" />
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto p-4 sm:p-5 md:p-6">
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-5 md:space-y-6"
              >
                {/* Welcome Banner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden glow-red"
                >
                  <div className="absolute inset-0 shimmer opacity-30" />
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1.5 sm:mb-2 leading-tight">
                        {language === "en"
                          ? studentData.name ? `Ready to level up, ${studentData.name.split(' ')[0]}?` : "Ready to level up?"
                          : studentData.name ? `هل أنت مستعد للارتقاء، ${studentData.name.split(' ')[0]}؟` : "هل أنت مستعد للارتقاء؟"}
                      </h3>
                      <p className="text-sm sm:text-base text-white/90">
                        {language === "en"
                          ? studentData.streak > 0 ? `You're on a ${studentData.streak}-day streak! 🔥` : "Start your learning journey!"
                          : studentData.streak > 0 ? `لديك سلسلة ${studentData.streak} أيام! 🔥` : "ابدأ رحلتك التعليمية!"}
                      </p>
                    </div>
                    <Button
                      size="default"
                      className="w-full md:w-auto bg-white text-primary hover:bg-white/90 rounded-xl px-5 sm:px-6 md:px-8 btn-press shadow-lg text-sm sm:text-base h-10 sm:h-11"
                      onClick={() => handleTabChange("courses")}
                      onMouseEnter={() =>
                        soundManager.playHover()
                      }
                    >
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      {language === "en"
                        ? "Continue Learning"
                        : "متابعة التعلم"}
                    </Button>
                  </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                  {[
                    {
                      icon: Trophy,
                      labelEn: "Total XP",
                      labelAr: "نقاط الخبرة",
                      value: studentData.xp?.toLocaleString() || "0",
                      color: "primary",
                      glow: "glow-red",
                    },
                    {
                      icon: Award,
                      labelEn: "Achievements",
                      labelAr: "الإنجازات",
                      value: studentData.achievements?.toString() || "0",
                      color: "secondary",
                      glow: "glow-blue",
                    },
                    {
                      icon: Clock,
                      labelEn: "Study Time",
                      labelAr: "وقت الدراسة",
                      value: user?.studyTime || "0h",
                      color: "accent",
                      glow: "glow-cyan",
                    },
                    {
                      icon: TrendingUp,
                      labelEn: "Avg Score",
                      labelAr: "المعدل",
                      value: user?.avgScore ? `${user.avgScore}%` : "0%",
                      color: "primary",
                      glow: "glow-gold",
                    },
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.3 }}
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur-xl border border-border ${stat.glow} game-card cursor-pointer`}
                      >
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div
                            className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-${stat.color}/20 flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon
                              className={`w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-${stat.color}`}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">
                            {language === "en" ? stat.labelEn : stat.labelAr}
                          </p>
                          <p className="text-2xl sm:text-2xl md:text-3xl font-black">
                            {stat.value}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* News & Updates - Full Width */}
                <NewsFeed language={language} />

                {/* Recent Activity & Upcoming */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  {/* Recent Courses */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      {language === "en"
                        ? "Continue Learning"
                        : "متابعة التعلم"}
                    </h3>
                    <div className="space-y-2.5 sm:space-y-3">
                      {user?.courses && user.courses.length > 0 ? (
                        user.courses.map((course: any, i: number) => (
                          <motion.div
                            key={i}
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/20 hover:bg-muted/30 transition-all cursor-pointer btn-press"
                            onClick={() => soundManager.playClick()}
                          >
                            <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-2">
                              <h4 className="font-medium text-xs sm:text-sm truncate flex-1">
                                {course.title}
                              </h4>
                              <span className="text-xs text-muted-foreground flex-shrink-0">
                                {course.progress}%
                              </span>
                            </div>
                            <Progress
                              value={course.progress}
                              className="h-1.5 sm:h-2"
                            />
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground text-sm">
                          {language === "en"
                            ? "No active courses yet"
                            : "لا توجد دورات نشطة بعد"}
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Achievements Showcase */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      {language === "en"
                        ? "Recent Achievements"
                        : "الإنجازات الأخيرة"}
                    </h3>
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-3">
                      {[
                        {
                          emoji: "🔥",
                          label: "Week Warrior",
                          color: "from-orange-500 to-red-500",
                        },
                        {
                          emoji: "⭐",
                          label: "Star Student",
                          color:
                            "from-yellow-400 to-orange-500",
                        },
                        {
                          emoji: "🎯",
                          label: "Perfect Score",
                          color:
                            "from-green-400 to-emerald-500",
                        },
                        {
                          emoji: "💎",
                          label: "Elite Learner",
                          color: "from-cyan-400 to-blue-500",
                        },
                        {
                          emoji: "🚀",
                          label: "Fast Learner",
                          color: "from-purple-400 to-pink-500",
                        },
                        {
                          emoji: "🏆",
                          label: "Champion",
                          color: "from-amber-400 to-yellow-500",
                        },
                      ].map((achievement, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04, duration: 0.3 }}
                          whileHover={{ scale: 1.08, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className={`aspect-square rounded-lg sm:rounded-xl bg-gradient-to-br ${achievement.color} p-2 sm:p-2.5 md:p-3 flex flex-col items-center justify-center cursor-pointer btn-press`}
                          onClick={() =>
                            soundManager.playUnlock()
                          }
                        >
                          <div className="text-xl sm:text-2xl mb-0.5 sm:mb-1">
                            {achievement.emoji}
                          </div>
                          <p className="text-[9px] sm:text-[10px] text-white/90 text-center font-medium leading-tight">
                            {achievement.label}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "courses" && (
              <motion.div
                key="courses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <p className="text-center text-muted-foreground py-12">
                  {language === "en"
                    ? "Courses content will be here..."
                    : "محتوى الدورات سيكون هنا..."}
                </p>
              </motion.div>
            )}

            {activeTab === "progress" && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <p className="text-center text-muted-foreground py-12">
                  {language === "en"
                    ? "Progress tracking will be here..."
                    : "تتبع التقدم سيكون هنا..."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating AI Bot Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleAIBot}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-2xl z-50 btn-press"
        style={{ boxShadow: "0 0 30px rgba(255, 43, 54, 0.6)" }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="white" />
        </motion.div>
      </motion.button>

      {/* AI Bot Drawer */}
      <AnimatePresence>
        {showAIBot && (
          <AIBot
            onClose={() => setShowAIBot(false)}
            language={language}
          />
        )}
      </AnimatePresence>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <Notifications
            language={language}
            onClose={() => setShowNotifications(false)}
          />
        )}
      </AnimatePresence>

      {/* Profile Settings */}
      <AnimatePresence>
        {showProfileSettings && (
          <ProfileSettings
            language={language}
            role="student"
            user={user}
            onClose={() => setShowProfileSettings(false)}
            onSave={(data) => {
              // Update user data - in real app, this would be an API call
              console.log("Saving profile:", data);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}