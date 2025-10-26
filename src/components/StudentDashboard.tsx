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

  // Mock student data - game-like stats
  const studentData = {
    name: user?.name || "Peter Parker",
    level: 12,
    xp: 3420,
    xpToNext: 5000,
    rank: "Elite Learner",
    streak: 7,
    achievements: 23,
    courses: 4,
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
      <div className="absolute inset-0 hex-pattern opacity-10" />

      {/* Mobile Menu Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden w-12 h-12 rounded-xl bg-card/80 backdrop-blur-xl border border-border flex items-center justify-center btn-press"
      >
        {sidebarOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-card/80 backdrop-blur-2xl border-r border-border z-40 flex flex-col"
          >
            {/* Logo/Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-red">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-black gradient-text">
                    UPGRADIA
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Academy
                  </p>
                </div>
              </div>
            </div>

            {/* User Profile Card */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-14 h-14 border-2 border-primary/50 glow-red">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold truncate">
                    {studentData.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-primary fill-primary" />
                    <span className="text-xs text-muted-foreground">
                      {studentData.rank}
                    </span>
                  </div>
                </div>
              </div>

              {/* Level & XP */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
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
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center p-2 rounded-lg bg-muted/20">
                  <div className="text-lg font-bold text-primary">
                    {studentData.streak}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Day Streak
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/20">
                  <div className="text-lg font-bold text-secondary">
                    {studentData.achievements}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Badges
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/20">
                  <div className="text-lg font-bold text-accent">
                    {studentData.courses}
                  </div>
                  <div className="text-xs text-muted-foreground">
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
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all btn-press ${
                      isActive
                        ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-white"
                        : "hover:bg-muted/20"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">
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
            <div className="p-4 border-t border-border space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl hover:bg-muted/20"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
              >
                <Settings className="w-5 h-5 mr-3" />
                {language === "en" ? "Settings" : "الإعدادات"}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl hover:bg-destructive/20 text-destructive"
                onClick={handleLogout}
                onMouseEnter={() => soundManager.playHover()}
              >
                <LogOut className="w-5 h-5 mr-3" />
                {language === "en" ? "Logout" : "تسجيل الخروج"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-72 h-full overflow-y-auto custom-scrollbar">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-card/80 backdrop-blur-2xl border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">
                {language === "en"
                  ? menuItems.find((m) => m.id === activeTab)
                      ?.labelEn
                  : menuItems.find((m) => m.id === activeTab)
                      ?.labelAr}
              </h2>
              <p className="text-sm text-muted-foreground">
                {language === "en"
                  ? "Welcome back, hero!"
                  : "مرحباً بعودتك، بطل!"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl hover:bg-muted/20"
                onClick={() => soundManager.playNotification()}
              >
                <Bell className="w-5 h-5" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Welcome Banner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative p-8 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden glow-red"
                >
                  <div className="absolute inset-0 shimmer opacity-30" />
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2">
                        {language === "en"
                          ? `Ready to level up, ${studentData.name}?`
                          : `هل أنت مستعد للارتقاء، ${studentData.name}؟`}
                      </h3>
                      <p className="text-white/90">
                        {language === "en"
                          ? "You're on a 7-day streak! Keep the momentum going 🔥"
                          : "لديك سلسلة 7 أيام! حافظ على الزخم 🔥"}
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-white text-primary hover:bg-white/90 rounded-xl px-8 btn-press shadow-lg"
                      onClick={() => handleTabChange("courses")}
                      onMouseEnter={() =>
                        soundManager.playHover()
                      }
                    >
                      <Target className="w-5 h-5 mr-2" />
                      {language === "en"
                        ? "Continue Learning"
                        : "متابعة التعلم"}
                    </Button>
                  </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: Trophy,
                      label: "Total XP",
                      value: "3,420",
                      color: "primary",
                      glow: "glow-red",
                    },
                    {
                      icon: Award,
                      label: "Achievements",
                      value: "23",
                      color: "secondary",
                      glow: "glow-blue",
                    },
                    {
                      icon: Clock,
                      label: "Study Time",
                      value: "42h",
                      color: "accent",
                      glow: "glow-cyan",
                    },
                    {
                      icon: TrendingUp,
                      label: "Avg Score",
                      value: "87%",
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
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className={`p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border ${stat.glow} game-card cursor-pointer`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-${stat.color}/20 flex items-center justify-center`}
                          >
                            <Icon
                              className={`w-6 h-6 text-${stat.color}`}
                            />
                          </div>
                          <Badge
                            variant="secondary"
                            className="rounded-lg"
                          >
                            +12%
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {stat.label}
                          </p>
                          <p className="text-3xl font-black">
                            {stat.value}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recent Activity & Upcoming */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Courses */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
                  >
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      {language === "en"
                        ? "Continue Learning"
                        : "متابعة التعلم"}
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          title: "Web Development Fundamentals",
                          progress: 65,
                          color: "primary",
                        },
                        {
                          title: "Data Structures & Algorithms",
                          progress: 42,
                          color: "secondary",
                        },
                        {
                          title: "UI/UX Design Principles",
                          progress: 88,
                          color: "accent",
                        },
                      ].map((course, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ x: 4 }}
                          className="p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-all cursor-pointer btn-press"
                          onClick={() =>
                            soundManager.playClick()
                          }
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm">
                              {course.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {course.progress}%
                            </span>
                          </div>
                          <Progress
                            value={course.progress}
                            className="h-2"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Achievements Showcase */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
                  >
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-primary" />
                      {language === "en"
                        ? "Recent Achievements"
                        : "الإنجازات الأخيرة"}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
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
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`aspect-square rounded-xl bg-gradient-to-br ${achievement.color} p-3 flex flex-col items-center justify-center cursor-pointer btn-press`}
                          onClick={() =>
                            soundManager.playUnlock()
                          }
                        >
                          <div className="text-2xl mb-1">
                            {achievement.emoji}
                          </div>
                          <p className="text-[10px] text-white/90 text-center font-medium">
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleAIBot}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-2xl z-50 btn-press"
        style={{ boxShadow: "0 0 40px rgba(255, 43, 54, 0.6)" }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Zap className="w-8 h-8 text-white" fill="white" />
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
    </div>
  );
}