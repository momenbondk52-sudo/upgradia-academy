import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  BarChart3,
  Users,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { soundManager } from "../utils/soundManager";
import { AnimatedBackground } from "./AnimatedBackground";
import { CourseManagement } from "./instructor/CourseManagement";

interface InstructorDashboardProps {
  user: any;
  onLogout: () => void;
  language: "en" | "ar";
}

export function InstructorDashboard({
  user,
  onLogout,
  language,
}: InstructorDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: "overview",
      icon: BarChart3,
      labelEn: "Overview",
      labelAr: "نظرة عامة",
    },
    {
      id: "students",
      icon: Users,
      labelEn: "Students",
      labelAr: "الطلاب",
    },
    {
      id: "courses",
      icon: BookOpen,
      labelEn: "Courses",
      labelAr: "الدورات",
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

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Mobile Menu Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
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
        className={`fixed top-0 bottom-0 w-64 sm:w-72 lg:w-80 bg-card/90 backdrop-blur-2xl border-border z-40 flex flex-col lg:translate-x-0 ${
          language === "ar" ? "right-0 border-l" : "left-0 border-r"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center glow-blue">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-black gradient-text">
                UPGRADIA
              </h1>
              <p className="text-xs text-muted-foreground">
                Instructor Portal
              </p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-secondary/50 glow-blue">
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold">
                Dr. {user?.name || "Instructor"}
              </h3>
              <p className="text-xs text-muted-foreground">
                Professor
              </p>
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
                onMouseEnter={() => soundManager.playHover()}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all btn-press ${
                  isActive
                    ? "bg-gradient-to-r from-secondary/20 to-accent/20 border border-secondary/30 text-white"
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
                    layoutId="instructorActiveTab"
                    className="ml-auto w-2 h-2 rounded-full bg-secondary"
                    style={{
                      boxShadow:
                        "0 0 10px rgba(30, 125, 214, 0.8)",
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

      {/* Main Content */}
      <div className={`h-full overflow-y-auto custom-scrollbar transition-all duration-300 ${
        language === "ar" ? "lg:mr-80 mr-0" : "lg:ml-80 ml-0"
      }`}>
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-card/80 backdrop-blur-2xl border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 pt-16 lg:pt-4">
            <h2 className="text-xl sm:text-2xl font-black">
              {language === "en"
                ? menuItems.find((m) => m.id === activeTab)?.labelEn
                : menuItems.find((m) => m.id === activeTab)?.labelAr}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {language === "en"
                ? "Manage your courses and students"
                : "إدارة دوراتك وطلابك"}
            </p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto p-4 sm:p-5 md:p-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {[
                  {
                    icon: Users,
                    labelEn: "Total Students",
                    labelAr: "إجمالي الطلاب",
                    value: user?.totalStudents || "0",
                    color: "primary",
                    glow: "glow-red",
                  },
                  {
                    icon: BookOpen,
                    labelEn: "Active Courses",
                    labelAr: "الدورات النشطة",
                    value: user?.activeCourses || "0",
                    color: "secondary",
                    glow: "glow-blue",
                  },
                  {
                    icon: TrendingUp,
                    labelEn: "Avg Progress",
                    labelAr: "متوسط التقدم",
                    value: user?.avgProgress ? `${user.avgProgress}%` : "0%",
                    color: "accent",
                    glow: "glow-cyan",
                  },
                  {
                    icon: Award,
                    labelEn: "Completion Rate",
                    labelAr: "معدل الإكمال",
                    value: user?.completionRate ? `${user.completionRate}%` : "0%",
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
                        <p className="text-xl sm:text-2xl md:text-3xl font-black">
                          {stat.value}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Student Performance & Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performers */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
                >
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                    {language === "en"
                      ? "Top Performers"
                      : "المتفوقون"}
                  </h3>
                  <div className="space-y-2.5 sm:space-y-3">
                    {user?.topPerformers && user.topPerformers.length > 0 ? (
                      user.topPerformers.map((student: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-muted/20 hover:bg-muted/30 transition-all cursor-pointer btn-press"
                          onClick={() => soundManager.playClick()}
                        >
                          <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-secondary text-white text-xs sm:text-sm font-bold flex-shrink-0">
                            {i + 1}
                          </div>
                          <Avatar className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-xs sm:text-sm truncate">
                              {student.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={student.progress}
                                className="h-1 sm:h-1.5 flex-1"
                              />
                              <span className="text-[10px] sm:text-xs text-muted-foreground flex-shrink-0">
                                {student.score}%
                              </span>
                            </div>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px] sm:text-xs flex-shrink-0">
                            {student.score}
                          </Badge>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-6 sm:py-8 text-muted-foreground text-xs sm:text-sm">
                        {language === "en"
                          ? "No student data available"
                          : "لا توجد بيانات طلاب"}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Students Needing Support */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
                >
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    {language === "en"
                      ? "Need Support"
                      : "يحتاجون الدعم"}
                  </h3>
                  <div className="space-y-2.5 sm:space-y-3">
                    {user?.studentsNeedingSupport && user.studentsNeedingSupport.length > 0 ? (
                      user.studentsNeedingSupport.map((student: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ x: -4 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-muted/20 hover:bg-muted/30 transition-all cursor-pointer btn-press"
                          onClick={() => soundManager.playClick()}
                        >
                          <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-primary/30 flex-shrink-0">
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-xs sm:text-sm truncate">
                              {student.name}
                            </p>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                              <span className="truncate">
                                {student.issue} • {student.days}d ago
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="rounded-lg bg-primary/20 hover:bg-primary/30 text-primary border-primary/30 text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              soundManager.playClick();
                            }}
                          >
                            {language === "en" ? "Contact" : "تواصل"}
                          </Button>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-6 sm:py-8 text-muted-foreground text-xs sm:text-sm">
                        {language === "en"
                          ? "All students are on track"
                          : "جميع الطلاب على المسار الصحيح"}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
              >
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                  {language === "en"
                    ? "Recent Activity"
                    : "النشاط الأخير"}
                </h3>
                <div className="space-y-2.5 sm:space-y-3">
                  {user?.recentActivity && user.recentActivity.length > 0 ? (
                    user.recentActivity.map((activity: any, i: number) => {
                      const Icon = activity.icon || CheckCircle;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-muted/20"
                        >
                          <Icon
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${activity.color || "text-green-400"} flex-shrink-0`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm truncate">
                              {activity.text}
                            </p>
                          </div>
                          <span className="text-[10px] sm:text-xs text-muted-foreground flex-shrink-0">
                            {activity.time}
                          </span>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-6 sm:py-8 text-muted-foreground text-xs sm:text-sm">
                      {language === "en"
                        ? "No recent activity"
                        : "لا يوجد نشاط حديث"}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "students" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-center text-muted-foreground py-12">
                {language === "en"
                  ? "Student management will be here..."
                  : "إدارة الطلاب ستكون هنا..."}
              </p>
            </motion.div>
          )}

          {activeTab === "courses" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CourseManagement language={language} />
            </motion.div>
          )}

          {activeTab === "messages" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-center text-muted-foreground py-12">
                {language === "en"
                  ? "Messages will be here..."
                  : "الرسائل ستكون هنا..."}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}