import { motion } from "motion/react";
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
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { soundManager } from "../utils/soundManager";

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
  };

  const handleLogout = () => {
    soundManager.playClick();
    onLogout();
  };

  return (
    <div className="fixed inset-0 game-background overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hex-pattern opacity-10" />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-72 bg-card/80 backdrop-blur-2xl border-r border-border flex flex-col">
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
      </div>

      {/* Main Content */}
      <div className="ml-72 h-full overflow-y-auto custom-scrollbar">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-card/80 backdrop-blur-2xl border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h2 className="text-2xl font-black">
              {
                menuItems.find((m) => m.id === activeTab)
                  ?.labelEn
              }
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === "en"
                ? "Manage your courses and students"
                : "إدارة دوراتك وطلابك"}
            </p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto p-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Users,
                    label: "Total Students",
                    value: "247",
                    change: "+12",
                    color: "primary",
                    glow: "glow-red",
                  },
                  {
                    icon: BookOpen,
                    label: "Active Courses",
                    value: "8",
                    change: "+2",
                    color: "secondary",
                    glow: "glow-blue",
                  },
                  {
                    icon: TrendingUp,
                    label: "Avg Progress",
                    value: "73%",
                    change: "+5%",
                    color: "accent",
                    glow: "glow-cyan",
                  },
                  {
                    icon: Award,
                    label: "Completion Rate",
                    value: "89%",
                    change: "+3%",
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
                          className="rounded-lg bg-green-500/20 text-green-400 border-green-500/30"
                        >
                          {stat.change}
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

              {/* Student Performance & Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performers */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                    {language === "en"
                      ? "Top Performers"
                      : "المتفوقون"}
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Sarah Chen",
                        score: 98,
                        progress: 95,
                      },
                      {
                        name: "Marcus Johnson",
                        score: 96,
                        progress: 92,
                      },
                      {
                        name: "Aisha Patel",
                        score: 94,
                        progress: 88,
                      },
                      {
                        name: "Diego Martinez",
                        score: 92,
                        progress: 90,
                      },
                    ].map((student, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-all cursor-pointer btn-press"
                        onClick={() => soundManager.playClick()}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary text-white font-bold">
                          {i + 1}
                        </div>
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {student.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={student.progress}
                              className="h-1.5 flex-1"
                            />
                            <span className="text-xs text-muted-foreground">
                              {student.score}%
                            </span>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {student.score}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Students Needing Support */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    {language === "en"
                      ? "Need Support"
                      : "يحتاجون الدعم"}
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Emma Wilson",
                        issue: "Low engagement",
                        days: 5,
                      },
                      {
                        name: "James Lee",
                        issue: "Missed deadlines",
                        days: 3,
                      },
                      {
                        name: "Sofia Rodriguez",
                        issue: "Below average",
                        days: 7,
                      },
                    ].map((student, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ x: -4 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-all cursor-pointer btn-press"
                        onClick={() => soundManager.playClick()}
                      >
                        <Avatar className="w-10 h-10 border-2 border-primary/30">
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {student.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>
                              {student.issue} • {student.days}d
                              ago
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="rounded-lg bg-primary/20 hover:bg-primary/30 text-primary border-primary/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.playClick();
                          }}
                        >
                          Contact
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
              >
                <h3 className="text-xl font-bold mb-4">
                  {language === "en"
                    ? "Recent Activity"
                    : "النشاط الأخير"}
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: CheckCircle,
                      text: "15 students completed Module 3",
                      time: "2h ago",
                      color: "text-green-400",
                    },
                    {
                      icon: MessageSquare,
                      text: "New question in Web Development",
                      time: "4h ago",
                      color: "text-blue-400",
                    },
                    {
                      icon: Award,
                      text: "Sarah Chen earned 'Perfect Score' badge",
                      time: "5h ago",
                      color: "text-yellow-400",
                    },
                    {
                      icon: AlertCircle,
                      text: "Assignment deadline in 2 days",
                      time: "1d ago",
                      color: "text-orange-400",
                    },
                  ].map((activity, i) => {
                    const Icon = activity.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/20"
                      >
                        <Icon
                          className={`w-5 h-5 ${activity.color}`}
                        />
                        <div className="flex-1">
                          <p className="text-sm">
                            {activity.text}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                      </motion.div>
                    );
                  })}
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
        </div>
      </div>
    </div>
  );
}