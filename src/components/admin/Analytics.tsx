import { motion } from "motion/react";
import { useState } from "react";
import {
  Download,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Activity,
  BarChart3,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { soundManager } from "../../utils/soundManager";
import { toast } from "sonner@2.0.3";

interface AnalyticsProps {
  language: "en" | "ar";
}

export function Analytics({ language }: AnalyticsProps) {
  const [exportFormat, setExportFormat] = useState<"pdf" | "png" | "jpg">("pdf");

  // Sample data for charts
  const studentPerformanceData = [
    { month: language === "en" ? "Jan" : "يناير", performance: 65 },
    { month: language === "en" ? "Feb" : "فبراير", performance: 72 },
    { month: language === "en" ? "Mar" : "مارس", performance: 78 },
    { month: language === "en" ? "Apr" : "أبريل", performance: 85 },
    { month: language === "en" ? "May" : "مايو", performance: 82 },
    { month: language === "en" ? "Jun" : "يونيو", performance: 90 },
  ];

  const engagementData = [
    { name: language === "en" ? "Week 1" : "الأسبوع 1", active: 420 },
    { name: language === "en" ? "Week 2" : "الأسبوع 2", active: 380 },
    { name: language === "en" ? "Week 3" : "الأسبوع 3", active: 450 },
    { name: language === "en" ? "Week 4" : "الأسبوع 4", active: 510 },
  ];

  const courseActivityData = [
    { name: language === "en" ? "Web Dev" : "تطوير الويب", value: 35 },
    { name: language === "en" ? "Data Science" : "علوم البيانات", value: 25 },
    { name: language === "en" ? "AI/ML" : "الذكاء الاصطناعي", value: 20 },
    { name: language === "en" ? "Design" : "التصميم", value: 15 },
    { name: language === "en" ? "Others" : "أخرى", value: 5 },
  ];

  const instructorContributionData = [
    {
      name: language === "en" ? "Prof. Ahmed" : "د. أحمد",
      courses: 12,
      students: 350,
    },
    {
      name: language === "en" ? "Prof. Sara" : "د. سارة",
      courses: 8,
      students: 280,
    },
    {
      name: language === "en" ? "Prof. Omar" : "د. عمر",
      courses: 10,
      students: 310,
    },
    {
      name: language === "en" ? "Prof. Laila" : "د. ليلى",
      courses: 6,
      students: 180,
    },
  ];

  const COLORS = ["#ff2b36", "#1e7dd6", "#00d9ff", "#ffd700", "#9333ea"];

  const handleExport = async () => {
    soundManager.playSuccess();
    
    // In a real implementation, this would generate and download the file
    toast.success(
      language === "en"
        ? `Analytics exported as ${exportFormat.toUpperCase()}`
        : `تم تصدير التحليلات كـ ${exportFormat.toUpperCase()}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Export */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black gradient-text">
            {language === "en" ? "Analytics Dashboard" : "لوحة التحليلات"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {language === "en"
              ? "Comprehensive insights and performance metrics"
              : "رؤى شاملة ومقاييس الأداء"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as any)}
            className="h-10 px-4 rounded-xl bg-card border border-border text-sm"
          >
            <option value="pdf">PDF</option>
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
          </select>
          <Button
            className="rounded-xl bg-gradient-to-r from-primary to-secondary"
            onClick={handleExport}
          >
            <Download className="w-4 h-4 mr-2" />
            {language === "en" ? "Export" : "تصدير"}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Users,
            labelEn: "Total Students",
            labelAr: "إجمالي الطلاب",
            value: "1,247",
            change: "+12%",
            color: "from-blue-500 to-cyan-500",
          },
          {
            icon: BookOpen,
            labelEn: "Active Courses",
            labelAr: "الدورات النشطة",
            value: "48",
            change: "+5%",
            color: "from-green-500 to-emerald-500",
          },
          {
            icon: Award,
            labelEn: "Completion Rate",
            labelAr: "معدل الإكمال",
            value: "87%",
            change: "+8%",
            color: "from-yellow-500 to-orange-500",
          },
          {
            icon: Activity,
            labelEn: "Engagement",
            labelAr: "التفاعل",
            value: "94%",
            change: "+3%",
            color: "from-purple-500 to-pink-500",
          },
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`p-5 rounded-xl bg-gradient-to-br ${metric.color} text-white game-card cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-3">
                <Icon className="w-8 h-8" strokeWidth={2.5} />
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {metric.change}
                </Badge>
              </div>
              <p className="text-3xl font-black mb-1">{metric.value}</p>
              <p className="text-sm opacity-90">
                {language === "en" ? metric.labelEn : metric.labelAr}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Performance Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            {language === "en" ? "Student Performance Trend" : "اتجاه أداء الطلاب"}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={studentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="#ff2b36"
                strokeWidth={3}
                dot={{ fill: "#ff2b36", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Engagement Rate */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-secondary" />
            {language === "en" ? "Weekly Engagement" : "التفاعل الأسبوعي"}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="active" fill="#1e7dd6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Course Activity Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            {language === "en" ? "Course Activity" : "نشاط الدورات"}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={courseActivityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {courseActivityData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Instructor Contributions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            {language === "en" ? "Instructor Contributions" : "مساهمات المدرسين"}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={instructorContributionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" />
              <YAxis dataKey="name" type="category" stroke="#888" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="courses" fill="#ffd700" radius={[0, 8, 8, 0]} />
              <Bar dataKey="students" fill="#00d9ff" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
      >
        <h3 className="text-lg font-bold mb-4">
          {language === "en" ? "Summary Statistics" : "إحصائيات ملخصة"}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              labelEn: "Avg. Score",
              labelAr: "متوسط الدرجة",
              value: "85.4%",
              trend: "up",
            },
            {
              labelEn: "Study Hours",
              labelAr: "ساعات الدراسة",
              value: "12,580",
              trend: "up",
            },
            {
              labelEn: "Completion Time",
              labelAr: "وقت الإكمال",
              value: "14 days",
              trend: "down",
            },
            {
              labelEn: "Satisfaction",
              labelAr: "الرضا",
              value: "4.8/5",
              trend: "up",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-muted/20 border border-border"
            >
              <p className="text-sm text-muted-foreground mb-1">
                {language === "en" ? stat.labelEn : stat.labelAr}
              </p>
              <p className="text-2xl font-black">{stat.value}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp
                  className={`w-3 h-3 ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  } ${stat.trend === "down" && "rotate-180"}`}
                />
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
