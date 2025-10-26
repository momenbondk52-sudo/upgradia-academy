import { motion } from "motion/react";
import { useState } from "react";
import {
  Shield,
  Users,
  Settings,
  LogOut,
  BarChart3,
  Database,
  Activity,
  Zap,
  TrendingUp,
  UserCheck,
  BookOpen,
  Award,
  Server,
  Cpu,
  HardDrive,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { soundManager } from "../utils/soundManager";

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
  language: "en" | "ar";
}

export function AdminDashboard({
  user,
  onLogout,
  language,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    {
      id: "overview",
      icon: BarChart3,
      labelEn: "Overview",
      labelAr: "نظرة عامة",
    },
    {
      id: "users",
      icon: Users,
      labelEn: "Users",
      labelAr: "المستخدمون",
    },
    {
      id: "analytics",
      icon: Activity,
      labelEn: "Analytics",
      labelAr: "التحليلات",
    },
    {
      id: "system",
      icon: Database,
      labelEn: "System",
      labelAr: "النظام",
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
      <div className="absolute inset-0 web-pattern opacity-10" />

      {/* Floating Grid Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-72 bg-card/80 backdrop-blur-2xl border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center glow-cyan">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-black gradient-text">
                UPGRADIA
              </h1>
              <p className="text-xs text-muted-foreground">
                Admin Control
              </p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-accent/50 glow-cyan">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold">
                {user?.name || "Administrator"}
              </h3>
              <p className="text-xs text-muted-foreground">
                System Admin
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
                    ? "bg-gradient-to-r from-accent/20 to-purple-500/20 border border-accent/30 text-white"
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
                    layoutId="adminActiveTab"
                    className="ml-auto w-2 h-2 rounded-full bg-accent"
                    style={{
                      boxShadow:
                        "0 0 10px rgba(0, 217, 255, 0.8)",
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
                ? "System-wide control and monitoring"
                : "التحكم والمراقبة على مستوى النظام"}
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
              {/* System Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Users,
                    label: "Total Users",
                    value: "1,247",
                    change: "+52",
                    color: "primary",
                    glow: "glow-red",
                  },
                  {
                    icon: BookOpen,
                    label: "Active Courses",
                    value: "84",
                    change: "+12",
                    color: "secondary",
                    glow: "glow-blue",
                  },
                  {
                    icon: Activity,
                    label: "System Health",
                    value: "99.8%",
                    change: "+0.2%",
                    color: "accent",
                    glow: "glow-cyan",
                  },
                  {
                    icon: Award,
                    label: "Achievements",
                    value: "3.2k",
                    change: "+180",
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
                      className={`p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border ${stat.glow} game-card cursor-pointer relative overflow-hidden`}
                    >
                      {/* Scanline Effect */}
                      <div className="absolute inset-0 scanline opacity-30" />

                      <div className="relative z-10">
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
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* System Performance & User Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* System Performance */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border glow-cyan"
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Server className="w-5 h-5 text-accent" />
                    {language === "en"
                      ? "System Performance"
                      : "أداء النظام"}
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Cpu,
                        label: "CPU Usage",
                        value: 42,
                        max: 100,
                        unit: "%",
                        color: "from-primary to-secondary",
                      },
                      {
                        icon: HardDrive,
                        label: "Memory",
                        value: 6.8,
                        max: 16,
                        unit: "GB",
                        color: "from-secondary to-accent",
                      },
                      {
                        icon: Database,
                        label: "Storage",
                        value: 124,
                        max: 500,
                        unit: "GB",
                        color: "from-accent to-purple-500",
                      },
                      {
                        icon: Activity,
                        label: "Network",
                        value: 18,
                        max: 100,
                        unit: "Mbps",
                        color: "from-purple-500 to-primary",
                      },
                    ].map((metric, i) => {
                      const Icon = metric.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                {metric.label}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {metric.value}
                              {metric.unit} / {metric.max}
                              {metric.unit}
                            </span>
                          </div>
                          <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(metric.value / metric.max) * 100}%`,
                              }}
                              transition={{
                                duration: 1,
                                delay: i * 0.1,
                              }}
                              className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* User Distribution */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-secondary" />
                    {language === "en"
                      ? "User Distribution"
                      : "توزيع المستخدمين"}
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        role: "Students",
                        count: 1089,
                        percentage: 87,
                        color: "primary",
                      },
                      {
                        role: "Professors",
                        count: 124,
                        percentage: 10,
                        color: "secondary",
                      },
                      {
                        role: "TAs",
                        count: 28,
                        percentage: 2,
                        color: "accent",
                      },
                      {
                        role: "Admins",
                        count: 6,
                        percentage: 1,
                        color: "purple-500",
                      },
                    ].map((userType, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              {userType.role}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {userType.count}
                            </span>
                          </div>
                          <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${userType.percentage}%`,
                              }}
                              transition={{
                                duration: 1,
                                delay: i * 0.1,
                              }}
                              className={`h-full bg-${userType.color} rounded-full`}
                            />
                          </div>
                        </div>
                        <div
                          className={`text-lg font-black text-${userType.color}`}
                        >
                          {userType.percentage}%
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Activity Log */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" />
                  {language === "en"
                    ? "System Activity Log"
                    : "سجل نشاط النظام"}
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      time: "2m ago",
                      event:
                        "New course created: Advanced React Patterns",
                      type: "success",
                    },
                    {
                      time: "15m ago",
                      event: "52 students logged in",
                      type: "info",
                    },
                    {
                      time: "1h ago",
                      event: "Database backup completed",
                      type: "success",
                    },
                    {
                      time: "2h ago",
                      event: "System update installed",
                      type: "warning",
                    },
                    {
                      time: "3h ago",
                      event: "12 new user registrations",
                      type: "info",
                    },
                  ].map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-all"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          log.type === "success"
                            ? "bg-green-400"
                            : log.type === "warning"
                              ? "bg-yellow-400"
                              : "bg-blue-400"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm">{log.event}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {log.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "users" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-center text-muted-foreground py-12">
                {language === "en"
                  ? "User management will be here..."
                  : "إدارة المستخدمين ستكون هنا..."}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating System Status Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 flex items-center gap-2 px-4 py-3 rounded-2xl bg-card/90 backdrop-blur-2xl border border-accent/30 glow-cyan shadow-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-3 h-3 rounded-full bg-green-400"
          style={{
            boxShadow: "0 0 10px rgba(74, 222, 128, 0.8)",
          }}
        />
        <div>
          <p className="text-xs text-muted-foreground">
            System Status
          </p>
          <p className="text-sm font-bold text-green-400">
            All Systems Operational
          </p>
        </div>
      </motion.div>
    </div>
  );
}